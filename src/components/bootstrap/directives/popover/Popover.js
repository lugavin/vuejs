/* eslint-disable no-param-reassign,no-underscore-dangle,class-methods-use-this,no-unused-expressions */
import Popper from 'popper.js';

/**
 * @see http://getbootstrap.com/docs/4.1/components/popovers/
 */
const DEFAULT_OPTIONS = {
  container: false,
  html: false,
  delay: 0,
  offset: 0,
  selector: false,
  template: `
    <div class="popover" role="tooltip">
      <div class="arrow"></div>
      <h3 class="popover-header"></h3>
      <div class="popover-body"></div>
    </div>
  `,
  placement: 'top',
  trigger: 'click',
  title: '',
  content: ''
};

/**
 * @see https://github.com/FezVrasta/popper.js/blob/master/packages/tooltip/src/index.js
 */
export default class Popover {
  /**
   * Create a new popover instance
   * @param {HTMLElement}reference
   * @param {Object}options
   * @return {Object} instance - The generated popover instance
   */
  constructor(reference, options) {
    // apply user options over default ones
    options = { ...DEFAULT_OPTIONS, ...options };

    // cache reference and options
    this.reference = reference;
    this.options = options;

    // get events list
    const events = typeof options.trigger === 'string'
      ? options.trigger.split(' ').filter(trigger => ['click', 'hover', 'focus'].includes(trigger))
      : [];

    // set initial state
    this._isOpen = false;
    this._popperOptions = {};

    // set event listeners
    this._setEventListeners(reference, events, options);
  }

  // ==================== Public methods ==================== //

  /**
   * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
   * Tooltips with zero-length titles are never displayed.
   * @method Tooltip#show
   * @memberof Tooltip
   */
  show() {
    return this._show(this.reference, this.options);
  }

  /**
   * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * @method Tooltip#hide
   * @memberof Tooltip
   */
  hide() {
    return this._hide();
  }

  /**
   * Hides and destroys an element’s tooltip.
   * @method Tooltip#dispose
   * @memberof Tooltip
   */
  dispose() {
    return this._dispose();
  }

  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * @method Tooltip#toggle
   * @memberof Tooltip
   */
  toggle() {
    return this._isOpen ? this.hide() : this.show();
  }

  updateTitle(title) {
    if (typeof this._popperNode === 'undefined') {
      if (typeof this.options.title !== 'undefined') {
        this.options.title = title;
      }
      return;
    }
    const titleNode = this._popperNode.parentNode.querySelector(this.titleSelector);
    this._clearTitle(titleNode, this.options.html, this.options.title);
    this._addTitle(this.reference, title, this.options.html, titleNode);
    this.options.title = title;
    this.popperInstance.update();
  }

  updateContent(content) {
    if (typeof this._popperNode === 'undefined') {
      if (typeof this.options.content !== 'undefined') {
        this.options.content = content;
      }
      return;
    }
    const contentNode = this._popperNode.parentNode.querySelector(this.contentSelector);
    this._clearContent(contentNode, this.options.html, this.options.content);
    this._addContent(this.reference, content, this.options.html, contentNode);
    this.options.content = content;
    this.popperInstance.update();
  }

  // Defaults
  arrowSelector = '.arrow, .popover__arrow';
  titleSelector = '.popover-header, .popover__header';
  contentSelector = '.popover-body, .popover__body';

  // ==================== Private methods ==================== //

  _events = [];

  /**
   * Creates a new popper node
   * @private
   * @param {String} template
   * @return {HTMLElement} popperNode
   */
  _create(template) {
    const popperGenerator = document.createElement('div');
    popperGenerator.innerHTML = template.trim();
    const popperNode = popperGenerator.childNodes[0];
    popperNode.setAttribute('id', `popper_${Math.random().toString(36).substr(2, 10)}`);
    popperNode.setAttribute('aria-hidden', 'false');
    return popperNode;
  }

  _show(reference, options) {
    // don't show if it's already visible
    // or if it's not being showed
    if (this._isOpen && !this._isOpening) {
      return this;
    }
    this._isOpen = true;

    // if the tooltipNode already exists, just show it
    if (this._popperNode) {
      this._popperNode.style.display = '';
      this._popperNode.setAttribute('aria-hidden', 'false');
      this.popperInstance.update();
      return this;
    }

    // create tooltip node
    const popperNode = this._create(options.template);
    if (options.title) {
      const titleNode = popperNode.querySelector(this.titleSelector);
      this._addTitle(reference, options.title, options.allowHtml, titleNode);
    }
    if (options.content) {
      const contentNode = popperNode.querySelector(this.contentSelector);
      this._addContent(reference, options.content, options.allowHtml, contentNode);
    }

    // Add `aria-describedby` to our reference element for accessibility reasons
    reference.setAttribute('aria-describedby', popperNode.id);

    // append tooltip to container
    const container = this._findContainer(options.container, reference);

    this._append(popperNode, container);

    this._popperOptions = {
      placement: options.placement
    };

    this._popperOptions.modifiers = {
      ...this._popperOptions.modifiers,
      arrow: {
        element: this.arrowSelector
      },
      offset: {
        offset: options.offset
      }
    };

    if (options.boundariesElement) {
      this._popperOptions.modifiers.preventOverflow = {
        boundariesElement: options.boundariesElement
      };
    }

    this.popperInstance = new Popper(
      reference,
      popperNode,
      this._popperOptions
    );

    this._popperNode = popperNode;

    return this;
  }

  _hide() {
    // don't hide if it's already hidden
    if (!this._isOpen) {
      return this;
    }

    this._isOpen = false;

    // hide tooltipNode
    this._popperNode.style.display = 'none';
    this._popperNode.setAttribute('aria-hidden', 'true');

    return this;
  }

  _dispose() {
    // remove event listeners first to prevent any unexpected behaviour
    this._events.forEach(({ func, event }) => {
      this.reference.removeEventListener(event, func);
    });
    this._events = [];

    if (this._popperNode) {
      this._hide();

      // destroy instance
      this.popperInstance.destroy();

      // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element
      if (!this.popperInstance.options.removeOnDestroy) {
        this._popperNode.parentNode.removeChild(this._popperNode);
        this._popperNode = null;
      }
    }
    return this;
  }

  _findContainer(container, reference) {
    // if container is a query, get the relative element
    if (typeof container === 'string') {
      container = window.document.querySelector(container);
    } else if (container === false) {
      // if container is `false`, set it to reference parent
      container = reference.parentNode;
    }
    return container;
  }

  /**
   * Append tooltip to container
   * @private
   * @param {HTMLElement} tooltipNode
   * @param {HTMLElement} container
   */
  _append(tooltipNode, container) {
    container.appendChild(tooltipNode);
  }

  _setEventListeners(reference, events, options) {
    const directEvents = [];
    const oppositeEvents = [];

    events.forEach((event) => {
      switch (event) {
        case 'hover':
          directEvents.push('mouseenter');
          oppositeEvents.push('mouseleave');
          break;
        case 'focus':
          directEvents.push('focus');
          oppositeEvents.push('blur');
          break;
        case 'click':
          directEvents.push('click');
          oppositeEvents.push('click');
          break;
        default:
          break;
      }
    });

    // schedule show tooltip
    directEvents.forEach((event) => {
      const func = (evt) => {
        if (this._isOpening === true) {
          return;
        }
        evt.usedByPopper = true;
        this._scheduleShow(reference, options.delay, options, evt);
      };
      this._events.push({ event, func });
      reference.addEventListener(event, func);
    });

    // schedule hide tooltip
    oppositeEvents.forEach((event) => {
      const func = (evt) => {
        if (evt.usedByPopper === true) {
          return;
        }
        this._scheduleHide(reference, options.delay, options, evt);
      };
      this._events.push({ event, func });
      reference.addEventListener(event, func);
    });
  }

  _scheduleShow(reference, delay, options) {
    this._isOpening = true;
    const computedDelay = (delay && delay.show) || delay || 0;
    this._showTimeout = window.setTimeout(() => this._show(reference, options), computedDelay);
  }

  _scheduleHide(reference, delay, options, evt) {
    this._isOpening = false;
    const computedDelay = (delay && delay.hide) || delay || 0;
    window.setTimeout(() => {
      window.clearTimeout(this._showTimeout);
      if (this._isOpen === false) {
        return;
      }
      if (!document.body.contains(this._popperNode)) {
        return;
      }

      // if we are hiding because of a mouseleave, we must check that the new
      // reference isn't the tooltip, because in this case we don't want to hide it
      if (evt.type === 'mouseleave') {
        const isSet = this._setPopperNodeEvent(evt, reference, delay, options);

        // if we set the new event, don't hide the tooltip yet
        // the new event will take care to hide it if necessary
        if (isSet) {
          return;
        }
      }

      this._hide(reference, options);
    }, computedDelay);
  }

  _setPopperNodeEvent = (evt, reference, delay, options) => {
    const relatedreference = evt.relatedreference || evt.toElement || evt.relatedTarget;

    const callback = (evt2) => {
      const relatedreference2 =
        evt2.relatedreference || evt2.toElement || evt2.relatedTarget;

      // Remove event listener after call
      this._popperNode.removeEventListener(evt.type, callback);

      // If the new reference is not the reference element
      if (!reference.contains(relatedreference2)) {
        // Schedule to hide tooltip
        this._scheduleHide(reference, options.delay, options, evt2);
      }
    };

    if (this._popperNode.contains(relatedreference)) {
      // listen to mouseleave on the tooltip element to be able to hide the tooltip
      this._popperNode.addEventListener(evt.type, callback);
      return true;
    }

    return false;
  };

  _addTitle(reference, title, allowHtml, titleNode) {
    if (title.nodeType === Node.ELEMENT_NODE || title.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      // if title is a element node or document fragment, append it only if allowHtml is true
      allowHtml && titleNode.appendChild(title);
    } else if (Object.prototype.toString.call(title) === '[object Function]') {
      // if title is a function, call it and set textContent or innerHtml depending by `allowHtml` value
      const titleText = title.call(reference);
      allowHtml ? (titleNode.innerHTML = titleText) : (titleNode.textContent = titleText);
    } else {
      // if it's just a simple text, set textContent or innerHtml depending by `allowHtml` value
      allowHtml ? (titleNode.innerHTML = title) : (titleNode.textContent = title);
    }
  }

  _clearTitle(titleNode, allowHtml, lastTitle) {
    if (lastTitle.nodeType === Node.ELEMENT_NODE || lastTitle.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      allowHtml && titleNode.removeChild(lastTitle);
    } else {
      allowHtml ? titleNode.innerHTML = '' : titleNode.textContent = '';
    }
  }

  _addContent(reference, content, allowHtml, contentNode) {
    if (content.nodeType === Node.ELEMENT_NODE || content.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      allowHtml && contentNode.appendChild(content);
    } else if (Object.prototype.toString.call(content) === '[object Function]') {
      const contentText = content.call(reference);
      allowHtml ? (contentNode.innerHTML = contentText) : (contentNode.textContent = contentText);
    } else {
      allowHtml ? (contentNode.innerHTML = content) : (contentNode.textContent = content);
    }
  }

  _clearContent(contentNode, allowHtml, lastContent) {
    if (lastContent.nodeType === Node.ELEMENT_NODE || lastContent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      allowHtml && contentNode.removeChild(lastContent);
    } else {
      allowHtml ? contentNode.innerHTML = '' : contentNode.textContent = '';
    }
  }
}

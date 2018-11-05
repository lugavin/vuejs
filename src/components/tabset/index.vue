<template>
  <div>
    <ul class="nav" :class="['nav-'+type, justifyClass]" role="tablist">
      <li class="nav-item" v-for="tab of tabs" :key="tab.id">
        <a class="nav-link" href="javascript:void(0)" role="tab"
           :class="{active: tab.id === activeId, disabled: tab.disabled}"
           :id="tab.id" @click="select(tab.id)">{{ tab.title }}</a>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill'
     * or 'justified'. The default value is 'start'.
     */
    justify: { type: String, default: 'start' },
    /**
     * Type of navigation to be used for tabs. Can be one of 'tabs' or 'pills'.
     */
    type: { type: String, default: 'tabs' }
  },
  computed: {
    justifyClass() {
      return ['fill', 'justified'].includes(this.justify) ? `nav-${this.justify}` : `justify-content-${this.justify}`;
    }
  },
  data() {
    return {
      tabs: [],
      activeId: null
    };
  },
  mounted() {
    this.tabs = this.$children.map(tab => ({
      id: tab.id,
      title: tab.title,
      disabled: tab.disabled
    }));
    if (this.tabs.length) {
      this.activeId = this.tabs[0].id;
    }
  },
  methods: {
    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(tabId) {
      const selectedTab = this.getTabById(tabId);
      if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
        let defaultPrevented = false;
        this.tabChange({
          activeId: this.activeId,
          nextId: selectedTab.id,
          preventDefault: () => {
            defaultPrevented = true;
          }
        });
        if (!defaultPrevented) {
          this.activeId = selectedTab.id;
        }
      }
    },
    getTabById(id) {
      const tabsWithId = this.tabs.filter(tab => tab.id === id);
      return tabsWithId.length ? tabsWithId[0] : null;
    },
    tabChange(data) {
      this.$emit('tabChange', data);
    }
  }
};
</script>

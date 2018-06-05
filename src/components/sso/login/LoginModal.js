import Vue from 'vue';
import LoginService from './LoginService';

const template = `
  <div :id="uid">
    <div class="modal fade show" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">请登录</h5>
            <button type="button" class="close" aria-label="Close" @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form role="form" novalidate="novalidate" @submit.prevent="login">
              <div class="form-group">
                <label class="sr-only" for="username">帐号</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><i class="fa fa-user"></i></div>
                  </div>
                  <input id="username" name="username" type="text" class="form-control" placeholder="帐号"
                         style="border-top-right-radius: 0.2rem; border-bottom-right-radius: 0.2rem;"
                         autofocus required pattern="^[a-zA-Z][a-zA-Z0-9_]{4,15}$" v-model.trim="loginVo.username">
                  <div class="invalid-feedback">请输入正确的帐号</div>
                </div>
              </div>
              <div class="form-group">
                <label class="sr-only" for="password">密码</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-lock"></i></span>
                  </div>
                  <input id="password" name="password" type="password" class="form-control" placeholder="密码"
                         style="border-top-right-radius: 0.2rem; border-bottom-right-radius: 0.2rem;"
                         required minlength="6" v-model.trim="loginVo.password">
                  <div class="invalid-feedback">请输入正确的密码</div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input id="rememberMe" type="checkbox" class="form-check-input" v-model="loginVo.rememberMe">
                  <label class="form-check-label" for="rememberMe">记住我</label>
                </div>
              </div>
              <button type="submit" class="btn btn-success btn-block">登录</button>
            </form>
            <div class="alert alert-light px-2" role="alert">
              <a href="javascript:void(0)" class="alert-link">
                <i class="fa fa-lock"></i> <small>忘记密码</small>
              </a>
              <a href="javascript:void(0)" class="alert-link float-right">
                <i class="fa fa-mobile"></i> <small>注册一个新账号</small>
              </a>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade show"></div>
  </div>
`;
// Private Method
const genUID = (prefix) => {
  do {
    // eslint-disable-next-line no-param-reassign, no-bitwise
    prefix += ~~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));
  return prefix;
};

/**
 * Create a subclass of the base Vue constructor. The argument should be an object containing component options.
 *
 * @see https://vuejs.org/v2/api/#Vue-extend
 * @see http://getbootstrap.com/docs/4.1/components/forms/
 * @see https://caniuse.com/#feat=form-validation
 * @see https://html.spec.whatwg.org/multipage/forms.html#client-side-form-validation
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState
 */
const LoginModal = Vue.extend({
  template,
  data() {
    return {
      uid: genUID('auth-dialog'),
      loginVo: {
        username: '',
        password: '',
        rememberMe: true
      }
    };
  },
  methods: {
    login(event) {
      const form = event.target;
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        LoginService.login(this.loginVo).then(() => {
          this.$bus.$emit('authenticationSuccess');
          this.close();
        });
      }
      form.classList.add('was-validated');
    },
    close() {
      const $dialog = document.getElementById(this.uid);
      $dialog.parentNode.removeChild($dialog);
    }
  }
});

/**
 * Don’t use arrow functions on an options property or callback, such as
 * <pre>
 * // Good
 * export default {
 *   created() { console.log(this); }
 * }
 * // Error
 * export default {
 *   created: () => { console.log(this); }
 * }
 * </pre>
 * Since arrow functions are bound to the parent context, this will not be the Vue instance as you’d expect.
 *
 * @see https://cn.vuejs.org/v2/guide/instance.html
 */
LoginModal.prototype.show = function show() { // Define instance method
  const appendTo = document.createElement('template');
  document.body.appendChild(appendTo);
  this.$mount(appendTo);
};

export default LoginModal;

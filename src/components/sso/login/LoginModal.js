import Vue from 'vue';
import { required, minLength, helpers } from 'vuelidate/lib/validators';
import LoginService from './LoginService';

const template = `
  <div :id="uid">
    <div class="modal fade in show" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">用户登录</h4>
          </div>
          <div class="modal-body">
            <form method="post" role="form" @submit.prevent="login">
              <div class="form-group" :class="{'has-error': $v.username.$dirty && $v.username.$error}">
                <label class="control-label sr-only" for="username">帐号</label>
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                  <!--
                  <input id="username" name="username" type="text" class="form-control" placeholder="帐号"
                         autofocus v-model.trim="username" @input="$v.username.$touch()">
                  -->
                  <input id="username" name="username" type="text" class="form-control" placeholder="帐号"
                         autofocus v-model.trim="$v.username.$model">
                </div>
                <small class="help-block" v-show="$v.username.$dirty && !$v.username.required">
                  用户名不能为空
                </small>
                <small class="help-block" v-show="!$v.username.pattern">
                  用户名必须以英文字母开头且只能包含5-15位单词
                </small>
              </div>
              <div class="form-group" :class="{'has-error': $v.password.$dirty && $v.password.$error}">
                <label class="control-label sr-only" for="password">密码</label>
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                  <!--
                  <input id="password" name="password" type="password" class="form-control" placeholder="密码"
                         v-model.trim="password" @input="$v.password.$touch()">
                  -->
                  <input id="password" name="password" type="password" class="form-control" placeholder="密码"
                         v-model.trim="$v.password.$model">
                </div>
                <small class="help-block" v-show="$v.password.$dirty && !$v.password.required">
                  密码不能为空
                </small>
                <small class="help-block" v-show="!$v.password.minLength">
                  密码长度不能小于6位
                </small>
              </div>
              <div class="checkbox">
                <label><input name="rememberMe" type="checkbox" v-model="rememberMe">记住我</label>
              </div>
              <button type="submit" class="btn btn-success btn-block" :disabled="$v.$invalid">登录</button>
            </form>
            <p></p>
            <div class="alert alert-warning" role="alert">
              <a href="javascript:void(0)" class="alert-link">
                <i class="glyphicon glyphicon-lock"></i> 忘记密码
              </a>
              <a href="javascript:void(0)" class="alert-link pull-right">
                <i class="glyphicon glyphicon-phone"></i> 注册一个新账号
              </a>
            </div>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade in"></div>
  </div>
`;

const genUID = (prefix) => {
  do {
    /* eslint-disable no-param-reassign,no-bitwise */
    prefix += ~~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));
  return prefix;
};

/**
 * Create a subclass of the base Vue constructor. The argument should be an object containing component options.
 * @see https://vuejs.org/v2/api/#Vue-extend
 */
const LoginModal = Vue.extend({
  template,
  data() {
    return {
      username: '',
      password: '',
      rememberMe: true,
      uid: genUID('auth-dialog')
    };
  },
  methods: {
    login() {
      const $this = this;
      LoginService.login({
        username: $this.username,
        password: $this.password,
        rememberMe: $this.password
      }).then(() => {
        $this.$bus.$emit('authenticationSuccess');
        $this.close();
      });
    },
    close() {
      const $dialog = document.getElementById(this.uid);
      $dialog.parentNode.removeChild($dialog);
    }
  },
  validations: {
    username: {
      required,
      pattern: helpers.regex('alpha', /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/)
    },
    password: {
      required,
      minLength: minLength(6)
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
 * @see https://cn.vuejs.org/v2/guide/instance.html
 */
LoginModal.prototype.show = function show() { // Define instance method
  const appendTo = document.createElement('template');
  document.body.appendChild(appendTo);
  this.$mount(appendTo);
};

export default LoginModal;

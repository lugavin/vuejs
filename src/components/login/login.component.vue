<template>
  <div role="dialog" v-if="show">
    <div class="modal fade in show">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">用户登录</h4>
          </div>
          <div class="modal-body">
            <form method="post" role="form" @submit.prevent="login">
              <div class="form-group">
                <label class="control-label sr-only" for="username">帐号</label>
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                  <input id="username" name="username" type="text" class="form-control"
                         autofocus="autofocus" autocomplete="off" placeholder="帐号"
                         v-model="username">
                </div>
                <!--
                <small class="help-block" v-show="username===''">
                  用户名不能为空
                </small>
                <small class="help-block" v-show="!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(username)">
                  用户名必须以英文字母开头且只能包含5-15位单词
                </small>
                -->
              </div>
              <div class="form-group">
                <label class="control-label sr-only" for="password">密码</label>
                <div class="input-group">
                  <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                  <input id="password" name="password" type="password" class="form-control"
                         autocomplete="off" placeholder="密码"
                         v-model="password">
                </div>
              </div>
              <div class="checkbox">
                <label><input name="rememberMe" type="checkbox" value="1">记住我</label>
              </div>
              <button type="submit" class="btn btn-success btn-block">登录</button>
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
</template>

<script>
import LoginService from './login.service';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  props: {
    show: { type: Boolean, default: false }
  },
  methods: {
    login() {
      LoginService.login({
        username: this.username,
        password: this.password
      }).then(data => console.info(data))
        .catch(error => console.error(error));
    }
  }
};
</script>

<style scoped>
</style>

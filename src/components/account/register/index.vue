<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <label class="h3">注册</label>
        <!--
        <div class="alert alert-success">
            <strong>注册成功!</strong> 请检查您的邮箱.
        </div>
        <div class="alert alert-danger">
            <strong>注册失败!</strong> 请稍后再试.
        </div>
        <div class="alert alert-danger">
            <strong>账号已被注册!</strong> 请选择其它账号.
        </div>
        <div class="alert alert-danger">
            <strong>邮件已经被注册!</strong> 请选择其它邮件.
        </div>
        <div class="alert alert-danger">
            您输入的密码和确认密码不匹配!
        </div>
        -->
      </div>
      <div class="col-md-8 offset-md-2">
        <form role="form" novalidate="novalidate" @submit.prevent="register">
          <div class="form-group">
            <label class="col-form-label" for="username">账号</label>
            <input id="username" name="username" class="form-control" placeholder="账号"
                   autofocus required pattern="^[a-z0-9@.]{3,16}$"
                   v-model.trim="registerVo.username">
            <div class="invalid-feedback">请输入有效的账号</div>
          </div>
          <div class="form-group">
            <label class="col-form-label" for="email">电子邮件</label>
            <input id="email" name="email" type="email" class="form-control" placeholder="电子邮件"
                   required v-model.trim="registerVo.email">
            <div class="invalid-feedback">请输入有效的电子邮件</div>
          </div>
          <div class="form-group">
            <label class="control-label" for="password">密码</label>
            <input id="password" name="password" type="password" class="form-control" placeholder="密码"
                   required minlength="6" v-model.trim="registerVo.password">
            <div class="invalid-feedback">请输入有效的密码</div>
          </div>
          <div class="form-group">
            <label class="control-label" for="confirmPassword">确认密码</label>
            <input id="confirmPassword" type="password" class="form-control" placeholder="确认密码"
                   required minlength="6" :class="{'border-danger': !confirmPassword}"
                   v-model.trim="registerVo.confirmPassword">
            <div class="invalid-feedback">请输入确认密码</div>
            <small class="form-text text-danger" v-show="registerVo.confirmPassword.length > 5 && !confirmPassword">
              确认密码不正确
            </small>
          </div>
          <button type="submit" class="btn btn-primary">注册</button>
        </form>
        <div class="alert alert-warning mt-3" role="alert">
          已有帐号，<a class="alert-link" href="#">请登录</a>！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterService from './RegisterService';

export default {
  data() {
    return {
      registerVo: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  computed: {
    confirmPassword() {
      return this.registerVo.confirmPassword === this.registerVo.password;
    }
  },
  methods: {
    register(event) {
      const form = event.target;
      if (!form.checkValidity() || !this.confirmPassword) {
        event.stopPropagation();
      } else {
        RegisterService.registerAccount(this.registerVo).then(() => {
          // TODO 提示"邮件已发送请注意查收"
        });
      }
      form.classList.add('was-validated');
    }
  }
};
</script>

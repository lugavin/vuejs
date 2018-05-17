<template>
  <nav class="navbar has-shadow is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <i class="fa fa-html5 fa-2x"></i>&nbsp;VUE Template
        </a>
        <div class="navbar-burger" @click="isActive=!isActive" :class="{'is-active': isActive}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" :class="{'is-active': isActive}">
        <div class="navbar-end">
          <a class="navbar-item is-active" href="#">
            <i class="fa fa-home"></i>&nbsp;首页
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="#">
              <i class="fa fa-user"></i>&nbsp;帐号
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="#"><i class="fa fa-wrench"></i>&nbsp;设置</a>
              <a class="navbar-item" href="#"><i class="fa fa-lock"></i>&nbsp;密码</a>
              <a class="navbar-item" href="#"><i class="fa fa-plus-circle"></i>&nbsp;注册</a>
              <a class="navbar-item" href="#"><i class="fa fa-sign-in"></i>&nbsp;登录</a>
              <a class="navbar-item" href="#"><i class="fa fa-sign-out"></i>&nbsp;退出</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="#">
              <i class="fa fa-flag"></i>&nbsp;语言
            </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="#">简体中文</a>
              <a class="navbar-item" href="#">繁体中文</a>
              <a class="navbar-item" href="#">English</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    isActive: false
  })
};
</script>

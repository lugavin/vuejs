<template>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle pull-left"
                :class="{collapsed:navExpanded}"
                @click="navExpanded=!navExpanded">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand">Vue Template</a>
      </div>
      <div class="collapse navbar-collapse" :class="{in:navExpanded}">
        <ul class="nav navbar-nav">
          <router-link to="/home" tag="li" v-uib-dropdown>
            <a><i class="glyphicon glyphicon-home"></i> 首页</a>
          </router-link>
          <li class="dropdown" v-uib-dropdown>
            <a class="dropdown-toggle" role="button">
              <i class="glyphicon glyphicon-user"></i> 帐号
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <router-link to="/settings" tag="li" active-class="active">
                <a><i class="fa fa-wrench"></i> 设置</a>
              </router-link>
              <router-link to="/password" tag="li" active-class="active">
                <a><i class="fa fa-lock"></i> 密码</a>
              </router-link>
              <router-link to="/register" tag="li" active-class="active">
                <a><i class="fa fa-plus-circle"></i> 注册</a>
              </router-link>
              <li>
                <a href="javascript:void(0)" @click="showLoginModal=true">
                  <i class="fa fa-sign-in"></i> 登录
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i class="fa fa-sign-out"></i> 退出
                </a>
              </li>
            </ul>
          <li class="dropdown" v-uib-dropdown>
            <a class="dropdown-toggle" role="button">
              <i class="glyphicon glyphicon-flag"></i> 语言
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="javascript:void(0)">简体中文</a></li>
              <li><a href="javascript:void(0)">繁体中文</a></li>
              <li><a href="javascript:void(0)">English</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <login-modal :show="showLoginModal" @close="showLoginModal=false"></login-modal>
  </nav>
</template>

<script>
import Vue from 'vue';
import JqLite from '@/components/shared/jqlite';
import LoginModal from '@/components/account/login';

/**
 * @see https://cn.vuejs.org/v2/guide/custom-directive.html
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */
Vue.directive('uibDropdown', {
  inserted(el) {
    el.addEventListener('click', () => {
      JqLite.children(el.parentNode)
        .filter(node => node !== el && node.nodeType === Node.ELEMENT_NODE)
        .forEach((node) => {
          if (node.classList.contains('open')) {
            node.classList.remove('open');
          }
        });
      if (el.classList.contains('dropdown')) {
        el.classList.toggle('open');
      }
    });
  }
});

/**
 * 子组件通过 prop 属性接收父组件传递的数据, 通过 $emit 触发事件向父组件发送消息
 * @see https://cn.vuejs.org/v2/guide/components.html
 */
export default {
  data() {
    return {
      navExpanded: false,
      showLoginModal: false
    };
  },
  methods: {},
  components: {
    LoginModal
  }
};
</script>

<style lang="scss" scoped>
/*
@media (min-width: 768px) {
  .dropdown:hover .dropdown-menu {
    display: block;
  }
}

@media screen and (max-width: 767px) {
}
*/
</style>

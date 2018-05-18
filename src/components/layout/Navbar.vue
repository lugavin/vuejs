<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle pull-left">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand">Vue Template</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/home">
              <i class="glyphicon glyphicon-home"></i> 首页
            </router-link>
          </li>
          <li class="dropdown" v-uib-dropdown>
            <a class="dropdown-toggle" role="button">
              <i class="glyphicon glyphicon-user"></i> 帐号
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <router-link to="/settings">
                  <i class="fa fa-wrench"></i> 设置
                </router-link>
              </li>
              <li>
                <router-link to="/password">
                  <i class="fa fa-lock"></i> 密码
                </router-link>
              </li>
              <li>
                <router-link to="/register">
                  <i class="fa fa-plus-circle"></i> 注册
                </router-link>
              </li>
              <li>
                <a href="" @click="login">
                  <i class="fa fa-sign-in"></i> 登录
                </a>
              </li>
              <li>
                <a href="" @click="logout">
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
              <li><a>简体中文</a></li>
              <li><a>繁体中文</a></li>
              <li><a>English</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import LoginModal from '../login';

/**
 * 子组件通过 prop 属性接收父组件传递的数据, 通过 $emit 触发事件向父组件发送消息
 * @see https://cn.vuejs.org/v2/guide/components.html
 */
export default {
  data() {
    return {
      showLoginModal: false
    };
  },
  methods: {
    login() {
      this.showLoginModal = true;
    },
    logout(event) {
      console.info(event);
    },
    closeLoginModal() {
      this.showLoginModal = false;
    }
  },
  components: {
    LoginModal
  }
};
</script>

<style scoped>
.router-link-active {

}
</style>

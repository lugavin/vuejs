<template>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle pull-left" :class="{collapsed:isNavbarCollapsed}"
                @click="isNavbarCollapsed=!isNavbarCollapsed">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand">Vue Template</a>
      </div>
      <div class="collapse navbar-collapse" :class="{in:isNavbarCollapsed}">
        <ul class="nav navbar-nav">
          <router-link to="/home" tag="li">
            <a href="javascript:void(0)">
              <i class="glyphicon glyphicon-home"></i>&nbsp;首页
            </a>
          </router-link>
          <li class="dropdown open dropdown-item" v-for="menu of menus" :key="menu.id"
              v-if="isAuthenticated">
            <a href="javascript:void(0)" class="dropdown-toggle" role="button">
              <i :class="menu.icon"></i>&nbsp;{{menu.name}}
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <router-link :to="submenu.url" tag="li" v-for="submenu of menu.children" :key="submenu.id">
                <a href="javascript:void(0)">
                  <i :class="submenu.icon"></i>&nbsp;{{submenu.name}}
                </a>
              </router-link>
            </ul>
          </li>
          <li class="dropdown open dropdown-item">
            <a href="javascript:void(0)" class="dropdown-toggle" role="button">
              <i class="glyphicon glyphicon-user"></i>&nbsp;帐号
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <router-link to="/settings" tag="li" v-if="isAuthenticated">
                <a href="javascript:void(0)">
                  <i class="fa fa-wrench"></i>&nbsp;设置
                </a>
              </router-link>
              <router-link to="/password" tag="li" v-if="isAuthenticated">
                <a href="javascript:void(0)">
                  <i class="fa fa-lock"></i>&nbsp;密码
                </a>
              </router-link>
              <router-link to="/register" tag="li" v-if="!isAuthenticated">
                <a href="javascript:void(0)">
                  <i class="fa fa-plus-circle"></i>&nbsp;注册
                </a>
              </router-link>
              <li v-if="!isAuthenticated">
                <a href="javascript:void(0)" @click="showLoginModal=true">
                  <i class="fa fa-sign-in"></i>&nbsp;登录
                </a>
              </li>
              <li v-if="isAuthenticated">
                <a href="javascript:void(0)">
                  <i class="fa fa-sign-out"></i>&nbsp;退出
                </a>
              </li>
            </ul>
          </li>
          <li class="dropdown open dropdown-item">
            <a href="javascript:void(0)" class="dropdown-toggle" role="button">
              <i class="glyphicon glyphicon-flag"></i>&nbsp;语言
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
    <login-modal :open="showLoginModal" @close="showLoginModal=false"></login-modal>
  </nav>
</template>

<script>
import LoginModal from '@/components/login/login.component';
import PrincipalService from '@/components/auth/principal.service';

/**
 * 子组件通过 prop 属性接收父组件传递的数据, 通过 $emit 触发事件向父组件发送消息
 * @see https://cn.vuejs.org/v2/guide/components.html
 */
export default {
  created() {
    this.$bus.$on('authenticationSuccess', this.getAccount);
    this.getAccount(); // 刷新后获取会话信息
  },
  beforeDestroy() {
    this.$bus.$off('authenticationSuccess', this.getAccount);
  },
  data() {
    return {
      isNavbarCollapsed: false,
      showLoginModal: false,
      isAuthenticated: false,
      account: {},
      menus: []
    };
  },
  methods: {
    getAccount() {
      PrincipalService.identity().then((account) => {
        this.isAuthenticated = PrincipalService.isAuthenticated();
        this.account = account;
        if (account) {
          this.menus = account.menus;
        }
      });
    }
  },
  components: {
    LoginModal
  }
};
</script>

<style lang="scss" scoped>
.dropdown.open.dropdown-item > a,
.dropdown.open.dropdown-item > a:hover,
.dropdown.open.dropdown-item > a:focus {
  background-color: transparent;
}

.dropdown.open.dropdown-item .dropdown-menu {
  display: none;
}

@media (min-width: 768px) {
  .dropdown.open.dropdown-item:hover .dropdown-menu {
    display: block;
  }
}

@media screen and (max-width: 767px) {
  .dropdown.open.dropdown-item .dropdown-menu {
    display: block;
  }
}
</style>

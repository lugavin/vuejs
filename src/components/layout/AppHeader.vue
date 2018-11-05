<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="fa fa-html5"></i> VUI Bootstrap
        </a>
        <button class="navbar-toggler" type="button" @click="isCollapsed = !isCollapsed">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{show: isCollapsed}">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">
                <i class="fa fa-home"></i> 首页
              </router-link>
            </li>
            <li class="nav-item dropdown" v-for="menu of menus" :key="menu.id">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" role="button">
                <i :class="menu.icon"></i> {{menu.name}}
              </a>
              <div class="dropdown-menu">
                <router-link class="dropdown-item" :to="submenu.url" v-for="submenu of menu.children" :key="submenu.id">
                  <i :class="submenu.icon"></i> {{submenu.name}}
                </router-link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" role="button">
                <i class="fa fa-user"></i> 帐号
              </a>
              <div class="dropdown-menu">
                <router-link class="dropdown-item" to="/settings" v-if="isAuthenticated">
                  <i class="fa fa-wrench"></i> 设置
                </router-link>
                <router-link class="dropdown-item" to="/password" v-if="isAuthenticated">
                  <i class="fa fa-lock"></i> 密码
                </router-link>
                <router-link class="dropdown-item" to="/register" v-if="!isAuthenticated">
                  <i class="fa fa-plus-circle"></i> 注册
                </router-link>
                <a class="dropdown-item" href="javascript:void(0)" @click="login" v-if="!isAuthenticated">
                  <i class="fa fa-sign-in"></i> 登录
                </a>
                <a class="dropdown-item" href="javascript:void(0)" @click="logout" v-if="isAuthenticated">
                  <i class="fa fa-sign-out"></i> 退出
                </a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" role="button">
                <i class="fa fa-flag"></i> 语言
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="javascript:void(0)">简体中文</a>
                <a class="dropdown-item" href="javascript:void(0)">繁体中文</a>
                <a class="dropdown-item" href="javascript:void(0)">English</a>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fa fa-bell"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="https://github.com/lugavin/vuejs" class="nav-link" target="_blank">
                <i class="fa fa-github fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Dialog from '../shared/dialog';
import LoginModal from '../account/login/LoginModal';
import LoginService from '../account/login/LoginService';
import PrincipalService from '../account/auth/PrincipalService';

const resolveMenus = (menus = []) => {
  const [idKey, pidKey, rootPid] = ['id', 'parentId', null];
  const group = (items = []) => {
    const itemMap = {};
    items.forEach((item) => {
      const pid = item[pidKey] || rootPid;
      if (!itemMap[pid]) {
        itemMap[pid] = [];
      }
      itemMap[pid].push(item);
    });
    return itemMap;
  };
  const menuMap = group(menus);
  const build = (items = []) => {
    if (items.length > 0) {
      items.forEach((item) => {
        const children = build(menuMap[item[idKey]]);
        if (children && children.length > 0) {
          Object.assign(item, { children });
        }
      });
    }
    return items;
  };
  const topMenus = menuMap[rootPid];
  return build(topMenus);
};

const mixin = {
  methods: {
    refreshMenus(menus) {
      this.$router.addRoutes(menus.filter(menu => !!menu.url).map(menu => ({
        path: menu.url,
        // Ref => https://router.vuejs.org/guide/advanced/lazy-loading.html
        component: () => import(`@/components/${menu.url.startsWith('/') ? menu.url.substring(1) : menu.url}`)
      })));
    }
  }
};

/**
 * 子组件通过 prop 属性接收父组件传递的数据, 通过 $emit 触发事件向父组件发送消息
 * @see https://cn.vuejs.org/v2/guide/components.html
 */
export default {
  data() {
    return {
      isCollapsed: false,
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
          const menus = account.menus;
          if (menus && menus.length > 0) {
            this.menus = resolveMenus(menus);
            this.refreshMenus(menus);
          }
        }
      });
    },
    login() {
      new LoginModal().show();
    },
    logout() {
      const $this = this;
      Dialog.confirm('确认退出吗?', (yes) => {
        if (yes) {
          LoginService.logout().then(() => {
            $this.isAuthenticated = false;
            $this.account = {};
            $this.menus = [];
            $this.$router.push('/');
          });
        }
      });
    }
  },
  created() {
    this.$bus.$on('authenticationSuccess', this.getAccount);
    this.getAccount(); // 刷新后获取会话信息
  },
  beforeDestroy() {
    this.$bus.$off('authenticationSuccess', this.getAccount);
  },
  mixins: [mixin]
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .nav-item.dropdown:hover {
    display: block;
  }
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0 !important;
  }
}

@media screen and (max-width: 767px) {
  .nav-item.dropdown,
  .nav-item.dropdown .dropdown-menu {
    display: block;
  }
}
</style>

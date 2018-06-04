<template>
  <div class="panel panel-default">
    <div class="panel-heading">用户列表</div>
    <div class="row">
      <div class="col-sm-12">
        <table class="table table-striped" cellspacing="0" width="100%">
          <thead>
          <tr>
            <th>用户名</th>
            <th>昵称</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>状态</th>
            <th>创建人</th>
            <th>创建时间</th>
            <th>最近修改人</th>
            <th>最近修改时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user of users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <span class="label label-success" v-if="user.activated">已激活</span>
              <span class="label label-warning" v-if="!user.activated">未激活</span>
            </td>
            <td>{{ user.createdBy }}</td>
            <td>{{ user.createdDate }}</td>
            <td>{{ user.lastModifiedBy }}</td>
            <td>{{ user.lastModifiedDate }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="text-center">
          <vb-pagination v-bind="pagination" @pageChange="pageChange"/>
        </div>
      </div>
      <!--
      <div class="col-sm-5">
        <div class="text-left">
          <span>每页 {{ pagination.pageSize }} 条，总共 {{ pagination.totalItems }} 条记录</span>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="text-right">
          <vb-pagination v-bind="pagination" @pageChange="pageChange"/>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import UserService from './UserService';

export default {
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      pagination: {
        totalItems: -1,
        pageSize: 10,
        currPage: 1
      },
      queryVo: {},
      users: []
    };
  },
  methods: {
    getUsers() {
      UserService.getUsers({
        param: this.queryVo,
        page: this.pagination.currPage,
        rows: this.pagination.pageSize
      }).then(resp => resp.body)
        .then((body) => {
          this.users = body.items;
          this.pagination.totalItems = body.totalItems;
        });
    },
    pageChange(page) {
      this.pagination.currPage = page;
      this.getUsers();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

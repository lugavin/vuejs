<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-sm-12">
        <div class="card card-table">
          <div class="card-header">用户列表</div>
          <div class="card-body">
            <div class="container-fluid datatables-wrapper">
              <div class="row datatable-header">
                <div class="col-sm-6">
                  <div class="float-left ml-sm-3">
                    <label class="col-form-label">
                      每页
                      <select style="border-radius: 0.2rem; padding: 0.2rem;"
                              v-model="pagination.pageSize">
                        <option :value="pageSize" v-for="(pageSize, index) of pagination.pageSizes" :key="index">
                          {{ pageSize }}
                        </option>
                      </select> 条
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="float-right mr-sm-3">
                    <label class="col-form-label">
                      <input type="search" class="form-control form-control-sm" placeholder="Search..."
                             v-model="search">
                    </label>
                  </div>
                </div>
              </div>
              <div class="row datatable-body">
                <div class="col-sm-12">
                  <table class="table table-hover table-sm">
                    <thead>
                    <tr>
                      <th scope="col">用户名</th>
                      <th scope="col">昵称</th>
                      <th scope="col">邮箱</th>
                      <th scope="col">手机号</th>
                      <th scope="col">状态</th>
                      <th scope="col">创建人</th>
                      <th scope="col">创建时间</th>
                      <th scope="col">最近修改人</th>
                      <th scope="col">最近修改时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item of filteredData" :key="item.id">
                      <td>{{ item.username }}</td>
                      <td>{{ item.nickname }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.phone }}</td>
                      <td>
                        <span class="badge badge-success" v-if="item.activated">已激活</span>
                        <span class="badge badge-secondary" v-else>未激活</span>
                      </td>
                      <td>{{ item.createdBy }}</td>
                      <td>{{ item.createdDate }}</td>
                      <td>{{ item.lastModifiedBy }}</td>
                      <td>{{ item.lastModifiedDate }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row datatable-footer" v-if="pagination.totalItems > -1">
                <div class="col-sm-7">
                  <div class="datatable-pagination">
                    <uib-pagination v-bind="pagination" @pageChange="pageChange"></uib-pagination>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="datatable-pagination-info text-right">
                    每页 {{ pagination.pageSize }} 条，总共 {{ pagination.totalItems }} 条记录
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from './UserService';

export default {
  data() {
    return {
      pagination: {
        pageSizes: [10, 20, 50, 100],
        totalItems: -1,
        pageSize: 10,
        currPage: 1
      },
      users: [],
      queryVo: {},
      search: ''
    };
  },
  watch: {
    'pagination.pageSize': {
      handler() {
        this.getUsers();
      },
      immediate: true
    }
  },
  computed: {
    filteredData() {
      let keyword = this.search;
      if (!keyword) {
        return this.users;
      }
      keyword = String(keyword).toLowerCase();
      return this.users.filter(row => Object.keys(row).some(key => String(row[key]).toLowerCase().includes(keyword)));
    }
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
.card-table .card-body {
  padding: 0
}

.card-table table {
  margin-bottom: 0
}

.card-table tr td:first-child, .card-table tr th:first-child {
  padding-left: 20px
}

.card-table tr td:last-child, .card-table tr th:last-child {
  padding-right: 20px
}

.card-table thead tr th {
  padding-top: 15px;
  padding-bottom: 10px
}

.datatables-wrapper {
  flex-flow: column;
  align-items: stretch;
  padding-left: 0;
  padding-right: 0;
}

.datatable-footer {
  margin: 0;
  padding: 15px 3px 13px;
  background-color: #f7f7f7;
  border-top: 1px solid #dee2e6;
}

.datatable-footer .datatable-pagination {
  margin: 0;
  white-space: nowrap;
}

.datatable-footer .datatable-pagination-info {
  color: #616161;
  padding-top: 5px;
  white-space: nowrap;
  text-align: right;
}
</style>

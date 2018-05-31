<template>
  <section>
    <div class="row">
      <div class="col-sm-6">
        <div class="panel panel-primary">
          <div class="panel-body">
            前端：Vue + Vue-router + Vuex + Bootstrap + Fetch + Es6 + Webpack <br/>
            后端：CMS + SSO + OSS + SpringCloud + Redis + Elasticsearch <br/>
            服务器：Nginx(Web服务器) + Tomcat(应用服务器) <br/>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <vb-pagination v-bind="pagination"
                       @pageChange="pageChange"/>
      </div>
    </div>
    <p>当前第 {{ pagination.currPage }} 页，每页 {{ pagination.pageSize }} 条，总共 {{ pagination.totalItems }} 条记录</p>
  </section>
</template>

<script>
import VbPagination from '@/components/shared/pagination';

export default {
  data() {
    return {
      pagination: {
        totalItems: 120,
        pageSize: 10,
        currPage: 1
      }
    };
  },
  methods: {
    pageChange(page) {
      this.pagination.currPage = page;
    }
  },
  components: { VbPagination }
};
</script>

<style lang="scss" scoped>
</style>

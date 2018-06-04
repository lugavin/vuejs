<template>
  <section>
    <div class="row">
      <div class="col-sm-12">
        <vb-carousel v-if="images.length">
          <vb-carousel-slide v-for="(img,idx) of images" :key="idx">
            <img :src="img.url">
            <div class="carousel-caption">
              <h3>#{{ idx+1 }} slide label</h3>
              <p>This carousel uses customized default values.</p>
            </div>
          </vb-carousel-slide>
        </vb-carousel>
      </div>
    </div>
    <p></p>
    <div class="row">
      <div class="col-sm-6">
        <button type="button" class="btn btn-primary" v-tooltip="{placement:'top'}" title="tooltip">
          Tooltip on top
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <vb-progressbar :animated="true" :striped="true" :value="progressVal"></vb-progressbar>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <vb-pagination v-bind="pagination" @pageChange="pageChange"/>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <vb-alert>
          当前第 <strong>{{ pagination.currPage }}</strong> 页，
          每页 <strong>{{ pagination.pageSize }}</strong> 条，
          总共 <strong>{{ pagination.totalItems }}</strong> 条记录
        </vb-alert>
      </div>
    </div>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        totalItems: 120,
        pageSize: 10,
        currPage: 1
      },
      images: [],
      progressVal: 0
    };
  },
  mounted() {
    this.images.push(
      { url: 'https://placehold.it/1440x400' },
      { url: '/static/img/bg1.png' },
      { url: '/static/img/bg2.png' },
      { url: '/static/img/bg3.png' },
      { url: '/static/img/bg4.png' }
    );
    setInterval(() => {
      this.progressVal += 1;
    }, 1000);
  },
  methods: {
    pageChange(page) {
      this.pagination.currPage = page;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease;
}
</style>

<template>
  <section>
    <div class="row">
      <div class="col-sm-12">
        <vb-carousel>
          <vb-carousel-slide>
            <img src="../../assets/img/bg2.jpg">
            <div class="carousel-caption">
              <h3>Slide label</h3>
              <p>This carousel uses customized default values.</p>
            </div>
          </vb-carousel-slide>
          <vb-carousel-slide>
            <img src="../../assets/img/bg3.png">
            <div class="carousel-caption">
              <h3>Slide label</h3>
              <p>This carousel uses customized default values.</p>
            </div>
          </vb-carousel-slide>
          <vb-carousel-slide>
            <img src="../../assets/img/bg4.png">
            <div class="carousel-caption">
              <h3>Slide label</h3>
              <p>This carousel uses customized default values.</p>
            </div>
          </vb-carousel-slide>
          <vb-carousel-slide>
            <img src="https://placehold.it/1440x400">
            <div class="carousel-caption">
              <h3>Slide label</h3>
              <p>This carousel uses customized default values.</p>
            </div>
          </vb-carousel-slide>
        </vb-carousel>
      </div>
    </div>
    <p></p>
    <div class="row">
      <div class="col-sm-6">
        <vb-progressbar :value="50"
                        :animated="true"
                        :striped="true"
                        :showValue="true"> Loading... </vb-progressbar>
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
import VbPagination from '../bootstrap/pagination';
import VbAlert from '../bootstrap/alert';
import VbCarousel from '../bootstrap/carousel';
import VbCarouselSlide from '../bootstrap/carousel/slide';
import VbProgressbar from '../bootstrap/progressbar';

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
  components: { VbPagination, VbAlert, VbCarousel, VbCarouselSlide, VbProgressbar }
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

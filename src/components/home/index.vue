<template>
  <section>
    <vb-carousel v-if="images.length">
      <vb-carousel-slide v-for="(img,idx) of images" :key="idx">
        <!--<img class="img-fluid" src="https://placehold.it/1440x400">-->
        <img class="d-block w-100" :src="img.url">
        <div class="carousel-caption d-none d-md-block">
          <h3>#{{ idx+1 }} slide label</h3>
          <p>This carousel uses customized default values.</p>
        </div>
      </vb-carousel-slide>
    </vb-carousel>
    <div class="container my-5">
      <div class="row">
        <div class="col">
          <div class="card border-primary">
            <div class="card-body">
              <p class="card-text">前端：Vue + Vue-Router + Bootstrap + Fetch + ES6 + Webpack</p>
              <p class="card-text">后端：SpringCloud + SpringSession + Redis + Elasticsearch</p>
              <p class="card-text">服务器：Nginx(Web服务器) + Tomcat(应用服务器)</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card border-info">
            <div class="card-body">
              <p>
                <vb-alert>A simple primary alert</vb-alert>
              </p>
              <p>
                <vb-progressbar :animated="true"
                                :striped="true"
                                :value="progressVal"
                                :showValue="true"></vb-progressbar>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card border-info">
            <div class="card-body">
              <div v-if="pagination.totalItems > -1">
                <vb-pagination v-bind="pagination" @pageChange="pageChange"/>
                <p class="card-text">
                  当前第 <strong>{{ pagination.currPage }}</strong> 页，
                  每页 <strong>{{ pagination.pageSize }}</strong> 条，
                  总共 <strong>{{ pagination.totalItems }}</strong> 条记录
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card border-success">
            <div class="card-body">
              <p>
                <button type="button" class="btn btn-primary" title="tooltip"
                        @click="collapsed=!collapsed" v-tooltip="{placement:'top'}">
                  Toggle
                </button>
              </p>
              <p class="card-text" v-collapse="collapsed">You can collapse this card by clicking Toggle</p>
            </div>
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
      progressVal: 0,
      collapsed: false
    };
  },
  mounted() {
    this.images.push(
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
.row {
  margin-bottom: 1rem;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease;
}
</style>

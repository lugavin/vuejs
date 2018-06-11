<template>
  <section>
    <uib-carousel v-if="images.length">
      <uib-carousel-slide v-for="(img,idx) of images" :key="idx">
        <!--<img class="img-fluid" src="https://placehold.it/1440x400">-->
        <img class="d-block w-100" :src="img.url">
        <div class="carousel-caption d-none d-md-block">
          <h3>#{{ idx+1 }} slide label</h3>
          <p>This carousel uses customized default values.</p>
        </div>
      </uib-carousel-slide>
    </uib-carousel>
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
                <uib-alert>A simple primary alert</uib-alert>
              </p>
              <p>
                <uib-progressbar :striped="progress.striped"
                                 :animated="progress.animated"
                                 :showValue="progress.showValue"
                                 :value="progress.value"></uib-progressbar>
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
                <uib-pagination v-bind="pagination" @pageChange="pageChange"></uib-pagination>
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
                <button type="button" class="btn btn-primary"
                        v-uib-popover="{
                          title: 'Popover title',
                          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus'
                        }"
                        @click="collapsed=!collapsed">
                  Toggle
                </button>
              </p>
              <p class="card-text text-muted" v-uib-collapse="collapsed">
                You can collapse this card by clicking Toggle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-wrapper">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="editor-window">
              <div class="editor-menubar">
                <span class="editor-button closable"></span>
                <span class="editor-button minimize"></span>
                <span class="editor-button maximize"></span>
                <span class="editor-filename">vue-uib.js</span>
              </div>
              <pre>
                <code>
                  $ npm install vue-uib --save
                </code>
              </pre>
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
      progress: {
        striped: true,
        animated: true,
        showValue: true,
        value: 0
      },
      images: [],
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
    const intervalId = setInterval(() => {
      if (this.progress.value > 80) {
        if (this.progress.value === 100) {
          this.progress.animated = false;
          clearInterval(intervalId);
        } else {
          this.progress.value += 1;
        }
      } else {
        this.progress.value += Math.floor(Math.random() * 10);
      }
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

.tooltip-inner {
  background-color: #00cc00;
}

.tooltip.bs-tooltip-right .arrow:before {
  border-right-color: #00cc00 !important;
}

.tooltip.bs-tooltip-left .arrow:before {
  border-left-color: #00cc00 !important;
}

.tooltip.bs-tooltip-bottom .arrow:before {
  border-bottom-color: #00cc00 !important;
}

.tooltip.bs-tooltip-top .arrow:before {
  border-top-color: #00cc00 !important;
}

.container > .row:not(:last-child) {
  margin-bottom: 1rem;
}

.editor-wrapper {
  padding: 90px 0;
  background-color: #3a3e64;
  color: rgba(255, 255, 255, .6);
}

.editor-window {
  background-color: #141414;
  border-radius: 5px 5px 0 0;
  color: rgba(255, 255, 255, .6);
}

.editor-window .editor-menubar {
  background-color: #e5e4e4;
  height: 50px;
  display: flex;
  align-items: center;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.editor-menubar > .editor-button {
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin: 0 2px;
  box-shadow: 0 0 10px 1px;
}

.editor-menubar .closable {
  background-color: red;
  margin-left: 10px;
}

.editor-menubar .minimize {
  background-color: #ff0;
}

.editor-menubar .maximize {
  background-color: green;
}

.editor-menubar .editor-filename {
  color: #002b36;
  font-family: Menlo, dejavu sans mono, lucida console, monospace;
  font-size: 12pt;
  font-weight: 600;
  margin-left: 10px;
}

.editor-window pre {
  overflow-x: auto;
  border-radius: 0 0 5px 5px;
  padding-left: 20px;
  height: 100%;
  color: #85ff00;
}

.editor-window code,
.editor-window code span {
  font-family: Menlo, dejavu sans mono, lucida console, monospace;
  font-size: 14pt;
}
</style>

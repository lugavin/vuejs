<template>
  <section>
    <uib-carousel>
      <uib-carousel-slide v-for="(poster,idx) of posters" :key="idx">
        <!--<img class="img-fluid" src="https://placehold.it/1440x400">-->
        <img class="d-block w-100" :src="require(`@/assets/img/${poster.url}`)">
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
              <p class="card-text">Front-end: Vue + Vuex + Vue-Router + ES6</p>
              <p class="card-text">Back-end: Nest + TypeORM + TypeScript</p>
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
                <uib-progressbar v-bind="progress"></uib-progressbar>
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
                <uib-pagination :pageSize="pagination.pageSize"
                                :totalItems="pagination.totalItems"
                                :currPage.sync="pagination.currPage"></uib-pagination>
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
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-info" v-uib-tooltip="tooltip">Tooltip</button>
                <button type="button" class="btn btn-primary" v-uib-popover="popover">Popover</button>
                <button type="button" class="btn btn-success" @click="collapsed=!collapsed">Collapse</button>
                <button type="button" class="btn btn-secondary" @click="showModal=true">Modal</button>
              </div>
              <p class="card-text text-muted collapse" v-uib-collapse="collapsed">
                You can collapse this card by clicking Collapse
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card border-info">
            <div class="card-body">
              <uib-rating :rate.sync="rating.currentRate" :resettable="true">
                <!--
                <template slot-scope="{ context }">
                  <span class="star" :class="{full: context.fill === 100}">
                    <span class="half" :style="{width: context.fill+'%'}">&hearts;</span>&hearts;
                  </span>
                </template>
                -->
              </uib-rating>
            </div>
          </div>
        </div>
        <div class="col">
          <uib-tabset>
            <uib-tab title="Home">This is the Home tab content.</uib-tab>
            <uib-tab title="Profile">This is the Profile tab content.</uib-tab>
          </uib-tabset>
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
    <uib-modal v-if="showModal">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="close" aria-label="Close" @click="showModal=false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="h5" role="alert">Modal Body</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" @click="showModal=false">Close</button>
        <button type="button" class="btn btn-primary">OK</button>
      </div>
    </uib-modal>
  </section>
</template>

<script>
export default {
  data: () => ({
    posters: require('@/data/posters.json'),
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
    rating: {
      currentRate: 8
    },
    tooltip: {
      title: 'Tooltip on top'
    },
    popover: {
      title: 'Popover title',
      content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus'
    },
    collapsed: false,
    showModal: false
  }),
  mounted() {
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
  }
};
</script>

<style scoped>

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

/*
.star {
  position: relative;
  display: inline-block;
  font-size: 3rem;
  color: #d3d3d3;
}

.full {
  color: red;
}

.half {
  position: absolute;
  display: inline-block;
  overflow: hidden;
  color: red;
}
*/
</style>

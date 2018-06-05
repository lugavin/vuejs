<template>
  <ul class="pagination" :class="[size ? 'pagination-' + size : '']">
    <li class="page-item" :class="{disabled: !hasPrevious || disabled}" v-if="boundaryLinks">
      <a class="page-link" href="javascript:void(0)" @click="!!selectPage(1)">&laquo;&laquo;</a>
    </li>
    <li class="page-item" :class="{disabled: !hasPrevious || disabled}" v-if="directionLinks">
      <a class="page-link" href="javascript:void(0)" @click="!!selectPage(page-1)">&laquo;</a>
    </li>
    <li class="page-item" :class="{active: pageNo === page, disabled: isEllipsis(pageNo) || disabled}"
        v-for="(pageNo, index) of pages" :key="index">
      <a class="page-link" v-if="isEllipsis(pageNo)">...</a>
      <a class="page-link" href="javascript:void(0)" @click="!!selectPage(pageNo)" v-if="!isEllipsis(pageNo)">
        {{ pageNo }}
        <span class="sr-only" v-if="pageNo === page">(current)</span>
      </a>
    </li>
    <li class="page-item" :class="{disabled: !hasNext || disabled}" v-if="directionLinks">
      <a class="page-link" href="javascript:void(0)" @click="!!selectPage(page+1)">&raquo;</a>
    </li>
    <li class="page-item" :class="{disabled: !hasNext || disabled}" v-if="boundaryLinks">
      <a class="page-link" href="javascript:void(0)" @click="!!selectPage(pageCount)">&raquo;&raquo;</a>
    </li>
  </ul>
</template>

<script>
export const options = {
  // Whether to disable buttons from user input
  disabled: { type: Boolean, default: false },
  // Whether to show the "First" and "Last" page links
  boundaryLinks: { type: Boolean, default: false },
  // Whether to show the "Next" and "Previous" page links
  directionLinks: { type: Boolean, default: true },
  // Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
  ellipses: { type: Boolean, default: true },
  // Whether to rotate pages when maxSize > number of pages. Current page will be in the middle
  rotate: { type: Boolean, default: true },
  // Pagination display size: small or large
  size: { type: String },
  // Maximum number of pages to display.
  maxSize: { type: Number, default: 5 },
  // Number of items in collection.
  totalItems: { type: Number, required: true },
  // Number of items per page.
  pageSize: { type: Number, default: 10 },
  // Current page. Page numbers start with 1
  currPage: { type: Number, default: 1 }
};
/**
 * @see https://cn.vuejs.org/v2/guide/components-props.html
 * @see https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/pagination/pagination.ts
 */
export default {
  props: options,
  data() {
    return {
      pages: [],
      pageCount: 0,
      page: this.currPage
    };
  },
  computed: {
    totalPages() {
      return Math.floor(((this.totalItems + this.pageSize) - 1) / this.pageSize);
    },
    hasPrevious() {
      return this.page > 1;
    },
    hasNext() {
      return this.page < this.pageCount;
    }
  },
  mounted() {
    this.updatePages(this.page);
  },
  watch: {
    totalPages() {
      this.updatePages(this.page);
    }
  },
  methods: {
    isEllipsis(pageNo) {
      return pageNo === -1;
    },
    selectPage(pageNo) {
      this.updatePages(pageNo);
    },
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    applyEllipses(start, end) {
      if (this.ellipses) {
        if (start > 0) {
          if (start > 1) {
            this.pages.unshift(-1);
          }
          this.pages.unshift(1);
        }
        if (end < this.pageCount) {
          if (end < (this.pageCount - 1)) {
            this.pages.push(-1);
          }
          this.pages.push(this.pageCount);
        }
      }
    },
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    applyRotation() {
      let start = 0;
      let end = this.pageCount;
      const leftOffset = Math.floor(this.maxSize / 2);
      const rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
      if (this.page <= leftOffset) {
        // very beginning, no rotation -> [0..maxSize]
        end = this.maxSize;
      } else if ((this.pageCount - this.page) < leftOffset) {
        // very end, no rotation -> [len-maxSize..len]
        start = this.pageCount - this.maxSize;
      } else {
        // rotate
        start = this.page - leftOffset - 1;
        end = this.page + rightOffset;
      }
      return [start, end];
    },
    /**
     * Paginates page numbers based on maxSize items per page
     */
    applyPagination() {
      const page = Math.ceil(this.page / this.maxSize) - 1;
      const start = page * this.maxSize;
      const end = start + this.maxSize;
      return [start, end];
    },
    setPageInRange(newPageNo) {
      const prePageNo = this.page;
      this.page = Math.max(Math.min(newPageNo, this.pageCount), 1);
      if (this.page !== prePageNo && this.isNumber(this.totalItems)) {
        this.pageChange();
      }
    },
    updatePages(newPage) {
      this.pageCount = Math.ceil(this.totalItems / this.pageSize);

      if (!this.isNumber(this.pageCount)) {
        this.pageCount = 0;
      }

      // fill-in model needed to render pages
      this.pages.length = 0;
      for (let i = 1; i <= this.pageCount; i += 1) {
        this.pages.push(i);
      }

      // set page within 1..max range
      this.setPageInRange(newPage);

      // apply maxSize if necessary
      if (this.maxSize > 0 && this.pageCount > this.maxSize) {
        let start = 0;
        let end = this.pageCount;

        // either paginating or rotating page numbers
        if (this.rotate) {
          [start, end] = this.applyRotation();
        } else {
          [start, end] = this.applyPagination();
        }

        this.pages = this.pages.slice(start, end);

        // adding ellipses
        this.applyEllipses(start, end);
      }
    },
    isNumber(value) {
      return !Number.isNaN(Number.parseInt(`${value}`, 10));
    },
    /**
     *  An event fired when the page is changed.
     *  Event's payload equals to the newly selected page.
     *  Will fire only if collection size is set and all values are valid.
     *  Page numbers start with 1
     */
    pageChange() {
      this.$emit('pageChange', this.page);
    }
  }
};
</script>

<template>
  <div class="page-wrapper">
    <div>
      <div style="font-size: 86px; font-weight: bold; color: #000; margin: 10px 0 0 4px;">404</div>
      <div style="font-size: 24px; color:#9b9b9b; margin: 0 0 20px;">您请求的资源不存在或已搬家</div>
      <div style="font-size: 16px; color:#9b9b9b; margin: 20px 0;">
        您可以<a href="javascript:history.back()">返回上一页</a>
      </div>
    </div>
    <img src="/static/img/404.png" style="position: absolute; top: 40px; right: 0; width: 480px; height: 240px;">
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.page-wrapper {
  margin: 7% auto 0;
  max-width: 380px;
  min-height: 180px;
  position: relative;
  padding: 30px 450px 15px 0;
  box-sizing: content-box;
}
</style>

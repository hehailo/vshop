<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="zoomPicture"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="imgMask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgObj() {
      console.log("this", this.skuImageList);
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    this.$bus.$on("changeZoomImage", (index) => {
      console.log("index", index);
      this.currentIndex = index;
    });
  },
  methods: {
    zoomPicture(event) {
      //计算出遮罩层的位置
      let mask = this.$refs.imgMask;
      let bigImg = this.$refs.bigImg;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      if (left <= 0) {
        left = 0;
      }
      if (left >= mask.offsetWidth) {
        left = mask.offsetWidth;
      }
      if (top <= 0) {
        top = 0;
      }
      if (top >= mask.offsetHeight) {
        top = mask.offsetHeight;
      }
      // 距离限制
      mask.style.top = top + "px";
      mask.style.left = left + "px";

      //大图片相对于父元素的距离
      //控制大图片的内容
      // 大图片是小图片放大两倍的结果
      // 大图片实现原理是  把图片移动到展示的区域内部
      // 鼠标左移  图片右移；鼠标右移  图片左移;图片移动的距离是鼠标移动的两倍
      bigImg.style.left = -left * 2 + "px";
      bigImg.style.top = -top * 2 + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorlist" :key="floor.id" :list="floor" ></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action 获取组件数据
    this.$store.dispatch("getFloorList");
    // 获取用户信息
    this.$store.dispatch("getUserInfo")
  },
  computed: {
    ...mapState({
      floorlist: (state) => state.home.floorlist,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>
<template>
  <div>
    {{keyword}}
  </div>
</template>

<script>
    export default {
        name: "Search",
        props:['keyword'],
        mounted(){
          console.log(this.$props)
        }
    };
</script>

<style lang="less" scoped>  
</style>
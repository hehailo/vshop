<template>
  <div>
    <!-- 商品分类列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryname">
              {{ searchParams.categoryname
              }}<i @click="removeCatoryName"> x </i>
            </li>

            <!-- 搜索关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyWord"> x </i>
            </li>

            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark"> x </i>
            </li>

            <!-- 属性的面包屑 -->
            <!-- 72:功率:100W -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeAttr(index)"> x </i>
            </li>
          </ul>
        </div>

        <!--selector 筛选条件-->
        <SearchSelector @tradeInfo="tradeInfo" @attrInfo="attrInfo" />

        <!--details 搜索结果-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li
                  v-for="orderOption in orderOptions"
                  :key="orderOption.id"
                  :class="{ active: currentSeq == orderOption.id }"
                  @click="changeOrder(orderOption.id)"
                >
                  <a>
                    {{ orderOption.name }}
                    <span v-show="currentSeq == orderOption.id">
                      <span class="icon iconfont" v-show="sortOreder == 'asc'"
                        >&#xe66c;</span
                      >
                      <span class="icon iconfont" v-show="sortOreder == 'desc'"
                        >&#xe609;</span
                      >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="goDetail(good.id)">
                      <img
                        :src="
                          good.defaultImg ||
                          'http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAbqkuAAENKBtJukQ551.jpg'
                        "
                      />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :middleNum="5"
            @getPageNum="getPageNum"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";

export default {
  name: "Search",
  data() {
    return {
      orderOptions: [
        { id: 1, name: "综合" },
        { id: 2, name: "价格" },
      ],
      searchParams: {
        categoryname: "",
        category1Id: "",
        category2Id: "",
        category3Id: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  mounted() {
    console.log("当前已进入搜索结果页面----");
  },
  beforeMount() {
    console.log("search组件的beforeMount");
    // Object.assign(this.searchParams, this.$route.query, this.$route.params);
    this.searchParams = {
      ...this.searchParams,
      ...this.$route.query,
      ...this.$route.params,
    };
    this.getData();
  },
  computed: {
    currentSeq() {
      return this.searchParams.order.split(":")[0];
    },
    sortOreder() {
      return this.searchParams.order.split(":")[1];
    },
    ...mapState({
      total: (state) => {
        //函数体
        return state.search.searchlist.total;
      },
    }),
    ...mapGetters(["goodsList"]),
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 移除目录的面包屑
    removeCatoryName() {
      // 这一步需要 因为要处理页面
      this.searchParams.categoryname = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 移除搜索关键字的 keyword
    removeKeyWord() {
      //处理页面
      this.searchParams.keyword = undefined;
      // 通知兄弟组件header清除搜索框关键字
      this.$bus.$emit("clearKeyWord");
      // 再次发送请求
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 移除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 点击品牌查询
    tradeInfo(info) {
      this.searchParams.trademark = info.tmId + ":" + info.tmName;
      this.getData();
    },
    // 点击筛选属性查询
    attrInfo(attr, attrVal) {
      // attrId: 107
      // attrName: "二级手机"
      // attrValueList: ["小米", "华为", "苹果"]
      let item = attr.attrId + ":" + attrVal + ":" + attr.attrName;
      this.searchParams.props.push(item); //106:安卓手机:手机一级
      this.getData();
    },
    // 移除属性面包屑
    removeAttr(index) {
      console.log(index);
      // 影响页面
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //"1:desc"
    // 点击之后 顺序变逆序
    changeOrder(orderid) {
      let temp = "";
      if (this.currentSeq == orderid) {
        if (this.sortOreder == "asc") {
          temp = "desc";
        } else {
          temp = "asc";
        }
        this.searchParams.order = orderid + ":" + temp;
      } else {
        temp = "desc";
        this.searchParams.order = orderid + ":" + temp;
      }
      console.log("this.searchParams.order", this.searchParams.order);
      this.getData();
    },
    getPageNum(num) {
      this.searchParams.pageNo = num;
      this.getData();
    },
    goDetail(goodId) {
      console.log("/detail/" + goodId);
      this.$router.push("/detail/" + goodId);
    },
  },
  watch: {
    // 监听路由 路由发生变化
    $route() {
      console.log("searchParams", this.searchParams);
      this.searchParams = {
        ...this.searchParams,
        ...this.$route.query,
        ...this.$route.params,
      };
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
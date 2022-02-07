<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @input="changeChecedState(cart, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price"> {{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeSkunum('minus', 1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @input="changeSkunum('change', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="changeSkunum('plus', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @input="selectAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deletAllSelected">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" @click="settlement">结算</a> -->
          <router-link class="sum-btn" to='/trade'>结算</router-link>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改商品数量
    // 避免频繁点击 需要节流
    changeSkunum: throttle(async function (type, prdNum, cart) {
      switch (type) {
        case "add":
          prdNum = 1;
          break;
        case "minus":
          prdNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // prdNum 是输入的值 需要减去原来的值
          // 非法数字 或者 小于1 则为0
          // 有小数 取整
          // 正常
          prdNum =
            isNaN(prdNum) || prdNum < 1 ? 0 : parseInt(prdNum) - cart.skuNum;
          break;
      }
      try {
        // 调用修改数据库接口
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: prdNum,
        });
        //成功之后 刷新获取数据
        this.getData();
      } catch (error) {
        console.log("改变购物车商品数量失败!");
      }
    }, 500),
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("deleteCartById", skuId);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    async changeChecedState(cart, value) {
      let checked = value ? "1" : "0";
      let params = {
        skuId: cart.skuId,
        checked,
      };
      try {
        await this.$store.dispatch("changeChecedState", params);
        // 修改状态成功
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    async deletAllSelected() {
      try {
        await this.$store.dispatch("deleteAllSelected");
        // 刷新获取数据
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },
    async selectAll() {
      try {
        await this.$store.dispatch("selectAll");
        // 商品状态批量修改成功
        this.getData();
      } catch (error) {
        console.log(error);
      }
    },

    settlement(){}
  },
  computed: {
    ...mapState({
      cartList: (state) => {
        //函数体
        return state.shopcart.cartList || [];
      },
    }),
    // 计算总价
    totalPrice() {
      let sum = 0;
      this.cartList.forEach((element) => {
        sum += element.skuNum * element.skuPrice;
      });
      return sum;
    },
    isAllCheck() {
      return this.cartList.every((item) => {
        return item.isChecked == 1;
        //函数体
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      border-bottom: 0;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins,.plus{
            height: 10px;
            line-height: 10px;
            cursor: pointer;
          }
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 5px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 20px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 5px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
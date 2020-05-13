<template>
  <div>
    <div class="fication">
      <navbar></navbar>
      <div class="content">
        <!-- 菜单 -->
        <div class="menu">
          <el-dropdown trigger="click" v-for="(items,i) of menu" :key="i">
            <span class="el-dropdown-link">
              {{items.title}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,j) of items.name" :key="j">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 面包屑 -->
        <div class="crumbs">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>一级导航名称</el-breadcrumb-item>
            <el-breadcrumb-item>炒锅</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 商品 -->
        <div class="flex">
          <div class="shop" v-for="(item, i) of shop" :key="i">
            <div class="image">
              <img :src="item.sp" alt />
            </div>
            <div class="price">
              <p>¥{{item.price}}</p>
              <s>¥{{item.del}}</s>
            </div>
            <p class="wz">{{item.name}}</p>
            <div class="num">
              <p>销量：{{item.sales}}</p>
              <p>收藏：{{item.collet}}</p>
            </div>
          </div>
        </div>
        <!-- 分页查询 -->
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="10000"
            prev-text="上一页"
            next-text="下一页"
          ></el-pagination>
        </div>
        <!-- 右边导航 -->
        <rightNav></rightNav>
        <!-- 底部 -->
      </div>
    </div>
    <mybottom></mybottom>
  </div>
</template>

<script>
import navbar from "../../components/nav";
import rightNav from "../../components/right_nav";
import mybottom from "../gw/Bottom";
export default {
  components: {
    navbar,
    rightNav,
    mybottom
  },
  data() {
    return {
      // 分页查询
      currentPage3: 1,
      // 菜单
      menu: [
        {
          title: "一级导航名称",
          name: ["二级导航", "二级导航", "二级导航", "二级导航"]
        },
        {
          title: "一级导航名称",
          name: ["二级导航", "二级导航", "二级导航", "二级导航"]
        },
        {
          title: "一级导航名称",
          name: ["二级导航", "二级导航", "二级导航", "二级导航"]
        },
        {
          title: "一级导航名称",
          name: ["二级导航", "二级导航", "二级导航", "二级导航"]
        }
      ],
      // 商品
      shop: [
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        },
        {
          sp: require("../../assets/img/zch/shop/conn.png"),
          price: 1888.88,
          del: 2888.88,
          name: "不锈钢蒸锅三层多3层蒸馒头的蒸笼",
          sales: 271,
          collet: 542
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>$size: 0.8;
.fication {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  width: 80%;
  margin-top: 1%;
}
/* 菜单 */
.menu >>> .el-dropdown {
  border: 1px*$size solid rgba(240, 240, 240, 1);
  border-radius: 10px*$size;
  padding: 1% 1%;
}
.menu >>> .el-dropdown:not(:first-child) {
  margin-left: 1%;
}
.menu >>> .el-dropdown-link {
  font-size: 18px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
}
/*  面包屑 */
.crumbs {
  margin-top: 1%;
  border-bottom: 2px*$size dotted rgba(102, 102, 102, 1);
  padding-bottom: 1%;
  margin-bottom: 1%;
}
.crumbs >>> .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: red;
}
/* 商品 */
.flex {
  display: flex;
  flex-wrap: wrap;
}
.shop:not(:nth-child(4n + 1)) {
  margin-left: 3%;
}
.shop:nth-child(n + 5) {
  margin-top: 3%;
}
.shop {
  border: 4px*$size solid rgba(0, 0, 0, 0.08);
  border-radius: 6px*$size;
  width: 22%;
}
.shop .image img {
  width: 100%;
  height: 100%;
}
.shop .price {
  display: flex;
  align-items: baseline;
  margin-top: 1%;
  padding: 0 3%;
}
.shop .price p {
  font-size: 22px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(224, 18, 32, 1);
}
.shop .price s {
  font-size: 16px*$size;
  font-family: PingFang SC;
  font-weight: 400;
  text-decoration: line-through;
  color: rgba(102, 102, 102, 1);
}
.shop .wz {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 100%;
  margin-top: 1%;
  padding: 0 3%;
}
.shop .num {
  display: flex;
  justify-content: space-between;
  font-size: 16px*$size;
  font-family: DFYuanW5-GB;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-top: 1%;
  padding: 0 3% 3%;
}
.block {
  margin: 2% 0;
}
.block >>> .btn-next,
.block >>> .btn-prev {
  width: 6%;
}
.block >>> .number {
  width: 6%;
}
</style>
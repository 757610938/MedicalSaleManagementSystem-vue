<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <div>
          <a href="#" @click.prevent="taggleCollapse">
            <img src="../assets/images/logo.png" alt height="16" v-show="flag" />
            <img src="../assets/images/logo_sm.png" alt height="16" v-show="flag1" />
          </a>
        </div>
        <el-menu
          :default-active="activePath"
          background-color="#8b76dd"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
              index="/users"
              @click="saveNavState('/users')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户信息管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/order"
              @click="saveNavState('/order')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单审核</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/jurisdi"
              @click="saveNavState('/jurisdi')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>销售管理</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
              index="sorder"
              @click="saveNavState('sorder')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="smedicine"
              @click="saveNavState('smedicine')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>药品信息管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="spush"
              @click="saveNavState('spush')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>输出管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>仓库管理</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
              index="3-1"
              @click="saveNavState('3-1')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>库存管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="3-2"
              @click="saveNavState('3-2')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>出入库信息管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="3-3"
              @click="saveNavState('3-3')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>输出管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>采购管理</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
              index="4-1"
              @click="saveNavState('4-1')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="4-2"
              @click="saveNavState('4-2')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>采购记录</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="4-3"
              @click="saveNavState('4-3')"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>输出管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="info" icon="el-icon-close" circle @click="logout"></el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true,
      flag1: false,
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$message.warning('您已退出')
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.console.error('获取列表失败')
      this.menuList = res.data
      console.log(res)
    },
    taggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.flag = !this.flag
      this.flag1 = !this.flag1
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100vh;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  font-size: 20px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background: linear-gradient(180deg, #8b76dd 40%, #727cf5 100%);
  color: #333;
  line-height: 0px;
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
  }
  .el-menu {
    border-right: none;
  }
}
</style>

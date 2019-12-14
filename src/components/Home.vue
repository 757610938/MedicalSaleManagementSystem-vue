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
          active-text-color="#70B0C4"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-menu-item index="info" @click="saveNavState('info')">
            <i class="el-icon-s-custom"></i>
            <span slot="title">我的账号</span>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-position"></i>
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/users" @click="saveNavState('/users')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户信息管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/order" @click="saveNavState('/order')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单审核</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/jurisdi" @click="saveNavState('/jurisdi')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-position"></i>
              <span>销售管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="sorder" @click="saveNavState('sorder')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="scustomer" @click="saveNavState('scustomer')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>客户管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="spush" @click="saveNavState('spush')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>输出管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-position"></i>
              <span>仓库管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="stock" @click="saveNavState('stock')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>仓库信息管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="ostock" @click="saveNavState('ostock')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>出库管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="pstock" @click="saveNavState('pstock')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>入库管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-position"></i>
              <span>采购管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="porder" @click="saveNavState('porder')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="precords" @click="saveNavState('precords')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>采购记录</span>
              </template>
            </el-menu-item>
            <el-menu-item index="psupplier" @click="saveNavState('psupplier')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>供应商管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="medicine" @click="saveNavState('medicine')">
            <i class="el-icon-position"></i>
            <span slot="title">药品管理</span>
          </el-menu-item>
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
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-col :span="21">
            <!-- <el-card shadow="always" :body-style="{ padding: '30px'}">
              <el-dropdown :hide-on-click="true" @command="handleCommand">
                <a href="#">
                  <i class="el-icon-user"></i>
                </a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item disabled>欢迎您!</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-user" command="a">我的账号</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting" command="a">设置</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close" command="c">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-card>-->
          </el-col>
          <el-divider direction="vertical"></el-divider>
          <el-col :span="3" class="col">
            <el-dropdown :hide-on-click="true" @command="handleCommand" class="loca">
              <el-avatar :src="imgUrl" @error="errorHandler" fit="contain">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item disabled>欢迎您!</el-dropdown-item> -->
                <el-dropdown-item icon="el-icon-user" command="a">我的账号信息</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting" command="b">设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" command="c">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="coldiv">欢迎您！{{username}}</div>
          </el-col>
          <el-drawer title="我来了" :visible.sync="drawer" :with-header="false">
            <!-- <el-row>
              <el-col :span="8" fit="fill">
                <el-card :body-style="{ padding: '0px' }" fit="fill">
                  <img :src="imgUrl" class="image"/>
                  <div style="padding: 14px;">
                    <span>{{username}}</span>
                    <div class="bottom clearfix">
                      <el-button type="text">上传头像</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>-->
          </el-drawer>
          <el-dialog title="确定要退出吗？" :visible.sync="centerDialogVisible" width="30%" center>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="logout"
                v-loading.fullscreen.lock="fullscreenLoading"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import imgUrl from '@/assets/images/user.png'
export default {
  data() {
    return {
      flag: true,
      flag1: false,
      centerDialogVisible: false,
      fullscreenLoading: false,
      drawer: false,
      imgUrl,
      username: '吴梓键',
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
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
        this.$message.warning('您已退出')
        this.$router.push('/login')
      }, 1000)
    },
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('menus')
    //   if (res.meta.status !== 200) return this.$message.console.error('获取列表失败')
    //   this.menuList = res.data
    //   console.log(res)
    // },
    getMenuList() {
      console.log('111')
    },
    taggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.flag = !this.flag
      this.flag1 = !this.flag1
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    handleCommand(command) {
      // this.$message.warning('click on item ' + command)
      if (command === 'c') {
        // this.logout()
        this.centerDialogVisible = true
        console.log(command)
      } else if (command === 'b') {
        this.drawer = true
      } else if (command === 'a') {
        this.saveNavState('info')
        this.$router.push('/info')
      }
    },
    errorHandler() {
      return true
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
  padding: 0px;
  // color: #333;
  // text-align: center;
  // font-size: 20px;
  // line-height: 60px;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  // > div {
  //   display: flex;
  //   align-items: center;
  // }
}
.el-aside {
  background: linear-gradient(180deg, #8b76dd 50%, #727cf5 150%);
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
.el-main {
  background-color: #f7f9fc;
}
.box-card {
  width: 480px;
}
.loca {
  padding: 10px;
}
.col {
  background-color: #fafbfd;
  display: flex;
  align-items: center;
}
.coldiv {
  padding: 5px;
  font-size: 14px;
  color: #98a7b0;
}
</style>

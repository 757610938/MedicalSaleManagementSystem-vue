<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的账号</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="24" style="border-radius: 2px;min-height: 324px; ">
        <el-card style="border-radius: 2px;min-height: 342px" :body-style="{ padding: '0px'}">
          <div style="width: 100%;height: 240px" class="middle">
            <div style="position:relative; top:160px;margin-left: 50px; display:inline-block">
              <el-image style="width:150px;height: 150px" :src="imgUrl" fit="cover"></el-image>
            </div>
            <div style="position:relative; top:135px;margin-left: 10px; display:inline-block">
              <h3>{{userlist.username}}</h3>
            </div>
            <div
              style="position:relative; top:155px;margin-left: -60px; display:inline-block"
              class="txtm"
            >{{userlist.position}}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" style="padding: 20px; margin-left: 0px">
        <div class="grid-content bg-purple-dark">
          <el-card class="grid-content card">
            <!-- <div class="img" fit="cover" style="display:inline-block">
              <el-image style="height: 100%" :src="imgUrl" fit="cover"></el-image>
            </div>
            <div style="display:inline-block"></div>
            <div>
              <el-button type="text" class="button" style="margin-left: 20px; padding: 10px">上传头像</el-button>
              <el-button type="text" class="button" style="margin-left: 20px; padding: 10px">上传头像</el-button>
            </div>
            <div style="margin-left: 20px;display:inline-block">
              <h3>{{ userlist.username }}</h3>
            </div>
            <div style="display:inline-block" class="txtp">{{ userlist.position }}</div>
            <div style="display:inline-block" class="txtm">座右铭:{{ userlist.Motto }}</div>-->
            <el-calendar v-model="time">
              <template slot="dateCell" slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''"  @click="drawer = true">{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
              </template>
            </el-calendar>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-contents bg-purple" style="margin-top:20px">
          <el-card class="grid-contents">
            <el-divider content-position="left">
              <i class="el-icon-s-promotion"></i>
            </el-divider>
            <div style="display:inline-block">
              <span class="textm">账号：</span>
              {{ userlist.username }}
            </div>
            <div style="display:inline-block;position: relative;left: 25%;">
              <span class="textm">性别：</span>
              {{ userlist.username }}
            </div>
            <div style="display:inline-block;position: relative;left: 55%;">
              <span class="textm">电话：</span>
              {{ userlist.username }}
            </div>
            <el-divider>
              <i class="el-icon-s-promotion"></i>
            </el-divider>
            <div style="display:inline-block">
              <span class="textm">部门：</span>
              {{ userlist.username }}
            </div>
            <div style="display:inline-block;position: relative;left: 25%;">
              <span class="textm">职位：</span>
              {{ userlist.username }}
            </div>
            <div style="display:inline-block;position: relative;left: 55%;">
              <span class="textm">工资：</span>
              {{ userlist.username }}
            </div>
            <el-divider content-position="right">
              <i class="el-icon-s-promotion"></i>
            </el-divider>
            <div style="display:inline-block">
              <span class="textm">邮箱：</span>
              {{ userlist.username }}
            </div>
            <div style="display:inline-block;position: relative;left: 25%;">
              <span class="textm">电话：</span>
              {{ userlist.username }}
            </div>
            <div style="display:inline-block;position: relative;left: 55%;">
              <span class="textm">电话：</span>
              {{ userlist.username }}
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- <el-col :span="10" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="grid-content">
            <div slot="header">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
        </div>
      </el-col>-->
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="grid-content">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>-->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import imgUrl from '@/assets/images/users.png'
export default {
  data() {
    return {
      imgUrl,
      time: new Date(),
      drawer: false,
      userlist: {
        username: '吴梓键',
        position: '系统管理员',
        Motto: '早起的虫儿被鸟吃！！'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
}
.bg-purple-dark {
  //   background: #99a9bf;
  background: #ffffff;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 0px;
  min-height: 480px;
}
.grid-contents {
  border-radius: 2px;
  min-height: 720px;
  font-family: Helvetica;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.card {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
}
.img {
  padding: 10px;
  margin-left: 20px;
  width: 150px;
  height: 150px;
}
.el-image {
  border-radius: 4px;
}
.txtp {
  padding: 10px;
  font-size: 17px;
  color: #7a858b;
}
.txtm {
  padding: 5px;
  font-size: 14px;
  color: #98a7b0;
}
.textm {
  margin-block-start: 20px;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.middle {
  // border: 1px solid blue;
  // position: absolute;
  // margin-top: 0px;
  // height: 590px;
  // width: 1345px;
  // margin: 0px auto;
  background: url(../../assets/images/users.png) no-repeat;
  background-size: cover;
  border-radius: 2px;
}
</style>

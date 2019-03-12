<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Pizza Express 后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <!-- 前置人头小图标 -->
            <el-button slot="prepend" icon="el-icon-pizza-yonghu1"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-pizza-mima1"></el-button>
          </el-input>
        </el-form-item>
        <el-radio v-model="radio" label="1">工厂管理员</el-radio>
        <el-radio v-model="radio" label="2">系统管理员</el-radio>
        <br>
        <br>
        <div class="login-btn">
          <el-button type="primary" round @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import bus from "../../common/bus.js";
// import menu from "./menu.js"
export default {
  data() {
    return {
      urlShop: "/pizzaexpress/shop/login",
      urlSuper: "/pizzaexpress/user/systemaccountlogin",
      url: "",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      radio: "1"
    };
  },
  methods: {
    submitForm() {
      if (this.radio == "1") this.url = this.urlShop;
      else this.url = this.urlSuper;
      // this.$axios
      //   .get(this.url, {
      //     params: {
      //       account: this.ruleForm.username,
      //       password: this.ruleForm.password
      //     }
      //   })
      //   .then(res => {
      //     let status = res.data.status; //状态码
      //     let msg = "";
      //     if (status == 200) {
      //       msg = "登录成功";
      //       sessionStorage.setItem("shopID", res.data.shopID);
      //       sessionStorage.setItem("account", res.data.account);
      //       console.log(sessionStorage.getItem("account:", sessionStorage.getItem('shopID')));
      //       // 存储路由权限
      //       // let permissionList = res.data.permissionList[0].split(", ");
      //       // sessionStorage.setItem("permissionList", JSON.stringify(permissionList));
      //       // 菜单权限
      //       // let menu_list = JSON.parse(res.data.menuList[0])
      //       // // let menu_list = menu.menu;
      //       // sessionStorage.setItem("menu_list", JSON.stringify(menu_list));
      //       this.$message({
      //         message: msg,
      //         type: "success"
      //       });
      //       setTimeout(() => {
      //         console.log(this.radio)
      //         if (this.radio == "1") this.$router.push("/dashboard");
      //         //跳转到工厂管理员
      //         else this.$router.push("/dashboard2");
      //         //跳转到系统管理员
      //       }, 1000);
      //     } else {
      //       msg = "用户名或者密码错误";
      //       this.$message({
      //         message: msg,
      //         type: "error"
      //       });
      //     }
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: rgb(15, 75, 165);
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
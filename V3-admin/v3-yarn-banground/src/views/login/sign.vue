<template>
    <div id="login" ref='vantaRef' style="width: 100%;height: 100vh">
        <div class="card">
            <h5 class="card-title">用户注册</h5>
            <el-form ref="loginForms" :model="loginForm" :rules="rules" class="demo-ruleForm" label-position="top" label-width="auto">
                <el-form-item label="账号" prop="username" label-position="left">
                    <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" label-position="left">
                    <el-input :prefix-icon="User" v-model="loginForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-position="left">
                    <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword" label-position="left">
                    <el-input :prefix-icon="Lock" type="password" v-model="loginForm.repassword"
                        show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="formButton">
                        <el-button :loading="loading" type="primary" @click="signSub">注册</el-button>
                        <el-button @click="$router.push('/')">返回登陆</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { User, Lock, Message } from "@element-plus/icons-vue"
import { reactive, ref } from "vue";
//引入router
import { useRouter } from "vue-router"
//引入element提示
import { ElMessage } from "element-plus";
//引入pinia
import useUserStore from "@/store/userStore/userStore"
let userStore = useUserStore()
let $router = useRouter()
//收集账号密码
let loginForm = reactive({
    username: '',
    password: '',
    repassword: '',
    name: '',
    classId:0,
    openid:0,
})
let loginForms = ref()
const validatPass = async (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const validatPass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== loginForm.password) {
        callback(new Error("两次输入不一致"))
    } else {
        callback()
    }
}
const rules = {
    password: [
        { trigger: 'blur', validator: validatPass }
    ],
    repassword: [
        { trigger: 'change', validator: validatPass2 }
    ],
    username: [
        { trigger: 'blur', message: '请输入用户名', required: true }
    ],
    name: [
        { trigger: 'blur', message: '请输入姓名', required: true }
    ],
}

let loading = ref(false)
const signSub = async () => {
    await loginForms.value.validate().then(async () => {
        loading.value = true
        //调用仓库方法
        try {
            await userStore.signSub(loginForm)
            loading.value = false
            $router.push('/')
            ElMessage({
                type: 'success',
                message: `注册成功`
            })
        } catch (error: any) {
            ElMessage({
                type: 'error',
                message: error
            })
            loading.value = false
        }
    }).catch(() => {
        ElMessage({
            type: 'error',
            message: '表单有误'
        })
        loading.value = false
    })
}
</script>

<style scoped lang="scss">
body #login {
    overflow-y: hidden;
}

#login {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    width: 50vh;
    height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-color: rgba(228, 228, 228, 0.10);
    transition: all 0.35s;
    overflow-y: auto;

    .card-title {
        margin: 30px 0px;
    }
}

.card:hover {
    -webkit-box-shadow: 15px 15px 10px 15px rgba(20, 20, 20, 0.15);
    -moz-box-shadow: 15px 15px 10px 15px rgba(20, 20, 20, 0.15);
    box-shadow: 15px 15px 10px 15px rgba(20, 20, 20, 0.15);
}

.card-title {
    font-size: 20px;
    color: #000000;
}

.demo-ruleForm {
    width: 80%;
}

.formButton {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.el-button {
    margin: 10px 0;
    width: 80%;
}
</style>
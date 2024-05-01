<template>
  <el-row class="login-page">
    <el-col :span="24" class="form">
      <el-form :rules="rules" :model="formModel" ref="form" v-if="isRegister">
        <h1>注册</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formModel.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input
            v-model="formModel.repassword"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <div class="flex">
          <el-button type="success" @click="registerService()">注册</el-button>
          <el-button type="primary" @click="isRegister = false"
            >← 返回</el-button
          >
        </div>
      </el-form>
      <el-form :rules="rules" :model="formModel" ref="form" v-else>
        <h1>登录</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formModel.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <div class="flex">
          <el-checkbox v-model="remember">记住我</el-checkbox>
          <el-button size="small" type="primary">忘记密码？</el-button>
        </div>
        <div class="flex">
          <el-button type="success" @click="loginService">登录</el-button>
          <el-button type="primary" @click="isRegister = true"
            >注册 →</el-button
          >
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { ref, watch } from 'vue'

const isRegister = ref(false)
const form = ref()
const router = useRouter()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const remember = ref(false)

watch(isRegister, () => {
  formModel.value.username = ''
  formModel.value.password = ''
  formModel.value.repassword = ''
})

//注册服务
const registerService = async () => {
  await form.value.validate()

  try {
    const response = await axios.post(
      'http://localhost:3000/api/register',
      formModel.value
    )
    ElMessage.success('注册成功')
    console.log(response)
  } catch (err) {
    // 捕获错误，然后发送错误消息
    if (err.response && err.response.status === 400) {
      console.log(err)
      ElMessage.error(err.response.data.message)
    } else {
      console.log(err)
    }
  }
}

//登入服务

const loginService = async () => {
  await form.value.validate()
  console.log('开始登录')

  try {
    const response = await axios.post(
      'http://localhost:3000/api/login',
      formModel.value
    )
    const userStore = useUserStore()
    userStore.setToken(response.data.token)

    localStorage.setItem('token', response.data.token)
    ElMessage.success('登入成功')
    console.log(response)

    router.push('/about')
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.log(err)
      ElMessage.error(err.response.data.message)
    } else {
      console.log(err)
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1036px) {
  .login-page {
    width: 50rem;
  }
}
.login-page {
  background-color: #fff;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}
.button {
  width: 100%;
}
.flex {
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

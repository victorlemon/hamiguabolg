<template>
  <div>
    <van-nav-bar title="博客后台管理" />

    <van-form @submit="addPost">
      <van-field
        v-model="newPost.title"
        label="标题"
        placeholder="请输入标题"
        required
        :rules="[{ required: true, message: '标题不能为空' }]"
      />
      <van-field
        v-model="newPost.summary"
        label="作者，时间"
        placeholder="请输入作者，时间"
        required
        :rules="[{ required: true, message: '不能为空' }]"
      />

      <quill-editor
        v-model:content="newPost.content"
        content-type="html"
        theme="snow"
      ></quill-editor>
      <van-field
        v-model="newPost.category"
        label="分类"
        placeholder="请输入分类"
        required
        :rules="[{ required: true, message: '不能为空' }]"
      />
      <van-button type="primary" native-type="submit">添加文章</van-button>
    </van-form>

    <van-form @submit="addCategory">
      <van-field
        v-model="newCategory.name"
        label="分类名称"
        placeholder="请输入分类名称"
        required
        :rules="[{ required: true, message: '不能为空' }]"
      />
      <van-button type="primary" native-type="submit">添加分类</van-button>
    </van-form>
  </div>
</template>
<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue'
import { showToast } from 'vant'

const newPost = ref({
  title: '',
  summary: '',
  content: '',
  category: ''
})

const newCategory = ref({
  name: ''
})

const addPost = async () => {
  await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost.value)
  })
  newPost.value = {
    title: '',
    summary: '',
    content: '',
    category: ''
  }
  showToast('文章添加成功')
}

const addCategory = async () => {
  await fetch('http://localhost:3000/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCategory.value)
  })
  newCategory.value = {
    name: ''
  }
  showToast('添加成功')
}
</script>

<style scoped>
.admin {
  padding: 1em;
}

form {
  margin-bottom: 2em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input,
textarea {
  width: 100%;
  margin-bottom: 1em;
}
</style>

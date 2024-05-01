<template>
  <div class="blog">
    <h1>博客文章</h1>

    <div v-for="post in posts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.summary }}</p>
      <div class="post-content" v-html="post.content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

onMounted(async () => {
  const response = await fetch('http://localhost:3000/api/posts')
  posts.value = await response.json()
})
</script>

<style scoped>
@media screen and (min-width: 1036px) {
  .blog {
    width: 1200px;
  }
}
.blog {
  padding: 1em;
}

.post {
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2em;
}

.post h2 {
  margin-bottom: 0.5em;
}

.post p {
  margin-bottom: 1em;
}
.post-content {
  text-indent: 2em; /* 首行缩进2格 */
  line-height: 1.6; /* 增加行高 */
  margin-bottom: 1em; /* 增加段落间距 */
  text-align: justify;
}
</style>

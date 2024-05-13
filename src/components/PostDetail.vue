<template>
  <div class="list" v-if="post">
    <div class="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.summary }} {{ post.created_at }}</p>
      <div class="post-content" v-html="post.content"></div>
    </div>

    <!-- 显示其他的文章信息 -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const post = ref(null)

    onMounted(async () => {
      const id = route.params.id
      const response = await fetch(`http://localhost:3000/api/posts/${id}`)
      post.value = await response.json()
    })

    return {
      post
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1036px) {
  .list {
    width: 1200px;
  }
}
.list {
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
  text-indent: 2em;
  line-height: 1.6;
  margin-bottom: 1em;
  text-align: justify;
}
</style>

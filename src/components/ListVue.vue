<template>
  <div class="read-list" v-for="post in currentPageData" :key="post.id">
    <div class="read-list-r">
      <li>
        <router-link :to="`/post/${post.id}`">
          <div class="h4">
            <h4>
              {{ post.title }}
            </h4>
            <div class="time">{{ post.summary }}{{ post.created_at }}</div>
          </div>
          <p>{{ convertHtmlToPlainText(post.content) }}</p>
        </router-link>
        <div class="icon">
          <div class="icon-pp">{{ post.category }}</div>
          <div class="icon-kk">
            <img src="../assets/dianzan.svg" alt="" />
            <div class="count">{{ post.id }}</div>
          </div>
        </div>
      </li>
    </div>
  </div>
  <van-pagination
    v-model="currentPage"
    :total-items="postStore.totalPosts"
    :items-per-page="pageSize"
  />
</template>

<script setup>
import { usePostsStore } from '@/stores/posts'
import { ref, onMounted, computed } from 'vue'

const posts = ref([])
const postStore = usePostsStore()
//分页逻辑
// 新增一个响应式变量来存储总文章数
let currentPage = ref(1)
let pageSize = ref(4)

const currentPageData = computed(() => {
  let start = (currentPage.value - 1) * pageSize.value
  let end = start + pageSize.value
  return postStore.posts.slice(start, end)
})
//结束分页
//把数据库获取的文章转变为txt
const convertHtmlToPlainText = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

onMounted(async () => {
  await postStore.fetchPosts()
})
</script>

<style>
.read-list {
  width: 100%;
  display: flex;
  padding: 1px;

  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
}
.read-list .read-list-img {
  width: 48%;
  margin: 9px 0px 9px 0px;
  margin-left: 5px;
  /* background: url(../assets/45.jpg) no-repeat center;
  background-size: contain; */
}
.read-list-img-1 {
  /* background-color: #ccc; */
  background: url(../assets/45.jpg) no-repeat center;
  background-size: cover;
  border-radius: 10px;
}
.read-list-img-2 {
  background: url(../assets/100.jpg) no-repeat center;
  background-size: cover;
  border-radius: 10px;
}
.read-list-img-3 {
  background: url(../assets/99.jpg) no-repeat center;
  background-size: cover;
  border-radius: 10px;
}

/* .read-list:nth-child(2) .read-list-img {
  width: 43%;
  height: 100%;
  border-radius: 20px;
  margin-left: 5px;
  background: url(../assets/45.jpg) no-repeat center !important;
  background-size: contain;
} */
.read-list-r {
  width: 89%;
  margin: 5px;
  margin: 0 auto;
  /* background-color: pink; */
}
.read-list-r li {
  display: flex;
  padding: 5px;
  flex-direction: column;
}
timee .read-list-r li .h4 {
  display: flex;
  justify-content: space-between;
}
.read-list-r li .h4 .time {
  font-size: 10px;
  color: #12a182;
  font-weight: 600;
}
.read-list-r li h4,
p {
  margin: 0;
  padding: 0;
}
.read-list-r li h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  text-align: left;
  color: #000;
}
.read-list-r li p {
  width: 82%;
  font-size: 17px;

  display: -webkit-box;
  -webkit-line-clamp: 3; /* 你可以根据需要调整这个值 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #5e6d82;
  text-overflow: ellipsis;
}
.read-list-r li .icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 23px;
}
.read-list-r li .icon .icon-pp {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 23px;
  line-height: 23px;
  color: #93b5cf;
  background-color: #f0f5ff;
  border-radius: 5px;
  margin-right: 5px;
}
.read-list-r li .icon .icon-kk {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  font-size: 18px;
  height: 23px;
  line-height: 23px;
}
.read-list-r li .icon .icon-kk img {
  width: 22px;
  height: 22px;
  margin-right: 0px;
}
.read-list-r li .icon .icon-kk .count {
  font-size: 15px;
  color: #93b5cf;
}
</style>

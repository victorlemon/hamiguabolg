// store/posts.js
import { defineStore } from 'pinia'

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: [],
    totalPosts: 0
  }),
  actions: {
    async fetchPosts() {
      const response = await fetch('http://127.0.0.1:3000/api/posts')
      this.posts = await response.json()
      this.totalPosts = this.posts.length
    }
  }
})

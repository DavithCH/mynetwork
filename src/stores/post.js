import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('articles', {
  state: () => {
    return { posts: [] };
  },

  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
  actions: {
    async fetchPosts() {
      try {
        const res = await axios.get('http://localhost:3005/articles');
        this.posts = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    async updateLikes(id, amount) {
      try {
        const res = await axios.put(`http://localhost:3005/articles/${id}`, {
          like: amount,
        });
        this.posts = res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});

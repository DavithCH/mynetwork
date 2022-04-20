import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('users', {
  state: () => {
    return { users: null, isLoggedIn: false, loggedInUser: null };
  },

  actions: {
    async fetchUsers() {
      try {
        const res = await axios.get('http://localhost:3005/utilisateurs');
        this.users = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    verifyUser(email, password) {
      return this.users.find(
        (u) => u.email === email && u.password === password
      );
    },
  },
});

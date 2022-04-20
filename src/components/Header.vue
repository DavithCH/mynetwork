<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary sticky-top">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">MyNetWork</RouterLink>

      <div class="navbar-nav">
        <div class="nav-item mr-auto">
          <RouterLink
            to="/signup"
            class="nav-link"
            :class="loggedInUser ? 'd-none' : ''"
            >Créer un compte</RouterLink
          >
        </div>
        <div class="nav-item mr-auto" v-if="!loggedInUser">
          <RouterLink to="/signin" class="nav-link">Connexion</RouterLink>
        </div>
        <div class="nav-item mr-auto" v-else>
          <RouterLink to="/signin" class="nav-link" @click="handleLogout"
            >Déconnecter</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const router = useRouter();
console.log(router.currentRoute.value.name);

const loggedInUser = computed(() => {
  return userStore.loggedInUser;
});

const handleLogout = () => {
  userStore.$patch((state) => {
    state.loggedInUser = null;
  });
};
</script>

<style scoped>
nav {
  height: 5vh;
}
</style>

<template>
  <div class="container">
    <h3 class="my-3">Page de connexion</h3>
    <form @submit.prevent="handleSubmit">
      <small class="text-danger font-italic" v-if="error.length > 0">{{
        error
      }}</small>
      <div class="form-group mb-3">
        <label for="exampleInputEmail1">Adresse e-mail</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder=""
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers();
});

let email = ref('');
let password = ref('');
let error = ref('');
const router = useRouter();

const loggedInUser = computed(() => {
  return userStore.loggedInUser;
});

const handleSubmit = () => {
  const user = userStore.verifyUser(email.value, password.value);
  if (user) {
    userStore.$patch((state) => {
      state.loggedInUser = user;
    });
    router.push('/');
  } else {
    error.value = "l'addresse email ou password n'est pas correcte";
  }
};
</script>

<style scoped></style>

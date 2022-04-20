<template>
  <div v-for="post in posts" :key="post" class="post my-3">
    <div class="card-box p-2">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img
            src="https://thispersondoesnotexist.com/image"
            alt=""
            class="user-image rounded-circle mb-2"
          />
          <h5 class="ms-1">{{ post.pseudo }}</h5>
        </div>

        <span class="">posté le : {{ formateDate(post.date) }}</span>
      </div>

      <img :src="post.urlImgArticle" class="image" :alt="post.urlImgArticle" />
      <div class="reaction-box border p-3 my-3">
        <i class="fa-solid fa-thumbs-up text-primary" @click="toggleLike"
          ><span class="ms-2 number" v-for="like in post.likes">{{
            like.id
          }}</span></i
        >
      </div>
      <h4 class="text-center">{{ post.commentaires.length }} commentaires</h4>
      <div class="d-flex flex-column border p-3">
        <div v-for="comment in post.commentaires">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <h5 class="mx-3 align-items-center">{{ comment.pseudo }}</h5>
              <span>{{ formateDate(comment.dt) }}</span>
            </div>

            <p class="align-items-center mx-5">
              {{ comment.contenu }}
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePostStore } from '../stores/post';
import { useUserStore } from '../stores/user';

const postStore = usePostStore();
const userStore = useUserStore();
const posts = computed(() => {
  return postStore.posts;
});

const getPosts = computed(() => {
  return postStore.getPosts;
});

const user = computed(() => {
  return userStore.loggedInUser;
});

const toggleLike = (id, userId) => {
  let thePost = posts.value.find((post) => post.id == 1);
  let theLikeUser = thePost.find((post) => post.likes);

  console.log(thePost, theLikeUser);
};

const formateDate = (date) => {
  let d = new Date(date);
  let dString = d.toLocaleString('fr-FR');
  let dSplit = dString.split(' ');
  let dPure = dSplit[0].slice(0, -1);
  let dT = dSplit[1];
  let completeDate = dPure + ' à ' + dT;
  return completeDate;
};

onMounted(() => {
  postStore.fetchPosts();
});
</script>

<style scoped>
.user-image {
  width: 50px;
  height: 50px;
}
.image {
  width: 100%;
  height: 100%;
}

.post {
  height: 100%;
}

.card-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
}
.reaction-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2em;
  width: 100%;
  height: 40px;
}

.reaction-box i {
  font-size: 20px;
  cursor: pointer;
}
</style>

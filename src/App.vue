<template>
  <div v-if="!authStore.isLoadingUser">
    <form @submit="authenticate">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
<!--    <h1>{{authStore.session_id}}</h1>-->
  </div>
  <div v-if="authStore.isLoadingUser">
    <h1>Welcome {{ authStore.session.session_id }} apikey {{this.apiKey}}</h1>
  </div>
</template>
<script>
import { useAuthStore } from "@/store/auth";
import {ref} from "vue";

export default {
  setup(){
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const apiKey = useAuthStore().apiKey;

    const authenticate = async (event) =>{
      event.preventDefault();
      // console.log(username.value);
      await authStore.submitForm(username.value, password.value);


    }

    return{
      authenticate,
      username,
      password,
      authStore,
      apiKey
    }

  }
}

</script>

<style>
</style>
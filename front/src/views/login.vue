<template>
  <div>
    <form class="login" @submit.prevent="logins">
     <h1>Sign in</h1>
     <label>Email</label>
     <input  v-model="login" type="text" placeholder="Name"/>
     <label>Password</label>
     <input  v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
  </div>
</template>

<script>
export default {
  name: 'login',
   data(){
      return {
        login : "",
        password : ""
      }
    },
     methods: {
      logins: function () {
        let login = this.login 
        let password = this.password
        this.$store.dispatch('login', {login, password}) //{"login": "proverka2", "password": "ssdss"}
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
}
</script>
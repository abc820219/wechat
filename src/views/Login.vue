<template>
  <div class="login">
    <div class="login-box">
      <b-form inline>
        <label class="mr-2" for="inline-form-input-name"> 輸入暱稱: </label>
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mt-xs-2"
          placeholder="Jane Doe"
          v-model="name"
        ></b-form-input>
        <b-button @click="loginHandler" variant="primary">登入</b-button>
      </b-form>
    </div>
     <b-alert class="text-center" v-model="showDismissibleAlert" variant="danger" dismissible>
      使用者名稱重複
    </b-alert>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // beforeRouteEnter(from,to,next){
  //   console.log("beforeRouteEnter");
  //   next()
  // },
  // beforeResolve (){
  //   console.log("beforeResolve");
  // },
  name: 'Login',
  data(){
    return {
      name:"",
      showDismissibleAlert:false
    }
  },
  methods:{
    loginHandler(e){
      e.preventDefault()
      if(!this.name) return
      axios.post('https://websockewechat.herokuapp.com/login',{name:this.name}).then(res=>{
        console.log(res.data);
        if(res.data !== true){
          let obj = {
          name:this.name
        }
        this.$store.commit("M_USER",obj);
        this.$router.push('/home')
        }else{
          this.showDismissibleAlert = true
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
    min-height: 100vh;
    background-image: url('~@/assets/images/bg.jpg');
    // background-image: url('/dist/assets/images/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    .login-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
}

</style>

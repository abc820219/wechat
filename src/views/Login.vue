<template>
  <div class="login">
    <div class="login-box">
      <h2 class="mb-3 welcome">Welcome to</h2>
      <button class="btn btn-primary text-secondary weChat-Btn" @click="stepChangeLogin">We Chat</button>
      <div>
        <label class="login-label">
          <span class="text-secondary font-weight-bold">請輸入暱稱:</span>
          <input type="text" class="weChat-input weChat-style weChat-style-input  m-3" placeholder="jason"  v-model="name">
          <button class="btn btn-outline-secondary weChat-style" @click="loginHandler">登入</button>
        </label>
      </div>
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
  mounted(){
      this.gsap.from('.welcome',
      {
        y:'-200%',
        opacity:0,
        duration: 1,
      },
      1
      )
      this.gsap.from('.weChat-Btn',
      {
        y:'200%',
        opacity:0,
        duration: 1,
      },
      1
      )
  },
  name: 'Login',
  data(){
    return {
      name:"",
      showDismissibleAlert:false
    }
  },
  methods:{
    stepChangeLogin(){
      let tl = this.gsap.timeline();
      tl.add('one')
      tl.to('.welcome',{
        y:'-100%',
        opacity:0,
        duration: 1,
        display:'none',
        ease: 'slow(0.7,0.7,0.7,0.7, false)',
      },'one').to('.weChat-Btn',{
        y:'100%',
        opacity:0,
        duration: 1,
        display:'none',
        ease: 'slow(0.7,0.7,0.7,0.7, false)', 
      },'one').to('.login-label',{
        display:'block',
        opacity:1,
        duration: 1,
      })
    },
    loginHandler(e){
      e.preventDefault()
      if(!this.name) return
      axios.post('https://websockewechat.herokuapp.com/login',{name:this.name}).then(res=>{
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
    background-image: url('~@/assets/images/bg.png');
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
      h2{
        font-size: 36px;
        @media (max-width:768px) {
        font-size:36px;
        }
      }
    }
    .weChat-Btn{
      width:300px;
      font-size: 40px;
      box-shadow: 0px 0px 3px 1px rgb(146, 141, 141);
      @media (max-width:768px) {
        width: 200px;
        font-size:36px;
      }
    }
    .login-label{
      display: none;
      opacity: 0;
      @media (max-width:768px) {
        text-align: center;
      }
    }
}

</style>

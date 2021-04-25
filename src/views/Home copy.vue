<template>
  <div class="home">
      <header class="weChat-style">
          <h1 class="text-secondary">We Chat</h1>
          <div class='menu d-flex align-items-center'>
              <img class="mr-3" src="@/assets/images/chaticon.png" alt="">
              <img src="@/assets/images/logouticon.png" alt="" @click="leaveHandler">
          </div>
      </header>
      <main class="d-flex align-items-center">
        <div class="container d-flex justify-content-center"> 
          <div class="w-100">
            <ul class="contentArea weChat-style mb-4" ref="contentArea">
              <li v-for="(content,key) in listContent" :key="key">{{content}}</li>
            </ul>
            <textarea class="txtarea weChat-style" name="" id="textarea" cols="30" rows="10" placeholder="Enter Something..."
                v-model.trim="message" 
                @keyup.enter="messageHandler"
            ></textarea>
          </div>
          <div class="w-100 d-flex flex-column align-items-center">
            <h3 class="mt-5 mb-1 d-flex align-items-center"> <img class="mr-3" src="@/assets/images/peopleicon.png" alt="">{{usersname.length}}</h3>
            <ul >
              <li v-for="(name,key) in usersname" :key="key">{{name}}</li>
            </ul>
            <h3 class="mt-5 mb-2 d-flex align-items-center"> <img class="mr-3" src="@/assets/images/exiticon.png" alt="">{{options.length}}</h3>
            <ul>
              <li v-for="(option,key) in options" :key="key">
                {{option}}
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="mr-1">     
            <b-list-group class="contentArea" ref="contentArea">
            <b-list-group-item  v-for="(content,key) in listContent" :key="key">{{content}}</b-list-group-item>
            </b-list-group>
            <b-form-textarea
                class="txtarea"
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                v-model.trim="message" 
                @keyup.enter="messageHandler"
            ></b-form-textarea>
        </div>
        <div>
          <b-list-group class="mb-3 d-none d-md-block">
            <b-list-group-item>在此房間人員</b-list-group-item>
            <b-list-group-item  v-for="(name,key) in usersname" :key="key">{{name}}</b-list-group-item>
          </b-list-group>
        </div> -->
      </main>
  </div>
</template>
<style lang="scss">
$primary:#E2DDEB;
$secondary:#8D74B1;
header{
  position: relative;
  display: flex;
  justify-content: center;
  line-height: 1.5;
  font-size: 36px;
  .menu{
    height:54px;
    position: absolute;
    right: 30px;
    img{
    display: inline-block;
    width: 30px;
    cursor: pointer;
    }
  }
}

main{
  background-image: url('~@/assets/images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding:10px;
  min-height: calc(100vh - 48px);

    div > div:first-child{
      max-width: 780px;
    }
    div > div:last-child{
      max-width: 300px;
      ul{
        max-height: 160px;
        overflow-y: scroll;
        padding:5px;
        min-width: 200px;
        border: 2px solid $secondary;
        border-radius: 10px;
        li{
        border-bottom: 2px solid rgba($secondary,0.3);
        padding: 10px 0;
        }
      }
    }

    .txtarea,.contentArea{
      border-radius: 10px;
      max-width: 780px;
      padding:10px 15px;
      border: 2px solid $secondary;
    }

    .txtarea{
      width: 100%;
      resize:none;
    }
    .contentArea{
      max-width: 780px;
      height: calc(100vh - 350px);
      overflow-y: scroll;
      li{
        border-bottom: 2px solid rgba($secondary,0.3);
        padding: 10px 0;
      }
    }
}
</style>
<script>
export default {
  name:'Home',
  data(){
    return {
      message:"",
      room:"",
      listContent:[],
      options: [
          { value: "", text: '大廳' },
          { value: 'a', text: '房間A' },
          { value: 'b', text: '房間B' },
        ]
    }
  },
  watch:{
    listContent(){
      this.$nextTick(() => {
        this.$refs.contentArea.scrollTop = this.$refs.contentArea.scrollHeight
      })
    },
    room(nV,oV){
      let _this = this
      let data = JSON.stringify({
                type: 'changeOut',
                name:  _this.user.name,
                message: `${_this.user.name}離開${oV ? oV + "房間": "大廳"}` ,
                room:oV,
            })
      window.socket.send(data)

      data = JSON.stringify({
                type: 'changeIn',
                name:  _this.user.name,
                message: _this.user.name + '進入' + _this.room+"房間 ",
                room:nV,
            })
      window.socket.send(data)
      this.listContent = []
      this.comeList = []
      this.leaveList = [] 
      this.$store.commit("M_USER",{room:nV})

    }
  },
  computed:{
    users(){
      return this.$store.state.users
    },
    usersname(){
      return this.$store.state.users.filter(user=>{
        return user.room ==  this.user.room
      }).map((user)=>{
        return user.name
      })
    },
    user(){
      return this.$store.state.user
    }
  },
  mounted(){
  let _this = this
  // if(!this.user.name){
  //   this.$router.push('/')
  // }
  window.socket = new WebSocket('wss://websockewechat.herokuapp.com/', 'protocol1')
  window.socket.addEventListener('open', function () {
            let data = JSON.stringify({
                type: 'come',
                name:  _this.user.name,
                message: _this.user.name + '進入大廳',
                room:'',
            })
            window.socket.send(data)
      })
  window.socket.addEventListener('message', function (event) {
            let data = JSON.parse(event.data)
            console.log(data)
            if(data.type == 'message'){             
              _this.listContent.push(data.message)
            }
            if(data.type == 'come'){             
              _this.listContent.push(data.message)

            }
            if(data.type == 'changeIn'){             
              _this.listContent.push(data.message)
            }
            if(data.type == 'changeOut'){             
              _this.listContent.push(data.message)
            }
            if(data.type == 'leave'){             
              _this.listContent.push(data.message)
            }

            if(data.length){
              _this.$store.commit('M_USERS',data)
            }
      });
  },
  methods:{
    leaveHandler(){
      window.socket.close()
      this.$router.push('/')
    },
    messageHandler(){
      if(!this.message){
        this.message = ""
        return
      }
      let _this = this
      let data = {
                type: 'message',
                name:  _this.user.name,
                message: _this.user.name + ':' + _this.message,
                room:_this.user.room,
            }
      _this.$store.commit('M_USER',data)
      _this.listContent.push('我:'+_this.message)
      window.socket.send(JSON.stringify(_this.user))
      this.message = ""
    }
  },
  destroyed(){
     window.socket.close()
  }
}
</script>

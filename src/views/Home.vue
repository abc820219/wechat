<template>
  <div class="home">
      <header>
          <div class="ham-menu" @click="mobileMenuIsOpen=!mobileMenuIsOpen">
            <img src="@/assets/images/menu.png" alt="">
          </div>
          <h1 class="text-secondary">We Chat</h1>
          <div class='menu d-flex align-items-center'>
              <img class="mr-3 creatRoom" src="@/assets/images/chaticon.png" alt="" @click="cardOpen=true">
              <img src="@/assets/images/logouticon.png" alt="" @click="leaveHandler">
          </div>
      </header>
      <main class="d-flex align-items-center">
        <div class="container d-flex justify-content-center"> 
          <div class="w-100">
            <span class="align-items-center mobile-creatRoom">
              <img class="mr-1 mb-2 creatRoom" src="@/assets/images/chaticon.png" alt="" @click="cardOpen=true">
               {{!room ? "大廳" : room}}
            </span>
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
              <li v-for="(name,key) in usersname" :key="key">{{name}}
                <span v-if="name === user.name">(我)</span>
              </li>
            </ul>
            <h3 class="mt-5 mb-2 d-flex align-items-center"> <img class="mr-3" src="@/assets/images/exiticon.png" alt="">{{options.length}}</h3>
            <ul>
              <li v-for="(option,key) in options" :key="key" @click="changeRoomHandler(option.value)">
                {{option.text}}
                <span v-if="option.value === room">(現在地)</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <div class="weChatCard" v-show="cardOpen">
        <div class="text-center weChat-style">
          <span class="close" @click="()=>cardOpen=false">X</span>
          <h2 class="text-secondary font-weight-bold">創建房間</h2>
          <label for=""  class="my-2">
            <span class="text-secondary font-weight-bold">
            房名:
            </span>
            <input class="my-2 mx-2 weChat-style-input weChat-style" type="text">
          </label>
          <button class="btn btn-secondary">創建</button>
        </div>
      </div>
      <ul class="mobile-menu-list" :class="{active:mobileMenuIsOpen==true}">
          <li>
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
              <img class="mr-1" src="@/assets/images/peopleicon-w.png" alt="">
              在線成員
              </div>
              <img class="mr-2" v-show="!peopleListOpen" src="@/assets/images/down.png" alt="" @click="()=>peopleListOpen=!peopleListOpen">
              <img class="mr-2" v-show="peopleListOpen" src="@/assets/images/up.png" alt="" @click="()=>peopleListOpen=!peopleListOpen">
            </div>
            <ul v-show="peopleListOpen">
              <li v-for="(name,key) in usersname" :key="key">{{name}}
                <span v-if="name === user.name">(我)</span>
              </li>
            </ul>
          </li>
          <li>
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
              <img class="mr-1" src="@/assets/images/chaticon-w.png" alt="">
              聊天室
              </div>
              <img class="mr-2" v-show="!roomListOpen" src="@/assets/images/down.png" alt="" @click="()=>roomListOpen=!roomListOpen">
              <img class="mr-2" v-show="roomListOpen" src="@/assets/images/up.png" alt="" @click="()=>roomListOpen=!roomListOpen">
            </div>
            <ul v-show="roomListOpen">
              <li v-for="(option,key) in options" :key="key" @click="changeRoomHandler(option.value)">
                {{option.text}}
                <span v-if="option.value === room">(現在地)</span>
              </li>
            </ul>
          </li>
      </ul>
      <div class="cover" v-show="mobileMenuIsOpen"></div>
  </div>    
</template>
<style lang="scss">
$primary:#E2DDEB;
$secondary:#8D74B1;
.cover{
  position: fixed;
  left: 0;
  top: 56px;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.234);
  z-index: 1;
}
.home{
  position: relative;
}

header{
  position: relative;
  display: flex;
  justify-content: center;
  line-height: 1.5;
  font-size: 36px;
  background-color:$primary;
  border-bottom: 2px solid #ccc;
  .ham-menu,.menu{
    position: absolute;
    height:54px;
    img{
      display: inline-block;
      width: 30px;
      cursor: pointer;
    }
  }

  .ham-menu{
    left: 30px;
    display: none;
    @media (max-width:768px) {
        display: block;
    }
  }

  .menu{
    right: 30px;
  }

  .creatRoom{
    @media (max-width:768px) {
        display: none !important;
    }
  }
}

 .mobile-menu-list{
    position: absolute;
    top: 56px;
    bottom: 0;
    left: -100%;
    width: 250px;
    color:#fff;
    line-height:2;
    transition: left 1s;
    border-right: 1px solid #ccc;
    background-color:#8D74B1;
    z-index: 2;
    &.active{
      left:0;
    }
    >li{
      >div{
        background-color: #715696;
        padding-left: 1rem;
        height:34px;
        >img{
          cursor: pointer;
        }
      }
      text-indent: 2rem;
      border-bottom: 1px solid #ccc;
      li:first-child{
        border-top: 1px solid #ccc;
      }
      li{
        background-color: #9483B8;
        border-bottom: 1px solid #ccc;
      }
      li:last-child{
        border-bottom: 0px;
      }
    }
  }

main{
  position: relative;
  background-image: url('~@/assets/images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding:10px;
  min-height: calc(100vh - 48px);
  overflow: hidden;
  .mobile-creatRoom{
       display: none !important;
      @media (max-width:768px) {
        display: flex !important;
      }
      .creatRoom{
        display: inline-block;
        width: 28px;
      }
    }
    div > div:first-child{
      max-width: 780px;
    }
    div > div:last-child{
      max-width: 300px;
      @media (max-width:768px){
        display: none !important;
      }
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
      ul:last-child{
        li{
          cursor: pointer;
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

.weChatCard{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.234);
  >div{
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
  }
  .close{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
}
</style>
<script>
export default {
  name:'Home',
  data(){
    return {
      mobileMenuIsOpen:false,
      roomListOpen:false,
      peopleListOpen:false,
      cardOpen:false,
      message:"",
      room:"",
      listContent:[],
      options: [
          { value: "", text: '大廳' },
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
  if(!this.user.name){
    this.$router.push('/')
  }
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
    changeRoomHandler(room){
      this.room = room
    },
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

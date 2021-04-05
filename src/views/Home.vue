<template>
  <div class="home">
  <b-navbar toggleable="lg" type="light" variant="primary">
    <b-navbar-brand href="#">WeChat</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>在線人數:{{users.length}}人</b-nav-item>
        <b-nav-item>位置:{{!user.room ? "大廳" : user.room}}</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-form-select v-model="room" :options="options" size="sm"></b-form-select>
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <em>使用者:{{user.name}}</em>
        </template>
        <b-dropdown-item @click="leaveHandler">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
      <main>
        <div class="mr-1">     
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
          <b-list-group class="mb-3">
            <b-list-group-item>在此房間人員</b-list-group-item>
            <b-list-group-item  v-for="(name,key) in usersname" :key="key">{{name}}</b-list-group-item>
          </b-list-group>
          <b-list-group>
            <b-list-group-item  v-for="(message,key) in playersComeLeaveMessage" :key="key">{{message}}</b-list-group-item>
          </b-list-group>
        </div>
      </main>
  </div>
</template>
<style lang="scss">
header{
  display: flex;
  justify-content: center;
  line-height: 2;
  > ul {
    display: flex;
  }
}
main{
  background-image: url('~@/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding:10px;
  min-height: calc(100vh - 48px);
  display: flex;
    >div{
      flex:10%;
    }
    >div:first-child{
      position: relative;
      flex: 90%;
    }
    .txtarea{
      position: absolute;
      width: 100%;
      bottom: 0;
    }
    .contentArea{
      max-height: calc(100vh - 170px);
      overflow-y: scroll;
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
      leaveList:[],
      comeList:[],
      listContent:[],
      options: [
          { value: "", text: '大廳' },
          { value: 'a', text: 'a' },
          { value: 'b', text: 'b' },
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
    playersComeLeaveMessage(){
      return [...this.comeList,...this.leaveList]
    },
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
  window.socket = new WebSocket('ws://websockewechat.herokuapp.com/', 'protocol1')
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
              _this.comeList.push(data.message)
            }
            if(data.type == 'changeIn'){             
              _this.comeList.push(data.message)
            }
            if(data.type == 'changeOut'){             
              _this.leaveList.push(data.message)
            }
            if(data.type == 'leave'){             
              _this.leaveList.push(data.message)
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

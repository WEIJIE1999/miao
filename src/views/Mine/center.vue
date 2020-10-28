<template>
  <div>
    <div class="content">
      <div class="imgs"><img class="userHead" :src="$store.state.user.userHead" ></div>
      <div class="user">
        <div class="username">{{$store.state.user.name}}</div>
        <div>
          <div v-if="$store.state.user.isAdmin">管理员 </div>
          <div v-else>普通用户</div>
      </div>
      </div>
    </div>
      <div>
        修改头像
        <input type="file" name="file" value="上传头像" @change='handleToUpload'>
      </div>
      <div class="btn">
        <a href="/admin" target="_blank">进入管理后台</a>
      <a
        href="javascript:;"
        @touchstart="handleToLogout"
      >退出</a>
      </div>

  </div>
</template>

<script>
import axios from 'axios'
import { messageBox } from '@/components/JS'
export default {
  name: 'center',
  methods: {
    handleToLogout () {
      this.axios.get('/api2/users/logout').then((res) => {
        if (res.data.status === 0) {
          localStorage.removeItem('name')
          localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', { name: '', isAdmin: 'false', userHead: '' })
          this.$router.push('/mine/login')
        }
      })
    },
    handleToUpload (ev) {
      var file = ev.target.files[0]
      var param = new FormData()
      param.append('file', file, file.name)
      var config = {
        headers: {
          'Contnt-Type': 'multipart/form-data'
        }
      }
      this.axios.post('/api2/users/uploadUserHead', param, config).then((res) => {
        if (res.data.status === 0) {
          var This = this
          messageBox({
            title: '信息',
            content: '上传头像成功',
            ok: '确定',
            handleOk () {
              This.$store.commit('user/USER_NAME', {
                userHead: res.data.data.userHead,
                name: This.$store.state.user.name,
                isAdmin: This.$store.state.user.isAdmin
              })
            }
          })
        } else {
          messageBox({
            title: '信息',
            content: '上传头像失败',
            ok: '确定'
          })
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api2/users/getUser').then((res) => {
      if (res.data.status === 0) {
        next(vm => {
          localStorage.setItem('name', res.data.data.username)
          localStorage.setItem('isAdmin', res.data.data.isAdmin)
          vm.$store.commit('user/USER_NAME', {
            name: res.data.data.username,
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead
          })
        })
      } else {
        next('/mine/login')
      }
    })
  }
}
</script>

<style scoped>
.userHead{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.content{
  display: flex;
}
.imgs{
  flex:1.1;
  margin-left: 10px;
}
.user{
  display: flex;
  flex:3;
  flex-direction: column;
  font-size: 17px;
}
.user>div{
  flex: 1;
}
.username{
  font-weight: bold;
  font-size: 20px;
  margin-top: 5px;
}
.btn{
  height: 150px;
  color: white;
}
.btn>a{
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 45px;
  font-size: 20px;
  background:#e54847 ;
  margin-top: 10px;
}
</style>

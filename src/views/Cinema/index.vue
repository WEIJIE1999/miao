<template>
  <div id="main">
    <Header title="喵喵影院" />
    <div id="content">
      <div class="cinema_menu">
        <router-link tag="div" to="" class="city_switch">
          全城 <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <router-link tag="div" to="" class="brand_swtich">
          品牌 <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <router-link tag="div" to="" class="feature_switch">
          特色 <i class="iconfont icon-lower-triangle"></i>
        </router-link>
      </div>
      <CiList />
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import CiList from '@/components/CiList'
export default {
  name: 'Cinema',
  components: {
    Header,
    TabBar,
    CiList
  }
}
</script>

<style>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
.cinema_menu city_switch.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.cinema_menu brand_swtich.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.cinema_menu feature_switch.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
</style>

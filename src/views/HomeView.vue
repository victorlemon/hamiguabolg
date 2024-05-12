<template>
  <div class="blog">
    <div class="hello">
      <van-notice-bar
        left-icon="volume-o"
        mode="closeable"
        scrollable
        color="#1989fa"
        background="#ecf9ff"
        text="与君远相知，不道云海深。欢迎来到哈密瓜哈哈的网站"
      />
      <div class="navtop">2024,让我们一起重新出发</div>
      <div class="navbottom">
        <div class="bottom">
          <img alt="Vue logo" @click="showPopup" src="@/assets/daohang.svg" />
        </div>
        <div id="haomiao">浩渺行无极，扬帆但信风</div>
        <!-- eslint-disable-next-line prettier/prettier -->
      <img src="@/assets/sss.svg" style="width: 24px; height: 24px; margin-right: 7px" 
          alt=""
        />
      </div>
      <!-- 图标位置 -->
      <van-popup
        v-model:show="show"
        closeable
        lock-scroll:false
        duration="0.3"
        close-icon-position="top-right"
        position="left"
        :style="{ width: '50%', height: '100%' }"
      >
        <div class="my-container" style="padding-top: 33px; padding-left: 20px">
          <h3>哈哈哈哈哈</h3>
          <a href="http://www.baidu.com">点我去百度</a>
        </div>
      </van-popup>

      <!-- 导航结束 -->
      <!-- banner开始 -->
      <div class="banner">
        <div class="bannerlist"></div>
        <div class="bannerlist1"></div>
      </div>
      <div class="banner-con">
        <ul>
          <li><a href="http://www.lemon183.cn">文章</a></li>
          <li><a href="">故事</a></li>
          <li><a href="">笔记</a></li>
        </ul>
      </div>

      <list-vue></list-vue>
      <!-- footer开始 -->
      <div class="footer">
        <!-- <div class="footer-con">
        <div class="ftop">技术支持： VictorLemon</div>
        <img src="../assets/github-fill.svg" alt="" />
      </div> -->
        <div class="footer-ban">
          <div class="ban-p1">雨浸风蚀的落寞与仓楚一定是水</div>
          <div class="ban-p1">静静地流过青春奋斗的日子和触摸理想的岁月</div>
          <div class="ban-p1">—— 路遥</div>
        </div>
        <div class="foot-iconqq">
          <img src="../assets/weixin_1.svg" alt="" />
          <img src="../assets/QQ.svg" alt="" />
        </div>
        <div class="foot-iconchat">
          <div class="iconchat-list">
            <img src="../assets/o.png" alt="" />
            <p>微信联系</p>
          </div>
          <div class="iconchat-list">
            <img src="../assets/oo.png" alt="" />
            <p>站长qq</p>
          </div>
        </div>
        <div class="footer-con">
          <div class="ftop">技术支持： VictorLemon</div>
          <img src="../assets/github-fill.svg" alt="" />
        </div>
        <audio id="myAudio" src="../assets/mysoul.mp3" autoplay></audio>
        <van-button type="primary" @click="playAudio" size="mini"
          >播放</van-button
        >
        <van-button type="primary" @click="pauseAudio" size="mini"
          >暂停</van-button
        >
        <van-button shape="circle" size="small" icon="play" class="play-button"
          >撒娇的</van-button
        >
      </div>
    </div>

    <!-- <div class="list">
      <h1>博客文章</h1>

      <div v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
        <div class="post-content" v-html="post.content"></div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

const show = ref(false)
const showPopup = () => {
  show.value = true
}

onMounted(async () => {
  const response = await fetch('http://localhost:3000/api/posts')
  posts.value = await response.json()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 导航区域开始 */
a {
  text-decoration: none;
  list-style: none;
}
.hello {
  max-width: 540px;
  min-width: 320px;
  margin: 0 auto;
  font:
    normal 16px/1.5 PingFangSC-regular,
    Tahoma,
    Lucida Grande,
    Verdana,
    Microsoft Yahei,
    STXihei,
    hei;
  color: #000;
}

.hello .navtop {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: #000;
  background-color: #fff;
}
.hello .navbottom {
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* font-size: 22px; */
  color: #000;
  background-color: #fff;
}
#haomiao {
  font-size: 19px;
  font-weight: 600;
  font-family: STSong, STSongti-SC-Regular, serif;
  color: #00a9ff;
  background-color: #fff;
}

/* 导航结束 */

/* banner开始 */
.banner {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-around;
}
.banner .bannerlist {
  display: flex;
  width: 48%;
  border-radius: 12px;
  text-align: center;
  background: url(../assets/88.jpg) no-repeat center;
  background-size: cover;
  background-color: #00a9ff;
}
.banner .bannerlist1 {
  display: flex;
  width: 48%;
  border-radius: 12px;
  text-align: center;
  background: url(../assets/45.jpg) no-repeat center;
  background-size: cover;
}
/* 字体 */
@font-face {
  font-family: 'PangMenZhengDao';
  src: url('@/assets/Pang.ttf') format('truetype');
}
/* 字体旁门 */
.navtop {
  color: #ccc;
  font-family: 'PangMenZhengDao', Arial, sans-serif;
}
/* banner-con */
.banner-con ul {
  width: 100%;
  display: flex;
  height: 40px;
}
.banner-con ul li {
  width: 20%;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-family: STSong, STSongti-SC-Regular, serif;
  font-weight: 600;
  color: #00a9ff;
}
.banner-con ul li a {
  color: #00a9ff;
}
.read-list {
  width: 100%;
  display: flex;
  height: 144px;
  background-color: #fff;
}
.read-list .read-list-img {
  width: 48%;
  margin: 9px 0px 9px 0px;
  margin-left: 5px;
  /* background: url(../assets/45.jpg) no-repeat center;
  background-size: contain; */
}
.read-list-img-1 {
  /* background-color: #ccc; */
  background: url(../assets/45.jpg) no-repeat center;
  background-size: cover;
  border-radius: 10px;
}
.read-list-img-2 {
  background: url(../assets/100.jpg) no-repeat center;
  background-size: cover;
  border-radius: 10px;
}
.read-list-img-3 {
  background: url(../assets/99.jpg) no-repeat center;
  background-size: cover;
  border-radius: 10px;
}

/* .read-list:nth-child(2) .read-list-img {
  width: 43%;
  height: 100%;
  border-radius: 20px;
  margin-left: 5px;
  background: url(../assets/45.jpg) no-repeat center !important;
  background-size: contain;
} */
.read-list-r {
  width: 56%;
  height: 93%;
  margin: 5px;
  /* background-color: pink; */
}
.read-list-r li {
  display: flex;
  padding: 5px;
  flex-direction: column;
}
timee .read-list-r li .h4 {
  display: flex;
  justify-content: space-between;
}
.read-list-r li .h4 .time {
  font-size: 10px;
  color: #12a182;
  font-weight: 600;
}
.read-list-r li h4,
p {
  margin: 0;
  padding: 0;
}
.read-list-r li h4 {
  font-size: 15px;
  text-align: left;
  color: #000;
}
.read-list-r li p {
  width: 82%;
  font-size: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 你可以根据需要调整这个值 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #5e6d82;
  text-overflow: ellipsis;
}
.read-list-r li .icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 23px;
}
.read-list-r li .icon .icon-pp {
  width: 50%;
  background-color: #e16c96;
  border-radius: 10px;
}
.read-list-r li .icon .icon-kk {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  font-size: 18px;
  height: 23px;
  line-height: 23px;
}
.read-list-r li .icon .icon-kk img {
  width: 22px;
  height: 22px;
  margin-right: 0px;
}
.read-list-r li .icon .icon-kk .count {
  font-size: 15px;
  color: #93b5cf;
}
/* footer开始 */
.footer {
  margin-top: 10px;
  height: 430px;
}
.footer .footer-con {
  width: 100%;
  height: 28px;
  font-size: 25px;
  color: #5e6d82;
  display: flex;
  font-family: 'PangMenZhengDao', Arial, sans-serif;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 18px;
}
.footer .footer-ban {
  /* margin-top: 10px; */
  padding-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.footer .footer-ban .ban-p1 {
  font-size: 16px;
  color: #ccc;
  font-family: SimSun, STSong, STSongti-SC-Regular, serif;
  font-weight: 700;
}
.footer .footer-ban .ban-p1:nth-child(3) {
  margin-top: 5px;
  width: 80%;
  text-align: end;
}
.footer .foot-iconqq {
  display: flex;
  justify-content: space-around;
  width: 50%;
  height: 30px;
  margin: 0 auto;
  background-color: #fff;
}
.footer .foot-iconchat {
  display: flex;
  width: 280px;
  height: 150px;
  margin: 0 auto;
  background-color: #fff;
}
.footer .foot-iconchat .iconchat-list {
  margin: 0 auto;
  height: 150px;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.play-button {
  position: fixed;
  bottom: 100px;
  right: 3px;
  margin: 10px;
  z-index: 999;
}
</style>

<style scoped>
@media screen and (min-width: 1036px) {
  .list {
    width: 1200px;
  }
}
.list {
  padding: 1em;
}

.post {
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2em;
}

.post h2 {
  margin-bottom: 0.5em;
}

.post p {
  margin-bottom: 1em;
}
.post-content {
  text-indent: 2em;
  line-height: 1.6;
  margin-bottom: 1em;
  text-align: justify;
}
</style>

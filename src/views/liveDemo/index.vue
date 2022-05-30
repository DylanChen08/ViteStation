<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        Live test demo
      </el-header>
      <el-main>
        <section class="live-container">
          <div class="live-control-button-top">
            <div>流的地址:</div>
            <div style="width: 60%;margin-left: 20px;">
              <el-input
                  v-model="stream_url"
                  placeholder="Please input"
              />
            </div>
            <div style="margin-left: 20px;">
              <el-button type="primary" plain>转为媒体数据源(MediaDataSource)</el-button>
            </div>
          </div>
          <div class="checkbox-group">
            <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
            >全选
            </el-checkbox
            >
            <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                  city
                }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="video-container">
            <video id="videoElement" ref="videoElement" muted controls></video>
          </div>
          <div class="live-control-button-bottom">
            <el-button plain>加载</el-button>
            <el-button type="success" plain>开始</el-button>
            <el-button type="info" plain>暂停</el-button>
            <el-button type="danger" plain>销毁</el-button>
          </div>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>

import flvjs from 'flv.js'

const videoElement = ref('')

onMounted(() => {
  initVideo()
  console.log(videoElement.value)
})

const initVideo = () => {
  if (flvjs.isSupported()) {
    const _videoElement = videoElement.value
    const flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: 'http://192.168.30.239:1080/rtsp_32_136/rtsp_32_136.live.flv'
    });
    flvPlayer.attachMediaElement(_videoElement);
    flvPlayer.load();
    flvPlayer.play();
  }
}

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['直播', '带上认证', '音频', '视频']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>

<style lang="scss" scoped>
.el-header {
  background: #c6e2ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.live-container {
  display: flex;
  flex-direction: column;
  border: 1px solid red;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0 ;
  }
  .video-container{

  }
}
</style>

<template>
  <section id="drag-container" ref="drag_container">
    <section id="drag" ref="drag" :class="['animate__animated',state.isDragging?'animate__pulse':'']">
      <div>拖拽组件</div>
      <div><img width="100" height="100" src="@/assets/linabell.jpg" alt=""></div>
      <div>横轴x：{{ state.x !== null ? state.x : '0' }}</div>
      <div>纵轴y：{{ state.y !== null ? state.y : '0' }}</div>
    </section>
  </section>
</template>


<script lang="ts" setup>
import 'animate.css';
const {proxy}: any = getCurrentInstance()
const drag_container = ref('')
const drag = ref('')
const state = reactive({
  dragDom: '',
  isDragging: false,
  x: null,
  y: null,
})
onMounted(() => {
  console.log('拖拽组件');
  dragAction() //在挂载的时候获取dom
})
const getDragDom = () => {
  return drag_container.value
}

const getDragInner = () => {
  return drag.value
}
const dragAction = () => {
  const dragDom = getDragDom()
  const dragInner = getDragInner()
  const position = {x: '', y: ''}
  let isDragging = false
  dragInner.addEventListener('mousedown', (e: any) => {
    console.log('按下', e);
    isDragging = true
    state.isDragging = true
    position.y = `${e.screenY - 300}` + 'px'
    position.x = `${e.screenX - 130}` + 'px'
  })

  dragInner.addEventListener('mousemove', (e: any) => {
    if (isDragging) {
      console.log('移动', e);
      dragInner.style.top = `${e.screenY - 280}` + 'px'
      dragInner.style.left = `${e.screenX - 130}` + 'px'
      position.y = `${e.screenY - 280}` + 'px'
      position.x = `${e.screenX - 130}` + 'px'
      state.y = position.y
      state.x = position.x
    }

  })

  dragInner.addEventListener('mouseup', (e: any) => {
    console.log('结束', e);
    isDragging = false
    state.isDragging = false
    dragInner.style.top = position.y
    dragInner.style.left = position.x
  })


}

</script>

<style lang="scss" scoped>

.animate__animated .animate__pulse {
  --animate-duration: infinite;
}

#drag-container {
  position: relative;
  //border: 1px solid red;
  height: 1000vh;

  #drag {
    position: absolute;
    margin-top: 60px;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #eeeeee;
    margin-left: 40px;
    background: -webkit-gradient(linear, left top, left bottom, from(#ff00ca), to(#cd9400));
    border-radius: 10px;
    cursor: pointer;

    div {
      margin-top: 10px;
    }
  }
}

</style>

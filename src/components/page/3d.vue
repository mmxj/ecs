<style scoped>
.el_mainContent {
  position: relative;
}

.wrap3D {
  width: 100%;
  height: 200%;
  border: 1px solid #000;
}

.el_title {
  width: 100%;
  height: 50px;
  background: #abc;
}

.el_cont {
  width: 100%;
  position: absolute;
  border: 1px solid #000;
  top: 50px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
<template>
  <div class="el_mainContent" style='height:100%;overflow-y:auto' v-loading='loadingTable'>
    <div class="el_title">title</div>
    <div class="el_cont" ref='el_cont'>
        <!-- <canvas ref='canvas'></canvas> -->
    </div>
  </div>
</template>
<script>
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';
export default {
  data() {
    return {
      loadingTable: false,
      tid: null,
    }
  },
  methods: {
    getWH(ref){
        let vm = this
        let el = vm.$refs[ref]
        return {
            width: el.clientWidth,
            height: el.clientHeight
        }
    },
    init3d(){
        let vm = this
        let el = vm.$refs.canvas
        let WH = vm.getWH('el_cont')
        let gl = el.getContext("experimental-webgl")
        console.log(WH)
        function updateFrame() {
            gl.viewport ( 0, 0, WH.width, WH.height )
            gl.clearColor(0.4, 0.4, 0.7, 1)
            gl.clear ( gl.COLOR_BUFFER_BIT )
        }
        clearInterval(vm.tid)
        setInterval(function () {
            updateFrame()
        }, 20)

    },
    init3js(){
        let vm = this
        let scene = new Scene();
        let camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        let renderer = new WebGLRenderer();
        let WH = vm.getWH('el_cont')
        renderer.setSize( WH.width, WH.height );
        let el = vm.$refs.el_cont
        el.appendChild( renderer.domElement );
    }
  },
  mounted() {
    let vm = this
    vm.$nextTick(function() {
        vm.init3js()
    })
  },
  beforeDestory() {
    clearInterval(this.tid)
  }
}

</script>

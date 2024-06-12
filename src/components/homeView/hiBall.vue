<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';

// 資料傳遞設定
const emit = defineEmits(['changeThemeFromHiBall']);
const props = defineProps({
    changeTheme: Boolean,
});

// 用於存放 ChangeTheme 動畫的定時器
let timerForChangeTheme;

// 宣告基本變數
let container, camera, renderer;
let sceneL, sceneR;

// 宣告物體
let meshL, meshR, circleL, circleR;

// 宣告 slide 變數
let sliderPos = (window.innerWidth / 10 * 7) / 2;
let backgroundLeft, backgroundRight;

// 宣告自轉變數
let goUp = true;
let goRight = true;

// 初始化基本變數
function initBall() {

    // 初始化容器
    container = document.querySelector('.container');

    // 初始化相機位置
    camera = new THREE.PerspectiveCamera(35, (window.innerWidth / 10 * 7) / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    // 初始化場景
    sceneL = new THREE.Scene();
    sceneR = new THREE.Scene();

    // 初始化光源
    const light = new THREE.HemisphereLight(0xffffff, 0x477774, 3);
    light.position.set(- 2, 2, 2);
    sceneR.add(light.clone());
    sceneL.add(light.clone());

    initMeshes();
    initSlider();

    // 渲染
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize((window.innerWidth / 10 * 7), window.innerHeight);
    renderer.setScissorTest(true);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

}

// 初始化物體
function initMeshes() {

    const geometry = new THREE.IcosahedronGeometry(1, 3);
    const geometryCircle = new THREE.TorusGeometry(1.3, 0.05, 3, 100);

    meshL = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        flatShading: true,
        color: 0xffffff,
        emissive: 0xDEDEDE,
        emissiveIntensity: 0.35,
        polygonOffset: true,
        polygonOffsetUnits: 1,
        polygonOffsetFactor: 1,
    }));
    circleL = new THREE.Mesh(geometryCircle, new THREE.MeshStandardMaterial({
        flatShading: true,
        color: 0xf6ea87,
        emissive: 0xff9800,
        emissiveIntensity: 0.35,
        polygonOffset: true,
        polygonOffsetUnits: 1,
        polygonOffsetFactor: 1,
    }));

    circleL.rotation.x = 1.8;
    circleL.rotation.y = -0.2;
    // sceneL.add( meshR );
    // sceneL.add( circleR );

    meshR = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ wireframe: true }));
    circleR = new THREE.Mesh(geometryCircle, new THREE.MeshStandardMaterial({ wireframe: true }));
    circleR.rotation.x = 1.8;
    circleR.rotation.y = -0.2;
    sceneR.add(meshL);
    sceneR.add(circleL);

    sceneL.add(meshR);
    sceneL.add(circleR);

}

// 初始化隔板
function initSlider() {

    const slider = document.querySelector('.slider');
    backgroundLeft = document.querySelector('.left');
    backgroundRight = document.querySelector('.right');

    function onPointerDown() {
		if ( event.isPrimary === false ) return;
		window.addEventListener( 'pointermove', onPointerMove );
		window.addEventListener( 'pointerup', onPointerUp );
	}

	function onPointerUp() {
		window.removeEventListener( 'pointermove', onPointerMove );
		window.removeEventListener( 'pointerup', onPointerUp );
	}

    function onPointerMove(e) {
        if (event.isPrimary === false) return;
        sliderPos = Math.max(0, Math.min((window.innerWidth / 10 * 7), e.pageX));
        slider.style.left = sliderPos - (slider.offsetWidth / 2) + 'px';
        backgroundLeft.style.width = sliderPos + 'px';
        backgroundRight.style.width = (window.innerWidth) / 10 * 7 - sliderPos + 'px';
    }

    slider.style.touchAction = 'none'; // disable touch scroll
    slider.addEventListener('pointerdown', onPointerDown);

}

// 適應視窗變化
function onWindowResize() {

    camera.aspect = (window.innerWidth / 10 * 7) / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize((window.innerWidth / 10 * 7), window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

}

// 定時渲染動畫
function animate() {

    // 球體的運作方式
    meshL.rotation.x += 0.001;
    meshL.rotation.y += 0.003;
    meshR.rotation.x = meshL.rotation.x;
    meshR.rotation.y = meshL.rotation.y;

    // 圓環的運作方式
    const border = 0.05
    if (circleL.position.y > border || circleL.position.y < -border) {
        goUp = !goUp;
    }
    if (goUp) {
        circleL.position.y += 0.0005;
        circleR.position.y = circleL.position.y;
    } else {
        circleL.position.y -= 0.0005;
        circleR.position.y = circleL.position.y;
    }

    if (circleL.position.x > border || circleL.position.x < -border) {
        goRight = !goRight;
    }
    if (goRight) {
        circleL.position.x += 0.0005;
        circleR.position.x = circleL.position.x;
    } else {
        circleL.position.x -= 0.0005;
        circleR.position.x = circleL.position.x;
    }

    renderer.setScissor(0, 0, sliderPos, window.innerHeight);
    renderer.render(sceneL, camera);

    renderer.setScissor(sliderPos, 0, (window.innerWidth) / 10 * 7, window.innerHeight);
    renderer.render(sceneR, camera);

    // 判斷是否自動移動 sliderPos
    if(props.changeTheme){
        timerForChangeTheme = window.setInterval( changeThemeAnimate(), 1);
    }

    // 判斷是否切換主題
    if(sliderPos == 0){
        if(localStorage.getItem('theme') == 'light'){
            return;
        }

        localStorage.setItem('theme', 'light');
        emit('changeThemeFromHiBall');
    }
    
    if(sliderPos == window.innerWidth / 10 * 7){
        if(localStorage.getItem('theme') == 'dark'){
            return;
        }

        localStorage.setItem('theme', 'dark');
        emit('changeThemeFromHiBall');
    }
}

// ChangeTheme 的動畫
function changeThemeAnimate(){
    props.changeTheme = false;
    if( localStorage.getItem('theme') == 'light' ){
        sliderPos-=2;
        if(sliderPos <= 0){
            sliderPos = 0;
            window.clearInterval(timerForChangeTheme);
            timerForChangeTheme = null;
        }
    }
    if( localStorage.getItem('theme') == 'dark' ){
        sliderPos+=2;
        if(sliderPos >= window.innerWidth / 10 * 7){
            sliderPos = window.innerWidth / 10 * 7;
            window.clearInterval(timerForChangeTheme);
            timerForChangeTheme = null;
        }
    }
    const slider = document.querySelector('.slider');
    slider.style.left = sliderPos - (slider.offsetWidth / 2) + 'px';
    backgroundLeft.style.width = sliderPos + 'px';
    backgroundRight.style.width = (window.innerWidth) / 10 * 7 - sliderPos + 'px';

}

onMounted(() => {

    initBall();

});

</script>

<template>
    <div class="container">
        <div class="slider"></div>
        <div class="background left"></div>
        <div class="background right"></div>
    </div>
</template>

<style lang="scss" scoped>

// 球
canvas {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
    background-color: transparent;
}

// 背景
.container {
    position: relative;
    width: 70vw;
    height: 100%;

    .slider {
        position: absolute;
        cursor: ew-resize;
        width: 40px;
        height: 40px;
        background-color: #F32196;
        opacity: 0.7;
        border-radius: 50%;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
    }

    .background {
        position: absolute;
        top: 0;
        z-index: -1;
        width: 50%;
        height: 100%;
        background-size: 70vw 100vh;
        overflow: hidden;
    }

    .left {
        left: 0;
        background-position: top left;
        background-image: url('../../components/icons/darkHome.gif');
    }

    .right {
        right: 0;
        background-position: top right;
        background-image: url('../../components/icons/lightHome.gif');
    }
}
</style>
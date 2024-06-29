<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';

// 貝茲曲線
import TWEEN from 'three/addons/libs/tween.module.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// 內容文字
// %4 = 0:標題 1:詳細 2:決定x位置 3:決定y位置
const table = [
    //
	'BACKGROUND', '', 1, 1,
	'Family', '．生長在臺南\n．排行第二，擅長協調合作\n．家庭背景單純，無不良嗜好', 1, 2,
	'Education', '．107/1 學測數學14級分\n．107/09-111/06 國立陽明交通大學\n．112/04-113/01 備考資工研究所\n．113/02-113/06 Java培訓班', 1, 3,
	'Personality Traits', '．樂觀開朗、充滿好奇心的人\n．以積極的態度去面對生活中的挑戰', 1, 4,
	'Work Experience', '．111/09-112/03 國立臺灣大學醫學院附設醫院護理師', 1, 5,
	//
	'PROGRAMMING', '', 2, 1,
	'Languages', '．前端：HTML、SCSS、Vue.js\n．後端：Java、MySQL、JavaScript', 2, 2,
	'Project', '．個人網頁\n．動態問卷\n．螺絲工廠的生產效能追蹤', 2, 3,
	'Objective', '．為社會和公司創造價值\n．研究所進修', 2, 4,
	//
	'CONTACE', '', 3, 1,
	'Name', 'Misty Weng', 3, 2,
	'E-mail', 'hjing378@gmail.com', 3, 3,
	'GitHub', 'Yuuquoi', 3, 4,

    //
	'BACKGROUND', '', 1, 1,
	'Family', '．生長在臺南\n．排行第二，擅長協調合作\n．家庭背景單純，無不良嗜好', 1, 2,
	'Education', '．107/1 學測數學14級分\n．107/09-111/06 國立陽明交通大學\n．112/04-113/01 備考資工研究所\n．113/02-113/06 Java培訓班', 1, 3,
	'Personality Traits', '．樂觀開朗、充滿好奇心的人\n．以積極的態度去面對生活中的挑戰', 1, 4,
	'Work Experience', '．111/09-112/03 國立臺灣大學醫學院附設醫院護理師', 1, 5,
	//
	'PROGRAMMING', '', 2, 1,
	'Languages', '．前端：HTML、SCSS、Vue.js\n．後端：Java、MySQL、JavaScript', 2, 2,
	'Project', '．個人網頁\n．動態問卷\n．螺絲工廠的生產效能追蹤', 2, 3,
	'Objective', '．為社會和公司創造價值\n．研究所進修', 2, 4,
	//
	'CONTACE', '', 3, 1,
	'Name', 'Misty Weng', 3, 2,
	'E-mail', 'hjing378@gmail.com', 3, 3,
	'GitHub', 'Yuuquoi', 3, 4,


];

// 宣告基本變數
let camera, scene, renderer;
let controls;

// 畫面呈現
const objects = [];
const targets = { table: [], sphere: [] };

defineExpose({
  test
})

function test(t) {
    console.log(200);
    console.dir(t);
}

// 初始化
function init() {

    // 環境設定
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 3000;
    scene = new THREE.Scene();

    // 物件設定
    for ( let i = 0; i < table.length; i += 4 ) {

        const element = document.createElement('div');

        if(!table[i+1]){

            // 大標
            element.className = 'element headline';
            element.style.backgroundColor = 'rgba(255, 255, 0,' + ( Math.random() * 0.5 + 0.25 ) + ')';

        } else {

            // 小標
            element.className = 'element subtitle';
            element.id = 'subtitle' + i;
            element.style.backgroundColor = 'rgba(0, 127, 127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

        }

        // 標題文字
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = table[ i ];
        element.appendChild( title );

        // 亂數位置
        const objectCSS = new CSS3DObject( element );
        objectCSS.position.x = Math.random() * 4000 - 1000;
        objectCSS.position.y = Math.random() * 4000 - 1000;
        objectCSS.position.z = Math.random() * 4000 - 1000;
        scene.add( objectCSS );

        objects.push( objectCSS );

        // table 位置
        const object = new THREE.Object3D();
        object.position.x = ( table[ i + 2 ] * 1200 ) - 2400;
        object.position.y = - ( table[ i + 3 ] * 250 ) + 900;

        targets.table.push( object );

    }

    // sphere 位置設定
    const vector = new THREE.Vector3();
    for ( let i = 0, l = objects.length; i < l; i ++ ) {

        const phi = Math.acos( - 1 + ( 2 * i ) / l );
        const theta = Math.sqrt( l * Math.PI ) * phi;

        const object = new THREE.Object3D();
        object.position.setFromSphericalCoords( 800, phi, theta );
        vector.copy( object.position ).multiplyScalar( 2 );
        object.lookAt( vector );
        targets.sphere.push( object );

    }

    // 渲染畫面
    renderer = new CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild( renderer.domElement );

    // 監聽事件
    controls = new TrackballControls( camera, renderer.domElement );
	controls.minDistance = 500;
	controls.maxDistance = 6000;
	controls.addEventListener('change', render);

    const buttonTable = document.getElementById('table');
    buttonTable.addEventListener('click', function () {
        transform( targets.table, 2000 );
    } );

    const buttonSphere = document.getElementById( 'sphere' );
    buttonSphere.addEventListener( 'click', function () {
        transform( targets.sphere, 2000 );
    } );

    window.addEventListener('resize', onWindowResize);

    // 
    transform( targets.table, 1500 );

}

// 轉換型態
function transform( targets, duration ) {

    TWEEN.removeAll();

    for ( let i = 0; i < objects.length; i ++ ) {

        const object = objects[ i ];
        const target = targets[ i ];

        new TWEEN.Tween( object.position )
            .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        new TWEEN.Tween( object.rotation )
            .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

    }

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}

// 重新適應畫面大小
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

// 定時更新
function animate() {

    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();

}

// 重新渲染
function render() {

    renderer.render( scene, camera );

}

onMounted(() => {

    init();
    animate();

})

</script>

<template>

    	<div id="container"></div>

		<div id="menu">
			<button id="table">TABLE</button>
			<button id="sphere">SPHERE</button>
		</div>

</template>

<style lang="scss">
    // 基本樣式
    .element {
		width: 600px;
		height: 160px;
		font-family: Helvetica, sans-serif;
		text-align: center;
		line-height: normal;

        .title{
			position: absolute;
			top: 40px;
			left: 0px;
			right: 0px;
			font-size: 60px;
			font-weight: bold;
			color: rgba(255,255,255,0.75);
        }
	}
    .headline {
		box-shadow: 0px 0px 12px rgba(255, 255, 0,0.5);
		border: 1px solid rgba(255,255,127,0.25);
		cursor: default;

        &:hover{
            box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
			border: 1px solid rgba(127,255,255,0.75);
        }

        .title {
			// text-shadow: 0 0 2px rgba(255,255,0,0.95);
		}
	}
    .subtitle{
		box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
		border: 1px solid rgba(127,255,255,0.25);
        cursor: pointer;

        &:hover{
            box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
			border: 1px solid rgba(127,255,255,0.75);
        }

        .title {
            // text-shadow: 0 0 2px rgba(0,255,255,0.95);
		}
    }
    #menu {
		position: absolute;
		bottom: 20px;
		width: 100%;
		text-align: center;

        button {
			color: rgba(127,255,255,0.75);
			background: transparent;
			outline: 1px solid rgba(127,255,255,0.75);
			border: 0px;
			padding: 5px 10px;
			cursor: pointer;

            &:hover{
                background-color: rgba(0,255,255,0.5);
            }

            &:active{
                color: #000000;
				background-color: rgba(0,255,255,0.75);
            }
		}

	}
</style>
<script>
import hiBall from '../components/homeView/hiBall.vue'
import navigationBar from '../components/homeView/navigationBar.vue';

export default {
    // Lifecycle
    mounted() {
        this.initTheme();
    },

    // 
    methods: {

        // 初始化主題
        initTheme() {

            let app = document.getElementById('app');
            console.dir(app);

            // 若沒有手動切換
            if(!localStorage.getItem('theme')){
                return;
            }

            // 若有手動切換，清除相反的 theme，加入新的 theme
            let theme = localStorage.getItem('theme');
            let removeTheme = theme === 'dark' ? 'light' : 'dark';
            app.classList.remove(removeTheme);
            app.classList.add(theme);
        },

        // 按鈕觸發模式轉換事件
        themeControlEvent(){
            this.initTheme();
            this.changeTheme = true;
        }
    },

    //
    data(){
        return{
            changeTheme: false,
        }
    },

    //
    components: {
        hiBall,
        navigationBar
    },
}
</script>

<template>
    <div class="homeView">

        <div class="leftShow">
            <hiBall @changeThemeFromHiBall="initTheme" :changeTheme="this.changeTheme" />
        </div>

        <div class="rightShow">
            <navigationBar @changeThemeFromNavigationBar="themeControlEvent" />
        </div>

    </div>        
</template>

<style lang="scss" scoped>

.homeView {
    width: 100vw;
    height: 100vh;
    display: flex;

    .leftShow {
        width: 70%;
        height: 100vh;
    }

    .rightShow{
        width: 30%;
        height: 100vh;
    }

}

</style>
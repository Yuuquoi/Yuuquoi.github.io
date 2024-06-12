<script>
export default {
    methods: {

        // 設置主題
        setTheme(theme){
            localStorage.setItem('theme', theme);
            this.$emit('changeThemeFromNavigationBar');
        }
    },
}
</script>

<template>

    <!-- 淺色版本 -->
    <div class="navigationBar navigationBarLight">

        <a href="https://github.com/Yuuquoi" target="_blank"><i class="fa-brands fa-github"></i></a>

        <div class="img" @click="this.$router.push('/about')">
            <img src="../icons/textAbout.jpg" class="text about">
        </div>

        <div class="img">
            <img src="../icons/textBlog.jpg" class="text blog">
        </div>

        <div class="img">
            <img src="../icons/textCorner.jpg" class="text corner">
        </div>

        <div class="themeControl" @click="this.setTheme('dark')">
            <span class="circle"></span>
            <i class="fa-solid fa-sun"></i>
        </div>

    </div>

    <!-- 深色版本 -->
    <div class="navigationBar navigationBardark">

        <a href="https://github.com/Yuuquoi" target="_blank"><i class="fa-brands fa-github"></i></a>

        <div class="img" @click="this.$router.push('/about')">
            <img src="../icons/darkAbout.png" class="text about">
        </div>

        <div class="img">
            <img src="../icons/darkBlog.png" class="text blog">
        </div>

        <div class="img">
            <img src="../icons/darkCorner.png" class="text corner">
        </div>

        <div class="themeControl" @click="this.setTheme('light')">
            <i class="fa-solid fa-moon"></i>
            <i class="fa-solid fa-star"></i>
            <span class="circle"></span>
        </div>

    </div>
</template>

<style lang="scss" scoped>
// 基本樣式
.navigationBar {
    width: 100%;
    height: 100%;
    background-color: var(--homeViewBgc);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .fa-github {
        font-size: 3vw;
        margin-bottom: 3vw;
        color: var(--textColor);

        &:hover {
            color: var(--textHoverColor);
        }
    }

    .img {
        position: relative;
        cursor: pointer;

        &::before {
            content: "";
            display: block;
            width: 0;
            height: 0.2vw;
            background-color: var(--textColor);
            position: absolute;
            bottom: 2.2vw;
            left: 50%;
            z-index: 100;
            transition: 1s;
        }

        &:hover {
            &::before {
                width: 100%;
                left: 0;
            }
        }

        img {
            display: block;
            height: 4vw;
            margin: auto;
            margin-top: 1.8vw;
            margin-bottom: 1.8vw;
        }
    }

    .themeControl {
        width: 5vw;
        height: 2.5vw;
        border: 0.2vw solid var(--textColor);
        border-radius: 50px;
        margin-top: 5vw;
        position: relative;
        cursor: pointer;
        overflow: hidden;

        &:hover {
            .fa-star{
                animation-name: shiningStar;
                animation-duration: 10s;
                animation-timing-function: ease-in-out;
                animation-delay: 0s;
                animation-iteration-count: infinite;
                animation-direction: linear;
            }
            .fa-sun{
                animation-name: rotate;
                animation-duration: 10s;
                animation-timing-function: ease-in-out;
                animation-delay: 0s;
                animation-iteration-count: infinite;
                animation-direction: linear;
            }
        }

        .circle {
            display: inline-block;
            width: 1.8vw;
            height: 1.8vw;
            border: 0.2vw solid var(--textColor);
            background-color: var(--textColor);
            border-radius: 50%;
            position: absolute;
        }

        .fa-sun {
            color: var(--yellow);
            font-size: 1.6vw;
            position: absolute;
            top: 15%;
            right: 10%;

            animation-name: rotate;
            animation-duration: 10s;
            animation-timing-function: ease-in-out;
            animation-delay: 0s;
            animation-iteration-count: 1;
            animation-direction: linear;
        }

        .fa-star{
            color: var(--yellow);
            position: absolute;
            font-size: 0.5vw;
            left: 38%;
            top: 30%;
            transform: rotate(30deg);

            animation-name: shiningStar;
            animation-duration: 10s;
            animation-timing-function: ease-in-out;
            animation-delay: 0s;
            animation-iteration-count: 1;
            animation-direction: linear;
        }

        .fa-moon {
            color: var(--yellow);
            font-size: 1.6vw;
            position: absolute;
            top: 15%;
            left: 10%;
        }
    }
}


// 主題樣式：light
.light {
    .homeView {
        .rightShow {

            .navigationBardark {
                display: none;
            }

            .navigationBarLight {
                display: flex;
                .themeControl {

                    .circle {
                        top: 8%;
                        left: 5%;
                    }

                }
            }
        }
    }
}

@media (prefers-color-scheme: light) {
    .homeView {
        .rightShow {
            .navigationBardark {
                display: none;
            }

            .navigationBarLight {
                display: flex;
                .themeControl {
                    .circle {
                        top: 8%;
                        left: 5%;
                    }

                }
            }
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    50%{
        transform: rotate(-180deg);        
    }

    100% {
        transform: rotate(-360deg);
    }
}


// 主題樣式：dark
.dark {
    .homeView {
        .rightShow {

            .navigationBarLight {
                display: none;
            }

            .navigationBardark {
                display: flex;

                .themeControl {
                    .circle {
                        top: 8%;
                        right: 5%;
                    }
                }
            }
        }
    }
}

@media (prefers-color-scheme: dark) {
    .homeView {
        .rightShow {

            .navigationBarLight {
                display: none;
            }

            .navigationBardark {
                display: flex;
                .themeControl {

                    .circle {
                        top: 8%;
                        right: 5%;
                    }
                }
            }
        }
    }
}

@keyframes shiningStar {
    0%{
        transform: rotate(30deg);
    }

    100%{
        transform: rotate(390deg);
    }
}

</style>
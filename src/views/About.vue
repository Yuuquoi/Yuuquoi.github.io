<script>
import tagCloud from '../components/about/tagCloud.vue'

export default{

    components: {
        tagCloud,
    },

}
</script>

<template>
    <div class="about">
        <tagCloud />
    </div>
</template>

<style lang="scss" scoped>
.about{
    width: 100vw;
    height: 100vh;
    background-color: var(--homeViewBgc);
}
</style>
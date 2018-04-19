<template>
    <div class="slide" @click="clickSlide">
        <slot/>
    </div>
</template>
<script>
    export default {
        name:"mk-slide",
        methods: {
            clickSlide() {
                this.$emit('click')
            }
        }
    }
</script>
<style>
.slide {
    width: 100%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    z-index: 10;
    min-height: 100px;
    position: relative
}
.slide img{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 100%;
    display: block;
}
</style>
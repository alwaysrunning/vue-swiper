<template>
    <div>
        <mk-swiper class="swiper" ref="swiper" v-if="list.length>0" @transitionend="getCurrrentSilder" :interval="5000" :autoPlay="true" :threshold="10" :showIndicator="true">
            <mk-slide v-for="(item,index) in list" :key=index>
                <img :src="item.img" />
            </mk-slide>
            <!--<div slot="showIndicator"></div>-->
        </mk-swiper>
        <!-- 
        <div class="button" @click="slideToClick">跳到第三张</div> -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import Swiper from '@/components'
    Vue.use(Swiper);
    export default {
        data() {
            return {
                list: [
                    { img: 'http://img04.bubugao.com/161210d02b5_bc_7a058e6d28d799dd953c199bd498556e_750x557.JPEG' },
                    { img: 'http://img2.bbgstatic.com/15f6ec8f4e9_2_ab7fa860a941ddb3d5d5d667383ed6cf_800x800.png!l5' },
                    { img: 'http://img04.bubugao.com/1609adf77a7_bc_6d5fd0d6567e796b890104d8f77e8096_300x300.JPEG' }
                ]
            }
        },
        methods: {
            slideToClick() {
                this.$refs.swiper.slideTo(2)
            },

            getCurrrentSilder (current){
                console.log(current)
            }
        }
    }
</script>

<style scoped>
.swiper{
    width: 100%;
    height: 375px;
}
</style>
<template>
    <section class="content" @touchmove="fn">
        <div :class="className" class="swiper" @touchstart="s" @touchmove="m" @touchend="e">
            <slot/>
        </div>
        <slot name="showIndicator">
            <div v-if="showIndicator&&show" class="indicator">
                <div v-for="(tag,$index) in slidesLength" v-bind:class="{ show_bgcolor: index-1==$index }" class="indicator_item"></div>
            </div>
        </slot>
    </section>
</template>

<script>
    export default {
        name:"mk-swiper",
        data() {
            return {
                slidesLength: 1,
                _width: 0,
                auto: true,
                sliding: true,
                timer1: '',
                className: '',
                dom: {},
                t: {
                    sx: 0,
                    start: 0,
                    distance: 0
                },
                index: 1,
                slider:null,
                onlyOne:false,
                show:true
            }
        },
        props: {
            //阀值
            threshold:{
                default:30
            },

            showIndicator: {
                default: true
            },

            //滑动所需要的时间
            autoPlay: {
                default: true
            },
            //一次滑动需要走多久
            duration: {
                default: 500
            },
            //两次滑动间隔的时间
            interval: {
                default: 2500
            }
        },
        mounted() {
            this.className = `swiper_${Math.random().toFixed(3) * 1000}`
            this.$nextTick(() => {
                //克隆dom
                this.starDom()
                if(this.onlyOne){
                    this.show =false
                    return
                }
                this.dom.transform = `translate3d(${this._width * -1}px, 0px, 0px)`
                this.dom['-webkit-transform'] = `translate3d(${this._width * -1}px, 0px, 0px)`
                this.dom['-ms-transform'] = `translate3d(${this._width * -1}px, 0px, 0px)`
                if (this.autoPlay) {
                    this.setTime()
                }
            }, 50)
            
        },
        methods: {
            starDom() {
                this.slider = document.querySelector('.' + this.className)
                let SlideDom = this.slider.getElementsByClassName('slide')
                this.slidesLength = SlideDom.length
                if(this.slidesLength==1){
                    this.onlyOne = true
                    return
                }
                let cloneDom1 = SlideDom[0].cloneNode(true) //向最后append
                let cloneDom2 = SlideDom[this.slidesLength - 1].cloneNode(true) //向最前append
                this.slider.insertBefore(cloneDom2, SlideDom[0])
                this.slider.appendChild(cloneDom1)
                this._width = this.slider.offsetWidth
                this.dom = this.slider.style
            },
            s(x) {
                if (this.sliding && !this.onlyOne) {
                    this.$emit('scrollStatus', 'start')
                    this.clearTimeOut()
                    this.t.sx = this.left()
                    this.t.start = x.touches[x.touches.length - 1].clientX
                }
            },
            m(x) {
                if (this.sliding && this.t.start != -1 && !this.onlyOne) {
                    this.$emit('scrollStatus', 'moving')
                    this.clearTimeOut()
                    this.t.distance = x.touches[x.touches.length - 1].clientX - this.t.start
                    this.setTransform(this.t.distance + this.t.sx)
                }
            },
            e(x) {
                if (this.sliding && this.t.start != -1 && !this.onlyOne) {
                    this.$emit('scrollStatus', 'end')
                    this.clearTimeOut()
                    this.setTransform(this.t.distance + this.t.sx)
                    let x = this.left()
                    x += this.t.distance > 0 ? this._width * 0.5 - this.threshold : this._width * -0.5 + this.threshold
                    this.index = Math.round(x / this._width) * -1
                    this.wh('touch')
                }
            },
            setTransform(num) {
                this.dom.transform = `translate3d(${num}px, 0px, 0px)`
                this.dom['-webkit-transform'] = `translate3d(${num}px, 0px, 0px)`
                this.dom['-ms-transform'] = `translate3d(${num}px, 0px, 0px)`
            },

            left() {
                return this.slider.getBoundingClientRect().left;
            },
            /*阻止容器的上下滚动*/
            fn(e) {
                e.preventDefault()
            },
            slideTo(index) {
                this.clearTimeOut()
                this.index = index + 1
                this.wh()
            },
            wh(type) {
                this.sliding = false
                this.dom.transition = type == 'touch' ? '250ms' : this.duration + 'ms'
                this.setTransform(this.index * -1 * this._width)
                this.t.distance = 0
                this.t.start = -1 
                if (this.autoPlay) {
                    this.setTime()
                }
                var timeDuration = type == 'touch' ? '250' : this.duration
                setTimeout(() => {
                    this.dom.transition = '0s'
                    if (this.index >= this.slidesLength + 1) { //滑到最右边的情况
                        this.index = 1
                        this.setTransform(this.index * -1 * this._width)
                    }
                    if (this.index <= 0) { //滑到最左边的情况
                        this.index = this.slidesLength
                        this.setTransform(this.index * -1 * this._width)
                    }
                    this.$emit('transitionend', this.index - 1)
                    this.auto = true
                    this.sliding = true
                }, timeDuration)
            },
            setTime() {
                this.timer1 = window.setTimeout(() => {
                    if (this.auto) {
                        this.index++
                        this.wh()
                    }else{
                        window.clearTimeout(this.timer1)
                    }
                }, this.interval)
            },
            clearTimeOut() {
                this.auto = false
                window.clearTimeout(this.timer1)
            }
        }
    }
</script>

<style scoped lang="scss">
.content {
    position: relative;
    z-index: 1;
    overflow: hidden;
    width: 100%;
}

.swiper {
    width: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -moz-transition-duration: 0s linear;
    -webkit-transition-duration: 0s linear;
    -o-transition-duration: 0s linear;
    transition-duration: 0s linear;
}

.indicator {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    background: 0 0;
}

.indicator_item {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 1px 7px;
    cursor: pointer;
    border-radius: 100%;
    background: #999;
    opacity: 0.4
}

.show_bgcolor {
    background: #f95d5b;
    opacity: 1
}
</style>
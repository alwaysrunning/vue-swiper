## usage  

Installation  
``` js  
npm install mk-vue-swiper --save 
```  
``` js  
import Swiper from 'mk-vue-swiper'
Vue.use(Swiper); 
```
 在模板中引入，异步获取 slide 的时候,需要在 swiper 上面添加 v-if 
``` html
<mk-swiper ref="swiper" v-if="list.length>0" class="swiper">
	<mk-slide v-for="(item,index) in list" :key=index>
		<img :src="item.img" />
	</mk-slide>
</mk-swiper>
```  

在swiper上面暴露了一些配置选项: 
``` js  
duration:	一次滑动的时间 | default: 500ms
interval:	两次滑动间隔时间 | default: 2500ms
autoplay:	是否自动播放 | default: true
threshold:	用户滑动多少距离之后自动翻页 | default: 30
showIndicator:	是否显示 | default: true
``` 

### Demo  
html  
  
``` html  
<mk-swiper class="swiper" ref="swiper" v-if="list.length>0" @transitionend="getCurrrentSilder" @scrollStatus="getScrollStatus" :interval="5000" :autoPlay="true" :threshold="10" :showIndicator="true">
	<mk-slide v-for="(item,index) in list" :key=index>
		<img :src="item.imgSrc" />
	</mk-slide>
</mk-swiper>
```  

js  
  
``` js  
import Swiper from 'mk-vue-swiper'
Vue.use(Swiper); 
```
  
### 如何设置轮播图的高度  
``` html
<mk-swiper class="swiper"></mk-swiper>
.swiper {
    height: 200px;
}
``` 

### Methods  
``` js
//跳转到索引为 2 的 slide
this.$refs.swiper.slideTo(2)
``` 

### Event  
``` html
//在 slide 上面监听 click 事件
<mk-swiper @scrollStatus="getScrollStatus" @scrollStatus="getScrollStatus">
    <mk-slide @click="fn"></mk-slide>
</mk-swiper>
```

``` js
function getScrollStatus(status){
	// status = 'start' 滑动开始
	// status = 'moving' 滑动中
	// status = 'end' 滑动结束
}

function getCurrrentSilder(slide){
	// slide 获取当前slide
}

function fn(){
	// 点击滑块触发
}
```  

### Slot  
``` html
<mk-swiper>
    <div slot="showIndicator"></div>
</mk-swiper>
``` 
### Contributor

yanghaitao
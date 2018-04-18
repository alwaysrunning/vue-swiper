## usage  

Installation  
``` js  
npm install mk-vue-swiper --save 
```  
``` js  
import swiper from 'mk-vue-swiper'
Vue.use(swiper); 
```
 在模板中引入，异步获取 slide 的时候,需要在 swiper 上面添加 v-if 
``` js
<swiper ref="swiper" v-if="list.length>0">
	<slide v-for="(item,index) in list" :key=index>
		<img :src="item.img" />
	</slide>
</swiper>
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
<swiper class="swiper" ref="swiper" v-if="list.length>0" @transitionend="getCurrrentSilder" :interval="5000" :autoPlay="true" :threshold="10" :showIndicator="true">
	<slide v-for="(item,index) in list" :key=index>
		<img :src="item.imgSrc" />
	</slide>
</swiper>
```  

js  
  
``` js  
import swiper from 'mk-vue-swiper'
Vue.use(swiper); 
```
  
### 如何设置轮播图的高度  
``` html
<swiper class="swiper"></wc-swiper>
.swiper {
    height: 200px;
}
``` 

### Methods  
``` js
//跳转到索引为 2 的 slide
this.$refs.swiper.slideTo(2)
//获取当前slide
getCurrrentSilder(current)
``` 

### Event  
``` html
//在 slide 上面监听 click 事件
<swiper>
    <slide @click="fn"></wc-slide>
</swiper>
``` 

### Slot  
``` html
<swiper>
    <div slot="showIndicator"></div>
</swiper>
``` 
### Contributor

yanghaitao 
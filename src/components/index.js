import swiper from './swiper.vue';
import slide from './slide.vue';

export default {
	install (Vue) {
		Vue.component(swiper.name, swiper);
		Vue.component(slide.name, slide);
	}
}

export {
	swiper,
	slide
}
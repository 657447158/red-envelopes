<template>
	<div id="app">
		<router-view></router-view>
		<Footer v-if="showFooter"/>
	</div>
</template>

<script>
import Footer from './pages/common/footer';
const INDEX = 'index';
const PERSONAL ='personal-index';
export default {
    components: {
		Footer
    },
    data () {
		return {
			showFooter: true
		}
    },
    watch:{
		$route(to){   
			if(to.name === INDEX || to.name === PERSONAL){
				this.showFooter = true;
			} else {
				this.showFooter = false;
			}
		}
	}
}
</script>

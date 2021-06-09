<template>
	<v-app id="neo">
		<Nav/>
		
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
import Nav from './views/Nav.vue'


export default {
	name: 'App',
	
	components: {
	    Nav,
	},
	
	data: () => ({
	}),
};
</script>

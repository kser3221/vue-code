<template>
	<div class="log">
		<v-tabs v-model="tab"
		fixed-tabs
		>
			<v-tab
			v-for="item in items"
			:key="item.tab"
			>
				{{ item.text }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab" class="tab-item">
			<v-tab-item
			v-for="item in items"
			:key="item.tab"
			>
				<v-card flat>
					<keep-alive>
						<component v-bind:is="item.content"></component>
					</keep-alive>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
		<!--div>
			<router-view/>
		</div-->
	</div>
</template>

<script>
import Box from '@/views/log/Log-box.vue'
import RawData from '@/views/log/Log-rawdata.vue'

export default {
	name: 'Log',
  	components: {
		Box,
		RawData,
  	},
	data() {
		return {
			tab: null,
			items: [
			  { tab: 1, text: '장비로그', content: 'Box' },
			  { tab: 2, text: 'RAWDATA 설정', content: 'RawData' },
			],
		}
	}
}
</script>

<style scoped>
.log .tab-item {
	padding: 20px;
}
</style>

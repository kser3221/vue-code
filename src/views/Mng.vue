<template>
	<div class="mng">
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
	</div>
</template>

<script>
// @ is an alias to /src
import User from '@/views/mng/Mng-user.vue'
import Isp from '@/views/mng/Mng-isp.vue'
import Report from '@/views/mng/Mng-report.vue'

export default {
	name: 'MngSet',
	
	components: {
		User,
		Isp,
		Report,
	},
	
	data: () => ({
		tab: null,
        items: [
          { tab: 1, text: '관리자 설정', content: 'User' },
          { tab: 2, text: 'ISP 설정', content: 'Isp' },
          { tab: 3, text: '레포트 설정', content: 'Report' },
        ],
	}),
	methods: {
	}
};
</script>

<style scoped>
.mng .tab-item {
	padding: 20px;
}
</style>

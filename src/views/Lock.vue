<template>
	<div class="lock">
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
// @ is an alias to /src
import User from '@/views/lock/Lock-user.vue'
import Dormant from '@/views/lock/Lock-dormant.vue'

export default {
	name: 'Lock',
	
	components: {
		User,
		Dormant,
	},
	
	data: () => ({
		tab: null,
        items: [
          { tab: 1, text: '잠김계정관리자', content: 'User' },
          { tab: 2, text: '휴면계정관리자', content: 'Dormant' },
        ],
	}),
	methods: {
	}
};
</script>

<style scoped>
.lock .tab-item {
	padding: 20px;
}
</style>

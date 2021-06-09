<template>
	<div class="log-rawdata">
		<v-card class="mb-5">
			<v-container>
			<v-row>
				<v-col cols="12" sm="3" md="3">
					<v-select
					:items="opt_monit"
					class="pa-2"
					v-model="sel_monit"
					label="모니터 주기 설정"
					></v-select>
				</v-col>
				<v-col cols="12" sm="3" md="3">
					<v-btn
					  color="success"
					  dark
					  outlined
					  class="mb-2 mt-2"
					  @click="saveClick"
					>
					설 정
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="3" md="3">
					<v-select
					:items="date_list"
					class="pa-2"
					v-model="sdate"
					label="보유기간"
					:disabled="date_set ? true : false"
					></v-select>
				</v-col>
				<v-col cols="12" sm="2" md="2">
					<v-checkbox
					v-model="date_set"
					label="설정 안함"
					color="orange"
					></v-checkbox>
				</v-col>

				<v-col cols="12" sm="2" md="2">
					<v-text-field v-model="limit" label="용량 임계치 설정" :disabled="limit_set ? true : false"></v-text-field>
				</v-col>
				<v-col cols="12" sm="2" md="2">
					<v-select
					:items="opt_unit"
					class="pa-2"
					v-model="sel_unit"
					></v-select>
				</v-col>
				<v-col cols="12" sm="2" md="2">
					<v-checkbox
					v-model="limit_set"
					label="설정 안함"
					color="orange"
					></v-checkbox>
				</v-col>
			</v-row>
			</v-container>
		</v-card>


		<ViewTable
		:fields="fields"
		:items="items"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import ViewTable from '@/components/ViewTable.vue'

export default {
	name: 'LogRawdata',
  	components: {
		ViewTable,
	},
	data() {
		return {
			sdate: '',
			date_set: true,
			limit: '',
			limit_set: true,

			date_list: [
				'2020-01-23',
			],

			sel_unit: 'KB',
			opt_unit: [
				{ text: 'KB', value: 'KB' },
				{ text: 'MB', value: 'MB' },
				{ text: 'GB', value: 'GB' },
				{ text: 'TB', value: 'TB' },
			],

			sel_monit: '10',
			opt_monit: [
				{ text: '10 분', value: '10' },
				{ text: '30 분', value: '30' },
				{ text: '1 시간', value: '1' },
				{ text: '6 시간', value: '6' },
				{ text: '12 시간', value: '12' },
			],

			fields: [
				{ value: 'path', text: '저장장소', sortable: true },
				{ value: 'content', text: '내용', sortable: true },
			],
			items: [
				{ id: 1, path: 'Dickerson', content: 'Macdonald' },
				{ id: 2, path: 'Larsen', content: 'Shaw' },
				{ id: 3, path: 'Geneva', content: 'Wilson' },
				{ id: 4, path: 'Dickerson', content: 'Macdonald' },
				{ id: 5, path: 'Larsen', content: 'Shaw' },
				{ id: 6, path: 'Geneva', content: 'Wilson' },
				{ id: 7, path: 'Dickerson', content: 'Macdonald' },
				{ id: 8, path: 'Larsen', content: 'Shaw' },
				{ id: 9, path: 'Geneva', content: 'Wilson' },
				{ id: 10, path: 'Dickerson', content: 'Macdonald' },
				{ id: 11, path: 'Larsen', content: 'Shaw' },
				{ id: 12, path: 'Geneva', content: 'Wilson' },
				{ id: 13, path: 'Dickerson', content: 'Macdonald' },
				{ id: 14, path: 'Larsen', content: 'Shaw' },
				{ id: 15, path: 'Geneva', content: 'Wilson' },
				{ id: 16, path: 'Dickerson', content: 'Macdonald' },
				{ id: 17, path: 'Larsen', content: 'Shaw' },
				{ id: 18, path: 'Geneva', content: 'Wilson' },
				{ id: 19, path: 'Dickerson', content: 'Macdonald' },
				{ id: 20, path: 'Larsen', content: 'Shaw' },
				{ id: 21, path: 'Geneva', content: 'Wilson' },
				{ id: 22, path: 'Dickerson', content: 'Macdonald' },
				{ id: 23, path: 'Larsen', content: 'Shaw' },
				{ id: 24, path: 'Geneva', content: 'Wilson' },
				{ id: 25, path: 'Dickerson', content: 'Macdonald' },
				{ id: 26, path: 'Larsen', content: 'Shaw' },
				{ id: 27, path: 'Geneva', content: 'Wilson' },
				{ id: 28, path: 'Dickerson', content: 'Macdonald' },
				{ id: 29, path: 'Larsen', content: 'Shaw' },
				{ id: 30, path: 'Geneva', content: 'Wilson' },
				{ id: 31, path: 'Dickerson', content: 'Macdonald' },
				{ id: 32, path: 'Larsen', content: 'Shaw' },
				{ id: 33, path: 'Geneva', content: 'Wilson' },
				{ id: 34, path: 'Dickerson', content: 'Macdonald' },
				{ id: 35, path: 'Larsen', content: 'Shaw' },
				{ id: 36, path: 'Geneva', content: 'Wilson' },
			],
		}
	},
	methods: {
		saveClick() {
			console.log(this.sdate);
			console.log(this.date_set);
			console.log(this.limit);
			console.log(this.sel_unit);
			console.log(this.limit_set);
			console.log(this.sel_monit);
		}
	}
}
</script>

<style scoped>
input {
	width: 200px;
	margin-right: 10px;
	display: inline-block;
}
select {
	width: 200px;
	vertical-align: inherit;
}
.custom-checkbox {
	margin-left: 30px;
	display: inline-block;
}
</style>

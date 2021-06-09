<template>
	<div class="lock">
		<v-toolbar flat color="white">
			<v-toolbar-title>검색결과: 총 {{ items.length }} 개</v-toolbar-title>

			<v-divider
			  class="mx-4"
			  inset
			  vertical
			></v-divider>

			<v-spacer></v-spacer>

			<v-btn
			  color="primary"
			  dark
			  class="mb-2"
			  @click="clearClick"
			>초기화</v-btn>
		</v-toolbar>

		<DataTable 
		:fields="fields"
		:items="items"
		selectMode
		@selectRow="selRow"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

export default {
	name: 'Lock',
	
	components: {
		DataTable,
	},
	
	data: () => ({
		fields: [
			{ value: 'selected', text: '선택' },
			{ value: 'gname', text: 'ID', sortable: true },
			{ value: 'pname', text: '암호만기일', sortable: true },
			{ value: 'weekly', text: '관리자 역할', sortable: true },
			{ value: 'monthly', text: '연속된 로그인 실패 횟수', sortable: true },
			{ value: 'sdate', text: '최근 잠김 시간', sortable: true },
		],
		items: [
			{ id: 1, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 2, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 3, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 4, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 5, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 6, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 7, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 8, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 9, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 10, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 11, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 12, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 13, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 14, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 15, weekly: 'X', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 16, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 17, weekly: 'X', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 18, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 19, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 20, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 21, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 22, weekly: 'X', monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 23, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 24, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 25, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 26, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 27, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 28, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 29, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 30, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 31, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 32, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 33, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			{ id: 34, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
			{ id: 35, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
			{ id: 36, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
		],

		selected: [],
	}),
	methods: {
		clearClick() {
			var list = [...this.items];
			var sel = this.selected;
			for(var skey in sel) {
				for(var key in list) {
					if(list[key].id == sel[skey].id) {
						list.splice(key, 1);

						break;
					}
				}
			}
			this.items = list;
		},

		selRow(item) {
			this.selected = item;
		},
	},
};
</script>

<style scoped>
</style>

<template>
	<div class="filter-table">
		<v-card>
			<v-tabs
			  color="basil"
			>
				<v-tab @click="tabFilter(1)">전체</v-tab>
				<v-tab @click="tabFilter(2)">성공</v-tab>
				<v-tab @click="tabFilter(3)">실패</v-tab>
			</v-tabs>
			<v-data-table
			  dense
			  :headers="fields"
			  :items="rows"
			  class="elevation-1"
			  :footer-props="listSize"
			>
				<template v-slot:no-data>
					No Data
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'FilterTable',
  	props: {
		fields: Array,
		items: Array,
	},
	data: () => ({
		rows: [],
		listSize: {'items-per-page-options': [10, 20, 30, 50, 100]},
	}),
	
	computed: {
		formTitle () {
		  return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
		},
	},
	
	methods: {
		tabFilter: function(idx) {
			if(idx == 1) {
				this.rows = this.items;
			} else if(idx == 2) {
				var item = this.items.filter(d => {
					return (d.status == 3)
				});
				this.rows = item;
			} else if(idx == 3) {
				var item = this.items.filter(d => {
					return (d.status == 4)
				});
				this.rows = item;
			}
		}
	},

	mounted() {
		this.tabFilter(1);
	}
}
</script>

<template>
	<v-data-table
	  dense
	  v-model="selected_row"
	  :headers="fields"
	  :items="items"
	  class="elevation-1"
	  :footer-props="listSize"
	  :show-select="selectMode"
	  :single-select="false"
	  @click:row="openPop"
	>
		<template v-slot:no-data>
			No Data
		</template>
	</v-data-table>
</template>

<script>
export default {
	name: 'DataTable',
  	props: {
		fields: Array,
		items: Array,
		selectMode: Boolean,
	},
	data: () => ({
		singleSelect: false,
		selected_row: [],
		listSize: {'items-per-page-options': [10, 20, 30, 50, 100]},
	}),
	
	create: function() {
		this.selected_row = [];
	},
	
	watch: {
		selected_row(val) {
			this.$emit("selectRow", val);
		}
	},
	
	methods: {
		openPop(val) {
			this.$emit("openPop", val);
		},
	},
}
</script>

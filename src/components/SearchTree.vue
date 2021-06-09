<template>
	<v-row justify="center">
		<v-dialog
		  v-model="dialog"
		  scrollable
		  max-width="620px"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
				  color="primary"
				  dark
				  outlined
				  class="mb-2 ml-2"
				  v-bind="attrs"
				  v-on="on"
				>
					<v-icon dark>
					  mdi-card-search-outline
					</v-icon>
				</v-btn>
			</template>
			<v-card class="popup">
				<v-card-title>트리검색</v-card-title>
				<v-divider></v-divider>
				<v-card-text style="height: 480px;">
					<v-radio-group
					  v-model="stype"
					  row
					  @change="radioClick"
					>
						<v-radio
						  label="노드검색"
						  value="0"
						></v-radio>
						<v-radio
						  label="장비검색"
						  value="1"
						></v-radio>
					</v-radio-group>
					<v-row>
						<v-col cols="12" sm="8" md="8">
						<v-text-field
						  v-model="search_value"
						  :label="setPlaceholder()"
						></v-text-field>
						</v-col>

						<v-col cols="12" sm="3" md="3">
						<v-btn
						  color="primary"
						  dark
						  outlined
						  class="ml-2 mt-3"
						>
							검 색
						</v-btn>
						</v-col>
					</v-row>

					<DataTable 
					:fields="fields"
					:items="items"
					@openPop="rowSelected"
					/>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn
					  color="blue darken-1"
					  text
					  @click="dialog = false"
					>
					  닫 기
					</v-btn>
					<v-btn
					  color="blue darken-1"
					  text
					  @click="dialog = false"
					>
					  적 용
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import EventBus from '@/EventBus.js'

export default {
	name: 'SearchTree',
	
	components: {
		DataTable,
	},
	data () {
		return {
			dialogm1: '',
			dialog: false,

			stype: "0",

			search_value: '',

			fields: [],
			bch_fields: [
				{ value: 'parent', text: "상위노드명", sortable: true },
				{ value: 'bname', text: "노드명", sortable: true },
			],
			box_fields: [
				{ value: 'parent', text: "지점명", sortable: true },
				{ value: 'bname', text: "장비명", sortable: true },
				{ value: 'ip', text: "IP", sortable: true },
			],

			bch_items: [
				{  id: 1, bname: "site", parent: "", slave: 0, pid: 0 },
				{  id: 2, bname: "grp", parent: "site", slave: 2, pid: 1 },
				{  id: 3, bname: "grp2", parent: "site", slave: 1, pid: 1 },
				{  id: 4, bname: "grp3", parent: "site", slave: 1, pid: 1 },
				{  id: 5, bname: "bch01", parent: "grp", slave: 4, pid: 2 },
			],                                                                                                
			box_items: [
				{  id: 1, bname: "box01", parent: "bch01", ip: "1.0.0.1" },
				{  id: 2, bname: "box02", parent: "bch01", ip: "2.0.0.2" },
				{  id: 3, bname: "box03", parent: "bch01", ip: "3.0.0.3" },
				{  id: 4, bname: "box04", parent: "bch01", ip: "4.0.0.4" },
			],                                                                                                
		}
	},

	methods: {
		radioClick: function(type) {
			if(type == "0") {
				this.fields = this.bch_fields;
				this.items = this.bch_items;
			} else {
				this.fields = this.box_fields;
				this.items = this.box_items;
			}
		},
		rowSelected: function(row) {
			EventBus.$emit('tree_click', row);
		},
		setPlaceholder: function() {
			return (this.stype == "0") ? "그룹명 or 지점명" : "장비명";
		}
	},
	
	created() {
		this.radioClick("0");

	}
}
</script>

<style scoped>
.popup {
	width: 620px;
}
</style>

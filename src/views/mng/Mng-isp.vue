<template>
	<div class="mng-isp">
		<v-toolbar flat color="white">
			<v-toolbar-title>검색결과: 총 {{ items.length }} 개</v-toolbar-title>

			<v-divider
			  class="mx-4"
			  inset
			  vertical
			></v-divider>

			<v-spacer></v-spacer>

			 <v-dialog
			   v-model="dialog"
			   scrollable
			   max-width="800px"
			 >
				 <template v-slot:activator="{ on, attrs }">
					 <v-btn
					   color="primary"
					   dark
					   @click="addClick"
					   v-bind="attrs"
					   v-on="on"
					 >
					 추 가
					 </v-btn>
				 </template>
				 <v-card>
					 <v-card-title>ISP 설정</v-card-title>
					 <v-divider></v-divider>
					 <v-card-text style="height: 300px;">
						<v-row class="mt-1">
							<v-col cols="12" sm="6" md="6">
								<v-text-field
								  label="ISP 이름"
								  :disabled="popup_status == 'view'"
								  v-model="isp_info.isp_name"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="6">
								<v-text-field
								  label="장애신고전화"
								  :disabled="popup_status == 'view'"
								  v-model="isp_info.tel"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row v-show="popup_status == 'view'">
							<v-col cols="12" sm="6" md="6">
								<v-select
								  v-show="sv_status == 'view'"
								  :items="isp_info.sv"
								  item-key="value"
								  class="pa-2"
								  label="서비스 상품명"
								  v-model="isp_info.sel_sv"
								></v-select>
								<v-text-field label="서비스 상품명" v-show="sv_status != 'view'" v-model="isp_info.isp_sv"></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="6" v-show="sv_status == 'view'">
								<v-btn
								  color="success"
								  dark
								  outlined
								  class="mt-3 mb-2 mr-2"
								  @click="sv_status = 'add'; isp_info.isp_sv = ''"
								>
								ISP 추가
								</v-btn>
								<v-btn
								  color="success"
								  dark
								  outlined
								  class="mt-3 mb-2 mr-2"
								  v-show="isp_info.sv && isp_info.sv.length"
								  @click="svEdit"
								>
								ISP 변경
								</v-btn>
								<v-btn
								  color="success"
								  dark
								  outlined
								  class="mt-3 mb-2 mr-2"
								  v-show="isp_info.sv && isp_info.sv.length"
								  @click="svDelete"
								>
								ISP 삭제
								</v-btn>
							</v-col>
							<v-col cols="12" sm="6" md="6" v-show="sv_status != 'view'">
								<v-btn
								  color="success"
								  dark
								  outlined
								  class="mt-3 mb-2 mr-2"
								  @click="svSaveClick"
								>
								ISP 적용
								</v-btn>
								<v-btn
								  color="success"
								  dark
								  outlined
								  class="mt-3 mb-2 mr-2"
								  @click="sv_status = 'view'"
								>
								ISP 취소
								</v-btn>
							</v-col>
						</v-row>
					 </v-card-text>
					 <v-divider></v-divider>
					 <v-card-actions>
						 <v-btn
						   color="blue darken-1"
						   text
						   @click="dialog = false"
						 >
							{{ (popup_status == 'view') ? '닫 기' : '취 소' }}
						 </v-btn>
						 <v-btn
						   color="blue darken-1"
						   text
						   v-show="popup_status == 'view'"
						   @click="popup_status = 'edit'"
						 >
						 Edit
						 </v-btn>
						 <v-btn
						   color="blue darken-1"
						   text
						   v-show="popup_status == 'view'"
						   @click="delClick"
						 >
						 Delete
						 </v-btn>
						 <v-btn
						   color="blue darken-1"
						   text
						   v-show="popup_status != 'view'"
						   @click="save"
						 >
						 적 용
						 </v-btn>
					 </v-card-actions>
				 </v-card>
			 </v-dialog>
		</v-toolbar>

		<DataTable 
		:fields="fields"
		:items="items"
		@openPop="popOpen"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

export default {
	name: 'MngIsp',
	components: {
		DataTable,
	},
	data() {
		return {
			dialog: false,

			fields: [
				{ value: 'isp_name', text: 'ISP', sortable: true },
			],
			items: [
				{  id: 1, tel: '01', isp_name: 'Dickerson', sv: [ { text: 'aaa_1', value: 1}, { text: 'aaa_2', value: 2}, { text: 'aaa_3', value: 3}, ] },
				{  id: 2, tel: '02', isp_name: 'Larsen' },
				{  id: 3, tel: '03', isp_name: 'Geneva' },
				{  id: 4, tel: '04', isp_name: 'Dickerson' },
				{  id: 5, tel: '05', isp_name: 'Larsen' },
				{  id: 6, tel: '06', isp_name: 'Geneva' },
				{  id: 7, tel: '07', isp_name: 'Dickerson' },
				{  id: 8, tel: '08', isp_name: 'Larsen' },
				{  id: 9, tel: '09', isp_name: 'Geneva' },
				{ id: 10, tel: '10', isp_name: 'Dickerson' },
				{ id: 11, tel: '11', isp_name: 'Larsen' },
				{ id: 12, tel: '12', isp_name: 'Geneva' },
				{ id: 13, tel: '13', isp_name: 'Dickerson' },
				{ id: 14, tel: '14', isp_name: 'Larsen' },
				{ id: 15, tel: '15', isp_name: 'Geneva' },
				{ id: 16, tel: '16', isp_name: 'Dickerson' },
				{ id: 17, tel: '17', isp_name: 'Larsen' },
				{ id: 18, tel: '18', isp_name: 'Geneva' },
				{ id: 19, tel: '19', isp_name: 'Dickerson' },
				{ id: 20, tel: '20', isp_name: 'Larsen' },
				{ id: 21, tel: '21', isp_name: 'Geneva' },
				{ id: 22, tel: '22', isp_name: 'Dickerson' },
				{ id: 23, tel: '23', isp_name: 'Larsen' },
				{ id: 24, tel: '24', isp_name: 'Geneva' },
				{ id: 25, tel: '25', isp_name: 'Dickerson' },
				{ id: 26, tel: '26', isp_name: 'Larsen' },
				{ id: 27, tel: '27', isp_name: 'Geneva' },
				{ id: 28, tel: '28', isp_name: 'Dickerson' },
				{ id: 29, tel: '29', isp_name: 'Larsen' },
				{ id: 30, tel: '30', isp_name: 'Geneva' },
				{ id: 31, tel: '31', isp_name: 'Dickerson' },
				{ id: 32, tel: '32', isp_name: 'Larsen' },
				{ id: 33, tel: '33', isp_name: 'Geneva' },
				{ id: 34, tel: '34', isp_name: 'Dickerson' },
				{ id: 35, tel: '35', isp_name: 'Larsen' },
				{ id: 36, tel: '36', isp_name: 'Geneva' },
			],

			popup_status: 'view',

			isp_info: {
				id: '',
				isp_name: '',
				tel: '',
				sel_sv: '',
				sv: [],
				isp_sv: '',
			},

			sv_status: 'view',
		}
	},
	methods: {
		popOpen(item) {
			this.isp_info = {
				id: item.id,
				isp_name: item.isp_name,
				tel: item.tel,
				sel_sv: (item.sv && item.sv.length) ? item.sv[0].value : '',
				sv: item.sv ? item.sv : [],
				isp_sv: '',
			};
			this.popup_status = "view";
			this.dialog = true;
		},
		addClick() {
			this.popup_status = "add";
			this.isp_info = {
				id: '',
				isp_name: '',
				tel: '',
				sel_sv: '',
				sv: [],
				isp_sv: '',
			};
		},
		delClick() {
			var id = this.isp_info.id;
			var ind = this.items.findIndex(function(d) {
						return d.id == id
					});
			if(ind != -1) {
				this.items.splice(ind, 1);
			}
			this.dialog = false;
		},
		save () {
			if(this.popup_status == "add") {
				var len = this.items.length;
				var max = this.items[len - 1].id;
				this.items.push(this.isp_info);
			} else {
				var id = this.isp_info.id;
				var ind = this.items.findIndex(function(d) {
							return d.id == id
						});
				if(ind != -1) {
					this.items[ind].isp_name = this.isp_info.isp_name;
					this.items[ind].tel = this.isp_info.tel;
				}
			}

			this.dialog = false;
		},
		svEdit() {
			this.sv_status = 'edit';

			for(var key in this.isp_info.sv) {
				if(this.isp_info.sv[key].value == this.isp_info.sel_sv) {
					this.isp_info.isp_sv = this.isp_info.sv[key].text;
					break;
				}
			}
		},
		svDelete() {
			var sel = this.isp_info.sel_sv;
			var ind = this.isp_info.sv.findIndex(function(d) {
						return d.value == sel
					});
			this.isp_info.sv.splice(ind, 1);
			this.isp_info.sel_sv = this.isp_info.sv.length ? this.isp_info.sv[0].value : '';
		},
		svSaveClick() {
			if(this.sv_status == "add") {
				var len = this.isp_info.sv.length;
				var max = len ? this.isp_info.sv[len - 1].value : len;
				this.isp_info.sv.push({
					text: this.isp_info.isp_sv,
					value: max + 1
				});

				this.isp_info.sel_sv = this.isp_info.sv[0].value;
			} else {
				this.sv_status = "edit";
				var val = this.isp_info.sel_sv;
				var ind = this.isp_info.sv.findIndex(function(d) {
							return d.value == val
						});
				if(ind != -1) {
					this.isp_info.sv[ind].text = this.isp_info.isp_sv;
				}
			}

			this.sv_status = 'view';
		},
	},
}
</script>

<style scoped>
</style>

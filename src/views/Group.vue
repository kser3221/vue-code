<template>
	<div class="grp">
		<SearchDiv
			:searchOption="search_opt"
			:searchType="search_type"
			:searchValue="search_val"
			@searchE="searchClick"
		/>

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
			  @click="addClick"
			>추 가</v-btn>
		</v-toolbar>

		<DataTable 
		:fields="fields"
		:items="datas"
		@openPop="popOpen"
		/>

		<div v-show="dialog" class="overlay" @click="dialog = !dialog"></div>
		<v-row
		  align="center"
		  justify="center"
		>
		<v-card v-show="dialog" max-width="600px" class="popup">
			<v-card-title>
				<span class="headline">그룹 설정</span>
			</v-card-title>

			<v-card-text>
			  <v-container>
				<v-row>
				  <v-col cols="12" sm="6" md="6">
					<v-text-field v-model="grp_info.gname" label="그룹명"
					:disabled="popup_status == 'view'"
					></v-text-field>
				  </v-col>
				  <v-col cols="12" sm="6" md="6">
					<v-text-field v-model="grp_info.pname" label="상위그룹명"
					:disabled="popup_status == 'view'"
					></v-text-field>
				  </v-col>
				</v-row>
				<v-row v-show="popup_status == 'view'">
				  <v-col cols="12" sm="10" md="10">
					<v-text-field v-model="grp_info.unum" label="고유번호"
					disabled
					></v-text-field>
				  </v-col>
				</v-row>
				<v-row v-show="popup_status == 'view'">
				  <v-col cols="12" sm="10" md="10">
					<v-text-field v-model="grp_info.bname" label="등록된 장비명"
					disabled
					></v-text-field>
				  </v-col>
				</v-row>
				<v-row v-show="popup_status == 'view'">
				  <v-col cols="12" sm="10" md="10">
					<v-text-field v-model="grp_info.sdate" label="등록일"
					disabled
					></v-text-field>
				  </v-col>
				</v-row>
				<v-row>
				  <v-col cols="12" sm="6" md="6">
					<v-checkbox
					v-model="grp_info.report_weekly"
					label="주간 레포트 생성"
					color="orange"
					:disabled="popup_status == 'view'"
					></v-checkbox>
				  </v-col>
				  <v-col cols="12" sm="6" md="6">
					<v-checkbox
					v-model="grp_info.report_monthly"
					label="월간 레포트 생성"
					color="orange"
					:disabled="popup_status == 'view'"
					></v-checkbox>
				  </v-col>
				</v-row>
			  </v-container>
			</v-card-text>

			<v-card-actions>
			  <v-spacer></v-spacer>
			  <v-btn color="blue darken-1" text @click="dialog = !dialog">닫 기</v-btn>
			  <v-btn color="blue darken-1" text @click="delClick" v-show="popup_status == 'view'">삭 제</v-btn>
			  <v-btn color="blue darken-1" text @click="popup_status = 'edit'" v-show="popup_status == 'view'">변 경</v-btn>
			  <v-btn color="blue darken-1" text @click="save" v-show="popup_status != 'view'">적 용</v-btn>
			</v-card-actions>
		</v-card>
		</v-row>
	</div>
</template>

<script>
// @ is an alias to /src
import SearchDiv from '@/components/SearchDiv.vue'
import DataTable from '@/components/DataTable.vue'
import EventBus from '@/EventBus.js'
import treeFile from '@/vdata/tree.txt'

export default {
	name: 'Group',
	
	components: {
		SearchDiv,
		DataTable,
	},
	
	data: () => ({
		dialog: false,
		search_opt: [
			{ type: 1, label: "그룹명" },
			{ type: 2, label: "상위그룹명" },
		],
		search_type: {},
		search_val: '',

		fields: [
			{ value: 'gname', text: '그룹명', sortable: true },
			{ value: 'pname', text: '상위그룹명', sortable: true },
			{ value: 'weekly', text: '주간 레포트 생성', sortable: true },
			{ value: 'monthly', text: '월간 레포트 생성', sortable: true },
			{ value: 'sdate', text: '등록일시', sortable: true },
		],
		datas: [],
		tmp_datas: [],
		items: [],

		popup_status: 'view',
		opt_report: [
			{ text: '주간 레포트', value: 'weekly' },
			{ text: '월간 레포트', value: 'monthly' },
		],

		defaultItem: {
			id: '',
			gname: '',
			pname: '',
			bname: '',
			unum: '',
			sdate: '',
			report_weekly: false,
			report_monthly: false,
		},

		grp_info: {
			id: '',
			gname: '',
			pname: '',
			bname: '',
			unum: '',
			sdate: '',
			report_weekly: false,
			report_monthly: false,
		},

		editedIndex: -1,
	}),
	methods: {
		getTree: function(cont) {
			console.log(cont);
			var tmp = cont.split('\n');
			console.log(tmp);

			var grp = [];
			var new_tree = [];
			for(var k in tmp) {
				var obj = {};
				grp = tmp[k].split(' ');
				if(!grp[0] || grp[0] == '#id' || !parseInt(grp[2]) || parseInt(grp[2]) == 4) {
					continue;
				}
				obj.id = parseInt(grp[0]);
				obj.gname = grp[1];
				obj.slave = parseInt(grp[2]);
				obj.pid = parseInt(grp[3]);
				obj.pname = grp[4];
				obj.sdate = grp[5];
				obj.weekly = parseInt(grp[6]) ? 'O' : 'X';
				obj.monthly = parseInt(grp[7]) ? 'O' : 'X';
				obj.week = parseInt(grp[6]);
				obj.month = parseInt(grp[7]);

				console.log(obj);
				new_tree.push(obj);
			}
			console.log(new_tree);
			this.datas = new_tree;
		},
		searchClick: function(type, val) {
			if(val.length) {
				this.datas = this.tmp_datas;
				var item = this.datas.filter(d => {
					if(type == 1) {
						return (d.gname.trim().toUpperCase().indexOf(val.trim().toUpperCase()) != -1)
					} else if(type == 2) {
						return (d.pname.trim().toUpperCase().indexOf(val.trim().toUpperCase()) != -1)
					}
				});
				this.datas = item;
			} else {
				this.datas = this.tmp_datas;
			}
		},
		popOpen(item) {
			this.popup_status = "view";
			this.grp_info = {
				id: item.id,
				gname: item.gname,
				pname: item.pname,
				bname: item.bname,
				pid: item.pid,
				unum: '00000' + item.id,
				sdate: item.sdate,
				report_weekly: (item.weekly == 'O') ? true : false,
				report_monthly: (item.monthly == 'O') ? true : false,
			};

			var id = this.grp_info.id;
			var ind = this.datas.findIndex(function(d) {
						return d.id == id
					});

			this.editedIndex = ind;
			this.dialog = true;
		},
		addClick: function() {
			this.popup_status = "add";

			this.grp_info = {
				id: '',
				gname: '',
				pname: '',
				bname: '',
				unum: '',
				sdate: '',
				report_weekly: false,
				report_monthly: false,
			};
			this.dialog = true;
		},
		delClick() {
			var list = [...this.datas];
			var id = this.grp_info.id;

			EventBus.$emit('tree_update', 'delete', this.grp_info);

			for(var key in list) {
				if(list[key].id == id) {
					list.splice(key, 1);

					break;
				}
			}
			this.datas = list;

			this.dialog = false;
		},
		save() {
			var week = this.grp_info.report_weekly;
			var month = this.grp_info.report_monthly;

			this.grp_info.report_weekly = week ? 'O' : 'X';
			this.grp_info.report_monthly = month ? 'O' : 'X';

			if(this.popup_status == "add") {
				var len = this.tmp_datas.length;
				var id = this.tmp_datas[len - 1].id + 1;

				var obj = {
					id: id,
					gname: this.grp_info.gname,
					pname: this.grp_info.pname,
					sdate: new Date().toISOString().substr(0, 10),
					weekly: this.grp_info.report_weekly,
					monthly: this.grp_info.report_monthly,
				};

				this.tmp_datas.push(obj);
			} else {
				Object.assign(this.tmp_datas[this.editedIndex], this.grp_info)
				this.tmp_datas[this.editedIndex].gname = this.grp_info.gname;
				this.tmp_datas[this.editedIndex].pname = this.grp_info.pname;
				this.tmp_datas[this.editedIndex].sdate = this.grp_info.sdate;
				this.tmp_datas[this.editedIndex].weekly = this.grp_info.report_weekly;
				this.tmp_datas[this.editedIndex].monthly = this.grp_info.report_monthly;
			}

			this.datas = this.tmp_datas;

			this.search_type = this.search_opt[0];
			this.search_val = '';

			EventBus.$emit('tree_update', this.popup_status, this.grp_info);

			this.dialog = false;
		},
	},

	created() {
		this.search_type = this.search_opt[0];

		this.datas = this.items;
		this.tmp_datas = this.items;

		this.getTree(treeFile);

		EventBus.$on('tree_click', val => {
			if(val != undefined) {
				this.grp_info.pname = val.bname;
				this.grp_info.pid = val.id;
			}
		});
	}
};
</script>

<style scoped>
.grp {
	padding: 20px;
}
.popup {
	margin-top: -40%;
}
.overlay {
	opacity: 0.46;
    background-color: rgb(33, 33, 33);
    border-color: rgb(33, 33, 33);
	width: 100%;
	height: 100%;
    position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>

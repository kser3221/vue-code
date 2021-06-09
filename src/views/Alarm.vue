<template>
	<div class="alm">
		<v-card
		  class="mx-auto search-set"
		  max-width="90%"
		>
			<v-card-actions>
				<v-btn
				  color="orange lighten-2"
				  text
				  @click="show = !show"
				>
				  검색조건
				</v-btn>
				
				<v-spacer></v-spacer>
				
				<v-btn
				  icon
				  @click="show = !show"
				>
					<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
				</v-btn>
			</v-card-actions>
			
			<v-expand-transition>
				<div v-show="show">
					<v-divider></v-divider>
			
					<v-card-text>
						<v-container fluid>
							<v-row>
								<v-col cols="12" sm="12" md="12">
									<label>{{ sel_tree }}</label>

									<SearchTree
									  class="search-tree ml-2"
									/>
								</v-col>
							</v-row>

							<v-row>
								<v-checkbox
								  label="장애별검색"
								  color="red"
								  v-model="chk_err"
								  hide-details
								></v-checkbox>
							</v-row>
							<v-row>
								<v-col
								  cols="12"
								  sm="2"
								  md="2"
								  v-show="chk_err"
								  v-for="(err_col, index) in err"
								  :key="index"
								>
									<v-checkbox
									  v-model="err_col.value"
									  :label="err_col.text"
									  color="orange"
									  hide-details
									></v-checkbox>
								</v-col>
							</v-row>

							<v-row>
								<v-checkbox
								  label="코드별검색"
								  color="red"
								  v-model="chk_code"
								  hide-details
								></v-checkbox>
							</v-row>
							<v-row>
								<v-col
								  cols="12"
								  sm="2"
								  md="2"
								  v-show="chk_code"
								  v-for="(code_col, index) in code"
								  :key="index"
								>
									<v-checkbox
									  v-for="c in code_col"
									  :key="c.text"
									  v-model="c.value"
									  :label="c.text"
									  color="indigo"
									  hide-details
									></v-checkbox>
								</v-col>
							</v-row>

							<v-row>
								<v-checkbox
								  label="날짜별검색"
								  color="red"
								  v-model="chk_date"
								  hide-details
								></v-checkbox>
							</v-row>
							<v-row>
								<v-col
								  cols="12"
								  sm="4"
								  md="4"
								  v-show="chk_date"
								>
									<v-menu
									  v-model="m_sdate"
									  :close-on-content-click="false"
									  :nudge-right="40"
									  transition="scale-transition"
									  offset-y
									  min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
											  v-model="sdate"
											  label="Picker without buttons"
											  prepend-icon="mdi-calendar"
											  readonly
											  v-bind="attrs"
											  v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
										  v-model="sdate"
										  @input="m_sdate = false"
										></v-date-picker>
									</v-menu>
								</v-col>
								<v-col
								  cols="12"
								  sm="auto"
								  md="auto"
								  v-show="chk_date"
								>
								~
								</v-col>
								<v-col
								  cols="12"
								  sm="4"
								  md="4"
								  v-show="chk_date"
								>
									<v-menu
									  v-model="m_edate"
									  :close-on-content-click="false"
									  :nudge-right="40"
									  transition="scale-transition"
									  offset-y
									  min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
											  v-model="edate"
											  label="Picker without buttons"
											  prepend-icon="mdi-calendar"
											  readonly
											  v-bind="attrs"
											  v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
										  v-model="edate"
										  @input="m_edate = false"
										></v-date-picker>
									</v-menu>
								</v-col>
							</v-row>
							<v-row justify="center">
								<v-btn class="pa-2 mr-2" outlined color="indigo" @click="show = !show">
								닫 기
								</v-btn>
								<v-btn class="pa-2" outlined color="indigo" @click="searchClick">
								검 색
								</v-btn>
							</v-row>
						</v-container>
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>

		<ViewTable 
		:fields="fields"
		:items="datas"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import ViewTable from '@/components/ViewTable.vue'
import EventBus from '@/EventBus.js'
import SearchTree from '@/components/SearchTree.vue'

export default {
	name: 'Alarm',
	
	components: {
		ViewTable,
		SearchTree,
	},
	
	data: () => ({
		fields: [
			{ value: 'id', text: "번호", sortable: true },
			{ value: 'bname', text: "장비명", sortable: true },
			{ value: 'eid', text: "장애ID", sortable: true },
			{ value: 'clabel', text: "장애코드", sortable: true },
			{ value: 'slabel', text: "장애현황", sortable: true },
			{ value: 'info', text: "장애정보", sortable: true },
			{ value: 'odate', text: "발생시간", sortable: true },
			{ value: 'cdate', text: "해지시간", sortable: true },
		],
		datas: [],
		tmp_datas: [],
		items: [
			{  id: 1, bname: "box01", eid: "01", code: 1, clabel: "모든인터페이스다운", status: 1, slabel: "발생", info: "", odate: "2021-05-01 01:01:00", cdate: "2021-05-01 15:01;01" },
			{  id: 2, bname: "box02", eid: "02", code: 2, clabel: "터널다운", status: 1, slabel: "발생", info: "", odate: "2021-05-01 02:01:00", cdate: "2021-05-01 15:02;01" },
			{  id: 3, bname: "box03", eid: "03", code: 2, clabel: "터널다운", status: 1, slabel: "발생", info: "", odate: "2021-05-01 03:01:00", cdate: "2021-05-01 15:03;01" },
			{  id: 4, bname: "box04", eid: "04", code: 4, clabel: "포트다운", status: 1, slabel: "발생", info: "", odate: "2021-05-01 04:01:00", cdate: "2021-05-01 15:04;01" },
			{  id: 5, bname: "box05", eid: "05", code: 4, clabel: "포트다운", status: 2, slabel: "해지", info: "", odate: "2021-05-01 05:01:00", cdate: "2021-05-01 15:05;01" },
			{  id: 6, bname: "box06", eid: "06", code: 4, clabel: "포트다운", status: 1, slabel: "발생", info: "", odate: "2021-05-01 06:01:00", cdate: "2021-05-01 15:06;01" },
			{  id: 7, bname: "box07", eid: "07", code: 7, clabel: "Memory임계치초과", status: 1, slabel: "발생", info: "mem", odate: "2021-05-01 07:01:00", cdate: "2021-05-01 15:07;01" },
			{  id: 8, bname: "box08", eid: "08", code: 6, clabel: "CPU임계치초과", status: 1, slabel: "발생", info: "cpu", odate: "2021-05-01 08:01:00", cdate: "2021-05-01 15:08;01" },
			{  id: 9, bname: "box09", eid: "09", code: 10, clabel: "과트래픽발생", status: 1, slabel: "발생", info: "", odate: "2021-05-01 09:01:00", cdate: "2021-05-01 15:09;01" },
			{ id: 10, bname: "box10", eid: "10", code: 0, clabel: "인터페이스다운", status: 2, slabel: "해지", info: "", odate: "2021-05-01 10:01:00", cdate: "2021-05-01 15:10;01" },
			{ id: 11, bname: "box11", eid: "11", code: 11, clabel: "11", status: 2, slabel: "해지", info: "", odate: "2021-05-01 11:01:00", cdate: "2021-05-01 15:11;01" },
			{ id: 12, bname: "box12", eid: "12", code: 12, clabel: "12", status: 2, slabel: "해지", info: "", odate: "2021-05-01 12:01:00", cdate: "2021-05-01 15:12;01" },
			{ id: 13, bname: "box13", eid: "13", code: 13, clabel: "13", status: 2, slabel: "해지", info: "", odate: "2021-05-01 13:01:00", cdate: "2021-05-01 15:13;01" },
			{ id: 14, bname: "box14", eid: "14", code: 14, clabel: "14", status: 2, slabel: "해지", info: "cpu", odate: "2021-05-01 14:01:00", cdate: "2021-05-01 15:14;01" },
			{ id: 15, bname: "box15", eid: "15", code: 15, clabel: "15", status: 2, slabel: "해지", info: "", odate: "2021-05-01 15:01:00", cdate: "2021-05-01 15:15;01" },
			{ id: 16, bname: "box16", eid: "16", code: 16, clabel: "16", status: 2, slabel: "해지", info: "", odate: "2021-05-01 01:01:00", cdate: "2021-05-01 15:16;01" },
			{ id: 17, bname: "box17", eid: "17", code: 17, clabel: "17", status: 2, slabel: "해지", info: "", odate: "2021-05-01 02:01:00", cdate: "2021-05-01 15:17;01" },
			{ id: 18, bname: "box18", eid: "18", code: 18, clabel: "18", status: 2, slabel: "해지", info: "", odate: "2021-05-01 03:01:00", cdate: "2021-05-01 15:18;01" },
			{ id: 19, bname: "box19", eid: "19", code: 19, clabel: "19", status: 2, slabel: "해지", info: "", odate: "2021-05-01 04:01:00", cdate: "2021-05-01 15:19;01" },
			{ id: 20, bname: "box20", eid: "20", code: 20, clabel: "20", status: 1, slabel: "발생", info: "", odate: "2021-05-01 05:01:00", cdate: "2021-05-01 15:20;01" },
			{ id: 21, bname: "box21", eid: "21", code: 21, clabel: "21", status: 1, slabel: "발생", info: "", odate: "2021-05-01 06:01:00", cdate: "2021-05-01 15:21;01" },
			{ id: 22, bname: "box22", eid: "22", code: 22, clabel: "22", status: 1, slabel: "발생", info: "", odate: "2021-05-01 07:01:00", cdate: "2021-05-01 15:22;01" },
			{ id: 23, bname: "box23", eid: "23", code: 23, clabel: "23", status: 2, slabel: "해지", info: "", odate: "2021-05-01 08:01:00", cdate: "2021-05-01 15:23;01" },
			{ id: 24, bname: "box24", eid: "24", code: 24, clabel: "24", status: 2, slabel: "해지", info: "", odate: "2021-05-01 09:01:00", cdate: "2021-05-01 15:24;01" },
			{ id: 25, bname: "box25", eid: "25", code: 25, clabel: "25", status: 2, slabel: "해지", info: "", odate: "2021-05-01 10:01:00", cdate: "2021-05-01 15:25;01" },
			{ id: 26, bname: "box26", eid: "26", code: 26, clabel: "26", status: 2, slabel: "해지", info: "", odate: "2021-05-01 11:01:00", cdate: "2021-05-01 15:26;01" },
			{ id: 27, bname: "box27", eid: "27", code: 27, clabel: "27", status: 2, slabel: "해지", info: "", odate: "2021-05-01 12:01:00", cdate: "2021-05-01 15:27;01" },
			{ id: 28, bname: "box28", eid: "28", code: 28, clabel: "28", status: 2, slabel: "해지", info: "", odate: "2021-05-01 13:01:00", cdate: "2021-05-01 15:28;01" },
			{ id: 29, bname: "box29", eid: "29", code: 29, clabel: "29", status: 1, slabel: "발생", info: "", odate: "2021-05-01 14:01:00", cdate: "2021-05-01 15:29;01" },
			{ id: 30, bname: "box30", eid: "30", code: 30, clabel: "30", status: 1, slabel: "발생", info: "", odate: "2021-05-01 15:01:00", cdate: "2021-05-01 15:30;01" },
			{ id: 31, bname: "box31", eid: "31", code: 31, clabel: "31", status: 1, slabel: "발생", info: "", odate: "2021-05-01 08:01:00", cdate: "2021-05-01 15:31;01" },
			{ id: 32, bname: "box32", eid: "32", code: 32, clabel: "32", status: 1, slabel: "발생", info: "mem", odate: "2021-05-01 09:01:00", cdate: "2021-05-01 15:32;01" },
			{ id: 33, bname: "box33", eid: "33", code: 33, clabel: "33", status: 1, slabel: "발생", info: "", odate: "2021-05-01 10:01:00", cdate: "2021-05-01 15:33;01" },
			{ id: 34, bname: "box34", eid: "34", code: 34, clabel: "34", status: 1, slabel: "발생", info: "", odate: "2021-05-01 11:01:00", cdate: "2021-05-01 15:34;01" },
			{ id: 35, bname: "box35", eid: "35", code: 35, clabel: "35", status: 1, slabel: "발생", info: "", odate: "2021-05-01 12:01:00", cdate: "2021-05-01 15:35;01" },
		],                                                                                                
		
		show: false,

		sel_tree: '([트리]에서 선택 or 검색)',
		sdate: new Date().toISOString().substr(0, 10),
		edate: new Date().toISOString().substr(0, 10),
		m_sdate: false,
		m_edate: false,

		print_cnt: 10,
		chk_err: false,
		chk_code: false,
		chk_date: false,
		code: [
			[
				{ id: 0, value: false, text: '인터페이스다운', },
				{ id: 1, value: false, text: '모든인터페이스다운', },
				{ id: 2, value: false, text: '터널다운', },
				{ id: 3, value: false, text: '전원켜짐', },
				{ id: 4, value: false, text: '포트다운', },
				{ id: 5, value: false, text: '터널백업동작', },
			],
			[
				{ id: 6, value: false, text: 'CPU임계치초과', },
				{ id: 7, value: false, text: 'Memory임계치초과', },
				{ id: 8, value: false, text: 'Session임계치초과', },
				{ id: 9, value: false, text: '재부팅', },
				{ id: 10, value: false, text: '과트래픽발생', },
				{ id: 11, value: false, text: '시간설정그룹만료', },
			],
			[
				{ id: 12, value: false, text: '입력트래픽임계치초과', },
				{ id: 13, value: false, text: '출력트래픽임계치초과', },
				{ id: 14, value: false, text: 'Master전환', },
				{ id: 15, value: false, text: '업데이트', },
				{ id: 16, value: false, text: '불규칙회선감지', },
				{ id: 17, value: false, text: '감사증적저장소임계치초과', },
			],
			[
				{ id: 18, value: false, text: '미등록사용자', },
				{ id: 19, value: false, text: '빈도제한', },
				{ id: 20, value: false, text: '디스크감시', },
				{ id: 21, value: false, text: '터널설정변경', },
				{ id: 22, value: false, text: '동작환경검사', },
				{ id: 23, value: false, text: '관리자잠김', },
			],
			[
				{ id: 24, value: false, text: 'Popcon P1 USB연결성공', },
				{ id: 25, value: false, text: 'Popcon P1 USB연결실패', },
				{ id: 26, value: false, text: 'Popcon P2 USB연결성공', },
				{ id: 27, value: false, text: 'Popcon P2 USB연결실패', },
				{ id: 28, value: false, text: '전원이중화이상탐지', },
			],
			[
				{ id: 29, value: false, text: 'Popcon하위장비전원이상', },
				{ id: 30, value: false, text: 'Popcon하위장비전원켜짐', },
				{ id: 31, value: false, text: 'Popcon하위장비전원꺼짐', },
				{ id: 32, value: false, text: 'Popcon하위장비재시작', },
				{ id: 33, value: false, text: 'Popcon하위장비연결실패', },
			],
		],
		err: [
			{ id: 1, value: false, text: '장애발생', },
			{ id: 2, value: false, text: '장애해결', },
		],
	}),
	methods: {
		errStatus: function(list) {
			var idx = "";
			for(var key in this.err) {
				if(this.err[key].value) {
					idx += this.err[key].id;
				}
			}
			if(idx.length) {
				var item = list.filter(d => {
					return (idx.indexOf(d.status) != -1)
				});
				this.tmp_datas = item;
			} else {
				this.tmp_datas = list;
			}
		},
		almCode: function(list) {
			var idx = "";
			for(var key in this.code) {
				for(var ckey in this.code[key]) {
					if(this.code[key][ckey].value) {
						idx += this.code[key][ckey].id;
					}
				}
			}
			if(idx.length) {
				var item = list.filter(d => {
					return (idx.indexOf(d.code) != -1)
				});
				this.tmp_datas = item;
			} else {
				this.tmp_datas = list;
			}
		},
		searchClick: function() {
			var list = this.items.slice();

			this.errStatus(list);
			this.almCode(this.tmp_datas);

			this.datas = this.tmp_datas;
		},
	},

	created() {
		EventBus.$on('tree_click', (val) => {
			if(val != undefined) {
				this.sel_tree = val.bname;
			}
		});
	}
};
</script>

<style scoped>
.alm {
	padding: 20px;
}
.search-set {
	margin-bottom: 20px;
}
.search-tree {
	display: inline-block;
}
</style>

<template>
	<div class="log-box">
		<v-row
		  align="center"
		  justify="center"
		>
		<v-card v-show="visible" max-width="85%" class="search-set"
		>
			<v-container>
			<v-row>
				<v-col cols="12" sm="12" md="12" label="선택노드">
					<label>{{ sel_tree }}</label>

					<SearchTree
					  class="search-tree ml-2"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="4" md="4">
					<v-select
					:items="opt_a"
					item-key="value"
					class="pa-2"
					label="감사유형"
					v-model="sel_a"
					></v-select>
				</v-col>
				<v-col cols="12" sm="4" md="4">
					<v-select
					:items="opt_b"
					item-key="value"
					class="pa-2"
					label="사건유형"
					v-model="sel_b"
					></v-select>
				</v-col>
				<v-col cols="12" sm="4" md="4">
					<v-select
					:items="opt_c"
					item-key="value"
					class="pa-2"
					label="사건중요도"
					v-model="sel_c"
					></v-select>
				</v-col>
			</v-row>
			<v-row v-show="sel_a > 1">
				<v-col cols="12" sm="4" md="4">
					<v-select
					:items="opt_c"
					item-key="value"
					class="pa-2"
					label="프로토콜"
					v-model="sel_c"
					></v-select>
				</v-col>
			</v-row>
			<v-row v-show="sel_a == 3">
				<v-col cols="12" sm="4" md="4">
					<v-text-field
					  label="SID"
					  class="dp-inline"
					  :disabled="sid_any"
					>
					{{sid}}
					</v-text-field>
					<v-checkbox
					  v-model="sid_any"
					  label="ANY"
					  color="red"
					  class="dp-inline ml-3 va-middle"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>
			<v-row v-show="sel_a">
				사건주체(출발지)
				<v-col cols="12" sm="4" md="4">
					<v-text-field
					  label="IP"
					  class="dp-inline"
					  :disabled="sip_any"
					>
					{{sip}}
					</v-text-field>
					<v-checkbox
					  v-model="sip_any"
					  label="ANY"
					  color="red"
					  class="dp-inline ml-3 va-middle"
					  hide-details
					></v-checkbox>
				</v-col>
				<v-col cols="12" sm="4" md="4">
					<v-text-field
					  label="Port"
					  class="dp-inline"
					  :disabled="sport_any"
					>
					{{sport}}
					</v-text-field>
					<v-checkbox
					  v-model="sport_any"
					  label="ANY"
					  color="red"
					  class="dp-inline ml-3 va-middle"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>
			<v-row v-show="sel_a">
				사건주체(목적지)
				<v-col cols="12" sm="4" md="4">
					<v-text-field
					  label="IP"
					  class="dp-inline"
					  :disabled="eip_any"
					>
					{{eip}}
					</v-text-field>
					<v-checkbox
					  v-model="eip_any"
					  label="ANY"
					  color="red"
					  class="dp-inline ml-3 va-middle"
					  hide-details
					></v-checkbox>
				</v-col>
				<v-col cols="12" sm="4" md="4">
					<v-text-field
					  label="Port"
					  class="dp-inline"
					  :disabled="eport_any"
					>
					{{eport}}
					</v-text-field>
					<v-checkbox
					  v-model="eport_any"
					  label="ANY"
					  color="red"
					  class="dp-inline ml-3 va-middle"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>
			<v-row>
				검색기간
				<v-col
				  cols="12"
				  sm="4"
				  md="4"
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
							  label="start date"
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
				>
				~
				</v-col>
				<v-col
				  cols="12"
				  sm="4"
				  md="4"
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
							  label="end date"
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
			<v-row>
				<div class="text-center">
					<v-btn
					  color="success"
					  dark
					  class="mb-2 mr-2"
					>
					Export CSV
					</v-btn>
					<v-btn
					  color="success"
					  dark
					  class="mb-2 mr-2"
					>
					Export Excel
					</v-btn>
					<v-btn
					  color="primary"
					  dark
					  class="mb-2"
					  @click="searchClick"
					>
					검 색
					</v-btn>
				</div>
			</v-row>
			</v-container>
			</v-card>
		</v-row>

		<v-row
		  align="center"
		  justify="center"
		  class="mb-5"
		>
		<v-btn
		  color="primary"
		  dark
		  class="mb-2 mt-2"
		  outlined
		  @click="visible = !visible"
		>
			검색조건 {{(visible) ? '닫기' : '열기'}}
		</v-btn>
		</v-row>

		<ViewTable 
		:fields="fields"
		:items="items"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import ViewTable from '@/components/ViewTable.vue'
import EventBus from '@/EventBus.js'
import SearchTree from '@/components/SearchTree.vue'

export default {
	name: 'LogBox',
  	components: {
		ViewTable,
		SearchTree,
	},
	data() {
		return {
			visible: true,
			perPage: 10,
			sel_tree: '([트리]에서 선택 or 검색)',

			sdate: new Date().toISOString().substr(0, 10),
			edate: new Date().toISOString().substr(0, 10),
			m_sdate: false,
			m_edate: false,

			sel_print: 10,
			opt_print: [
				{ text: '10', value: 10 },
				{ text: '20', value: 20 },
				{ text: '30', value: 30 },
				{ text: '50', value: 50 },
				{ text: '100', value: 100 },
			],
			sel_a: 0,
			opt_a: [
				{ text: '이벤트', value: 0 },
				{ text: '웹필터링', value: 1 },
				{ text: '방화벽', value: 2 },
				{ text: 'IPS', value: 3 },
				{ text: 'DoS', value: 4 },
			],
			sel_b: 0,
			opt_b: [
				{ text: '전체보기', value: 0 },
				{ text: '인증', value: 1 },
				{ text: '보안관리', value: 2 },
			],
			sel_c: 0,
			opt_c: [
				{ text: '전체보기', value: 0 },
				{ text: 'emerg', value: 1 },
				{ text: 'alert', value: 2 },
				{ text: 'crit', value: 3 },
				{ text: 'err', value: 4 },
			],

			sip_any: true,
			eip_any: true,
			sport_any: true,
			eport_any: true,
			sid_any: true,

			sip: '',
			eip: '',
			sport: '',
			eport: '',
			sid: '',

			proto: 0,
			proto_opt: [
				{ text: '전체보기', value: '0' },
				{ text: 'emerg', value: '1' },
				{ text: 'alert', value: '2' },
				{ text: 'crit', value: '3' },
				{ text: 'err', value: '4' },
			],

			fields: [
				{ value: 'id', text: '번호', sortable: true },
				{ value: 'sdate', text: '날짜', sortable: true },
				{ value: 'gname', text: '그룹명', sortable: true },
				{ value: 'bname', text: '장비명', sortable: true },
				{ value: 'weekly', text: '주간 레포트 생성', sortable: true },
				{ value: 'monthly', text: '월간 레포트 생성', sortable: true },
			],
			items: [
				{ id: 1, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 2, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 3, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 4, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 5, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 6, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 7, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 8, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 9, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 10, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 11, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 12, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 13, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 14, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 15, weekly: 'X', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 16, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 17, weekly: 'X', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 18, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 19, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 20, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 21, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 22, weekly: 'X', monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 23, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 24, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 25, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 26, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 27, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 28, weekly: 'X', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 29, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 30, weekly: 'O', monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 31, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 32, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 33, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
				{ id: 34, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', bname: 'Macdonald' },
				{ id: 35, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', bname: 'Shaw' },
				{ id: 36, weekly: 'O', monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', bname: 'Wilson' },
			],
		}
	},
	methods: {
		searchClick() {
			this.perPage = this.sel_print;
			console.log(this.sel_print);
			console.log(this.sel_tree);
			console.log(this.sel_a);
			console.log(this.sel_b);
			console.log(this.sel_c);
			console.log(this.sdate);
			console.log(this.edate);
		},
	},

	created() {
		EventBus.$on('tree_click', (val) => {
			if(val != undefined) {
				this.sel_tree = val.bname;
			}
		});
	}
}
</script>

<style scoped>
select {
	width: 250px;
	margin-right: 30px;
	margin-left: 10px;
	vertical-align: inherit;
}
select:first-child {
	margin-left: 0px;
}
.dp-inline {
	display: inline-block;
}
.datepicker {
	display: inline-block;
	margin-right: 10px;
}
.datepicker:last-child {
	margin-left: 10px;
}
.b-form-datepicker {
	width: 250px;
}
.va-middle {
	vertical-align: middle;
}
.search-set {
	padding: 20px;
}
.search-tree {
	display: inline-block;
}
</style>

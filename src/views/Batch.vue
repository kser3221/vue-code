<template>
	<div class="batch">
		<v-tabs v-model="tab"
		fixed-tabs
		>
			<v-tab
			v-for="item in items"
			:key="item.tab"
			@click="tabClick"
			>
				{{ item.text }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab" class="tab-item">
			<v-tab-item
			v-for="item in items"
			:key="item.tab"
			>
				<!--v-toolbar flat color="white"-->
				<v-container>
				<v-row>
				<v-col cols="12" sm="7" md="7">
				<div class="">
					<v-btn
					  color="blue-grey"
					  class="ma-2 white--text"
					>
						포맷 다운로드
						<v-icon dark>
						  mdi-download-outline
						</v-icon>
					</v-btn>


					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
							  color="success"
							  dark
							  class="mb-2 valign"
							  v-bind="attrs"
							  v-on="on"
							>
								{{ formTitle }} 일괄등록 설정
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">일괄등록 설정</span>
							</v-card-title>

							<v-card-text>
							  <v-container>
								<v-row>
								  <v-col cols="12" sm="12" md="10">
									<v-text-field v-model="sel_file" label="선택 파일명" disabled></v-text-field>
								  </v-col>
								</v-row>
								<v-row>
								  <v-col cols="12" sm="10" md="8">
									<v-file-input
									v-model="fname"
									label="File input"
									></v-file-input>
								  </v-col>
								  <v-col cols="12" sm="2" md="2">
									<v-btn
									  color="success"
									  dark
									  class="mb-2 valign"
									  @click="fileUpload"
									>
										업로드
									</v-btn>
								  </v-col>
								</v-row>
							  </v-container>
							</v-card-text>

							<v-card-actions>
							  <v-spacer></v-spacer>
							  <v-btn color="blue darken-1" text @click="close">닫 기</v-btn>
							  <v-btn color="blue darken-1" text @click="save">적 용</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-btn
					  class="ma-2"
					  color="info"
					  @click="loader = 'loading4'"
					>
						일괄등록 시작
						<v-icon dark>
						  mdi-play
						</v-icon>
					</v-btn>
				</div>
				</v-col>
				<v-col cols="12" sm="5" md="5">
				<div class="text-center">
					<v-text-field v-model="sel_fname" label="선택 파일명" disabled></v-text-field>
				</div>
				</v-col>
				</v-row>
				</v-container>
				<!--/v-toolbar-->

				<FilterTable 
				:fields="item.fields"
				:items="item.items"
				/>
			</v-tab-item>
		</v-tabs-items>
		<!--div>
			<router-view/>
		</div-->
	</div>
</template>

<script>
// @ is an alias to /src
import FilterTable from '@/components/FilterTable.vue'

export default {
	name: 'Batch',
	
	components: {
		FilterTable,
	},
	
	data: () => ({
		tab: null,
		dialog: false,
		fname: null,
		sel_fname: null,
		sel_file: null,
        items: [
          { tab: 0, text: '지점 등록',
			fields: [
				{ value: 'gname', text: '행번호', sortable: true },
				{ value: 'pname', text: '상위 그룹명', sortable: true },
				{ value: 'weekly', text: '지점명', sortable: true },
				{ value: 'monthly', text: '주소', sortable: true },
				{ value: 'id', text: '분류', sortable: true },
				{ value: 'sdate', text: '증록일', sortable: true },
				{ value: 'slabel', text: '등록결과', sortable: true },
			],
			items: [
				{  id: 1, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{  id: 2, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{  id: 3, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{  id: 4, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{  id: 5, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{  id: 6, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{  id: 7, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{  id: 8, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{  id: 9, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 10, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 11, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 12, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 13, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 14, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 15, weekly: 'X', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 16, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 17, weekly: 'X', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 18, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 19, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 20, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 21, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 22, weekly: 'X', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 23, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 24, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 25, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 26, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 27, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 28, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 29, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 30, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 31, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 32, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 33, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 34, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 35, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 36, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			],
		  },
          { tab: 1, text: '장비 등록',
			fields: [
				{ value: 'gname', text: '행번호', sortable: true },
				{ value: 'id', text: '사용자정의코드', sortable: true },
				{ value: 'weekly', text: '장비명', sortable: true },
				{ value: 'pname', text: '장비IP', sortable: true },
				{ value: 'sdate', text: '증록일', sortable: true },
				{ value: 'status', text: '등록결과', sortable: true },
			],
			items: [
				{  id: 1, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{  id: 2, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{  id: 3, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{  id: 4, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{  id: 5, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{  id: 6, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{  id: 7, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{  id: 8, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{  id: 9, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 10, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 11, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 12, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 13, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 14, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 15, weekly: 'X', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 16, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 17, weekly: 'X', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 18, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 19, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 20, weekly: 'X', slabel: '성공', status: 3, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 21, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 22, weekly: 'X', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 23, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 24, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 25, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 26, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 27, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 28, weekly: 'X', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 29, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 30, weekly: 'O', slabel: '성공', status: 3, monthly: 'O', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 31, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 32, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 33, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
				{ id: 34, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Dickerson', pname: 'Macdonald' },
				{ id: 35, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Larsen', pname: 'Shaw' },
				{ id: 36, weekly: 'O', slabel: '실패', status: 4, monthly: 'X', sdate: '2020-02-05', gname: 'Geneva', pname: 'Wilson' },
			],
		  },
        ],
	}),

	methods: {
		tabClick () {
		  this.fname =  null;
		  this.sel_fname =  null;
		  this.sel_file =  null;
		},
		
		fileUpload () {
		  this.sel_file =  this.fname.name;
		},
		
		close () {
		  this.dialog = false
		  this.fname =  null;
		  this.sel_fname =  null;
		  this.sel_file =  null;
		},
		
		save () {
		  this.fname =  null;
		  this.sel_fname =  this.sel_file;
		  this.sel_file =  null;
		  this.dialog = false
		},
	},
	
	computed: {
		formTitle () {
		  return this.tab === 1 ? '장비' : '지점'
		},
	},
};
</script>

<style scoped>
.batch .tab-item {
	padding: 20px;
}
.valign {
	vertical-align: unset;
}
</style>

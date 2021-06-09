<template>
	<div class="dashboard">
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-row>
						<v-col cols="3">
							<v-card>
								<v-list-item three-line>
									<v-list-item-content>
										<div class="overline">
										장비 시스템 정보 통계
										</div>
										<v-list-item-subtitle v-for="(box, index) in box_status" :key="index">
											<v-icon>
											  mdi-chevron-right
											</v-icon>
											{{ box.label }}
											<span class="fr">{{ box.value }}</span>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-list-item three-line>
									<v-list-item-content>
										<div class="overline">
										인터페이스 상태 통계
										</div>
										<v-list-item-subtitle v-for="(ifs, index) in if_status" :key="index">
											<v-icon>
											  mdi-chevron-right
											</v-icon>
											{{ ifs.label }}
											<span class="fr">{{ ifs.value }}</span>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-card>
						</v-col>
						<v-col cols="3" v-for="(chart, index) in dchart" :key="index">
							<v-card class="p_15">
								<Donut
								:title="chart.title"
								:sections="chart.sections"
								/>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="3" v-for="(acount, index) in alm_count" :key="index">
					<v-card class="h100">
						<v-list-item three-line>
							<v-list-item-content>
								<div class="overline">
								{{ acount.title }}
								</div>
								<v-list-item-subtitle v-for="(alm, index) in acount.alm" :key="index">
									<v-icon>
									  mdi-chevron-right
									</v-icon>
									{{ alm.label }}
									<span class="fr">{{ alm.value }} {{ (alm.value_ac != undefined) ? '(' + alm.value_ac + ')' : '' }}</span>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-card>
				</v-col>
				<v-col cols="12">
					<v-card>
						<v-card-title>
							<v-container>
								<v-row>
									<v-col cols="12">
										알람 모니터

										<div class="fr">
											<v-menu offset-y
											  :close-on-content-click="false"
											  v-model="amenu"
											>
											  <template v-slot:activator="{ on, attrs }">
												<v-btn
												  color="error"
												  class="ml-5"
												  dark
												  :outlined="set_amenu"
												  v-bind="attrs"
												  v-on="on"
												>
												  알람종류
												</v-btn>
											  </template>
											  <v-list>
												<v-list-item
												  v-for="(item, index) in alm"
												  :key="index"
												>
												  <v-list-item-title>
													<v-checkbox
													v-model="item.value"
													:label="item.text"
													color="orange"
													></v-checkbox>
												  </v-list-item-title>
												</v-list-item>
												<v-list-item>
												  <v-list-item-title>
													  <v-btn
													  color="primary"
													  @click="applyClick"
													  >
													  적 용
													  </v-btn>
												  </v-list-item-title>
												</v-list-item>
											  </v-list>
											</v-menu>

											<v-menu offset-y
											  :close-on-content-click="false"
											  v-model="smenu"
											>
											  <template v-slot:activator="{ on, attrs }">
												<v-btn
												  color="warning"
												  class="ml-2"
												  dark
												  :outlined="set_smenu"
												  v-bind="attrs"
												  v-on="on"
												>
												  상태
												</v-btn>
											  </template>
											  <v-list>
												<v-list-item
												  v-for="(item, index) in alm_status"
												  :key="index"
												>
												  <v-list-item-title>
													<v-checkbox
													v-model="item.value"
													:label="item.text"
													color="orange"
													></v-checkbox>
												  </v-list-item-title>
												</v-list-item>
												<v-list-item>
												  <v-list-item-title>
													  <v-btn
													  color="primary"
													  @click="applyClick"
													  >
													  적 용
													  </v-btn>
												  </v-list-item-title>
												</v-list-item>
											  </v-list>
											</v-menu>

											<v-select
											class="w120 dp_ib ml-2"
											:items="mtime"
											v-model="sel_mtime"
											dense
											></v-select>
										</div>
									</v-col>
								</v-row>
							</v-container>
						</v-card-title>
						<v-card-text>
							<DataTable 
							:fields="fields"
							:items="datas"
							@openPop="popOpen"
							/>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-dialog v-model="dialog" max-width="850px">
			<v-card>
				<v-card-title>
					<span class="headline">{{box_info.bname}}</span>
				</v-card-title>

				<v-card-text>
				  <v-container>
					<v-card class="p_15">
					  장비 정보
					  <v-row>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.model" label="Model" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.img" label="Image Version" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.ip" label="IP" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.serial" label="Serial" disabled ></v-text-field>
					    </v-col>
					  </v-row>
					  <v-row>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.lan" label="Lan IP" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.time" label="동작시간" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.snmp_ver" label="SNMP Version" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.snmp_com" label="SNMP Community" disabled ></v-text-field>
					    </v-col>
					  </v-row>
					</v-card>
					<v-card class="p_15 mt-5">
					  지점 정보
					  <v-row>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.pname" label="상위그룹" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.bch" label="지점명" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.code" label="지점코드" disabled ></v-text-field>
					    </v-col>
					  </v-row>
					  <v-row>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.name" label="담당자" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.email" label="e-mail" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.tel1" label="지점 연락처1" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.tel2" label="지점 연락처2" disabled ></v-text-field>
					    </v-col>
					  </v-row>
					  <v-row>
					    <v-col cols="9">
					  	<v-text-field v-model="box_info.addr" label="주소" disabled ></v-text-field>
					    </v-col>
					    <v-col cols="3">
					  	<v-text-field v-model="box_info.date" label="등록일시" disabled ></v-text-field>
					    </v-col>
					  </v-row>
					</v-card>
				  </v-container>
				</v-card-text>

				<v-card-actions>
				  <v-spacer></v-spacer>
				  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import DataTable from '../components/DataTable'
import Donut from '../components/DonutChart'

export default {
	name: 'Dashboard',
	
	components: {
		DataTable,
		Donut,
	},
	
	data: () => ({
		fields: [
			{ value: 'gname', text: '장비명', sortable: true },
			{ value: 'pname', text: '알람종류', sortable: true },
			{ value: 'sdate', text: '발생시간', sortable: true },
			{ value: 'sdate', text: '복구시간', sortable: true },
			{ value: 'status_text', text: '상태', sortable: true },
		],
		datas: [],
		tmp_datas: [],
		items: [
			{  id: 1, status_text: "발생", status: 1, sdate: '2020-02-05', code: 0, gname: 'BOX1', pname: '인터페이스 다운' 
				, box_info: {
					id: '1',
					bname: 'BOX1',
					model: 'Neobox_M106a',
					img: 'XIOS FW V2.1(r32473)',
					ip: '172.31.13.232',
					serial: 'M106-a-L1707-0110',
					lan: '40.0.0.1',
					time: '68일 0시간 27분 59초',
					snmp_ver: '2c',
					snmp_com: '68일 0시간 27분 59초',

					pname: 'grp_2_grp',
					bch: 'bch_2',
					code: '-',
					tel1: '-',
					tel2: '-',
					addr: '부산광역시 수영구 광안로49번길 74',
					name: '-',
					email: '-',
					date: '2021-01-25 14:07:03',
				},
			},
			{  id: 2, status_text: "복구", status: 2, sdate: '2020-02-05', code: 1, gname: 'Larsen', pname: '모든 인터페이스 다운' , box_info: {} },
			{  id: 3, status_text: "발생", status: 1, sdate: '2020-02-05', code: 2, gname: 'Geneva', pname: '터널 다운' },
			{  id: 4, status_text: "복구", status: 2, sdate: '2020-02-05', code: 3, gname: 'Dickerson', pname: 'CPU 임계치 초과' , box_info: {} },
			{  id: 5, status_text: "발생", status: 1, sdate: '2020-02-05', code: 4, gname: 'Larsen', pname: 'Memory 임계치 초과' , box_info: {} },
			{  id: 6, status_text: "복구", status: 2, sdate: '2020-02-05', code: 5, gname: 'Geneva', pname: 'Session 임계치 초과' , box_info: {} },
			{  id: 7, status_text: "발생", status: 1, sdate: '2020-02-05', code: 6, gname: 'Dickerson', pname: '입력 트래픽 임계치초과' , box_info: {} },
			{  id: 8, status_text: "발생", status: 3, sdate: '2020-02-05', code: 7, gname: 'Larsen', pname: '출력 트래픽 임계치 초과' , box_info: {} },
			{  id: 9, status_text: "발생", status: 1, sdate: '2020-02-05', code: 8, gname: 'Geneva', pname: '동작환경 검사' , box_info: {} },
			{ id: 10, status_text: "발생", status: 1, sdate: '2020-02-05', code: 9, gname: 'Dickerson', pname: '터널 백업 동작' , box_info: {} },
			{ id: 11, status_text: "복구", status: 2, sdate: '2020-02-05', code: 10, gname: 'Larsen', pname: '포트 다운' , box_info: {} },
			{ id: 12, status_text: "복구", status: 2, sdate: '2020-02-05', code: 0, gname: 'Geneva', pname: '인터페이스 다운' , box_info: {} },
			{ id: 13, status_text: "복구", status: 2, sdate: '2020-02-05', code: 1, gname: 'Dickerson', pname: '모든 인터페이스 다운' , box_info: {} },
			{ id: 14, status_text: "복구", status: 2, sdate: '2020-02-05', code: 2, gname: 'Larsen', pname: '터널 다운' , box_info: {} },
			{ id: 15, status_text: "복구", status: 2, sdate: '2020-02-05', code: 3, gname: 'Geneva', pname: 'CPU 임계치 초과' , box_info: {} },
			{ id: 16, status_text: "복구", status: 2, sdate: '2020-02-05', code: 4, gname: 'Dickerson', pname: 'Memory 임계치 초과' , box_info: {} },
			{ id: 17, status_text: "복구", status: 2, sdate: '2020-02-05', code: 5, gname: 'Larsen', pname: 'Session 임계치 초과' , box_info: {} },
			{ id: 18, status_text: "복구", status: 2, sdate: '2020-02-05', code: 6, gname: 'Geneva', pname: '임력 트래픽 임계치 초과' , box_info: {} },
			{ id: 19, status_text: "발생", status: 3, sdate: '2020-02-05', code: 7, gname: 'Dickerson', pname: '출력 트래픽 임계치 초과' , box_info: {} },
			{ id: 20, status_text: "발생", status: 3, sdate: '2020-02-05', code: 8, gname: 'Larsen', pname: '동작환경 검사' , box_info: {} },
			{ id: 21, status_text: "발생", status: 1, sdate: '2020-02-05', code: 9, gname: 'Geneva', pname: '터널 백업 동작' , box_info: {} },
			{ id: 22, status_text: "발생", status: 3, sdate: '2020-02-05', code: 10, gname: 'Dickerson', pname: '포트 다운' , box_info: {} },
			{ id: 23, status_text: "발생", status: 1, sdate: '2020-02-05', code: 0, gname: 'Larsen', pname: '인터페이스 다운' , box_info: {} },
			{ id: 24, status_text: "발생", status: 1, sdate: '2020-02-05', code: 1, gname: 'Geneva', pname: '모든 인터페이스 다운' , box_info: {} },
			{ id: 25, status_text: "발생", status: 1, sdate: '2020-02-05', code: 2, gname: 'Dickerson', pname: '모든 인터페이스 다운' , box_info: {} },
			{ id: 26, status_text: "발생", status: 1, sdate: '2020-02-05', code: 3, gname: 'Larsen', pname: 'CPU 임계치 초과' , box_info: {} },
			{ id: 27, status_text: "발생", status: 1, sdate: '2020-02-05', code: 4, gname: 'Geneva', pname: 'Memory 임계치 초과' , box_info: {} },
			{ id: 28, status_text: "발생", status: 1, sdate: '2020-02-05', code: 5, gname: 'Dickerson', pname: 'Session 임계치 초과' , box_info: {} },
			{ id: 29, status_text: "발생", status: 3, sdate: '2020-02-05', code: 6, gname: 'Larsen', pname: '입력 트래픽 임계치 초과' , box_info: {} },
			{ id: 30, status_text: "발생", status: 3, sdate: '2020-02-05', code: 7, gname: 'Geneva', pname: '출력 트래픽 임계치 초과' , box_info: {} },
			{ id: 31, status_text: "발생", status: 1, sdate: '2020-02-05', code: 8, gname: 'Dickerson', pname: '동작환경 검사' , box_info: {} },
			{ id: 32, status_text: "발생", status: 1, sdate: '2020-02-05', code: 9, gname: 'Larsen', pname: '터널 백업 설정' , box_info: {} },
			{ id: 33, status_text: "발생", status: 1, sdate: '2020-02-05', code: 10, gname: 'Geneva', pname: '포트 다운' , box_info: {} },
			{ id: 34, status_text: "발생", status: 1, sdate: '2020-02-05', code: 0, gname: 'Dickerson', pname: '인터페이스 다운' , box_info: {} },
			{ id: 35, status_text: "발생", status: 1, sdate: '2020-02-05', code: 1, gname: 'Larsen', pname: '모든 인터페이스 다운' , box_info: {} },
			{ id: 36, status_text: "발생", status: 1, sdate: '2020-02-05', code: 2, gname: 'Geneva', pname: '터널 다운' , box_info: {} },
		],

		box_status: [
			{ label: '지점', value: 10 },
			{ label: '장비', value: 7 },
		],
		if_status: [
			{ label: 'UP', value: 15 },
			{ label: 'DOWN', value: 0 },
		],

		dchart: [
			{
				title: 'HW 모델 통계',
				sections: [
					{ label: 'BOX1', value: 10, color: '#FFCDD2' },
					{ label: 'BOX2', value: 20, color: '#64B5F6' },
					{ label: 'BOX3', value: 15, color: '#FFEE58' },
					{ label: 'BOX4', value: 55, color: '#FFA726' },
				],
			},
			{
				title: '이미지 버전 통계',
				sections: [
					{ label: 'IMG1', value: 10, color: '#FFCDD2' },
					{ label: 'IMG2', value: 30, color: '#64B5F6' },
					{ label: 'IMG3', value: 60, color: '#FFEE58' },
				],
			},
			{
				title: '회선 통계',
				sections: [
					{ label: 'IF1', value: 50, color: '#FFCDD2' },
					{ label: 'IF2', value: 50, color: '#64B5F6' },
				],
			},
		],

		alm_count: [
			{
				title: '자원 알람 / 건(누적건)',
				alm: [
					{ label: 'CPU', value: 0, value_ac: 0 },
					{ label: 'Memory', value: 1, value_ac: 5 },
					{ label: 'Session', value: 0, value_ac: 0 },
					{ label: 'Input Traffic', value: 0, value_ac: 0 },
					{ label: 'output Traffic', value: 0, value_ac: 0 },
					{ label: '과 트래픽', value: 0 },
					{ label: '불규칙회선', value: 2 },
					{ label: '감사증적저장소', value: 0 },
				],
			},
			{
				title: '장애 알람 / 건(누적건)',
				alm: [
					{ label: '회선 장애', value: 1, value_ac: 8 },
					{ label: '포트 다운', value: 3, value_ac: 0 },
					{ label: '응답 없음', value: 0, value_ac: 0 },
					{ label: '터널 장애', value: 0, value_ac: 0 },
					{ label: '디스크 감시', value: 0 },
				],
			},
			{
				title: '장비 상태 알람 / 건',
				alm: [
					{ label: 'Power UP', value: 0 },
					{ label: 'Reboot', value: 0 },
					{ label: 'Update', value: 0 },
					{ label: '설정 변경', value: 0 },
					{ label: 'Master 전환', value: 0 },
				],
			},
			{
				title: '접근제어 알람 / 건',
				alm: [
					{ label: '미등록사용자', value: 0 },
					{ label: '빈도제한', value: 0 },
					{ label: '관리자 잠김', value: 0 },
				],
			},
		],

		sel_mtime: 0,
		mtime: [
			{ text: '사용안함', value: 0 },
			{ text: '최근 1분', value: 1 },
			{ text: '최근 5분', value: 2 },
			{ text: '최근 10분', value: 3 },
			{ text: '최근 1시간', value: 4 },
			{ text: '최근 6시간', value: 5 },
		],

		amenu: false,
		smenu: false,
		alm: [
			{ id: 0, text: "인터페이스 다운", value: false, },
			{ id: 1, text: "모든 인터페이스 다운", value: false, },
			{ id: 2, text: "터널 다운", value: false, },
			{ id: 3, text: "CPU 임계치 초과", value: false, },
			{ id: 4, text: "Memory 임계치 초과", value: false, },
			{ id: 5, text: "Session 임계치 초과", value: false, },
			{ id: 6, text: "입력 트래픽 임계치 초과", value: false, },
			{ id: 7, text: "출력 트래픽 임계치 초과", value: false, },
			{ id: 8, text: "동작환경 검사", value: false, },
			{ id: 9, text: "터널 백업 동작", value: false, },
			{ id: 10, text: "포트 다운", value: false, },
		],
		alm_status: [
			{ id: 1, text: '발생', value: false },
			{ id: 2, text: '복구', value: false },
			{ id: 3, text: '기타', value: false },
		],

		set_amenu: true,
		set_smenu: true,

		dialog: false,
		box_info: {
			id: '1',
			bname: 'BOX1',
			model: 'Neobox_M106a',
			img: 'XIOS FW V2.1(r32473)',
			ip: '172.31.13.232',
			serial: 'M106-a-L1707-0110',
			lan: '40.0.0.1',
			time: '68일 0시간 27분 59초',
			snmp_ver: '2c',
			snmp_com: '68일 0시간 27분 59초',

			pname: 'grp_2_grp',
			bch: 'bch_2',
			code: '-',
			tel1: '-',
			tel2: '-',
			addr: '부산광역시 수영구 광안로49번길 74',
			name: '-',
			email: '-',
			date: '2021-01-25 14:07:03',
		},
	}),

	methods: {
		popOpen (item) {
			this.box_info = item.box_info;

			this.dialog = true;
		},
		close() {
			this.dialog = false;
		},
		aMenuClick(list) {
			var idx = "";
			for(var key in this.alm) {
				if(this.alm[key].value) {
					idx += this.alm[key].id;
				}
			}
			if(idx.length) {
				var item = list.filter(d => {
					return (idx.indexOf(d.code) != -1)
				});
				this.tmp_datas = item;
				this.set_amenu = false;
			} else {
				this.tmp_datas = list;
				this.set_amenu = true;
			}
			this.amenu = false;
		},
		sMenuClick(list) {
			var idx = "";
			for(var key in this.alm_status) {
				if(this.alm_status[key].value) {
					idx += this.alm_status[key].id;
				}
			}
			if(idx.length) {
				var item = list.filter(d => {
					return (idx.indexOf(d.status) != -1)
				});
				this.tmp_datas = item;
				this.set_smenu = false;
			} else {
				this.tmp_datas = list;
				this.set_smenu = true;
			}
			this.smenu = false;
		},
		applyClick() {
			var list = this.items.slice();

			this.aMenuClick(list);
			this.sMenuClick(this.tmp_datas);

			this.datas = this.tmp_datas;
		},
	},

	created() {
		this.datas = this.items;
	}
}
</script>

<style scoped>
.fr {
	float: right;
}
.p_15 {
	padding: 15px;
}
.h100 {
	height: 100%;
}
.w120 {
	width: 120px;
}
.dp_ib {
	display: inline-block;
}
</style>

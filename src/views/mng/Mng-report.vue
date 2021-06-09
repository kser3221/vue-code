<template>
	<div class="mng-report">
		<strong>
			주요 알람 선택(그룹 레포트)
		</strong>
		<v-container>
			<v-row>
				<v-checkbox
				  v-model="status"
				  label="장비 상태 알람"
				  color="red"
				  :value="status"
				  hide-details
				  @change="statusAll()"
				></v-checkbox>
				<v-col
				  cols="12"
				  sm="10"
				  md="10"
				>
					<v-checkbox
					  v-model="sel_status"
					  v-for="opt in opt_status"
					  :key="opt.value"
					  :label="opt.text"
					  color="red"
					  :value="opt.value"
					  class="grp_checkbox"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>

			<v-row>
				<v-checkbox
				  v-model="resource"
				  label="자원 알람"
				  color="red"
				  :value="resource"
				  hide-details
				  @change="resourceAll()"
				></v-checkbox>
				<v-col
				  cols="12"
				  sm="10"
				  md="10"
				>
					<v-checkbox
					  v-model="sel_resource"
					  v-for="opt in opt_resource"
					  :key="opt.value"
					  :label="opt.text"
					  color="red"
					  :value="opt.value"
					  class="grp_checkbox"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>

			<v-row>
				<v-checkbox
				  v-model="err"
				  label="장애 알람"
				  color="red"
				  :value="err"
				  hide-details
				  @change="errAll()"
				></v-checkbox>
				<v-col
				  cols="12"
				  sm="10"
				  md="10"
				>
					<v-checkbox
					  v-model="sel_err"
					  v-for="opt in opt_err"
					  :key="opt.value"
					  :label="opt.text"
					  color="red"
					  :value="opt.value"
					  class="grp_checkbox"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>

			<v-row>
				<v-checkbox
				  v-model="popcon"
				  label="POPCONBOX 알람"
				  color="red"
				  :value="popcon"
				  hide-details
				  @change="popconAll()"
				></v-checkbox>
				<v-col
				  cols="12"
				  sm="10"
				  md="10"
				>
					<v-checkbox
					  v-model="sel_popcon"
					  v-for="opt in opt_popcon"
					  :key="opt.value"
					  :label="opt.text"
					  color="red"
					  :value="opt.value"
					  class="grp_checkbox"
					  hide-details
					></v-checkbox>
				</v-col>
			</v-row>

			<v-row
			align="center"
			justify="center"
			>
				<v-col
				  cols="12"
				  sm="4"
				  md="4"
				>
					<v-btn class="pa-2 mr-2" outlined color="indigo" @click="defClick">
					기본값
					</v-btn>

					<v-btn class="pa-2 mr-2" outlined color="indigo" @click="clearClick">
					초기화
					</v-btn>

					<v-btn class="pa-2" outlined color="indigo" @click="saveClick">
					저장
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'MngUser',
	data() {
		return {
			status: false,
			resource: false,
			err: false,
			popcon: false,

			sel_status: [], // Must be an array reference!
        	opt_status: [
				{ text: '전원 겨짐', value: 's_1' },
				{ text: '재시작', value: 's_2' },
				{ text: '업데이트', value: 's_3' },
				{ text: '터널 설정 변경', value: 's_4' },
				{ text: '동작환경 검사', value: 's_5' },
				{ text: '터널 백업 동작', value: 's_6' },
				{ text: '미등록사용자', value: 's_7' },
				{ text: '빈도제한', value: 's_8' },
				{ text: '관리자 잠김', value: 's_9' },
				{ text: 'Master 전환', value: 's_10' },
				{ text: '시간 설정 그룹 만료', value: 's_11' },
			],
			sel_resource: [], // Must be an array reference!
        	opt_resource: [
				{ text: 'CPU 임계치 초과', value: 'r_1' },
				{ text: 'Memory 임계치 초과', value: 'r_2' },
				{ text: 'Session 임계치 초과', value: 'r_3' },
				{ text: '입력 트레픽 임계치 초과', value: 'r_4' },
				{ text: '출력 트래픽 임계치 초과', value: 'r_5' },
				{ text: '과트래픽 발생', value: 'r_6' },
				{ text: '불규칙 회선 감지', value: 'r_7' },
				{ text: '감사증적저장소 임계치 초과', value: 'r_8' },
			],
			sel_err: [], // Must be an array reference!
        	opt_err: [
				{ text: '인터페이스 다운', value: 'e_1' },
				{ text: '모든 인터페이스 다운', value: 'e_2' },
				{ text: '포트다운', value: 'e_3' },
				{ text: '터널 다운', value: 'e_4' },
				{ text: '디스크 검사', value: 'e_5' },
				{ text: '전원이중화 이상 탐지', value: 'e_6' },
			],
			sel_popcon: [], // Must be an array reference!
        	opt_popcon: [
				{ text: 'Popcon P1 USB 연결 성공', value: 'p_1' },
				{ text: 'Popcon P1 USB 연결 해제', value: 'p_2' },
				{ text: 'Popcon P1 전원켜짐', value: 'p_3' },
				{ text: 'Popcon P1 전원꺼짐', value: 'p_4' },
				{ text: 'Popcon 하위장비 전원이상', value: 'p_5' },
				{ text: 'Popcon 하위장비 전원켜짐', value: 'p_6' },
				{ text: 'Popcon 하위장비 전원꺼짐', value: 'p_7' },
				{ text: 'Popcon 하위장비 재시작', value: 'p_8' },
				{ text: 'Popcon 하위장비 연결실패', value: 'p_9' },
			],
		}
	},
	methods: {
		statusAll() {
			this.sel_status = [];
			if(this.status) {
				for(let key in this.opt_status) {
					this.sel_status.push(this.opt_status[key].value);
				}
			}
		},

		resourceAll() {
			this.sel_resource = [];
			if(this.resource) {
				for(let key in this.opt_resource) {
					this.sel_resource.push(this.opt_resource[key].value);
				}
			}
		},

		errAll() {
			this.sel_err = [];
			if(this.err) {
				for(let key in this.opt_err) {
					this.sel_err.push(this.opt_err[key].value);
				}
			}
		},

		popconAll() {
			this.sel_popcon = [];
			if(this.popcon) {
				for(let key in this.opt_popcon) {
					this.sel_popcon.push(this.opt_popcon[key].value);
				}
			}
		},

		defClick: function() {
			this.clearClick();

			this.sel_status.push('s_9');

			this.sel_resource.push('r_1');
			this.sel_resource.push('r_2');
			this.sel_resource.push('r_3');
			this.sel_resource.push('r_8');

			this.sel_err.push('e_1');
			this.sel_err.push('e_2');
			this.sel_err.push('e_4');
		},
		clearClick: function() {
			this.status = false;
			this.resource = false;
			this.err = false;
			this.popcon = false;

			this.sel_status = [];
			this.sel_resource = [];
			this.sel_err = [];
			this.sel_popcon = [];
		},
		saveClick: function() {
			console.log(this.sel_status);
			console.log(this.sel_resource);
			console.log(this.sel_err);
			console.log(this.sel_popcon);
		},
	},
	created() {
		this.defClick();
	}
}
</script>

<style scope>
.grp_checkbox {
	display: inline-block;
	margin-right: 20px;
}
.mr-20 {
	margin-right: 20px;
}
</style>

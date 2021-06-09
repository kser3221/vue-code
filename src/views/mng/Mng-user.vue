<template>
	<v-card
	  class="pa-2"
	>
		<v-container class="mng-setting-mng lighten-5">
			<v-row
			>
				<v-col
				  align-self="center"
				>
					<v-text-field 
					  label="로그인 연속 실패 한계치" 
					  v-model="login_fail"
					></v-text-field>

					<v-text-field 
					  label="이전 패스워드 설정 방지 횟수" 
					  v-model="pwd_fail"
					></v-text-field>

					<v-text-field 
					  label="관리자 타임아웃(초)" 
					  v-model="mng_timeout"
					  type="number"
					></v-text-field>

					<v-textarea
					  label="로그인 실패시 표시할 경고 메세지"
					  v-model="msg"
					></v-textarea>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-btn class="pa-2" outlined color="indigo" @click="saveClick">
				저 장
				</v-btn>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: 'MngSetting-Mng',
	data: () => ({
		login_fail: 10,
		pwd_fail: 2,
		mng_timeout: 300,
		msg: "아이디 또는 패스워드가 틀렸습니다!",
	}),
	methods: {
		saveClick() {
			console.log(this.login_fail);
			console.log(this.pwd_fail);
			console.log(this.mng_timeout);
			console.log(this.msg);
		},
	},
}
</script>

<style scoped>
</style>

<template>
	<v-bottom-navigation
	  :value="activeBtn"
	  color="purple lighten-1"
	>
		<v-btn value="home" to="/">
			<span>Home</span>
			<v-icon>mdi-home</v-icon>
		</v-btn>

		<v-btn value="dashboard" to="dashboard">
			<span>Dashboard</span>
			<v-icon>mdi-monitor-dashboard</v-icon>
		</v-btn>

		<v-btn value="grp" to="grp">
			<span>Group</span>
			<v-icon>mdi-group</v-icon>
		</v-btn>

		<v-btn value="alm" to="alm">
			<span>Alarm</span>
			<v-icon>mdi-alarm</v-icon>
		</v-btn>

		<v-btn value="mng" to="mng">
			<span>Mng</span>
			<v-icon>mdi-content-save-settings-outline</v-icon>
		</v-btn>

		<v-btn value="batch" to="batch">
			<span>Batch</span>
			<v-icon>mdi-database-settings</v-icon>
		</v-btn>

		<v-btn value="lock" to="lock">
			<span>Lock</span>
			<v-icon>mdi-account-lock</v-icon>
		</v-btn>

		<v-btn value="log" to="log">
			<span>Log</span>
			<v-icon>mdi-math-log</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
  export default {
    data () {
      return {
        activeBtn: 'home',
      }
    },
  }
</script>

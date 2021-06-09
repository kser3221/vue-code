<template>
	<vc-donut
	  v-bind="props"
	  :sections="sections"
	  :start-angle="0" :auto-adjust-text-size="true"
	  section-mouseover
	  @section-click="handleSectionClick">
		<small>
			{{ title }}
		</small>
	</vc-donut>
</template>

<script>
export default {
	name: 'DonutChart',
  	props: {
		sections: Array,
		title: String,
	},
	data() {
		return {
			props: {
				size: 185,
				unit: "px",
				thickness: 25,
				hasLegend: false,
				background: "white",
				foreground: "white",
			}
		};
	},
	methods: {
		handleSectionClick(section, event) {
			console.log(`${section.label} clicked.`);
		}
	}
};
</script>

<style scoped>
</style>

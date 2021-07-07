<template>
	<v-treeview
    hoverable
    :items="items"
    item-text="gname"
	></v-treeview>
</template>

<script>
import treeFile from '@/vdata/tree.txt'
import EventBus from '@/EventBus.js'

export default {
	name: 'Tree',
	
	components: {
	},
	data () {
		return {
			tree: [],
			items: [],
		}
	},

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
				if(!grp[0] || grp[0] == '#id') {
					continue;
				}
				obj.id = parseInt(grp[0]);
				obj.gname = grp[1];
				obj.slave = parseInt(grp[2]);
				obj.pid = parseInt(grp[3]);
				obj.pname = grp[4];
				obj.sdate = grp[5];
				obj.week = parseInt(grp[6]);
				obj.month = parseInt(grp[7]);

				if(new_tree.length && obj.pid) {
					var item = this.addItem(obj, new_tree);
				} else {
					new_tree.push(obj);
				}
			}
			console.log(new_tree);
			this.items = new_tree;
		},
		addItem(obj, items = null) {
			if(!items) {
				console.log(items);
				items = this.items;
			}

			return items.map((item) => {

				if(item.id === obj.pid) {
					if(!item.children) {
						this.$set(item, "children", []);
					}
					item.children.push(obj);
					return;
				}

				if(item.children) {
					return this.addItem(obj, item.children);
				}
			});
		},
		editItem(obj, items = null) {
			if(!items) {
				console.log(items);
				items = this.items;
			}

			return items.map((item) => {

				if(item.id === obj.id) {
					item = obj;
					return;
				}

				if(item.children) {
					return this.editItem(obj, item.children);
				}
			});
		},
		delItem(obj, items = null) {
			if(!items) {
				console.log(items);
				items = this.items;
			}


			return items.map((item) => {

				if(item.id === obj.id) {
					var ind = items.indexOf(items.filter(d => {
						if(d.id == obj.id ) {
							return d;
						}
					})[0]);
					console.log(ind);
					if(ind != -1) {
						items[ind].sclice(ind, 1);
					}
					return;
				}

				if(item.children) {
					return this.delItem(obj, item.children);
				}
			});
		},
		findItem(id, items = null) {
			if(!items) {
				items = this.items;
			}

			return items.reduce((acc, item) => {
				if(acc) {
					return acc;
				}

				if(item.id === id) {
					return item;
				}

				if(item.children) {
					return this.findItem(id, item.children);
				}
			});
		}
	},
	
	created() {
		this.getTree(treeFile);

		EventBus.$on('tree_update', status, val => {
			if(status == "add") {
				this.addItem(val, this.items);
			} else if(status == "edit") {
				this.editItem(val, this.items);
			} else if(status == "del") {
				this.delItem(val, this.items);
			}
		});
	}
}
</script>

<style scoped>
.popup {
	width: 620px;
}
</style>

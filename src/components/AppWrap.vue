<template>
	<div class="todoapp">
		<h1 class="header">todos</h1>
		<input-component :todos="todos" class="new-todo"></input-component>
		<task-list :todos="todos"></task-list>
	</div>
</template>

<script>
 import InputComponent from './InputComponent.vue';
 import TaskList  from './TaskList.vue';
 import DataService from '../utils/data-service.js';

 export default {
 	name: 'AppWrap',
 	components: {
 		InputComponent,
 		TaskList
 	},
 	data() {
 		return {
 			todos: this.$store.getters.todos,
 		}
 	},
 	async mounted() {
 		try {
 			const data = await DataService.fetch();
 			for (let el in data) {
 				this.$store.dispatch('fetchTodo', {...data[el], id:el });
 			}

 		} catch(err) {
 			console.log(err);
 		}
 	}
 }
</script>
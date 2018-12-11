<template>
	<div>
		<section v-show='todos.length' class="main">
			<ul class="todo-list">
				<li v-for="todo in filteredTodos"  
				class="todo"
				:class="{ completed: todo.done, editing: todo == editedTodo }">
					<task-item :todo="todo"></task-item>
				</li>
			</ul>
		</section>
		<footer class="footer" v-show="todos.length" v-cloak>
		    <span class="todo-count">
		      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
		    </span>
		    <ul class="filters">
		      <li><a @click="visibility='all'" :class="{ selected: visibility == 'all' }">All</a></li>
		      <li><a @click="visibility='active'"  :class="{ selected: visibility == 'active' }">Active</a></li>
		      <li><a @click="visibility='completed'" :class="{ selected: visibility == 'completed' }">Completed</a></li>
		    </ul>
		    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
		      Clear completed
		    </button>
		  </footer>
	</div>
</template>

<script>
 import TaskItem  from './TaskItem.vue';
 import DataService from '../utils/data-service.js';

 export default {
 	name: 'TaskList',
 	components: {
 		TaskItem
 	},
 	props: {
 		todos: Array,
 	},
 	data() {
 		return {
 			visibility: 'all',
 			filters: {
			  all: function (todos) {
			    return todos
			  },
			  active: function (todos) {
			    return todos.filter(function (todo) {
			      return !todo.done
			    })
			  },
			  completed: function (todos) {
			    return todos.filter(function (todo) {
			      return todo.done
			    })
			  }
			},
 		}
 	},
 	methods: {
 		removeTodo(todo) {
 			 this.$store.dispatch('removeTodo', todo);
 			 DataService.delete(todo.id);
 		},
 		removeCompleted() {
 			this.filters.completed(this.todos).forEach((todo) => {
 				DataService.delete(todo.id);
 				this.$store.dispatch('removeTodo', todo)}
 			);
 		}
 	},
 	computed: {
 		filteredTodos() {
 			return this.filters[this.visibility](this.todos);
 		},
 		remaining() {
 			return this.filters.active(this.todos).length;
 		},
 		editedTodo() {
 			return this.$store.getters.editTodo;
 		},
 	},
 	filters: {
    	pluralize: function (n) {
      		return n === 1 ? 'item' : 'items'
    }
  },
 }
</script>


<template>
	<div :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.done" @change="toggle">
          <label  @dblclick="editTodo(todo)" >{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
	</div>
</template>

<script>
 import DataService from '../utils/data-service.js';

 export default {
 	name: 'TaskItem',
 	props: {
 		todo: Object,
 	},
 	data() {
 		return {
 			beforeEditCache: ''
 		}
 	},
 	methods: {
 		toggle(){
 			DataService.edit(this.todo.id, this.todo);
 		},
 		removeTodo(todo) {
 			 this.$store.dispatch('removeTodo', todo);
 			 DataService.delete(todo.id);
 		},
 		editTodo(todo) {
 			this.beforeEditCache = todo.title;
 			this.$store.dispatch('editTodo', todo);
 		},
 		doneEdit(todo) {
	      if (!this.editedTodo) {
	        return
	      }
	 	  DataService.edit(this.editedTodo.id, this.editedTodo);
	      this.$store.dispatch('doneEdit', todo);
	      todo.title = todo.title.trim()
	      if (!todo.title) {
	        this.removeTodo(todo)
	      }
	    },
	    cancelEdit(todo) {
	      this.$store.dispatch('doneEdit', todo);
	      todo.title = this.beforeEditCache
	    },
 	},
 	computed: {
 		editedTodo() {
 			return this.$store.getters.editTodo;
 		}
 	},
 	directives: {
	    'todo-focus'(el, binding) {
	      if (binding.value) {
	        el.focus()
	      }
	    }
	},
 }
</script>


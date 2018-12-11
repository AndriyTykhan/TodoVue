<template>
	<div class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" @change="editAll">
    <label for="toggle-all">Mark all as complete</label>
		<input class="new-todo"
	      autofocus autocomplete="off"
	      placeholder="What needs to be done?"
	      v-model="newTodo"

	      @keyup.enter="addTodo">
	</div>
</template>

<script>
 import DataService from '../utils/data-service.js';

 export default {
 	name: 'InputComponent',
  props: {
    todos: Array,
  },
  data() {
    return {
      newTodo: ''
    }
  },

 	methods: {
    addTodo() {
      if (!this.newTodo) return;
      this.$store.dispatch('addTodo', this.newTodo);
      DataService.add({
        title: this.newTodo,
        done: false
      });
      this.newTodo = '';
    },
    editAll() {
      this.todos.forEach((todo) => {
        todo.done = !todo.done;
        DataService.edit(todo.id, todo);
      });
    }
  },
 }
</script>
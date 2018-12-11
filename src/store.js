import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	todos: [],
    editTodo: null
  },

  mutations: {
  	ADD_TODO(state, todo) {
  		state.todos.push({
  			title: todo,
  			done: false,
  		});
  	},
    FETCH_TODO(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        done: todo.done
      });
    },
  	EDIT_TODO(state, todo) {
  		state.editTodo = todo
  	},
    DONE_EDIT(state, todo) {
      state.editTodo = null;
      todo.title = todo.title.trim()
    },
    CANCEL_TODO(state, todo) {
      state.editTodo = null;
    },
  	REMOVE_TODO(state, todo) {
  		const todos = state.todos;
  		todos.splice(todos.indexOf(todo), 1);
  	},
  },

  actions: {
   	addTodo({ commit }, todo) {
    	commit('ADD_TODO', todo);
   	},
    fetchTodo({ commit }, todo) {
      commit('FETCH_TODO', todo);
    },
   	editTodo({ commit }, todo) {
    	commit('EDIT_TODO', todo);
   	},
    doneEdit({ commit }, todo) {
      commit('DONE_EDIT', todo);
    },
    cancleTodo({ commit }, todo) {
      commit('CANCEL_TODO', todo);
    },
   	removeTodo({ commit }, todo) {
    	commit('REMOVE_TODO', todo);
   	},
  },

  getters: {
    todos: state => state.todos,
    editTodo: state => state.editTodo
  },
});

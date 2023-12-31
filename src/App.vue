<script>
import StatusFilter from './components/StatusFilter.vue'
import TodoItem from '@/components/TodoItem.vue';
import { createTodos, deleteTodo, getTodos, updateTodo } from '@/api/todos';
import ErrorMessage from '@/components/ErrorMessage.vue';
export default {
  components: {
    ErrorMessage,
    TodoItem,
    StatusFilter,

  },
  data() {
    return {
      todos: [],
      title: '',
      status: 'all',
      errorMessage: '',
    }
  },
  computed: {
    activeTodos() {
      return this.todos.filter(todo => !todo.completed)
    },
    completedTodos() {
      return this.todos.filter(todo => todo.completed)
    },
    visibleTodos() {
      switch (this.status) {
        case 'active':
          return this.activeTodos;
        case 'completed':
          return this.completedTodos;
        default:
          return this.todos;
      }
    }
  },
  mounted() {
    getTodos()
      .then(({ data }) => {
        this.todos = data;
      })
      .catch(() => {
        this.$refs.errorMessage.show('Unable to add todos');
      })
  },
  methods: {
    handleSubmit() {
      createTodos(this.title).then(({ data }) => {
        this.todos.push(data)
      })

      this.title = ''
    },
    updateTodo({ id, title, completed }) {
      updateTodo({ id, title, completed })
        .then(({ data }) =>
          this.todos = this.todos
            .map(todo => data.id === todo.id ? data : todo)
        )
    },
    deleteTod(id) {
      deleteTodo(id).then(() =>
        this.todos = this.todos.filter(todo => todo.id !== id)
      )
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
  },
}
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button class="todoapp__toggle-all" :class="{ active: activeTodos.length === 0 }"></button>

        <form @submit.prevent="handleSubmit">
          <input
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
            v-model="title"
          />
        </form>
      </header>

      <TransitionGroup
        name="list"
        tag="section"
        class="todoapp__main"
      >
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo"
          @delete="deleteTod(todo.id)"
        />
      </TransitionGroup>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{ activeTodos.length }} items left
        </span>

        <StatusFilter v-model="status" />

        <button
          class="todoapp__clear-completed"
          v-if="activeTodos.length > 0"
          @click="clearCompleted"
        >
          Clear completed
        </button>
      </footer>
    </div>

    <ErrorMessage
      class="is-warning"
      :active="!errorMessage"
      ref="errorMessage"
    >
      <template #default="{ text }">
        <p>{{ text }}</p>
      </template>

      <template #header>
        <p>Server Error</p>
      </template>
    </ErrorMessage>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
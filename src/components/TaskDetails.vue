<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i
          @click="taskStore.deleteTask(task.id)"
          class="material-icons">
        delete</i>
      <i
          @click="taskStore.changeFav(task.id)"
          class="material-icons"
          :class="{active : task.isFav}"
      >
        favorite</i>
    </div>
  </div>
</template>
<script>
import {useTaskStore} from "@/store/TaskStore";

export default {
  name:'TaskDetails',
  props: [ 'task' ],
  setup(){
    const taskStore = useTaskStore();

    // removeTask(id){
    //   this.taskStore.deleteTask(id)
    //   console.log(id)
    // }

    return {taskStore}
  },
  methods: {
  }
}
</script>

<style>
li{
  list-style: none;
  display: inline;
  margin-right: 10px;
}
</style>
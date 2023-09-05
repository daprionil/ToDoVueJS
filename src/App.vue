<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref, watch, computed } from 'vue';

import Header from './components/Header.vue';
import FormTasks from './components/FormTasks.vue';
import Message from './components/Message.vue';
import Task from './components/Task.vue';

import { getStorageValue, setStorageValue } from './utils/storage';

const NAME_STORAGE_TASK = 'storage_tasks';

const textForm = ref('');
const allTasks = ref(getStorageValue(NAME_STORAGE_TASK) ?? []);
const errorMessage = ref(null);

const handleChangeTextForm = (evt) => {
   textForm.value = evt.target.value;
};

const handleSubmitTasks = evt => {
   evt.preventDefault();

   const textTask = textForm.value;
   if (!(textTask.length <= 10)) {
      errorMessage.value = null;
      addTask(textTask);
      resetForm();
      return;
   }
   errorMessage.value = 'Debes de Agregar una tarea con más de 10 carácteres'
};

//Reset form
const resetForm = () => {
   textForm.value = '';
};

//Add new task in allTask
const addTask = (text) => {
   const task = {
      task: text.trim(),
      taskId: uuidv4(),
      finished: false
   }

   //Change state of allTasks
   allTasks.value = [...allTasks.value, task];
};

//Change Finished property in one task
const completeTask = (idTask) => {
   const currentTasks = allTasks.value;

   //Change state of allTasks
   allTasks.value = currentTasks.map(task => {
      // Search task by taskId
      if (idTask === task.taskId) {
         // Modified task if the task exist
         const modifiedTask = {
            ...task,
            finished: !task.finished
         };

         return modifiedTask;
      };

      return task;
   });
};

//! Function to Event in render Task to Delete Task
const deleteTask = ({taskId}) => {
   const newArrayAfterDeletedTask = allTasks.value.filter(({taskId: idTask}) => (
      idTask !== taskId
   ));
   
   allTasks.value = newArrayAfterDeletedTask;
};

watch([allTasks], () => {
   setStorageValue(NAME_STORAGE_TASK, JSON.stringify(allTasks.value));
});

const tasksCompleted = computed(() => {
   return allTasks.value.filter(({finished}) => finished);
});

const uncompletedTasks = computed(() => {
   return allTasks.value.filter(({finished}) => !finished);
});

</script>

<template>
   <div class="max-w-lg py-4 m-5 mx-auto bg-gray-100 shadow">
      <Header />
      <div class="p-4 border-b-2 border-gray-200">
         <h1 class="text-xl font-bold">Create Tasks</h1>
         <FormTasks :textForm="textForm" :handleChangeText="handleChangeTextForm" @handleSubmitTasks="handleSubmitTasks" />
         <Message :textMessage="errorMessage" typeMessage="error" v-if="errorMessage"/>
      </div>
      <div class="p-4 border-b-2 border-gray-300">
         <h1 class="text-xl font-bold">Tasks</h1>
         <ul>
            <Task
               v-if="!!allTasks.length"
               v-for="task of uncompletedTasks"
               @clickDeleteTask="deleteTask"
               @completedChangeTask="completeTask"
               :key="task.taskId"
               :task="task"
            />
            <li v-else>
               <Message textMessage="No hay tareas aún, Agrega una" />
            </li>
         </ul>
      </div>
      <div class="p-4 space-y-2">
         <h1 class="text-xl font-bold">Completed Task</h1>
         <Task
            v-if="!!tasksCompleted.length"
            v-for="task of tasksCompleted"
            @clickDeleteTask="deleteTask"
            @completedChangeTask="completeTask"
            :key="task.taskId"
            :task="task"
         />
         <Message v-else text-message="Anímate a terminar una de tus tareas"/>
      </div>
   </div>
</template>
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
   
   const modeForm = ref(false);
   let taskEdit = {};

   const handleChangeTextForm = (evt) => {
      textForm.value = evt.target.value;
   };

   const handleSubmitTasks = evt => {
      evt.preventDefault();

      const textTask = textForm.value;
      if (!(textTask.length <= 10)) {
         errorMessage.value = null;
         
         //If modeForm is false = createTask
         if(!modeForm.value){
            addTask(textTask);
         }

         //If modeForm is true = editTask
         if(modeForm.value){
            const taskModified = {
               ...taskEdit,
               task: textForm.value.trim()
            };

            editTask(taskModified);
         }

         //Reset all values in form
         resetForm();
         return;
      }
      errorMessage.value = 'Debes de Agregar una tarea con más de 10 carácteres'
   };

   //Reset form
   const resetForm = () => {
      textForm.value = '';
      taskEdit = {};
      modeForm.value = false;
   };

   //Edit mode form
   const changeModeToEditTask = (task) => {
      taskEdit = task;
      textForm.value = task.task;
      modeForm.value = true;
   };

   //! This watch is execute when allTask si modified
   watch([allTasks], () => {
      setStorageValue(NAME_STORAGE_TASK, JSON.stringify(allTasks.value));
   });

   // Extract to reactive conduct the completed Tasks
   const tasksCompleted = computed(() => {
      return allTasks.value.filter(({finished}) => finished);
   });

   // Extract to reactive conduct the uncomplete Tasks
   const uncompletedTasks = computed(() => {
      return allTasks.value.filter(({finished}) => !finished);
   });

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

   //Edit task with new params of value
   const editTask = (taskModified) => {
      const idTaskModified = taskModified.taskId;

      allTasks.value = allTasks.value.map((task) => {
         if(idTaskModified === task.taskId){
            return taskModified;
         }
         return task;
      });
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
</script>

<template>
   <div class="max-w-lg py-4 m-5 mx-auto bg-gray-100 shadow">
      <Header />
      <div class="p-4 border-b-2 border-gray-200">
         <h1 class="text-xl font-bold">{{modeForm ? 'Edit Task' :'Create Tasks'}}</h1>
         <FormTasks
            :textForm="textForm"
            :handleChangeText="handleChangeTextForm"
            :modeForm="modeForm"
            @handleSubmitTasks="handleSubmitTasks"
         />
         <Message :textMessage="errorMessage" typeMessage="error" v-if="errorMessage"/>
      </div>
      <div class="p-4 border-b-2 border-gray-300">
         <h1 class="text-xl font-bold">Tasks</h1>
         <ul class="[&>*:nth-child(even)]:bg-gray-200 space-y-2 [&>*:nth-child(even)]:bg-opacity-75">
            <Task
               v-if="!!allTasks.length"
               v-for="task of uncompletedTasks"
               @clickDeleteTask="deleteTask"
               @completedChangeTask="completeTask"
               @editTaskClick="changeModeToEditTask"
               :key="task.taskId"
               :task="task"
            />
            <li v-else>
               <Message textMessage="No hay tareas aún, Agrega una" />
            </li>
         </ul>
      </div>
      <div
         v-if="!!allTasks.length"
         class="p-4 space-y-2">
         <h1 class="text-xl font-bold">Completed Task</h1>
         <ul class="[&>*:nth-child(even)]:bg-gray-200 space-y-2 [&>*:nth-child(even)]:bg-opacity-75">
            <Task
               v-if="!!tasksCompleted.length"
               v-for="task of tasksCompleted"
               @clickDeleteTask="deleteTask"
               @completedChangeTask="completeTask"
               @editTaskClick="changeModeToEditTask"
               :key="task.taskId"
               :task="task"
            />
            <Message v-else text-message="Anímate a terminar una de tus tareas"/>
         </ul>
      </div>
   </div>
</template>
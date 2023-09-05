<script setup>
    defineProps({
        task: Object,
        completedChangeTask: Function
    })
</script>
<template>
    <li class="relative grid [grid-template-columns:.1fr_.7fr_.2fr] items-center p-2 space-x-3 group">
        <button v-on:click="$emit('completedChangeTask', task.taskId)" class="flex items-center justify-center w-5 h-5 font-bold transition duration-300 ease-in transform scale-100 bg-gray-300 rounded-sm shadow cursor-pointer group hover:scale-105">
            <span v-if="task.finished" class="font-extrabold text-green-600 ">&#10003;</span>
            <span v-else class="text-black transition duration-200 ease-out opacity-0 group-hover:opacity-70">&#10003;</span>
        </button>
        <p class=" break-all">{{task.task}}</p>
        <div class="right-0 flex items-center space-x-3 transition duration-300 ease-out opacity-0 group-hover:opacity-100 justify-self-end">
            <button
                class="px-2 py-1 text-blue-600 transition duration-300 ease-in-out rounded-md shadow hover:text-gray-700 drop-shadow"
                @click="$emit('clickDeleteTask', {taskId: task.taskId})"
            >
                <font-awesome-icon :icon="['fas','trash']"/>
            </button>
            <button
                @click="$emit('editTaskClick', task)"
                class="px-2 py-1 text-blue-600 transition duration-300 ease-in-out rounded-md shadow hover:text-blue-800 drop-shadow">
                <font-awesome-icon :icon="['fas','file-pen']"/>
            </button>
        </div>
    </li>
</template>
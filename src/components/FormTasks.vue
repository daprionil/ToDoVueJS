<script setup>
  const props = defineProps({
    textForm: String,
    handleChangeText: Function
  });

</script>
<template>
    <form v-on:submit="evt => $emit('handleSubmitTasks',evt)">
        <label class="flex items-center justify-center space-x-2 flex-nowrap">
          <input
            type="text"
            placeholder="Añade una nota"
            :value="textForm"
            v-on:input="handleChangeText"
          >
          <button
            class="flex items-center justify-center w-10 h-8 transition duration-200 transform bg-gray-300 rounded-sm shadow hover:scale-105"
            type="submit"
          >
            <span class="font-bold text-white drop-shadow">+</span>
          </button>
        </label>
      </form>
</template>
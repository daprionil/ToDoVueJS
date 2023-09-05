<script setup>
  const props = defineProps({
    textForm: String,
    handleChangeText: Function,
    modeForm: Boolean
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
            <span class="font-bold text-white drop-shadow">
              <font-awesome-icon class="text-blue-500" title="Confirmar Edición" v-if="modeForm" :icon="['fas','file-pen']"/>
              <strong v-else>+</strong>
            </span>
          </button>
        </label>
      </form>
</template>
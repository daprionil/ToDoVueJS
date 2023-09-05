<script setup>
    defineProps({
        typeMessage: String,
        textMessage: String
    })
    const typesMessage = {
        error: 'bg-red-600 text-white',
        success:'bg-green-700 text-white'
    }
</script>
<template>
    <p :class="`p-2 rounded-sm  text-center font-bold ${typesMessage[typeMessage] ??  'text-black bg-slate-200'}`">
        {{textMessage}}
    </p>
</template>
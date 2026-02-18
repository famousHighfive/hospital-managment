<script setup>
defineProps({
    modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>

<template>
    <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">

            <button class="absolute top-3 right-3 text-gray-500" @click="$emit('update:modelValue', false)">
                ✕
            </button>

            <slot />
        </div>
    </div>
</template>

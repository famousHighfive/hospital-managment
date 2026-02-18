<script setup>
import Header from '@/layouts/Header.vue';
import SideBar from '@/layouts/SideBar.vue';



</script>

<template>
    <div class="flex bg-gray-100 min-h-screen">
        <SideBar />

        <div class="flex-1 flex flex-col">
            <Header />

            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>
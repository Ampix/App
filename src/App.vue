<script setup lang="ts">
let page = 'welcome'
</script>

<template>
    <div class="grid 2xl:grid-cols-8 grid-cols-4">
        <div class="bg-slate-500 h-screen grid">
            <div class="flex flex-col justify-center items-center">
                <img
                    src="https://cdn.discordapp.com/avatars/440489260345458690/c85d6d2424e4266fb4d3196acdeb422e?size=1024"
                    alt="Profpic"
                    class="rounded-full w-fit h-fit px-5 drop-shadow-xl mt-3 pointer-events-none"
                />
                <h1 class="text-white font-bold text-3xl drop-shadow-xl">
                    HVCsano
                </h1>
            </div>
            <div
                class="text-white text-3xl text-center child:py-5 child:bg-slate-600 flex flex-col justify-end child:mb-5 child:cursor-pointer font-bold child-hover:bg-slate-400 child-hover:-translate-y-2 child:mx-3 child:rounded-xl child:drop-shadow-xl child:transition-all child:duration-200"
            >
                <button>Kezdőlap</button>
                <button>Hírek</button>
                <button>Minecraft</button>
                <button>Beállítások</button>
            </div>
        </div>
        <div
            v-if="page === 'welcome'"
            class="w-full col-span-3 m-auto text-center items-center justify-center 2xl:col-span-7"
        >
            <h1 class="text-white text-5xl">Üdvözöllek az új Ampix Appban!</h1>
            <h2 class="text-gray-300 text-xl">
                Mielőtt bármit is csinálnál, egy pár dolgot be kellene
                állítanod!
            </h2>
            <button
                class="text-white bg-blue-600 text-4xl py-1 px-3 rounded-xl font-bold m-2 hover:bg-blue-400 hover:text-gray-100 transition-all"
            >
                Kezdjük
            </button>
        </div>
    </div>
</template>

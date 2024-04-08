<script lang="ts">
    let text = 'Frissítés keresése'
    let loadtext = true
    let loading = true
    let data: { username: string; id: string } = {
        id: '2d27308ccd8a42b0badcbf6d5d2eb59c',
        username: 'HVCsano',
    }
    window.electron.ipcRenderer.on('update-van', () => {
        text = 'Frissítés letöltésének megkezdése'
    })
    window.electron.ipcRenderer.on('update-tölt', (_ev, arg) => {
        text = `Frissítés letöltése ${arg}%`
    })
    window.electron.ipcRenderer.on('update-nincs', () => {
        text = 'Nincs frissítés'
    })
    window.electron.ipcRenderer.on('setloadtext', (_ev, arg) => {
        text = arg
    })
    window.electron.ipcRenderer.on('hideloadtext', () => {
        loading = false
    })
    window.electron.ipcRenderer.on('getdata', (_ev, arg) => {
        data = arg
    })
</script>

{#if loading}
    <div class="h-screen flex">
        <div class="m-auto text-center">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
            {#if loadtext}
                <h1 class="text-white font-bold">{text}</h1>
            {/if}
        </div>
    </div>
{:else}
    <div class="bg-gray-900 flex justify-end items-center gap-4">
        <h1 class="font-bold text-xl text-white">
            {data.username}
        </h1>
        <img src={`https://mc-heads.net/avatar/${data.id}/32`} alt="" />
    </div>
    <div class="flex gap-4 mt-4 ml-4">
        <div class="bg-gray-900 w-[200px] h-[200px] text-center">
            <h1 class="font-bold text-xl bg-gray-600 mb-10 text-white">
                Ampix SMP
            </h1>
            <button
                class="bg-green-500 text-white font-bold m-auto uppercase p-2 rounded-xl hover:bg-green-700 transition-all duration-200"
                >Játék</button
            >
        </div>
    </div>
{/if}

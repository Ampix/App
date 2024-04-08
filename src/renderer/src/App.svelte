<script lang="ts">
    let text = 'Frissítés keresése'
    let loadtext = true
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
        loadtext = false
    })
</script>

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

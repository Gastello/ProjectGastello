let gear = document.querySelector('.db-gear');
let gamesSettingsCross = document.querySelector('.games-settings__cross');
let gamesSettingsWrapper = document.querySelector('.games-settings__wrapper');
let gamesSettingsFolders = document.querySelector('.games-settings__folders').children;

gear.onclick = () => {
    openModalWindow(gamesSettingsWrapper);
}

const allPacks = document.querySelector('#all-packs');
for (let folder of gamesSettingsFolders) {
    folder.onclick = (e) => {
        if (e.currentTarget == allPacks && e.currentTarget.classList.contains('active-folder')) {
            for (const el of gamesSettingsFolders) {
                el.classList.remove('active-folder');
            }
        }
        else if (e.currentTarget == allPacks) {
            for (const el of gamesSettingsFolders) {
                el.classList.add('active-folder');
            }
        }
        else {
            folder.classList.toggle('active-folder');
            allPacks.classList.remove('active-folder');
        }
    }
}
gamesSettingsCross.onclick = () => {
    closeModalWindow(gamesSettingsWrapper);
}

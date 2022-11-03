import { storageService } from './storage.service.js'


export const locService = {
    getLocs,
    getLocsForDisplay,
    getCurrLock,
    setCurrLock,
    addLocToLocsArry,
    deleteLocation
}




var gCurrLoc

const LOCS_KEY = 'locsDB'

let gLocs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


//פה צריך לעשות פונקציה של קבלת השם של המיקום לפי המיקום שנשלח אליו



function getLocsForDisplay() {
    let locs = storageService.loadFromStorage(LOCS_KEY)
    if (!locs || !locs.length ){
        locs = [{ name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }]
    }
    gLocs = locs
    storageService.saveToStorage(LOCS_KEY, locs)
    return locs
}

function getCurrLock() {
    return gCurrLoc
}

function setCurrLock(pos) {
    gCurrLoc = pos
}

function addLocToLocsArry(name, lat, lng) {
    gLocs.push({name, lat, lng})
    storageService.saveToStorage(LOCS_KEY, gLocs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs)
        }, 2000)
    })
}

function deleteLocation(idx){
    gLocs.splice(idx,1)
    storageService.saveToStorage(LOCS_KEY, gLocs)
}



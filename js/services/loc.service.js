export const locService = {
    getLocs,
    getLocsForDisplay,
    getCurrLock,
    setCurrLock,
    addLocToLocsArry
}



var gCurrLoc

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


//פה צריך לעשות פונקציה של קבלת השם של המיקום לפי המיקום שנשלח אליו



function getLocsForDisplay() {
    return locs
}

function getCurrLock() {
    return gCurrLoc
}

function setCurrLock(pos) {
    gCurrLoc = pos
}

function addLocToLocsArry(name, lat, lng) {
    locs.push({name, lat, lng})
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}



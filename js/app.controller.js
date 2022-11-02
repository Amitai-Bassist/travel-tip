import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearchPlace = onSearchPlace

function onInit() {
    mapService.initMap()
    .then(() => {
            console.log('Map is ready')
            getPosition()
            .then(mapService.setUserLocation)
            .then(mapService.getUserPosition2)
            .then((res)=>{
                onPanTo(res)
                onAddMarker(res)
            
            })
            .then(addClickEvent)
        })
        .catch(() => console.log('Error: cannot init map'))
    
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(pos) {
    console.log('Adding a marker')
    mapService.addMarker({ lat: pos.lat, lng: pos.long})
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            // console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText = 
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(pos) {
    console.log('Panning the Map')
    mapService.panTo(pos.lat, pos.long)
}

function onSearchPlace(ev){
    ev.preventDefault()
    console.log('hi');
}

function addClickEvent(){
    
}
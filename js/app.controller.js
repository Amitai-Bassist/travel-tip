import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearchPlace = onSearchPlace
window.onClickAddPlace = onClickAddPlace
window.onDeleteLocation = onDeleteLocation



function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            getPosition()
                .then(mapService.setUserLocation)
                .then(mapService.getUserPosition2)
                .then((res) => {
                    onPanTo(res)
                    onAddMarker(res)
                    return res
                })
                .then((res) => {
                    console.log('res', res);
                    var map = mapService.getMap()
                    map.addListener('click', onEddPlace)
                })
                .then(addClickEvent)
        })
        .catch(() => console.log('Error: cannot init map'))
        renderLocs()
        mapService.getNameOfPos()
            .then(res => {
                console.log(res);
                // document.querySelector('.try').innerText(res) // למה זה אומר שזה לא מאותחל?
            })
}

function renderLocs() {
    var locs = locService.getLocsForDisplay()
    
    var txt =  locs.map((loc,idx) => `
    <li>
        name: ${loc.name}
        lat: ${loc.lat}, lng: ${loc.lng}
        <button class="btn go-location" onclick="onGoToLocation('${idx}')">Go➡</button>
        <button class="delete-location" onclick="onDeleteLocation('${idx}')">❌</button>
    </li>
    `).join('')

    var strHtml = '<ul>'
    strHtml += txt
    strHtml += `</ul>`

    document.querySelector('.my-locations').innerHTML = strHtml
}

function onClickAddPlace() {

    var gCurrLoc = locService.getCurrLock()
    var name = prompt('Enter the name of the loc')

    locService.addLocToLocsArry(name,   gCurrLoc.lat,  gCurrLoc.lng)
    renderLocs()
    document.querySelector('.add-place').classList.add('hide')
    
}

function onEddPlace(ev) {
    var lat = ev.latLng.lat()
    var lng = ev.latLng.lng()

    //פה אני אתפוס את הכפתור ואשנה את הדיספליישלו, 
    document.querySelector('.add-place').classList.remove('hide')
    document.querySelector('.add-place').hidden = false
    //צריך לעשות את המיקום הנוכחי למיקום הזה
    locService.setCurrLock({ lat, lng })


    mapService.addMarker({ lat, lng })
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
    mapService.addMarker({ lat: pos.lat, lng: pos.long })
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

function onSearchPlace(ev) {
    ev.preventDefault()
    console.log('hi');
}

function onDeleteLocation(idx){
    locService.deleteLocation(idx)
    renderLocs()
    console.log('hi we are here');
}
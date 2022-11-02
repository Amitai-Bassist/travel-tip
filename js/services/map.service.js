export const mapService = {
    initMap,
    addMarker,
    panTo,
    setUserLocation,
    getUserPosition2,
    getMap, //
    getNameOfPos
}


// Var that is used throughout this Module (not global)
var gMap
var gUserPosition

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
}


//פה צריך לעשות פונקציה של קבלת השם של המיקום לפי המיקום שנשלח אליו
function getNameOfPos(pos) {
    const API_GEOCODING = 'AIzaSyBMKODDYL-yKhFtNjksLEA8NFBTQB9pwH4'
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_GEOCODING}`
    // var url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBMKODDYL-yKhFtNjksLEA8NFBTQB9pwH4`
    //פה צריך פרומיס כדי לקבל את המיקום מ api

    return axios.get(url)
        .then(({ data }) => {
            console.log('data:',data.results[0].address_components[0].long_name);
            //בעצם פה אני מחזירה את השם של מיקום כרגע קבוע מראש
            return data.results[0].address_components[0].long_name
        })
}


function getMap() {//
    return gMap
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCtskw6y_vnkFuS7XxgO39Tbz4eZG7UcZQ' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function setUserLocation(res){
    gUserPosition = {lat: res.coords.latitude,long: res.coords.longitude}
    console.log('res',gUserPosition)
}

function getUserPosition2(){
    return gUserPosition
}
function overlay (imagesrc) { 
    var overlayElem = document.getElementById('overlay')
    var overlayImage = document.getElementById('overlayImage')
    var tint = document.getElementById('tint')

    overlayElem.hidden = false
    overlayImage.hidden = false
    overlayImage.src = imagesrc
    tint.hidden = false
}

function hideOverlay (e) {
    var overlayElem = document.getElementById('overlay')
    var overlayImage = document.getElementById('overlayImage')
    var tint = document.getElementById('tint')

    overlayElem.hidden = true
    overlayImage.hidden = true
    tint.hidden = true
}
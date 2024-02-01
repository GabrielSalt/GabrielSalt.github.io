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

function centreButtons(e) {
    var box = document.querySelector('#centreimg')
    
    if (e.offsetX / box.offsetWidth > 79 / 441 && e.offsetX / box.offsetWidth < 175 / 441){
        if (e.offsetY / box.offsetHeight > 10 / 630 && e.offsetY / box.offsetHeight < 110 / 630){
            console.log('about')
        }
    }

    if (e.offsetX / box.offsetWidth > 156 / 441 && e.offsetX / box.offsetWidth < 211 / 441){
        if (e.offsetY / box.offsetHeight > 389 / 630 && e.offsetY / box.offsetHeight < 526 / 630){
            window.location.href = '/contact.html';
        }
    }

    if (e.offsetX / box.offsetWidth > 299 / 441 && e.offsetX / box.offsetWidth < 415 / 441){
        if (e.offsetY / box.offsetHeight > 552 / 630 && e.offsetY / box.offsetHeight < 603 / 630){
            window.location.href = '/gallery.html';
        }
    }
}
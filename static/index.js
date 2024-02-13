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
    document.getElementById('overlay').hidden = true
    document.getElementById('overlayImage').hidden = true
    document.getElementById('tint').hidden = true
    document.getElementById('overlayGallery').hidden = true
    document.getElementById('overlayAbout').hidden = true
    document.getElementById('overlayUpdates').hidden = true

}

function centreButtons(e) {
    var box = document.querySelector('#centreimg')
    
    // 235, 0 -> 540, 300
    if (e.offsetX / box.offsetWidth > 235 / 1366 && e.offsetX / box.offsetWidth < 540 / 1366){
        if (e.offsetY / box.offsetHeight > 0 / 1894 && e.offsetY / box.offsetHeight < 300 / 1894){
            overlayVideo()
        }
    }

    // 915, 1675 -> 1280, 1840
    if (e.offsetX / box.offsetWidth > 915 / 1366 && e.offsetX / box.offsetWidth < 1280 / 1366){
        if (e.offsetY / box.offsetHeight > 1675 / 1894 && e.offsetY / box.offsetHeight < 1840 / 1894){
            overlayUpdates()
        }
    }

    // 15, 1655 -> 345, 1850
    if (e.offsetX / box.offsetWidth > 15 / 1366 && e.offsetX / box.offsetWidth < 345 / 1366){
        if (e.offsetY / box.offsetHeight > 1655 / 1894 && e.offsetY / box.offsetHeight < 1850 / 1894){
            overlay("static/images/Philanthropy.png")
        }
    }

    // 480, 1170 -> 650, 1600
    if (e.offsetX / box.offsetWidth > 480 / 1366 && e.offsetX / box.offsetWidth < 650 / 1366){
        if (e.offsetY / box.offsetHeight > 1170 / 1894 && e.offsetY / box.offsetHeight < 1600 / 1894){
            window.location.href = '/contact.html';
        }
    }

    // 875, 795 -> 1285, 980
    if (e.offsetX / box.offsetWidth > 875 / 1366 && e.offsetX / box.offsetWidth < 1285 / 1366){
        if (e.offsetY / box.offsetHeight > 795 / 1894 && e.offsetY / box.offsetHeight < 980 / 1894){
            overlayGallery()
        }
    }

}

onload = (event) => {
    hideOverlay(event)
    window.dispatchEvent(new Event('resize'));
}

onresize = (event) => {
    if (getPathFromURL() == "" || getPathFromURL() == "index" ) {
        centreSize()
    }
    if (window.innerWidth / window.innerHeight > 1){
        if (getPathFromURL() == "mobile") {
            console.log('mobile one')
            window.location.href = "index.html"
        }
    }
    if (window.innerWidth / window.innerHeight <= 1){
        if (getPathFromURL() == "index" || getPathFromURL() == "") {
            console.log('home one')
            window.location.href = "mobile.html"
        }
    }
}

function getPathFromURL() {
    // Get the full URL
    var fullPath = window.location.href;

    // Remove protocol and domain
    var pathWithoutDomain = fullPath.replace(/^https?:\/\/[^\/]+/, '');

    // Remove file extension (e.g., '.html')
    var pathWithoutExtension = pathWithoutDomain.replace(/\.\w+$/, '');

    // Remove leading and trailing slashes
    var trimmedPath = pathWithoutExtension.replace(/^\/|\/$/g, '');

    return trimmedPath;
}


function centreSize () {
    centreImg = document.getElementById('centreimg')
    container = document.getElementById('container')
    if ((window.innerWidth / window.innerHeight > 1250/934)) {
        container.style.background = "url('static/images/backgroundmaybeidk.png') no-repeat"
            container.style.backgroundSize = "100% 100%"
    }
    else {
        container.style.background = 'magenta'
    }
        if ((window.innerWidth / window.innerHeight > 1200/934)) {
            const newWidth = ((window.innerWidth / window.innerHeight) * 934)
            const pagesWidth = ((newWidth - 670) / 2) / newWidth * 100
            container.style.gridTemplateColumns = `${pagesWidth}% ${100-2*pagesWidth}% ${pagesWidth}%`
            
            const pages = document.getElementsByClassName('pages')
            pages[0].style.width = "fit-content"
            pages[1].style.width = "fit-content"
        }

        else {
            container.style.gridTemplateColumns = `22% 56% 22%`
            var newHeight =((window.innerWidth / window.innerHeight) / (1200/934))*100
            
            centreImg.style.height = `${newHeight}%`
            centreImg.style.marginTop = `${(100-newHeight)}%`
            centreImg.style.marginBottom = `${(100-newHeight)}%`

            const pages = document.getElementsByClassName('pages')
            pages[0].style.width = "100%"
            pages[1].style.width = "100%"
            
        }
    document.querySelector('.subPage').clientHeight = document.querySelector('.subPage').clientWidth
};

function overlayVideo() {
    document.getElementById('overlayAbout').hidden = false
    document.getElementById('tint').hidden = false
}

function hideOverlayVideo() {
    document.getElementById('overlayAbout').hidden = true
    document.getElementById('tint').hidden = true
}

function overlayGallery() {
    document.getElementById('overlayGallery').hidden = false
    document.getElementById('tint').hidden = false
}

function hideOverlayGallery() {
    document.getElementById('overlayGallery').hidden = true
    document.getElementById('tint').hidden = true
}

function overlayUpdates() {
    document.getElementById('overlayUpdates').hidden = false
    document.getElementById('tint').hidden = false
}

function hideOverlayUpdates() {
    document.getElementById('overlayUpdates').hidden = true
    document.getElementById('tint').hidden = true
}
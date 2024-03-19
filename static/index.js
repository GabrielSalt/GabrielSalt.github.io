function overlay(imagesrc) { 
    document.getElementById('overlay').hidden = false
    document.getElementById('overlayImage').src = imagesrc
    document.getElementById('overlayImage').hidden = false
    document.getElementById('tint').hidden = false
}

function hideOverlay (e) {

    d = document.getElementById('overlayImage')

    if (d.getAttribute('src').includes('Hats')) {
        if (e.offsetX / d.offsetWidth > 500 / 957 && e.offsetX / d.offsetWidth < 590 / 957 & e.offsetY / d.offsetHeight > 600 / 762 & e.offsetY / d.offsetHeight < 670 / 762){
            window.location.href = '/contact.html'
            return
       }
    }
    else if (d.getAttribute('src').includes('Art')) {
        if (e.offsetX / d.offsetWidth > 83 / 957 && e.offsetX / d.offsetWidth < 320 / 957 & e.offsetY / d.offsetHeight > 480 / 762 & e.offsetY / d.offsetHeight < 600 / 762){
            window.location.href = '/contact.html'
            return
       }
    }
    else if (d.getAttribute('src').includes('Beauty')) {
        if (e.offsetX / d.offsetWidth > 20 / 957 && e.offsetX / d.offsetWidth < 350 / 957 & e.offsetY / d.offsetHeight > 475 / 762 & e.offsetY / d.offsetHeight < 670 / 762){
            window.location.href = '/contact.html'
            return
       }
       if (e.offsetX / d.offsetWidth > 538 / 957 && e.offsetX / d.offsetWidth < 655 / 957 & e.offsetY / d.offsetHeight > 585 / 762 & e.offsetY / d.offsetHeight < 680 / 762){
        window.location.href = '/contact.html'
        return
   }
    }
    else if (d.getAttribute('src').includes('Jewellery')) {
        if (e.offsetX / d.offsetWidth > 725 / 957 && e.offsetX / d.offsetWidth < 930 / 957 & e.offsetY / d.offsetHeight > 140 / 762 & e.offsetY / d.offsetHeight < 275 / 762){
            window.location.href = '/contact.html'
            return
       }
    }
    else if (d.getAttribute('src').includes('Fashion')) {
        if (e.offsetX / d.offsetWidth > 980 / 1155 && e.offsetX / d.offsetWidth < 1110 / 1155 & e.offsetY / d.offsetHeight > 590 / 923 & e.offsetY / d.offsetHeight < 710 / 923){
            window.location.href = '/contact.html'
            return
       }
    }
    else if (d.getAttribute('src').includes('Philanthropy')) {
        if (e.offsetX / d.offsetWidth > 610 / 957 && e.offsetX / d.offsetWidth < 825 / 957 & e.offsetY / d.offsetHeight > 470 / 762 & e.offsetY / d.offsetHeight < 590 / 762){
            window.location.href = '/contact.html'
            return
       }
    }
    else if (d.getAttribute('src').includes('HST')) {
        if (e.offsetX / d.offsetWidth > 60 / 957 && e.offsetX / d.offsetWidth < 350 / 957 & e.offsetY / d.offsetHeight > 645 / 762 & e.offsetY / d.offsetHeight < 695 / 762){
            document.getElementById('overlayImage').hidden = true
            showOverlay('Updates')
            return
        }
        else if (e.offsetX / d.offsetWidth > 625 / 957 && e.offsetX / d.offsetWidth < 890 / 957 & e.offsetY / d.offsetHeight > 650 / 762 & e.offsetY / d.offsetHeight < 710 / 762){
            window.location.href = '/contact.html'
            return
   }
    }
    else if (d.getAttribute('src').includes('Music')) {
        if (e.offsetX / d.offsetWidth > 60 / 1075 && e.offsetX / d.offsetWidth < 150 / 1075 & e.offsetY / d.offsetHeight > 330 / 850 & e.offsetY / d.offsetHeight < 505 / 850){
            window.open('https://www.youtube.com/watch?v=flv6BGBM61I&list=PLsXT5YSKmoLD3iZlOv7rv3KsFKCVZBHBY')
            return
        }
    }
    else if (d.getAttribute('src').includes('LAD')) {
        if (e.offsetX / d.offsetWidth > 100 / 1075 && e.offsetX / d.offsetWidth < 240 / 1075 & e.offsetY / d.offsetHeight > 550 / 850 & e.offsetY / d.offsetHeight < 720 / 850){
            document.getElementById('overlayImage').hidden = true
            showOverlay('lad')
            return
        }
        else if (e.offsetX / d.offsetWidth > 555 / 957 && e.offsetX / d.offsetWidth < 880 / 957 & e.offsetY / d.offsetHeight > 575 / 762 & e.offsetY / d.offsetHeight < 675 / 762){
            window.location.href = '/contact.html'
            return
        }
        else if (e.offsetX / d.offsetWidth > 665 / 957 && e.offsetX / d.offsetWidth < 890 / 957 & e.offsetY / d.offsetHeight > 160 / 762 & e.offsetY / d.offsetHeight < 360 / 762){
            window.location.href = '/contact.html'
            return
        }

    }

    document.getElementById('overlay').hidden = true
    document.getElementById('overlayImage').hidden = true
    document.getElementById('tint').hidden = true
    document.getElementById('overlayGallery').hidden = true
    document.getElementById('overlayAbout').hidden = true
    document.getElementById('overlayUpdates').hidden = true
    document.getElementById('overlaylad').hidden = true
 
    var iframes = document.getElementsByTagName("iframe");
    if (iframes != null) {
        for (var i = 0; i < iframes.length; i++) {
            iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
        }
    }
}

function centreButtons(e) {
    var box = document.querySelector('#centreimg')
    
    // 235, 0 -> 540, 300
    if (e.offsetX / box.offsetWidth > 235 / 1366 && e.offsetX / box.offsetWidth < 540 / 1366){
        if (e.offsetY / box.offsetHeight > 0 / 1894 && e.offsetY / box.offsetHeight < 300 / 1894){
            showOverlay('About')
        }
    }

    // 915, 1675 -> 1280, 1840
    if (e.offsetX / box.offsetWidth > 915 / 1366 && e.offsetX / box.offsetWidth < 1280 / 1366){
        if (e.offsetY / box.offsetHeight > 1675 / 1894 && e.offsetY / box.offsetHeight < 1840 / 1894){
            showOverlay('Updates')
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
            showOverlay('Gallery')
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
            window.location.href = "index.html"
        }
    }
    if (window.innerWidth / window.innerHeight <= 1){
        if (getPathFromURL() == "index" || getPathFromURL() == "") {
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

function showOverlay(name) {
    document.getElementById(`overlay${name}`).hidden = false
    document.getElementById('tint').hidden = false
}
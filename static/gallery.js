let currentIndex = 0;
const images = ["static/images/gallery/gallery1.jpg", "static/images/gallery/gallery2.jpg", "static/images/gallery/gallery3.jpg","static/images/gallery/gallery4.jpg","static/images/gallery/gallery5.jpg","static/images/gallery/gallery6.jpg"]; // Add your image URLs here

function changeImage(direction) {
    const galleryImage = document.getElementById('gallery-image');
    const nextIndex = (currentIndex + direction + images.length) % images.length;

    galleryImage.style.transition = 'transform 0.5s ease';
    galleryImage.style.transform = `translateX(${-direction * 100}%)`;

    setTimeout(() => {
        galleryImage.src = images[nextIndex];
        galleryImage.style.transform = 'translateX(-0)';
        galleryImage.style.transition = ''; // Reset transition property
        currentIndex = nextIndex;
    }, 500); // Adjust the time (in milliseconds) based on your transition duration
}

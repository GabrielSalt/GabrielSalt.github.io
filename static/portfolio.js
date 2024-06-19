document.addEventListener('DOMContentLoaded', function() {
    // Load the CSV file
    fetch('static/pieces.csv')
        .then(response => response.text())
        .then(data => processCSV(data));
});

function processCSV(data) {
    const rows = data.split('\n');
    const pieces = rows.map(row => {
        const [name, image, year, link] = row.split(',');
        return { name, image, year, link };
    });

    generateSidebar(pieces);
    generateMainContent(pieces);
}

function generateSidebar(pieces) {
    const sidebar = document.getElementById('sidebar');
    let currentYear = '';

    pieces.sort((a, b) => b.year - a.year);

    pieces.forEach(piece => {
        if (piece.year !== currentYear) {
            currentYear = piece.year;
            const yearHeader = document.createElement('h2');
            yearHeader.textContent = currentYear;
            sidebar.appendChild(yearHeader);
        }
        const pieceLink = document.createElement('a');
        pieceLink.href = piece.link;
        pieceLink.textContent = piece.name;
        pieceLink.style.display = 'block';
        pieceLink.style.color = 'white';
        pieceLink.style.marginBottom = '10px';
        sidebar.appendChild(pieceLink);
    });
}

function generateMainContent(pieces) {
    const mainContent = document.getElementById('main-content');
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    pieces.forEach(piece => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        const img = document.createElement('img');
        img.src = piece.image;
        img.alt = piece.name;

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = piece.name;

        gridItem.appendChild(img);
        gridItem.appendChild(overlay);
        gridItem.addEventListener('click', () => {
            window.location.href = piece.link;
        });

        gridContainer.appendChild(gridItem);
    });

    mainContent.appendChild(gridContainer);
}
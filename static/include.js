function includeHTML() {
    const includeElements = document.querySelectorAll('[data-include-html]');
    includeElements.forEach(async (element) => {
        const file = element.getAttribute('data-include-html');
        const response = await fetch(file);
        const content = await response.text();
        element.innerHTML = content;
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);
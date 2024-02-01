function showInputs(option) {
    var inputs = document.querySelectorAll('.inputs');
    inputs.forEach(function(input) {
        input.classList.add('hidden');
    });

    var selectedInputs = document.getElementById(option + "Inputs");
    selectedInputs.classList.remove('hidden');

    document.querySelectorAll('.option-button').forEach(function(button) {
        button.classList.remove('selected');
        button.setAttribute('aria-selected', false);
    });

    // Add 'selected' class and attribute to the clicked button
    var selectedButton = document.getElementById(option + "Btn");
    selectedButton.classList.add('selected');
    selectedButton.setAttribute('aria-selected', true);
}

function submitForm() {
    // Form submission logic
    alert("Form submitted!");
}
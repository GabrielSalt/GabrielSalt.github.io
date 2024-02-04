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

function validateForm() {
    // Get form elements
    var form = document.getElementById("myForm");
    var inputs = form.getElementsByTagName("input");

    // Check if all fields are filled
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i])
      if (inputs[i].type !== "submit" && inputs[i].value === "") {
        alert("Please fill out all fields");
        return false; // Prevent form submission
      }
    }

    // If all fields are filled, submit the form
    return true;
  }
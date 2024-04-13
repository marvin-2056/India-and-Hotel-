document.addEventListener('DOMContentLoaded', function() {


    // Fetching the JSON File that holds the food options
    fetch('options.json')
        .then(response => response.json())
        .then(options => {


            // Populateing the burger options
            var burgerSelect = document.getElementById('burger');
            options.burgers.forEach(option => {
                var optionElem = document.createElement('option');
                optionElem.value = option.value;
                optionElem.textContent = option.label;
                burgerSelect.appendChild(optionElem);
            });

            // Populating the Fries options
            var friesSelect = document.getElementById('fries');
            options.fries.forEach(option => {
                var optionElem = document.createElement('option');
                optionElem.value = option.value;
                optionElem.textContent = option.label;
                friesSelect.appendChild(optionElem);
            });

            // Populating the drink options
            var drinkSelect = document.getElementById('drink');
            options.drinks.forEach(option => {
                var optionElem = document.createElement('option');
                optionElem.value = option.value;
                optionElem.textContent = option.label;
                drinkSelect.appendChild(optionElem);
            });
        })
        .catch(error => {
            console.error('Error fetching options:', error); //will display in console if the fetch couldn't be made
        });



    // Event listener for name input
    document.getElementById('name').addEventListener('input', function() {
        var name = this.value;
        var errorDiv = document.getElementById('nameError');

        // Check if name contains numbers
        if (/[\d]/.test(name)) {
            errorDiv.textContent = 'Name should only contain letters';
            this.classList.add('invalid');
        } else {
            errorDiv.textContent = ''; // Clear error message
            this.classList.remove('invalid');
        }
    });

    // If the name box is filled wrong the form will not submit
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Check if name input is valid
        var nameInput = document.getElementById('name');
        if (nameInput.classList.contains('invalid')) {
            return; // Stop further execution if name is invalid
        }

        // fills the var with what the user chose
        var burger = document.getElementById('burger').value;
        var fries = document.getElementById('fries').value;
        var drink = document.getElementById('drink').value;
        var name = document.getElementById('name').value;
        var contactMethod = document.getElementById('contactMethod').value;
        var contactValue = document.getElementById('contactValue').value;

        // Generate a random order number
        var orderNumber = Math.floor(Math.random() * 1000000);

        // Construct order summary with the variables 
        var orderSummary = "<h1>You have successfully placed your order!!!</h1><h2>Thank you</h2>" +
            "<div class='order-details'>" +
            "<p><strong>Order Number:</strong> " + orderNumber + "</p>" +
            "<p><strong>Order Summary:</strong></p>" +
            "<ul>" +
            "<li><strong>Burger:</strong> " + burger + "</li>" +
            "<li><strong>Fries:</strong> " + fries + "</li>" +
            "<li><strong>Drink:</strong> " + drink + "</li>" +
            "<li><strong>Name:</strong> " + name + "</li>";
        
        if (contactMethod === 'email') {
            orderSummary += "<li><strong>Email:</strong> " + contactValue + "</li>";
        } else if (contactMethod === 'phone') {
            orderSummary += "<li><strong>Phone Number:</strong> " + contactValue + "</li>";
        }
        
        orderSummary += "</ul>" +
            "</div>";

        // Hides the form when the order summary pops up
        document.getElementById('orderForm').style.display = 'none';

        // Create a div for the order summary
        var summaryDiv = document.createElement('div');
        summaryDiv.id = 'orderSummary';
        summaryDiv.innerHTML = orderSummary;

        // Append the order summary to the document body
        document.body.appendChild(summaryDiv);

        // Create a button to allow the user to place another order
        var orderAgainButton = document.createElement('button');
        orderAgainButton.textContent = 'Place Another Order';
        orderAgainButton.classList.add('btn', 'btn-primary', 'mt-3', 'mx-auto', 'd-block'); // Add Bootstrap classes
        orderAgainButton.addEventListener('click', function() {
            // Show the form again
            document.getElementById('orderForm').style.display = 'block';

            // Remove the order summary and the button
            summaryDiv.remove();
            orderAgainButton.remove();
        });

        // Append the button to the document body
        document.body.appendChild(orderAgainButton);
    });

    // Event listener for contact method selection
    document.getElementById('contactMethod').addEventListener('change', function() {
        var contactMethod = this.value;
        var contactFieldContainer = document.getElementById('contactField');
        contactFieldContainer.innerHTML = ''; // Clear previous content

        // changes the order summary depending on what the user chooses
        if (contactMethod === 'email') {
            var emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.id = 'contactValue';
            emailInput.className = 'form-control';
            emailInput.placeholder = 'Enter your email';
            contactFieldContainer.appendChild(emailInput);
        } else if (contactMethod === 'phone') {
            var phoneInput = document.createElement('input');
            phoneInput.type = 'tel';
            phoneInput.id = 'contactValue';
            phoneInput.className = 'form-control';
            phoneInput.placeholder = 'Enter your phone number';
            contactFieldContainer.appendChild(phoneInput);
        }
    });
});

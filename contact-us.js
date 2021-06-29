// Script to capture contact us details
window.addEventListener('DOMContentLoaded', (event) => {
    hideErrors();
    var button = document.getElementById("sendenButton");
    if (button) {
        button.addEventListener("click", function (e) {
            hideErrors();
            var name = document.getElementById("nameInput").value;
            var email = document.getElementById("emailInput").value;
            var phone = document.getElementById("phoneInput").value;
            var message = document.getElementById("messageInput").value;
            var nameError = document.getElementById("nameInputError");
            var emailError = document.getElementById("emailInputError");
            var messageError = document.getElementById("messageInputError");
            if (!name) {
                nameError.innerHTML = "Name ist erforderlich";
                nameError.hidden = false;
            }
            if (!email) {
                emailError.innerHTML = "E-Mail ist erforderlich";
                emailError.hidden = false;
            } else if (!isEmailValid(email)) {
                emailError.innerHTML = "E-Mail ist ungültig";
                emailError.hidden = false;
            }
            if (!message) {
                messageError.innerHTML = "Nachricht ist erforderlich";
                messageError.hidden = false;
            }
            if (name && email && isEmailValid(email) && message) {
                hideErrors();
                sendDataToServer(name, email, phone, message)
            }
        }, false);
    }

    function sendDataToServer(name, email, phone, message) {
        var serverURL = 'http://localhost:8082/contact';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4) {
                 if(this.status === 201) {
                    var contactSuccess = document.getElementById("contactSuccess");
                    contactSuccess ? contactSuccess.hidden = false : '';
                    hideErrorMessage();  
                 } else {
                    var contactError = document.getElementById("contactError");
                    contactError ? contactError.hidden = false : '';
                    hideSuccessMessage();
                 }
             }
        };
        var data = {
            email: email,
            name: name,
            phone: phone ? phone : undefined,
            message: message
        };
        xhttp.open("POST", serverURL, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    function hideErrors() {
        var nameError = document.getElementById("nameInputError");
        var emailError = document.getElementById("emailInputError");
        var messageError = document.getElementById("messageInputError");
        nameError ? nameError.hidden = true : '';
        emailError ? emailError.hidden = true : '';
        messageError ? messageError.hidden = true : '';

        hideSuccessMessage();
        hideErrorMessage();
    }

    function hideSuccessMessage() {
        var contactSuccess = document.getElementById("contactSuccess");
        contactSuccess ? contactSuccess.hidden = true : '';
    }

    function hideErrorMessage() {
        var contactError = document.getElementById("contactError");
        contactError ? contactError.hidden = true : '';
    }

    function isEmailValid(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

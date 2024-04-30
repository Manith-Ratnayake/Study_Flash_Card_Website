document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.querySelector('.SignUpSubmitButton');
    signUpButton.addEventListener('click', function(event) {
        event.preventDefault();
        const form = document.getElementById('signUpForm');
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        console.log("Email : " , email)
        console.log("Passowrd :", password)

        fetch('http://localhost:13662/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                console.log('Success:', data.message);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error.message);
        });
    });
});

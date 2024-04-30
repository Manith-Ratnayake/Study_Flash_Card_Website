document.addEventListener('DOMContentLoaded', function() {

    const SignInSubmitButton = document.querySelector('.SignInSubmitButton');
    SignInSubmitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const form = document.getElementById('signInForm');
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        console.log("Email : " , email)
        console.log("Passowrd :", password)

        fetch('http://localhost:13662/api/signin', {
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
                localStorage.setItem('userEmail', email);
                window.location.href = '../UserPage/UserPage.html'; 

            }
        })
        .catch(error => {
            console.error('Error during fetch:', error.message);
        });
    });
});

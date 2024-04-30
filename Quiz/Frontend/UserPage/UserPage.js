// window.onload = function() {
//     fetchSubjects();
//     fetchTests();
// };

// function fetchSubjects() {
//     fetch('/getSubjects')
//     .then(response => response.json())
//     .then(data => {
//         const subjectsList = document.getElementById('subjectsList');
//         data.forEach(subject => {
//             const li = document.createElement('li');
//             li.textContent = subject;
//             subjectsList.appendChild(li);
//         });
//     })
//     .catch(error => console.error('Error fetching subjects:', error));
// }

// function fetchTests() {
//     fetch('/getTests')
//     .then(response => response.json())
//     .then(data => {
//         const testsList = document.getElementById('testsList');
//         data.forEach(test => {
//             const li = document.createElement('li');
//             li.textContent = test;
//             testsList.appendChild(li);
//         });
//     })
//     .catch(error => console.error('Error fetching tests:', error));
// }



// Assuming you have a function getCurrentUserIdentifier() that returns the current user's identifier (e.g., email or user ID)

// UserPage.js
document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('errorOutput'); // Make sure you have a div with this ID in your HTML

    // Retrieve the stored email from localStorage
    const storedEmail = localStorage.getItem('userEmail');

    if (storedEmail) {
        console.log('Stored Email:', storedEmail);
        const url = 'http://localhost:13662/api/getAllUserSubjects';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: storedEmail })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(`HTTP error! status: ${response.status}, ${err.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            displaySubjects(data);
        })
        .catch(error => {
            console.error('Error during fetch:', error.message);
            localStorage.setItem('lastError', error.message);
            if (output) {
                output.textContent = `Error: ${localStorage.getItem('lastError')}`;
            }
        });
    } else {
        console.log('No email stored in localStorage.');
        if (output) {
            output.textContent = 'No email stored in localStorage.';
        }
    }
});











/**
 * Display subjects in the UI. Modify this function to integrate with your actual UI elements.
 * @param {Object} data - Data containing the subjects.
 */
function displaySubjects(data) {
    const subjectsContainer = document.getElementById('subjectsContainer');
    if (subjectsContainer) {
        subjectsContainer.innerHTML = ''; // Clear existing subjects
        data.subjects.forEach(subject => {
            const subjectElement = document.createElement('div');
            subjectElement.textContent = subject;
            subjectsContainer.appendChild(subjectElement);
        });
    }
}

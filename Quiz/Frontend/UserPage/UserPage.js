window.onload = function() {
    fetchSubjects();
    fetchTests();
};

function fetchSubjects() {
    fetch('/getSubjects')
    .then(response => response.json())
    .then(data => {
        const subjectsList = document.getElementById('subjectsList');
        data.forEach(subject => {
            const li = document.createElement('li');
            li.textContent = subject;
            subjectsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching subjects:', error));
}

function fetchTests() {
    fetch('/getTests')
    .then(response => response.json())
    .then(data => {
        const testsList = document.getElementById('testsList');
        data.forEach(test => {
            const li = document.createElement('li');
            li.textContent = test;
            testsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching tests:', error));
}

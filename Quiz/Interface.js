function SelectedSubject() {
    var selectElement = document.getElementById('subjects');
    // var selectedValue = selectElement.value; // Gets the value of the selected option
    var selectedText = selectElement.options[selectElement.selectedIndex].text; // Gets the text of the selected option

    // Display the result in the paragraph with id "result"
    document.getElementById('result').innerText = "You have selected: " + selectedText + " with value: " + selectedValue;
    window.location.href = 'subject.html';
}



function SelectedSubjectQuizStart() {
    var selectElement = document.getElementById('SelectedSubjectQuizStart');
    window.location.href = 'quizstartsubject.html';
}




function SelectedSubjectContentEdit() {
    var selectElement = document.getElementById('SelectedSubjectContentEdit');
    window.location.href = 'editsubject.html';
}



function quizquestions(){
    document.getElementById('question').innerText = 'Hello, welcome to my site!';
}






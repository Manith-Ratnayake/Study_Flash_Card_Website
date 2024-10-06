import random

questions = []

subject = input("Enter Which subject you want to quiz: ")

if subject == "DL":
    with open("DL.txt", "r") as file:
        content = file.readlines()  # Read lines into a list

    for line in content:
        questions.append(line.strip())  # Strip newlines and append each question

    random.shuffle(questions)  # Shuffle the questions list

    for index, question in enumerate(questions):
        print(f"{index+1}. {question}")
        
        _ = input("")



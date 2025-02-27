import React from "react";

function QuestionItem({ question, questionNo, handleDeleteQuestion}) {
  const { prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(e) {
    // const questionId = e.target.parentElement.id
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

      }
    })
      .then(result => result.json())
      .then(() => handleDeleteQuestion(question.id))
  }

  function handleEditClick(e) {
    const newAnswer = parseInt(e.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newAnswer })
    })
      .then(result => result.json())
      .then((data) => console.log(question.id))
  }

  return (
    <li id={question.id}>
      <h4>Question {questionNo}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}onChange={handleEditClick}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
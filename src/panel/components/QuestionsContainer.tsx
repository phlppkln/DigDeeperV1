import React, { useEffect, useState } from "react";
import QuestionComponent, { Question } from "./Question";

interface QuestionsContainerProps {
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (updatedQuestion: Question, indexOldQuestionToUpdate: number) => void;
  deleteQuestion: (index: number) => void;
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({
  questions,
  addQuestion,
  updateQuestion,
  deleteQuestion
}) => {

  const addEmptyQuestion = () => {
    // create empty question
    const newQuestion: Question = {
      questionId: "",
      questionText: "",
      questionAxisLeft: "",
      questionAxisRight: "",
      questionAxisTop: "",
      questionAxisBottom: "",
    };

    addQuestion(newQuestion);
  };

  return (
    <div className="questions-container">
      <div className="create-questions-container">
        <h2>Questions</h2>
        {questions.map((question, index) => (
          <div
            key={index}>
          <QuestionComponent question={question} updateQuestion={(updatedQuestion: Question) => updateQuestion(updatedQuestion, index)} deleteQuestion={() => deleteQuestion(index)}/>

          </div>
        ))}
      </div>
      <button
        className="button button-primary"
        type="button"
        aria-label="addQuestion"
        onClick={addEmptyQuestion}
      >
        <span className="icon icon-plus"></span> Add Question
      </button>
    </div>
  );
};

export default QuestionsContainer;

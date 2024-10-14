import React, { useEffect, useState } from "react";
import QuestionComponent from "./Question";
import { QuestionSetup } from '../../interfaces/InputPlaneInterfaces';

interface QuestionsContainerProps {
  questions: QuestionSetup[];
  addQuestion: (question: QuestionSetup) => void;
  updateQuestion: (updatedQuestion: QuestionSetup, indexOldQuestionToUpdate: number) => void;
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
    const newQuestion: QuestionSetup = {
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
          <QuestionComponent question={question} updateQuestion={(updatedQuestion: QuestionSetup) => updateQuestion(updatedQuestion, index)} deleteQuestion={() => deleteQuestion(index)}/>

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

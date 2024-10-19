import React, { useEffect, useState } from "react";
import QuestionComponent from "./Question";
import { useSelector, useDispatch } from "react-redux";
import { questionsSetupSlice } from "../../store/questionsSetupSlice";

interface QuestionsContainerProps {}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({}) => {
  const dispatch = useDispatch();

  const questions: QuestionSetup[] = useSelector(
    (state: any) => state.questionsSetup.questionsSetup
  );

  const addNewQuestion = () => {
    dispatch(questionsSetupSlice.actions.addQuestion({}));
  };

  const deleteQuestion = (index: number) => {
    dispatch(questionsSetupSlice.actions.deleteQuestionWithIndex(index));
  };

  const updateQuestion = (newQuestion: QuestionSetup) => {
    dispatch(questionsSetupSlice.actions.updateQuestion(newQuestion));
  };

  return (
    <div className="questions-container">
      <div className="create-questions-container">
        <h2>Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionComponent
              question={question}
              updateQuestion={updateQuestion}
              deleteQuestion={() => deleteQuestion(index)}
            />
          </div>
        ))}
      </div>
      <button
        className="button button-primary"
        type="button"
        aria-label="addQuestion"
        onClick={addNewQuestion}
      >
        <span className="icon icon-plus"></span> Add Question
      </button>
    </div>
  );
};

export default QuestionsContainer;

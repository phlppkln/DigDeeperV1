import React, { useEffect } from 'react'

export interface Question {
    questionId: string,
    questionText: string,
    questionAxisLeft: string,
    questionAxisRight: string,
    questionAxisTop: string,
    questionAxisBottom: string
}

interface CreateQuestionProps {
    questions: Question[]
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({
    questions
}) => {

    useEffect(() => {}, [questions]);

    const updateQuestion = (index: number, element: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
    
        // get the question from questions array
        const question = questions[index];
    
        // update the question with the new value
        const updatedQuestion = { ...question, [element]: value };
    
        // update the questions array with the new question
        const newQuestions = [...questions.slice(0, index), updatedQuestion, ...questions.slice(index + 1)];
    
        // update the state with the new questions array
        questions = newQuestions;

        console.log(questions);
    };

  return (
    <div>
    <h3>My Questions</h3>
    {questions.map((question, index) => (
      <div key={index}>

        <div className="form-group">
        <label htmlFor="question">Question</label>
        <input
          className="input"
          type="text"
          placeholder="Question"
          id="question"
          onChange={updateQuestion(index, "questionText")}
          value={question.questionText}
        />
                <label htmlFor="question-id">ID</label>
        <input
          className="input"
          type="text"
          placeholder="Question Id"
          id="question-id"
          onChange={updateQuestion(index, "questionId")}
          value={question.questionId}
        />
        <label htmlFor="left">Left</label>
        <input
          className="input"
          type="text"
          placeholder="Left"
          id="left"
          onChange={updateQuestion(index, "questionAxisLeft")}
          value={question.questionAxisLeft}
        />
        <label htmlFor="right">Right</label>
        <input
          className="input"
          type="text"
          placeholder="Right"
          id="right"
          onChange={updateQuestion(index, "questionAxisRight")}
          value={question.questionAxisRight}
        />
        <label htmlFor="top">Top</label>
        <input
          className="input"
          type="text"
          placeholder="Top"
          id="top"
          onChange={updateQuestion(index, "questionAxisTop")}
          value={question.questionAxisTop}
        />
        <label htmlFor="bottom">Bottom</label>
        <input
          className="input"
          type="text"
          placeholder="Bottom"
          id="bottom"
          onChange={updateQuestion(index, "questionAxisBottom")}
          value={question.questionAxisBottom}        />
        </div>
      </div>
    ))}
    </div>
  )
}

export default CreateQuestion
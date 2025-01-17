interface Answer {
    value: string;
    x: number;
    y: number;
  }
  
  interface Question {
    title: string;
    xLabelMax: string;
    xLabelMin: string;
    yLabelMax: string;
    yLabelMin: string;
    xMaxPosition: number;
    xMinPosition: number;
    yMaxPosition: number;
    yMinPosition: number;
    answers: Answer[];
  }
  
  interface InputPlaneData {
    participant: string;
    questions: Question[];
  }

  interface QuestionSetup {
    questionId: string;
    questionText: string;
    questionAxisLeft: string;
    questionAxisRight: string;
    questionAxisTop: string;
    questionAxisBottom: string;
  }
  
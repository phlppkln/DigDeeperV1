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
  
  interface InterviewData {
    interviewee: string;
    questions: Question[];
  }



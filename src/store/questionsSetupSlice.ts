import { createSlice } from "@reduxjs/toolkit";

export const questionsSetupSlice = createSlice({
  name: "questions",
  initialState: {
    questionsSetup: [] as QuestionSetup[],
    areQuestionsSetupValid: false,
  },
  reducers: {
    addQuestion: (state, action) => {
      const newQuestions = [...state.questionsSetup, action.payload];
      state.questionsSetup = newQuestions;
    },
    updateQuestion: (state, action) => {
      const newQuestions = [...state.questionsSetup, action.payload.question];
      state.questionsSetup = newQuestions;
    },
    deleteQuestion: (state, action) => {
      const newQuestions = [
        ...state.questionsSetup.slice(0, action.payload),
        ...state.questionsSetup.slice(action.payload + 1),
      ];
      state.questionsSetup = newQuestions;
    },
    deleteQuestionWithIndex: (state, action) => {
      const newQuestions = [
        ...state.questionsSetup.slice(0, action.payload),
        ...state.questionsSetup.slice(action.payload + 1),
      ];
      state.questionsSetup = newQuestions;
    },

    /**
     * Checks if all questions in the state have valid inputs.
     * A question is valid if all fields are filled.
     * If all questions are valid, state.areQuestionsSetupValid is set to true.
     * If at least one question is invalid, state.areQuestionsSetupValid is set to false.
     */
    areQuestionsValid: (state) => {
      // check if questions array is empty and if all fields are filled
      if (state.questionsSetup.length === 0) {
        state.areQuestionsSetupValid = false;
      }

      for (let i = 0; i < state.questionsSetup.length; i++) {
        // replace all spaces with empty strings and check if all fields are filled
        const questionTmp = state.questionsSetup[i];

        questionTmp.questionText = questionTmp.questionText.trim();
        questionTmp.questionAxisBottom = questionTmp.questionAxisBottom.trim();
        questionTmp.questionAxisLeft = questionTmp.questionAxisLeft.trim();
        questionTmp.questionAxisRight = questionTmp.questionAxisRight.trim();
        questionTmp.questionAxisTop = questionTmp.questionAxisTop.trim();

        if (questionTmp.questionText === "") {
          state.areQuestionsSetupValid = false;
        }
        if (questionTmp.questionAxisBottom === "") {
          state.areQuestionsSetupValid = false;
        }
        if (questionTmp.questionAxisLeft === "") {
          state.areQuestionsSetupValid = false;
        }
        if (questionTmp.questionAxisRight === "") {
          state.areQuestionsSetupValid = false;
        }
        if (questionTmp.questionAxisTop === "") {
          state.areQuestionsSetupValid = false;
        }
      }
      state.areQuestionsSetupValid = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuestion, deleteQuestionWithIndex, areQuestionsValid } =
  questionsSetupSlice.actions;

export default questionsSetupSlice.reducer;

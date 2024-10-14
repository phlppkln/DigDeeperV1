import { createSlice } from '@reduxjs/toolkit'
import { QuestionSetup } from '../interfaces/InputPlaneInterfaces';

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    value: [] as QuestionSetup[]
  },
  reducers: {
    addQuestion: (state, action) => {
      const newQuestions = [
        ...state.value,
        action.payload
      ]
      state.value = newQuestions;
    },
    deleteQuestionWithIndex: (state, action) => {
      const newQuestions = [
        ...state.value.slice(0, action.payload),
        ...state.value.slice(action.payload + 1)
      ]
      state.value = newQuestions;
    },
  }
})

// Action creators are generated for each case reducer function
export const { addQuestion, deleteQuestionWithIndex } = questionsSlice.actions

export default questionsSlice.reducer
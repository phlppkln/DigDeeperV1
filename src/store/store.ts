// store.ts
import { configureStore } from '@reduxjs/toolkit';

import questionsSlice from './questionsSlice';

export default configureStore({
  reducer: {
    questions: questionsSlice,
  },
});
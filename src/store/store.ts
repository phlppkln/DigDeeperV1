// store.ts
import { configureStore } from '@reduxjs/toolkit';

import questionsSetupSlice from './questionsSetupSlice';

export default configureStore({
  reducer: {
    questionsSetup: questionsSetupSlice,
  },
});
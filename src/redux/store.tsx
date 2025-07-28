import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './Datasplice/Datasplice'

export const store = configureStore({
  reducer: {
    posts : dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

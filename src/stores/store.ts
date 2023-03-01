import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from './slices/todo/todoSlices'
import pictureReducer from './slices/picture/pictureSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        picture: pictureReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

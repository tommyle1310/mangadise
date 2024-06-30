import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    email: string | null;
    name: string | null;
    avatar: string;
}

const initialState: AuthState = {
    email: null,
    name: null,
    avatar: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<{ name: string | null, email: string | null, image: string }>) => {
            state.email = action.payload.email;
            state.avatar = action.payload.image; // Assuming avatar represents image
            state.name = action.payload.name; // Update name in state
        },
        signOut: (state) => {
            state.email = null;
            state.avatar = ''; // Assuming avatar represents image
            state.name = null; // Update name in state
        },
    },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

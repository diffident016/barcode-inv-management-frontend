import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    _id: null,
    firstName: "",
    lastName: "",
    email: "",
    userType: null,
    phoneNumber: "",
    imageUrl: ""
};

export const customerSlice = createSlice({
    name: "customer",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
            localStorage.setItem("customer", JSON.stringify(action.payload));
            state.value = action.payload;
        },

        logout: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const { login, logout } = customerSlice.actions;

export default customerSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


const initialState : any = {
    userName: null,
    userID: null
}

const authorSlice = createSlice({
    name : "author",
    initialState,
    reducers : {
        saveUserName : (state, action) => {
            state.userName = action.payload
        }, 
        saveUserID : (state, action) => {
            state.userID = action.payload
        }

    }
})

export const { saveUserName, saveUserID } : any = authorSlice.actions

export default authorSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import dummyHttpRequests from '../httpreqs'

const initialState = {
  value: [...dummyHttpRequests],
  currentUrl : null
}

export const counterSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      // Concatenate the new item with the existing array
      const newValue = [...state.value, action.payload];
      return { ...state, value: newValue };
    },
    setCurrentUrl: (state, action) => {
      state.currentUrl = action.payload; // Set the currentUrl to the payload value
    },
    removeRequest: (state, action) => {
      // Filter out the URL to remove
      const filtered = state.value.filter(item => item.id !== action.payload.id);
      console.log("filtered",filtered)
      state.value =filtered;
    },
    modifyRequest : (state , action) => {
        let prevState = [...state.value]
        let newFiltered = prevState.filter(item => item.id !== action.payload.id); 
        newFiltered.push(action.payload)
        state.value = [...newFiltered]

    },
    decrement: (state) => {
      state.value -= 1; // This line looks incorrect, you might want to revise it
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // This line looks incorrect, you might want to revise it
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRequest, setCurrentUrl, removeRequest ,modifyRequest } = counterSlice.actions

export default counterSlice.reducer

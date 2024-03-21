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
      const newValue = [...state.value, action.payload];
      return { ...state, value: newValue };
    },
    setCurrentUrl: (state, action) => {
      state.currentUrl = action.payload;
    },
    removeRequest: (state, action) => {
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
    cleanUp: (state) => {
      state.value = []
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRequest, setCurrentUrl, removeRequest ,modifyRequest ,cleanUp } = counterSlice.actions

export default counterSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openedModal: false,
    modalContent: null
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
        state.openedModal = true;
        state.modalContent = action.payload;
    },
    closeModal: (state) => {
        state.openedModal = false;
        state.modalContent = null;
    }
  }
})

export const { openModal, closeModal } = modalsSlice.actions

export default modalsSlice.reducer
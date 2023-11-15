import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchString: "",
    filters: {},
    perPageLimit: 10,
    currentPage: 1,
    data: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerPageLimit: (state, action) => {
      state.perPageLimit = action.payload;
      state.currentPage = 1;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
      state.currentPage = 1;
    },
    setPropertyFilters: (state, action) => {
      state.filters[action.payload.property] = action.payload.value;
    },
    deletePropertyFilters: (state, action) => {
      delete state.filters[action.payload.property];
    },
    clearFilters: (state, action) => {
      state.filters = {};
      state.currentPage = 1;
    },
    nextPage: (state) => {
        state.currentPage++;
    },
    prevPage: (state) => {
        state.currentPage--;
    }
  }
})

export const { setProducts, setCurrentPage, setPerPageLimit, setSearchString, setPropertyFilters, deletePropertyFilters, clearFilters, nextPage, prevPage } = productsSlice.actions

export default productsSlice.reducer
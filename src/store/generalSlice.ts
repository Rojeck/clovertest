import { createSlice } from "@reduxjs/toolkit";
import { SortType, SortTypes } from "../utils/sortByDate";

interface generalState {
  listIDForRequest: string | null;
  isCreateListModal: boolean;
  isCreateCardModal: boolean;
  sortingMethod: SortType;
}

const initialState: generalState = {
  listIDForRequest: null,
  isCreateListModal: false,
  isCreateCardModal: false,
  sortingMethod: SortTypes.ASC
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    openCreateListModal(state) {
      state.isCreateListModal = true;
    },
    closeCreateListModal(state) {
      state.isCreateListModal = false;
    },
    openCreateCardModal(state, action) {
      state.isCreateCardModal = true;
      state.listIDForRequest = action.payload;
    },
    closeCreateCardModal(state) {
      state.isCreateCardModal = false;
      state.listIDForRequest = null;
    },
    changeSortingMethod(state, action) {
      state.sortingMethod = action.payload;
    },
  },
});

export const {
  openCreateCardModal,
  closeCreateCardModal,
  openCreateListModal,
  closeCreateListModal,
  changeSortingMethod
} = generalSlice.actions;

export default generalSlice.reducer;

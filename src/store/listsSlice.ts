import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import useHttp from "../hooks/http";
import iItem from "../types/iItem";
import iList from "../types/iList";
import _api from "../environment";
import {
  AddCardParams,
  AddListParams,
  ChangeCardStatusParams,
  DeleteCardParams,
} from "./types/asyncThunkParamsTypes";
import {
  AddCardResponce,
  AddListResponce,
  DeleteItemResponse,
  ListsResponse,
} from "./types/responceTypes";

interface ListsState {
  lists: iList[];
  loading: boolean;
  error: boolean;
  saveError: boolean;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: false,
  saveError: false,
};

export const fetchLists = createAsyncThunk<iList[]>(
  "lists/fetchLists",
  async () => {
    const { request } = useHttp();
    const result = (await request(`${_api}/lists`)) as ListsResponse;
    return result.data;
  }
);

export const deleteList = createAsyncThunk<DeleteItemResponse, string>(
  "lists/deleteList",
  async (id) => {
    const { request } = useHttp();
    return (await request(
      `${_api}/lists/${id}`,
      "DELETE"
    )) as DeleteItemResponse;
  }
);

export const deleteCard = createAsyncThunk<
  DeleteItemResponse,
  DeleteCardParams
>("lists/deleteCard", async (deleteCardParams) => {
  const { request } = useHttp();
  const { id, listID } = deleteCardParams;
  return (await request(
    `${_api}/card/${id}?listID=${listID}`,
    "DELETE"
  )) as DeleteItemResponse;
});

export const addCard = createAsyncThunk<iItem, AddCardParams>(
  "lists/addCard",
  async (addCardParams) => {
    const { request } = useHttp();
    const result = (await request(
      `${_api}/card`,
      "POST",
      addCardParams
    )) as AddCardResponce;
    return result.data;
  }
);

export const addList = createAsyncThunk<iList, AddListParams>(
  "lists/addList",
  async (addListParams) => {
    const { request } = useHttp();
    const result = (await request(
      `${_api}/lists`,
      "POST",
      addListParams
    )) as AddListResponce;
    return result.data;
  }
);

export const changeCardStatus = createAsyncThunk<
  AddCardResponce,
  ChangeCardStatusParams
>("lists/changeCardStatus", async (changeCardStatusParams) => {
  const { request } = useHttp();
  return (await request(
    `${_api}/card/status`,
    "PUT",
    changeCardStatusParams
  )) as AddCardResponce;
});

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list._id !== action.meta.arg
        );
      })
      .addCase(deleteList.rejected, (state) => {
        state.saveError = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const { id, listID } = action.meta.arg;
        const list = state.lists.find((list) => list._id === listID) as iList;
        if (list) {
          let index = list.cards.findIndex((card) => card._id === id);
          if (index !== -1) {
            list.cards.splice(index, 1);
          }
        }
      })
      .addCase(deleteCard.rejected, (state) => {
        state.saveError = true;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state) => {
        state.saveError = true;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        const { listID } = action.payload;
        const list = state.lists.find((list) => list._id === listID) as iList;
        list.cards.push(action.payload);
      })
      .addCase(addCard.rejected, (state) => {
        state.saveError = true;
      })
      .addCase(changeCardStatus.pending, (state, action) => {
        const { id, listID, previousListID } = action.meta.arg;
        const previousList = state.lists.find(
          (list) => list._id === previousListID
        ) as iList;
        const list = state.lists.find((list) => list._id === listID) as iList;
        const card = previousList.cards.find(
          (card) => card._id === id
        ) as iItem;
        card.updatedAt = new Date();
        const index = previousList.cards.findIndex((item) => item._id === id);
        if (index !== -1) {
          previousList.cards.splice(index, 1);
        }
        list.cards.push(card);
      })
      .addCase(changeCardStatus.rejected, (state) => {
        state.saveError = true;
      });
  },
});

export default listsSlice.reducer;

import iItem from "../../types/iItem";
import iList from "../../types/iList";

export interface AddListResponce {
  message: string;
  data: iList;
}

export interface AddCardResponce {
  message: string;
  data: iItem;
}

export interface ListsResponse {
  message: string;
  data: iList[];
}

export interface DeleteItemResponse {
  message: string;
  id: string;
}

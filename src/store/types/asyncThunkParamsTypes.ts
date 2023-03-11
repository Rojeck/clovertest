export interface DeleteCardParams {
  id: string;
  listID: string;
}
export interface AddCardParams {
  name: string;
  listID: string | null;
}
export interface AddListParams {
  name: string;
}
export interface ChangeCardStatusParams {
  id: string;
  listID: string;
  previousListID: string;
}

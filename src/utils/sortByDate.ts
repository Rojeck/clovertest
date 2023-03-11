import iItem from "../types/iItem";

export enum SortTypes {
    ASC = 'ASC',
    DESC = 'DESC'
}

export type SortType = 'ASC' | 'DESC';

function sortByUpdatedAt(data: iItem[], order:SortType = SortTypes.ASC) {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.updatedAt) as any;
      const dateB = new Date(b.updatedAt) as any;
      if (order === 'ASC') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    return sortedData;
  }

export default sortByUpdatedAt;
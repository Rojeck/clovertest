import iItem from "./iItem";

interface iList {
    name: string;
    cards: iItem[];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export default iList;
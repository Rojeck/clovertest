import DeleteForever from "@mui/icons-material/DeleteForever";
import AddIcon from '@mui/icons-material/Add';
import { DragEvent, useRef, FC, useMemo } from 'react';

import iItem from "../../types/iItem";
import TodoItem from "./components/todoItem/todoItem";
import iList from "../../types/iList";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { changeCardStatus, deleteList } from "../../store/listsSlice";
import { openCreateCardModal } from "../../store/generalSlice";
import sortByUpdatedAt from "../../utils/sortByDate";

import './todoList.scss';

interface TodoListProps {
    list: iList
}

const TodoList: FC<TodoListProps> = ({ list }) => {
    const { name, cards, _id } = list;
    const { sortingMethod } = useAppSelector(state => state.general);
    const listRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const element = listRef.current as HTMLDivElement;
        element.style.boxShadow = '2px 2px 2px gray';
    }
    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const element = listRef.current as HTMLDivElement;
        element.style.boxShadow = 'none';
    }
    const dropHandler = (e: DragEvent, listID: string) => {
        e.preventDefault();
        const element = listRef.current as HTMLDivElement;
        element.style.boxShadow = 'none';
        const { previousListID, id } = JSON.parse(e.dataTransfer.getData('application/json'));
        dispatch(changeCardStatus({ previousListID, id, listID }));
    }

    const sortedCardsArr: iItem[] = useMemo(() => {
        return sortByUpdatedAt(cards, sortingMethod);
    }, [cards, sortingMethod])


    return (
        <div className="list" ref={listRef}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDrop={e => dropHandler(e, _id)}>

            <div className="list__header">
                <div className="list__name">{name}</div>
                <div className="list__control">
                    <button
                        className="button-clear"
                        onClick={() => dispatch(openCreateCardModal(_id))}>
                        <AddIcon />
                    </button>
                    {cards.length === 0 ?
                        <button
                            className="button-clear"
                            onClick={() => dispatch(deleteList(_id))}>
                            <DeleteForever />
                        </button> : null}

                </div>
            </div>
            <ul className="list__items">
                {cards.length === 0 ? <li className="list__items-empty">Empty</li>
                    : sortedCardsArr.map((item: iItem, index: number) =>
                        (<TodoItem index={index} key={item._id} item={item} listID={list._id} />))}
            </ul>
        </div>
    )
}

export default TodoList;
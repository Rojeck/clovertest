import { FC, DragEvent } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import iItem from '../../../../types/iItem';
import dateFormattter from '../../../../utils/dateFormatter'
import { useAppDispatch } from '../../../../hooks/store';
import { deleteCard } from '../../../../store/listsSlice';

import './todoItem.scss';

interface TodoItemProps {
    item: iItem;
    listID: string;
    index: number
}

const TodoItem: FC<TodoItemProps> = ({ item, listID }) => {
    const { name, updatedAt, _id } = item;
    const dispatch = useAppDispatch();

    const dragStartHandler = (e: DragEvent, previousListID: string, id: string) => {
        const element = e.target as HTMLLIElement;
        e.dataTransfer.setData('application/json', JSON.stringify({ previousListID, id }));
        element.style.opacity = '0.1';
    }
    const dragEndHandler = (e: DragEvent) => {
        const element = e.target as HTMLLIElement;
        element.style.opacity = '1';
    }

    return (
        <li className="todo-item"
            draggable
            onDragStart={(e) => dragStartHandler(e, listID, _id)}
            onDragEnd={(e) => dragEndHandler(e)} >
            <div className="todo-item__row">
                <div className="todo-item__name">{name}</div>
                <div className="todo-item__delete" onClick={() => dispatch(deleteCard({ id: _id, listID }))}>
                    <DeleteForeverIcon color='primary' />
                </div>
            </div>
            <div className="todo-item__date">{dateFormattter(new Date(updatedAt))}</div>
        </li>
    )
}

export default TodoItem;
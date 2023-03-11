import { FC } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeSortingMethod, openCreateListModal } from '../../store/generalSlice';
import { SortTypes } from '../../utils/sortByDate';

import './controlPanel.scss';

const ControlPanel: FC = () => {
    const dispatch = useAppDispatch();
    const { sortingMethod } = useAppSelector(state => state.general);

    return (
        <div className="control-panel">
            <button className='control-panel__item button-clear'
                onClick={() => { dispatch(openCreateListModal()) }}>
                <AddIcon fontSize='large' />
            </button>
            <button className='control-panel__item button-clear'
                onClick={() => dispatch(changeSortingMethod(SortTypes.ASC))}>
                <ArrowDropDownIcon
                    fontSize='large'
                    className={sortingMethod === SortTypes.ASC ? 'active' : ''} />
            </button>
            <button className='control-panel__item button-clear'
                onClick={() => dispatch(changeSortingMethod(SortTypes.DESC))}>
                <ArrowDropUpIcon
                    fontSize='large'
                    className={sortingMethod === SortTypes.DESC ? 'active' : ''} />
            </button>

        </div>
    )
}

export default ControlPanel;
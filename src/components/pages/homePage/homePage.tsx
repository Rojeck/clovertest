import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";

import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { addCard, addList, fetchLists } from "../../../store/listsSlice";
import iList from "../../../types/iList";
import ControlPanel from "../../controlPanel/ControlPanel";
import TodoList from "../../todoList/todoList";
import Portal from "../../portal/Portal";
import Modal from "../../modal/modal";
import CreateTodoForm from "../../createTodoForm/createTodoForm";
import { closeCreateCardModal, closeCreateListModal } from "../../../store/generalSlice";
import Spinner from "../../spinner/Spinner";
import SaveError from "../../saveError/SaveError";

import './homePage.scss';

const HomePage: FC = () => {
    const { error, loading, saveError } = useAppSelector(state => state.lists);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLists());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="home-page">
            <Helmet>
                <meta name="Home page description" content="Home page content" />
                <title>Home</title>
            </Helmet>
            {loading ? <Spinner /> : null}
            {error || saveError ? <SaveError /> : null}
            {!loading && !saveError && !error ? <View /> : null}
        </div>
    )
}

const View = () => {
    const { lists } = useAppSelector(state => state.lists);
    const { isCreateListModal, isCreateCardModal, listIDForRequest } = useAppSelector(state => state.general);
    const dispatch = useAppDispatch();
    const addNewList = (name: string) => {
        dispatch(closeCreateListModal());
        dispatch(addList({ name }))
    }
    const addNewCard = (name: string) => {
        dispatch(closeCreateCardModal())
        dispatch(addCard({ name, listID: listIDForRequest }))
    }
    return (
        <div className="container">
            <ControlPanel />
            <div className="lists-container">
                {lists.length === 0
                    ? <div className="lists-container__empty">There is no lists yet...</div>
                    : lists.map((list: iList) => <TodoList key={list._id} list={list} />)}
            </div>
            <Portal>
                <Modal active={isCreateListModal} onClose={() => { dispatch(closeCreateListModal()) }}>
                    <CreateTodoForm
                        title={"Create list"}
                        onSubmit={(name: string) => { addNewList(name) }} />
                </Modal>
                <Modal active={isCreateCardModal} onClose={() => { dispatch(closeCreateCardModal()) }}>
                    <CreateTodoForm
                        title={"Create card"}
                        onSubmit={(name: string) => { addNewCard(name) }} />
                </Modal>
            </Portal>
        </div>
    )
}

export default HomePage;
import { useDispatch } from "react-redux";
import { setIsOpen, setWindow } from "../store/modalSlice";

const useModal = () => {
    const dispatch = useDispatch();

    const openWindow = (window) => {
        dispatch(setIsOpen(true));
        dispatch(setWindow(window));
    }

    const closeWindow = () => {
        dispatch(setIsOpen(false));
        dispatch(setWindow(""));
    }

    const toggleWindow = (isOpen, window) => {
        dispatch(setIsOpen(isOpen));
        dispatch(setWindow(window));
    }

    return {
        openWindow,
        closeWindow,
        toggleWindow
    }
}

export default useModal;
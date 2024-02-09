import { toast } from "react-toastify";

const toastObj : any = {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const successToast = (message: string) => {
    toast.success(message, toastObj);
}

export const errorToast = (message: string) => {
    toast.error(message, toastObj);
}

export const warningToast = (message: string) => {
    toast.warning(message, toastObj);
}

export const infoToast = (message: string) => {
    toast.info(message, toastObj);
}

export const loadingToast = (message: string) => {
    toast.loading(message, toastObj);
}

export const updateToast = (message: string) => {
    toast.update(message, toastObj);
}


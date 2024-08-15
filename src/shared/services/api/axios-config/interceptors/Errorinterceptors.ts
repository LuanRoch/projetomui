import { AxiosError } from "axios";

export const errorinterceptors = (error: AxiosError) => {
  

    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Error de Conexão'));
    }

    if (error.response?.status === 401) {

    }

    return Promise.reject(error);
};

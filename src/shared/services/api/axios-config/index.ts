import axios from "axios";
import { errorinterceptors, Responseinterceptors } from "./interceptors";
import { Environment } from "../../../environment";


const api = axios.create({
    baseURL: Environment.BASE_URL

});

api.interceptors.response.use(
    (response) => Responseinterceptors(response),
    (error) => errorinterceptors(error),

);

export {api} ; 
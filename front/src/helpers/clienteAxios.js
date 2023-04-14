import { getToken } from "./usuario";
import axios from "axios";
const url= "http://localhost:8000"

const clienteAxios = axios.create({baseURL: url});
const token = getToken();
clienteAxios.interceptors.request.use(
    function (config) {
        config.headers["authorization"] = `Bearer ${token}`;
        return config;
    },
);

export default clienteAxios;
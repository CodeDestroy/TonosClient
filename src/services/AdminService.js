import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AdminService {
    static async showAllUsers (page, count) {
        return $api.post('/admin/showAllUsers', {page, count});
    }

    static async findUsers(label, choice) {
        return $api.post('/admin/findUsers', {label, choice})
    }

    
}

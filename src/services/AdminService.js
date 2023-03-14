import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AdminService {
    static async showAllUsers (page, count) {
        return $api.post('/admin/showAllUsers', {page, count});
    }

    
}

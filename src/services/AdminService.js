import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AdminService {
    static async showAllUsers (page, count, selectedList) {
        return $api.post('/admin/showAllUsers', {page, count, selectedList});
    }

    static async getCountUsers () {
        return $api.get('/admin/getCountUsers')
    }

    static async findUsers(label, choice) {
        return $api.post('/admin/findUsers', {label, choice})
    }

    static async saveChangesToPatient(user) {
        return $api.post('/admin/saveChangesToPatient', {user})
    }

    
}

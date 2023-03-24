import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login (login, password) {
        return $api.post('/auth/login', {login, password});
    }

    static async registrarion (login, password, Doctor_id, role){
        return $api.post('/auth/registration', {login, password, Doctor_id, role});
    }

    static async logout () {
        return $api.post('/auth/logout');
    }

    static async getDoctor (user_id) {
        return $api.post('/auth/getDoctorByUserId', {user_id})
    }
}

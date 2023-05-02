import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login (login, password) {
        return $api.post('/auth/login', {login, password});
    }

    static async registrarion (role_id, secondName, firstName, patronomicName, tabelNum, phone, email, birthDate,  gender,  postId, login, password){
        return $api.post('/auth/registration', {role_id, secondName, firstName, patronomicName, tabelNum, phone, email, birthDate,  gender,  postId, login, password});
    }

    static async logout () {
        return $api.post('/auth/logout');
    }

    static async getDoctor (user_id) {
        return $api.post('/auth/getDoctorByUserId', {user_id})
    }
}

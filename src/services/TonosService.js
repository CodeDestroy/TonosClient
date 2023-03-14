import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class TonosService {

    static async regPatient(secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district) {
        return $api.post('/reg-patient', {secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district})
    }

    static async sendResults (SYS, DIA, PUL, deviceId){
        return $api.post('/getResults', {SYS, DIA, PUL, deviceId});
    }

    static async findPatientByChoice(label, choice) {
        return $api.post('/findPatientByChoice', {label, choice})
    }

}

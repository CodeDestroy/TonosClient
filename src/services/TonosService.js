import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class TonosService {

    static async regPatient(secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district, login, password) {
        return $api.post('/reg-patient', {secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district, login, password})
    }

    static async sendResults (SYS, DIA, PUL, deviceId, patient_id){
        return $api.post('/getResults', {SYS, DIA, PUL, deviceId, patient_id});
    }
    
    static async addTonometr (tonometr_id, serialNum){
        return $api.post('/addTonometr', {tonometr_id, serialNum});
    }

    static async findTonometrByBtId (bt_id) {
        return $api.post('/findTonometrByBtId', {bt_id})
    }

    static async findPatientByChoice(label, choice) {
        return $api.post('/findPatientByChoice', {label, choice})
    }

    static async findDoctorByPatientId(patient_id) {
        return $api.post('/findFoctorByPatientId', {patient_id})
    }

    static async addAppointment(patient_id, doctor_id, device_id) {
        return $api.post('/addAppointment', {patient_id, doctor_id, device_id})
    }

    static async getAllMeasuresByPatientId(patient_id, currentPage, order) {
        return $api.post('/getAllMeasuresByPatientId', {patient_id, currentPage, order})
    }

    static async getCountMeasuresByPatientId (patient_id) {
        return $api.post('getCountMeasuresByPatientId', {patient_id})
    }

}

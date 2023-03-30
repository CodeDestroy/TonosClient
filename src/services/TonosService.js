import $api from "../http";

export default class TonosService {

    static async getDistricts() {
        return $api.get('/getDistricts');
    }

    static async regPatient(secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district, login, password) {
        return $api.post('/reg-patient', {secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district, login, password})
    }

    static async sendResults (SYS, DIA, PUL, deviceId, patient_id, deviceName){
        return $api.post('/getResults', {SYS, DIA, PUL, deviceId, patient_id, deviceName});
    }
    
    static async addTonometr (tonometr_id, serialNum, deviceName){
        return $api.post('/addTonometr', {tonometr_id, serialNum, deviceName});
    }

    static async findTonometrByBtId (bt_id) {
        return $api.post('/findTonometrByBtId', {bt_id})
    }

    static async findPatientByChoice(label, choice) {
        return $api.post('/findPatientByChoice', {label, choice})
    }

    static async findPatinetByChoiceAndDoctorId(label, choice, doctor_id) {
        return $api.post('/findPatinetByChoiceAndDoctorId', {label, choice, doctor_id})
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

    static async getAllMeasuresByPatientIdWithDataFormat(patient_id, dateStart, dateEnd) {
        return $api.post('/getAllMeasuresByPatientIdWithDataFormat', {patient_id, dateStart, dateEnd})
    }

    static async getCountMeasuresByPatientId (patient_id) {
        return $api.post('/getCountMeasuresByPatientId', {patient_id})
    }

    static async getCountPatientsByDoctorId (doctor_id) {
        return $api.post('/getCountPatientsByDoctorId', {doctor_id})
    }
    
    static async getCountMeasuresByDoctorId (doctor_id) {
        return $api.post('/getCountMeasuresByDoctorId', {doctor_id})
    }

    static async getPatientsByDoctorId (doctor_id, currentPage, order) {
        return $api.post('/getPatientsByDoctorId', {doctor_id, currentPage, order})
    }

    static async getMesuaresByDoctorId (doctor_id, currentPage, order) {
        return $api.post('/getMesuaresByDoctorId', {doctor_id, currentPage, order})
    }

}

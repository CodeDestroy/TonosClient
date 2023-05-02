import $api from "../http";

export default class TonosService {

    static async getDistricts() {
        return $api.get('/getDistricts');
    }

    static async regPatient(phone, email, snils, polis,  district, password) {
        return $api.post('/reg-patient', {phone, email, snils, polis,  district, password})
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

    static async findPatientAppointments(label, choice) {
        return $api.post('/findPatientAppointments', {label, choice})
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

    static async closeAppointment(appointment_id) {
        return $api.post('/closeAppointment', {appointment_id})
    }
    

    static async getAllMeasuresByPatientId(patient_id, currentPage, order) {
        return $api.post('/getAllMeasuresByPatientId', {patient_id, currentPage, order})
    }

    static async getAllMeasuresByPatientIdWithDataFormat(patient_id, dateStart, dateEnd) {
        return $api.post('/getAllMeasuresByPatientIdWithDataFormat', {patient_id, dateStart, dateEnd})
    }
    static async getMeasuresByManyPatients(ids) {
        return $api.post('/getMeasuresByManyPatients', {ids})
    }
    

    static async getCountMeasuresByPatientId (patient_id) {
        return $api.post('/getCountMeasuresByPatientId', {patient_id})
    }

    static async getCountPatientsByDoctorId (doctor_id) {
        return $api.post('/getCountPatientsByDoctorId', {doctor_id})
    }
    
    static async getCountPatientsByMO (med_post_id) {
        return $api.post('/getCountPatientsByMO', {med_post_id})
    }
    static async getCountMeasuresByDoctorId (doctor_id) {
        return $api.post('/getCountMeasuresByDoctorId', {doctor_id})
    }

    
    static async getCountMeasuresByMO (med_post_id) {
        return $api.post('/getCountMeasuresByMO', {med_post_id})
    }

    static async getPatientStatistic() {
        return $api.get('/getPatientStatistic')
    }

    static async getPatientsByDoctorId (doctor_id, currentPage, order) {
        return $api.post('/getPatientsByDoctorId', {doctor_id, currentPage, order})
    }

    static async getPatientsById (patient_id) {
        return $api.post('/getPatientsById', {patient_id})
    }

    static async getDoctorById (doctor_id) {
        return $api.post('/getDoctorById', {doctor_id})
    }
    
    static async getPatientsByMO (med_post_id, currentPage, order) {
        return $api.post('/getPatientsByMO', {med_post_id, currentPage, order})
    }
    static async getMesuaresByDoctorId (doctor_id, currentPage, order) {
        return $api.post('/getMesuaresByDoctorId', {doctor_id, currentPage, order})
    }
    
    static async getMesuaresByMO (med_post_id, currentPage, order) {
        return $api.post('/getMesuaresByMO', {med_post_id, currentPage, order})
    }

    static async getMedOrg (str) {
        return $api.post('/getMedOrg', {str})
    }

    static async getMedOrgById (id) {
        return $api.post('/getMedOrgById', {id})
    }

    static async getMedPostById (id) {
        return $api.post('/getMedPostById', {id})
    }
    
    static async getPostByOrgId (str, orgId) {
        return $api.post('/getPostByOrgId', {str, orgId})
    }

    static async getRoles() {
        return $api.get('/getRoles')
    }

    static async getAvailableRoles(user_role) {
        return $api.post('/getAvailableRoles', {user_role})
    }

    static async getMKB(label) {
        return $api.post('/getMKB', {label})
    }

    static async setChangesToPatient(patient_id, mkb10) {
        return $api.post('/setChangesToPatient', {patient_id, mkb10})
    }
    
    static async getAnamnesisByPatinetId (patient_id) {
        return $api.post('/getAnamnesisByPatinetId', {patient_id})
    }

    static async getDirByDoctorId (doctor_id) {
        return $api.post('/getDirByDoctorId', {doctor_id})
    }

}

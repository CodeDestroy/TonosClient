import $api from "../http";
import axios from "axios";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";
import { saveAs } from "file-saver";

export default class FileService {
    static async print ( patient_id, doctor_id, serial_number, appointment_id) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        axios.post('https://94.103.83.213:443/createContract', {patient_id, doctor_id, serial_number, appointment_id}, { headers: headers })
        .then((res) => {
            axios.post('https://94.103.83.213:443/fetch-pdf', res, { responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'docxTemplate.docx');
                
            })
        })
       
    }


    static async createReturnAct ( appointment_id) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        axios.post('https://94.103.83.213:443/createReturnAct', {appointment_id}, { headers: headers })
        .then((res) => {
            axios.post('https://94.103.83.213:443/fetch-pdf', res, { responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'docxTemplate.docx');
                
            })
        })
       
    }

 
    static async getContractFileName (patient_id) {
        return $api.post('/getContractFileName', {patient_id})
    }
    

    static async getReturnActFileNameByApID (appointment_id) {
        return $api.post('/getReturnActFileNameByApID', {appointment_id})
    }
    static async getContractFileNameByApID (appointment_id) {
        return $api.post('/getContractFileNameByApID', {appointment_id})
    }

    static async fetch_pdf (res) {
        axios.post('https://94.103.83.213:443/fetch-pdf', res, { responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'docxTemplate.docx');
            })
    } 
}

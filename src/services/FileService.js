import $api from "../http";
import axios from "axios";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";
import { saveAs } from "file-saver";

export default class FileService {
    static async print (state) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        axios.post('http://localhost:5000/testPrint', state, { headers: headers })
        .then((res) => {
            axios.post('http://localhost:5000/fetch-pdf', res, { responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'docxTemplate.docx');
                
            })
        })
       
    }
}

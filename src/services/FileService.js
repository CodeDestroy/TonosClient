import $api from "../http";
import axios from "axios";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";
import { saveAs } from "file-saver";

export default class FileService {
    static async print (state) {
        axios.post('http://localhost:5000/testPrint', state)
        .then((res) => {
            axios.post('http://localhost:5000/fetch-pdf', res, { responseType: 'blob' })
            .then((res) => {
              const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
              saveAs(pdfBlob, 'newPdf.pdf');
            })
        })
       
    }
}

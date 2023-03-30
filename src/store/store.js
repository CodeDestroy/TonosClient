import { makeAutoObservable } from "mobx";

import AuthService from "../services/AuthService";
import axios from 'axios';
import userDto from "../dtos/user-dto";
//import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
    user = {};
    isAuth = false;
    device = {};
    
    constructor () {
        makeAutoObservable(this);
    }

    setAuth (bool) {
        this.isAuth = bool;

    }

    setUser (user) {
        this.user = user;
    }

    setDevice(device) {
        this.device = device
    }


    
    async login (login, password){
        try {
            const response = await AuthService.login(login, password);     
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(await userDto.deserialize(response.data.user));
            return response
        }
        catch (e) {
            console.log(e)
            return (e)
        }
    }

   /*  async registration (login, password, User_name, User_surname, User_patronomic, Doctor_id){
        try {
            const response = await AuthService.registrarion(login, password, User_name, User_surname, User_patronomic, Doctor_id);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(await userDto.deserialize(response.data.user));
        }
        catch (e) {
            console.log(e)
        }
    } */

    async logout (){
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        }
        catch (e) {
            console.log(e)
        }
    }

    async refreshStore() {
        try {
            this.setUser(await userDto.deserialize(this.user))
        }
        catch(e) {
            console.log(e)
        }
    }

    async checkAuth () {
        //`https://94.103.83.213:443/auth/refresh
        try {
            await axios.get(`https://94.103.83.213:443/auth/refresh`, {withCredentials: true})
            .then(async (response) => {
                localStorage.setItem('token', response.data.accessToken);
                this.setUser(await userDto.deserialize(response.data.user));
                this.setAuth(true);

            }); 
        }
        catch (e){
            console.log(e)
        }
    }

}
import $api from "../http";
import {AxiosResponse} from 'axios'
//import { AuthResponse } from "../models/response/AuthResponse";

export default class AdminService {
    static async showAllUsers (page, count, selectedList) {
        return $api.post('/admin/showAllUsers', {page, count, selectedList});
    }

    static async getCountUsers () {
        return $api.get('/admin/getCountUsers')
    }

    static async findUsers(label, choice) {
        return $api.post('/admin/findUsers', {label, choice})
    }

    static async saveChangesToPatient(user) {
        return $api.post('/admin/saveChangesToPatient', {user})
    }

    static async saveChangesToUser(user) {
        return $api.post('/admin/saveChangesToUser', {user})
    }

    static async getCountMedOrgs() {
        return $api.get('/admin/getCountMedOrgs')
    }

    static async getMedPostsWithMO() {
        return $api.get('/admin/getMedPostsWithMO')
    }
    
    static async saveOrAddOrg(medOrgId, medOrgName, medOrgNameSmall, inn, region, parentOrgId) {
        return $api.post('/admin/saveOrAddOrg', {medOrgId, medOrgName, medOrgNameSmall, inn, region, parentOrgId})
    }
    
    static async saveOrAddDistrict(id, name) {
        return $api.post('/admin/saveOrAddDistrict', {id, name})
    }

    static async saveOrAddPost(id, med_post_name, parent_id, medical_org_id) {
        return $api.post('/admin/saveOrAddPost', {id, med_post_name, parent_id, medical_org_id})
    }

    static async getMedOrgs(currentPage, order) {
        return $api.post('/admin/getMedOrgs', {currentPage, order})
    }

    static async getDistricts() {
        return $api.get('/admin/getDistricts')
    }
    
}

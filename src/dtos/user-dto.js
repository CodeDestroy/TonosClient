/* 
class UserDto {

    async deserialize(payload){
        const result = {
            id: parseInt(payload.id),
            login: payload.login,
            password: payload.password,
            uirs_users_id: payload.uirs_users_id,
            tabel_id: payload.tabel_id,
            id_otdel: payload.id_otdel,
            famil: payload.famil,
            name: payload.name,
            otch: payload.otch,
            phone: payload.phone,
            email: payload.email,
            post: payload.post,
            small_name_io_famil: payload.small_name_io_famil,
            full_name: payload.full_name,
            small_name: payload.small_name,
            post_full: payload.post_full,
            description: payload.description,
            is_del: payload.is_del,
            uirs_clients_id: payload.uirs_clients_id,
            small_name_rp: payload.small_name_rp,
            small_name_dp: payload.small_name_dp,
            birthday: payload.birthday,
            doctor_id: payload.doctor_id
        }
        return (result)
    }
}

module.exports = new UserDto();
 */


class UserDto {

    async deserialize(payload){
        const result = {
            id: parseInt(payload.id),
            login: payload.login,
            password: payload.password,
            uirs_users_id: payload.uirs_users_id,
            //payload
            role: payload.role,
            uirs_users_db_id: payload.uirs_users_db_id,
            //payload
            patient_id: payload.patient_id,
            doctor_id: payload.doctor_id,
            //payload
            tabel_num: payload.tabel_num,
            surname: payload.surname,
            name: payload.name,
            patronomic_name: payload.patronomic_name,
            phone: payload.phone,
            email: payload.email,
            birth_date: payload.birth_date,
            med_post_id: payload.med_post_id,
            full_name: payload.full_name,
            gender_id: payload.gender_id,
        }
        return (result)
    }
}

module.exports = new UserDto();
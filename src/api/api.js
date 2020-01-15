import axios from 'axios'
import {getJwtFromStorage, isEmptyString, mergeConfig} from '../utils/utils'

const host = 'http://localhost:8080'
const host_api = `${host}/api`
const auth_type = "Bearer"

const instance = axios.create({
    baseURL: host_api
})

const api = {
    get: (url, params) => {
        let jwt = getJwtFromStorage()
        if(!isEmptyString(jwt)){
            jwt = `${auth_type} ${jwt}`
        }
        else{
            jwt = ""
        }
        return instance.get(
            `${url}`,
            mergeConfig({
                params: params
            }, {
                headers: {
                    Authorization: jwt
                }
            })
        )
    },
    post: (url, data, config) => {
        let jwt = getJwtFromStorage()
        if(!isEmptyString(jwt)){
            jwt = `${auth_type} ${jwt}`
        }else{
            jwt = ""
        }
        return instance.post(
            `${url}`,
            data,
            mergeConfig(config, {
                headers: {
                    Authorization: jwt
                }
            })
        )
    }
}

export default api
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { AUTH } from '../redux/types/types'

export const checkToken = async (token, dispatch) => {
    const decoded = jwt_decode(token)

    if (decoded.exp >= Date.now() / 1000) return;

    const res = await axios.get(`/api/refresh_token`)
    dispatch({ type: AUTH, payload: res.data })
    return res.data.access_token
}


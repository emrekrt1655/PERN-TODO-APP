import { AUTH, ALERT, TODO } from '../types/types'
import { validRegister } from '../../utils/validRegister'
import { getAPI, postAPI } from '../../utils/api'
import { checkToken } from '../../utils/checkToken'

export const login = (userLogin) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("login", userLogin);
    dispatch({
      type: AUTH,
      payload: res.data
    });
    dispatch({ type: ALERT, payload: { success: res.data.message } });
    localStorage.setItem("refresh", "todo");
    //localStorage.setItem("logged", res.data.access_token)
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } });
  }
};

export const register = (userRegister) => async (dispatch) => {
  try {
    const check = validRegister(userRegister)

    if (check?.errLength > 0) {
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
    }
    dispatch({ type: ALERT, payload: { loading: true } })
    const res = await postAPI('register', userRegister)
    dispatch({ type: ALERT, payload: { success: res.data.message } })
  } catch (error) {
    dispatch({ type: ALERT, payload: { erorrs: error?.response?.data.message } })
  }
}


export const refreshToken =
  () => async (dispatch) => {
    const refresh = localStorage.getItem("refresh");
    if (refresh !== "todo") return;
    try {
      //const accessToken = access_token
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("refresh_token");
      dispatch({
        type: AUTH, payload:
          res.data
      });
      //localStorage.setItem("logged", res.data.access_token);
      dispatch({ type: ALERT, payload: {} })
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
      localStorage.removeItem("refresh")
    }
  };

export const logout = (token) => async (dispatch) => {
  const result = await checkToken(token, dispatch)
  const access_token = result ? result : token

  try {
    localStorage.removeItem('refresh')
    const res = await getAPI('/logout', access_token)
    dispatch({ type: ALERT, payload: { success: res.data.message } });
    dispatch({ type: TODO, payload: {} })
    dispatch({ type: AUTH, payload: {} })
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error?.response?.data.message } });

  }
}
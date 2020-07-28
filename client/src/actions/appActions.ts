import {
  HIDE_MODAL,
  SHOW_MODAL,
  HIDE_NOTIFICATION,
  SHOW_NOTIFICATION,
} from './types'

export const showModal = () => (dispatch: any) => {
  dispatch({
    type: SHOW_MODAL,
    payload: true,
  })
}

export const hideModal = () => (dispatch: any) => {
  dispatch({
    type: HIDE_MODAL,
    payload: false,
  })
}

export const showNotification = (message: string, type: string, autoHide: number) => (dispatch: any) => {

  const notificationSettings = {
    message,
    type,
    autoHide
  }
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: notificationSettings,
  })
}

export const hideNotification = () => (dispatch: any) => {
  dispatch({
    type: HIDE_NOTIFICATION,
    payload: null,
  })
}

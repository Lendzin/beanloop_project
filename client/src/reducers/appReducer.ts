import {
  HIDE_MODAL,
  SHOW_MODAL,
  HIDE_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../actions/types'

const initialState = {
  isModalOpen: false,
  isLoading: false,
  shouldShowNotification: false,
  notification: {
    type: '',
    color: '',
    autoHide: 5000,
  },
}

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, isModalOpen: action.payload}
    case HIDE_MODAL:
      return {...state, isModalOpen: false}
    case SHOW_NOTIFICATION:
      return {
        ...state,
        shouldShowNotification: true,
        notification: action.payload,
      }
    case HIDE_NOTIFICATION:
      return {...state, shouldShowNotification: false}
    default:
      return state
  }
}

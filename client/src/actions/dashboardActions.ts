import {
  ADD_WIDGET,
  UPDATE_LAYOUT,
  RESET_GRID_STATE,
  REMOVE_WIDGET,
} from './types'

export const addWidget = (widget: any) => async (dispatch: any) => {
  dispatch({
    type: ADD_WIDGET,
    payload: widget,
  })
}

export const removeWidget = (id: any) => async (dispatch: any) => {
  dispatch({
    type: REMOVE_WIDGET,
    payload: id,
  })
}

export const updateLayout = (layoutItem: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_LAYOUT,
    payload: layoutItem,
  })
}

export const resetGridState = () => async (dispatch: any) => {
  dispatch({
    type: RESET_GRID_STATE,
    payload: null,
  })
}

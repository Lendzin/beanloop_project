import {
  ADD_WIDGET,
  UPDATE_LAYOUT,
  RESET_GRID_STATE,
  REMOVE_WIDGET,
} from '../actions/types'

const initialState = {widgets: [], layout: []}

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case RESET_GRID_STATE: {
      return {
        ...state,
        widgets: [],
        layout: [],
      }
    }
    case REMOVE_WIDGET: {
      const filteredWidgets = state.widgets.filter((widget: any) => {
        return widget.id !== action.payload
      })
      const filteredLayout = state.layout.filter((layout: any) => {
        return layout.i !== action.payload
      })
      return {
        ...state,
        widgets: filteredWidgets,
        layout: filteredLayout,
      }
    }
    case ADD_WIDGET: {
      return {
        ...state,
        widgets: [...state.widgets, action.payload.widget],
        layout: [...state.layout, action.payload.layout],
      }
    }
    case UPDATE_LAYOUT: {
      return {
        ...state,
        layout: action.payload,
      }
    }
    default:
      return state
  }
}

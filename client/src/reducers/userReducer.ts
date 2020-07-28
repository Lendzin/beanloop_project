import {
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
  GET_DASHBOARD,
  GET_DASHBOARDS,
  SAVE_DASHBOARD,
  DELETE_DASHBOARD,
  SAVE_TEMPLATE,
  GET_TEMPLATES,
  SELECT_TEMPLATE,
  DELETE_TEMPLATE,
  RESET_TEMPLATE,
  UPDATE_TEMPLATE,
  RERENDER,
  RESET_DASHBOARD_STATE,
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  token: null,
  userData: null,
  dashboard: {},
}

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      }
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      }
    case GET_USER:
      return {
        ...state,
        userData: action.payload,
      }
    case GET_DASHBOARDS:
      return {
        ...state,
        dashboards: action.payload,
      }
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      }
    case RESET_DASHBOARD_STATE:
      return {
        ...state,
        dashboard: action.payload,
      }
    case SAVE_DASHBOARD:
      return {
        ...state,
        dashboards: [...state.dashboards, action.payload],
      }
    case DELETE_DASHBOARD:
      const filtDashboards = state.dashboards.filter((dashboard: any) => {
        return dashboard.Id !== action.payload.Id
      })
      return {
        ...state,
        dashboards: filtDashboards,
      }
    case DELETE_TEMPLATE:
      const filtTemplates = state.templates.filter((template: any) => {
        return template.Id !== action.payload.Id
      })
      return {
        ...state,
        templates: filtTemplates,
      }
    case SAVE_TEMPLATE:
      return {
        ...state,
        template: null,
        templates: [...state.templates, action.payload],
      }
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
      }
    case SELECT_TEMPLATE:
      return {
        ...state,
        template: action.payload,
        isEdit: true,
      }
    case RESET_TEMPLATE:
      return {
        ...state,
        template: action.payload,
        isEdit: false,
      }
    case UPDATE_TEMPLATE:
      const newTemplates = state.templates.map((template: any) => {
        if (template.Id === action.payload.Id) {
          template.configuration = action.payload.configuration
          return template
        } else {
          return template
        }
      })
      return {
        ...state,
        templates: newTemplates,
      }
    case RERENDER:
      return {
        ...state,
        reRender: action.payload,
      }
    default:
      return state
  }
}

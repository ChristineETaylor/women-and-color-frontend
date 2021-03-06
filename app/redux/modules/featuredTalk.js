
// App
import {
  GetRequest, GetSuccess, GetError,
  PostRequest, PostSuccess, PostError,
  PutRequest, PutSuccess, PutError,
  OnChange
} from './action_template';
import { get as getUser } from './user';
import { BASE_URL_PATH } from 'appHelpers/constants';
import axios from 'appHelpers/axios';

const MODULE_NAME = 'featured_talks';
const ENDPOINT_URL = `${BASE_URL_PATH}/api/v1/${MODULE_NAME}/`;

// Actions
function getRequest() {
  return {
    type: GetRequest(MODULE_NAME)
  }
}

export function getSuccess(data) {
  return {
    type: GetSuccess(MODULE_NAME),
    data
  }
}

function getError(error) {
  return {
    type: GetError(MODULE_NAME),
    error
  }
}

function postRequest() {
  return {
    type: PutRequest(MODULE_NAME)
  }
}

function postSuccess(data) {
  return {
    type: PutSuccess(MODULE_NAME),
    data
  }
}

function postError(error) {
  return {
    type: PutError(MODULE_NAME),
    error
  }
}

function putRequest() {
  return {
    type: PutRequest(MODULE_NAME)
  }
}

function putSuccess(data) {
  return {
    type: PutSuccess(MODULE_NAME),
    data
  }
}

function putError(error) {
  return {
    type: PutError(MODULE_NAME),
    error
  }
}

export function onChange(data) {
  return {
    type: OnChange(MODULE_NAME),
    data
  }
}

export function get() {
  return (dispatch, getState) => {
    dispatch(getRequest());
    axios({
      method: 'GET',
      url: `${ENDPOINT_URL}/`,
      responseType: 'json'
    }).then(res => {
      dispatch(getSuccess(res.data));
    }).catch(err => {
      console.log(err);
      dispatch(getError(err));
    });
  }
}

export function create(data) {
  return (dispatch, getState) => {
    dispatch(postRequest());

    axios({
      method: 'POST',
      url: `${ENDPOINT_URL}`,
      data: data,
      responseType: 'json'
    }).then(res => {
      dispatch(postSuccess(res.data));
      dispatch(getUser())
    }).catch(err => {
      console.log(err);
      dispatch(postError(err));
    });
  }
}

export function update(data) {
  return (dispatch, getState) => {
    dispatch(putRequest());

    axios({
      method: 'PUT',
      url: `${ENDPOINT_URL}${data.id}/`,
      data: data,
      responseType: 'json'
    }).then(res => {
      dispatch(putSuccess(res.data));
      dispatch(getUser())
    }).catch(err => {
      console.log(err);
      dispatch(putError(err));
    });
  }
};

export function destroy(data) {
  return (dispatch, getState) => {
    axios({
      method: 'DELETE',
      url: `${ENDPOINT_URL}${data.id}/`,
      data: data,
      responseType: 'json'
    }).then(res => {
      dispatch(getUser())
    }).catch(err => {
      console.log(err);
    });
  }
}

const initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case GetRequest(MODULE_NAME): {
      return {
        ...state,
        isLoading: true,
        isRequesting: true
      }
    }

    case GetSuccess(MODULE_NAME): {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        isRequesting: false,
        ...action.data
      }
    }

    case GetError(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        isLoading: false,
        error: action.error
      }
    }

    case PostRequest(MODULE_NAME): {
      return {
        ...state,
        isRequesting: true
      }
    }

    case PostSuccess(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        ...action.data
      }
    }

    case PostError(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        error: action.error
      }
    }

    case PutRequest(MODULE_NAME): {
      return {
        ...state,
        isRequesting: true
      }
    }

    case PutSuccess(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        ...action.data
      }
    }

    case PutError(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        error: action.error
      }
    }

    case OnChange(MODULE_NAME): {
        return {
            ...state,
            ...action.data
        }
    }

    default:
      return state
  }
}

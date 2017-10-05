import { userConstants } from '../_constants';

export function fileupload(state = {
  upload_request: false,
  upload_success: false,
  response: {}
}, action) {
  switch (action.type) {
    case userConstants.FILE_REQUEST:
      return { upload_request: true };
    case userConstants.FILE_SUCCESS:
      return { upload_request: false,
               upload_success: true,
               response: action.response
             };      
    case userConstants.FILE_FAILURE:
      return { upload_request: false,
               upload_success: false,
               response: action.response
             };   
    default:
      return state
  }
}
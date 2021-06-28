import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiRequestBegan.type) return next(action);
    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "https://jsonplaceholder.typicode.com",
        url,
        method,
        data,
      });
      // General
      dispatch(actions.apiRequestSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(actions.apiRequestFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
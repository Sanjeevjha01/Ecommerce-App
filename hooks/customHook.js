import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useReduxStateHook = (navigation, path = "login") => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
      navigation.reset({
        index: 0,
        routes: [{ name: path }],
      });
    }
  }, [error, dispatch, message]);
  return loading;
};

import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { getUserData } from "./apis/userApis";
import { useDispatch } from "react-redux";
import { setUserData } from "./store/user/userReducer";
import Loader from "./components/loader";
import { customLocalStorage } from "./utils/localStorage";
import { setJoinedRooms } from "./store/room/roomReducer";

const App = () => {
  const dispatch = useDispatch();

  const onLoad = async () => {
    if (customLocalStorage.getData("token")) {
      const res = await getUserData();
      dispatch(setUserData(res.user));
      dispatch(setJoinedRooms(res.user.joinedRooms));
      return res;
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["GET_USER_DATA"],
    queryFn: onLoad,
    retry: false,
  });

  return (
    <>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      {isLoading && <Loader loader={isLoading} />}
    </>
  );
};

export default App;

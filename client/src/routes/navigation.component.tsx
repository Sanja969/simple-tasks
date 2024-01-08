import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/base/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { User, logout } from "../redux/user-reducer";
import { useEffect } from "react";
import { getTasks } from "../redux/tasks-reducer";

export default function Navigation () {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: {userReducer: User}) => state.userReducer);

  useEffect(() => {
    dispatch(getTasks());
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    console.log(user.token)
    if(!user.name) {
      navigate('/login');
    }
  }, [user]);

  return (
    <>
      <div className="h-16 bg-black w-full flex justify-between px-12 items-center">
        <a href="/"><p className="text-white text-[20px] cursor-pointer">Home</p></a>
        {user.name ?
          <div className="">
            <p className="text-white text-[10px]">{user.name}</p>
            <Button className="text-white text-[10px]" onClick={() => handleLogout()}>Logout</Button>
          </div> :
          <a href="/login"><p className="text-white text-[20px] cursor-pointer">Register</p></a>
        }
      </div>
      <Outlet />
    </>
  )
}
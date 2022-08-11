import { React } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillGoogleCircle,
  AiFillFacebook,
  AiFillGithub,
} from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/todolist");
    }
  }, [user]);

  // Login Functions
  function handleLogin() {
    alert("Logging In Successful");
    viewTodoApp();
  }
  function handleDemoLogin() {
    alert("Logging In As Demo !");
    viewTodoApp();
  }
  function viewTodoApp() {
    navigate("/todolist");
  }

  const loginIcons = [
    {
      icon: <AiFillGoogleCircle className="w-8 h-8" />,
      color: `text-red-400`,
      method: handleGoogleSignIn,
    },
    {
      icon: <AiFillFacebook className="w-8 h-8" />,
      color: `text-blue-400`,
      method: handleLogin,
    },
    {
      icon: <AiFillGithub className="w-8 h-8" />,
      color: `text-green-400`,
      method: handleLogin,
    },
  ];

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-tr from-blue-900 to-purple-600">
      <div className="p-8 flex flex-col justify-around rounded-xl shadow-lg bg-white">
        <div className="w-[450px]"></div>
        <form>
          <hr className="mt-4" />
          <div className="flex items-center justify-center space-x-5">
            <p className="text-center font-medium capitalize tracking-wider my-4">
              Login With:{" "}
            </p>
            {loginIcons.map((Icon, index) => (
              <div
                key={index}
                className={`hover:cursor-pointer text-black ${Icon.color} duration-300 hover:scale-110`}
                onClick={Icon.method}
              >
                {Icon.icon}
              </div>
            ))}
          </div>
          <hr className="mb-4" />
          <button
            onClick={handleDemoLogin}
            className="w-full rounded-md py-2 my-4 border-b-[3px] border-b-purple-600 hover:text-purple-500  duration-300"
          >
            Login As Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

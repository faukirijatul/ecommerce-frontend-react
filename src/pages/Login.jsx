import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";

const Login = () => {
  // const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData)).unwrap();

    if (result) {
      if (result.user.role === "admin") {
        navigate(redirect || "/admin/orders", { replace: true });
      } else {
        navigate(redirect || "/", { replace: true });
      }
    }

    // Clear form after successful login
    setFormData({ email: "", password: "" });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800 min-h-[52vh]"
    >
      <div className="inline-flex items-center gap-3 mb-2 mt-10">
        <h1 className="text-3xl font-semibold">Login</h1>
        <hr className="w-8 border-none h-0.5 bg-gray-800" />
      </div>

      <input
        type="email"
        placeholder="Email"
        name="email"
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        onChange={handleChange}
        required
      />

      <div className="w-full flex justify-start text-sm">
        <Link to="#" className="text-gray-700 hover:text-gray-900 font-medium">
          Forgot Password?
        </Link>
      </div>

      <button className="bg-gray-700 active:bg-gray-900 text-white py-2 px-4 w-full">
        {loginLoading ? "Loading..." : "Login"}
      </button>

      <div className="w-full flex justify-center text-sm mt-1">
        Don't have an account?
        <Link
          to="/register"
          className="text-gray-700 hover:text-gray-900 font-medium ml-1"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;

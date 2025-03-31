import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../redux/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { registerLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password not match");
      return;
    }

    const result = await dispatch(registerUser(formData)).unwrap();

    // log payload
    console.log(result);

    if (result.success) {
      navigate("/login", { replace: true });
    }
    // Reset form data after successful registration
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800 min-h-[52vh]"
    >
      <div className="inline-flex items-center gap-3 mb-2 mt-10">
        <h1 className="text-3xl font-semibold">Register</h1>
        <hr className="w-8 border-none h-0.5 bg-gray-800" />
      </div>

      <input
        type="text"
        placeholder="Name"
        name="name"
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        onChange={handleChange}
        required
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        onChange={handleChange}
        required
      />

      <button className="bg-gray-700 active:bg-gray-900 text-white py-2 px-4 w-full">
        {registerLoading ? "Loading..." : "Register"}
      </button>

      <div className="w-full flex justify-center text-sm mt-1">
        Already have an account?
        <Link
          to="/login"
          className="text-gray-700 hover:text-gray-900 font-medium ml-1"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;

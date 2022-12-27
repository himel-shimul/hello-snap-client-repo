import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [err, setErr] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleLogin = (data) => {
    setLoginErr("");
    console.log(data);
    signIn(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
        setLoginErr(err.message);
      });
  };
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl w-[800px] mx-auto my-8">
        <figure>
          <img src="https://i.ibb.co/rFWcv0f/login-img.png" alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Log In</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must be 6 character or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && (
                <p className="text-red-600" role="alert">
                  {errors.password?.message}
                </p>
              )}
              <label className="label">
                <span className="label-text">Forget Password?</span>
              </label>
            </div>
            <input className="btn my-2 w-full" value="login" type="submit" />
            {loginErr && <p className="text-red-400">{loginErr}</p>}
          </form>
          <p>
            <Link className="text-secondary" to="/signup">
              Create new account
            </Link>
          </p>
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

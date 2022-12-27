import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const SignUp = () => {
  const {createUser} = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [err, setErr] = useState('');
    
    const handleSignUp = data =>{
        // setErr('');
        console.log(data);
        createUser(data.email, data.password)
        .then(res => {
          const user = res.user;
          console.log(user);
        })
        .catch(err => {
          console.error(err);
        })

    }
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl w-[800px] mx-auto my-8">
        <figure>
          <img src="https://i.ibb.co/rFWcv0f/login-img.png" alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
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
                  message: "password must be 6 characters on longer",
                },
                pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters'}
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <input
            className="btn my-3 w-full"
            value="Sign Up"
            type="submit"
          />
          {/* {signUpError && <p className="text-red-400">{signUpError}</p>} */}
        </form>
        <p>
          Already have an account? Please 
          <Link className="text-secondary" to="/login"> log in</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

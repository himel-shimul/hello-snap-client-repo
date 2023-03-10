import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const MakePost = () => {
  const {user} = useContext(AuthContext);
  

  const { register, handleSubmit } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  console.log(imageHostKey);
  const handleLogin = data =>{
    console.log(data);
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(imgData => {
        if(imgData.success){
            // console.log(imgData.data.url);
            const post = {
              userName: user.displayName,
              email: user.email,
              script: data.post,
              userImage: user?.photoURL,
              postImage: imgData.data.url
            }
            // console.log(post);
            fetch('https://hello-server-steel.vercel.app/allPosts', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(post)
            })
            .then(res => res.json())
            .then(data => {
              if(data.acknowledged){
                toast.success("Add Successfully");
                Navigate('/media')
                  // form.reset();
              }
            })
        }
    })
  }


  return (
    <div className="card w-[1000px] bg-base-100 shadow-xl my-12 mx-auto">
      <div className="card-body  mx-auto ">
        <h2 className="card-title">Make a post</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {/* <h2 className="card-title">Make a post</h2> */}
            </label>

            <input
              {...register("post")}
              placeholder="What's in your Mind.."
              type="text"
              required
              className="input input-bordered w-full max-w-xs"
            />
            <input />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="card-title">Image</span>
            </label>

            <input
              {...register("image")}
              placeholder="What's in your Mind.."
              type="file"
              className="input input-bordered w-full max-w-xs"
            />
            <input />
          </div>
          {/* <p>{data}</p> */}
          <input className="btn btn-info" value='Submit' type="submit" />
        </form>
        {/* <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default MakePost;

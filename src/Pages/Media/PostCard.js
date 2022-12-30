import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import CommentCard from "./CommentCard";
import love from '../../assets/icons8-heart-48.png';

const PostCard = ({post,refetch}) => {
    const {user} = useContext(AuthContext);
    const {postImage, script, _id,userImage, comment} = post;
    console.log(post);
    // const {
    //     register,
    //     formState: { errors },
    //     handleSubmit,
    //   } = useForm();
    //   const handleComment = (data) =>{
    //     console.log(data);
    //   }
    const handleInputs = e =>{
        e.preventDefault();
        const form = e.target;
        const message = form.message.value;


        const comment = {
            postId: _id,
            userName: user?.displayName,
            userEmail: user?.email,
            userImg: user?.photoURL,
            message
        }
        fetch('https://hello-server-steel.vercel.app/allComments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(comment),
        })
        .then(res => res.json())
        .then(data =>{
            form.reset();
            refetch();
        })
    }

    const url = `https://hello-server-steel.vercel.app/allComments?postId=${_id}`;
    const {data: comments = []} = useQuery({
      queryKey: [],
      queryFn: async () =>{
        const res = await fetch(url);
        const data = await res.json();
            return data;
      }
    })
    console.log(comments);

  return (
    <div className="card lg:w-[800px] bg-base-100 my-6 mx-auto shadow-xl">
      <div className="flex m-8">
              <div className="w-10 rounded-full  ring-primary ring-offset-base-100 ring-offset-2">
            <img className='rounded-full' src={userImage} alt=''/>
          </div>
              <h2 className="card-title mx-3"></h2>
              </div>
      <figure>
        <img src={postImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="flex items-end justify-between">
        <h2 className="card-title">
        {script}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <Link to={`/media/${_id}`}><button className="font-bold">Details </button></Link>
        </div>
        <div className="card-actions justify-start">
          <div className="flex items-center">
            <img src={love} className='w-6 mx-2' alt="" />
            <p className="">50</p>
          </div>
          {/* <div className="badge badge-outline">Products</div> */}
        </div>
        <div>
            {/* <form onSubmit={handleSubmit(handleComment)}>
            <input {...register("comment", {
                  
                })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <input className="btn my-2" value="Comment" type="submit" />
            </form> */}
            <form onSubmit={handleInputs}>
            <input name='message' type="text" placeholder="comment here" className="input input-bordered input-ghost w-full" required/>
            <input className='btn float-right my-2' type="submit" name="" value="submit" />

            </form>

            {
              comments?.map(comment => <CommentCard
              key={comment._id}
              comment={comment}
              ></CommentCard>)
            }
            
            {/* {comment && 
            <div className="card w-[800px] bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
              </div>
              <h2 className="card-title"> Comment</h2>
              <p>{comment}</p>
            </div>
          </div>
            } */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

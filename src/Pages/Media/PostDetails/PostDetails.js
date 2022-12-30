import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const PostDetails = () => {
    const {user} = useContext(AuthContext);
    const details = useLoaderData();
    const {postImage, script, _id, comment} = details;
    console.log(details);
    return (
        <div className="card card-compact w-[1000px] bg-base-100 mx-auto ">
  <figure><img src={postImage} alt="image" /></figure>
  <div className="card-body">
    {/* <h2 className="card-title">{user?.displayName}</h2> */}
    <p className='text-2xl'>{script}</p>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
    );
};

export default PostDetails;
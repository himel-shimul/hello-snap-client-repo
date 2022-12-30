import React from 'react';

const CommentCard = ({comment}) => {
    const { userName, message, userImg} = comment;
    console.log(comment);
    return (
        <div>
            {comment && 
            <div className="card lg:w-[700px] bg-base-100">
            <div className="card-body my-[-20px]">
              <div className="card-actions justify-end">
              </div>
              <div className="flex">
              <div className="w-10 rounded-full  ring-primary ring-offset-base-100 ring-offset-2">
            <img className='rounded-full' src={userImg} alt=''/>
          </div>
              <h2 className="card-title mx-3"> {userName}</h2>
              </div>
              <p>{message}</p>
            </div>
          </div>
            }
        </div>
    );
};

export default CommentCard;
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';

const EditModal = ({email, usr, setUsr, refetch}) => {
    const user = useContext(AuthContext);
    

    const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data, email, usr)
    const userProfile ={
        // email: usr.email,
        // displayName: usr?.displayName,
        // image: usr?.photoURL,
        data
    }
    // console.log(userProfile);

    fetch(`https://hello-server-steel.vercel.app/allUsers/${email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({userProfile: userProfile.data}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
            setUsr(null);
            refetch()
        //   toast.success("added Successfully");
        }
      });

      

    };
    return (
        <div>
            <input type="checkbox" id={email} className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update your Information.</h3>
    <p className="py-4"></p>
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text  font-bold">Your University</span>
            </label>
            <input
              type="text"
              placeholder='Type your university'
              {...register("university", {
                required: "university is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text  font-bold">Gender</span>
            </label>
            <select {...register("gender")} className='w-full border py-2 rounded max-w-xs'>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
        </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Address</span>
            </label>
            <input
              type="text"
              placeholder='Type your address'
              {...register("address", {
                required: "address is required",
              })}
              className="input input-bordered w-full mb-4"
            />
          </div>
          
          <input
          
            className="btn my-3"
            value="Submit"
            type="submit"
            htmlFor={email}
          />
        </form>
    {/* <div className="modal-action">
      <label htmlFor={email} className="btn">Yay!</label>
    </div> */}
  </div>
</div>
        </div>
    );
};

export default EditModal;
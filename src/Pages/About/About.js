import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import EditModal from "./EditModal";

const About = () => {
    const {user} = useContext(AuthContext);
    const [usr, setUsr] = useState(null);
    // const {email} = user;
    console.log(user);
    const url = `https://hello-server-steel.vercel.app/allUsers/${user?.email}`;
      
    // useEffect( () =>{
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         // setReviews(data);
    //     })
    // }, [user?.email, url])
    const {data: currentUser, refetch } =  useQuery({
      queryKey:['allPosts'],
      queryFn: async () =>{
          const res = await fetch(`https://hello-server-steel.vercel.app/allUsers/${user?.email}`, {
              
          })
          const data = await res.json();
          
          return data;
      },
      
  })
  console.log(currentUser);
  const {displayName, gender, university, address, image} = currentUser;

      // if(isLoading){
      //   return <h2>loading</h2>
      // }

  return (
    <div className="hero lg:w-[900px] mx-auto min-h-screen relative bg-base-200">
      <label onClick={() => setUsr(user)} htmlFor={user?.email}><img src='https://img.icons8.com/ios-filled/50/null/pencil--v1.png' alt="" className="absolute right-2 top-2 badge badge-info"></img></label>

    


      <div className="hero-content flex-col-reverse justify-between lg:flex-row">
        <div className="lg:w-96">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <div className="py-6">
          <p className="py-2 font-bold"> Gender: {gender}</p>
          <p className="py-2 font-bold"> University: {university}</p>
          <p className="py-2 font-bold"> Address: {address}</p>
          </div>
        {usr && <EditModal refetch={refetch} email={usr?.email} usr={usr} setUsr={setUsr}></EditModal>}
        </div>
        <img
          src={image}
          className="max-w-sm rounded-lg shadow-2xl mt-4"
        alt=""
        />
      </div>
    </div>
  );
};

export default About;

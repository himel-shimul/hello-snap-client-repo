import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostCard from './PostCard';

const Media = () => {

    const {data: posts = [], refetch } =  useQuery({
        queryKey:['allPosts'],
        queryFn: async () =>{
            const res = await fetch('https://hello-server-steel.vercel.app/allPosts', {
                
            })
            const data = await res.json();
            
            return data;
        },
    })
    // console.log(posts);
    refetch();
    

    return (
        <div className='my-8'>
            {
                posts && posts?.map(post => <PostCard key={post._id} 
                post={post}
                refetch={refetch}
                ></PostCard>)
            }

        </div>
    );
};

export default Media;
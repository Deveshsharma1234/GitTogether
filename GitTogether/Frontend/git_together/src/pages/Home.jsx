import React from 'react';
import UseGetFeed from '../Hooks/useGetFeed';
import FeedCard from '../components/FeedCard';
import { useSelector } from 'react-redux';
//here user get feed of other profile

const Home = () => {
  UseGetFeed();
  const feed = useSelector(store=> store.feed);

  if(!feed)return;
  if(feed.length === 0)return<> 
  <h1 className='text-2xl'>Referesh the page
  </h1>
  
</>




    return (
        <div className='flex flex-wrap   justify-center gap-10 mt-10 mb-20  '>
           {
        // feed?.map((user) => (
        //   <FeedCard
        //     key={user._id}
        //     _id={user._id}
        //     firstName={user.firstName}
        //     lastName={user.lastName}
        //     gender={user.gender}
        //     age={user.age}
        //     photoUrl={user.photoUrl }
        //     disc={user.disc}
        //   />
        // )) 
        <div className='flex justify-center mt-10 mb-20'>
  {feed?.length > 0 && (
    <FeedCard
      key={feed[0]._id}
      _id={feed[0]._id}
      firstName={feed[0].firstName}
      lastName={feed[0].lastName}
      gender={feed[0].gender}
      age={feed[0].age}
      photoUrl={feed[0].photoUrl}
      disc={feed[0].disc}
    />
  )}
</div>

      }
           
      
        </div>
    );
}

export default Home;

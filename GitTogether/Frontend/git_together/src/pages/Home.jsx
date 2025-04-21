import React from 'react';
import UseGetFeed from '../Hooks/useGetFeed';
import FeedCard from '../components/FeedCard';

//here user get feed of other profile

const Home = () => {

  const feed = UseGetFeed();
  




    return (
        <div className='flex flex-wrap   justify-center gap-10 mt-10 mb-20  '>
           {
        feed.map((user) => (
          <FeedCard
            key={user._id}
            _id={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            gender={user.gender}
            age={user.age}
            photoUrl={user.photoUrl }
            disc={user.disc}
          />
        )) 
      }
           
      
        </div>
    );
}

export default Home;

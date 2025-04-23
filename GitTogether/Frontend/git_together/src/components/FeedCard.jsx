import React from 'react';
import useHandleRequest from '../Hooks/useHandleRequest';

const FeedCard = (props) => {
    const handleRequest = useHandleRequest();
    const {_id,firstName,lastName,gender,age,photoUrl,disc} = props;
    console.log(_id,firstName,lastName,gender,age,photoUrl,disc);
    const DUMMU_URL = "https://cdn.pixabay.com/photo/2021/08/11/11/15/man-6538205_1280.jpg";
    return (
        <div className=" bg-base-300 transition-transform hover:scale-105 duration-300 rounded-2xl">
        <div className="card w-80 h-auto shadow-xl hover:shadow-2xl ">
            <figure className="px-4 pt-4">
                <img
                    src={photoUrl || DUMMU_URL}
                    alt="Profile"
                    onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = DUMMU_URL; // your dummy image path
                      }}
                    className="rounded-xl h-60 object-cover w-full"
                />
            </figure>
            <div className="card-body ">
                <h2 className="card-title text-purple-700 text-xl font-bold">
                    {firstName + " " + lastName}
                </h2>
                <p className="text-sm text-gray-300">{age} years | {gender}</p>
                <p className="italic text-gray-100 line-clamp-1">{disc}</p>
                <div className="card-actions mt-4 flex gap-4">
                    <button onClick={()=>{
                        handleRequest("ignore",_id)
                    }} className="btn btn-secondary  hover:scale-105">Ignore</button>
                    <button onClick={()=>{
                        handleRequest("interested",_id)
                    }} className="btn  btn-primary hover:scale-105">Interested</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default FeedCard;

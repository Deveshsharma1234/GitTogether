import React, { useEffect } from 'react';
import useGetConnectionRequests from '../Hooks/useGetConnectionRequests';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { connectionRequest } from '../Redux/Slice/connectionSlice';
import { useSelector } from 'react-redux';
import useReviewReq from '../Hooks/useReviewReq';


const FriendRequest = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connectionRequests?.pendingRequests)
    console.log("from frined req", connections);
    const handleReplyReq = useReviewReq();

    const getConnection = useGetConnectionRequests();
    useEffect(() => {
        const fetchConnections = async () => {
            const connections = await getConnection();
            if (connections) {
                dispatch(connectionRequest(connections));
            }
        };

        fetchConnections();

    }, [])

    // if(!connections) return <>No Connections</>;
    return (
        <div className="p-6 bg-base-200 min-h-screen">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>
      
        {connections?.length === 0  ? (
          <h2 className="text-xl text-center">No Connections</h2>
        ) : (
          connections?.map((connection, index) => {
            const { firstName, lastName, photoUrl, gender } = connection?.fromUserId || {};
            const { status ,_id} = connection;
      
            return (
              <div key={index} className="card card-side bg-base-100 shadow-xl mb-4">
                <figure className="p-4">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 rounded-full object-cover border border-primary"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName} {lastName}</h2>
                  <p className="text-sm capitalize text-gray-500">Gender: {gender}</p>
                  <p className="text-sm text-accent">Status: {status}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-success btn-sm" onClick={()=>{
                      handleReplyReq("accepted",_id)
                    }}>Accept</button>
                    <button className="btn btn-error btn-sm" onClick={()=>{
                      handleReplyReq("rejected",_id)
                    }}>Reject</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
    );
}

export default FriendRequest;

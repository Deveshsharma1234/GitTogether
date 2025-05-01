import React, { useEffect, useState } from 'react';
import useGetFriends from '../Hooks/useGetFriends';

const Friends = () => {
    const connections = useGetFriends();
    const [friends, setFriends] = useState({});

    useEffect(() => {
        const getConnection = async () => {
            const data = await connections();
            setFriends(data);
        };
        getConnection();
    }, []);

    console.log("Hy from connection", friends);
    const data = friends?.data || [];

    return data.length > 0 ? (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Connections</h1>
            <div className="flex flex-col gap-4">
            {data.map((friend, key) => (
    <div
        key={key}
        className="card bg-base-100 shadow-md p-4 flex flex-row items-center space-x-4 hover:shadow-lg hover:bg-base-200 transition-all duration-300 hover:scale-103"
    >
        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
            <img src={friend.friend?.photoUrl} alt="Profile" className="object-cover w-full h-full" />
        </div>
        <div>
            <h2 className="text-lg font-semibold">
                {friend.friend?.firstName} {friend.friend?.lastName}
            </h2>
            <p className="text-sm">Age: {friend.friend?.age}</p>
            <p className="text-sm">Gender: {friend.friend?.gender}</p>
        </div>
    </div>
))}

            </div>
        </div>
    ) : (
        <h1>No Request</h1>
    );
}

export default Friends;

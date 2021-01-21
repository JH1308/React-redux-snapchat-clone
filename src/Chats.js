import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import { db, auth } from './firebase';
import { selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';
import './Chats.css';

import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    // Pull in the snapchats from firebase
    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
    }, []);

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push("/")
    };

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar 
                    src={user.profilePic}
                    className="chats__avatar" 
                    onClick={() => auth.signOut()}
                />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon" /> 
                    <input placeholder='Friends' type="text" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>
           
            <div className="chats__posts">
                {posts.map(
                    ({
                        id, 
                        data: { profilePic, username, timestamp, imageUrl, read },
                    }) => (
                        <Chat
                            key={id}
                            id={id}
                            profilePic={profilePic}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            read={read} 
                        />
                    )
                )}
            </div>

            <RadioButtonUncheckedIcon 
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    );
}

export default Chats;

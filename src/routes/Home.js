import React, {useEffect, useState} from "react";
import {dbService} from "fbase"
import {addDoc, collection, query, onSnapshot, } from "firebase/firestore";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() =>{
        const Q = query(collection(dbService,"nweet"))
        onSnapshot(Q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    },[]);
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService,"nweet"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid, 
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNweet(value);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet=>(
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home; 
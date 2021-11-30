import React, {useEffect, useState} from "react";
import {v4 as uuidv4 } from "uuid";
import {dbService, storageServiece} from "fbase"
import {addDoc, collection, query, onSnapshot, } from "firebase/firestore";
import {ref, uploadString} from "firebase/storage";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

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
        const fileRef = ref(storageServiece,`${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");

        console.log(response);
        /*await addDoc(collection(dbService,"nweet"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid, 
        });
        setNweet("");*/
    };
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNweet(value);
    };
    const onFileChange = (event) =>{
        const {
            target : {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };

        reader.readAsDataURL(theFile);
    }
    const onClearAttachment  = () =>{
        setAttachment(null)
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={nweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map(nweet=>(
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}
export default Home; 
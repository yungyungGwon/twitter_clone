import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

export default (userObj) => {
    const history = useNavigate();
    const onLogOutClick = () =>{
        authService.signOut();
        history("/")
    };
    const getMyNweet = async() => {
        const Q = query(
            collection(dbService, "nweet"), 
            where("creatorId", "==", userObj.uid),
        );
        const querySnapshot = await getDocs(Q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };
    useEffect(() => {
        getMyNweet();
    }, []);
    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
        
    )
}
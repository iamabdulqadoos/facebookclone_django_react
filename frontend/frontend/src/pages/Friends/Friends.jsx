import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Friends.css";


export default function Friends(){

    const [friends,setFriends] = useState([]);


    useEffect(()=>{

        loadFriends();

    },[]);



    const loadFriends = async()=>{

        try{

            const response = await api.get(
                "/friends/list/"
            );

            setFriends(response.data);


        }catch(error){

            console.log(error);

        }

    };



    const removeFriend = async(id)=>{

        try{

            await api.delete(
                `/friends/remove/${id}/`
            );


            loadFriends();


        }catch(error){

            console.log(error);

        }

    };




    return (

        <div className="friends-page">


            <h2>
                My Friends
            </h2>


            {
                friends.length === 0 ?

                (

                    <h3>
                        No Friends Yet
                    </h3>

                )

                :

                (

                    friends.map(friend=>(


                        <div 
                            className="friend-card"
                            key={friend.id}
                        >


                            <img
                                src={
                                    friend.profile_picture
                                    ?
                                    `http://127.0.0.1:8000${friend.profile_picture}`
                                    :
                                    "https://i.pravatar.cc/150"
                                }
                                alt=""
                            />


                            <h3>
                                {friend.username}
                            </h3>



                            <button
                                onClick={()=>
                                    removeFriend(friend.id)
                                }
                            >
                                Remove Friend
                            </button>


                        </div>


                    ))

                )

            }


        </div>

    )

}
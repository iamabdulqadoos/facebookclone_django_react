import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./FriendRequests.css";


export default function FriendRequests() {


    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);



    const fetchRequests = async () => {

        try {

            const response = await api.get(
                "/friends/requests/"
            );

            setRequests(response.data);


        } catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchRequests();

    },[]);



    const acceptRequest = async(id)=>{

        try{

            await api.post(
                `/friends/accept/${id}/`
            );


            fetchRequests();


        }catch(error){

            console.log(error);

        }

    };



    const rejectRequest = async(id)=>{


        try{

            await api.post(
                `/friends/reject/${id}/`
            );


            fetchRequests();


        }catch(error){

            console.log(error);

        }

    };




    if(loading){

        return <h2>Loading Requests...</h2>

    }



    return (

        <div className="requests-page">


            <h2>
                Friend Requests
            </h2>



            {
                requests.length === 0 ? (

                    <div className="no-request">

                        No Friend Requests

                    </div>


                ):(

                    requests.map((request)=>(


                        <div
                            className="request-card"
                            key={request.id}
                        >


                            <img

                                src={
                                    request.sender.profile_picture
                                    ?
                                    `http://127.0.0.1:8000${request.sender.profile_picture}`
                                    :
                                    "https://i.pravatar.cc/100"
                                }

                                alt="profile"

                            />



                            <div className="request-info">


                                <h3>

                                    {request.sender.username}

                                </h3>


                                <div>


                                    <button

                                    className="accept-btn"

                                    onClick={()=>
                                        acceptRequest(request.id)
                                    }

                                    >

                                        Confirm

                                    </button>




                                    <button

                                    className="reject-btn"

                                    onClick={()=>
                                        rejectRequest(request.id)
                                    }

                                    >

                                        Delete

                                    </button>


                                </div>


                            </div>


                        </div>


                    ))

                )
            }


        </div>

    );

}
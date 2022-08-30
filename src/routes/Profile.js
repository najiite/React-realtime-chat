import { useAuth } from "../userContext"
import { supabase } from '../supabaseClient'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { startChat } from "../supabaseStore";

const Profile = () => {
  // Get current user and signOut function from context
  const { user } = useAuth()
  let params = useParams()
  const url = window.location.href
  const [username, setUsername] = useState()
  const [id, setId] = useState()
  const [chatButton, setButton] = useState(false)
  const [userStatus, setUserstatus] = useState(false)
  
  const checkChat = async (user1,user2) =>{
      
    const { data } = await supabase
    .from('chats')
    .select('user1,user2')
    .or(`user1.eq.${user1},user2.eq.${user2}`)
    if (data) {
        
      if (data.length===1) {
        setButton(true)
      }
    }
  }
  checkChat(id,user.id)
  checkChat(user.id,id)

  const getDisplayname = async(userid) => {
       
            let { data,error } = await supabase
            .from('profile')
            .select(`username`)
            .eq('id', `${userid}`).single()
    
            if (error) {
                console.log(error)
            }
            if (data) {
            setUsername(data.username)
            }
    }
      getDisplayname(user.id)
    
   if (params.username) {
 
  const getId = async (userid) => {
                
          let { data,error } = await supabase
          .from('profile')
          .select(`id`)
          .eq('username', `${userid}`).single()

          if (data) {
          setId(data.id)
          }
          if (error) {
            setUserstatus(true)
        }
    }

    getId(params.username)
   }
  
  return (
    <>
      
        <div className=" bg-blue-600">
          <div className="p-5 relative overflow-hidden lg:p-10 lg:flex lg:justify-between mb-20">
            <div className="text-center lg:text-left md:pr-10">
              <h3 className="heading mt-10 lg:mr-60">Welcome {username}</h3>
              <p className="text-white text-2xl font-medium">All messages are end to end encripted. Chat privately and anonymously with family and friends</p>
            </div>
            <img className="align-center" src="../profile.svg" alt="chat-illustration"/>
          </div>

        </div>
        <div className="bg-slate-100 border border-gray-300 my-5 mx-10 p-10 rounded-lg mb-50">
          <h3 className="text-gray-800 text-xl font-semibold">Profile Page</h3>
          {params.username ? (
            <>
              <span>Link: {url}</span>
              {params.username === username ? ( 
                  <>
                  </>
              ):(
                <>
                  
                  {userStatus? //Check if this user profile exist
                            (<h1>This user does not exist</h1>)
                            :
                            
                            (<>{chatButton? //Check if the chat already exist between the two users
                                  (<p>Chat already exist</p>):
                                  (<>
                                    
                                  <h1>Start chatting with {params.username}</h1><button type="button" onClick={()=>{startChat(user.id, id, username, params.username)}} disabled={chatButton} className="t-btn  bg-neutral-700 hover:bg-blue-700 my-5" >Start Chat</button>
                                  </>)
                                }</>
                            )
                  }
                  
                </>
              )}
            </>
          ) : (
            <>
              <span>{url}/{username}</span>
              <p>Share your profile link to start chatting</p>
            </>
          )}
        </div>
    </>
  )
}

export default Profile
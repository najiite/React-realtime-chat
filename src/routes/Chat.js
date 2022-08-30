import { useAuth } from '../userContext'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useState, useEffect, useRef } from "react";
import {FaUser} from 'react-icons/fa'
import Message from '../components/Message';
import { sendMessage } from '../supabaseStore';

const Chat = () => {
  const { user } = useAuth()
  let params = useParams()
  const chatkey = params.chatkey
  const receiver = params.userid
  const [username, setUsername] = useState()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewmessage] = useState('')
  const scrollBottom = useRef()

    useEffect(() => {
          
        const mySubscription = supabase
        .from('messages')
        .on('*', (payload) => {
          setMessages((curr) => {return [...curr, payload.new]})
        })
        .subscribe()

        return ()=>{
          supabase.removeSubscription(mySubscription)
        }

    }, [])
    useEffect(() => scrollBottom.current.scrollIntoView({behavior: 'smooth'}),[messages]);
   
   
   useEffect(() => {
    supabase.from('messages').select().eq('chatkey', chatkey).order('created_at').then(({ data, error }) => {
      if (!error) {
        setMessages(data)
      }
    })

    
    }, [chatkey])

  
  

  async function getDisplayname(userid) {
        
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
  getDisplayname(receiver)

  const handleSend = (e) =>{
      e.preventDefault()

      sendMessage(chatkey,user.id,receiver,newMessage)
      setNewmessage('')
  }

  return (
    <div className="bg-cover  pb-10 px-1">
        <div className="flex flex-col w-full lg:max-w-lg mx-auto">
            <div className='bottom-0'>
              <div className='p-10 flex items-center text-lg'><FaUser /> &nbsp;<span className=' font-semibold'>{username}</span></div>
              {messages.map((message) => (
                                <Message key={message.id} message={message} userid={user.id}/>
                            ))}
            </div>
            <div className="mt-5 fixed bottom-0 lg:max-w-lg w-screen">
              <div>
                <form onSubmit={handleSend}>
                    <input value={newMessage} onChange={(e) => setNewmessage(e.target.value)} className="border border-neutral-500 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-900 block w-full p-2.5" type="text" placeholder="enter message" />
                </form>

              </div>
            </div>
            <div ref={scrollBottom}></div>
        </div>
    </div>
  )
}

export default Chat
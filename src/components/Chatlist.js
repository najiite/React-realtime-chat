import { useAuth } from "../userContext"
import {deleteChat} from '../supabaseStore'
import { FaRegTrashAlt, FaUser} from 'react-icons/fa'

const Chatlist = ({chat}) => {
    const { user } = useAuth();
    let receiver
    let recipient
    if (user.id === chat.user1) {
        receiver = chat.user2
        recipient  = chat.username2
    } else {
        receiver = chat.user1
        recipient  = chat.username1
        
    }
  return (
    <>
        <li>
            <div  className="flex items-center justify-between p-2 text-base font-normal  text-blue-600 hover:text-neutral-100 rounded-lg dark:text-white hover:bg-blue-600">
            <a href={`/chat/${chat.chatkey}/${receiver}`} className="flex items-center">
                <FaUser />
                    <span className="flex-1 text-xs ml-3 whitespace-nowrap">{recipient}</span>
                    
                </a>
                <button onClick={() => {deleteChat(chat.chatkey)}} className="items-end px-2 ml-3 text-sm font-medium hover:text-red-600">
                    <FaRegTrashAlt/>
                </button>  
            </div>
        </li>
    </>
  )
}

export default Chatlist
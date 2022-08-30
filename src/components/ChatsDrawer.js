import { useState, useEffect } from "react"
import {supabase} from '../supabaseClient'
import Chatlist from "./Chatlist"
import { FaComments, FaTimes } from 'react-icons/fa'
import { useAuth } from "../userContext"

const ChatsDrawer = () => {
    const [chats, setChats] = useState([])
    const { user} = useAuth()
    useEffect(() => {
        const getChats = async() =>{
            const {data,error} = await supabase.from('chats').select()
            if (error) {
                console.log(error)
            }
            setChats(data)
        }
        getChats()
        

        }, []);
    
    const [opacity, setOpacity] = useState('invisible')
    const handleDrawer =()=>{
      opacity === 'invisible' ? setOpacity('visible') : setOpacity('invisible')
    }
  return (
    <>
        {!user ? (
            <></>

        ):(
            
        <div>
            <aside id="drawer-example" 
                    className={`fixed z-40 h-screen ${opacity} p-4 mt-10 overflow-y-auto bg-white w-80
                        dark:bg-gray-800 transition-transform left-0 top-0 transform-none`} 
                        tabIndex="-1" aria-labelledby="drawer-label" aria-modal="true" role="dialog">
                    <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">Active Chats</h5>
                    <button onClick={handleDrawer} type="button" data-drawer-dismiss="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <FaTimes />
                    </button>
                    <div className="py-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {chats.map((chat) => (
                                <Chatlist key={chat.chatkey} chat={chat} />
                            ))}
                        </ul>
                    </div>
                </aside>

            <div 
                className=" bg-white border border-blue-900 rounded-full fixed right-0 top-[15%]">
                    <div>
                        
                            <button onClick={handleDrawer} className="m-3 text-blue-900 hover:opacity-50 text-2xl font-bold">   
                            <FaComments />
                            </button>
                        </div>
            </div>
        </div>
        )}
    </>
        
  )
}

export default ChatsDrawer
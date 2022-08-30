import {supabase} from './supabaseClient'
import uuid from 'react-uuid'

export const deleteChat = async (chatkey)=>{
    const {error } = await supabase
        .from('messages')
        .delete()
        .eq('chatkey', chatkey)

         await supabase
        .from('chats')
        .delete()
        .eq('chatkey', chatkey)


        if (error) {
            console.log(error)
        }
        window.location = '/'
}
export const sendMessage  = async (chatkey,sender,receiver,message) => {
    const { error } = await supabase
  .from('messages')
  .insert([
    { sender: sender, receiver: receiver, chatkey: chatkey, message: message},
  ])
    if (error) {
        console.log(error)
    }
}

//create new chat
export const startChat  = async (user1,user2,username1,username2) => {
    const chatkey = uuid()
    const { error } = await supabase
    .from('chats')
    .insert([
        { chatkey, user1, user2,username1,username2},
    ])
    if (error) {
        console.log(error)
    }
    window.location = `/chat/${chatkey}/${user2}`
}

const Message = ({message, userid}) => {
  const timestamp = new Date(message.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const onDoubleClickh =()=>{
    console.log('logged')
  }
 
  return (
    <div onMouseDown={() => onDoubleClickh(message.id)} className={`chat-bubble-receiver ${message.sender === userid ? 'chat-bubble-sender' : 'chat-bubble-receiver'}`}>
                  {message.message}
                  <div className="text-right" >
                    <span className="text-[10px]">{timestamp}</span>
                  </div>
    </div>
  )
}

export default Message

import { useAuth } from '../userContext'
import Login from "../components/Login"
import Register from "../components/Register"

const Home = () => {
  const { user } = useAuth();
  return (
    <div className=" bg-blue-600">
      <div className="px-5 md:p-10 lg:flex lg:justify-between py-20">
        <div className="text-center lg:text-left lg:pr-10">
          <h3 className="heading mt-10 lg:mr-60">Welcome to Wixper Webchat</h3>
          <p className="text-white text-2xl font-medium">All messages are end to end encripted. Chat privately and anonymously with family and friends</p>
        </div>
        <img src="chat.svg" alt="chat-illustration"/>
      </div>

      {!user ? (
      <div className="bg-blue-700  md:flex md:justify-between py-10">
      
        <Login />
        <Register />
      </div>
       ):(
      <div>
      </div>
       )}
    </div>
  )
}

export default Home
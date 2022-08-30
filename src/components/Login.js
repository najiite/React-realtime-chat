import { useState } from 'react'
import { supabase } from '../supabaseClient'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [loginemail, setEmail] = useState('')
  const [loginpassword, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({
        email: loginemail,
        password: loginpassword
        })
      if (error) throw error
      alert('Logged in')
    } catch (error) {
      alert(error.error_description || error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="bg-gray-50 rounded m-10 p-10">

            <h3 className="text-center text-neutral-700 text-2xl font-semibold">Login</h3>
            <p className="m-3 text-center text-neutral-700 font-semibold">Login with your email</p>
            {loading ? (
          <img src='/loading.png' className='motion-safe:animate-[spin_2s_linear_infinite] w-auto h-auto' alt='loading...'/>
        ) : (
            <form className="m-5"  onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="input" value={loginemail} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password"  className="input" value={loginpassword} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="t-btn  bg-neutral-700 hover:bg-blue-700 my-5">Login</button>
            </form>
        )}
        </div>
  )
}

export default Login
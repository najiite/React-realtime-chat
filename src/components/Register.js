import { useState } from 'react'
import { supabase } from '../supabaseClient'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
        const {error} = await supabase.auth.signUp({
            email: email,
            password: password
            },
            {
                data: {
                    username: username
                }
            })

        if (error) throw error
        alert("Registration successful")
        
    } catch (error) {
        console.error(error)
        alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }

}
  return (
    
    <div className="bg-gray-50 rounded m-10 p-10">

        <h3 className="text-center text-neutral-700 text-2xl font-semibold">New User? Register</h3>
        <p className="m-3 text-center text-neutral-700 font-semibold">Register with your email</p>
        {loading ? (
          <img src='/loading.png' className='motion-safe:animate-[spin_2s_linear_infinite] w-auto h-auto' alt='loading...'/>
        ) : (
        <form className="m-5"   onSubmit={registerUser}>
                <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Username(Display name)" className="input" pattern="[A-Za-z0-9]+" maxLength="15"  value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password"  className="input"  value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="t-btn bg-neutral-700 hover:bg-blue-700 my-5">Register</button>
        </form>
        )}
    </div>
  )
}

export default Register
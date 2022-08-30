import { useState} from "react";
import { FaBars } from 'react-icons/fa';
import { useAuth } from "../userContext"
import { useNavigate, Link  } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { user,signOut  } = useAuth();

    const logOut =(e)=>{
      e.preventDefault()
      signOut()
      navigate("/");
    }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-3xl uppercase text-neutral-900"
              href="/"
            >
              Wixper
            </a>
            <button
              className="text-slate-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars className="" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                
              <Link className="px-3 py-2 flex items-center text-lg uppercase font-semibold leading-snug text-slate-700 hover:text-blue-600 hover:scale-110" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="px-3 py-2 flex items-center text-lg uppercase font-semibold leading-snug text-slate-700 hover:text-blue-600 hover:scale-110" to="about">About</Link>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-lg uppercase font-semibold leading-snug text-slate-700 hover:text-blue-600 hover:scale-110"
                  href="#pablo"
                >Github
                </a>
              </li>
              {user &&
              <>
                  <li className="nav-item">
                    
                <Link className="px-3 py-2 flex items-center text-lg uppercase font-semibold leading-snug text-slate-700 hover:text-blue-600 hover:scale-110" to="profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <a 
                      onClick={logOut}
                      className="px-3 py-2 flex items-center text-lg uppercase font-semibold leading-snug text-slate-700 hover:text-blue-600 hover:scale-110"
                      href="/"
                    >Logout
                    </a>
                  </li>
              </>
                 
             }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
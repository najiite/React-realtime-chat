import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

//User Authentication Context
import { AuthProvider } from "./userContext";

//Routes Import
import Home from "./routes/Home"
import Profile from "./routes/Profile"
import Chat from "./routes/Chat"
import { ProtectedRoute } from "./ProtectedRoute";

//Components Import
import Header from "./components/Header";
import ChatsDrawer from "./components/ChatsDrawer";



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="mx-auto">
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='about' element={<Home />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path='profile' element={<Profile />}>
                <Route path=":username" element={<Profile />} />
              </Route>
              <Route path='chat' element={<Chat />}>
                <Route path=":chatkey/:userid" element={<Profile />} />
              </Route>
            </Route>
            
          </Routes>
          <ChatsDrawer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

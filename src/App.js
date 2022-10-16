import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
//import Query from './components/Query'
import Profile from './components/Profile';
import {useAuth0} from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import UserRecordList from "./components/userRecordList";
import Edit from "./components/edit";
import Create from "./components/create";

function App() {
  const {isLoading, error} = useAuth0;
  return (
    <main className="column">
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading &&  (
        <table cellpadding="0" cellspacing="0" border="0" height="100%"> 
        <tr>
          <td class='centerleft'>
          <div class="fonttext">Auth0 Login</div>
          <LoginButton />
          <LogoutButton />
          <Profile />
          <Navbar />
          </td>
          <td class ='centerright'>
          <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/query" element={<UserRecordList />} />
          </Routes>
          </td></tr>
          </table> 
      )}

    </main>
  );
}

export default App;

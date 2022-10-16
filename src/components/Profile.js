import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css'
const Profile = () => {
    const { user, isAuthenticated } = useAuth0()
    return (
        isAuthenticated && (
            <article className="column">
                {user?.picture && <img src={user.picture} alt={user?.name} width="200" height="200"/> }
                <h1>{user?.name}</h1>
            </article>
        
        )
    )
}

export default Profile
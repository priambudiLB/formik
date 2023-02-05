import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    // logic
    useEffect(() => {
        if (!localStorage.getItem('SID')) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <p>Profile</p>
    );
}

export default Profile;
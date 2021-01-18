import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext"
import "./Home.css"

function Home() {

    const { currentUser } = useContext(UserContext);

    return (
        <section className="home">
            <h1 class="home-title"> Jobly</h1>
            {currentUser
                ?
                <h4 className="home-welcome">Welcome Back! {currentUser.username}</h4>
                :
                <div className="home-links">
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            }


        </section>
    );
}

export default Home;

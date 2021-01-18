import React, { useContext } from "react";
import UserContext from "./UserContext"
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import "./NavBar.css"

const NavBar = () => {

    const { currentUser, setCurrentUser, LogOut } = useContext(UserContext)

    return (

        <Navbar>
            <Nav className="nav navbar-nav navbar-right" >
                <NavItem>
                    <NavLink href="/">
                        Jobly
                        </NavLink>
                </NavItem>
            </Nav>
            <Nav >
                {currentUser
                    ?
                    <>
                        <NavItem>
                            <NavLink href="/companies" >
                                Companies
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/jobs" >
                                Jobs
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/profile" >
                                Profile
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/" onClick={LogOut}>
                                Log out {currentUser.username}
                            </NavLink>
                        </NavItem>
                    </>
                    :
                    <>
                        <NavItem>
                            <NavLink href="/login" >
                                Login
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/signup" >
                                Signup
                                </NavLink>
                        </NavItem>
                    </>
                }


            </Nav>
        </Navbar>

    )
}

export default NavBar;
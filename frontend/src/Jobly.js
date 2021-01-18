import React, { useState, useEffect } from 'react'
import NavBar from "./NavBar"
import Home from "./Home"
import CompanyList from "./Company/CompanyList"
import JobList from "./Job/JobList"
import Login from "./Auth/Login"
import SignUp from "./Auth/SignUp"
import Profile from "./Profile"
import JoblyApi from "./api"
import PrivateRoutes from "./PrivateRoutes"
import CompanyDetail from "./Company/CompanyDetail"
import UserContext from "./UserContext"
import useLocalStorage from "./useLocalStorage"
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"


const Jobly = () => {

    const [companyList, setCompanyList] = useState([])
    const [jobList, setJobList] = useState([])
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage("jobly-token")
    const [applicationIds, setApplicationIds] = useState(new Set([]));
    const history = useHistory()

    useEffect(() => {
        async function getCurrentUser() {
            if (token) {
                try {
                    let { username } = jwt.decode(token)
                    JoblyApi.token = token;
                    let currentUser = await JoblyApi.getCurrentUser(username);
                    setCurrentUser(currentUser)
                    setApplicationIds(new Set(currentUser.applications));
                } catch (e) {
                    console.error("Problem loading", e)
                    setCurrentUser(null)
                }
            }
            setInfoLoaded(true);
        }
        setInfoLoaded(false);
        getCurrentUser()
    }, [token])

    useEffect(() => {
        async function getAllCompanies() {
            let company = await JoblyApi.getAllCompanies();
            setCompanyList(company.companies)
        }
        getAllCompanies();
    }, []);

    useEffect(() => {
        async function getAllJobs() {
            let jobs = await JoblyApi.getAllJobs();
            setJobList(jobs.jobs)
        }
        getAllJobs();
    }, []);

    const searchCompany = async (name) => {
        let company = await JoblyApi.getAllCompanies(name);
        setCompanyList(company.companies)
    }

    const searchJob = async (title) => {
        let jobs = await JoblyApi.getAllJobs(title);
        setJobList(jobs.jobs)
    }

    const SignUpData = async (data) => {
        try {
            let signupToken = await JoblyApi.signup(data);
            setToken(signupToken)
            return { success: true };
        } catch (e) {
            console.error("Signing failed")
            return { success: false }
        }
    }

    const LoginData = async (data) => {
        try {
            let loginToken = await JoblyApi.login(data);
            setToken(loginToken)
            return { success: true };
        } catch (e) {
            console.error("Login failed")
            return { success: false }
        }
    }

    const LogOut = () => {
        setCurrentUser(null)
        setToken("")
    }

    function hasAppliedToJob(id) {
        return applicationIds.has(id);
    }

    function applyToJob(id) {
        if (hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(currentUser.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    }

    if (!infoLoaded) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ currentUser, setCurrentUser, LogOut, hasAppliedToJob, applyToJob }}>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login
                            LoginData={LoginData}
                        />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp
                            SignUpData={SignUpData}
                        />
                    </Route>
                    <PrivateRoutes exact path="/companies">
                        <CompanyList
                            searchCompany={searchCompany}
                            companyList={companyList} />
                    </PrivateRoutes>
                    <PrivateRoutes exact path="/companies/:handle">
                        <CompanyDetail />
                    </PrivateRoutes>
                    <PrivateRoutes exact path="/jobs">
                        <JobList
                            searchJob={searchJob}
                            jobList={jobList} />
                    </PrivateRoutes>
                    <PrivateRoutes exact path="/profile">
                        <Profile />
                    </PrivateRoutes>
                    <Redirect to="/" />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Jobly;
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import JoblyApi from "../api"
import JobCard from "../Job/JobCard"
import {
    Container,
} from "reactstrap";
import "./CompanyDetail.css"

const CompanyDetail = () => {

    const { handle } = useParams()
    const [companyDetail, setCompanyDetail] = useState(null)


    useEffect(() => {
        async function filterJobs() {
            let companyJobs = await JoblyApi.getCompany(handle);
            setCompanyDetail(companyJobs)
        }
        filterJobs();
    }, [handle]);

    if (!companyDetail) return <div>is Loading</div>

    return (
        <div>
            <Container className="CompanyDetail">
                <h3>{companyDetail.name}</h3>
                <p>{companyDetail.description}</p>
                {companyDetail.jobs.map(job => (
                    <JobCard key={job.id}
                        id={job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        companyName={job.companyName} />
                ))}

            </Container>
        </div>
    )
}

export default CompanyDetail

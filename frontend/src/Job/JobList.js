import React, { useState } from 'react'
import {
    Button,
    Container,
    Form,
    InputGroup,
    Input,
    InputGroupAddon
} from "reactstrap";
import JobCard from "./JobCard"
import "./JobList.css"


const JobList = ({ searchJob, jobList }) => {

    const [searchBar, setSearchBar] = useState({
        search: ''
    })

    const handleSearch = (e) => {
        const { name, value } = e.target
        setSearchBar(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        searchJob(searchBar.search)
    }

    return (
        <div>
            <Container>
                <Form className="JobList-form" onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            id="search"
                            type="text"
                            name="search"
                            value={searchBar.search}
                            onChange={handleSearch}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="success">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
                {jobList.map(job => (
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

export default JobList

import React, { useState } from 'react'
import {
    Container,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Form
} from "reactstrap";
import CompanyCard from "./CompanyCard"
import "./CompanyList.css"

const CompanyList = ({ searchCompany, companyList }) => {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        searchCompany(searchBar.search)
    }

    return (
        <div>
            <Container>
                <Form className="CompanyList-form" onSubmit={handleSubmit}>
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
                <CompanyCard info={companyList} />
            </Container>
        </div>
    )
}

export default CompanyList

import React, { useState } from 'react'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    Container
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./SignUp.css"

const SignUp = ({ SignUpData }) => {
    const history = useHistory()
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        let res = await SignUpData(formData)
        if (res.success) {
            history.push("/companies")
        } else {
            console.log("error")
        }

    }

    return (
        <Container>
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <Card className="Signup-card">
                    <h1>SignUp</h1>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Username:</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password:</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>First Name:</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name:</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email:</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button color="primary">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default SignUp

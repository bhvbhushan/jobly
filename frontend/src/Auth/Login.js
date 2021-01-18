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
import "./Login.css"

const Login = ({ LoginData }) => {

    const history = useHistory()
    const INITIAL_STATE = {
        username: '',
        password: ''
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
        let res = await LoginData(formData)
        if (res.success) {
            history.push("/companies")
        } else {
            console.log("error")
        }
    }

    return (
        <Container>
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <Card className="Login-card">
                    <h1>Login</h1>
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
                            <Button color="primary">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default Login

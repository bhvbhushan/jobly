import React, { useState, useContext } from 'react'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    Container,
    CardText
} from "reactstrap";
import JoblyApi from "./api"
import UserContext from "./UserContext";
import "./Profile.css"


const Profile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            console.log("Error")
            return;
        }

        setFormData(data => ({ ...data, password: "" }));
        setCurrentUser(updatedUser);
    }

    return (
        <Container className="Profile-container">
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <h1>Profile</h1>
                <Card className="Profile-card">
                    <CardBody>
                        <Label>Username:</Label>
                        <CardText>{currentUser.username}</CardText>
                    </CardBody>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>First Name:</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name:</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    value={formData.lastName}
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
                            <FormGroup>
                                <Label>Confirm password to make changes:</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button color="primary">Save Changes</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default Profile

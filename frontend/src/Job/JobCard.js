import React, { useContext, useState } from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
} from "reactstrap";
import UserContext from "../UserContext";
import "./JobCard.css"


const JobCard = ({ id, title, salary, equity, companyName }) => {

    const [applied, setApplied] = useState(false)
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);

    React.useEffect(function updateAppliedStatus() {
        console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    const handleClick = async (e) => {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div>
            <Card className="JobCard">
                <CardBody >
                    <CardTitle>
                        <h4>{title}</h4>
                    </CardTitle>
                    <CardText className="JobCard-CardText">
                        {companyName}
                        <div>
                            <small>
                                Salary: ${salary}
                            </small>
                        </div>
                        <div>
                            <small>
                                Equity: {equity}
                            </small>
                        </div>
                        <Button
                            className="JobCard-button"
                            color="primary"
                            onClick={handleClick}
                        >{applied ? "APPLIED" : "APPLY"}</Button>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default JobCard

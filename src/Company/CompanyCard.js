import React from 'react'
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
} from "reactstrap";
import "./CompanyCard.css"

const CompanyCard = ({ info }) => {

    return (
        <div>
            {info.map(data => (
                <Link to={`/companies/${data.handle}`}>
                    <Card className="CompanyCard">
                        <CardBody>
                            <CardTitle>
                                <h4>{data.name}</h4>
                                {data.logoUrl
                                    ?
                                    <img src={`${data.logoUrl}`}></img>
                                    :
                                    null
                                }
                            </CardTitle>
                            <CardText>
                                {data.description}
                            </CardText>
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default CompanyCard

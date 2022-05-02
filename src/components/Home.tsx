import React, {FC} from 'react';
import {Col} from "react-bootstrap";


interface HomeProps {
}

const Home: FC<HomeProps> = () => (
    <Col className="mx-auto mt-5 text-center px-4 px-lg-5">
        <h1 className="mb-4">Covid Impact on Transport</h1>
        <p>Welcome to the Covid impact on transport app!</p>
        <p>
            This app shows the impact of Covid on the transport in the world.
            You can choose between different airports in different countries and compare
            the number of flights with the number of cases in selected time.
        </p>
    </Col>
);

export default Home;

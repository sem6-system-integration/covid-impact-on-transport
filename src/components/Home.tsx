import React, {FC} from 'react';


interface HomeProps {
}

const Home: FC<HomeProps> = () => (
    <div className="mx-auto mt-5 text-center">
        <h1 className="mb-4">Covid impact on transport</h1>
        <p>Welcome to the Covid impact on transport app!</p>
        <p>
            This app shows the impact of Covid on the transport in the world.
            You can choose between different airports in different countries and compare
            the number of flights with the number of cases in selected time.
        </p>
    </div>
);

export default Home;

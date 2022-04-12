import React, {FC} from 'react';
import NavbarLink from "../NavbarLink/NavbarLink";
import NavbarUserDropdown from "../NavbarUserDropdown/NavbarUserDropdown";


interface NavbarProps {
}

const Navbar: FC<NavbarProps> = () => {
    const token = localStorage.getItem("token");
    const username = token ? JSON.parse(atob(token.split('.')[1])).username : null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Covid impact on transport</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <NavbarLink to="/" text="Home"/>
                        <NavbarLink to="/flights" text="Flights"/>
                    </ul>
                    <div className="nav-item dropdown ms-auto">
                        <ul className="navbar-nav">
                            {!token &&
                                <>
                                    <NavbarLink to="/login" text="Login"/>
                                    <NavbarLink to="/register" text="Register"/>
                                </>
                            }
                            {token && <NavbarUserDropdown username={username}/>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

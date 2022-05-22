import React, { useEffect, useState, useRef  } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/auth';
import { push } from 'connected-react-router';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {

    const dispatch = useDispatch();

    const { auth, cart } = useSelector(redux => redux);
    const onClickLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(push("/"));
    }

    const ref = useRef(null);

    const [navExpanded, setNavExpanded] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setNavExpanded(false);
            }
          };
          document.addEventListener('click', handleClickOutside, true);
          return () => {
            document.removeEventListener('click', handleClickOutside, true);
          };
    },[]);

    //console.log("Auth user info ", isAuth);
    return (

        <Navbar ref={ref} bg="light" expand="lg"
            onToggle={setNavExpanded}
            expanded={navExpanded}
        >
            <Container>
                <Link className="navbar-brand" to="/">Авто запчастини</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" onClick={() => setNavExpanded(false)}>
                        <Link className="nav-link active" aria-current="page" to="/">Головна</Link>
                    </Nav>
                    {!auth.isAuth ?
                        <Nav onClick={() => setNavExpanded(false)}>
                            <Link className="nav-link" to="/login">Вхід</Link>
                            <Link className="nav-link" to="/register">Реєструватися</Link>
                        </Nav>
                        :
                        <Nav onClick={() => setNavExpanded(false)}>
                            <Link className="nav-link" to="/cart">
                                <i className="pi pi-shopping-cart" style={{ fontSize: "2rem" }}></i>
                                {cart.count}
                            </Link>
                            <Link className="nav-link" to="/profile">{auth.user.name}</Link>
                            <Link className="nav-link" to="/logout" onClick={onClickLogout}>Вихід</Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header

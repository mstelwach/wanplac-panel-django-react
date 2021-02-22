import React from 'react';
import {Link} from "react-router-dom";
import {
    Nav,
    NavItem,
    NavbarBrand,
    Navbar,
    Container,
    UncontrolledCollapse,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap'
import './Navigation.css'
import {FaHome, FaRoute, RiSailboatFill, RiReservedFill, FaList, RiAddCircleFill} from "react-icons/all";


class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isBodyClick: false
      }
    };

    renderBodyClick() {
        const isBodyClick = this.state.isBodyClick;
        if (isBodyClick) {
            return (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        this.setState({isBodyClick: false})
                    }}
                />
            )
        }
    };

    render() {
        return (
            <>
                {this.renderBodyClick()}
                <Navbar color="danger" expand="lg">
                    <Container>
                      <div className="navbar-translate">
                        <NavbarBrand href="/">
                          WanPlac Rezerwacja
                        </NavbarBrand>
                        <button
                          className="navbar-toggler"
                          id="example-navbar-danger"
                          type="button"
                          onClick={(e) => {
                              document.documentElement.classList.toggle("nav-open");
                              this.setState({isBodyClick: true});
                          }}
                        >
                          <span className="navbar-toggler-bar bar1" />
                          <span className="navbar-toggler-bar bar2" />
                          <span className="navbar-toggler-bar bar3" />
                        </button>
                      </div>
                      <UncontrolledCollapse navbar toggler="#example-navbar-danger">
                        <Nav className="ml-auto" navbar>
                            <NavItem className="active">
                                <Link to='/' className='nav-link'>
                                    <FaHome />
                                    Strona Główna
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/kayak/list' className='nav-link' role='button'>
                                    <RiSailboatFill />
                                    Kajaki
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/route/list' className='nav-link'>
                                    <FaRoute />
                                    Trasy
                                </Link>
                            </NavItem>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                  aria-haspopup={true}
                                  caret
                                  color="default"
                                  data-toggle="dropdown"
                                  href="/"
                                  id="navbarDropdownMenuLink"
                                  nav
                                  onClick={e => e.preventDefault()}
                                >
                                    <RiReservedFill />
                                    Rezerwacje
                                </DropdownToggle>
                                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                                    <Link to='/reservation/list' className='dropdown-item' onClick={() => { document.body.click() }}>
                                        <FaList />
                                        Lista rezerwacji
                                    </Link>
                                    <Link to='/reservation/create' className='dropdown-item' onClick={() => { document.body.click() }}>
                                        <RiAddCircleFill />
                                        Dodaj rezerwację
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                      </UncontrolledCollapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default Navigation;
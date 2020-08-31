import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
NavLink,
Dropdown,
DropdownToggle,
DropdownMenu,
DropdownItem,
InputGroup,
InputGroupAddon,
InputGroupText,
FormInput,
Collapse
} from "shards-react";

const Header = ({ siteTitle }) => (

//   <Navbar   style={{
//         //  background: ``,
//          marginBottom: `1.90rem`,
//        }}

//     type="light" theme="primary" expand="md">
//   <Nav navbar className="ml-auto">
//   <NavbarBrand href="#">Home</NavbarBrand>

//           </Nav>
// </Navbar>
  <header
    style={{
      background: ``,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

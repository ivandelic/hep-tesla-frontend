import React, {Component} from "react";
import { Link } from 'react-router-dom';
import logo from'../../theme/default/logo.png';

class SideMenu extends Component {
    render() {
        return (
            <div className="tesla-bar tesla-bar-side">
                <div className="tesla-logo">
                    <img src={logo} width="25px" />
                </div>
                <ul className="tesla-menu tesla-menu-icon tesla-menu-icon-vertical">
                    <li>
                        <Link to="/">
                            <span className="pi fa-fw pi-home" title="Home"></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/powerplant">
                            <span className="pi fa-fw pi-star" title="Powerplants"></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/region">
                            <span className="pi fa-fw pi-globe" title="Regions"></span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideMenu;
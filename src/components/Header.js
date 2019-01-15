import React, {Component} from 'react';
import { connect } from 'react-redux';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return "still deciding";
            case false:
                return "not logged in";
            default:
                return 'im logged';
        }
    }

    render () {
        return (
            <nav>
                <div className="nav-wrapper black">
                    <a className="left brand-logo">
                        PROOptyk
                    </a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}) {
    return { auth }
}

export default connect(mapStateToProps)(Header);

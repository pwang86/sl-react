
import React from "react";
import { redirect } from "./helper";
/*
class Logout extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isLogout: false
        };
    }
    componentDidMount() {
        this.setState({ isLogout: true });
        if (this.state.isLogout) {
            setTimeout(() => {
                redirect("/login");
            }, 6000);
        }
    }

    render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h3 className="title">Logging out. Please wait...</h3>
                    </div>
                </div>
            </section>
        );
    }
}

export default Logout;
*/

class Logout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLogout: false
        };
    }
    componentDidMount() {
      setTimeout(() => 
        redirect("/login"), 1000);
    }
    render() {
      return (
        <h3>Logging out. Please wait...</h3>
        );
    }
}

export default Logout;
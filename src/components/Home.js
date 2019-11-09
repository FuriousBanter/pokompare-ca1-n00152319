import React, { Component } from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div class="col-md-4 mx-auto">
                        <h1 className="title">Welcome to PoKompare!</h1>

                        <Link to={`/components/pokelist`}><button>Get Started!</button></Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

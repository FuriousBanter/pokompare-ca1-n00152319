import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <img src="http://pngimg.com/uploads/pokeball/pokeball_PNG19.png" width="2%"></img>
                <h2 className="navbar-brand"><Link to="/" className="nav-link">PoKompare: A Pokédex with PokeAPI</Link></h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active"><Link to="../components/pokelist" className="nav-link">Pokelist</Link></li>
                    </ul>
                    

                    <hr/>
                </div>
            </div>
        )
    }
}

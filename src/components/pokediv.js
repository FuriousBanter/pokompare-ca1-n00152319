import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

const classes = theme => ({
    //styling for the modal
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});


export default class PokeDiv extends Component {


    constructor(props){
        super(props);
     
        this.state = {
            name:'',
            imageUrl: '',
            kompareImageUrl: '',
            pokemonIndex: '',
            type: '',
            offset: '',
            open: false,
            setOpen: false,
            pokemonDetail: {stats: []},
            poKompare: {name:"", stats: []}
       };

       this.handleOpen = this.handleOpen.bind(this);

       this.handleClose = this.handleClose.bind(this);


    }
    
    
    async componentDidMount(){
        const name = this.props.name;

        //links for api calls
        const url = this.props.url;
        const pokemonIndex=url.split('/')[url.split('/').length -2];
        const imageUrl=`https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/Pokemon_XY_Sprites/${pokemonIndex}.png`;
        const kompareImageUrl =`https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/Pokemon_XY_Sprites/${pokemonIndex}.png`;

        this.setState({
            name: name, 
            imageUrl: imageUrl, 
            kompareImageUrl: kompareImageUrl,
            pokemonIndex: pokemonIndex
        })
    }
    
    handleOpen() {

        this.setState({open: true})
        this.setState({url: `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonIndex}`}, () => {
            axios.get(this.state.url).then((d) => {
                console.log(d);
                this.setState({
                    pokemonDetail: d.data,
                    poKompare: d.data
                }, () => console.log(this.state.poKompare));
            });
        });
    };
    
    handleClose() {
        this.setState({open: false})
    };

    //on click of submit
    
         
    poKompareForm(e){
        e.preventDefault();
        var search = "";
        
        if(e.target.poKompareSearch.value !== ""){
            search = e.target.poKompareSearch.value.toLowerCase();
        }else{
            alert("You forgot to type in a pokémon!");
            return;
        }


        console.log(search);
        this.setState({url: `https://pokeapi.co/api/v2/pokemon/${search}`}, () => {
            
            axios.get(this.state.url).then((d) => {
                console.log(d);
                this.setState({poKompare: d.data}, () => {
                    console.log(this.state.poKompare);
                    this.setState({kompareImageUrl: `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/Pokemon_XY_Sprites/${this.state.poKompare.id}.png`});
                });
            }).catch((error) => alert("Invalid Pokémon: " + search+".\n Tip: Check spelling!"));
        });
           
    }
        
    

    render() {
        

        return (
            <React.Fragment>
        
                <div className="col-md-4 mb-5">
              
                    <div className="card" onClick={this.handleOpen}>
                        <div className="card-header ">
                            <img className="mx-auto d-block" alt="pokemon by id" src={this.state.imageUrl}/>
                            
                        </div>
                        <div className="card-body  ">
                            <h3 className="card-title">{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h3>
                        </div>
                    </div>
               
                </div>
            
            
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={{color:'#333'}} className={classes.paper}>
                        <div className="card mx-auto">
                            <div className="card-header">
                                <h2 id="simple-modal-title">Pokemon Details</h2>
                            </div>

                            <div className="card-body">
                                
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={this.state.imageUrl}></img>
                                        </div>
                                        <div className="col-md-3">
                                            <h1 >{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h1>
                                            <ul>
                                                {this.state.pokemonDetail.stats.map((e, i) => {
                                                    
                                                    return <li key={i}><b>{e.stat.name.charAt(0).toUpperCase() + e.stat.name.slice(1)}</b>: {e.base_stat}</li>;
                                                })}
                                                <p><b>Height</b>: {this.state.pokemonDetail.height}</p>
                                            </ul>
                                        </div>
                                        <div className="col-md-2">
                                            <form className="form-inline" onSubmit={(e) => this.poKompareForm(e)}>
                                                
                                            <input name="poKompareSearch" type="text" placeholder="search" autoComplete="off"></input>
                                            <button type="submit">Search!</button>
                                           
                                            </form>

                                        </div>

                                        <div className="col-md-2">
                                            <img src={this.state.kompareImageUrl}></img>
                                        </div>
                                        <div className="col-md-3">
                                            <h1 >{this.state.poKompare.name.charAt(0).toUpperCase() + this.state.poKompare.name.slice(1)}</h1>
                                            <ul>
                                                {this.state.poKompare.stats.map((e, i) => {
                                                    return <li key={i}><b>{e.stat.name.charAt(0).toUpperCase() + e.stat.name.slice(1)}</b>: {e.base_stat}</li>;
                                                })}
                                                <p><b>Height</b>: {this.state.poKompare.height}</p>
                                            </ul>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

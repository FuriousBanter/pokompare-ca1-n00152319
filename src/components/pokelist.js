import React, {Component} from 'react'
import PokeDiv from './pokediv'
import axios from 'axios';
import leftArrow from '../iconfinder_arrow_sans_left_103300.png'
import rightArrow from '../103300-512.png'

class PokeList extends Component{
 constructor(props){
   super(props);

   this.state = {
    offset: "0",
    url: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6`,
    pokemon: null
    
  };
 }

async componentDidMount(){  
  const res  = await axios.get(this.state.url);
    this.setState({pokemon: res.data['results']}); 
}



ChangeOffset(e, direction){ 
  let DirOffset;
  if(direction === "forward"){
    DirOffset = this.state.offset;
  }else if(direction === "back"){
    DirOffset = this.state.offset * -1;
  }

  this.setState({offset: DirOffset + e}, () => {
    this.setState({url: `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.offset}&limit=6`}, () => {
        axios.get(this.state.url).then((d) => {
        console.log(d);
        this.setState({pokemon: d.data.results});
      
      }); 
    });
  });
}



  render() {
    const arrowStyle = {
      width: '25%',
      height: '25%'
    };

    return (
        
      <React.Fragment>
        <div className="container">
          <div className="row">
            <h1 className="pokeList">Poke List</h1>
          </div>
          {this.state.pokemon ? (

          <div className="row">
            {this.state.pokemon.map(pokemon=>(
              <PokeDiv
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
              
              />
            ))}
          
          </div>
          ) : (
            <h2>404: pokemon not found</h2>
            
          )}

          <div className="row">
              <div className="mx-auto">
                <button onClick={() => this.ChangeOffset(6, "back")} className="col-md-6"> <img alt="left arrow" src={leftArrow} style={arrowStyle}/></button>
        
                <button onClick={() => this.ChangeOffset(6, "forward")} className="col-md-6"><img alt="right arrow" src={rightArrow} style={arrowStyle}/></button>
              </div>  
          </div>
      </div>
    </React.Fragment>
    );
  }
}


export default PokeList;
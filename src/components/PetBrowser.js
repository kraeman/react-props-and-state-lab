import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {


  onAdoptPet = (value) => {
    this.props.onAdoptPet(value)
  }
 
  render() {
    return(
    <div className="ui cards">
      {this.props.pets.map(p => (
        <Pet onAdoptPet={this.onAdoptPet.bind(this)} key={p.id} pet={p}/>
      ))}
    </div>)
  }
}

export default PetBrowser

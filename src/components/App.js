import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
    this.onChngeType = this.onChngeType.bind(this)
    this.onFindPtsClick = this.onFindPtsClick.bind(this)
    this.onAdoptPet = this.onAdoptPet.bind(this)
  }

  onChngeType = () => {
    this.setState({
      filters: {
        type: document.querySelector('#type').value
      }
    }
    )
  }


  onFindPtsClick = () => {
    if(this.state.filters.type === 'all'){
        fetch('/api/pets')
        .then(response => response.json())
        .then(data => {
          this.setState({
            pets: data
          })
        })
      }else {
        fetch('/api/pets' + `?type=${this.state.filters.type}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            pets: data
          })
        })
      }
  }

  onAdoptPet = (petID) => {
    // let copyOfPet = this.state.pets
    // let TP = copyOfPet.find(pet => pet.id === petID)
    // let ind = copyOfPet.indexOf(TP, 0)
    // TP.isAdopted = true
    // copyOfPet[ind] = TP
    // // debugger
    // this.setState({
    //   pets: copyOfPet
    // })

    let pets = this.state.pets.map(pet => pet.id === petID ? {...pet, isAdopted: true} : pet)
    this.setState({
      pets: pets
    })
      
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChngeType} onFindPetsClick={this.onFindPtsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

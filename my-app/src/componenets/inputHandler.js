import React from 'react'
import DefBar from './definitionBar.js'

class InputHandler extends React.Component {
    constructor () {
        super ()
        this.state = {
            character: null
        }
        this.characterGrab = this.characterGrab.bind(this)
        // this.defBar = null
    }

    characterGrab(event) {
        event.preventDefault()

        const userInput = document.getElementById('searchBar')

        if (userInput) {
            this.setState(prevState => {
                    return {character: userInput.value}
            })  // setState does not necessarily fire immediately; either put in a callback function or use componentDidUpdate for insta firing
        }
    }

    render() {
        return (
        <form className='inputSpace'>
            <input id='searchBar' type='text' placeholder='Enter Chinese Character Here' />
            <br />
            <button id='searchButton' onClick={this.characterGrab}>Search!</button>
            <br />
            <DefBar character={this.state.character} />
        </form>
        )
    }
}

export default InputHandler
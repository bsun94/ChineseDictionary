import React from 'react'

class InputHandler extends React.Component {
    constructor () {
        super ()
        this.state = {
            character: ''
        }
        this.characterGrab = this.characterGrab.bind(this)
    }

    characterGrab(event) {
        event.preventDefault()

        const userInput = document.getElementById('searchbar')

        if (userInput) {
            this.setState({
                    character: userInput.value
            }, () => {
                console.log(this.state.character)
            })  // setState does not necessarily fire immediately; either put in a callback function or use componentDidUpdate for insta firing
        }
    }

    render() {
        return (
        <form className='inputSpace'>
            <input id='searchBar' type='text' placeholder='  Enter Chinese Character Here' />
            <br />
            <button id='searchButton' onClick={this.characterGrab}>Search!</button>
        </form>
        )
    }
}

export default InputHandler
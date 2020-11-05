import React from 'react'
import DefBar from './definitionBar.js'
import enums from './enums.js'

class InputHandler extends React.Component {
    constructor () {
        super ()
        this.state = {
            response: null
        }
        this.dataGrab = this.dataGrab.bind(this)
    }

    async dataGrab(event) {
        event.preventDefault()

        const userInput = document.getElementById('searchBar')  // what to use instead of getElementById

        if (userInput.value) {
            this.setState(prevState => {
                return {response: enums[0]}
            })

            const request = `https://elb.bsun-awseb.com/getDefinition/${userInput.value}`
            //for local - http://127.0.0.1:5000; base eb url - http://ChineseDictionary.eba-kxurqxva.us-east-2.elasticbeanstalk.com

            const response_key = 'definition'
            
            await fetch(request)
            .then(res => res.json())
            .then(json => this.setState(prevState => {
                        return {response: json[response_key]}
                    })
                )
            .catch(error => {console.log(error)
                        this.setState(prevState => {
                        return {response: enums[1]}
                    })}
                )
          // setState does not necessarily fire immediately; either put in a callback function or use componentDidUpdate for insta firing
        }
    }

    keyGen = () => Math.random() 

    render() {
        return (
        <form className='inputSpace'>
            <input id='searchBar' type='text' placeholder='Enter Chinese Character Here' />
            <br />
            <button id='searchButton' onClick={this.dataGrab}>Search!</button>
            <br />
            <DefBar key={this.keyGen()} res={this.state.response} />
        </form>
        ) // changing keys allows React to know if something has changed, and thus, re-render WITH animation
        // sidebar? sharing between components
        // service layer
    }
}

export default InputHandler
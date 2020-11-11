import React from 'react'

import enums from './enums.js'

class InputHandler extends React.Component {
    constructor () {
        super ()
        this.state = {
            searchChar: null,
            response: null
        }
        this.updateState = this.updateState.bind(this)
        this.dataGrab = this.dataGrab.bind(this)
    }

    async dataGrab(e) {
        e.preventDefault()

        if (this.state.searchChar) {
            this.setState(prevState => {
                return {response: enums[0]}
            })

            const request = `https://elb.bsun-awseb.com/getDefinition/${this.state.searchChar}`
            //for local - http://127.0.0.1:5000; base AWS EB url - http://ChineseDictionary.eba-kxurqxva.us-east-2.elasticbeanstalk.com

            const response_key = 'definition'
            
            await fetch(request)
            .then(res => res.json())
            .then(json => this.setState(prevState => {
                        return {response: json[response_key]}
                    })
                )
            .catch(error => {
                        this.setState(prevState => {
                        return {response: enums[1]}
                    })}
                )
            .finally(() =>
                this.props.getSearch(this.state.searchChar, this.state.response)
            )
        }
    }

    updateState = (e) => {
        let character = e.target.value
        this.setState(prevState => {
            return {searchChar: character}
        })
    }

    render() {
        return (
            <form className='inputSpace'>
                <input id='searchBar' type='text' placeholder='Enter Chinese Character Here' value={this.state.value} onChange={this.updateState} />
                <br />
                <button id='searchButton' onClick={this.dataGrab}>Search!</button>
                <br />
            </form>
        )
        // sidebar? sharing between components
        // service layer
    }
}

export default InputHandler
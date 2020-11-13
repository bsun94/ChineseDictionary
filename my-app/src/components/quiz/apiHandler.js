import React from 'react'

import enums from '../enums.js'

const numOptions = 3

class APIHandler extends React.Component {
    constructor(props) {
        super()
        this.grabData = this.grabData.bind(this)
    }
    
    shuffle(array) {
        var j, x
        for (let i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = array[i]
            array[i] = array[j]
            array[j] = x
        }

        return array
    }
    
    async grabData (e) {
        e.preventDefault()

        this.props.grabChildState({word: null, response: enums[0], validation: null})

        const request = `https://elb.bsun-awseb.com/getQuiz/${numOptions}`
            //for local - http://127.0.0.1:5000; 
            // base AWS EB url - http://ChineseDictionary.eba-kxurqxva.us-east-2.elasticbeanstalk.com; 
            // via AWS Route53 https://elb.bsun-awseb.com

        await fetch(request)
        .then(response => response.json())
        .then(json => this.props.grabChildState(
            {word: Object.keys(json)[0],
            response: this.shuffle(Object.entries(json))}
        ))
        .catch(error => this.props.grabChildState(
            {response: enums[1]}
        ))
    }

    render() {
        return (
            <button id="searchButton" onClick={this.grabData}>Generate New Quiz!</button>
        )
    }
}

export default APIHandler
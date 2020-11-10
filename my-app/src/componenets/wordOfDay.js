import React from 'react'

import enums from './enums.js'
import DefBar from './definitionBar'

class wordDay extends React.Component {
    constructor() {
        super()
        this.state = {
            word: null,
            response: null
        }
        this.defGrab = this.defGrab.bind(this)
    }

    async defGrab () {
        this.setState(prevState => {
            return {response: enums[0]}
        })

        const request = `https://elb.bsun-awseb.com/getRandom`
            //for local - http://127.0.0.1:5000; base AWS EB url - http://ChineseDictionary.eba-kxurqxva.us-east-2.elasticbeanstalk.com  https://elb.bsun-awseb.com
        
        const response_key = ['word', 'definition']

        await fetch(request)
        .then(res => res.json())
        .then(json => this.setState(prevState => {
                    return {word: json[response_key[0]],
                            response: json[response_key[1]]
                    }
                })
            )
        .catch(error => {
                    this.setState(prevState => {
                    return {response: enums[1]}
                })}
            )
    }

    componentDidMount() {
        this.defGrab()
    }

    render () {
        let header = (<span className="cnChars">Entry of the Day is: {this.state.word}!</span>)
        let empty = (<div></div>)
        
        if (!this.props.search) {
            return (
                <div>
                    <div className="definitionBar">
                        {this.state.word ? header : empty}
                    </div> 
                    <DefBar res={this.state.response} />
                </div>
            )
        } else {
            return empty
        }
    }
}

export default wordDay
import React from 'react'

import enums from '../enums.js'

const numOptions = 3
const validationStatus = ['correct', 'wrong']

class Quiz extends React.Component {
    constructor () {
        super ()
        this.state = {
            word: null,
            response: null,
            validation: null,
            contiguous: 0
        }
        this.grabData = this.grabData.bind(this)
        this.generateQuizBlobs = this.generateQuizBlobs.bind(this)
        this.validateAns = this.validateAns.bind(this)
        this.validResponse = this.validResponse.bind(this)
        this.congratulations = this.congratulations.bind(this)
    }

    async grabData (e) {
        e.preventDefault()

        this.setState(prevState => {
            return {word: null, response: enums[0], validation: null}
        })

        const request = `https://elb.bsun-awseb.com/getQuiz/${numOptions}`
            //for local - http://127.0.0.1:5000; 
            // base AWS EB url - http://ChineseDictionary.eba-kxurqxva.us-east-2.elasticbeanstalk.com; 
            // via AWS Route53 https://elb.bsun-awseb.com

        await fetch(request)
        .then(response => response.json())
        .then(json => this.setState(prevState => {
            return {word: Object.keys(json)[0],
                    response: this.shuffle(Object.entries(json))}
        }))
        .catch(error => this.setState(prevState => {
            return {response: enums[1]}
        }))
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

    parseDefs (defs) {
        let htmlOutput = []
        let splitDefs = defs.split(';')

        splitDefs.forEach(def => {
            htmlOutput.push(<li>{def}</li>)
        })

        return <ul>{htmlOutput}</ul>
    }

    validResponse = () => Array.isArray(this.state.response)

    validateAns (e) {
        if (e.currentTarget.id === this.state.word) {
            e.currentTarget.style = "background-color: green; color: white; font-weight: bold;"
            
            if (!this.state.validation) {
                this.setState(prevState => {return {contiguous: prevState.contiguous += 1}})
            }

            this.setState(prevState => {return {validation: validationStatus[0]}})

        } else {
            if (this.state.validation !== validationStatus[0]) {
                e.currentTarget.style = "background-color: red; color: white; font-weight: bold;"
                this.setState(prevState => {return {validation: validationStatus[1], contiguous: 0}})
            }
        }
    }

    congratulations () {
        if (!this.state.validation) {
            return <div />
        } else if (this.state.validation === validationStatus[0]) {
            return <div className="definitionBar pinyin">
                        That's correct! Well done! You can click the button above to generate a new quiz! 
                        <br />
                        Current consecutive first-timers: <b>{this.state.contiguous}</b>
                    </div>
        } else if (this.state.validation === validationStatus[1]) {
            return <div className="definitionBar pinyin">Unlucky, try again!</div>
        }
    }

    generateQuizBlobs() {
        if (!this.state.response) {
            return <div />
        } else if (!this.validResponse()) {
            return <div className="definitionBar">{this.state.response}</div>
        } else {
            let htmlOutput = []
            this.state.response.forEach(entry => {
                let html = <div id={entry[0]} onClick={this.validateAns} className="definitionBar definition quizbox">{this.parseDefs(entry[1])}</div>
                htmlOutput.push(html)
            })

            htmlOutput.splice(0, 0, <div className="definitionBar">
                                        <span className="pinyin">Which of the below is the correct definition set for:</span> <span className="cnChars">{this.state.word}</span>
                                    </div>)
            return htmlOutput
        }
    }

    render() {
        return <div className="main">
                    <button id="searchButton" onClick={this.grabData}>Generate New Quiz!</button>
                    <br />
                    {this.generateQuizBlobs()}
                    {this.congratulations()}
                </div>
    }
}

export default Quiz
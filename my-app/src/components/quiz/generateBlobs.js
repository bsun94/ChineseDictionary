import React from 'react'

import validationStatus from './validStatus.js'

class generateBlobs extends React.Component {
    constructor(props) {
        super()
        this.generateQuizBlobs = this.generateQuizBlobs.bind(this)
        this.validateAns = this.validateAns.bind(this)
        this.validResponse = this.validResponse.bind(this)
    }

    parseDefs (defs) {
        let htmlOutput = []
        let splitDefs = defs.split(';')

        splitDefs.forEach(def => {
            htmlOutput.push(<li>{def}</li>)
        })

        return <ul>{htmlOutput}</ul>
    }

    validResponse = () => Array.isArray(this.props.response)

    validateAns (e) {
        if (e.currentTarget.id === this.props.word) {
            e.currentTarget.style = "background-color: green; color: white; font-weight: bold;"
            
            if (!this.props.validation) {
                this.props.grabChildState({contiguous: this.props.contiguous + 1})
            }

            this.props.grabChildState({validation: validationStatus[0]})

        } else {
            if (this.props.validation !== validationStatus[0]) {
                e.currentTarget.style = "background-color: red; color: white; font-weight: bold;"
                this.props.grabChildState({validation: validationStatus[1], contiguous: 0})
            }
        }
    }

    generateQuizBlobs() {
        if (!this.props.response) {
            return <div />
        } else if (!this.validResponse()) {
            return <div className="definitionBar">{this.props.response}</div>
        } else {
            let htmlOutput = []
            this.props.response.forEach(entry => {
                let html = <div id={entry[0]} onClick={this.validateAns} className="definitionBar definition quizbox">{this.parseDefs(entry[1])}</div>
                htmlOutput.push(html)
            })

            htmlOutput.splice(0, 0, <div className="definitionBar">
                                        <span className="pinyin">Which of the below is the correct definition set for:</span> <span className="cnChars">{this.props.word}</span>
                                    </div>)
            return htmlOutput
        }
    }

    render () {
        return this.generateQuizBlobs()
    }
}

export default generateBlobs
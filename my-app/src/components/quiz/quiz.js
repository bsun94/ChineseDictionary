import React from 'react'
import Congratulations from './congrats'
import APIHandler from "./apiHandler"
import GenerateBlobs from "./generateBlobs"

class Quiz extends React.Component {
    constructor () {
        super ()
        this.state = {
            word: null,
            response: null,
            validation: null,
            contiguous: 0
        }
        this.grabChildState = this.grabChildState.bind(this)
    }

    grabChildState (childState) {
        this.setState(prevState => {
            return childState
        })
    }

    render() {
        return <div className="main">
                    <APIHandler grabChildState={this.grabChildState} />
                    <br />
                    <GenerateBlobs grabChildState={this.grabChildState} response={this.state.response} word={this.state.word} validation={this.state.validation} contiguous={this.state.contiguous} />
                    <Congratulations validation={this.state.validation} contiguous={this.state.contiguous} />
                </div>
    }
}

export default Quiz
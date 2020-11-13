import React from 'react';

import Header from './heading.js'
import InputHandler from './inputHandler.js'
import DefBar from './definitionBar.js'
import SearchHistory from './recentSearches'
import WordDay from './wordOfDay'

class ChineseDict extends React.Component {
    constructor() {
        super()
        this.state = {
            search: null,
            response: null
        }
        this.getSearchChar = this.getSearchChar.bind(this)        
    }

    getSearchChar = (CNchar, defs) => {
        this.setState(prevState => {
            return {search: CNchar,
                    response: defs}
        })
    }

    keyGen = () => Math.random()

    render() {
        return (
            <div>
                <Header />
                <SearchHistory search={this.state.search} response={this.state.response} />
                <InputHandler getSearch={this.getSearchChar}/>
                <DefBar key={this.keyGen()} res={this.state.response} />
                <WordDay search={this.state.search} />
            </div>
        )
    }
}

export default ChineseDict
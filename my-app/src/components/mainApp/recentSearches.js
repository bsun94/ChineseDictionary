import React from 'react'

const searchLimit = 10

class recentSearches extends React.Component {
    constructor() {
        super()
        this.state = {
            historyList: []
        }
    }

    validResponse = () => {
        if (!Array.isArray(this.props.response)) {
            return false
        } else if (this.props.response.length === 0) {
            return false
        } else {
            return true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search !== this.props.search && this.validResponse()) {
            this.updateHistory()
        }
    }

    updateHistory() {
        if (!this.state.historyList.includes(this.props.search)) {
            this.setState(prevState => {
                return {historyList: [this.props.search, ...prevState.historyList]}
            })
        }

        if (this.state.historyList.length === searchLimit) {
            this.setState(prevState => {
                return {historyList: [...prevState.historyList].splice(0, searchLimit)}
            })
        }
    }

    arrayFormatter = (array) => {
        let newArr = []
        array.forEach(element => {
            element += ' '
            newArr.push(element)
        })
        return newArr
    }

    render() {
        if (this.props.search) {
            return (
                <div className="recentSearches">
                    {searchLimit} Most Recent Session Searches: <span className="recentSearchesList">{this.arrayFormatter(this.state.historyList)}</span>
                </div>
                )
        } else {
            return <div></div>
        }
        
    }
}

export default recentSearches
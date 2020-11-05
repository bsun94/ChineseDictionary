import React from 'react'

class defBar extends React.Component {

    parseDefs (defs) {
        let htmlOutput = []
        let splitDefs = defs.split(';')

        splitDefs.forEach(def => {
            htmlOutput.push(<li>{def}</li>)
        })

        return <ul>{htmlOutput}</ul>
    }

    buildDefBars (response) {
        let htmlOutput = []

        response.forEach(def => {
            let simplified = def[0]
            let traditional = def[1]
            let pinyin = def[2]
            let definitions = def[3]

            htmlOutput.push(
                <div className="definitionBar">
                    <div className="cnChars">{'simplified:  ' + simplified}<br />{'traditional:  ' + traditional}</div>
                    <div className="pinyin">{'pinyin: ' + pinyin}</div>
                    <div className="definition">{this.parseDefs(definitions)}</div>
                </div>
            )
            console.log(htmlOutput)
        })

        return htmlOutput
    }

    render () {
        if (this.props.res) {
            if (!Array.isArray(this.props.res)) {
                return (
                    <div className='definitionBar'>
                        <div className="pinyin">
                            {this.props.res}
                        </div>
                    </div>
                )  // make a validation function - could even do same thing, but makes the validation clear
            } else if (this.props.res.length > 0) {
                return (
                    <div className='definitionBarsArea'>
                        {this.buildDefBars(this.props.res)}
                    </div>
                )
            } else {
                return (
                    <div className='definitionBar'>
                        <div className="pinyin">
                            Entry not found! Perhaps try to shorten your search (i.e. search characters in smaller sets or inidividually), and/or verify your inputs are true Chinese characters (not made-up kanji-esque characters).
                        </div>
                    </div>
                )
            }    
        } else {
            return <div></div>
        }
    }
    
}

export default defBar
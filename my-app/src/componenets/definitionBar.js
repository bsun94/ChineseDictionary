import React from 'react'

function defBar (props) {
    let simplified = props.character
    let traditional = '漢'
    let pinyin = 'han4'
    let definition = 'Relating to the Han people/culture'

    if (props.character) {
        return (
            <div className="definitionBar">
                <div className="cnChars">{'simplified:  ' + simplified}<br />{'traditional:  ' + traditional}</div>
                <div className="pinyin">{'pinyin: ' + pinyin}</div>
                <div className="definition">{definition}</div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default defBar
import React from 'react'

import validationStatus from './validStatus.js'

function Congrats (props) {
    if (!props.validation) {
        return <div />
    } else if (props.validation === validationStatus[0]) {
        return <div className="definitionBar pinyin">
                    That's correct! Well done! You can click the button above to generate a new quiz! 
                    <br />
                    Current consecutive first-timers: <b>{props.contiguous}</b>
                </div>
    } else if (props.validation === validationStatus[1]) {
        return <div className="definitionBar pinyin">Unlucky, try again!</div>
    }
}

export default Congrats
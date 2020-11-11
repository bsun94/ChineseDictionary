import React, { useState } from 'react'

import MainApp from './mainApp/mainApp.js'
import Acknowledgements from './acknowledge/acknowledgements.js'
import Quiz from './quiz/quiz.js'

function Navigation() {
    const [page, setPage] = useState('main')

    const pages = {
        'main': <MainApp />,
        'acknow': <Acknowledgements />,
        'quiz': <Quiz />
    }
    
    return (<div>
                <div className="navButtons">
                    <span className="link" onClick={() => setPage('main')}>Dictionary</span>
                    <span className="link" onClick={() => setPage('quiz')}>Word Quiz</span>
                    <span className="link" onClick={() => setPage('acknow')}>Acknowledgements</span>
                </div>

                <div className='main-wrapper'>{pages[page]}</div>
            </div>)
}

export default Navigation
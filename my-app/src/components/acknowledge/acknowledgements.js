import React from 'react'

function Acknowledge() {
    return (<div className="definitionBar acknowledgement">
                <div className="definition">
                    This web app leverages the Chinese-English lexicographical data from the CEDICT project started by Paul Denisowski in 1997, and currently continued under CC-CEDICT. You can find their .u8 data file for free download <a className="extlink" href="https://www.mdbg.net/chinese/dictionary?page=cc-cedict" target="_mdbg">at this webpage</a> - thank you for sharing this tremendous work with the world!
                    <br /><br />
                    The background images used in this web app were sourced from <a className="extlink" href="https://unsplash.com/" target="_unsp">Unsplash</a> - check them out!
                    <br /><br />
                    This web app was built front and back by <a className="extlink" href="http://bsun94.com/" target="_bsun">Brian Sun</a>, inaugural version Oct 2020.
                </div>
            </div>)
}

export default Acknowledge
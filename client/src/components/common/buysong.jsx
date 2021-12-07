import React from 'react';

const Buy = (props) => {
    return ( 
        <button onClick={() => props.onDownload(props.song)} className="btn btn-secondary btn-sm">Download</button>
     );
}
 
export default Buy;
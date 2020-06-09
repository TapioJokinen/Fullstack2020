import React from 'react';

//--------------------------------------------------
const Find = (props) => {
    
  return (
    <div>
      find countries <input value={props.value} onChange={props.filter} />
    </div>
  )
}

export default Find
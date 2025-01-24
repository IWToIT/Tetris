import React from 'react'

function StartBtn({callback}) {
  return (
    <button className="start-btn" onClick={callback}>Start Game</button>
  )
}

export default StartBtn
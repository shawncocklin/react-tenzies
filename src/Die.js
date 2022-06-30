import React from 'react'

export default function Die(props) {
  return (
    <div
      className={`${
        props.isHeld ? 'bg-accent' : 'bg-white'
      } die fs-500 text-bold flex justify-center`}
      onClick={() => props.toggleHeld(props.id)}
    >
      <p>{props.value}</p>
    </div>
  )
}

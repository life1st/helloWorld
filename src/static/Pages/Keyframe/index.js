import React from 'react'
import { Keyframes, Frame } from 'react-keyframes'
const Keyframe = () => {

  const text = 'this is duration.'

  const frames = Array(text.length).fill(null).map((_, i) => (<Frame key={i} duration={300}>{text.slice(0, i)}</Frame>))
  return (
    <div>
      <Keyframes>
        {frames.map(f => f)}
      </Keyframes>
    </div>
  )
}

export default Keyframe

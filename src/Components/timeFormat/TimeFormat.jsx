import React from 'react'

const TimeFormat = ( {time} ) => {
// time comes in as minutes
  console.log(time)
  let hours = String(Math.floor(time/60))
  let minutes = String(time % 60)


  if (hours.length > 2) {
    hours = "00"
  } else if (hours.length === 1) {
    hours = "0" + hours
  }
  if (minutes.length === 1) minutes = "0" + minutes



  return (
    <div>{hours}:{minutes}</div>
  )
}

export default TimeFormat
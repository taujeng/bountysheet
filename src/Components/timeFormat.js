export default function timeFormat( time ) {

// time comes in as seconds
  let hours = String(Math.floor(time/3600))
  let minutes = String(Math.floor((time - (parseInt(hours) * 3600)) / 60))
  let seconds = String(time - (parseInt(hours) * 3600)
   - (parseInt(minutes) * 60))


  if (hours.length > 2) {
    hours = "00"
  } else if (hours.length === 1) {
    hours = "0" + hours
  }
  if (minutes.length === 1) minutes = "0" + minutes
  if (seconds.length === 1) seconds = "0" + seconds



  return ({hours : hours, minutes: minutes, seconds: seconds})
}

import React, {useState, useEffect} from 'react'
import Clock from 'react-clock'
import Stopwatch from '../Stopwatch/Stopwatch';
import Timer from '../Timer/Timer'
import 'react-clock/dist/Clock.css';
import "./header.css"

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(()=> {
    const interval = setInterval(() => setTime(new Date(), 1000));

    return () => {
      clearInterval(interval);
    }
  }, [])


  return (
    <div className="header-container">
      <Clock value={time} size={200}/>
      <Stopwatch />
      <Timer />
    </div>
  )
}

export default Header
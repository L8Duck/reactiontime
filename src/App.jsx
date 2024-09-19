import { useState } from 'react'
import './App.css'

function App() {
  const [reactTime, setReactTime] = useState(0) //use to track react time
  const [isWaiting, setIsWaiting] = useState(false) //to disable button until green
  const [mode, setMode] = useState(0) // 0:start ||1:stop || 2:reset
  const [uid,setUid] = useState(1) 
  const [scores, setScores] = useState([]) //use store scores

  const handleClick = () => {
    if(!isWaiting){
        setMode((prevMode) => (prevMode +1) % 3) //cycle 0->1->2->0
        if(mode === 0){ //start game mode
          setIsWaiting(true)
          setTimeout(() => {
            console.log('ready')
            setReactTime(performance.now())
            setIsWaiting(false)
          },2000 + Math.floor(Math.random()*2000)) // random 2-4s to go
        } else if (mode === 1){//stop game mode
        setReactTime((prevTime) => performance.now() - prevTime) // calc react time
      } else if (mode === 2){ //reset game mode
        //add new record
        setScores([...scores,{id:uid, time: Math.round(reactTime)}]) //store recent score
        setUid((prevId) => prevId + 1)
        setReactTime(0)
      }
    }
  }
  return (
    <>
    {/* play button part */}
    <button 
      style={{
        background:mode === 0? "cornflowerblue":
        isWaiting? "gold":
        mode === 1? "lawngreen":
        mode===2? 'lightcyan':
        "white"
      }}
      onClick={handleClick}
    >
      <div>
        <h2>{
          mode === 0? "Reaction Time":
          isWaiting || mode ===1? "...":
          mode===2? Math.round(reactTime) + ' ms':
          "something went wrong"}
        </h2>
        <p>{
          mode === 0? "Start":
          isWaiting? "waiting until green":
          mode === 1? "Click!":
          mode===2? 'reset':
          "something went wrong"}
        </p>
      </div>
      </button>
      {/* scoreboard part */}
      <table border="0" cellPadding="8" style={{ borderCollapse: 'collapse',width:'250px' , maxHeight:'100px'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {scores.length <= 5?
        <>
        {scores.sort((x,y) => x.id - y.id).map((rank) => ( //sort(x,y) to sort arr by id in order
          <tr key={rank.id}>
            <td>{rank.id}</td>
            <td>{rank.time+ ' ms'}</td>
          </tr>
        ))}
        {Array.from({length:5 - scores.length}).map((_, index) => (
          <tr key={index}>
            <td>__</td>
            <td>__</td>
          </tr>
        ))}
        </>
        :<>
          {scores.sort((x,y) => x.id - y.id).slice(-5).map((rank) => (
            <tr key={rank.id}>
              <td>{rank.id}</td>
              <td>{rank.time +' ms'}</td>
            </tr>
          ))}
        </>
      }
        <tr style={{background:'lavender'}} key='best'>
          <td><strong>best</strong></td>
          <td><strong>{scores.length ===0? '___':scores.sort((x,y) => x.time - y.time)[0].time + ' ms'}</strong></td>
        </tr>
        <tr style={{background:'burlywood'}} key='average'>
          <td><strong>average</strong></td>
          <td><strong>{scores.length ===0? '___':Math.round(scores.reduce((sum, {id,time}) => sum + time,0)/scores.length) + ' ms'}</strong></td>
        </tr>
      </tbody>
    </table>
    </>
  )
}

export default App

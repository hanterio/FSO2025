import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.onClick}>
        {props.text}
      </button>      
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const aluksi = {}
  for (let i = 0; i < anecdotes.length; i++) {
    aluksi[i] = 0;
    }

  const [aanet, setAanet] = useState(aluksi)
  const [selected, setSelected] = useState(0)

  const annaAani = () => {    
    const paivitetty = {...aanet}
    paivitetty[selected] += 1
    setAanet(paivitetty)
  }
  const arvoAnekdootti = () => {
    const numero = anecdotes.length
    const satunnaisluku = Math.floor(Math.random() * numero)
    setSelected(satunnaisluku)
  }

  const haeMaksimi = (aanet) => {
    let maxAvain = null
    let maxAanet = -Infinity

    for (let avain in aanet) {
      if (aanet[avain] > maxAanet) {
        maxAanet = aanet[avain]
        maxAvain = avain
  
      }
    }
    return maxAvain
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {aanet[selected]} votes</div>
      <Button onClick={annaAani} text="vote"/>
      <Button onClick={arvoAnekdootti} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[haeMaksimi(aanet)]}</div>
      <div>has {aanet[haeMaksimi(aanet)]} votes</div>
    </div>
  )
}

export default App
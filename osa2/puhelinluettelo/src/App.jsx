import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const lisaaNimi = (tapahtuma) => {
    tapahtuma.preventDefault()
    const uusiNimi = {
      name: newName,
      number: newNumber
    }

    const onkoNimi = persons.some(person => person.name === newName)
    onkoNimi ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(uusiNimi))
    setNewName('')
    setNewNumber('')
  }

  const handleNimenLisays = (tapahtuma) => {
    setNewName(tapahtuma.target.value)
  }

  const handlePuhLisays = (tapahtuma) => {
    setNewNumber(tapahtuma.target.value)
  }

  const handleSearch = (tapahtuma) => {
    setNewSearch(tapahtuma.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={newSearch} onChange={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={lisaaNimi}
        newName={newName}
        handleNimenLisays={handleNimenLisays}
        newNumber={newNumber}
        handlePuhLisays={handlePuhLisays}
      />
      <h3>Numbers</h3>
        <Persons
          persons={persons}
          newSearch={newSearch}
        />
    </div>
  )

}

export default App
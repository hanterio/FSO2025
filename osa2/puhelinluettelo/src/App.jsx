import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
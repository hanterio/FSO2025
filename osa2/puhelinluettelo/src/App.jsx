import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import palvelu from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    palvelu
      .getAll()
      .then(initialPersons => {
        console.log("Fetched persons:", initialPersons);
        setPersons(initialPersons)
      })
  }, [])
  
  const lisaaNimi = (tapahtuma) => {
    tapahtuma.preventDefault()
    const uusiNimi = {
      name: newName,
      number: newNumber
    }
    console.log("Persons list:", persons);
    const onkoNimi = persons.some(person => person.name === newName)
    const korvataan = () => {
      const nimi = persons.find(p => p.name === newName)
      console.log('korvataan ' + nimi)
      const muutettu = {...nimi, number: newNumber}
    
      palvelu
        .korvaus(muutettu)
        .then(response => {
          setMessage(
            `Replaced the number of '${nimi.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          setPersons(persons.map(person => person.name !== newName ? person : response.data))
        })
    }


    if (onkoNimi) {
      const korvaus = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!korvaus) {
        return
      }
      korvataan()
    } else {
      palvelu
      .lisays(uusiNimi)
      .then(response => {
        setMessage(
          `Added '${uusiNimi.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 2000)
        setPersons(persons.concat(response.data))
      })
  
    }
     
      
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
  const suodatetut = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const poistaPerson = (id) => {
    console.log('poistetaan ' + id)
    const person = persons.find(p => p.id === id)
    const confirmed = window.confirm(`Delete ${person.name}`)    
    if (!confirmed) {
      console.log("Peruttiin poisto")
      return  
    }
    palvelu
      .poisto(id)
      .then(response => {
        setMessage(
          `'${person.name}' deleted succesfully`
        )
        setTimeout(() => {
          setMessage(null)
        }, 2000)        
        setPersons(persons.filter(p => p.id !== id))

      })
      .catch(error => {
        setErrorMessage(`Infromation of ${person.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 6000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification
          message={message || errorMessage}
          classname={errorMessage ? 'errorMessage' : 'message'}/>
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
        {suodatetut.map(person =>
          <Persons
            key={person.name}  
            person={person}
            poista={() => poistaPerson(person.id)}
        />
        )}
    </div>
  ) 

}

export default App
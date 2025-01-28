const Persons = (props) => {
    const suodatetut = props.persons.filter(person => person.name.toLowerCase().includes(props.newSearch.toLowerCase()))
    return (
        <div>
            {suodatetut.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}
export default Persons
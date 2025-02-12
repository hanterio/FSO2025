const Persons = (props) => {    
    return (
        <div>
            {props.person.name} {props.person.number} <button onClick={props.poista}>delete</button>
        </div>
    )
}
export default Persons
const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input value={props.newName} onChange={props.handleNimenLisays}/>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handlePuhLisays}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
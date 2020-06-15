import React, { useState, useEffect } from 'react'
import personService from "./services/persons"
import "./index.css"

const Filter = (props) => {
    return (
        <div>
            filter shown with: <input value={props.filter} onChange={props.filterHandler} />
        </div>
    )
}

const PersonForm = (props) => {
    const { name, number, nameHandler, numberHandler, addNew } = props
    return (
        <div>
            <form>
                <div>
                    name: <input value={name} onChange={nameHandler} /><br></br>
                    number: <input value={number} onChange={numberHandler} />
                </div>
                <div>
                    <button onClick={addNew} type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Person = ({ people, deletePerson }) => {

    return (
        <div>
            {people.map((person, i) => {
                return <li key={i}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>delete</button>
                </li>
            })}
        </div>
    )
}

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="success">
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const getPersons = () => {
        personService
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }

    useEffect(getPersons, [])

    const successfulAction = msg => {
        setSuccessMessage(msg)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 2000);
    }

    const failedAction = msg => {
        setErrorMessage(msg)
        setTimeout(() => {
            setErrorMessage(null)
        }, 2000);
    }

    const deletePerson = (id) => {
        const person = persons.find(person => person.id === id)
        if (window.confirm(`Delete person ${person.name}`)) {
            personService
                .deletePerson(id)
                .then(res => getPersons())
                .then(res => {
                    successfulAction(`${person.name} deleted successfully!`)
                })
                .catch(error => {
                    failedAction(`Person ${person.name} is already removed from database.`)
                    getPersons()
                })
        }
    }

    const addPerson = (e) => {
        e.preventDefault()
        let k = true
        let id_ = 0

        const nameObject = {
            name: newName,
            number: newNumber,
            id: id_
        }

        if (nameObject.name === "" || nameObject.number === "") {
            failedAction("Name or number was empty")
        } else if (nameObject.name.length < 3 || nameObject.number.length < 8) {
            failedAction("Name or number was too short")
        } else {
            persons.forEach(person => {
                if (person.name === nameObject.name) {
                    k = false
                    nameObject.id = person.id
                }
            });
            if (k) {
                setPersons(persons.concat(nameObject))
                personService
                    .create(nameObject)
                    .then(res => getPersons())
                    .then(res => {
                        successfulAction(`${nameObject.name} added successfully!`)
                    })
            } else {
                const txt = `${nameObject.name} was already added to phonebook. Would you like to replace it?`
                if (window.confirm(txt)) {
                    personService
                        .update(nameObject.id, nameObject)
                        .then(res => {
                            getPersons()
                            successfulAction(`${nameObject.name} updated successfully!`)
                        })
                        .catch(error => {
                            failedAction(`Person ${nameObject.name} is already removed from database.`)
                            getPersons()
                        })
                }
            }
        }
    }

    const onChangeHandlerName = (e) => {
        setNewName(e.target.value)
    }

    const onChangeHandlerNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const onChangeHandlerFilter = (e) => {
        setFilter(e.target.value)
    }

    const filteredPersons = filter === ""
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter))

    return (
        <div>
            <ErrorNotification message={errorMessage} />
            <SuccessNotification message={successMessage} />
            <h2>Phonebook</h2>
            <Filter value={filter} filterHandler={onChangeHandlerFilter} />
            <h1>Add new</h1>
            <PersonForm
                name={newName}
                number={newNumber}
                nameHandler={onChangeHandlerName}
                numberHandler={onChangeHandlerNumber}
                addNew={addPerson} />
            <h2>Numbers</h2>
            <ul>
                <Person people={filteredPersons} deletePerson={deletePerson} />
            </ul>
        </div>
    )
}

export default App
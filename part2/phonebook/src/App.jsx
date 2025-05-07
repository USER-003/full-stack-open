import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  //Get all persons
  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  //Check if name already exists
  const checkNameExistence = (name) => {
    return persons.find((person) => person.name === name);
  };

  //Update person number if already exists
  const updatePerson = (checkPerson) => {
    const id = checkPerson.id;
    const personObject = { ...checkPerson, name: newName, number: newNumber };

    if (
      confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      phoneService.updateNumber(id, personObject).then((response) => {
        setPersons(persons.map((p) => (p.id === id ? response : p)));
      });

      setNewName("");
      setNewNumber("");
    }
  };

  // Add a new person to the db
  const handleAddPerson = (event) => {
    event.preventDefault();

    const checkPerson = checkNameExistence(newName);
    if (checkPerson) {
      updatePerson(checkPerson);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    phoneService.create(personObject).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };

  //Event handlers
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}`)) {
      phoneService.remove(person.id);

      setPersons((prevElementos) =>
        prevElementos.filter((elemento) => elemento.id !== person.id)
      );
    }
  };

  const numberToShow = newSearch
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} method={handleNewSearch} />

      <h2>Add a new</h2>
      <PersonForm
        values={{ newName, newNumber }}
        methods={{ handleAddPerson, handleNewName, handleNewNumber }}
      />

      <h2>Numbers</h2>
      <Persons data={numberToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const checkNameExistence = () => {
    return persons.some((person) => person.name === newName);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (checkNameExistence()) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    setPersons(persons.concat(personObject));

    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
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
      <Persons data={numberToShow} />
    </div>
  );
};

export default App;

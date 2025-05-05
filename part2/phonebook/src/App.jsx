import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

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

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [succeedMessage, setSucceedMessage] = useState(null);

  //Get all persons
  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleSucceed = (message) => {
    setSucceedMessage(message);
    setTimeout(() => {
      setSucceedMessage(null);
    }, 5000);
  };

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
      phoneService
        .updateNumber(id, personObject)
        .then((response) => {
          setPersons(persons.map((p) => (p.id === id ? response : p)));

          handleSucceed(`Updated '${personObject.name}'`);
        })
        .catch(() => {
          handleError(
            `Error trying to update ${personObject.name} try again later`
          );
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

    phoneService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response));

        handleSucceed(`Added '${personObject.name}'`);
        setNewName("");
        setNewNumber("");
      })
      .catch(() => {
        handleError(`Error trying to add ${personObject.name} try again later`);
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
      phoneService
        .remove(person.id)
        .then(() => {
          handleSucceed(`Deleted '${person.name}'`);

          setPersons((prevElementos) =>
            prevElementos.filter((elemento) => elemento.id !== person.id)
          );
        })
        .catch(() => {
          handleError(`Error trying to delete ${person.name} try again later`);
        });
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
      <Notification style="error" message={errorMessage} />
      <Notification style="succeed" message={succeedMessage} />
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

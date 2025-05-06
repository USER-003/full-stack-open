const Person = ({ person, deletePerson }) => {
  return (
    <>
      <li>
        {person.name} {person.number}{" "}
        <button onClick={deletePerson}>delete</button>
      </li>
    </>
  );
};

const Persons = ({ data, deletePerson }) => {
  return (
    <>
      <ul>
        {data.map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person)}
          />
        ))}
      </ul>
    </>
  );
};

export default Persons;

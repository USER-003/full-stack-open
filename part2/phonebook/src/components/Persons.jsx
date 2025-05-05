const Person = ({ person }) => {
  return (
    <>
      <li>
        {person.name} {person.number}
      </li>
    </>
  );
};

const Persons = ({ data }) => {
  return (
    <>
      <ul>
        {data.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </>
  );
};

export default Persons;

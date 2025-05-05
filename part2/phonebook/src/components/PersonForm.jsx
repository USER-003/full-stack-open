const Input = ({ text, value, method }) => {
  return (
    <div>
      {text} <input value={value} onChange={method} required />
    </div>
  );
};

const PersonForm = ({ values, methods }) => {
  return (
    <>
      <form onSubmit={methods.handleAddPerson}>
        <Input
          text="Name:"
          value={values.newName}
          method={methods.handleNewName}
        />

        <Input
          text="Number:"
          value={values.newNumber}
          method={methods.handleNewNumber}
        />

        <button type="submit">add</button>
      </form>
    </>
  );
};

export default PersonForm;

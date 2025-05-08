const CountryList = ({ countries, find }) => {
  return (
    <>
      {countries.map((c) => (
        <div key={c.name.common}>
          {c.name.common}{" "}
          <button onClick={() => find(c.name.common)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default CountryList;

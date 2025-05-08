const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h1>Languages</h1>
      <ul>
        {Object.entries(country.languages).map((l) => (
          <li key={l[0]}>{l[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </>
  );
};

export default Country;

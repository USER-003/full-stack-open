const Country = ({ country, weather }) => {
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
      <h2>Weather in {weather?.name}</h2>
      <p>Temperature {weather?.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>Wind {weather?.wind.speed} m/s</p>
    </>
  );
};

export default Country;

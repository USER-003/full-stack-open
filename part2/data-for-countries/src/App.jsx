import { useEffect, useState } from "react";
import countrieService from "./services/countries";
import Country from "./components/Country";
import CountryList from "./components/CountryList";
import weatherService from "./services/weather";

function App() {
  const [newSearch, setNewSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    countrieService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const findCountry = (value) => {
    setNewSearch(value);
    countrieService.getCountrie(value).then((response) => {
      getCountryWeather(response.capital);
      setFilterCountries([response]);
    });
  };

  const lookforCountries = (value) => {
    setNewSearch(value);
    const tempCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(value.toLowerCase())
    );
    tempCountries.length === 1 && getCountryWeather(tempCountries[0].capital);
    setFilterCountries(tempCountries);
  };

  const handleSearch = (event) => {
    lookforCountries(event.target.value);
  };

  const getCountryWeather = (capital) => {
    weatherService.getWeather(capital).then((response) => {
      setWeather([response]);
    });
  };

  return (
    <>
      find countries{" "}
      <input type="search" value={newSearch} onChange={handleSearch} />
      {filterCountries.length > 10 &&
        filterCountries.length < countries.length && (
          <p>Too many matches, specify another filter</p>
        )}
      {filterCountries.length < 10 && filterCountries.length > 1 && (
        <CountryList countries={filterCountries} find={findCountry} />
      )}
      {filterCountries.length === 1 && (
        <Country country={filterCountries[0]} weather={weather[0]} />
      )}
    </>
  );
}

export default App;

import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Stadistic = ({ text, stadistic }) => {
  return (
    <>
      <p>
        {text} {stadistic}
      </p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood((prevGood) => prevGood + 1);
  const handleNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1);
  const handleBad = () => setBad((prevBad) => prevBad + 1);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />

      <h1>statistics</h1>
      <Stadistic text="good" stadistic={good} />
      <Stadistic text="neutral" stadistic={neutral} />
      <Stadistic text="bad" stadistic={bad} />
    </>
  );
};

export default App;

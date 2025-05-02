import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, statistic }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{statistic}</td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  return stats.all !== 0 ? (
    <table>
      <tbody>
        <StatisticLine text="good" statistic={stats.good} />
        <StatisticLine text="neutral" statistic={stats.neutral} />
        <StatisticLine text="bad" statistic={stats.bad} />
        <StatisticLine text="all" statistic={stats.all} />
        <StatisticLine text="average" statistic={stats.average} />
        <StatisticLine text="positive" statistic={`${stats.positive} %`} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    const updatedAll = all + 1;
    setGood(updatedGood);

    setAll(updatedAll);
    setAverage((updatedGood + neutral + bad) / 3);
    setPositive((updatedGood / updatedAll) * 100);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    const updatedAll = all + 1;
    setNeutral((prevNeutral) => prevNeutral + 1);

    setAll((prevAll) => prevAll + 1);
    setAverage((good + updatedNeutral + bad) / 3);
    setPositive((good / updatedAll) * 100);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    const updatedAll = all + 1;

    setBad(updatedBad);

    setAll(updatedAll);
    setAverage((good + neutral + updatedBad) / 3);
    setPositive((good / updatedAll) * 100);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />

      <h1>statistics</h1>
      <Statistics stats={{ good, neutral, bad, all, average, positive }} />
    </>
  );
};

export default App;

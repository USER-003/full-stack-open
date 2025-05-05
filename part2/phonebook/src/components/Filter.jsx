const Filter = ({ value, method }) => {
  return (
    <>
      filter shown with: <input value={value} onChange={method} />
    </>
  );
};

export default Filter;

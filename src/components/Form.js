import React from "react";

const Form = ({ search, setSearch, onFinished }) => {
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  let { title, author, year } = search;

  const handleSubmit = () => {
    year = parseInt(year, 10);
    // data validation
    if (title === "" || author === "" || year <= 0) {
      alert("All fields are required ");
      return;
    }

    //event
    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(search),
    };
    fetch("http://localhost:5000/api", requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    // resetting the state
    setSearch({
      title: "",
      author: "",
      year: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          value={title}
          name="title"
          onChange={handleChange}
          type="text"
          id="title"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          value={author}
          name="author"
          onChange={handleChange}
          type="text"
          id="author"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
          value={year}
          name="year"
          onChange={handleChange}
          type="number"
          id="year"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;

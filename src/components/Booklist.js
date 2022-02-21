import React from "react";

const Booklist = ({ books, setTableUpdate, search, setSearch }) => {
  const handleDelete = (id) => {
    const requestInit = {
      method: "DELETE",
    };
    fetch(`http://localhost:5000/api/ ${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    setTableUpdate(true);
  };

  const handleUpdate = (id) => {
    let { title, author, year } = search;

    // data validation
    if (title === "" || author === "" || year <= 0) {
      alert("All fields are required ");
      return;
    }

    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(search),
    };
    fetch(`http://localhost:5000/api/ ${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    setTableUpdate(true);

    // resetting the state
    setSearch({
      title: "",
      author: "",
      year: 0,
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdate(book.id)}
                  className="btn btn-dark"
                >
                  Update
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Booklist;

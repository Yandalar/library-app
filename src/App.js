import React, { useEffect, useState } from "react";
import Booklist from "./components/Booklist";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

const App = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({
    title: "",
    author: "",
    year: 0,
  });

  const [tableUpdate, setTableUpdate] = useState(false);

  useEffect(() => {
    const getBooks = () => {
      fetch("http://localhost:5000/api")
        .then((res) => res.json())
        .then((res) => setBooks(res));
    };
    getBooks();
    setTableUpdate(false);
  }, [tableUpdate]);

  return (
    <>
      <Navbar brand="Smart Library" />
      <div className="container">
        <div className="row">
          <div className="col-5" style={{ padding: 30 }}>
            <h2 style={{ textAlign: "center" }}>Book Form</h2>
            <Form search={search} setSearch={setSearch} />
          </div>
          <div className="col-7" style={{ padding: 30 }}>
            <h2 style={{ textAlign: "center" }}>Book List</h2>
            <Booklist
              setSearch={setSearch}
              search={search}
              books={books}
              setTableUpdate={setTableUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

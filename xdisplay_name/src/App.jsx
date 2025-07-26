import { useState } from "react";

function App() {
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [isFormSubmit, setFormSubmit] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmit(true);
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="">
          First Name:  
          <input
            type="text"
            value={fullName.firstName}
            onChange={(e) =>
              setFullName({ ...fullName, firstName: e.target.value })
            }
            required
          />
        </label>

        <label htmlFor="">
          Last Name: 
          <input
            type="text"
            value={fullName.lastName}
            onChange={(e) =>
              setFullName({ ...fullName, lastName: e.target.value })
            }
            required
          />
        </label>
        <button type="submit" style={{ width: "100px", marginTop: "10px" }}>
          submit
        </button>
      </form>
        {isFormSubmit && <p>{`Full Name: ${fullName.firstName} ${fullName.lastName}`}</p>}
    </div>
  );
}

export default App;

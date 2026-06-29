import { useState } from "react";

function EmployeeForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("HR");
  const [salary, setSalary] = useState("");
  const [married, setMarried] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newEmployee = {
      name,
      age,
      address,
      department,
      salary,
      married,
      photoPreview,
    };

    onAdd(newEmployee);

    // Reset form
    setName("");
    setAge("");
    setAddress("");
    setDepartment("HR");
    setSalary("");
    setMarried(false);
    setPhoto(null);
    setPhotoPreview(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      <div>
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Age: </label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      </div>

      <div>
        <label>Address: </label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>

      <div>
        <label>Department: </label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div>
        <label>Salary: </label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
      </div>

      <div>
        <label>Married: </label>
        <input type="checkbox" checked={married} onChange={(e) => setMarried(e.target.checked)} />
      </div>

      <div>
        <label>Profile Photo: </label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      {photoPreview && (
        <div>
          <p>Preview:</p>
          <img src={photoPreview} alt="preview" width={100} height={100} style={{ objectFit: "cover" }} />
        </div>
      )}

      <br />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
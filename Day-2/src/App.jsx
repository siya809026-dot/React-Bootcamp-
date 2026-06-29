import { useState } from "react";
import EmployeeForm from "./Component/EmployeeForm";
import EmployeeTable from "./Component/EmployeeTable";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filterDept, setFilterDept] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  function handleAddEmployee(emp) {
    setEmployees([...employees, emp]);
  }

  function handleDelete(index) {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  }

  // Filter
  let filteredList = employees.filter((emp) => {
    if (filterDept === "All") return true;
    return emp.department === filterDept;
  });

  // Sort
  if (sortOrder === "asc") {
    filteredList = [...filteredList].sort((a, b) => a.salary - b.salary);
  } else if (sortOrder === "desc") {
    filteredList = [...filteredList].sort((a, b) => b.salary - a.salary);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Employee Manager</h1>

      <EmployeeForm onAdd={handleAddEmployee} />

      <hr />

      {/* Filter and Sort Controls */}
      <div style={{ marginBottom: "10px" }}>
        <label>Filter by Department: </label>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Sort by Salary: </label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <EmployeeTable employees={filteredList} onDelete={handleDelete} />
    </div>
  );
}

export default App;
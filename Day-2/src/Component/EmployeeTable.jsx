import TableItem from "./TableItem";

function EmployeeTable({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Married</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <TableItem key={index} emp={emp} index={index} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
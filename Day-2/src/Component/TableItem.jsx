function TableItem({ emp, index, onDelete }) {
  return (
    <tr>
      <td>
        {emp.photoPreview ? (
          <img src={emp.photoPreview} alt="photo" width={50} height={50} style={{ objectFit: "cover" }} />
        ) : (
          "No photo"
        )}
      </td>
      <td>{emp.name}</td>
      <td>{emp.age}</td>
      <td>{emp.address}</td>
      <td>{emp.department}</td>
      <td>{emp.salary}</td>
      <td>{emp.married ? "Yes" : "No"}</td>
      <td>
        <button onClick={() => onDelete(index)} style={{ color: "red" }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TableItem;
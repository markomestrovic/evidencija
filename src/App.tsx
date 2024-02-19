/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Students.css";
import { Tables } from "./types/supabase";
import { supabase } from "./supabaseClient";

type Record = Tables<"records"> & {
  student: Tables<"student">[];
};

function App() {
  const [students, setStudents] = useState<Tables<"student">[]>();
  const [records, setRecords] = useState<Record[]>();
  useEffect(() => {
    getStudentsAndRecords();
  }, []);

  async function getStudents() {
    const { data } = await supabase.from("student").select("*");
    console.log(data);
    data && setStudents(data);
  }

  async function getRecords() {
    const { data } = await supabase.from("records").select("*, student(*)");
    console.log(data);
    data && setRecords(data);
  }

  async function getStudentsAndRecords() {
    await getStudents();
    await getRecords();
  }

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students?.map((student) => (
          <li key={student?.firstname}>{student?.firstname}</li>
        ))}
      </ul>
      <h2>Records</h2>
      <ul>
        {records?.map((record) => (
          <li key={record?.id}>
            {record?.id}{" "}
            {record.student?.map((student) => student.firstname).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
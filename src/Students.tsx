import { useEffect, useState } from "react";
import "./Students.css";
import { Tables } from "./types/supabase";
import { supabase } from "./supabaseClient";
import { useParams } from "react-router-dom";

function Students() {
  const { id } = useParams();
  const [students, setStudents] = useState<Tables<"student">[]>();

  async function getStudents() {
    if (!id) return;
    const { data } = await supabase
      .from("student")
      .select("*")
      .eq("record_id", id);
    console.log(data);
    data && setStudents(data);
  }

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="container">
      <h2>Studenti</h2>
      <ul>
        {students?.map((student) => (
          <li key={student?.firstname}>
            {student?.firstname + " " + student?.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;

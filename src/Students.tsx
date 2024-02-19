import { useEffect, useState } from "react";
import "./Students.css";
import { Tables } from "./types/supabase";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState<Tables<"student">[]>();

  async function getStudents() {
    const { data } = await supabase.from("student").select("*");
    console.log(data);
    data && setStudents(data);
  }

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="container">
      <Link id = "link" className="button" to="/" relative="path"><button>Evidencija</button></Link>
      <br/><br/><h2>Studenti</h2><br/>
      <h4>Ime prezime | Bluetooth_ID</h4>
      <ul>
        {students?.map((student) => (
          <li key={student?.firstname}>
            {student?.firstname +" "+ student?.lastname+" | "+ student?.bluetooth_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
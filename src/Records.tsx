import { useEffect, useState } from "react";
import "./Students.css";
import { Tables } from "./types/supabase";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Records() {
  const [records, setRecords] = useState<Tables<"records">[]>();
  const navigate = useNavigate();
  useEffect(() => {
    getRecords();
  }, []);

  async function getRecords() {
    const { data } = await supabase.from("records").select("*");
    console.log(data);
    data && setRecords(data);
  }

  return (
    <div className="container">
      <h2>Evidencije</h2>
      <ul className="records">
        {records?.map((record) => (
          <li
            key={record?.id}
            onClick={() => {
              navigate("/records/" + record?.id);
            }}
          >
            {record?.id}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Records;

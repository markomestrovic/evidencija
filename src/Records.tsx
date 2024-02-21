import { useEffect, useState } from "react";
import "./Students.css";
import { supabase } from "./supabaseClient";
import { Link } from "react-router-dom";

type RecordsWithStudentInfo =
  | {
      record_id: number;
      record_created_at: string;
      student_id: number;
      student_created_at: string;
      firstname: string;
      lastname: string;
      bluetooth_id: string;
    }[]
  | null;
function Records() {
  const [records, setRecords] = useState<RecordsWithStudentInfo>();
  useEffect(() => {
    getRecords();
  }, [records]);

  async function getRecords() {
    // const { data } = await supabase.from("records").select("*");
    const { data, error } = await supabase.rpc("get_records_with_students");
    if (error) console.error(error);
    else console.log(data);
    console.log("DATA", data);
    data && setRecords(data);
  }

  const deleteRecord = async (record_id: number) => {
    const { error } = await supabase
      .from("records")
      .delete()
      .eq("id", record_id);
    if (error) console.error(error);
  };
  return (
    <div className="container">
      <Link id="link1" to="/students" relative="path"><button>Studenti</button></Link>
      <br/><br/><h2>Evidencija</h2><br/>
      <h4>Ime prezime | Datum i vrijeme timbranja | Bluetooth ID</h4>
      <ul className="records">
        {records?.map((record) => (
          <li
            key={record?.record_id}
          >
            {record?.firstname} {record?.lastname} | {record?.record_created_at} | {record?.bluetooth_id}
            <button
              className="delete"
              onClick={() => {
                deleteRecord(record.record_id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Records;

import { useEffect, useState } from "react";
import "./Students.css";
import { supabase } from "./supabaseClient";

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
  }, []);

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
      <h2>Evidencije</h2><br/>
      <h4>Ime | Prezime | Datum i vrijeme timbranja | Bluetooth ID</h4>
      <ul className="records">
        {records?.map((record) => (
          <li
            key={record?.record_id}
            // onClick={() => {
            //   navigate("/records/" + record?.bluetooth_id);
            // }}
          >
            {record?.firstname} | {record?.lastname} | {record?.record_created_at} | {record?.bluetooth_id}
            <button id="iks"
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

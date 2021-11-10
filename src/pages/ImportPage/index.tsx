import XLSX from 'xlsx';
import React, { useState } from "react";

import * as Type from './type';
import * as Comp from "components";
export const ImportPage = () => {

  const [planList, setPlanList] = useState<Type.PlanRow[]>();
  const [studentList, setStudentList] = useState<Type.StudentRow[]>();
  const [rollCallList, setRollCallList] = useState<Type.RollCallRow[]>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({ currentTarget }) => {
    const [ file = null ] = currentTarget.files as FileList;
    if(!file) return;
    const workbook = XLSX.read(await file.arrayBuffer());
    setPlanList(XLSX.utils.sheet_to_json(workbook.Sheets.plan));
    setStudentList(XLSX.utils.sheet_to_json(workbook.Sheets.student));
    setRollCallList(XLSX.utils.sheet_to_json(workbook.Sheets.rollcall));
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    console.log({
      planList,
      studentList,
      rollCallList,
    });
  };

  return (
    <div>
      <Comp.Header />
      ImportPage
      <input type="file" onChange={handleChange} />
      <div><a download href="/data.xlsx">download sample</a></div>

      {studentList &&
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>status</th>
              <th>plan</th>
              <th>depositDay</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student, index) =>
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.status}</td>
                <td>{student.plan}</td>
                <td>{student.depositDay}</td>
              </tr>
            )}
          </tbody>
        </table>
      }

      {planList &&
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>money</th>
              <th>times</th>
              <th>expiresDays</th>
            </tr>
          </thead>
          <tbody>
            {planList.map((plan, index) =>
              <tr key={index}>
                <td>{plan.name}</td>
                <td>{plan.money}</td>
                <td>{plan.times}</td>
                <td>{plan.expiresDays}</td>
              </tr>
            )}
          </tbody>
        </table>
      }

      {rollCallList &&
        <table>
          <thead>
            <tr>
              <th>datetime</th>
              <th>student</th>
            </tr>
          </thead>
          <tbody>
            {rollCallList.map((rollCall, index) =>
              <tr key={index}>
                <td>{rollCall.datetime}</td>
                <td>{rollCall.student}</td>
              </tr>
            )}
          </tbody>
        </table>
      }

      {studentList && studentList.length && planList && planList.length &&
        <button onClick={handleClick}>匯入並取代資料</button>
      }
    </div>
  );
};

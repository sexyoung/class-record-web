import XLSX from 'xlsx';
import cx from 'classnames';
import React, { useState } from "react";

import * as API from "api";
import * as Type from './type';
import * as TypeImport from "domain/type/req/importing";
import * as Comp from "components";

import style from './style.module.css';
import btnStyle from 'components/btn.module.css';

export const ImportPage = () => {

  const [planList, setPlanList] = useState<TypeImport.Plan[]>();
  const [studentList, setStudentList] = useState<TypeImport.Student[]>();
  const [rollCallList, setRollCallList] = useState<TypeImport.RollCall[]>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({ currentTarget }) => {
    const [ file = null ] = currentTarget.files as FileList;
    if(!file) return;
    const workbook = XLSX.read(await file.arrayBuffer());
    setPlanList(XLSX.utils.sheet_to_json(workbook.Sheets.plan));
    setStudentList(XLSX.utils.sheet_to_json(workbook.Sheets.student));
    setRollCallList(XLSX.utils.sheet_to_json(workbook.Sheets.rollcall));
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if(!planList || !studentList || !rollCallList) return;
    API.importing({ planList, studentList, rollCallList })
      .then(console.log)
      .catch(console.log)
    ;
  };

  return (
    <div className={style.ImportPage}>
      <Comp.Header />
      <div className={style.content}>
        <h2><a download href="/data.xlsx">download sample</a></h2>
        {!studentList && <input type="file" onChange={handleChange} />}

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
        <button className={cx(btnStyle.btn, 'w-full')} onClick={handleClick}>匯入並取代資料</button>
        }
      </div>
    </div>
  );
};

import XLSX from 'xlsx';
import React from "react";

import * as Comp from "components";
export const ImportPage = () => {

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({ currentTarget }) => {
    const [ file = null ] = currentTarget.files as FileList;
    if(!file) return;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets.student));
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets.plan));
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets.rollcall));
  };

  return (
    <div>
      <Comp.Header />
      ImportPage
      <input type="file" onChange={handleChange} />
      <a download href="/data.xlsx">download sample</a>
    </div>
  );
};

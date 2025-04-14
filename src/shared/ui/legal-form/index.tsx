import React from "react";
import { TextField } from "@mui/material";
import { CompanyType } from "@/shared/types/users";

const LegalForm = ({ formValues } : {formValues: CompanyType}) => {
  return (
    <div className="p-4 border rounded grid grid-cols-2 gap-4">
      <TextField label="INN" value={formValues.tin} fullWidth />
      <TextField label="Kompaniya nomi" value={formValues.name} fullWidth />
      <TextField label="Qisqa nomi" value={formValues.shortName} fullWidth />
    </div>
  );
};

export default LegalForm;

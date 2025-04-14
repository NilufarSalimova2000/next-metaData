"use client";

import React from "react";
import { PatientTable } from "@/shared/ui/users-tabel";
import { Button } from "@mui/material";
import Link from "next/link";

const Patient = () => {
  return (
    <div>
      <Link href={"/patient-create"}>
        <Button sx={{ margin: "20px" }} type="submit" variant="contained">
          Registration
        </Button>
      </Link>
      <PatientTable />
    </div>
  );
};

export default Patient;

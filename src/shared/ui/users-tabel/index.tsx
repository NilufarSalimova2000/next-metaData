"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PatientApi } from "@/redux/services/lis/users/patient";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@/assets/icons/arrow-left-icon";
import { MenuIcon } from "@/assets/icons/menu-icon";
import { ArrowRightIcon } from "@/assets/icons/arrow-right-icon";
import dayjs from "dayjs";

export const PatientTable = () => {
  const [getPatients, { data, isLoading, isError }] =
    PatientApi.useGetPatientsMutation();
  const [page, setPage] = useState(0);
  const limit = 15;

  useEffect(() => {
    getPatients({
      orgId: 15, 
      page,
      limit,
      search: { value: "" },
    });
  }, [getPatients, page]);

  const rows = data?.data?.list || [];

  return (
    <div className="p-[20px]">
      <TableContainer sx={{ width: "100%", overflowX: "auto" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="center">Fullname</TableCell>
              <TableCell align="center">PNFL</TableCell>
              <TableCell align="center">Nurse interior number</TableCell>
              <TableCell align="center">Date of birth</TableCell>
              <TableCell align="center">Region</TableCell>
              <TableCell align="center">District</TableCell>
              <TableCell align="center">Menu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Error fetching data
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{`${row.firstName || ""} ${
                    row.middleName || ""
                  } ${row.lastName || ""}`}</TableCell>
                  <TableCell align="left">{row.pnfl}</TableCell>
                  <TableCell align="left">{row.nurseInteriorNumber}</TableCell>
                  <TableCell align="left">{row.dateOfBirth ? dayjs(row.dateOfBirth).format("DD.MM.YYYY") : "—"}</TableCell>
                  <TableCell align="left">{row.region?.name || ""}</TableCell>
                  <TableCell align="left">{row.district?.name || ""}</TableCell>
                  <TableCell align="center">
                    <MenuIcon />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <div className="flex justify-end gap-4 mt-4 items-center">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <ArrowLeftIcon />
        </button>
        <span>Page {page + 1}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={(data?.data?.list?.length ?? 0) < limit}
        >
          <ArrowRightIcon />
        </button>
      </div> */}
    </div>
  );
};

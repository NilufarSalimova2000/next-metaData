"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useGetRegionsMutation } from "@/redux/services/lis/search-citizen-legal/regions";
import { useLazyGetDistrictQuery } from "@/redux/services/lis/search-citizen-legal/district";
import { TCitizenForm } from "../patient-search-form";

export const CitizenForm = ({ formValues }: { formValues: TCitizenForm }) => {
  const [regionId, setRegionId] = useState(0);
  const [districtId, setDistrictId] = useState<number | "">("");

  const [getRegions, { data: regionsData, isLoading: regionsLoading }] =
    useGetRegionsMutation();

  const [fetchDistricts, { data: districtsData, isLoading: districtsLoading }] =
    useLazyGetDistrictQuery();

  useEffect(() => {
    getRegions({
      page: 0,
      limit: 100,
      search: { value: "" },
    });
  }, [getRegions]);

  const handleRegionChange = async (event: SelectChangeEvent) => {
    const selectedRegionId = Number(event.target.value);
    setRegionId(selectedRegionId);
    setDistrictId("");
    try {
      await fetchDistricts({ id: selectedRegionId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    const selectedDistrictId = Number(event.target.value);
    setDistrictId(selectedDistrictId);
  };

  return (
    <div className="p-4 border rounded grid grid-cols-3 gap-4">
      <TextField
        label="Фамилия"
        value={formValues.surnamelat || ""}
        fullWidth
      />
      <TextField label="Имя" value={formValues.namelat || ""} fullWidth />
      <TextField
        label="Отчество"
        value={formValues.patronymlat || ""}
        fullWidth
      />
      <TextField
        label="Дата рождения"
        value={formValues.birth_date}
        fullWidth
      />
      <TextField
        label="Национальность"
        value={formValues.nationality}
        fullWidth
      />
      <TextField label="Пол" value={formValues.sex} fullWidth />

      <FormControl>
        <InputLabel>Регион</InputLabel>
        <Select
          value={String(regionId)}
          onChange={handleRegionChange}
          fullWidth
        >
          {regionsLoading ? (
            <MenuItem disabled>Yuklanmoqda...</MenuItem>
          ) : (
            regionsData?.data.list.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Район</InputLabel>
        <Select
          value={String(districtId)}
          onChange={handleDistrictChange}
          fullWidth
          disabled={!regionId}
        >
          {districtsLoading ? (
            <MenuItem disabled>Yuklanmoqda...</MenuItem>
          ) : (
            districtsData?.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <TextField label="Адрес" fullWidth />
      <TextField label="Номер телефона" fullWidth />
      <TextField
        label="Дата использования личных данных пациента"
        InputLabelProps={{ shrink: true }}
        type="date"
        fullWidth
      />

      {formValues.photo && (
        <img
          src={formValues.photo}
          alt="Foydalanuvchi"
          className="w-32 h-32 object-cover"
        />
      )}
    </div>
  );
};

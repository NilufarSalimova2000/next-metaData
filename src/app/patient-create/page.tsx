"use client";

import React, { useState } from "react";
import {
  PatientSearchForm,
  TCitizenForm,
} from "@/shared/ui/patient-search-form";
import { Button, Box } from "@mui/material";
import { AnalysisForm } from "@/shared/ui/form/analyse-form";
import {
  AnalyseApi,
  useGetLoincQuery,
} from "@/redux/services/lis/search-citizen-legal/analyse";
import { AnalyseCreateT } from "@/shared/types/analyse";
import { CompanyType } from "@/shared/types/users";
import { useFieldArray, useForm } from "react-hook-form";
import { organizationId } from "@/shared/contants";

export type TAnalyseCreateForm = Omit<
  AnalyseCreateT,
  "analyseNameOfLoinc" | "analyseCodeOfLoinc"
> & { loincTypeId: number };

type TPatient = TAnalyseCreateForm["patient"];

const initPatient: TPatient = {
  email: "",
  passportSerial: "",
  passportNumber: "",
  address: "",
  pnfl: "",
  dateOfBirth: "",
  districtId: 0,
  firstName: "",
  gender: false,
  isAnonymous: false,
  lastName: "",
  middleName: "",
  nationality: "",
  photo: "",
  regionId: 0,
  username: "",
};

const initAnalyse: TAnalyseCreateForm = {
  fundingStatus: "",
  organizationId: organizationId,
  initialConclusion: "",
  applicationTypeId: 0,
  loincTypeId: 0,
  analyseDetails: {
    comment: "",
    analyseTypeId: 0,
    executionPriority: "",
    measurementUnitId: 0,
    typeBiomaterialId: 0,
  },
  patient: {
    email: "",
    passportSerial: "",
    passportNumber: "",
    address: "",
    pnfl: "",
    dateOfBirth: "",
    districtId: 0,
    firstName: "",
    gender: false,
    isAnonymous: false,
    lastName: "",
    middleName: "",
    nationality: "",
    photo: "",
    regionId: 0,
    username: "",
  },
  sendDetails: {
    sendDateOfAnalyse: "",
    sampleArrivedDate: "",
    numberOfSamples: 1,
    fullNameOfRecipient: "",
    fullNameOfDeliveryMan: "",
    fullNameOfReferringDoctor: "",
    phoneNumberDeliveryMan: "",
    senderOrganizationInn: "",
    senderOrganizationName: "",
  },
};

const PatientCreate = () => {
  const [createAnalyseList, setCreateAnalyseList] = useState<AnalyseCreateT[]>(
    []
  );
  const [createAnalyse] = AnalyseApi.useCreateAnalyseMutation();

  const { data: loincListRes } = useGetLoincQuery({
    id: organizationId,
    page: 0,
    limit: 100,
    search: { value: "" },
  });
  const loincList = loincListRes?.data.list ?? [];

  const { data: biomaterialListR } = AnalyseApi.useGetBiomaterialQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });
  const biomaterialList = biomaterialListR?.data.list ?? [];

  const { data: analyseListR } = AnalyseApi.useGetAnalyseQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });

  const analyseList = analyseListR?.data.list ?? [];

  const { data: meaUnitListR } = AnalyseApi.useGetMeasurementUnitQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  });

  const meaUnitList = meaUnitListR?.data.list ?? [];

  const { data: applicationListR } = AnalyseApi.useGetApplicationQuery({
    page: 0,
    limit: 100,
    search: { value: "" },
  })

  const applicationList = applicationListR?.data.list ?? []

  const { control, register, handleSubmit } = useForm<{
    analyses: TAnalyseCreateForm[];
  }>({
    defaultValues: { analyses: [initAnalyse] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "analyses",
  });

  const [patientInfo, setPatientInfo] = useState<TPatient>(initPatient);

  const formatDate = (date: string): string => {
    const d = new Date(date);
    const offset = d.getTimezoneOffset() / 60;
    const formattedDate = d.toISOString().slice(0, 19); // "2000-10-21T00:00:00"

    // To'g'ri timezone offset formatini olish
    const timezoneOffset =
      offset >= 0
        ? `+${String(Math.abs(offset)).padStart(2, "0")}:00`
        : `-${String(Math.abs(offset)).padStart(2, "0")}:00`;

    return `${formattedDate}${timezoneOffset}`;
  };

  const handleSearchFormSubmit = (data: CompanyType | TCitizenForm) => {
    console.log("handleSearchFormSubmit", data);

    if ("sex" in data) {
      setPatientInfo((prev) => ({
        ...prev,
        firstName: data.namelat,
        middleName: data.patronymlat,
        lastName: data.surnamelat,
        gender: data.sex === "Erkak",
        dateOfBirth: formatDate(data.birth_date),
        districtId: data.birthcountryid,
        nationality: data.nationality,
        photo: data.photo,
        username: data.current_pinpp,
        pnfl: data.current_pinpp,
      }));
    }
  };

  const handleAnalyseFormSubmit = (index: number) => (data: AnalyseCreateT) => {
    setCreateAnalyseList((prev) => {
      const updated = [...prev];
      updated[index] = data;
      return updated;
    });
  };

  const handleSubmitAll = async (data: { analyses: TAnalyseCreateForm[] }) => {
    // console.log(data);

    await Promise.all(
      data.analyses.map(({ loincTypeId, ...analyse }) => {
        const loincType = loincList.find((itm) => itm.id === loincTypeId);

        if (loincType) {
          return createAnalyse({
            ...analyse,
            analyseNameOfLoinc: loincType.component,
            analyseCodeOfLoinc: loincType.loincNumber,
            patient: patientInfo,
          });
        }
      })
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitAll)} p={2}>
      <PatientSearchForm onFormUpdate={handleSearchFormSubmit} />

      {fields.map((analyse, index) => (
        <AnalysisForm
          key={analyse.id}
          index={index}
          analyse={analyse}
          loincList={loincList}
          biomaterialList={biomaterialList}
          analyseList={analyseList}
          meaUnitList={meaUnitList}
          applicationList={applicationList}
          register={register}
          onRemove={() => remove(index)}
          onSubmitData={handleAnalyseFormSubmit(index)}
        />
      ))}

      <Box mt={2}>
        <Button variant="contained" onClick={() => append(initAnalyse)}>
          Добавить новый анализ
        </Button>
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="success" type="submit">
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default PatientCreate;

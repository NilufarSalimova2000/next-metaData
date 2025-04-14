"use client";

import React from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import {
  AnalyseCreateT,
  ApplicationType,
  BiomaterialType,
  LoincType,
} from "@/shared/types/analyse";
import { TAnalyseCreateForm } from "@/app/patient-create/page";

type AnalysisFormProps = {
  index: number;
  analyse: TAnalyseCreateForm;
  loincList: LoincType[];
  biomaterialList: BiomaterialType[]
  analyseList: BiomaterialType[]
  meaUnitList: BiomaterialType[]
  applicationList: ApplicationType[]

  onRemove: () => void;
  register: UseFormRegister<{
    analyses: TAnalyseCreateForm[];
  }>;
  onSubmitData: (data: AnalyseCreateT) => void;
};

const financingOptions = [
  { label: "PK243", value: "PK243" },
  { label: "Бесплатно", value: "FREE" },
  { label: "В процессе", value: "IN_PROCESS" },
  { label: "Оплачен", value: "COMPLETED" },
];
const primaryConclusionOptions = [
  { label: "Не здоров", value: "UNHEALTHY" },
  { label: "Здоров", value: "HEALTHY" },
];
const priorityOptions = [
  { label: "Высокий", value: "HIGH" },
  { label: "Средний", value: "MEDIUM" },
  { label: "Низкий", value: "LOW" },
];

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  index,
  loincList,
  biomaterialList,
  analyseList,
  meaUnitList,
  applicationList,
  onRemove,
  register,
}) => {

  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" color="#228BE6" gutterBottom>
        Анализ № {index + 1}
      </Typography>

      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Loinc</InputLabel>
            <Select
              {...register(`analyses.${index}.loincTypeId`)}
              label="Loinc"
            >
              {loincList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.component}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Статус финансирования</InputLabel>
            <Select
              {...register(`analyses.${index}.fundingStatus`)}
              label="Статус финансирования"
            >
              {financingOptions.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Первичное заключение</InputLabel>
            <Select
              {...register(`analyses.${index}.initialConclusion`)}
              label="Первичное заключение"
            >
              {primaryConclusionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Typography variant="subtitle1">Детали анализа</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Приоритет выполнения</InputLabel>
            <Select
              {...register(
                `analyses.${index}.analyseDetails.executionPriority`
              )}
              label="Приоритет выполнения"
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Метод исследования</InputLabel>
            <Select
              {...register(`analyses.${index}.analyseDetails.analyseTypeId`)}
              label="Метод исследования"
            >
              {analyseList.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nameRu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Тип обращения</InputLabel>
            <Select
              {...register(`analyses.${index}.applicationTypeId`)}
              label="Тип обращения"
            >
              {applicationList.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nameRu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Вид биоматериала</InputLabel>
            <Select
              {...register(
                `analyses.${index}.analyseDetails.typeBiomaterialId`
              )}
              label="Вид биоматериала"
            >
              {biomaterialList.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nameRu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Единица измерения</InputLabel>
            <Select
              {...register(
                `analyses.${index}.analyseDetails.measurementUnitId`
              )}
              label="Единица измерения"
            >
              {meaUnitList.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nameRu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            {...register(`analyses.${index}.sendDetails.numberOfSamples`)}
            label="Число образцов"
            fullWidth
          />
        </Stack>
        <TextField
          {...register(`analyses.${index}.analyseDetails.comment`)}
          label="Комментарий"
          fullWidth
        />

        <Typography variant="subtitle1">Детали отправки</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            {...register(`analyses.${index}.sendDetails.senderOrganizationInn`)}
            label="ИНН отправляющей организации"
            fullWidth
          />
          <TextField
            {...register(
              `analyses.${index}.sendDetails.senderOrganizationName`
            )}
            label="Название организации"
            fullWidth
          />

          <TextField
            {...register(
              `analyses.${index}.sendDetails.fullNameOfReferringDoctor`
            )}
            label="ФИО врача"
            fullWidth
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            {...register(`analyses.${index}.sendDetails.sendDateOfAnalyse`)}
            label="Дата направления"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            {...register(`analyses.${index}.sendDetails.sampleArrivedDate`)}
            label="Дата прибытия"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            {...register(
              `analyses.${index}.sendDetails.phoneNumberDeliveryMan`
            )}
            label="Телефон доставщика"
            fullWidth
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            {...register(`analyses.${index}.sendDetails.fullNameOfDeliveryMan`)}
            label="ФИО доставивший образцы"
            fullWidth
          />

          <TextField
            {...register(`analyses.${index}.sendDetails.fullNameOfRecipient`)}
            label="ФИО принявший образцы"
            fullWidth
          />
        </Stack>

        <Box mt={2} display="flex" gap={4}>
          <Button variant="outlined" color="error" onClick={onRemove}>
            Удалить анализ
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

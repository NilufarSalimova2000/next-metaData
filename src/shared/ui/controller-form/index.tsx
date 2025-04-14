"use client";

import { useForm } from "react-hook-form";
import { OrganizationApi } from "@/redux/services/lis/organization";
import { UsersApi } from "@/redux/services/lis/users";
import { WarehouseApi } from "@/redux/services/lis/warehouse";
import { IControllerCreate } from "@/shared/types/warehouse";
import { useEffect } from "react";
import {
  ControllerApi,
  useLazyGetSingleControllerQuery,
} from "@/redux/services/lis/warehouse/requirement-controller";

interface ControllerFormProps {
  defaultValues?: any;
  onClose: () => void;
}

export const ControllerForm: React.FC<ControllerFormProps> = ({
  defaultValues,
  onClose,
}) => {
  const { handleSubmit, register, control, watch, setValue, reset, getValues } =
    useForm<IControllerCreate>({
      defaultValues: defaultValues || {
        docNumber: "",
        receiverId: undefined,
        supervisorId: undefined,
        executionPriority: "",
        comment: "",
        itemRequestDTOS: [],
        ...defaultValues,
      },
    });

  const [createMutation, { isSuccess, isLoading }] =
    ControllerApi.useCreateControllerMutation();
  const [updateMutation, { isLoading: isUpdating, isSuccess: isUpdated }] =
    ControllerApi.useUpdateControllerMutation();

  const [fetchSingle, { data: controllerData, isLoading: isFetching }] =
    useLazyGetSingleControllerQuery();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      console.log(defaultValues);
      
      setValue(
        "receiverId",
        defaultValues.receiverId ?? defaultValues.receiver?.id ?? ""
      );
      setValue(
        "supervisorId",
        defaultValues.supervisorId ?? defaultValues.supervisor?.id ?? ""
      );
      setValue("executionPriority", defaultValues.executionPriority || "");
        const updatedItems = defaultValues.requirementItems.map((item: any) => ({
          ...item,
          itemId: item.itemId ?? String(item.item?.id) ?? null,
        }));
        setValue("itemRequestDTOS", updatedItems);
      
    }
  }, [defaultValues, reset, setValue]);

  useEffect(() => {
    if (isSuccess || isUpdated) {
      onClose();
    }
  }, [isSuccess, isUpdated, onClose]);

  const onSubmit = async (data: IControllerCreate) => {
    try {
      if (defaultValues?.id) {
        await updateMutation({
          id: defaultValues.id,
          departmentId: 15,
          ...data,
        }).unwrap();
      } else {
        await createMutation({ departmentId: 15, ...data }).unwrap();
      }
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating/updating controller:", error);
    }
  };

  const selectedItems = watch("itemRequestDTOS") || [];

  const [getOrganizations, { data: organizationData }] =
    OrganizationApi.useGetOrganizationMutation();
  const [getUsers, { data: usersData }] = UsersApi.useGetUsersMutation();
  const [getWarehouses, { data: warehousesData }] =
    WarehouseApi.useGetWarehousesMutation();

  useEffect(() => {
    getOrganizations({ limit: 25, page: 0, search: { value: "" } });
    getUsers({ id: 1, limit: 25, page: 0, search: { value: "" } });
    getWarehouses({ id: 15, limit: 25, page: 0, search: { value: "" } });
  }, []);

  console.log(getValues("docNumber"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          className="w-full p-2 rounded border"
          {...register("docNumber")}
          placeholder="Номер документа *"
          required
          value={getValues("docNumber")}
          disabled={isFetching}
        />

        <select
          className="w-full p-2 rounded border"
          {...register("receiverId")}
          required
          disabled={isFetching}
          value={watch("receiverId") || ""}
          onChange={(e) => setValue("receiverId", Number(e.target.value))}
        >
          <option value="">Выберите получателя *</option>
          {organizationData?.data?.list?.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 rounded border"
          {...register("supervisorId")}
          required
          disabled={isFetching}
          value={watch("supervisorId") || ""}
          onChange={(e) => setValue("supervisorId", Number(e.target.value))}
        >
          <option value="">Выберите ответственного *</option>
          {usersData?.data?.list?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 rounded border"
          {...register("executionPriority")}
          required
          disabled={isFetching}
          value={watch("executionPriority") || ""}
          onChange={(e) => setValue("executionPriority", e.target.value)}
        >
          <option value="">Выберите приоритет *</option>
          <option value="LOW">Низкий</option>
          <option value="MEDIUM">Средний</option>
          <option value="HIGH">Высокий</option>
        </select>

        <input
          className="w-full p-2 rounded border"
          {...register("comment")}
          placeholder="Комментарий"
          disabled={isFetching}
          // defaultValue={controllerData?.comment}
        />

        <select
          className="w-full p-2 rounded border"
          // onChange={handleItemSelect}
          required
          disabled={isFetching}
        >
          <option value="">Выберите товар *</option>
          {warehousesData?.data?.list?.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>

        {selectedItems.map((item, index) => (
          <div key={item.itemId} className="grid grid-cols-2 gap-2">
            <input
              type="number"
              className="w-full p-2 rounded border"
              {...register(`itemRequestDTOS.${index}.count` as const)}
              placeholder="Количество"
              min="1"
              required
              disabled={isFetching}
            />

            <input
              className="w-full p-2 rounded border"
              {...register(`itemRequestDTOS.${index}.description` as const)}
              placeholder="Описание"
              disabled={isFetching}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
          disabled={isLoading || isFetching}
        >
          {defaultValues ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

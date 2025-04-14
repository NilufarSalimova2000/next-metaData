import { CreateCategoryRequest } from "@/shared/types/warehouse";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryRequest) => void;
  defaultValues?: { name: string };
}

export const Form = ({ onSubmit, defaultValues }: CategoryFormProps) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: defaultValues || { name: "" },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full p-[15px] rounded border mb-[15px]"
          {...register("name")}
          placeholder="Name"
          aria-label="Name"
          type="text"
        />
        <button
          className="rounded bg-[#1814f3] py-[8px] px-[17px] text-[#fff] font-[600]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

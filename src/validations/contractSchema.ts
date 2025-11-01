// src/validation/contractSchema.ts
import * as Yup from "yup";
import type { ContractStatus } from "@/types/contracts";
import type { Dealer } from "@/types/dealer";

export const createContractSchema = Yup.object().shape({
  dealer: Yup.object<Dealer>()
    .required("Vui lòng chọn đại lý hợp đồng")
    .nullable(),
  startDate: Yup.string()
    .required("Vui lòng nhập ngày bắt đầu")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Ngày bắt đầu không hợp lệ"),
  endDate: Yup.string()
    .required("Vui lòng nhập ngày kết thúc")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Ngày kết thúc không hợp lệ"),
  targets: Yup.string().required("Vui lòng nhập mục tiêu hợp đồng"),
  discountPolicyRef: Yup.string().required("Vui lòng chọn chính sách giảm giá"),
  status: Yup.mixed<ContractStatus>()
    .oneOf(
      ["draft", "active", "signed", "cancelled"],
      "Trạng thái hợp đồng không hợp lệ"
    )
    .required("Trạng thái bắt buộc chọn"),
});

export const updateContractSchema = Yup.object().shape({
  targets: Yup.string().required("Mục tiêu hợp đồng bắt buộc nhập"),
  status: Yup.mixed<ContractStatus>()
    .oneOf(["draft", "active", "signed", "cancelled"])
    .required("Trạng thái hợp đồng bắt buộc chọn"),
});

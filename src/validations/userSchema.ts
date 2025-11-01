// src/validation/userSchema.ts
import * as Yup from "yup";
import { UserRole } from "@/types/users";

// Reusable validation cho tên
const nameValidation = Yup.string()
  .required("Tên người dùng bắt buộc nhập")
  .min(2, "Tên phải ít nhất 2 ký tự")
  .max(50, "Tên tối đa 50 ký tự");

// Reusable validation cho email
const emailValidation = Yup.string()
  .required("Email bắt buộc nhập")
  .email("Email không hợp lệ");

// Reusable validation cho role
const roleValidation = Yup.mixed<UserRole>()
  .oneOf(
    ["Admin", "EVMStaff", "DealerManager", "DealerStaff"],
    "Vai trò không hợp lệ"
  )
  .required("Vui lòng chọn vai trò");

// Reusable validation cho status
const statusValidation = Yup.string()
  .oneOf(["active", "inactive"], "Trạng thái không hợp lệ")
  .required("Trạng thái bắt buộc chọn");

// Schema tạo mới user
export const createUserSchema = Yup.object().shape({
  profile: Yup.object({
    name: nameValidation,
  }),
  email: emailValidation,
  role: roleValidation,
  dealer: Yup.object({
    _id: Yup.string().required("Vui lòng chọn đại lý"),
    name: Yup.string(),
  }).when("role", {
    is: (role: UserRole) => role === "DealerManager" || role === "DealerStaff",
    then: (schema) => schema.required("Đại lý bắt buộc với vai trò này"),
    otherwise: (schema) => schema.notRequired(),
  }),
  status: statusValidation,
});

// Schema cập nhật user (update)
export const updateUserSchema = Yup.object().shape({
  profile: Yup.object({
    name: nameValidation,
  }),
  email: emailValidation,
  role: roleValidation,
  dealer: Yup.object({
    _id: Yup.string().required("Vui lòng chọn đại lý"),
    name: Yup.string(),
  }).when("role", {
    is: (role: UserRole) => role === "DealerManager" || role === "DealerStaff",
    then: (schema) => schema.required("Đại lý bắt buộc với vai trò này"),
    otherwise: (schema) => schema.notRequired(),
  }),
  status: statusValidation,
});

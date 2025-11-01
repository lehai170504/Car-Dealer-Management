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

/** 📘 Schema xác thực cho form đăng ký */
export const createUserSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),

  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),

  role: Yup.string()
    .oneOf(
      ["Admin", "EVMStaff", "DealerManager", "DealerStaff"],
      "Vai trò không hợp lệ"
    )
    .required("Vai trò là bắt buộc"),

  dealer: Yup.string().when("role", {
    is: (role: string) => ["DealerManager", "DealerStaff"].includes(role),
    then: (schema) => schema.required("Vui lòng chọn đại lý"),
    otherwise: (schema) => schema.notRequired(),
  }),

  profile: Yup.object().shape({
    name: Yup.string().trim().required("Tên là bắt buộc"),
    phone: Yup.string()
      .matches(/^0\d{9,10}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
  }),
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

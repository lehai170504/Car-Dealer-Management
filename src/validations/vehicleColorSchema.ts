// src/validation/vehicleColorSchema.ts
import * as Yup from "yup";

export const vehicleColorSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Tên màu không được bỏ trống")
    .max(50, "Tên màu quá dài (tối đa 50 ký tự)"),
  code: Yup.string()
    .trim()
    .required("Code không được bỏ trống")
    .max(10, "Code quá dài (tối đa 10 ký tự)"),
  hex: Yup.string()
    .trim()
    .required("Hex không được bỏ trống")
    .matches(/^#([0-9A-Fa-f]{6})$/, "Hex không hợp lệ, phải có dạng #RRGGBB"),
  extraPrice: Yup.number()
    .required("Extra Price không được bỏ trống")
    .min(0, "Extra Price phải >= 0"),
  active: Yup.boolean().required("Trạng thái bắt buộc chọn"),
});

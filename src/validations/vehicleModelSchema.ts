import * as Yup from "yup";

export const vehicleModelSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Tên model không được bỏ trống")
    .max(100, "Tên quá dài (tối đa 100 ký tự)"),
  brand: Yup.string()
    .trim()
    .required("Thương hiệu không được bỏ trống")
    .max(50, "Thương hiệu quá dài (tối đa 50 ký tự)"),
  segment: Yup.string()
    .trim()
    .required("Phân khúc không được bỏ trống")
    .max(50, "Phân khúc quá dài (tối đa 50 ký tự)"),
  description: Yup.string().max(255, "Mô tả quá dài (tối đa 255 ký tự)"),
  active: Yup.boolean().required(),
});

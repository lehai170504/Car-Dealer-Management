import * as Yup from "yup";

export const vehicleSchema = Yup.object().shape({
  model: Yup.string()
    .trim()
    .required("Model không được bỏ trống")
    .max(100, "Model quá dài (tối đa 100 ký tự)"),
  trim: Yup.string()
    .trim()
    .required("Trim không được bỏ trống")
    .max(50, "Trim quá dài (tối đa 50 ký tự)"),
  battery: Yup.string()
    .trim()
    .required("Battery không được bỏ trống")
    .max(50, "Battery quá dài (tối đa 50 ký tự)"),
  range: Yup.number()
    .required("Range không được bỏ trống")
    .moreThan(0, "Range phải lớn hơn 0"),

  motorPower: Yup.number()
    .required("Motor Power không được bỏ trống")
    .moreThan(0, "Motor Power phải lớn hơn 0"),

  msrp: Yup.number()
    .required("MSRP không được bỏ trống")
    .moreThan(0, "MSRP phải lớn hơn 0"),
  active: Yup.boolean().required("Trạng thái bắt buộc chọn"),
  features: Yup.array()
    .of(Yup.string().trim().max(50, "Feature quá dài (tối đa 50 ký tự)"))
    .optional(),
  images: Yup.array()
    .of(
      Yup.string()
        .trim()
        .url("Phải là URL hợp lệ")
        .max(255, "URL quá dài (tối đa 255 ký tự)")
    )
    .optional(),
});

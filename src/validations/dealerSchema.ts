import * as Yup from "yup";

export const dealerSchema = Yup.object().shape({
  name: Yup.string().trim().required("Tên đại lý không được bỏ trống"),
  code: Yup.string().trim().required("Mã đại lý không được bỏ trống"),
  region: Yup.string().trim().required("Khu vực không được bỏ trống"),
  address: Yup.string().trim().required("Địa chỉ không được bỏ trống"),
  contacts: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().trim().required("Tên liên hệ không được bỏ trống"),
        phone: Yup.string()
          .trim()
          .required("Số điện thoại không được bỏ trống")
          .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
        email: Yup.string()
          .trim()
          .email("Email không hợp lệ")
          .required("Email không được bỏ trống"),
      })
    )
    .min(1, "Cần ít nhất 1 người liên hệ"),
  creditLimit: Yup.number()
    .required("Giới hạn tín dụng bắt buộc")
    .min(0, "Giới hạn tín dụng phải >= 0"),
  status: Yup.string().oneOf(["active", "inactive"], "Trạng thái không hợp lệ"),
});

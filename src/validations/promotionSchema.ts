import * as Yup from "yup";

export const createPromotionSchema = Yup.object().shape({
  name: Yup.string().required("Tên chương trình bắt buộc nhập"),
  validFrom: Yup.date().required("Ngày bắt đầu bắt buộc nhập"),
  validTo: Yup.date()
    .required("Ngày kết thúc bắt buộc nhập")
    .min(Yup.ref("validFrom"), "Ngày kết thúc phải sau ngày bắt đầu"),
  value: Yup.number()
    .required("Giá trị bắt buộc nhập")
    .min(0, "Giá trị phải >= 0"),
});

export const updatePromotionSchema = Yup.object().shape({
  name: Yup.string().required("Tên chương trình bắt buộc nhập"),
  validFrom: Yup.date().required("Ngày bắt đầu bắt buộc nhập"),
  validTo: Yup.date()
    .required("Ngày kết thúc bắt buộc nhập")
    .min(Yup.ref("validFrom"), "Ngày kết thúc phải sau ngày bắt đầu"),
  value: Yup.number()
    .required("Giá trị bắt buộc nhập")
    .min(0, "Giá trị phải >= 0"),
});

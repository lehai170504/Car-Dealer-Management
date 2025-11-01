// src/validation/inventorySchema.ts
import * as Yup from "yup";

export const createInventorySchema = Yup.object().shape({
  ownerType: Yup.string()
    .oneOf(["Dealer", "Warehouse"], "Chủ sở hữu không hợp lệ")
    .required("Chủ sở hữu bắt buộc chọn"),
  ownerId: Yup.string().required("Vui lòng chọn đại lý hoặc kho"),
  variantId: Yup.string().required("Vui lòng chọn biến thể"),
  colorId: Yup.string().required("Vui lòng chọn màu"),
  quantity: Yup.number()
    .required("Số lượng bắt buộc nhập")
    .min(1, "Số lượng phải lớn hơn 0"),
  reserved: Yup.number()
    .required("Dự trữ bắt buộc nhập")
    .min(0, "Dự trữ phải >= 0"),
  location: Yup.string().trim(),
  vinListInput: Yup.string().trim(),
});

export const updateInventorySchema = Yup.object({
  quantity: createInventorySchema.fields.quantity,
  reserved: createInventorySchema.fields.reserved,
  location: createInventorySchema.fields.location,
  vinListInput: createInventorySchema.fields.vinListInput,
});

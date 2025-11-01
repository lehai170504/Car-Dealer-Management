"use client";

import { useFormik } from "formik";
import { vehicleModelSchema } from "@/validations/vehicleModelSchema";
import { useVehicleModels } from "@/hooks/useVehicleModels";
import { CreateVehicleModelRequest } from "@/types/vehicleModels";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CreateVehicleModelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateVehicleModelModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateVehicleModelModalProps) {
  const { handleCreate, loading } = useVehicleModels();

  const formik = useFormik<CreateVehicleModelRequest>({
    initialValues: {
      name: "",
      brand: "",
      segment: "",
      description: "",
      active: true,
    },
    validationSchema: vehicleModelSchema,
    onSubmit: async (values) => {
      await handleCreate(values);
      formik.resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
  });

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) formik.resetForm();
      }}
    >
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo Vehicle Model mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          {/* 📝 Name */}
          <div>
            <Input
              name="name"
              placeholder="Tên Model"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* 🏷 Brand */}
          <div>
            <Input
              name="brand"
              placeholder="Thương hiệu"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.brand && formik.errors.brand && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.brand}</p>
            )}
          </div>

          {/* 📊 Segment */}
          <div>
            <Input
              name="segment"
              placeholder="Phân khúc"
              value={formik.values.segment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.segment && formik.errors.segment && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.segment}
              </p>
            )}
          </div>

          {/* 📝 Description */}
          <div>
            <Input
              name="description"
              placeholder="Mô tả (tùy chọn)"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* 🟢 Active */}
          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={formik.values.active ? "active" : "inactive"}
              onValueChange={(val) =>
                formik.setFieldValue("active", val === "active")
              }
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 🔘 Footer */}
          <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                formik.resetForm();
              }}
              className="hover:bg-gray-700 text-gray-400 border-gray-600"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700"
              disabled={loading}
            >
              {loading ? "Đang tạo..." : "Tạo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

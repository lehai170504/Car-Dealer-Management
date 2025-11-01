"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { VehicleModel } from "@/types/vehicleModels";
import { useVehicleModels } from "@/hooks/useVehicleModels";
import { UpdateVehicleModelRequest } from "@/types/vehicleModels";
import { vehicleModelSchema } from "@/validations/vehicleModelSchema";

interface VehicleModelDetailModalProps {
  model: VehicleModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
}

export function VehicleModelDetailModal({
  model,
  open,
  onOpenChange,
  onUpdated,
}: VehicleModelDetailModalProps) {
  const { handleUpdate, loading } = useVehicleModels();

  const formik = useFormik<UpdateVehicleModelRequest>({
    initialValues: {
      name: "",
      brand: "",
      segment: "",
      description: "",
      active: true,
    },
    validationSchema: vehicleModelSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!model) return;
      await handleUpdate(model._id, values);
      onUpdated?.();
      onOpenChange(false); // đóng modal sau khi lưu
    },
  });

  /** 🔁 Đồng bộ khi mở modal */
  useEffect(() => {
    if (model) {
      formik.setValues({
        name: model.name,
        brand: model.brand,
        segment: model.segment,
        description: model.description || "",
        active: model.active,
      });
    }
  }, [model]);

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500";
  const labelClass = "block text-gray-300 font-medium mb-1";
  const errorClass = "text-red-400 text-sm mt-1";

  if (!model) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chỉnh sửa Vehicle Model
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          {/* 🧩 Name */}
          <div>
            <label className={labelClass}>Tên Model</label>
            <Input {...formik.getFieldProps("name")} className={inputClass} />
            {formik.touched.name && formik.errors.name && (
              <p className={errorClass}>{formik.errors.name}</p>
            )}
          </div>

          {/* 🏷 Brand */}
          <div>
            <label className={labelClass}>Thương hiệu</label>
            <Input {...formik.getFieldProps("brand")} className={inputClass} />
            {formik.touched.brand && formik.errors.brand && (
              <p className={errorClass}>{formik.errors.brand}</p>
            )}
          </div>

          {/* 📊 Segment */}
          <div>
            <label className={labelClass}>Phân khúc</label>
            <Input
              {...formik.getFieldProps("segment")}
              className={inputClass}
            />
            {formik.touched.segment && formik.errors.segment && (
              <p className={errorClass}>{formik.errors.segment}</p>
            )}
          </div>

          {/* 📝 Description */}
          <div>
            <label className={labelClass}>Mô tả</label>
            <Textarea
              {...formik.getFieldProps("description")}
              placeholder="Nhập mô tả (tùy chọn)"
              className={inputClass}
            />
            {formik.touched.description && formik.errors.description && (
              <p className={errorClass}>{formik.errors.description}</p>
            )}
          </div>

          {/* 🟢 Active */}
          <div>
            <label className={labelClass}>Trạng thái</label>
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
              onClick={() => onOpenChange(false)}
              className="hover:bg-gray-700 text-gray-500 border-gray-600"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading || !formik.dirty}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

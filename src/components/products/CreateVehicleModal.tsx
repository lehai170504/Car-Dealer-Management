"use client";

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
import { X } from "lucide-react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { useVehicles } from "@/hooks/useVehicles";
import type { CreateVehicleRequest } from "@/types/vehicles";
import { vehicleSchema } from "@/validations/vehicleSchema";

interface CreateVehicleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateVehicleModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateVehicleModalProps) {
  const { handleCreate } = useVehicles();

  const defaultForm: CreateVehicleRequest = {
    model: "",
    trim: "",
    battery: "",
    range: 0,
    motorPower: 0,
    msrp: 0,
    active: true,
    features: [],
    images: [],
  };

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 py-2 px-3";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-3">
          <DialogTitle className="text-2xl font-bold text-center text-emerald-600">
            Tạo Xe Mới
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={defaultForm}
          validationSchema={vehicleSchema} // sử dụng schema từ file
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              await handleCreate(values);
              resetForm();
              onOpenChange(false);
              onSuccess?.();
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4 mt-5">
              {/* Basic fields */}
              {["model", "trim", "battery"].map((field) => (
                <div key={field} className="space-y-1">
                  <Input
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={(values as any)[field]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

              {/* Number fields */}
              {[
                { name: "range", placeholder: "Range (km)" },
                { name: "motorPower", placeholder: "Motor Power (hp)" },
                { name: "msrp", placeholder: "MSRP ($)" },
              ].map(({ name, placeholder }) => (
                <div key={name} className="space-y-1">
                  <Input
                    type="number"
                    placeholder={placeholder}
                    name={name}
                    value={(values as any)[name]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

              {/* Active */}
              <div className="space-y-1">
                <label className="text-sm text-gray-300 font-medium">
                  Trạng thái
                </label>
                <Select
                  value={values.active ? "active" : "inactive"}
                  onValueChange={(val) =>
                    setFieldValue("active", val === "active")
                  }
                >
                  <SelectTrigger className={`${inputClass} mt-1`}>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-gray-100">
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="active"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">
                  Features
                </label>
                <FieldArray name="features">
                  {({ push, remove }) => (
                    <>
                      {values.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Field
                            name={`features.${idx}`}
                            as={Input}
                            value={f}
                            onChange={handleChange}
                            className={inputClass + " flex-1"}
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(idx)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <ErrorMessage
                            name={`features.${idx}`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => push("")}
                        className="mt-1 w-full py-2 bg-gray-700 hover:bg-gray-600"
                      >
                        + Thêm Feature
                      </Button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">
                  Images (URLs)
                </label>
                <FieldArray name="images">
                  {({ push, remove }) => (
                    <>
                      {values.images.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Field
                            name={`images.${idx}`}
                            as={Input}
                            value={img}
                            onChange={handleChange}
                            className={inputClass + " flex-1"}
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(idx)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <ErrorMessage
                            name={`images.${idx}`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => push("")}
                        className="mt-1 w-full py-2 bg-gray-700 hover:bg-gray-600"
                      >
                        + Thêm Hình Ảnh
                      </Button>
                    </>
                  )}
                </FieldArray>
              </div>

              <DialogFooter className="mt-6 flex justify-end gap-3 border-t border-gray-700 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="hover:bg-gray-700 text-neutral-500 w-32"
                >
                  Hủy
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-36"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang tạo..." : "Tạo xe mới"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

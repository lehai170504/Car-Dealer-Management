"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateDealer } from "@/hooks/useCreateDealer";
import { DealerContact, DealerStatus } from "@/types/dealer";
import { FormattedNumberInput } from "../commons/FormattedNumberInput";

interface CreateDealerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // callback reload list
}

export function CreateDealerModal({
  open,
  onClose,
  onSuccess,
}: CreateDealerModalProps) {
  const {
    dealerForm,
    setDealerField,
    setContactField,
    isCreateLoading,
    handleCreateSubmit,
    resetDealerForm,
  } = useCreateDealer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleCreateSubmit(onClose, onSuccess);
    if (success) resetDealerForm();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sky-400">
            Thêm Đại lý Mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên đại lý */}
          <div>
            <Label className="text-gray-300">Tên Đại lý</Label>
            <Input
              value={dealerForm.name}
              onChange={(e) => setDealerField("name", e.target.value)}
              placeholder="Nhập tên đại lý..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Mã đại lý */}
          <div>
            <Label className="text-gray-300">Mã Đại lý</Label>
            <Input
              value={dealerForm.code}
              onChange={(e) => setDealerField("code", e.target.value)}
              placeholder="Nhập mã đại lý..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Khu vực / Địa chỉ */}
          <div>
            <Label className="text-gray-300">Khu vực / Địa chỉ</Label>
            <Input
              value={dealerForm.region}
              onChange={(e) => setDealerField("region", e.target.value)}
              placeholder="Nhập khu vực..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              required
            />
            <Input
              value={dealerForm.address}
              onChange={(e) => setDealerField("address", e.target.value)}
              placeholder="Nhập địa chỉ chi tiết..."
              className="mt-2 bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Liên hệ */}
          <div>
            <Label className="text-gray-300">Thông tin liên hệ</Label>
            {dealerForm.contacts.map(
              (contact: DealerContact, index: number) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                  <Input
                    placeholder="Tên liên hệ"
                    value={contact.name}
                    onChange={(e) =>
                      setContactField(index, "name", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                    required
                  />
                  <Input
                    placeholder="SĐT"
                    value={contact.phone}
                    onChange={(e) =>
                      setContactField(index, "phone", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                    required
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContactField(index, "email", e.target.value)
                    }
                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
                    required
                  />
                </div>
              )
            )}
          </div>

          {/* Credit Limit & Status */}
          <div className="grid grid-cols-2 gap-4">
            {/* Credit Limit */}
            <FormattedNumberInput
              label="Credit Limit (VNĐ)"
              value={dealerForm.creditLimit}
              onChange={(val) => setDealerField("creditLimit", val)}
              placeholder="VD: 10,000,000"
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              labelClassName="text-gray-300 font-medium"
            />

            {/* Status */}
            <div>
              <Label className="text-gray-300">Trạng thái</Label>
              <select
                value={dealerForm.status}
                onChange={(e) =>
                  setDealerField("status", e.target.value as DealerStatus)
                }
                className="bg-gray-700 border-gray-600 text-gray-100 px-2 py-2 rounded w-full"
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Ngưng hoạt động</option>
              </select>
            </div>
          </div>

          {/* Hành động */}
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetDealerForm();
                onClose();
              }}
              className="border-gray-500 text-gray-600 hover:bg-gray-700/60"
            >
              Hủy
            </Button>

            <Button
              type="submit"
              disabled={isCreateLoading}
              className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-emerald-500/30"
            >
              {isCreateLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm Đại lý"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

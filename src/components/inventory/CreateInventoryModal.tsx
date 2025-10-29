"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCreateInventory } from "@/hooks/useCreateInventory";

interface CreateInventoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateInventoryModal({
  open,
  onClose,
  onSuccess,
}: CreateInventoryModalProps) {
  const {
    ownerType,
    setOwnerType,
    ownerId,
    setOwnerId,
    variantId,
    setVariantId,
    colorId,
    setColorId,
    quantity,
    setQuantity,
    reserved,
    setReserved,
    vinListInput,
    setVinListInput,
    location,
    setLocation,
    loading,
    handleSubmit,
    resetForm,
  } = useCreateInventory();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFormSubmit = () => {
    handleSubmit(onSuccess, handleClose);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl bg-gray-800 text-sky-50 border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-xl text-sky-500">
            Thêm Bản ghi Tồn kho Mới
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerType" className="text-right">
              Chủ sở hữu
            </Label>
            <Select
              value={ownerType}
              onValueChange={(value: "Dealer" | "Warehouse") =>
                setOwnerType(value)
              }
            >
              <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Chọn loại chủ sở hữu" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-50">
                <SelectItem value="Dealer">Dealer (Đại lý)</SelectItem>
                <SelectItem value="Warehouse">Warehouse (Kho)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerId" className="text-right">
              ID Chủ sở hữu
            </Label>
            <Input
              id="ownerId"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600"
              placeholder="e.g., 68f90ebebeaef72ecf6e004d"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="variantId" className="text-right">
              ID Biến thể
            </Label>
            <Input
              id="variantId"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600"
              placeholder="e.g., 68f90ebebeaef72ecf6e0066"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="colorId" className="text-right">
              ID Màu
            </Label>
            <Input
              id="colorId"
              value={colorId}
              onChange={(e) => setColorId(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600"
              placeholder="e.g., 68f90ebebeaef72ecf6e0063"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Số lượng
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity.toString()}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="col-span-1 bg-gray-700 border-gray-600"
            />
            <Label htmlFor="reserved" className="text-right">
              Dự trữ
            </Label>
            <Input
              id="reserved"
              type="number"
              value={reserved.toString()}
              onChange={(e) => setReserved(parseInt(e.target.value) || 0)}
              className="col-span-1 bg-gray-700 border-gray-600"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Vị trí
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600"
              placeholder="Kho A, Đà Nẵng"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="vinList" className="text-right mt-2">
              Danh sách VIN (cách nhau bởi dấu phẩy)
            </Label>
            <Textarea
              id="vinList"
              value={vinListInput}
              onChange={(e) => setVinListInput(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600 min-h-[80px]"
              placeholder="VIN001234567890, VIN001234567891, ..."
            />
          </div>
        </div>
        <DialogFooter className="border-t border-gray-700 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="border-gray-600 text-gray-600 hover:bg-gray-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleFormSubmit}
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Lưu Bản ghi"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

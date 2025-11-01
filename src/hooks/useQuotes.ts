"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Quote } from "@/types/quotes";
import { Customer } from "@/types/customer";
import { Dealer } from "@/types/dealer";
import { Vehicle } from "@/types/vehicles";
import { VehicleColor } from "@/types/vehicleColors";

import { quotesService } from "@/services/quotes/quotesService";
import { customerService } from "@/services/customers/customerService";
import { dealerService } from "@/services/dealers/dealerService";
import { vehicleService } from "@/services/vehicles/vehicleService";
import { vehicleColorService } from "@/services/vehicleColors/vehicleColorService";

import Swal from "sweetalert2";

interface UseQuotesResult {
  quotes: (Quote & {
    customerInfo?: Customer | null;
    dealerInfo?: Dealer | null;
    vehicleInfoList?: Vehicle[]; // 🔹 Danh sách xe trong quote
    colorInfoList?: VehicleColor[]; // 🔹 Danh sách màu trong quote
  })[];
  filteredQuotes: (Quote & {
    customerInfo?: Customer | null;
    dealerInfo?: Dealer | null;
    vehicleInfoList?: Vehicle[];
    colorInfoList?: VehicleColor[];
  })[];
  selectedQuote: Quote | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchQuotes: (page?: number) => Promise<void>;
  fetchQuoteById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách Quotes + thông tin khách hàng, đại lý, xe, màu */
export const useQuotes = (): UseQuotesResult => {
  const [quotes, setQuotes] = useState<
    (Quote & {
      customerInfo?: Customer | null;
      dealerInfo?: Dealer | null;
      vehicleInfoList?: Vehicle[];
      colorInfoList?: VehicleColor[];
    })[]
  >([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Caches
  const [customerCache, setCustomerCache] = useState<Record<string, Customer>>(
    {}
  );
  const [dealerCache, setDealerCache] = useState<Record<string, Dealer>>({});
  const [vehicleCache, setVehicleCache] = useState<Record<string, Vehicle>>({});
  const [colorCache, setColorCache] = useState<Record<string, VehicleColor>>(
    {}
  );

  /** 🟦 Lấy thông tin khách hàng kèm cache */
  const fetchCustomerInfo = useCallback(
    async (customerId: string): Promise<Customer | null> => {
      if (!customerId) return null;
      if (customerCache[customerId]) return customerCache[customerId];

      try {
        const customer = await customerService.getCustomerById(customerId);
        setCustomerCache((prev) => ({ ...prev, [customerId]: customer }));
        return customer;
      } catch (err) {
        console.error(`❌ Lỗi khi lấy khách hàng ID ${customerId}:`, err);
        return null;
      }
    },
    [customerCache]
  );

  /** 🟩 Lấy thông tin đại lý kèm cache */
  const fetchDealerInfo = useCallback(
    async (dealerId: string): Promise<Dealer | null> => {
      if (!dealerId) return null;
      if (dealerCache[dealerId]) return dealerCache[dealerId];

      try {
        const dealer = await dealerService.getDealerById(dealerId);
        setDealerCache((prev) => ({ ...prev, [dealerId]: dealer }));
        return dealer;
      } catch (err) {
        console.error(`❌ Lỗi khi lấy đại lý ID ${dealerId}:`, err);
        return null;
      }
    },
    [dealerCache]
  );

  /** 🚘 Lấy thông tin xe kèm cache */
  const fetchVehicleInfo = useCallback(
    async (vehicleId: string): Promise<Vehicle | null> => {
      if (!vehicleId) return null;
      if (vehicleCache[vehicleId]) return vehicleCache[vehicleId];

      try {
        const vehicle = await vehicleService.getVehicleById(vehicleId);
        setVehicleCache((prev) => ({ ...prev, [vehicleId]: vehicle }));
        return vehicle;
      } catch (err) {
        console.error(`❌ Lỗi khi lấy xe ID ${vehicleId}:`, err);
        return null;
      }
    },
    [vehicleCache]
  );

  /** 🎨 Lấy thông tin màu xe kèm cache */
  const fetchColorInfo = useCallback(
    async (colorId: string): Promise<VehicleColor | null> => {
      if (!colorId) return null;
      if (colorCache[colorId]) return colorCache[colorId];

      try {
        const color = await vehicleColorService.getVehicleColorById(colorId);
        setColorCache((prev) => ({ ...prev, [colorId]: color }));
        return color;
      } catch (err) {
        console.error(`❌ Lỗi khi lấy màu xe ID ${colorId}:`, err);
        return null;
      }
    },
    [colorCache]
  );

  /** 🔵 Lấy danh sách quotes (phân trang) */
  const fetchQuotes = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);
        const res = await quotesService.getAllQuotes({
          page: pageNumber,
          limit,
        });

        const sorted = (res.items || []).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Gắn thông tin khách hàng + đại lý + xe + màu
        const quotesWithInfo = await Promise.all(
          sorted.map(async (quote) => {
            const [customerInfo, dealerInfo] = await Promise.all([
              fetchCustomerInfo(quote.customer),
              fetchDealerInfo(quote.dealer),
            ]);

            // Duyệt qua tất cả các items trong quote để lấy variant và color
            const vehicleInfoList = await Promise.all(
              (quote.items || []).map((item) => fetchVehicleInfo(item.variant))
            );
            const colorInfoList = await Promise.all(
              (quote.items || []).map((item) => fetchColorInfo(item.color))
            );

            return {
              ...quote,
              customerInfo,
              dealerInfo,
              vehicleInfoList: vehicleInfoList.filter(Boolean) as Vehicle[],
              colorInfoList: colorInfoList.filter(Boolean) as VehicleColor[],
            };
          })
        );

        setQuotes(quotesWithInfo);
        setTotal(res.total ?? 0);
        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);
        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách quotes:", err);
        setError(err?.message || "Không thể tải danh sách quotes.");
      } finally {
        setLoading(false);
      }
    },
    [
      page,
      limit,
      fetchCustomerInfo,
      fetchDealerInfo,
      fetchVehicleInfo,
      fetchColorInfo,
    ]
  );

  /** 🟢 Lấy chi tiết quote theo ID */
  const fetchQuoteById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const data = await quotesService.getQuoteById(id);

        const [customerInfo, dealerInfo] = await Promise.all([
          fetchCustomerInfo(data.customer),
          fetchDealerInfo(data.dealer),
        ]);

        const vehicleInfoList = await Promise.all(
          (data.items || []).map((item) => fetchVehicleInfo(item.variant))
        );
        const colorInfoList = await Promise.all(
          (data.items || []).map((item) => fetchColorInfo(item.color))
        );

        setSelectedQuote({
          ...data,
          customerInfo,
          dealerInfo,
          vehicleInfoList: vehicleInfoList.filter(Boolean) as Vehicle[],
          colorInfoList: colorInfoList.filter(Boolean) as VehicleColor[],
        } as Quote);
        setError(null);
      } catch (err: any) {
        console.error(`❌ Lỗi khi lấy quote ID ${id}:`, err);
        setError(err?.message || "Không thể tải thông tin quote.");
      } finally {
        setLoading(false);
      }
    },
    [fetchCustomerInfo, fetchDealerInfo, fetchVehicleInfo, fetchColorInfo]
  );

  /** 🔴 Xóa quote */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa quote?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#dc2626",
      });

      if (!confirm.isConfirmed) return;

      try {
        setLoading(true);
        await quotesService.deleteQuote(id);
        Swal.fire("Đã xóa!", "Quote đã bị xóa thành công.", "success");
        await fetchQuotes(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa quote:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa quote", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchQuotes, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredQuotes = useMemo(() => {
    if (!search) return quotes;
    const lower = search.toLowerCase();
    return quotes.filter(
      (q) =>
        q.status?.toLowerCase().includes(lower) ||
        q.customerInfo?.fullName?.toLowerCase().includes(lower) ||
        q.customerInfo?.phone?.toLowerCase().includes(lower) ||
        q.dealerInfo?.name?.toLowerCase().includes(lower) ||
        q.vehicleInfoList?.some((v) => v.trim.toLowerCase().includes(lower)) ||
        q.colorInfoList?.some((c) => c.name?.toLowerCase().includes(lower))
    );
  }, [quotes, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchQuotes(page);
  }, [fetchQuotes, page]);

  return {
    quotes,
    filteredQuotes,
    selectedQuote,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchQuotes,
    fetchQuoteById,
    handleDelete,
  };
};

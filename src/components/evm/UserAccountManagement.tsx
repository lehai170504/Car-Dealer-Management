// src/components/evm/UserAccountManagement.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Unlock, Lock } from "lucide-react";

// Dữ liệu mẫu
const accounts = [
  { id: 1, name: 'Phạm Tuấn Anh', role: 'Dealer Manager', dealer: 'DL001', status: 'Active', lastLogin: '2025-10-05' },
  { id: 2, name: 'Nguyễn Thị Hoa', role: 'Dealer Staff', dealer: 'DL002', status: 'Active', lastLogin: '2025-10-06' },
  { id: 3, name: 'Lê Văn Khải', role: 'Dealer Staff', dealer: 'DL001', status: 'Inactive', lastLogin: '2025-08-20' },
  { id: 4, name: 'Trần Minh Hùng', role: 'EVM Staff', dealer: 'N/A', status: 'Active', lastLogin: '2025-10-07' },
];

export function EVM_UserAccountManagement() {
  const isAdminOrEVM = (role: string) => role.includes('EVM');

  return (
    <div className="space-y-4">
        <Button onClick={() => console.log("Tạo tài khoản mới")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Tạo Tài khoản mới
        </Button>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên Người dùng</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Đại lý</TableHead>
              <TableHead>Đăng nhập gần nhất</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className={!isAdminOrEVM(account.role) ? 'bg-blue-50/50' : ''}>
                <TableCell>{account.id}</TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>
                  <Badge variant={isAdminOrEVM(account.role) ? 'default' : 'outline'}>
                    {account.role}
                  </Badge>
                </TableCell>
                <TableCell>{account.dealer || 'EVM HQ'}</TableCell>
                <TableCell>{account.lastLogin}</TableCell>
                <TableCell>
                  <Badge variant={account.status === 'Active' ? 'success' as any : 'secondary'}>
                    {account.status === 'Active' ? 'Hoạt động' : 'Khóa'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {account.status === 'Active' ? (
                    <Button variant="destructive" size="sm" onClick={() => console.log('Khóa tài khoản', account.id)}>
                      <Lock className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => console.log('Mở khóa tài khoản', account.id)}>
                      <Unlock className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
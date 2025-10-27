// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login"); // đổi /login thành page bạn muốn
}

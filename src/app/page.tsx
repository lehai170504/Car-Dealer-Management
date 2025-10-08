// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // đổi /login thành page bạn muốn
}

import NavBar from "@/components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="m-auto max-w-7xl p-4">{children}</main>
    </>
  );
}

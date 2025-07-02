import Link from "next/link";

export default function NavBar() {
  return (
    <nav style={{
      background: "#18181b",
      padding: "1rem 2rem",
      color: "#fff",
      display: "flex",
      gap: "2rem",
      alignItems: "center"
    }}>
      <span style={{
        fontWeight: "bold",
        fontSize: "1.2rem",
        letterSpacing: "2px"
      }}>
        NuVizion
      </span>
      <Link href="/login" style={{ color: "#fff" }}>Login</Link>
      <Link href="/register" style={{ color: "#fff" }}>Register</Link>
      <Link href="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
      <Link href="/marketplace" style={{ color: "#fff" }}>Marketplace</Link>
      <Link href="/payouts" style={{ color: "#fff" }}>Payouts</Link>
    </nav>
  );
}

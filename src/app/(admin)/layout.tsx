import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAKVIH Originals | Executive Portal",
  description: "Executive Atelier Console & Administration",
};

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

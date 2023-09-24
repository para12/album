export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-bgColorIn">{children}</div>;
}

// import { AuthContextProvider } from "@/app/context/AuthContext";
import Content from "./content";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    // <AuthContextProvider>
    <div className="container mx-auto">
      <Content docId={params.slug} />
    </div>
    // </AuthContextProvider>
  );
}

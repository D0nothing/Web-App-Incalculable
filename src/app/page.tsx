import { HomeClient } from "@/components/HomeClient";
import { loadPublicParcheminDocs } from "@/lib/publicDocs";

export default async function HomePage() {
  const docs = await loadPublicParcheminDocs();

  return <HomeClient manifesto={docs.manifesto} protocol={docs.protocol} />;
}

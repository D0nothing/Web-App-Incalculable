import { DocumentPage } from "@/components/DocumentPage";
import { loadPublicParcheminDocs } from "@/lib/publicDocs";

export default async function ProtocolePage() {
  const { protocol } = await loadPublicParcheminDocs();
  return <DocumentPage active="protocole" index="04" label="Protocole" description="La méthode opératoire du Parchemin, présentée section par section." document={protocol} />;
}

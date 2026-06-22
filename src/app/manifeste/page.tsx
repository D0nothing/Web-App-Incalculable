import { DocumentPage } from "@/components/DocumentPage";
import { loadPublicParcheminDocs } from "@/lib/publicDocs";

export default async function ManifestePage() {
  const { manifesto } = await loadPublicParcheminDocs();
  return <DocumentPage active="manifeste" index="03" label="Manifeste" description="La position fondatrice d’Incalculable, proposée en lecture intégrale." document={manifesto} />;
}

import { EditorialPage } from "@/components/EditorialPage";

export default function ParcheminPage() {
  return (
    <EditorialPage active="parchemin" index="05" eyebrow="Le Parchemin" title="Un cadre opératoire, séparé du code." lead="Le Parchemin rassemble les instructions système qui donnent au projet sa continuité et sa manière de répondre.">
      <section><h2>Ce qui est public</h2><p>Le manifeste expose la position générale. Le protocole décrit les catégories, les modes et les tests qui gouvernent la réponse.</p></section>
      <section><h2>Ce qui reste administré</h2><p>La version active des instructions est chargée côté serveur. Elle peut être modifiée depuis l’administration sans devenir un formulaire public.</p></section>
      <blockquote>Visible dans ses principes. Protégé dans son fonctionnement.</blockquote>
    </EditorialPage>
  );
}

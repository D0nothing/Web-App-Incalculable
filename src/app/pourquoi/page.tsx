import { EditorialPage } from "@/components/EditorialPage";

export default function PourquoiPage() {
  return (
    <EditorialPage active="pourquoi" index="02" eyebrow="Pourquoi" title="Parce qu’une réponse n’est jamais neutre." lead="Un assistant utile ne devrait pas seulement répondre vite. Il devrait permettre de comprendre la direction qu’il prend.">
      <section><h2>Garder la main</h2><p>L’utilisateur doit pouvoir préciser son intention, demander une réponse plus directe ou exiger une vérification sans apprendre une mécanique complexe.</p></section>
      <section><h2>Rendre le cadre lisible</h2><p>Le manifeste et le protocole exposent publiquement la position du projet. Le fonctionnement n’est pas réduit à une boîte noire.</p></section>
      <blockquote>Orienter l’outil, plutôt que se laisser orienter par lui.</blockquote>
    </EditorialPage>
  );
}

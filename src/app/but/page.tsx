import { EditorialPage } from "@/components/EditorialPage";

export default function ButPage() {
  return (
    <EditorialPage active="but" index="01" eyebrow="Le but & pourquoi" title="Rendre l’intelligence artificielle orientable." lead="Incalculable crée un espace où l’on peut utiliser l’IA sans lui abandonner la direction, parce qu’une réponse n’est jamais neutre.">
      <section><h2>Une interface claire</h2><p>Le système donne accès à la puissance du modèle tout en conservant une expérience lisible, calme et cohérente sur ordinateur comme sur mobile.</p></section>
      <section><h2>Garder la main</h2><p>L’utilisateur doit pouvoir préciser son intention et comprendre la direction prise, sans apprendre une mécanique complexe.</p></section>
      <section><h2>Un cadre lisible</h2><p>Le Parchemin porte les instructions qui cadrent les réponses. Il peut évoluer sans disperser sa logique dans le code de l’application.</p></section>
      <blockquote>Orienter l’outil, plutôt que se laisser orienter par lui.</blockquote>
    </EditorialPage>
  );
}

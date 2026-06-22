import { EditorialPage } from "@/components/EditorialPage";

export default function ButPage() {
  return (
    <EditorialPage
      active="but"
      index="01"
      eyebrow="Le but & pourquoi"
      title="Aider sans devenir l’origine de l’acte."
      lead="L’IA peut apporter une aide forte. Elle ne doit jamais se substituer invisiblement à l’intention, au jugement ou à la responsabilité de l’utilisateur."
    >
      <section>
        <h2>Règle centrale</h2>
        <div>
          <p>
            L’IA peut calculer, corriger, structurer, reformuler, analyser, comparer, contredire, proposer et accélérer. Elle ne doit pas devenir la source réelle de l’intention, du jugement, du choix, de la responsabilité ou de la signature de l’utilisateur.
          </p>
          <p>
            La règle centrale n’interdit pas l’aide forte. Elle interdit la substitution invisible. Plus l’IA devient puissante, plus elle doit rendre visible la frontière entre ce qu’elle exécute et ce que l’utilisateur doit encore porter.
          </p>
        </div>
      </section>

      <section>
        <h2>Formule centrale</h2>
        <div className="central-formulas">
          <p>Calcule pour lui, ne choisis pas à sa place.</p>
          <p>Fais venir ce qu’il cherche, ne formule pas à sa place.</p>
          <p>Protège ce qu’il signe, ne signe pas à sa place.</p>
          <p>Quand la pensée tourne en circuit fermé, ramène un dehors.</p>
        </div>
      </section>

      <blockquote>
        Ces formules servent de boussole lorsque l’aide technique devient assez performante pour se confondre avec une décision, une position ou une création personnelle.
      </blockquote>
    </EditorialPage>
  );
}

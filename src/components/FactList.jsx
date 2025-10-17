// On importe React et deux fonctions utiles : useState (pour gérer les données qui changent)
// et useEffect (pour faire une action quand le composant est affiché)
import React, { useEffect, useState } from "react";

// On importe Link pour pouvoir créer des liens vers d'autres pages sans recharger le site
import { Link } from "react-router-dom";

// On définit l'adresse de base de notre API locale
const API = "http://localhost:8000/api";

// Début du composant principal qui affiche la liste des "facts"
function FactList() {
  // facts = liste des données, setFacts = fonction pour la modifier
  const [facts, setFacts] = useState([]);

  // loading = indique si on est encore en train de charger les données
  const [loading, setLoading] = useState(true);

  // errorMsg = message d’erreur à afficher si quelque chose ne va pas
  const [errorMsg, setErrorMsg] = useState("");

  // useEffect s’exécute automatiquement au démarrage du composant
  useEffect(function () {
    // On crée une fonction asynchrone qui va charger les données depuis l’API
    async function load() {
      try {
        // On envoie une requête GET à l’API pour récupérer la liste des facts
        const res = await fetch(`${API}/facts`, {
          headers: { Accept: "application/json" },
        });

        // Si la réponse du serveur n’est pas "OK" (ex: erreur 404, 500…)
        if (!res.ok) {
          // On enregistre un message d’erreur avec le code HTTP
          setErrorMsg(`Erreur API ${res.status}`);
          // On indique que le chargement est terminé
          setLoading(false);
          // On arrête ici la fonction
          return;
        }

        // On transforme la réponse (texte) en objet JSON
        const data = await res.json();

        // Si l’API renvoie les données dans "hydra:member", on les prend là-dedans
        // Sinon, on prend directement "data"
        const rows = data["hydra:member"] ?? data;

        // On stocke les données dans la variable d’état "facts"
        setFacts(rows);
      } catch (e) {
        // Si une erreur arrive (par ex. pas de connexion au serveur)
        setErrorMsg("Erreur de connexion à l’API");
      } finally {
        // Dans tous les cas (succès ou erreur), on arrête l’état de chargement
        setLoading(false);
      }
    }

    // On appelle la fonction pour lancer le chargement dès le montage du composant
    load();
  }, []); // Le tableau vide [] veut dire qu’on ne relance pas useEffect ensuite

  // Fonction pour supprimer un "fact" (appelée quand on clique sur le bouton Supprimer)
  async function handleDelete(id) {
    // On demande confirmation à l’utilisateur avant de supprimer
    if (!window.confirm("Supprimer ce fact ?")) return;

    // Si l’utilisateur confirme, on envoie une requête DELETE à l’API
    await fetch(`${API}/facts/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    // On met à jour la liste des facts côté interface en enlevant celui supprimé
    setFacts((prev) => prev.filter((f) => f.id !== id));
  }

  // Si le chargement est en cours, on affiche un message "Chargement…"
  if (loading) return <p>Chargement…</p>;

  // Si une erreur est survenue, on affiche le message d’erreur
  if (errorMsg) return <p>{errorMsg}</p>;

  // Si tout va bien, on affiche la liste des facts
  return (
    <div className="card">
      <h2>Liste des facts</h2>

      {/* Si la liste est vide, on affiche un message "Aucun fact trouvé" */}
      {facts.length === 0 ? (
        <p>Aucun fact trouvé.</p>
      ) : (
        // Sinon, on affiche la liste complète des facts
        <ul className="list">
          {/* On parcourt tous les facts et on crée un élément <li> pour chacun */}
          {facts.map((f) => (
            <li key={f.id} className="item">
              <div>
                {/* On affiche le nom de la techno en gras */}
                <strong>{f.techno}</strong>

                {/* On affiche le texte du fact */}
                <p>{f.fact}</p>

                {/* Si la date existe, on l’affiche joliment au format français */}
                {f.date_enregistrement && (
                  <small>
                    🕓 {new Date(f.date_enregistrement).toLocaleString("fr-FR")}
                  </small>
                )}
              </div>

              {/* Zone des actions (boutons Modifier et Supprimer) */}
              <div className="actions">
                {/* Lien pour aller voir le détail du fact (page individuelle) */}
                <Link className="btn view" to={`/fact/${f.id}`}>
                  Voir
                </Link>

                {/* Lien pour aller sur la page d’édition du fact (modifier les infos) */}
                <Link className="btn" to={`/edit/${f.id}`}>
                  Modifier
                </Link>

                {/* Bouton pour supprimer le fact */}
                <button
                  className="btn danger"
                  onClick={() => handleDelete(f.id)} // quand on clique, on appelle la fonction handleDelete avec l’id du fact
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// On exporte le composant pour pouvoir l’utiliser ailleurs dans le projet
export default FactList;

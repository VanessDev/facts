// On importe React et deux fonctions : useEffect (pour exécuter du code au chargement)
// et useState (pour gérer des données qui changent)
import React, { useEffect, useState } from "react";

// On importe useParams pour lire l’ID dans l’URL,
// et Link pour créer un lien de retour vers la liste
import { useParams, Link } from "react-router-dom";

// On définit l’adresse de base de l’API (ici, un serveur local nommé veilleapi.test)
const API = "http://veilleapi.test/api";

// Début du composant qui affiche les détails d’un "fact"
function FactDetail() {
  // On récupère l’ID du fact depuis l’URL (exemple : /facts/3 → id = 3)
  const { id } = useParams();

  // Variable pour stocker le fact qu’on va récupérer depuis l’API
  const [fact, setFact] = useState(null);

  // Variable pour savoir si les données sont encore en train de se charger
  const [loading, setLoading] = useState(true);

  // Variable pour afficher un message d’erreur en cas de problème
  const [errorMsg, setErrorMsg] = useState("");

  // useEffect s’exécute automatiquement au chargement du composant
  useEffect(() => {
    // Fonction asynchrone pour aller chercher les données depuis l’API
    async function load() {
      try {
        // On envoie une requête GET à l’API pour récupérer le fact avec cet ID
        const res = await fetch(`${API}/facts/${id}`, {
          headers: { Accept: "application/json" },
        });

        // Si la réponse du serveur n’est pas "OK" (par exemple 404 ou 500)
        if (!res.ok) {
          // On enregistre le code d’erreur (ex: "Erreur API 404")
          setErrorMsg(`Erreur API ${res.status}`);
          // On arrête le chargement
          setLoading(false);
          // On quitte la fonction ici
          return;
        }

        // Si tout va bien, on transforme la réponse en JSON (objet utilisable)
        const data = await res.json();

        // On enregistre le fact récupéré dans notre variable d’état
        setFact(data);
      } catch (e) {
        // Si quelque chose plante (ex: serveur non accessible)
        setErrorMsg("Erreur de connexion à l’API");
      } finally {
        // Dans tous les cas (succès ou erreur), on arrête le chargement
        setLoading(false);
      }
    }

    // On appelle la fonction pour lancer le chargement des données
    load();
  }, [id]); // On relance ce code si l’ID change dans l’URL

  // Si on est encore en train de charger, on affiche un message
  if (loading) return <p>Chargement…</p>;

  // Si une erreur est survenue, on affiche le message d’erreur
  if (errorMsg) return <p>{errorMsg}</p>;

  // Si aucun fact n’a été trouvé, on affiche un message spécial
  if (!fact) return <p>Aucun fact trouvé.</p>;

  // Si tout va bien, on affiche les détails du fact
  return (
    <div className="card">
      <h2>Détail du fact</h2>

      {/* On affiche la technologie du fact */}
      <p>
        <strong>Technologie :</strong> {fact.techno}
      </p>

      {/* On affiche le texte du fact */}
      <p>
        <strong>Fact :</strong> {fact.fact}
      </p>

      {/* Si une date existe, on l’affiche au format français */}
      {fact.date_enregistrement && (
        <p>
          <strong>Date :</strong>{" "}
          {new Date(fact.date_enregistrement).toLocaleString("fr-FR")}
        </p>
      )}

      {/* Lien pour revenir à la page principale (liste des facts) */}
      <Link to="/" className="btn">
        ⬅ Retour à la liste
      </Link>
    </div>
  );
}

// On exporte le composant pour pouvoir l’utiliser ailleurs
export default FactDetail;

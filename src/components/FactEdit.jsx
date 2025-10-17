// On importe React et deux fonctions utiles de React : useEffect et useState
import React, { useEffect, useState } from "react";

// On importe useParams pour récupérer l’ID dans l’URL,
// et useNavigate pour pouvoir rediriger l’utilisateur vers une autre page
import { useParams, useNavigate } from "react-router-dom";

// On définit l’adresse de base de l’API
const API = "http://localhost:8000/api/";

// Début du composant qui sert à modifier un "fact"
function FactEdit() {
  // On récupère l'ID du fact à modifier depuis l’URL (par exemple /edit/5)
  const { id } = useParams();

  // On crée une fonction navigate pour pouvoir renvoyer l’utilisateur vers une autre page
  const navigate = useNavigate();

  // On crée des variables d’état pour les champs du formulaire
  const [techno, setTechno] = useState(""); // nom de la technologie
  const [fact, setFact] = useState("");     // texte du fact
  const [loading, setLoading] = useState(true); // indique si on charge encore les données

  // useEffect s’exécute quand la page s’affiche ou si l’ID change
  useEffect(() => {
    // Fonction asynchrone pour charger les données du fact depuis l’API
    async function load() {
      // On envoie une requête pour récupérer les infos du fact correspondant à l’ID
      const res = await fetch(`${API}/facts/${id}`, {
        headers: { Accept: "application/json" },
      });

      // On transforme la réponse en objet JSON
      const data = await res.json();

      // On remplit les champs du formulaire avec les données reçues
      // Si une donnée n’existe pas, on met une chaîne vide ("")
      setTechno(data.techno || "");
      setFact(data.fact || "");

      // On indique que le chargement est terminé
      setLoading(false);
    }

    // On lance la fonction de chargement
    load();
  }, [id]); // [] signifie que ça s’exécute au chargement du composant
             // [id] veut dire qu’on relance si l’ID change

  // Fonction appelée quand on envoie le formulaire
  async function handleSubmit(e) {
    // Empêche le rechargement automatique de la page quand on clique sur "Enregistrer"
    e.preventDefault();

    // On envoie une requête PUT à l’API pour mettre à jour le fact
    await fetch(`${API}/facts/${id}`, {
      method: "PUT", // méthode HTTP pour modifier une ressource
      headers: {
        "Content-Type": "application/json", // on envoie des données au format JSON
        Accept: "application/json", // on veut une réponse JSON
      },
      // On envoie les nouvelles valeurs du formulaire converties en JSON
      body: JSON.stringify({ techno, fact }),
    });

    // Une fois la mise à jour terminée, on redirige l’utilisateur vers la page d’accueil
    navigate("/");
  }

  // Si les données sont encore en train de se charger, on affiche un message
  if (loading) return <p>Chargement…</p>;

  // Sinon, on affiche le formulaire pour modifier le fact
  return (
    <div className="card">
      <h2>Modifier un fact</h2>

      {/* Formulaire d’édition */}
      <form className="form" onSubmit={handleSubmit}>
        {/* Champ texte pour la technologie */}
        <label>
          Technologie
          <input
            type="text"
            value={techno} // valeur actuelle du champ
            onChange={(e) => setTechno(e.target.value)} // met à jour la variable techno à chaque frappe
            required // rend le champ obligatoire
          />
        </label>

        {/* Champ texte long pour le contenu du fact */}
        <label>
          Fact
          <textarea
            rows={4} // hauteur du champ texte
            value={fact} // valeur actuelle du champ
            onChange={(e) => setFact(e.target.value)} // met à jour la variable fact à chaque frappe
            required // champ obligatoire
          />
        </label>

        {/* Bouton pour soumettre le formulaire */}
        <button className="btn" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

// On exporte le composant pour pouvoir l’utiliser ailleurs
export default FactEdit;

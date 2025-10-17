// On importe React et la fonction useState pour gérer des variables qui changent
import React, { useState } from "react";

// On importe useNavigate pour pouvoir rediriger l’utilisateur vers une autre page
import { useNavigate } from "react-router-dom";

// On définit l’adresse de base de l’API
const API = "http://localhost:8000/api/";

// Début du composant qui permet d’ajouter un nouveau "fact"
function FactForm() {
  // On crée deux variables pour stocker les valeurs du formulaire :
  // techno → nom de la technologie
  // fact → texte du fact
  const [techno, setTechno] = useState("");
  const [fact, setFact] = useState("");

  // On récupère la fonction navigate pour changer de page après l’envoi du formulaire
  const navigate = useNavigate();

  // Fonction appelée quand on envoie le formulaire
  async function handleSubmit(e) {
    // Empêche le rechargement automatique de la page quand on clique sur "Ajouter"
    e.preventDefault();

    // On envoie une requête POST à l’API pour créer un nouveau fact
    await fetch(`${API}facts`, {
      method: "POST", // méthode HTTP pour ajouter une nouvelle ressource
      headers: {
        "Content-Type": "application/ld+json", // indique qu’on envoie du JSON
        Accept: "application/json", // on veut une réponse en JSON
      },
      // Le contenu qu’on envoie : les valeurs saisies dans le formulaire
      body: JSON.stringify({
        techno, // la technologie
        fact,   // le texte du fact
      }),
    });

    // Une fois l’ajout terminé, on redirige vers la page d’accueil ("/")
    navigate("/");
  }

  // On affiche le formulaire d’ajout d’un fact
  return (
    <div className="card">
      <h2>Ajouter un fact</h2>

      {/* Formulaire avec deux champs : techno et fact */}
      <form className="form" onSubmit={handleSubmit}>
        {/* Champ texte pour le nom de la technologie */}
        <label>
          Technologie
          <input
            type="text"
            value={techno} // valeur actuelle du champ
            onChange={(e) => setTechno(e.target.value)} // met à jour la variable techno quand on tape
            required // champ obligatoire
          />
        </label>

        {/* Champ texte long pour le contenu du fact */}
        <label>
          Fact
          <textarea
            rows={4} // hauteur du champ texte
            value={fact} // valeur actuelle du champ
            onChange={(e) => setFact(e.target.value)} // met à jour la variable fact quand on tape
            required // champ obligatoire
          />
        </label>

        {/* Bouton pour envoyer le formulaire */}
        <button className="btn" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}

// On exporte le composant pour pouvoir l’utiliser ailleurs dans le projet
export default FactForm;

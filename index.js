const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/Person');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");

    const personne = new Person({
      name: "Aminata",
      age: 15,
      favoriteFoods: ["Thieboudienne", "Yassa", "Fataya"]
    });

    personne.save()
      .then(data => console.log("🙋‍♀️ Personne enregistrée :", data))
      .catch(err => console.error("❌ Erreur save :", err));

    const arrayOfPeople = [
      { name: "Fatou", age: 30, favoriteFoods: ["Pastels", "Mafé"] },
      { name: "Ibrahima", age: 35, favoriteFoods: ["Pizza", "Poulet"] },
      { name: "Sokhna", age: 22, favoriteFoods: ["Thiéré", "Salade"] },
    ];

    Person.create(arrayOfPeople)
      .then(data => console.log("👥 Plusieurs personnes ajoutées :", data))
      .catch(err => console.error("❌ Erreur ajout multiple :", err));

    Person.find({ name: "Fatou" })
      .then(data => console.log("🔍 Personnes nommées Fatou :", data))
      .catch(err => console.error("❌ Erreur find :", err));


    Person.findOne({ favoriteFoods: "Pizza" })
      .then(data => console.log("🍕 Trouvée avec plat favori :", data))
      .catch(err => console.error("❌ Erreur findOne :", err));

    const personId = '687ee932739b3dfecd48eb47';
    Person.findById(personId)
      .then(data => console.log("🔍 Trouvée par ID :", data))
      .catch(err => console.error("❌ Erreur findById :", err));

    Person.findById(personId)
      .then(person => {
        person.favoriteFoods.push("hamburger");
        return person.save();
      })
      .then(data => console.log("🍔 Ajout hamburger :", data))
      .catch(err => console.error("❌ Erreur push+save :", err));

    Person.findOneAndUpdate({ name: "Ibrahima" }, { age: 20 }, { new: true })
      .then(data => console.log("♻️ Âge mis à jour :", data))
      .catch(err => console.error("❌ Erreur update :", err));

    Person.findByIdAndRemove(personId)
      .then(data => console.log("🗑️ Supprimé par ID :", data))
      .catch(err => console.error("❌ Erreur removeById :", err));

    
    Person.deleteMany({ name: "Mary" })
      .then(result => console.log("🧹 Supprimés Mary :", result))
      .catch(err => console.error("❌ Erreur deleteMany :", err));

    Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec((err, data) => {
        if (err) return console.error("❌ Erreur chaîne :", err);
        console.log("🔗 Résultat chaîne :", data);
      });

  })
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));
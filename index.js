const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const polls = [
    {
        id: 3,
        question: "Question ?",
        answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
        votes: []
    },
    {
        id: 1,
        question: "Question 2 ?",
        answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
        votes: [1, 0, 0, 2, 1, 0, 1, 1]
    },
    {
        id: 2,
        question: "Question 3 ?",
        answers: ["Réponse 1", "Réponse 2", "Réponse 3"],
        votes: [1, 0, 0, 2, 1, 0, 1, 1]
    },
];

// Récupérer la liste des  sondages
app.get('/polls', (req, res) => {
    res.send(polls);
});

// Récupérer un sondage
app.get('/polls/:id', (req, res) => {
    // on extrait le paramètre id et on le transforme en nombre
    const id = parseInt(req.params.id, 10);
    //on cherche le sondage par son id 
    const poll = polls.find(p => p.id === id)
    if (typeof (poll) === 'undefined') {
        //si pas de sondage trouvé on renvoie une erreur 404
        res.sendStatus(404);

    } else {
        //sinon un sondage est trouvé et on le renvoie
        res.send(poll);
    }
});

// Créer un sondage
app.post('/polls', (req, res) => {
    // On vérifie si question est une chaîne de caractères
    // const question = req.body.question;
    // const answers = req.body.answers;
    const { question, answers } = req.body;
    // On vérifie si answers est une liste de chaînes de caractères
    if (!Array.isArray(answers) || answers.some(a => typeof (a) !== 'string')) {
        return res.sendStatus(400);
    }
    // On créer un nouvel identifiant unique, supérieur à tous les autres
    const id = polls.reduce((max, p) => max > p.id ? max : p.id, 0) + 1;


    // on créé un nouvel objet sondage
    const poll = {
        id, question, answers,
        votes: []
    };
    // on ajoute le nouveau sondage à la liste

    polls.push(poll);

    // et on renvoie avec le bon code HTTP
    res.send(201, polls);
});



// Récupérer un sondage
app.get('/', function (req, res) {
    res.send('Hello World !!')
})
// Récupérer un sondage
app.listen(3000, () => {
    console.log("listening on port 3000")
})
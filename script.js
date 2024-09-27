// Questions pour le QCM
const questions = [
    {
        question: "Votre client veut un titre principal pour sa page. Quelle balise allez-vous utiliser ?",
        choices: ["<p>", "<h1>", "<div>"],
        correct: "<h1>",
        code: "<h1>Titre principal du site</h1>"
    },
    {
        question: "Le client veut ajouter une image de son logo. Quelle balise est appropriée ?",
        choices: ["<figure>", "<img>", "<video>"],
        correct: "<img>",
        code: '<img src="logo.png" alt="Logo du site">'
    },
    {
        question: "Le client souhaite un paragraphe d'introduction. Quelle balise utilisez-vous ?",
        choices: ["<span>", "<p>", "<section>"],
        correct: "<p>",
        code: "<p>Bienvenue sur notre site web. Nous offrons les meilleurs services.</p>"
    }
];

// Variables pour suivre l'état du jeu
let currentQuestionIndex = 0;
let generatedHTML = "";

// Afficher la première question au chargement de la page
window.onload = () => {
    displayQuestion();
};

// Fonction pour afficher une question
function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const choicesContainer = document.getElementById("choices-container");

    // Afficher la question actuelle
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

    // Afficher les choix de réponse
    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.innerText = choice;
        choiceButton.onclick = () => checkAnswer(choice);
        choicesContainer.appendChild(choiceButton);
    });
}

// Vérifier la réponse et passer à la question suivante
function checkAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];

    // Vérifier si la réponse est correcte
    if (selectedChoice === currentQuestion.correct) {
        alert("Bonne réponse !");
        generatedHTML += currentQuestion.code + "\n";
    } else {
        alert(`Mauvaise réponse. La bonne réponse était ${currentQuestion.correct}.`);
    }

    // Mettre à jour l'aperçu du site web généré
    updatePreview();

    // Passer à la question suivante ou terminer le jeu
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        alert("Vous avez terminé le jeu ! Regardez le site web généré.");
        document.getElementById("next-button").disabled = true; // Désactiver le bouton
    }
}

// Mettre à jour l'aperçu du site web dans l'iframe
function updatePreview() {
    const previewFrame = document.getElementById("preview-frame");
    const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    const fullHTML = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Site du Client</title>
        </head>
        <body>
            ${generatedHTML}
        </body>
        </html>
    `;
    
    previewDocument.open();
    previewDocument.write(fullHTML);
    previewDocument.close();
}

// Passer à la question suivante
function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    }
}

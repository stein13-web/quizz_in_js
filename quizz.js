const FORM = document.querySelector(".form-quizz");
const RESPONSES = ["c", "c", "c"];
/** Recuperation resultats */
const TITLERESULT = document.querySelector(".resultats h2");
const HELPRESULT = document.querySelector(".aide");
const NOTERESULT = document.querySelector(".note");
const ALLQUESTION = document.querySelectorAll(".question-block");

let userResponses = [];
let checkArray = [];

/** Des que l'utilisateur soumet le formulaire grâce à l'eventListener */
FORM.addEventListener("submit", (e) => {
	e.preventDefault();

	/** On boucle sur le tableau des réponses */
	for (let i = 1; i <= RESPONSES.length; i++) {
		/** Et on push le resultat du user dans le tableau associer
		 * grâce au querySelector qui récupère la valeur de l'input 'checked' dont la question et q{i}
		 * avec i qui part de 1 jusqu'à responses.length
		 * */
		userResponses.push(
			document.querySelector(`input[name="q${i}"]:checked`).value
		);
	}

	/** On appel la fonction checkIsTrue */
	checkIsTrue(userResponses);
	// ici userResponses = [] pour réinitialiser le tableau d'entré
	userResponses = [];
});

/** Fonction checkIsTrue */
function checkIsTrue(array) {
	/** On boucle tant que i < la longueur de notre tableau de reponse */
	for (let i = 0; i < array.length; i++) {
		/** Si ce que l'utilisateur a envoyé === à l'élément dans notre tableau responses */
		if (array[i] === RESPONSES[i]) {
			// on retourne true
			checkArray.push(true);
		} else {
			// sinon false
			checkArray.push(false);
		}
	}

	/**
	 *
	 * Une function displayResult(array)
	 * Une function colorErrors(array)
	 *
	 * */

	/* checkArray est un tableau de boolean = [true, false] */
	displayResult(checkArray);
	colorErrors(checkArray);

	//console.log(checkArray);
	/** On réinitialise le tableau checkArray */
	checkArray = [];
}

function displayResult(array) {
	/** creer une const qui récupère le nombre d'élément qui sont différent de true */

	const nbFalse = array.filter((element) => element === false).length;

	switch (nbFalse) {
		case 0:
			TITLERESULT.innerText = "✅ Bravo t'es un Crack ! ✅";
			HELPRESULT.innerText = "";
			NOTERESULT.innerText = "3/3";
			break;
		case 1:
			TITLERESULT.innerText = "✅ Vous y êtes presque! 😖";
			HELPRESULT.innerText = "Retentez votre chance";
			NOTERESULT.innerText = "2/3";
			break;
		case 2:
			TITLERESULT.innerText = "❌ Allez un petit effort ❌";
			HELPRESULT.innerText = "Retente ta chance, t'as rien à perdre";
			NOTERESULT.innerText = "1/3";
			break;
		case 3:
			TITLERESULT.innerText = "❌ Oulala alors Là , faut rejouer au jeu ! ❌";
			HELPRESULT.innerText = "révise à fond l'histoire du jeux";
			NOTERESULT.innerText = "0/3";
			break;
		default:
			"Oups, cas innatendu";
	}
}

/**
 * Etape 1 = Selectionner toutes nos questions
 * Etape 2 = Faire une boucle
 * Etape 3 = Créer une condition
 * 	Si i === true alors faire [.....]
 *  Sinon faire [.....]
 */

function colorErrors(arrayBool) {
	/** Boucle tant que i < arrayBool */
	for (let i = 0; i < arrayBool.length; i++) {
		/** Si la valeur de l'index i === true ALORS j'indique que je change son background*/
		if (arrayBool[i] === true) {
			// Grace à style.background
			ALLQUESTION[i].style.background = "lightgreen";
		} else {
			/** Sinon je le met en rouge */
			ALLQUESTION[i].style.background = "#C5101E";
			
			/**petit effet de tremblement  */
			setTimeout(() => {
				ALLQUESTION[i].classList.remove("echec");
			}, 500);
		}
	}
}

ALLQUESTION.forEach((question) => {
	question.addEventListener("click", () => {
		question.style.background = "";
	});
});


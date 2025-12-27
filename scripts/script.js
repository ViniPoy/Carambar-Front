const btn = document.querySelector('.joke__btn');
const questionElement = document.querySelector('.joke__card--question');
const answerElement = document.querySelector('.joke__card--answer');
const API_URL = 'https://carambar-back-ttdo.onrender.com/api/blagues/random'

const fetchJoke = async () => {
    try {
        btn.disabled = true;
        btn.textContent = "Atteds un peu...";
        answerElement.classList.add('hidden');
        answerElement.textContent = "";
        questionElement.textContent = "On cherche une blague...";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        console.log("Données reçues : ", data)

        questionElement.textContent = data.question;

        setTimeout(() => {
            answerElement.textContent = data.answer;
            answerElement.classList.remove('hidden');
            btn.disabled = false;
            btn.textContent = 'Voir une blague';
        }, 1500);
    } catch (error) {
        console.error("Erreur lors de la récupération : ", error);
        questionElement.textContent = "Oups ! le Carambar est resté collé à l'emballage !";
        btn.disabled = false;
        btn.textContent = "Réessayer";
    }
};

btn.addEventListener('click', fetchJoke);
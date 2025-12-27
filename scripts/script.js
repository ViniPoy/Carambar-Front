const btn = document.querySelector('.joke__btn');
const questionElement = document.querySelector('.joke__card--question');
const answerElement = document.querySelector('.joke__card--answer');
const API_URL = 'https://carambar-back-ttdo.onrender.com/api/blagues'

const fetchJoke = async () => {
    try {
        btn.disabled = true;
        btn.textContent = "Atteds un peu...";
        answerElement.classList.add('hidden');
        answerElement.textContent = "";
        questionElement.textContent = "On cherche une blague...";

        const response = await fetch(`${API_URL}/random`);

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
        }, 1200);
    } catch (error) {
        console.error("Erreur lors de la récupération : ", error);
        questionElement.textContent = "Oups ! le Carambar est resté collé à l'emballage !";
        btn.disabled = false;
        btn.textContent = "Réessayer";
    }
};

btn.addEventListener('click', fetchJoke);


const form = document.querySelector('.joke__form');
const messagElement = document.querySelector('.joke__message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const questionValue = document.getElementById('question').value;
    const answerValue = document.getElementById('answer').value;

    const submitBtn = document.querySelector('.joke__btn--submit');
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoie en cours...";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                question: questionValue,
                answer: answerValue
            })
        });

        if (response.ok) {
            messagElement.textContent = "Blague ajoutée avec succès !";
            messagElement.className = "joke__message success";
            form.reset();
        } else {
            throw new Error("Erreur lors de l'envoie !");
        }
    } catch (error) {
        messagElement.textContent = "Oups, impossible d'envoyer la blague...";
        messagElement.className = "joke__message error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer au Carambar Lab'"
        setTimeout(() => {
            messagElement.classList.add('hidden');
        }, 3000);
    }
});
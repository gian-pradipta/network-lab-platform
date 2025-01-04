const apiUrl = 'http://localhost:3000/api/questions';
const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('questions-list');
const newQuestionBtn = document.getElementById('new-question-btn');
const submitQuestionBtn = document.getElementById('submit-question');
const cancelQuestionBtn = document.getElementById('cancel-question');

newQuestionBtn.addEventListener('click', () => {
    questionForm.classList.remove('hidden');
});

cancelQuestionBtn.addEventListener('click', () => {
    questionForm.classList.add('hidden');
});

submitQuestionBtn.addEventListener('click', async () => {
    const title = document.getElementById('question-title').value;
    const body = document.getElementById('question-body').value;

    if (!title || !body) {
        alert('Please fill in both fields');
        return;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    });

    const newQuestion = await response.json();
    renderQuestions([newQuestion]);  // Render new question immediately

    document.getElementById('question-title').value = '';
    document.getElementById('question-body').value = '';
    questionForm.classList.add('hidden');
});

async function fetchQuestions() {
    const response = await fetch(apiUrl);
    const questions = await response.json();
    renderQuestions(questions);
}

function renderQuestions(questions) {
    questionList.innerHTML = '';
    questions.forEach((question) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${question.title}</h3>
            <p>${question.body}</p>
        `;
        questionList.appendChild(questionDiv);
    });
}

fetchQuestions();

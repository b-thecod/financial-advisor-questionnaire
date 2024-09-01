let currentQuestion = 1;
const totalQuestions = 6;

function nextQuestion(questionNumber) {
    const currentQuestionElement = document.querySelector(`.question[data-question="${questionNumber}"]`);
    const nextQuestionElement = document.querySelector(`.question[data-question="${questionNumber + 1}"]`);
    
    if (currentQuestionElement && nextQuestionElement) {
        currentQuestionElement.classList.remove('active');
        nextQuestionElement.classList.add('active');
        currentQuestion++;
        updateProgressBar();
    }
}

function previousQuestion(questionNumber) {
    const currentQuestionElement = document.querySelector(`.question[data-question="${questionNumber}"]`);
    const previousQuestionElement = document.querySelector(`.question[data-question="${questionNumber - 1}"]`);
    
    if (currentQuestionElement && previousQuestionElement) {
        currentQuestionElement.classList.remove('active');
        previousQuestionElement.classList.add('active');
        currentQuestion--;
        updateProgressBar();
    }
}

function updateProgressBar() {
    const progress = document.getElementById('progress');
    const percentage = (currentQuestion / totalQuestions) * 100;
    progress.style.width = `${percentage}%`;
}

document.getElementById('questionnaire').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading indicator
    const loadingHTML = `
        <div style="text-align: center;">
            <div class="loader"></div>
            <p>Connecting you with your perfect advisor...</p>
        </div>
    `;
    document.querySelector('.container').innerHTML = loadingHTML;

    // Submit form data to Formspree
    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Show success message with embedded GIF
            const quoteHTML = `
                <div style="text-align: center; padding: 20px; background-color: #f0f8ff; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #00d09c;">Financial Growth in Progress!</h2>
                    <p style="font-size: 18px; font-style: italic;">We're on it like a financial ninja. Connecting you with an advisor in next 24 hours.</p>
                    <p style="font-size: 16px; margin-top: 15px;">So hang tight, future millionaire! Your financial adventure is about to begin!</p>
                    <div style="margin-top: 20px;">
                        <iframe src="https://giphy.com/embed/6P6KvfJGLCUKYLuPJK" width="480" height="480" style="max-width: 100%; border: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        <p style="font-size: 12px; margin-top: 5px;"><a href="https://giphy.com/gifs/KWSGroup-6P6KvfJGLCUKYLuPJK" target="_blank" rel="noopener noreferrer">via GIPHY</a></p>
                    </div>
                </div>
            `;
            document.querySelector('.container').innerHTML = quoteHTML;
        } else {
            throw new Error('Form submission failed');
        }
    }).catch(error => {
        // Show error message
        document.querySelector('.container').innerHTML = `
            <div style="text-align: center; color: red;">
                <p>Oops! Something went wrong. Please try again later.</p>
            </div>
        `;
    });
});

// Initialize progress bar
updateProgressBar();

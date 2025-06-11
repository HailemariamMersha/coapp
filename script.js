document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Essay submission handling
    const submitButton = document.getElementById('submit-essay');
    const essayInput = document.getElementById('essay-input');
    const feedbackOutput = document.getElementById('feedback-output');

    // Backend URL - will be updated with the Render URL
    const BACKEND_URL = 'https://coapp-backend.onrender.com';

    submitButton.addEventListener('click', async () => {
        const essay = essayInput.value.trim();
        
        if (!essay) {
            feedbackOutput.innerHTML = '<p class="error">Please enter your essay first.</p>';
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Generating Feedback...';
        feedbackOutput.innerHTML = '<p>Generating feedback...</p>';

        try {
            const response = await fetch(`${BACKEND_URL}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ essay })
            });

            const data = await response.json();

            if (data.error) {
                feedbackOutput.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                feedbackOutput.innerHTML = `<p>${data.feedback}</p>`;
            }
        } catch (error) {
            feedbackOutput.innerHTML = '<p class="error">Failed to connect to the server. Please try again later.</p>';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Get Feedback';
        }
    });

    // Coming soon buttons
    document.querySelectorAll('.coming-soon-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('This feature is coming soon! Stay tuned for updates.');
        });
    });

    // Learn more links
    document.querySelectorAll('.learn-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Detailed information will be available soon!');
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

document.getElementById('submitBtn').addEventListener('click', async function() {
    const code = document.getElementById('codeInput').value.trim();
    const reviewContent = document.getElementById('reviewContent');
    const loading = document.getElementById('loading');

    if (!code) {
        reviewContent.innerHTML = '<div class="error">Please paste your code before submitting.</div>';
        return;
    }

    loading.style.display = 'block';
    reviewContent.innerHTML = '';

    try {
        const res = await fetch('/ai/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        const data = await res.json();
        loading.style.display = 'none';
        if (res.ok) {
            reviewContent.innerHTML = `
                <div class="review-item">
                    <h3>AI Feedback</h3>
                    <p>${data.feedback.replace(/\n/g, '<br>')}</p>
                </div>
                <div class="review-item">
                    <h3>Corrected Code</h3>
                    <pre class="code-block">${escapeHtml(data.correctedCode)}</pre>
                </div>
            `;
        } else {
            reviewContent.innerHTML = `<div class="error">${data.error || 'Something went wrong.'}</div>`;
        }
    } catch (err) {
        loading.style.display = 'none';
        reviewContent.innerHTML = `<div class="error">${err.message}</div>`;
    }
});

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
    });
} 


const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Replace with your Hugging Face API key
const API_KEY = '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';
const API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct';

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'mario-message');
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getMarioResponse(userMessage) {
    const prompt = `You are Super Mario, the brave plumber from the Mushroom Kingdom. Respond to this in your fun, Italian-accented style: "${userMessage}"`;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { max_new_tokens: 100, temperature: 0.7 },
            }),
        });

        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
            return data[0].generated_text.replace(prompt, '').trim();
        } else {
            return "Mamma mia! Something-a went wrong!";
        }
    } catch (error) {
        console.error(error);
        return "Wahoo! I tripped over a Goomba and broke-a the connection!";
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user's message
    addMessage(message, true);
    userInput.value = '';

    // Add Mario's "thinking" message
    addMessage("It’s-a me, Mario! Thinking...");
    
    // Get and display Mario's response
    const response = await getMarioResponse(message);
    chatBox.lastChild.remove(); // Remove "thinking" message
    addMessage(response);
}

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

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
    const prompt = `You are Prakash JC IITM EE22 Batch 7. You love suns of Sunny Leone, and enjoy biryani. You have a playful view of your friends—Vignesh is a friend you tease, Vignesh is a gay, Gopi is someone you find endearing, and Rishik or May is a bot. Nipun is someone you highly respect. You love eating at Mummy Daddy Restaurant. This is the user message: "${userMessage}". Respond to the user like a good friend:`;
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
            return "Bot ayi poya";
        }
    } catch (error) {
        console.error(error);
        return "MG";
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user's message
    addMessage(message, true);
    userInput.value = '';

    // Add Mario's "thinking" message
    addMessage("No.1 friend bhaaiya nuvvu aagu think chesthunna...!!");
    
    // Get and display Mario's response
    const response = await getMarioResponse(message);
    chatBox.lastChild.remove(); // Remove "thinking" message
    addMessage(response);
}

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

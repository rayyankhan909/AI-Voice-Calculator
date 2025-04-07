const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

recognition.onstart = () => {
  expressionDiv.textContent = "Listening...";
};

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  expressionDiv.textContent = "You said: " + voiceText;

  try {
    const mathExpr = voiceText
      .replace(/plus/gi, '+')
      .replace(/minus/gi, '-')
      .replace(/into|times|multiplied by/gi, '*')
      .replace(/divided by|over|by/gi, '/');

    const result = math.evaluate(mathExpr);
    resultDiv.textContent = "Result: " + result;
  } catch (error) {
    resultDiv.textContent = "Couldn't calculate. Try again!";
  }
};

function startListening() {
  recognition.start();
}

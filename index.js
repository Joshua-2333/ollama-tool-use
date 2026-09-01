import ollama from "ollama";

function calculate(a, b) {
  return a + b;
}

const response = await ollama.chat({
  model: "qwen3",
  messages: [
    {
      role: "user",
      content: "What is function calling in AI?",
    },
  ],
});

console.log(response.message.content);
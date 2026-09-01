import ollama from "ollama";

function calculate(a, b) {
  return a + b;
}

const response = await ollama.chat({
  model: "qwen3",

  messages: [
    {
      role: "user",
      content: "What is 10 + 5?",
    },
  ],

  tools: [
    {
      type: "function",
      function: {
        name: "calculate",
        description: "Add two numbers together.",
        parameters: {
          type: "object",
          properties: {
            a: {
              type: "number",
              description: "The first number.",
            },
            b: {
              type: "number",
              description: "The second number.",
            },
          },
          required: ["a", "b"],
        },
      },
    },
  ],
});

console.log(response);
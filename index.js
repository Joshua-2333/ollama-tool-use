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

const toolCall = response.message.tool_calls[0];

const result = calculate(
  toolCall.function.arguments.a,
  toolCall.function.arguments.b
);

const messages = [
  {
    role: "user",
    content: "What is 10 + 5?",
  },
  response.message,
  {
    role: "tool",
    content: String(result),
  },
];

const finalResponse = await ollama.chat({
  model: "qwen3",
  messages,
});

console.log(finalResponse.message.content);
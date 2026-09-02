import ollama from "ollama";

function calculate(a, b) {
  return a + b;
}

function getTime() {
  return new Date().toLocaleTimeString();
}

function executeTool(toolName, arguments_) {
  if (toolName === "calculate") {
    return calculate(arguments_.a, arguments_.b);
  }

  if (toolName === "getTime") {
    return getTime();
  }
}

const response = await ollama.chat({
  model: "qwen3",

  messages: [
    {
      role: "user",
      content: "What time is it?",
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

    {
      type: "function",
      function: {
        name: "getTime",
        description: "Get the current local time.",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    },
  ],
});

const toolCall = response.message.tool_calls[0];

const toolName = toolCall.function.name;
const arguments_ = toolCall.function.arguments;

console.log("Tool requested:", toolName);
console.log("Arguments:", arguments_);

const result = executeTool(toolName, arguments_);

console.log("Tool result:", result);

const messages = [
  {
    role: "user",
    content: "What time is it?",
  },

  response.message,

  {
    role: "tool",
    tool_name: toolCall.function.name,
    content: String(result),
  },
];

const finalResponse = await ollama.chat({
  model: "qwen3",
  messages,
});

console.log(finalResponse.message.content);
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

  throw new Error(`Unknown tool: ${toolName}`);
}

const response = await ollama.chat({
  model: "qwen3",

  messages: [
    {
      role: "user",
      content: "What time is it, and what is 25 + 17?",
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

const toolCalls = response.message.tool_calls;

const toolResults = [];

for (const toolCall of toolCalls) {
  const toolName = toolCall.function.name;
  const arguments_ = toolCall.function.arguments;

  console.log("Tool requested:", toolName);
  console.log("Arguments:", arguments_);

  const result = executeTool(toolName, arguments_);

  console.log("Tool result:", result);

  toolResults.push({
    role: "tool",
    tool_name: toolName,
    content: String(result),
  });
}

const messages = [
  {
    role: "user",
    content: "What time is it, and what is 25 + 17?",
  },

  response.message,

  ...toolResults,
];

const finalResponse = await ollama.chat({
  model: "qwen3",
  messages,
});

console.log(finalResponse.message.content);
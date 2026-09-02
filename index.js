// index.js

import ollama from "ollama";

import {
  calculate,
  getTime,
  toolDefinitions,
} from "./tools.js";

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

  tools: toolDefinitions,
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
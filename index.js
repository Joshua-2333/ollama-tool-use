// index.js

import ollama from "ollama";

import { toolDefinitions, availableTools } from "./tools.js";

function executeTool(toolName, arguments_) {
  const tool = availableTools[toolName];

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  return tool(arguments_);
}

const messages = [
  {
    role: "user",
    content:
      "What is today's date, what time is it, what is 25 + 17, and what is 6 * 7?",
  },
];

const MAX_TOOL_ROUNDS = 5;

for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
  const response = await ollama.chat({
    model: "qwen3",
    messages,
    tools: toolDefinitions,
  });

  messages.push(response.message);

  if (!response.message.tool_calls) {
    console.log(response.message.content);
    break;
  }

  for (const toolCall of response.message.tool_calls) {
    const toolName = toolCall.function.name;
    const arguments_ = toolCall.function.arguments;

    console.log("Tool requested:", toolName);
    console.log("Arguments:", arguments_);

    const result = executeTool(toolName, arguments_);

    console.log("Tool result:", result);

    messages.push({
      role: "tool",
      tool_name: toolName,
      content: String(result),
    });
  }

  if (round === MAX_TOOL_ROUNDS - 1) {
    console.log("Maximum tool rounds reached.");
  }
}
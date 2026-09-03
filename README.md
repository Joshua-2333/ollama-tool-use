# Ollama Tool Use

A JavaScript learning project demonstrating how an LLM can use tools (function calling) to perform tasks through a Node.js application.

This project uses the **Ollama JavaScript library** with the **Qwen3** model.

## What This Project Demonstrates

This project demonstrates the basic tool-use workflow:

1. Send a user request to an LLM.
2. Provide the model with available tool definitions.
3. Let the model decide which tools it needs.
4. Receive tool calls from the model.
5. Extract the tool name and arguments.
6. Execute the corresponding JavaScript function.
7. Return the tool result to the model.
8. Allow the model to make additional tool calls if necessary.
9. Continue until the model produces a final response.
10. Handle errors when a requested tool cannot be executed.

## Tools

The project defines several tools:

### `calculate`

Adds two numbers together.

```text
25 + 17 = 42
```

### `multiply`

Multiplies two numbers together.

```text
6 * 7 = 42
```

### `getTime`

Returns the current local time.

### `getDate`

Returns the current local date.

### `getWeather`

A deliberately unavailable tool used to demonstrate error handling.

The model can request the tool, but it is not included in the application's `availableTools` registry. This causes the application to safely report:

```text
Tool error: Unknown tool: getWeather
```

without crashing.

## Project Structure

```text
ollama-tool-use/
├── index.js
├── tools.js
├── package.json
└── package-lock.json
```

### `index.js`

Handles communication with Ollama and manages the tool-use loop.

Responsibilities include:

* Sending messages to the model
* Providing tool definitions
* Reading tool calls
* Extracting tool arguments
* Executing tools
* Returning tool results
* Handling tool errors
* Managing multiple tool rounds
* Printing the final model response

### `tools.js`

Contains the actual JavaScript tool implementations and their definitions.

It exports:

```js
toolDefinitions
```

which tells the model what tools are available, and:

```js
availableTools
```

which maps tool names to the JavaScript functions that the application can actually execute.

## How Tool Use Works

The basic flow is:

```text
User
  ↓
Ollama / Qwen3
  ↓
Model requests a tool
  ↓
Node.js receives the tool call
  ↓
Application finds the JavaScript function
  ↓
Function executes
  ↓
Tool result is returned to the conversation
  ↓
Ollama / Qwen3
  ↓
Model produces final response
```

For example, the user asks:

```text
What is today's date, what time is it,
what is 25 + 17, and what is 6 * 7?
```

The model can request multiple tools:

```text
getDate
getTime
calculate
multiply
```

The application executes each tool and returns the results.

The model can then use those results to produce the final answer.

## Multiple Tool Calls

The project supports multiple tool calls:

```js
for (const toolCall of response.message.tool_calls) {
  const toolName = toolCall.function.name;
  const arguments_ = toolCall.function.arguments;

  const result = executeTool(toolName, arguments_);

  messages.push({
    role: "tool",
    tool_name: toolName,
    content: String(result),
  });
}
```

This allows the model to request more than one tool instead of limiting the application to a single tool call.

## Multiple Tool Rounds

The application also supports multiple rounds of tool use:

```js
const MAX_TOOL_ROUNDS = 5;

for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
  // Ask the model what to do next
}
```

This allows the model to continue requesting tools when necessary before producing its final answer.

A maximum number of rounds is used to prevent the application from getting stuck in an endless tool-calling loop.

## Tool Registry

Tools are stored in an object:

```js
export const availableTools = {
  calculate,
  multiply,
  getTime,
  getDate,
};
```

The application can dynamically find a tool by name:

```js
const tool = availableTools[toolName];
```

If the requested tool does not exist:

```js
if (!tool) {
  throw new Error(`Unknown tool: ${toolName}`);
}
```

## Error Handling

The project uses `try...catch` to safely handle tool execution errors:

```js
try {
  result = executeTool(toolName, arguments_);
} catch (error) {
  result = `Tool error: ${error.message}`;
}
```

This prevents an invalid tool request from crashing the entire application.

For example:

```text
Tool requested: getWeather
Arguments: {}
Tool error: Unknown tool: getWeather
```

The application can then continue and allow the model to produce a final response.

## Example Output

A successful run can look like:

```text
Tool requested: getDate
Arguments: {}
Tool result: 9/3/2026

Tool requested: getTime
Arguments: {}
Tool result: 12:11:58 AM

Tool requested: calculate
Arguments: { a: 25, b: 17 }
Tool result: 42

Tool requested: multiply
Arguments: { a: 6, b: 7 }
Tool result: 42

Today's date is September 3, 2026.

The current time is 12:11:58 AM.

25 + 17 = 42
6 * 7 = 42
```

The project can also demonstrate an error:

```text
Tool requested: getWeather
Arguments: {}
Tool error: Unknown tool: getWeather
```

## Installation

Make sure Ollama is installed and running.

Check that the Qwen3 model is available:

```bash
ollama list
```

If necessary, download the model:

```bash
ollama pull qwen3
```

Install the project dependencies:

```bash
npm install
```

## Running the Project

Start the application with:

```bash
node index.js
```

## Technologies Used

* JavaScript
* Node.js
* Ollama
* Qwen3
* ES Modules
* LLM Tool Use / Function Calling

## Concepts Learned

This project was created as a hands-on exercise for learning LLM tool use.

Concepts demonstrated include:

* Function calling
* Tool definitions
* Tool descriptions
* JSON Schema parameters
* Tool arguments
* Dynamic tool execution
* Multiple tools
* Multiple tool calls
* Multiple tool rounds
* Conversation state
* Returning tool results to an LLM
* Tool registries
* Error handling
* Unknown tool handling
* LLM-controlled tool selection

## Purpose

The purpose of this project is to understand the fundamentals of how applications allow an LLM to interact with external functions.

The LLM does not directly execute the JavaScript functions.

Instead:

```text
LLM decides what tool it needs
        ↓
Application receives the request
        ↓
Application executes the function
        ↓
Application sends the result back to the LLM
        ↓
LLM uses the result
```

This project focuses on understanding that workflow before moving on to more advanced AI application concepts.

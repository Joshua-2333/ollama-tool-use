// tools.js
export function calculate(a, b) {
  return a + b;
}

export function getTime() {
  return new Date().toLocaleTimeString();
}

export const toolDefinitions = [
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
];
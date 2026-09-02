// tools.js

export function calculate(arguments_) {
  const { a, b } = arguments_;

  return a + b;
}

export function getTime() {
  return new Date().toLocaleTimeString();
}

export function getDate() {
  return new Date().toLocaleDateString();
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

  {
    type: "function",
    function: {
      name: "getDate",
      description: "Get the current local date.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];

export const availableTools = {
  calculate,
  getTime,
  getDate,
};
// tools.js

export function calculate(arguments_) {
  const { a, b } = arguments_;

  return a + b;
}

export function multiply(arguments_) {
  const { a, b } = arguments_;

  return a * b;
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
      description:
        "Add two numbers together. Use this tool for addition (+), not multiplication.",
      parameters: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "The first number to add.",
          },
          b: {
            type: "number",
            description: "The second number to add.",
          },
        },
        required: ["a", "b"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "multiply",
      description:
        "Multiply two numbers together. Use this tool for multiplication (*), not addition.",
      parameters: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "The first number to multiply.",
          },
          b: {
            type: "number",
            description: "The second number to multiply.",
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

  {
    type: "function",
    function: {
      name: "getWeather",
      description: "Get the current weather.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];

export const availableTools = {
  calculate,
  multiply,
  getTime,
  getDate,
};
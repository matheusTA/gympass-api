import type { Environment } from "vitest/environments";

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    console.error("Custom environment setup executed!"); // Mensagem clara
    return {
      async teardown() {
        console.error("Custom environment teardown executed!");
      },
    };
  },
};

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        seedDatabase(filename) {
          // 실행할 node 코드를 작성한다.
          return filename;
        },
      });
    },
  },
});

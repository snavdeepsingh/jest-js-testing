const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("Max", 29);
  expect(text).toBe("Max (29 years old)");
  const text1 = generateText("Anna", 30);
  expect(text1).toBe("Anna (30 years old)");
});

test("should ountput empty name and age", () => {
  const text = generateText(" ", null);
  expect(text).toBe("  (null years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

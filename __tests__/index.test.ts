import { generateActionMarkdownDocs } from "../src";
import { readFileSync, writeFileSync } from "fs";

test("With defaults.", async () => {
  const markdown = await generateActionMarkdownDocs();
  const expected = <string>(
    readFileSync("__tests__/fixtures/default.output", "utf-8")
  );

  expect(markdown).toEqual(expected);
});

test("A minimal action definition.", async () => {
  const markdown = await generateActionMarkdownDocs({
    actionFile: "__tests__/fixtures/minimal_action.yml",
  });
  const expected = <string>(
    readFileSync("__tests__/fixtures/minimal_action.output", "utf-8")
  );

  expect(markdown).toEqual(expected);
});

test("All fields action definition.", async () => {
  const markdown = await generateActionMarkdownDocs({
    actionFile: "__tests__/fixtures/all_fields_action.yml",
  });
  const expected = <string>(
    readFileSync("__tests__/fixtures/all_fields_action.output", "utf-8")
  );

  expect(markdown).toEqual(expected);
});

test("Update empty readme (all fields)", async () => {
  await testReadme(
    "__tests__/fixtures/all_fields_action.yml",
    "__tests__/fixtures/all_fields_readme.input",
    "__tests__/fixtures/all_fields_readme.output"
  );
});

test("Update filled readme (all fields)", async () => {
  await testReadme(
    "__tests__/fixtures/all_fields_action.yml",
    "__tests__/fixtures/all_fields_readme_filled.input",
    "__tests__/fixtures/all_fields_readme_filled.output"
  );
});

async function testReadme(
  actionFile: string,
  originalReadme: string,
  fixtureReadme: string
) {
  const expected = <string>readFileSync(fixtureReadme, "utf-8");
  const original = <string>readFileSync(originalReadme, "utf-8");

  await generateActionMarkdownDocs({
    actionFile: actionFile,
    updateReadme: true,
    readmeFile: originalReadme,
  });

  const updated = <string>readFileSync(originalReadme, "utf-8");

  writeFileSync(originalReadme, original);
  expect(updated).toEqual(expected);
}

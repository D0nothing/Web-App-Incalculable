import { expect, test } from "@playwright/test";

test("homepage exposes only the essential prompt interface", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link")).toHaveCount(2);
  await expect(navigation.getByRole("link", { name: "Prompt", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Le but & pourquoi", exact: true })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Qu’avez-vous en tête ?" })).toBeVisible();
  await expect(page.getByPlaceholder("Écrivez ici…")).toBeVisible();
  await expect(page.getByText("Importer un .txt ou .md")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Normal" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Reponse plus directe" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Verifier" })).toHaveCount(0);
});

test("wordmark links to incalculable.ai", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Visiter incalculable.ai" })).toHaveAttribute("href", "https://incalculable.ai/");
});

test("goal and rationale share one editorial page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Le but & pourquoi", exact: true }).click();
  await expect(page).toHaveURL(/\/but$/);
  await expect(page.getByRole("heading", { name: "Aider sans devenir l’origine de l’acte." })).toBeVisible();
  await expect(page.getByText("Règle centrale", { exact: true })).toBeVisible();
  await expect(page.getByText("Calcule pour lui, ne choisis pas à sa place.", { exact: true })).toBeVisible();

  await page.goto("/pourquoi");
  await expect(page).toHaveURL(/\/but$/);
});

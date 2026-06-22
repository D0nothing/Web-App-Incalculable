import { expect, test } from "@playwright/test";

test("homepage keeps the prompt as its only central content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Navigation principale" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Qu’avez-vous en tête ?" })).toBeVisible();
  await expect(page.getByPlaceholder("Écrivez ici…")).toBeVisible();
  await expect(page.locator(".doc-shell")).toHaveCount(0);
  await expect(page.locator(".editorial-page")).toHaveCount(0);
});

test("manifesto and protocol live on separate anchored pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Manifeste", exact: true }).click();
  await expect(page).toHaveURL(/\/manifeste$/);

  const manifestoLinks = page.locator(".doc-nav-link");
  expect(await manifestoLinks.count()).toBeGreaterThan(3);
  const manifestoHref = await manifestoLinks.first().getAttribute("href");
  await manifestoLinks.first().click();
  await expect(page).toHaveURL(new RegExp(`${manifestoHref?.replace("#", "\\#")}`));

  await page.getByRole("link", { name: "Protocole", exact: true }).click();
  await expect(page).toHaveURL(/\/protocole$/);
  expect(await page.locator(".doc-nav-link").count()).toBeGreaterThan(5);
});

test("secondary editorial pages are reachable from the header", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Pourquoi", exact: true }).click();
  await expect(page).toHaveURL(/\/pourquoi$/);
  await expect(page.getByRole("heading", { name: "Parce qu’une réponse n’est jamais neutre." })).toBeVisible();
});

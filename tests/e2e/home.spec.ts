import { expect, test } from "@playwright/test";

test("homepage exposes anchored readers for manifesto and protocol", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Navigation principale" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Avant le prompt, il y a toi." })).toBeVisible();

  const manifestoPanel = page.locator(".info-panel").filter({ hasText: "Lecture complète du document 1" });
  const protocolPanel = page.locator(".info-panel").filter({ hasText: "Lecture complète du document 2" });

  await expect(manifestoPanel).toBeVisible();
  await expect(protocolPanel).toBeVisible();

  const manifestoLinks = manifestoPanel.locator(".doc-nav-link");
  const protocolLinks = protocolPanel.locator(".doc-nav-link");

  expect(await manifestoLinks.count()).toBeGreaterThan(3);
  expect(await protocolLinks.count()).toBeGreaterThan(5);

  const manifestoLink = manifestoLinks.first();
  const manifestoHref = await manifestoLink.getAttribute("href");

  await manifestoLink.click();
  await expect(page).toHaveURL(new RegExp(`${manifestoHref?.replace("#", "\\#")}`));

  const protocolLink = protocolLinks.first();
  const protocolHref = await protocolLink.getAttribute("href");

  await protocolLink.click();
  await expect(page).toHaveURL(new RegExp(`${protocolHref?.replace("#", "\\#")}`));
});

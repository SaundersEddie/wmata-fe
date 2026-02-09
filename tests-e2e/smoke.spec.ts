import { test, expect } from "@playwright/test";

test("page loads and shows Metro + Accessibility sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "WMATA Status" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Accessibility" })).toBeVisible();

  // Metro line cards exist (at least one)
  await expect(page.getByRole("heading", { name: /Line$/ })).toBeVisible();
});

test("accessibility filters change the visible list", async ({ page }) => {
  await page.goto("/");

  // Click Unplanned filter
  await page.getByRole("button", { name: /Unplanned/i }).click();

  // Heading shows filter state (your panel prints "Outages (unplanned)")
  await expect(page.getByRole("heading", { name: /Outages.*unplanned/i })).toBeVisible();

  // Toggle show all
  const showAllBtn = page.getByRole("button", { name: /Show all/i });
  await showAllBtn.click();
  await expect(page.getByRole("button", { name: /Show top 10/i })).toBeVisible();
});

test("major line cards have service section and incident 'More' toggle when available", async ({ page }) => {
  await page.goto("/");

  // Find any line card that has a "Service" section and verify it renders
  // (This avoids depending on live WMATA incidents being present.)
  const serviceHeaders = page.getByRole("heading", { name: "Service" });

  // If there are no service incidents today, this test would be flaky.
  // So we make it conditional: assert that the app renders cleanly either way.
  if ((await serviceHeaders.count()) > 0) {
    await expect(serviceHeaders.first()).toBeVisible();

    // If any "More" buttons exist, they should work
    const moreButtons = page.getByRole("button", { name: "More" });
    if ((await moreButtons.count()) > 0) {
      await moreButtons.first().click();
      await expect(page.getByRole("button", { name: "Less" }).first()).toBeVisible();
    }
  } else {
    // No service incidents: still a pass as long as the UI loads
    await expect(page.getByRole("heading", { name: "Accessibility" })).toBeVisible();
  }
});

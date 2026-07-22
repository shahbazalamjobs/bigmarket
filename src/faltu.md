Step 7 — Create Dynamic Product Route

Configure:

/products/:id

Example:

/products/1

/products/15

/products/78

Don't fetch API yet.

Simply display:

Product ID: 15

using route parameters.

Step 8 — Create 404 Page

Whenever an unknown route is visited:

Example:

/abc

/random

/xyz

Show:

404

Page Not Found

Return Home

Add a button to navigate back to Home.

Step 9 — Implement Scroll Restoration

Use the ScrollToTop component so that:

Current behavior:

Products page

↓

Scroll to bottom

↓

Open Product

↓

Starts from bottom ❌

Expected:

Products

↓

Open Product

↓

Starts from top ✅
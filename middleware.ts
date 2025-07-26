// Completely remove middleware for GitHub Pages compatibility
// GitHub Pages only serves static files and doesn't support middleware

// This file is kept empty to avoid any middleware execution
export const config = {
  matcher: [],
}

export const ALLOWED_PAGES = ["", "/", "adoptions", "links", "chat-p"];

export default defineNuxtRouteMiddleware((to) => {
  // Allow access to /adoptions
  if (ALLOWED_PAGES.some((slug) => to.path.includes(slug))) {
    return;
  }

  // For all other routes, redirect to 404
  throw createError({
    statusCode: 404,
    message: "Page Not Found",
  });
});

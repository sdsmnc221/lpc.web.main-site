export default defineNuxtRouteMiddleware((to) => {
  // Allow access to /adoptions
  if (to.path.includes("/adoptions")) {
    return;
  }

  // For all other routes, redirect to 404
  throw createError({
    statusCode: 404,
    message: "Page Not Found",
  });
});

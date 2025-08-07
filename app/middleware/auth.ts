export default defineNuxtRouteMiddleware(
  (/*{ fullPath }*/ _to, _from) => {
    const user = useSupabaseUser();

    // if (fullPath === '/' && user.value) {
    //   return navigateTo('/dashboard');
    // }

    if (!user.value) {
      return navigateTo('/login');
    }
  }
);

import { ROUTES, type AppRoute } from "./routes"

// Función tipada para navegar
export function navigateTo(route: AppRoute, params?: Record<string, string>): string {
  if (!params) return route

  // Reemplazar parámetros dinámicos [param] con valores reales
  return route.replace(/\[([^\]]+)\]/g, (_, key) => {
    const value = params[key]
    if (!value) {
      throw new Error(`Missing parameter: ${key} for route ${route}`)
    }
    return value
  })
}

// Ejemplo de uso
export function getUserProfileUrl(userId: string): string {
  return navigateTo(ROUTES.USERS_ID, { id: userId })
}

export function getBlogPostUrl(slug: string): string {
  return navigateTo(ROUTES.BLOG_SLUG, { slug })
}

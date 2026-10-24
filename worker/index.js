// ─────────────────────────────────────────────────────────────────────────
// Michael's Dashboard — backend Worker (Phase 2, foundation)
//
// Serves the built front-end (the SPA in ./dist, via the ASSETS binding) and
// handles API routes under /api/*. This first version only has a health check
// so we can PROVE the full-stack setup works before adding the database,
// login, and Square integration.
// ─────────────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // API routes live under /api/*. Everything else is the front-end.
    if (url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return Response.json({
          ok: true,
          service: "michael's-dashboard",
          phase: 2,
          time: new Date().toISOString(),
        })
      }
      return Response.json({ ok: false, error: 'Not found' }, { status: 404 })
    }

    // Fall through to the static site (handled by the assets layer).
    return env.ASSETS.fetch(request)
  },
}

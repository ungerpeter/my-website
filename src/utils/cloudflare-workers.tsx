import type { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

export const getServiceWorker =
  (serviceWorkerBinding: string) => (platform: PlatformCloudflarePages) => {
    if (!platform.env) {
      console.warn("Service worker not found: platform.env is undefined");
      return undefined;
    }
    const serviceWorker = platform.env[serviceWorkerBinding] as
      | Fetcher
      | undefined;
    if (!serviceWorker) {
      console.error(`Service worker not found in env: ${serviceWorkerBinding}`);
    }
    return serviceWorker;
  };
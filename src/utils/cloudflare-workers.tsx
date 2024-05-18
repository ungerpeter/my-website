import type { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { KVNamespace as CFKVNamespace } from "@cloudflare/workers-types";
import type { KVNamespace as DevKVNamespace } from "@miniflare/kv";

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


let getDevKVNamespace: () => DevKVNamespace;
if (import.meta.env.DEV) {
  const { KVNamespace } = await import("@miniflare/kv");
  const { MemoryStorage } = await import("@miniflare/storage-memory");
  let kvNamespace: DevKVNamespace;
  getDevKVNamespace = () => {
    if (!kvNamespace) {
      kvNamespace = new KVNamespace(new MemoryStorage());
    }
    return kvNamespace;
  };
}

export const getKVNamespace = (
  platform: QwikCityPlatform,
  KVBindingKey: string
): CFKVNamespace | DevKVNamespace => {
  if (platform.env) {
    console.debug("🌤️ Using cloudflare KV namespace");
    return platform.env[KVBindingKey] as CFKVNamespace;
  }
  console.debug("🧑‍💻 Using miniflare dev KV namespace");
  return getDevKVNamespace();
};

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CATALOG_API_URL: string;
  readonly PUBLIC_WHATSAPP_PHONE: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

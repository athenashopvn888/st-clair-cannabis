/**
 * An explicit false / 0 / no / off on SHOW_CIGARETTES or
 * NEXT_PUBLIC_SHOW_CIGARETTES forces cigarettes off. An empty value is not
 * that override, and an explicit true does not force them on.
 */
function hardOffRaw(raw: string | undefined): string | undefined {
  if (raw != null) return raw;
  return process.env.SHOW_CIGARETTES ?? process.env.NEXT_PUBLIC_SHOW_CIGARETTES;
}

export function cigaretteEnvHardOff(raw: string | undefined = hardOffRaw(undefined)): boolean {
  if (raw == null) return false;
  return /^(0|false|no|off)$/i.test(raw.trim());
}

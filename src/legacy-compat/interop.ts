// Some of the original CommonJS-only dependencies end up double-wrapped when
// pre-bundled (`{ default: { default: Component } }`). Unwrap them so the
// original component code can keep using plain default imports.
export function unwrapDefault<T>(mod: T): T {
  const candidate = mod as unknown as { default?: T };

  return candidate && typeof candidate === "object" && candidate.default
    ? (candidate.default as T)
    : mod;
}

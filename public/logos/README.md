# Logos

Cada projeto deve ter sua própria pasta em `public/logos/<slug-do-projeto>/`.

## Nomes suportados

- `full.svg` (ou `.png`, `.webp`, `.jpg`, `.jpeg`)
- `full-dark.svg`
- `mini.svg`
- `mini-dark.svg`

## Fallback automático

`mini`:

1. `mini-dark` (tema escuro) ou `mini` (tema claro)
2. `mini`
3. `full-dark`
4. `full`

Se `mini` não existir, o site usa `full`.
Se `-dark` não existir, o site usa o arquivo normal.

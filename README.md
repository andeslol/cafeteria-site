# Empório Café — Landing page

Landing page de página única para uma cafeteria de Fortaleza (CE): cardápio em destaque, o espaço, endereços das lojas, galeria do Instagram e atalhos para o delivery no iFood.

> **Aviso:** projeto conceitual de portfólio, não oficial. Marca, nome e fotos pertencem ao Empório Café. Este site não tem vínculo com a empresa.

**Demo:** _em breve_

## Screenshots

| Desktop (1440×900) | Mobile (390×844) |
| --- | --- |
| ![Versão desktop](.github/screenshots/desktop.png) | ![Versão mobile](.github/screenshots/mobile.png) |

## Stack

- HTML5 semântico
- CSS puro, organizado em módulos (`tokens`, `base`, `components`, uma folha por seção e `motion`)
- JavaScript vanilla, sem dependências
- Google Fonts: Fraunces, Figtree e Caveat
- Imagens em WebP com `width`/`height` definidos

## Funcionalidades

- Layout responsivo, com menu mobile acessível (Esc fecha, `aria-expanded`)
- Status "Aberto agora / Fechado agora" calculado no fuso de Fortaleza
- Animações de entrada com `IntersectionObserver`, respeitando `prefers-reduced-motion`
- Botão fixo de pedido no mobile
- Metadados Open Graph/Twitter, favicon e dados estruturados (JSON-LD)

## Rodando localmente

Não há build. Basta abrir o `index.html` no navegador ou servir a pasta:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Observações

- O CSS é carregado em vários arquivos `<link>` (sem `@import`), o que facilita a manutenção. Se quiser reduzir requisições em produção, dá para concatenar tudo em um único `style.css` na mesma ordem do `index.html`.
- Antes de publicar, troque o `og:image` por uma URL absoluta e adicione `og:url` e `canonical` (há um comentário no `<head>` indicando onde).
- A pasta `_originais/` guarda os arquivos de origem (fotos originais e anotações) e não é versionada.

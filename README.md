# Empório Café

Landing page para uma cafeteria de Fortaleza (CE): destaques do cardápio, o espaço, endereços das lojas, fotos do Instagram e links para pedir no iFood.

> Projeto conceitual de portfólio, não oficial. Marca, nome e fotos pertencem ao Empório Café, e o site não tem vínculo com a empresa.

| Desktop | Mobile |
| --- | --- |
| ![Versão desktop](.github/screenshots/desktop.png) | ![Versão mobile](.github/screenshots/mobile.png) |

## Tecnologias

- HTML, CSS e JavaScript, sem dependências
- Google Fonts (Fraunces, Figtree e Caveat)

O CSS fica separado por arquivo: `tokens`, `base`, `components`, uma folha para cada seção e `motion`.

## Funcionalidades

- Layout responsivo com menu mobile (fecha com `Esc`)
- Aviso de "Aberto agora" / "Fechado agora" calculado no horário de Fortaleza
- Animações de entrada com `IntersectionObserver`, respeitando `prefers-reduced-motion`
- Botão fixo de pedido no celular
- Open Graph, favicon e dados estruturados (JSON-LD)

## Rodando

Não tem build. Abra o `index.html` no navegador ou sirva a pasta:

```bash
npx serve .
```

## Observações

- Os arquivos CSS são carregados com vários `<link>`, na ordem certa, sem `@import`. Se quiser menos requisições em produção, dá para juntar tudo num `style.css` seguindo a mesma ordem do `index.html`.
- Antes de publicar, troque o `og:image` por uma URL absoluta e adicione `og:url` e `canonical` (tem um comentário no `<head>` indicando onde).

## Autor

Anderson Ferreira

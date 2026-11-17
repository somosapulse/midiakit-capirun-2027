# CapiRun 2027 — Mídia Kit

Página estática para publicar em `https://midiakit.sportpulse.pro/capirun-2027/`.

## Estrutura
- `index.html` — a landpage com 11 dobras
- `style.v2.css` — identidade visual da CapiRun (amarelo `#fdb930`, marrom `#9f4a2a`, marrom escuro `#120b06`)
- `script.v3.js` — animações de entrada (reveal), ticker rolante e controle de movimento
- `assets/logo.webp` — logo da CapiRun (substitua pelo definitivo, mantendo o nome)
- `assets/favicon.png` — ícone do site
- `assets/og-image-v2.jpg` — imagem de compartilhamento (WhatsApp, Facebook, X) 1200×630

### Imagens
| Arquivo | Uso |
|---|---|
| `logo.webp` | Hero e rodapé |
| `medal.jpg` | Dobra 06 — 175 anos |
| `runners-jersey.jpg` | Dobra 01 — o evento + galeria |
| `kids-jersey.jpg` | Galeria |
| `start-gate.jpg` | Dobra 02 — a jornada + galeria |
| `trophies.jpg` | Galeria |

## Publicação na Hostinger
Envie o conteúdo deste diretório para:

```text
public_html/capirun-2027/
```

O arquivo `index.html` deve ficar diretamente nessa pasta.

## Dobras
1. Hero — selo, título, descrição, botão, faixa de números, microcopy e faixa rolante
2. O evento — estatísticas e modalidades (5 km, 3 km, kids)
3. A jornada completa — antes / durante / depois
4. Festival pós-corrida — bandas, food trucks, espaço kids
5. Para todo tipo de corredor — competidor e família
6. Quem corre com a gente — públicos
7. 175 anos — Rio Preto, 19.03.2027
8. Sua marca em movimento — 5 benefícios
9. Galeria — seção de imagens do evento
10. Cotas de patrocínio — ouro R$ 13.000, prata R$ 7.000, bronze R$ 3.000
11. Apoio oficial
12. CTA final — fale com a organização

## Fundos
Fundo marrom escuro (`#120b06`) nas dobras 01, 02, 03, 06, 07, 08 e 09; amarelo (`#fdb930`) nas dobras 04 (Corredor) e 05 (Público); apoio oficial em marrom `#1d0f05`.

Nenhuma foto é cortada: todas usam `object-fit: contain` e nenhuma tem texto sobreposto.

## Movimento
- Entrada escalonada elemento a elemento (134 alvos) em todas as dobras
- Contador animado nos números da faixa do hero
- Faixa rolante (ticker) na dobra 1
- Flutuação suave nos mascotes e na medalha
- Varredura de luz na seção clara (público) e no rodapé
- Engrenagens girando nos ícones
- Zoom suave nas fotos ao passar o mouse
- Botão "Pausar animações" e suporte a `prefers-reduced-motion`

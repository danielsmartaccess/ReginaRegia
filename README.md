# ReginaRegia — Oráculo do Baralho Cigano

Oráculo digital baseado no **Baralho Cigano / Petit Lenormand** (36 cartas). O usuário formula uma pergunta, escolhe um tema e uma modalidade de tiragem, embaralha, revela as cartas e recebe uma interpretação contextualizada, gerada por um motor simbólico local — sem backend e sem IA externa.

> O Oráculo é uma ferramenta simbólica de reflexão e entretenimento. As interpretações não substituem orientação profissional, médica, jurídica ou financeira.

## Stack

- React 19 + TypeScript 5.7
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`) — a maior parte do visual usa estilos inline
- Projeto gerado e executado no **Figma Make**

## Como rodar

Requisitos: Node 22 e pnpm 10 (versões fixadas em [.mise.toml](.mise.toml)).

```bash
pnpm install
pnpm dev       # servidor de desenvolvimento
pnpm build     # build de produção em dist/
pnpm preview   # serve o build localmente
pnpm format    # formatação com oxfmt
```

## Fluxo da aplicação

Toda a navegação é feita por estado em [src/App.tsx](src/App.tsx) (não há roteador):

1. **Home** — apresentação do oráculo.
2. **Pergunta** — texto livre + escolha de tema (Amor, Trabalho, Dinheiro, Família, Pessoal, Projetos, Geral).
3. **Tiragem** — escolha da modalidade.
4. **Embaralhar** — animação em fases (concentração → embaralhando → pronto).
5. **Revelação** — as cartas são viradas uma a uma.
6. **Leitura** — interpretação com seletor de profundidade (rápida / completa / profunda).
7. **Upsell** — convite para uma tiragem maior.
8. **Histórico** e **Planos** — telas acessíveis pela barra de navegação.

### Modalidades de tiragem

| Tiragem | Cartas | Posições | Nível |
| --- | --- | --- | --- |
| Carta do Dia | 1 | Mensagem do dia | Gratuito |
| Essencial | 3 | Situação · Influência · Tendência | Pago |
| Profunda | 5 | Contexto · Influência · Núcleo · Desafio · Tendência | Pago |
| Ampliada | 9 | Grade 3×3 com centro | Pago |
| Grande Tableau | 36 | Baralho completo | Premium |

## Estrutura

```
src/
├── App.tsx                  # Todas as telas e a máquina de estados de navegação
├── main.tsx                 # Entrada React
├── index.css                # Tailwind + fontes (Cinzel) e estilos globais
├── data/cards.ts            # As 36 cartas, tiragens, categorias e drawCards()
├── engine/interpreter.ts    # Motor de interpretação
├── assets/                  # Imagem de referência e instruções
└── imports/pasted_text/     # Briefs originais do produto e do motor
.figma/make/                 # Scripts e configuração do Figma Make
```

### Base de cartas — [src/data/cards.ts](src/data/cards.ts)

Cada carta (`LenormandCard`) traz:

- nome, símbolo, temas, categorias semânticas e palavras-chave;
- significado central, leitura construtiva e desafiadora;
- interpretações por **domínio** (amor, trabalho, dinheiro, família, pessoal, projetos, geral);
- interpretações por **papel** na tiragem (pessoa, situação, ação, obstáculo, conselho, tendência…);
- comportamento de **modificadora** (ex.: Sol clareia, Nuvens confundem, Montanha bloqueia, Foice corta, Chave abre);
- relações: cartas em conflito, cartas que reforçam e significados de pares específicos;
- frases de reflexão.

### Motor de interpretação — [src/engine/interpreter.ts](src/engine/interpreter.ts)

`interpret(cards, positions, question, category, depth)` devolve um `ReadingAnalysis` com:

- **Domínio** — usa o tema escolhido ou o detecta por palavras-chave na pergunta;
- **Análise por carta** — leitura contextual conforme o domínio, a posição e os modificadores vizinhos;
- **Combinações adjacentes**, **conflitos** e **reforços** entre as cartas;
- **Padrões** — predominância de movimento, estabilidade, obstáculos, oportunidades etc., e o fluxo narrativo;
- **Narrativa**, **síntese**, **insights** e uma **reflexão** final.

## Estado atual e pendências

- O **histórico** usa dados fictícios (`MOCK_HISTORY`); ainda não há persistência.
- Os **planos** têm preços provisórios (`R$ XX,XX`) e não há pagamento nem autenticação: todas as tiragens estão liberadas.
- O sorteio usa `Math.random()` com `sort`, o que não gera um embaralhamento uniforme (um Fisher–Yates resolveria).
- Pelo brief, a versão final deve ser reconstruída em HTML/CSS/JavaScript puro; esta versão em React é o protótipo da experiência.

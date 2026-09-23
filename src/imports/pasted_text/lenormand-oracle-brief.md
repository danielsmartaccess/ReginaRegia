# PROJETO: ORÁCULO DO BARALHO CIGANO — LENORMAND

Crie uma aplicação web completa, moderna, elegante e comercial para um **Oráculo Digital baseado no Baralho Cigano / Petit Lenormand**, utilizando o sistema tradicional de 36 cartas.

O objetivo desta etapa é criar no Figma Make a experiência completa de um usuário que acessa o site, formula uma questão, escolhe uma modalidade de leitura, participa da tiragem e recebe uma interpretação contextualizada.

Posteriormente, a aplicação será reconstruída utilizando:

* HTML5
* CSS3
* JavaScript puro / Vanilla JavaScript
* DOM API

Não utilizar frameworks na futura implementação.

O Figma deve, portanto, criar uma interface visualmente sofisticada, mas organizada de forma que cada componente possa posteriormente ser reproduzido com HTML, CSS e JavaScript.

---

# 1. CONCEITO DO PRODUTO

Criar um produto digital chamado:

# ORÁCULO

### Baralho Cigano • Lenormand

Subtítulo:

**Uma leitura simbólica para iluminar caminhos, possibilidades e perguntas.**

O produto deve transmitir:

* mistério;
* elegância;
* acolhimento;
* espiritualidade;
* curiosidade;
* sofisticação;
* confiança;
* descoberta.

A estética deve ser contemporânea.

Evitar aparência:

* infantil;
* caricata;
* excessivamente "mística de loja esotérica";
* genérica;
* exageradamente medieval;
* carregada de símbolos sem função.

Quero uma estética que combine:

**ORÁCULO + EDITORIAL PREMIUM + EXPERIÊNCIA DIGITAL CONTEMPORÂNEA.**

---

# 2. POSICIONAMENTO DA EXPERIÊNCIA

A aplicação não deve apresentar as cartas como uma máquina de prever fatos inevitáveis.

A linguagem deve tratar a leitura como:

* interpretação simbólica;
* reflexão;
* possibilidades;
* tendências;
* perspectivas;
* perguntas para reflexão.

Evitar afirmações absolutas como:

"Isso vai acontecer."

"Você certamente vai ganhar dinheiro."

"Essa pessoa vai voltar."

"Você ficará doente."

Preferir:

"As cartas sugerem..."

"A leitura aponta para..."

"Este conjunto pode indicar..."

"Uma possibilidade interpretativa é..."

"Considere como isso se relaciona com sua situação."

A experiência deve preservar o caráter oracular sem transformar interpretação simbólica em certeza factual.

---

# 3. MODELO DO BARALHO

Utilizar o sistema de **36 cartas do Petit Lenormand / Baralho Cigano**.

Representar as cartas numeradas:

01 — Cavaleiro
02 — Trevo
03 — Navio
04 — Casa
05 — Árvore
06 — Nuvens
07 — Serpente
08 — Caixão
09 — Buquê
10 — Foice
11 — Chicote
12 — Pássaros
13 — Criança
14 — Raposa
15 — Urso
16 — Estrelas
17 — Cegonha
18 — Cão
19 — Torre
20 — Jardim
21 — Montanha
22 — Caminhos
23 — Ratos
24 — Coração
25 — Anel
26 — Livro
27 — Carta
28 — Homem
29 — Mulher
30 — Lírios
31 — Sol
32 — Lua
33 — Chave
34 — Peixes
35 — Âncora
36 — Cruz

A aplicação deverá tratar essas 36 cartas como um conjunto estruturado de dados.

---

# 4. DADOS DE CADA CARTA

Cada carta deve possuir visualmente e conceitualmente:

* número;
* nome;
* imagem/símbolo;
* palavras-chave;
* significado central;
* aspectos favoráveis;
* aspectos desafiadores;
* interpretação em amor;
* interpretação em trabalho;
* interpretação financeira;
* interpretação geral;
* combinações relevantes;
* possíveis mensagens reflexivas.

Não é necessário exibir todas essas informações simultaneamente ao usuário.

Elas devem existir como base conceitual para a futura lógica JavaScript.

---

# 5. PRINCÍPIO FUNDAMENTAL DA LEITURA

A aplicação deve considerar que a interpretação do Lenormand não depende apenas da carta isolada.

A leitura deve considerar:

```text
CARTA
   +
POSIÇÃO
   +
CONTEXTO DA PERGUNTA
   +
CARTAS VIZINHAS
   +
COMBINAÇÕES
   +
MÉTODO DA TIRAGEM
   =
INTERPRETAÇÃO
```

A interface deve demonstrar esse princípio ao usuário.

---

# 6. TELA INICIAL

Criar uma landing page / home moderna.

Hero principal:

# CONSULTE O ORÁCULO

Subtítulo:

**Faça uma pergunta. Escolha sua leitura. Deixe as cartas revelarem novas perspectivas.**

CTA principal:

**FAZER UMA LEITURA**

CTA secundário:

**CONHECER O ORÁCULO**

Criar uma representação visual sofisticada do baralho.

Utilizar:

* cartas parcialmente sobrepostas;
* iluminação;
* profundidade;
* sombras;
* textura sutil;
* animação futura prevista.

---

# 7. COMO FUNCIONA

Criar uma seção explicativa em três ou quatro etapas:

### 01 — FORMULE

Pense em uma pergunta clara.

### 02 — ESCOLHA

Selecione o tipo de leitura.

### 03 — TIRE

As cartas são embaralhadas e distribuídas.

### 04 — INTERPRETE

Veja a leitura das cartas em conjunto.

Visualizar o processo de maneira elegante.

---

# 8. TELA DE PREPARAÇÃO

Antes da tiragem, criar uma tela de preparação.

Título:

**Prepare sua pergunta**

Campo:

**Sobre o que você deseja orientação?**

Exemplos de placeholder:

"Como posso compreender melhor minha situação profissional?"

"Que aspectos devo observar em meu relacionamento?"

"O que preciso considerar neste momento?"

Criar categorias:

* Amor
* Trabalho
* Dinheiro
* Família
* Caminhos
* Geral

Não obrigar o usuário a escolher uma categoria se isso não fizer sentido.

Criar CTA:

**CONTINUAR**

---

# 9. VALIDAÇÃO DA PERGUNTA

Se a pergunta estiver vazia:

mostrar:

**Escreva uma pergunta para iniciar sua leitura.**

Se a pergunta for excessivamente genérica:

mostrar uma sugestão amigável:

**Perguntas mais específicas costumam gerar uma leitura mais útil.**

Não bloquear excessivamente o usuário.

---

# 10. MODALIDADES DE LEITURA

Criar uma tela:

# ESCOLHA SUA LEITURA

Oferecer produtos/modalidades.

## CARTA DO DIA

1 carta.

Descrição:

**Uma mensagem simbólica para refletir sobre o seu momento.**

CTA:

**FAZER LEITURA**

---

## 3 CARTAS

3 cartas.

Estrutura:

**Situação → Influência → Tendência**

Descrição:

**Uma visão rápida e objetiva sobre sua pergunta.**

---

## 5 CARTAS

5 cartas.

Estrutura:

**Contexto → Desafio → Influência → Conselho → Tendência**

Descrição:

**Uma leitura mais profunda para questões que pedem contexto.**

---

## 9 CARTAS

9 cartas.

Layout:

3 × 3.

Descrição:

**Uma visão ampliada da situação, observando relações entre as cartas e o centro da questão.**

---

## GRANDE TABLEAU

36 cartas.

Descrição:

**A experiência mais completa do Lenormand, utilizando todo o baralho.**

Apresentar como modalidade premium.

O Grand Tableau deve ser tratado como leitura avançada, pois envolve casas, significadores, proximidade, relações e outras técnicas de interpretação.

---

# 11. MODELO COMERCIAL

Criar níveis de produto.

### GRATUITO

Carta do dia.

### ESSENCIAL

3 cartas.

### PROFUNDO

5 ou 9 cartas.

### COMPLETO

Grande Tableau.

### PREMIUM

Grande Tableau + interpretação expandida + histórico + relatório.

Não apresentar preços reais nesta etapa.

Utilizar placeholders:

**R$ XX,XX**

---

# 12. TELA DE EMBARALHAMENTO

Criar uma experiência visual para o embaralhamento.

Mostrar o baralho fechado.

Mensagem:

**Concentre-se na sua pergunta.**

Depois:

**As cartas estão sendo embaralhadas...**

Criar estados visuais:

* aguardando;
* embaralhando;
* pronto;
* distribuindo.

Preparar visualmente espaço para futuras animações CSS/JavaScript.

---

# 13. TIRAGEM DE 1 CARTA

Mostrar:

```text
        CARTA DO DIA

           [ CARTA ]

        Nome da carta

      Palavra-chave
```

Depois da revelação:

* carta;
* significado;
* interpretação contextual;
* reflexão.

Criar botão:

**VER LEITURA COMPLETA**

---

# 14. TIRAGEM DE 3 CARTAS

Criar uma mesa visual com:

```text
┌─────────┐  ┌─────────┐  ┌─────────┐
│ CARTA 1 │  │ CARTA 2 │  │ CARTA 3 │
│         │  │         │  │         │
└─────────┘  └─────────┘  └─────────┘

 SITUAÇÃO     INFLUÊNCIA    TENDÊNCIA
```

A interpretação deve considerar as cartas em conjunto.

Criar:

### CARTA 1

**Situação**

### CARTA 2

**Influência**

### CARTA 3

**Tendência**

Depois:

## LEITURA DO CONJUNTO

Apresentar um texto interpretativo.

---

# 15. TIRAGEM DE 5 CARTAS

Criar disposição:

```text
       CARTA 2

CARTA 1  CARTA 3  CARTA 4

       CARTA 5
```

Ou outra disposição visual equilibrada.

Posições:

1. Contexto
2. Influência
3. Núcleo da questão
4. Desafio
5. Tendência / orientação

Criar interpretação individual + síntese.

---

# 16. TIRAGEM DE 9 CARTAS

Criar uma matriz:

```text
┌────┬────┬────┐
│ 01 │ 02 │ 03 │
├────┼────┼────┤
│ 04 │ 05 │ 06 │
├────┼────┼────┤
│ 07 │ 08 │ 09 │
└────┴────┴────┘
```

Destacar a carta central.

A interpretação deverá considerar:

* centro;
* linhas;
* colunas;
* vizinhança;
* combinações;
* contexto da pergunta.

O quadro de 9 cartas é uma prática comum de leitura ampliada no Lenormand.

---

# 17. GRANDE TABLEAU

Criar uma experiência premium.

Utilizar as 36 cartas.

Layout principal:

**4 × 9**

```text
01 02 03 04 05 06 07 08 09
10 11 12 13 14 15 16 17 18
19 20 21 22 23 24 25 26 27
28 29 30 31 32 33 34 35 36
```

O Grand Tableau tradicionalmente utiliza as 36 cartas e pode ser organizado em 9 × 4 ou em variações como 8 × 4 + 4.

---

# 18. CASAS DO GRANDE TABLEAU

Criar uma camada conceitual de "casas".

Cada posição possui um tema correspondente à carta daquela casa.

Exemplos:

Casa 1 — Cavaleiro → notícias / movimento

Casa 4 — Casa → lar / família

Casa 24 — Coração → amor / afetos

Casa 34 — Peixes → recursos / dinheiro

A interface deve permitir que o usuário clique em uma posição e visualize:

**CASA**

**CARTA QUE OCUPA A CASA**

**INTERPRETAÇÃO DA RELAÇÃO**

Essa estrutura deve ser preparada para futura implementação JavaScript.

---

# 19. SIGNIFICADORES

No Grand Tableau, permitir selecionar o foco:

* consulente masculino;
* consulente feminino;
* relacionamento;
* trabalho;
* questão específica.

Utilizar Homem e Mulher como significadores tradicionais quando aplicável.

O significador deve servir como âncora para a leitura.

A interpretação deve considerar proximidade e relações com outras cartas.

---

# 20. LEITURA CONTEXTUAL

Este é um requisito essencial.

A aplicação não deve simplesmente fazer:

```text
Carta = Coração
Resultado = Amor
```

Ela deve considerar:

```text
PERGUNTA
+
CARTA
+
POSIÇÃO
+
CARTAS PRÓXIMAS
+
COMBINAÇÃO
```

Exemplo conceitual:

Pergunta:

**"Como está minha vida profissional?"**

Carta:

**Raposa**

A leitura deve ser contextualizada para trabalho.

Pergunta:

**"Como está meu relacionamento?"**

A mesma carta deve receber outra interpretação contextual.

A aplicação deverá demonstrar essa diferença visualmente.

---

# 21. COMBINAÇÕES

Criar um sistema visual para demonstrar combinações.

Exemplo:

**Coração + Anel**

Mostrar:

```text
CORAÇÃO
   +
ANEL
   ↓
Afeto + compromisso
```

Outro exemplo:

**Navio + Caminhos**

Interpretar como uma combinação relacionada a movimento, escolhas ou mudança, dependendo do contexto.

As combinações devem ser tratadas como parte central da lógica do sistema.

No Lenormand, o significado emerge frequentemente da relação entre cartas, e não somente de significados isolados.

---

# 22. DIREÇÃO DA LEITURA

Para tiragens lineares, criar visualização:

```text
PASSADO → PRESENTE → TENDÊNCIA
```

Quando aplicável.

Não assumir que todas as tiragens seguem exatamente essa lógica.

A posição deve determinar o papel da carta.

---

# 23. LEITURA DAS CARTAS

Criar uma área:

# SUA LEITURA

Estruturar:

### O QUE AS CARTAS MOSTRAM

Resumo.

### O QUE MERECE ATENÇÃO

Pontos relevantes.

### POSSIBILIDADES

Interpretação contextual.

### REFLEXÃO

Uma pergunta ou provocação para o consulente.

Exemplo:

**"Que escolha você vem adiando por medo de mudar?"**

---

# 24. TOM DA INTERPRETAÇÃO

A linguagem deve ser:

* acolhedora;
* clara;
* elegante;
* objetiva;
* simbólica;
* não fatalista.

Evitar:

* medo;
* ameaça;
* certezas absolutas;
* diagnósticos;
* promessas financeiras;
* afirmações médicas;
* afirmações jurídicas;
* manipulação emocional.

---

# 25. AVISO DE RESPONSABILIDADE

Criar uma pequena área discreta:

**O Oráculo é uma ferramenta simbólica de reflexão e entretenimento. As interpretações não substituem orientação profissional nem determinam acontecimentos futuros.**

Não transformar isso em uma parede de texto.

---

# 26. HISTÓRICO DE LEITURAS

Criar uma tela:

# MINHAS LEITURAS

Mostrar cards contendo:

* data;
* pergunta;
* tipo de tiragem;
* cartas principais;
* categoria;
* botão "Ver leitura".

Criar filtros:

* todas;
* amor;
* trabalho;
* dinheiro;
* geral.

---

# 27. COMPARTILHAMENTO

Criar botão:

**COMPARTILHAR LEITURA**

Preparar uma versão visual compacta da leitura para:

* WhatsApp;
* redes sociais;
* copiar link.

Não implementar integração real nesta etapa.

---

# 28. PRODUTOS E UPSELL

A aplicação deverá possuir uma estratégia comercial elegante.

Depois de uma leitura gratuita, apresentar:

# QUER IR MAIS FUNDO?

Cards:

### LEITURA DE 5 CARTAS

**Uma visão mais detalhada da sua questão.**

CTA:

**APROFUNDAR LEITURA**

---

### LEITURA DE 9 CARTAS

**Explore contexto, influências e caminhos possíveis.**

CTA:

**FAZER LEITURA COMPLETA**

---

### GRANDE TABLEAU

**Uma visão panorâmica utilizando as 36 cartas do Lenormand.**

CTA:

**EXPLORAR GRANDE TABLEAU**

---

### CONSULTA PREMIUM

**Leitura expandida com interpretação detalhada e histórico.**

CTA:

**CONHECER CONSULTA PREMIUM**

---

# 29. UPSELL CONTEXTUAL

Depois de uma leitura curta, recomendar o próximo produto de forma contextual.

Exemplo:

Após 3 cartas:

**Sua pergunta envolve diferentes aspectos?**

**Uma leitura de 9 cartas pode explorar melhor as relações entre as cartas.**

CTA:

**APROFUNDAR**

Não utilizar:

* contagem regressiva falsa;
* escassez artificial;
* mensagens alarmistas;
* "última chance";
* manipulação emocional.

A venda deve parecer uma extensão natural da experiência.

---

# 30. TELA DE OFERTAS

Criar uma página:

# ENCONTRE A LEITURA CERTA PARA VOCÊ

Comparar:

| Leitura        | Cartas | Profundidade |
| -------------- | -----: | ------------ |
| Carta do Dia   |      1 | Rápida       |
| Essencial      |      3 | Objetiva     |
| Profunda       |      5 | Detalhada    |
| Ampliada       |      9 | Completa     |
| Grande Tableau |     36 | Avançada     |

Não definir preços reais.

Usar placeholders.

---

# 31. DESIGN SYSTEM

Criar componentes:

* OracleCard
* Tarot/LenormandCard
* CardBack
* Spread
* SpreadPosition
* QuestionInput
* CategorySelector
* ReadingText
* ReadingSection
* CombinationCard
* HouseCard
* Player/ConsultantProfile
* ActionButton
* OfferCard
* PricingCard
* Modal
* Toast
* Navigation
* Header
* Footer

Cada componente deve possuir estados.

---

# 32. ESTADOS DAS CARTAS

Criar:

### BACK

Carta fechada.

### HOVER

Carta sob interação.

### SELECTED

Carta selecionada.

### REVEALING

Carta sendo revelada.

### REVEALED

Carta aberta.

### FOCUS

Carta destacada durante a interpretação.

### RELATED

Carta relacionada a outra.

### DIMMED

Carta secundária.

### HOUSE

Carta dentro de uma casa do Grand Tableau.

---

# 33. ANIMAÇÕES FUTURAS

Preparar visualmente para:

* embaralhamento;
* corte do baralho;
* distribuição;
* virar carta;
* aproximação;
* destaque;
* conexão entre cartas;
* expansão de interpretação;
* transição entre telas.

As futuras animações deverão poder ser implementadas usando:

```text
CSS transition
CSS animation
JavaScript + classList
DOM events
```

Não depender de efeitos que sejam impossíveis de reproduzir fora do Figma.

---

# 34. RESPONSIVIDADE

Criar:

### DESKTOP

1440 × 900

### TABLET

1024 × 768

### MOBILE

390 × 844

No mobile:

* preservar a carta como elemento principal;
* permitir rolagem horizontal quando necessário;
* adaptar o Grand Tableau;
* evitar textos excessivamente longos;
* transformar painéis em seções empilhadas;
* manter CTAs acessíveis.

---

# 35. ACESSIBILIDADE

Utilizar:

* contraste adequado;
* tamanho legível;
* foco visível;
* botões reais;
* labels;
* mensagens claras;
* não depender somente de cor;
* áreas de toque adequadas.

---

# 36. PREPARAÇÃO PARA JAVASCRIPT

O design deverá permitir posteriormente uma arquitetura semelhante a:

```text
APP
│
├── DECK
│
├── QUESTION
│
├── SPREAD
│
├── CARDS
│
├── READING
│
├── COMBINATIONS
│
├── HISTORY
│
└── OFFERS
```

O futuro JavaScript deverá poder representar:

```text
Card
Deck
Question
Spread
Position
Reading
Combination
Session
Offer
```

Não criar código agora.

Criar apenas uma interface que permita essa implementação.

---

# 37. FLUXO PRINCIPAL DO USUÁRIO

O fluxo completo deverá ser:

```text
HOME
 ↓
FAZER LEITURA
 ↓
FORMULAR PERGUNTA
 ↓
ESCOLHER TEMA
 ↓
ESCOLHER TIRAGEM
 ↓
EMBARALHAR
 ↓
DISTRIBUIR
 ↓
REVELAR
 ↓
INTERPRETAR
 ↓
SÍNTESE
 ↓
REFLEXÃO
 ↓
OFERTA DE APROFUNDAMENTO
 ↓
HISTÓRICO
```

---

# 38. REQUISITOS FUNCIONAIS REPRESENTADOS VISUALMENTE

RF01 — O usuário deve poder iniciar uma leitura.

RF02 — O usuário deve poder formular uma pergunta.

RF03 — O usuário deve poder escolher um tema.

RF04 — O usuário deve poder escolher uma modalidade de tiragem.

RF05 — O sistema deve embaralhar o baralho.

RF06 — O sistema deve distribuir as cartas conforme o método escolhido.

RF07 — O sistema deve revelar as cartas.

RF08 — O sistema deve identificar a posição de cada carta.

RF09 — O sistema deve interpretar as cartas considerando contexto.

RF10 — O sistema deve apresentar combinações relevantes.

RF11 — O sistema deve apresentar uma síntese.

RF12 — O usuário deve poder visualizar leituras anteriores.

RF13 — O usuário deve poder compartilhar uma leitura.

RF14 — O sistema deve apresentar ofertas de leituras mais completas.

RF15 — O sistema deve permitir navegar entre modalidades.

RF16 — O sistema deve apresentar o Grande Tableau.

RF17 — O sistema deve permitir explorar cartas individuais.

RF18 — O sistema deve permitir visualizar o significado de uma carta.

---

# 39. REGRAS DE NEGÓCIO

RN01 — O baralho possui 36 cartas.

RN02 — Cada carta deve existir apenas uma vez no baralho.

RN03 — Uma carta retirada não deve retornar ao monte durante a mesma tiragem.

RN04 — Cada modalidade utiliza uma quantidade específica de cartas.

RN05 — Carta do Dia utiliza 1 carta.

RN06 — Tiragem Essencial utiliza 3 cartas.

RN07 — Tiragem Profunda utiliza 5 cartas.

RN08 — Tiragem Ampliada utiliza 9 cartas.

RN09 — Grande Tableau utiliza as 36 cartas.

RN10 — A interpretação depende do contexto da pergunta.

RN11 — A interpretação depende da posição da carta.

RN12 — Combinações entre cartas podem modificar ou complementar significados.

RN13 — A mesma carta pode assumir interpretações diferentes dependendo do tema.

RN14 — O sistema não deve apresentar interpretação como certeza absoluta sobre o futuro.

RN15 — O sistema não deve utilizar o resultado para diagnóstico médico.

RN16 — O sistema não deve apresentar aconselhamento jurídico como consequência da leitura.

RN17 — O sistema não deve garantir ganhos financeiros.

RN18 — O sistema deve apresentar a leitura como interpretação simbólica.

RN19 — O usuário pode realizar novas leituras.

RN20 — Leituras realizadas podem ser armazenadas no histórico quando o recurso estiver implementado.

RN21 — Produtos premium podem aprofundar a leitura.

RN22 — O upsell deve ser contextual e transparente.

RN23 — Não utilizar escassez artificial.

RN24 — Não utilizar mensagens de medo para induzir compra.

RN25 — O usuário deve poder acessar uma explicação básica sobre como o oráculo funciona.

---

# 40. ARQUITETURA DE EXPERIÊNCIA

A aplicação deverá distinguir claramente três camadas:

## CAMADA 1 — EXPERIÊNCIA

O que o usuário vê:

* cartas;
* mesa;
* perguntas;
* leitura;
* ofertas.

## CAMADA 2 — LÓGICA

O que o sistema futuramente fará:

* embaralhar;
* sortear;
* posicionar;
* combinar;
* contextualizar;
* interpretar.

## CAMADA 3 — CONTEÚDO

Base conceitual:

* 36 cartas;
* palavras-chave;
* significados;
* combinações;
* posições;
* métodos de tiragem.

Essa separação é importante para a futura implementação em JavaScript.

---

# 41. QUALIDADE VISUAL

Faça uma revisão completa antes de finalizar.

Verifique:

* identidade visual;
* consistência das cartas;
* hierarquia;
* legibilidade;
* contraste;
* espaçamento;
* responsividade;
* clareza das CTAs;
* experiência de revelação;
* organização do Grand Tableau;
* qualidade das telas de leitura;
* coerência das ofertas.

O resultado deve parecer um produto comercial real.

---

# 42. RESULTADO FINAL

Entregar uma experiência de oráculo digital que combine:

**TRADIÇÃO DO LENORMAND**

*

**DESIGN DIGITAL MODERNO**

*

**LEITURA CONTEXTUAL**

*

**EXPERIÊNCIA DE USUÁRIO**

*

**MODELO COMERCIAL**

O usuário deve sentir que está realizando uma consulta, e não preenchendo um formulário.

A jornada deve ser envolvente:

**PERGUNTA → EXPECTATIVA → EMBARALHAMENTO → REVELAÇÃO → INTERPRETAÇÃO → REFLEXÃO → APROFUNDAMENTO.**

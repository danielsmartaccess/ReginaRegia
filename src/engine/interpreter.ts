import { CARDS, type LenormandCard, type Category } from "../data/cards";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReadingDepth = "rapida" | "completa" | "profunda";

export interface SpreadPosition {
  name: string;
  role: string;
  description: string;
}

export interface CardAnalysis {
  card: LenormandCard;
  position: SpreadPosition;
  index: number;
  contextualInterpretation: string; // domain-adjusted
  positionalRole: string;           // how the position shapes this card
  modifiedBy: ModifierEffect[];
  narrative: string;               // card's role in the story
}

export interface ModifierEffect {
  modifierCard: LenormandCard;
  effect: string;
  type: string;
}

export interface CombinationResult {
  cardA: LenormandCard;
  cardB: LenormandCard;
  indexA: number;
  indexB: number;
  type: "reforço" | "conflito" | "sequência" | "modificação" | "comunicação" | "movimento" | "bloqueio";
  meaning: string;
  significance: "alta" | "média" | "baixa";
}

export interface ConflictResult {
  cardA: LenormandCard;
  cardB: LenormandCard;
  tension: string;
  resolution: string;
}

export interface ReinforcementResult {
  cards: LenormandCard[];
  theme: string;
  meaning: string;
}

export interface PatternAnalysis {
  dominantTheme: string;
  dominantThemeLabel: string;
  themeBreakdown: Record<string, number>;
  movementCards: LenormandCard[];
  stabilityCards: LenormandCard[];
  communicationCards: LenormandCard[];
  transformationCards: LenormandCard[];
  emotionCards: LenormandCard[];
  predominance: string;
  narrativeFlow: "avanço" | "estabilidade" | "transformação" | "espera" | "decisão" | "encerramento" | "reorganização" | "tensão";
}

export interface InsightResult {
  dominantTheme: string;
  mainTension: string;
  mainOpportunity: string;
  mainObstacle: string;
  movementDirection: string;
  symbolicAdvice: string;
}

export interface ReadingAnalysis {
  domain: Category;
  domainLabel: string;
  question: string;
  depth: ReadingDepth;
  cardAnalyses: CardAnalysis[];
  adjacentCombinations: CombinationResult[];
  conflicts: ConflictResult[];
  reinforcements: ReinforcementResult[];
  patterns: PatternAnalysis;
  synthesis: string;
  narrative: string;
  insights: InsightResult;
  reflection: string;
  disclaimer: string;
}

// ─── Semantic groups ──────────────────────────────────────────────────────────

const MOVEMENT_CARDS = new Set([1, 3, 10, 17, 22]);
const STABILITY_CARDS = new Set([4, 19, 35]);
const COMMUNICATION_CARDS = new Set([1, 12, 27]);
const TRANSFORMATION_CARDS = new Set([8, 10, 17, 22, 36]);
const EMOTION_CARDS = new Set([24, 32, 30, 9]);
const OBSTACLE_CARDS = new Set([6, 11, 21, 23]);
const OPPORTUNITY_CARDS = new Set([2, 16, 31, 33, 9]);
const POSITIVE_MODIFIERS = new Set([31, 16, 33, 9]);
const NEGATIVE_MODIFIERS = new Set([6, 21, 23]);
const PERSON_CARDS = new Set([28, 29]);

// Known conflict pairs (bidirectional)
const CONFLICT_PAIRS: [number, number, string, string][] = [
  [3, 4, "O movimento e as raízes estão em tensão. Há um conflito entre partir e permanecer.", "Decidir qual é mais importante neste momento ou encontrar uma forma de honrar os dois."],
  [3, 35, "A viagem e a âncora se opõem. Expansão versus estabilidade.", "Verificar se a estabilidade conquistada permite a expansão, ou se ela a impede."],
  [1, 21, "O avanço encontra resistência. O movimento é bloqueado por um obstáculo significativo.", "Identificar a natureza do obstáculo antes de forçar o avanço."],
  [1, 35, "Velocidade versus permanência. O que chega rapidamente colide com o que está fixo.", "Avaliar se o que está chegando merece desestabilizar o que foi construído."],
  [4, 17, "O lar e a mudança em tensão. A transformação ameaça o que era seguro.", "Reconhecer que mudanças podem acontecer sem destruir as bases."],
  [8, 5, "O encerramento e as raízes em conflito. Algo profundo está sendo encerrrado.", "Honrar o que está terminando enquanto se cuida das raízes que permanecem."],
  [8, 13, "O fim e o começo juntos. Uma coisa não pode começar enquanto a outra não terminar.", "Deixar ir antes de iniciar."],
  [10, 5, "O corte atinge as raízes. Uma decisão afeta algo profundamente enraizado.", "Avaliar o que precisa ser cortado e o que deve ser preservado."],
  [10, 25, "O corte e o compromisso em tensão. Uma decisão afeta um vínculo estabelecido.", "Decidir conscientemente o que fica e o que vai."],
  [11, 30, "O conflito e a harmonia em oposição. A paz está sendo desafiada.", "Reconhecer que nem todo conflito pode — ou deve — ser evitado."],
  [14, 18, "A astúcia e a lealdade em tensão. A confiança está sendo questionada.", "Verificar se a lealdade que se percebe é real ou projetada."],
  [17, 35, "A mudança e a estabilidade em oposição. O novo questiona o estabelecido.", "Avaliar se a estabilidade atual ainda serve ao que se quer."],
  [19, 20, "O isolamento e o social em conflito. A distância impede a conexão.", "Reconhecer quando o isolamento deixa de proteger e começa a aprisionar."],
  [21, 31, "O obstáculo e a clareza em tensão. A dificuldade obscurece o caminho.", "Manter a clareza de propósito mesmo diante do obstáculo."],
  [22, 35, "A escolha e a permanência em oposição. Decidir implica abrir mão do que está fixo.", "Aceitar que comprometer-se com um caminho significa deixar o outro."],
  [6, 31, "A confusão e a clareza em oposição direta.", "A névoa está se dissipando — buscar ativamente a clareza."],
  [23, 9, "O desgaste corrói a alegria. O que deveria ser belo está sendo consumido.", "Identificar e interromper o que está drenando o que deveria ser motivo de gratidão."],
];

// Known reinforcement pairs
const REINFORCEMENT_PAIRS: [number[], string, string][] = [
  [[31, 16], "clareza e inspiração", "A leitura aponta para um período de grande clareza e orientação. Esses dois elementos juntos formam uma convergência de luz e propósito."],
  [[24, 25], "amor e compromisso", "A combinação sugere um vínculo afetivo que caminha para o comprometimento. O sentimento e o acordo se reforçam."],
  [[24, 18], "amor e lealdade", "O afeto é sustentado pela fidelidade. Este é um vínculo que tem tanto sentimento quanto confiança como base."],
  [[31, 9], "sucesso e alegria", "A clareza do Sol e a beleza do Buquê convergem. Um período de realização e reconhecimento."],
  [[33, 31], "solução e clareza", "A resposta e a clareza juntas. O que precisava ser resolvido encontra sua luz."],
  [[16, 31], "esperança e sucesso", "A orientação e o êxito se reforçam. O que se busca tem fundamento real."],
  [[1, 27], "mensagem e comunicação", "Duas cartas de comunicação juntas reforçam que algo importante está para ser comunicado ou já está chegando."],
  [[1, 12], "movimento e conversa", "O dinamismo e a comunicação juntos. Uma notícia traz uma conversa importante."],
  [[4, 18], "lar e lealdade", "Casa e Cão juntos reforçam segurança, pertencimento e laços confiáveis no ambiente doméstico."],
  [[35, 4], "estabilidade e raízes", "Âncora e Casa juntos reforçam a solidez de uma fundação. O que está construído é real."],
  [[5, 35], "raízes e persistência", "Árvore e Âncora: duas cartas de enraizamento que juntas falam de um processo lento, profundo e duradouro."],
  [[8, 17], "transformação e renovação", "O fim abre espaço para a chegada. Caixão e Cegonha juntos formam a sequência clássica de encerramento e renovação."],
];

// ─── Domain detection ──────────────────────────────────────────────────────────

export function detectDomain(question: string, selectedCategory: Category): Category {
  if (selectedCategory && selectedCategory !== "geral") return selectedCategory;
  const q = question.toLowerCase();
  if (/(amor|relacionamento|sentimento|parceiro|parceira|casamento|namoro|paixão|afeto)/.test(q)) return "amor";
  if (/(trabalho|emprego|carreira|profissional|cargo|empresa|chefe|projeto profissional|área)/.test(q)) return "trabalho";
  if (/(dinheiro|financeiro|finanças|renda|recursos|investimento|dívida|ganho|lucro)/.test(q)) return "dinheiro";
  if (/(família|familiar|pai|mãe|filho|filha|irmão|irmã|parente)/.test(q)) return "familia";
  if (/(projeto|empreendimento|negócio|startup|produto|serviço|lançamento)/.test(q)) return "projetos";
  if (/(pessoal|crescimento|desenvolvimento|autoconhecimento|emoção|interior)/.test(q)) return "pessoal";
  return "geral";
}

const DOMAIN_LABELS: Record<Category, string> = {
  amor: "afetivo e relacional",
  trabalho: "profissional e de carreira",
  dinheiro: "financeiro e de recursos",
  familia: "familiar e doméstico",
  geral: "geral",
  pessoal: "de desenvolvimento pessoal",
  projetos: "de projeto e criação"
};

// ─── Modifier detection ────────────────────────────────────────────────────────

function detectModifierEffects(cards: LenormandCard[]): Map<number, ModifierEffect[]> {
  const effectMap = new Map<number, ModifierEffect[]>();
  cards.forEach((c) => { effectMap.set(c.id, []); });

  cards.forEach((card, i) => {
    if (!card.isModifier || !card.modifierType) return;
    // Affect immediate neighbors
    const neighbors = [cards[i - 1], cards[i + 1]].filter(Boolean);
    neighbors.forEach((neighbor) => {
      const existing = effectMap.get(neighbor.id) ?? [];
      existing.push({
        modifierCard: card,
        effect: card.modifierEffect,
        type: card.modifierType as string,
      });
      effectMap.set(neighbor.id, existing);
    });
  });

  return effectMap;
}

// ─── Contextual interpretation ────────────────────────────────────────────────

function getContextualInterpretation(
  card: LenormandCard,
  domain: Category,
  position: SpreadPosition,
  modifiers: ModifierEffect[]
): string {
  const base = card.interpretations[domain] || card.interpretations.geral;
  let result = base;

  if (modifiers.length > 0) {
    const modParts = modifiers.map((m) => {
      if (m.type === "confuse") return `A presença próxima de ${m.modifierCard.name} introduz um elemento de ${m.effect.split("—")[0].toLowerCase().trim()}.`;
      if (m.type === "clarify") return `A influência de ${m.modifierCard.name} expande e ilumina esse tema.`;
      if (m.type === "block") return `${m.modifierCard.name} próxima sugere resistência ou atraso nesse aspecto.`;
      if (m.type === "diminish") return `A presença de ${m.modifierCard.name} indica desgaste ou erosão desse tema.`;
      if (m.type === "open") return `${m.modifierCard.name} sugere que uma solução ou abertura está disponível aqui.`;
      if (m.type === "cut") return `A influência de ${m.modifierCard.name} pode indicar uma decisão ou corte relacionado a esse aspecto.`;
      if (m.type === "amplify") return `${m.modifierCard.name} intensifica esse tema, dando-lhe maior peso.`;
      return "";
    }).filter(Boolean);
    if (modParts.length > 0) result += " " + modParts.join(" ");
  }

  return result;
}

function getPositionalNarrative(card: LenormandCard, position: SpreadPosition, domain: Category): string {
  const role = position.role;
  if (role === "contexto") return `Como contexto da situação ${domain !== "geral" ? `no campo ${DOMAIN_LABELS[domain]}` : ""}, ${card.name} estabelece: ${card.roles.situacao}`;
  if (role === "influencia") return `Como força que influencia a questão, ${card.name} traz: ${card.roles.acao}`;
  if (role === "obstaculo") return `Na posição de desafio, ${card.name} indica: ${card.roles.obstaculo}`;
  if (role === "tendencia") return `Como tendência simbólica, ${card.name} aponta para: ${card.roles.tendencia}`;
  if (role === "centro") return `No núcleo da questão, ${card.name} representa: ${card.meaning}`;
  if (role === "oportunidade") return `Como abertura possível, ${card.name} sugere: ${card.roles.oportunidade}`;
  if (role === "conselho") return `Como orientação simbólica, ${card.name} aconselha: ${card.roles.conselho}`;
  if (role === "mensagem") return `A mensagem do dia através de ${card.name}: ${card.roles.estado}`;
  return `${card.name} nesta posição: ${card.meaning}`;
}

// ─── Adjacent combinations ────────────────────────────────────────────────────

function analyzeAdjacentCombinations(cards: LenormandCard[]): CombinationResult[] {
  const results: CombinationResult[] = [];

  for (let i = 0; i < cards.length - 1; i++) {
    const a = cards[i];
    const b = cards[i + 1];

    // Check specific pair meaning
    const specificMeaning = a.pairMeanings[b.id] || b.pairMeanings[a.id];

    // Check if it's a conflict pair
    const conflictPair = CONFLICT_PAIRS.find(
      ([x, y]) => (x === a.id && y === b.id) || (x === b.id && y === a.id)
    );

    // Check modifier relationship
    const isModification = a.isModifier || b.isModifier;

    // Check reinforcement
    const reinforcePair = REINFORCEMENT_PAIRS.find(([ids]) =>
      ids.includes(a.id) && ids.includes(b.id)
    );

    // Check movement/block
    const isMovement = MOVEMENT_CARDS.has(a.id) && MOVEMENT_CARDS.has(b.id);
    const isBlocked = MOVEMENT_CARDS.has(a.id) && OBSTACLE_CARDS.has(b.id);
    const isCommunication = COMMUNICATION_CARDS.has(a.id) && COMMUNICATION_CARDS.has(b.id);

    let type: CombinationResult["type"] = "sequência";
    let meaning = specificMeaning || `${a.name} e ${b.name} juntas criam uma dinâmica de ${a.keywords[0]} e ${b.keywords[0]}.`;
    let significance: CombinationResult["significance"] = "baixa";

    if (reinforcePair) {
      type = "reforço";
      meaning = reinforcePair[2];
      significance = "alta";
    } else if (conflictPair) {
      type = "conflito";
      meaning = conflictPair[2];
      significance = "alta";
    } else if (isModification) {
      type = "modificação";
      const modifier = a.isModifier ? a : b;
      const target = a.isModifier ? b : a;
      meaning = `${modifier.name} modifica ${target.name}: ${modifier.modifierEffect}`;
      significance = "alta";
    } else if (specificMeaning) {
      type = "sequência";
      meaning = specificMeaning;
      significance = "média";
    } else if (isBlocked) {
      type = "bloqueio";
      meaning = `${a.name} impulsiona movimento, mas ${b.name} introduz resistência. A energia de avanço encontra um freio.`;
      significance = "média";
    } else if (isCommunication) {
      type = "comunicação";
      meaning = `Duas cartas de comunicação juntas reforçam que algo importante está para ser dito, ouvido ou recebido.`;
      significance = "média";
    } else if (isMovement) {
      type = "movimento";
      meaning = `Duas cartas de movimento juntas amplificam a energia de mudança e dinamismo na sequência.`;
      significance = "baixa";
    }

    results.push({ cardA: a, cardB: b, indexA: i, indexB: i + 1, type, meaning, significance });
  }

  return results;
}

// ─── Non-adjacent conflicts ────────────────────────────────────────────────────

function detectConflicts(cards: LenormandCard[]): ConflictResult[] {
  const results: ConflictResult[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 2; j < cards.length; j++) { // skip adjacent (already covered)
      const a = cards[i];
      const b = cards[j];
      const key = `${Math.min(a.id, b.id)}-${Math.max(a.id, b.id)}`;
      if (seen.has(key)) continue;

      const conflictDef = CONFLICT_PAIRS.find(
        ([x, y]) => (x === a.id && y === b.id) || (x === b.id && y === a.id)
      );
      if (conflictDef) {
        seen.add(key);
        results.push({
          cardA: cards.find(c => c.id === conflictDef[0])!,
          cardB: cards.find(c => c.id === conflictDef[1])!,
          tension: conflictDef[2],
          resolution: conflictDef[3],
        });
      }

      // Also check built-in conflict arrays
      if (a.conflicts.includes(b.id) || b.conflicts.includes(a.id)) {
        if (!seen.has(key)) {
          seen.add(key);
          results.push({
            cardA: a,
            cardB: b,
            tension: `${a.name} e ${b.name} apresentam energias em tensão: ${a.keywords[0]} versus ${b.keywords[0]}.`,
            resolution: `Considere como essas forças opostas convivem na sua questão — a tensão pode ser informativa.`,
          });
        }
      }
    }
  }

  return results.slice(0, 3); // limit for readability
}

// ─── Reinforcements ────────────────────────────────────────────────────────────

function detectReinforcements(cards: LenormandCard[]): ReinforcementResult[] {
  const results: ReinforcementResult[] = [];
  const cardIds = new Set(cards.map(c => c.id));

  for (const [ids, theme, meaning] of REINFORCEMENT_PAIRS) {
    if (ids.every(id => cardIds.has(id))) {
      const reinforcingCards = ids.map(id => CARDS.find(c => c.id === id)!).filter(Boolean);
      results.push({ cards: reinforcingCards, theme, meaning });
    }
  }

  return results;
}

// ─── Pattern analysis ──────────────────────────────────────────────────────────

function analyzePatterns(cards: LenormandCard[]): PatternAnalysis {
  const movementCards = cards.filter(c => MOVEMENT_CARDS.has(c.id));
  const stabilityCards = cards.filter(c => STABILITY_CARDS.has(c.id));
  const communicationCards = cards.filter(c => COMMUNICATION_CARDS.has(c.id));
  const transformationCards = cards.filter(c => TRANSFORMATION_CARDS.has(c.id));
  const emotionCards = cards.filter(c => EMOTION_CARDS.has(c.id));
  const obstacleCards = cards.filter(c => OBSTACLE_CARDS.has(c.id));
  const opportunityCards = cards.filter(c => OPPORTUNITY_CARDS.has(c.id));

  // Theme breakdown from card themes
  const themeBreakdown: Record<string, number> = {};
  cards.forEach(card => {
    card.themes.forEach(t => {
      themeBreakdown[t] = (themeBreakdown[t] ?? 0) + 1;
    });
  });

  // Find dominant theme
  const sortedThemes = Object.entries(themeBreakdown).sort((a, b) => b[1] - a[1]);
  const dominantTheme = sortedThemes[0]?.[0] ?? "geral";

  // Map raw theme to readable label
  const themeLabels: Record<string, string> = {
    movimento: "movimento e mudança",
    estabilidade: "estabilidade e permanência",
    comunicação: "comunicação e troca",
    transformação: "transformação e encerramento",
    emoção: "emoção e sentimento",
    recurso: "recursos e abundância",
    escolha: "decisão e escolha",
    obstáculo: "obstáculos e resistências",
    oportunidade: "oportunidades e aberturas",
    relacionamento: "relacionamentos e vínculos",
  };
  const dominantThemeLabel = themeLabels[dominantTheme] ?? dominantTheme;

  // Determine narrative flow
  let narrativeFlow: PatternAnalysis["narrativeFlow"] = "estabilidade";
  const totalTransformation = transformationCards.length;
  const totalMovement = movementCards.length;
  const totalObstacle = obstacleCards.length;
  const totalOpportunity = opportunityCards.length;

  if (totalObstacle >= 2) narrativeFlow = "tensão";
  else if (totalTransformation >= 2) narrativeFlow = "transformação";
  else if (totalMovement >= 2) narrativeFlow = "avanço";
  else if (cards.some(c => c.id === 22)) narrativeFlow = "decisão";
  else if (cards.some(c => c.id === 8 || c.id === 10)) narrativeFlow = "encerramento";
  else if (totalOpportunity >= 2) narrativeFlow = "avanço";
  else if (stabilityCards.length >= 2) narrativeFlow = "estabilidade";

  // Predominance label
  const predominanceMap: Record<PatternAnalysis["narrativeFlow"], string> = {
    avanço: "de expansão e movimento",
    estabilidade: "de estabilidade e consolidação",
    transformação: "de transformação profunda",
    espera: "de pausa e reflexão",
    decisão: "de decisão iminente",
    encerramento: "de encerramento de ciclos",
    reorganização: "de reorganização e ajuste",
    tensão: "de tensão e desafio",
  };
  const predominance = predominanceMap[narrativeFlow];

  return {
    dominantTheme,
    dominantThemeLabel,
    themeBreakdown,
    movementCards,
    stabilityCards,
    communicationCards,
    transformationCards,
    emotionCards,
    predominance,
    narrativeFlow,
  };
}

// ─── Narrative generation ─────────────────────────────────────────────────────

function buildNarrative(
  cards: LenormandCard[],
  positions: SpreadPosition[],
  domain: Category,
  combinations: CombinationResult[],
  patterns: PatternAnalysis,
  question: string
): string {
  if (cards.length === 1) {
    const c = cards[0];
    return `A carta ${c.name} emerge como mensagem do momento. ${c.meaning} No contexto ${DOMAIN_LABELS[domain]}, a leitura sugere: ${c.interpretations[domain] ?? c.interpretations.geral} As palavras-chave ${c.keywords.slice(0, 3).join(", ")} descrevem o que pede atenção agora.`;
  }

  const first = cards[0];
  const last = cards[cards.length - 1];
  const middle = cards.length > 2 ? cards[Math.floor(cards.length / 2)] : null;

  // Opening
  let narrative = `A leitura começa com ${first.name}, que estabelece o contexto no campo ${DOMAIN_LABELS[domain]}: ${first.interpretations[domain] ?? first.interpretations.geral}`;

  // Middle development
  if (middle && middle.id !== first.id && middle.id !== last.id) {
    narrative += ` À medida que a sequência avança, ${middle.name} introduz o elemento central da questão — ${middle.meaning.toLowerCase()}`;
  }

  // Combinations in narrative
  const highCombos = combinations.filter(c => c.significance === "alta").slice(0, 2);
  if (highCombos.length > 0) {
    narrative += ` Entre as cartas, destacam-se relações importantes: ${highCombos.map(c => `${c.cardA.name} e ${c.cardB.name} juntas ${c.type === "reforço" ? "convergem" : c.type === "conflito" ? "criam tensão" : "se relacionam"} — ${c.meaning}`).join("; ")}.`;
  }

  // Closing
  narrative += ` Por fim, ${last.name} aponta a tendência simbólica da situação: ${last.roles.tendencia}`;

  // Pattern comment
  narrative += ` No conjunto, a tiragem apresenta uma predominância ${patterns.predominance}, sugerindo que a questão "${question.length > 50 ? question.substring(0, 50) + "..." : question}" tem uma dimensão de ${patterns.dominantThemeLabel} como elemento mais presente.`;

  return narrative;
}

// ─── Synthesis generation ─────────────────────────────────────────────────────

function buildSynthesis(
  cards: LenormandCard[],
  domain: Category,
  patterns: PatternAnalysis,
  conflicts: ConflictResult[],
  reinforcements: ReinforcementResult[],
  narrativeFlow: PatternAnalysis["narrativeFlow"]
): string {
  const flowDescriptions: Record<PatternAnalysis["narrativeFlow"], string> = {
    avanço: "O conjunto sugere uma energia de avanço e movimento. A situação aponta para progresso, mas a forma como se avança importa tanto quanto o destino.",
    estabilidade: "O conjunto sugere estabilidade e consolidação. A situação pede atenção ao que já foi construído, valorizando o que existe antes de expandir.",
    transformação: "O conjunto revela uma transformação em curso ou iminente. Algo está se encerrando para que outro possa começar — e essa transição é parte essencial do processo.",
    espera: "O conjunto sugere um período de pausa necessária. A situação pede observação antes de ação, e essa espera não é inércia — é parte do desenvolvimento.",
    decisão: "O conjunto aponta para uma encruzilhada. Uma decisão precisa ser tomada, e adiá-la pode ser mais custoso do que escolher um caminho.",
    encerramento: "O conjunto indica que algo está chegando ao fim. Esse encerramento, mesmo que difícil, abre espaço para o que vem a seguir.",
    reorganização: "O conjunto sugere reorganização. A situação pede uma reformulação antes que o próximo ciclo possa começar com clareza.",
    tensão: "O conjunto revela uma tensão significativa. Forças opostas estão atuando simultaneamente — e reconhecer esse conflito é o primeiro passo para navegar com consciência.",
  };

  let synthesis = flowDescriptions[narrativeFlow];

  if (reinforcements.length > 0) {
    synthesis += ` Há convergência simbólica em torno de ${reinforcements[0].theme}: ${reinforcements[0].meaning}`;
  }

  if (conflicts.length > 0) {
    synthesis += ` Ao mesmo tempo, existe uma tensão importante: ${conflicts[0].tension} Para navegar esse aspecto: ${conflicts[0].resolution}`;
  }

  return synthesis;
}

// ─── Insights generation ─────────────────────────────────────────────────────

function buildInsights(
  cards: LenormandCard[],
  domain: Category,
  combinations: CombinationResult[],
  conflicts: ConflictResult[],
  patterns: PatternAnalysis,
  reinforcements: ReinforcementResult[]
): InsightResult {
  // Dominant theme
  const dominantTheme = `O tema de ${patterns.dominantThemeLabel} aparece com maior força nesta tiragem.`;

  // Main tension
  const mainTension = conflicts.length > 0
    ? conflicts[0].tension
    : (patterns.obstacleCount ?? 0) > 0
    ? `Há cartas que indicam resistência ou desgaste, criando atrito no desenvolvimento da situação.`
    : `Não há tensão simbólica evidente — a tiragem apresenta relativa coerência temática.`;

  // Main opportunity
  const oppCard = cards.find(c => OPPORTUNITY_CARDS.has(c.id));
  const mainOpportunity = reinforcements.length > 0
    ? `A convergência simbólica de ${reinforcements[0].theme} representa a principal abertura desta leitura.`
    : oppCard
    ? `${oppCard.name} representa a principal abertura: ${oppCard.roles.oportunidade}`
    : `A tiragem não apresenta uma abertura simbólica dominante, mas o potencial está nas cartas de ${patterns.dominantThemeLabel}.`;

  // Main obstacle
  const obsCard = cards.find(c => OBSTACLE_CARDS.has(c.id));
  const mainObstacle = obsCard
    ? `${obsCard.name} representa o principal obstáculo simbólico: ${obsCard.roles.obstaculo}`
    : `Não há um obstáculo simbólico dominante nesta tiragem.`;

  // Movement direction
  const movDir: Record<PatternAnalysis["narrativeFlow"], string> = {
    avanço: "A narrativa sugere avanço. A energia está em movimento.",
    estabilidade: "A narrativa sugere consolidação. O momento pede valorizar o que existe.",
    transformação: "A narrativa sugere transformação. Algo está mudando de forma profunda.",
    espera: "A narrativa sugere espera consciente. Agir antes da hora pode ser contraproducente.",
    decisão: "A narrativa pede uma decisão. O caminho se abre no momento em que se escolhe.",
    encerramento: "A narrativa indica encerramento. Deixar ir é o movimento necessário.",
    reorganização: "A narrativa sugere reorganização. Antes de avançar, reorganize.",
    tensão: "A narrativa revela tensão. Reconhecer o conflito é o primeiro passo para navegá-lo.",
  };
  const movementDirection = movDir[patterns.narrativeFlow];

  // Symbolic advice — derived from the central card or key combination
  const centerCard = cards[Math.floor(cards.length / 2)];
  const symbolicAdvice = `Simbolicamente, ${centerCard.name} ocupa um papel central nesta leitura. ${centerCard.roles.conselho}`;

  return { dominantTheme, mainTension, mainOpportunity, mainObstacle, movementDirection, symbolicAdvice };
}

// ─── Reflection ────────────────────────────────────────────────────────────────

function pickReflection(cards: LenormandCard[], domain: Category): string {
  const allReflections = cards.flatMap(c => c.reflections);
  if (allReflections.length === 0) return "O que essa leitura está te revelando que você ainda não tinha visto?";
  const idx = cards.reduce((acc, c) => acc + c.id, 0) % allReflections.length;
  return allReflections[idx];
}

// ─── Main engine entry point ───────────────────────────────────────────────────

export function interpret(
  cards: LenormandCard[],
  positions: SpreadPosition[],
  question: string,
  selectedCategory: Category,
  depth: ReadingDepth = "completa"
): ReadingAnalysis {
  const domain = detectDomain(question, selectedCategory);
  const domainLabel = DOMAIN_LABELS[domain];

  // Modifier map
  const modifierMap = detectModifierEffects(cards);

  // Card-level analysis
  const cardAnalyses: CardAnalysis[] = cards.map((card, i) => {
    const position = positions[i] ?? { name: `Carta ${i + 1}`, role: "geral", description: "" };
    const modifiers = modifierMap.get(card.id) ?? [];
    return {
      card,
      position,
      index: i,
      contextualInterpretation: getContextualInterpretation(card, domain, position, modifiers),
      positionalRole: getPositionalNarrative(card, position, domain),
      modifiedBy: modifiers,
      narrative: getPositionalNarrative(card, position, domain),
    };
  });

  // Combinations, conflicts, reinforcements
  const adjacentCombinations = analyzeAdjacentCombinations(cards);
  const conflicts = detectConflicts(cards);
  const reinforcements = detectReinforcements(cards);

  // Patterns
  const patterns = analyzePatterns(cards) as PatternAnalysis & { obstacleCount?: number };
  patterns.obstacleCount = cards.filter(c => OBSTACLE_CARDS.has(c.id)).length;

  // Narrative and synthesis
  const narrative = buildNarrative(cards, positions, domain, adjacentCombinations, patterns, question);
  const synthesis = buildSynthesis(cards, domain, patterns, conflicts, reinforcements, patterns.narrativeFlow);
  const insights = buildInsights(cards, domain, adjacentCombinations, conflicts, patterns, reinforcements);
  const reflection = pickReflection(cards, domain);

  return {
    domain,
    domainLabel,
    question,
    depth,
    cardAnalyses,
    adjacentCombinations,
    conflicts,
    reinforcements,
    patterns,
    synthesis,
    narrative,
    insights,
    reflection,
    disclaimer: "O Oráculo é uma ferramenta simbólica de reflexão e entretenimento. As interpretações não substituem orientação profissional, médica, jurídica ou financeira.",
  };
}

// Extend PatternAnalysis type with obstacleCount used internally
declare module "./interpreter" {
  interface PatternAnalysis {
    obstacleCount?: number;
  }
}

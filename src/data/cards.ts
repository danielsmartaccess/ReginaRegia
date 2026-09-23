// ─── Types ────────────────────────────────────────────────────────────────────

export type ThemeCategory =
  | "movimento"
  | "estabilidade"
  | "comunicação"
  | "transformação"
  | "emoção"
  | "recurso"
  | "pessoa"
  | "obstáculo"
  | "oportunidade"
  | "decisão"
  | "relacionamento";

export type ModifierType =
  | "clarify"   // Sol, Estrelas — amplia clareza
  | "confuse"   // Nuvens — obscurece
  | "amplify"   // Urso — intensifica
  | "block"     // Montanha — bloqueia
  | "accelerate"// Cavaleiro — acelera
  | "diminish"  // Ratos — desgasta/corrói
  | "cut"       // Foice — corta/encerra
  | "open"      // Chave — abre/soluciona
  | "reveal"    // Livro — revela oculto
  | null;

export interface LenormandCard {
  id: number;
  name: string;
  symbol: string;
  themes: string[];              // e.g. ["movimento", "comunicação", "notícia"]
  categories: ThemeCategory[];   // semantic categories
  keywords: string[];
  meaning: string;               // core meaning (1 sentence)
  constructive: string;
  challenging: string;
  // Modifier behaviour — how this card transforms adjacent cards
  isModifier: boolean;
  modifierType: ModifierType;
  modifierEffect: string;        // description of the modification
  // Multi-domain interpretations
  interpretations: {
    amor: string;
    trabalho: string;
    dinheiro: string;
    familia: string;
    geral: string;
    pessoal: string;
    projetos: string;
  };
  // Multi-role interpretations
  roles: {
    pessoa: string;
    situacao: string;
    acao: string;
    estado: string;
    obstaculo: string;
    oportunidade: string;
    conselho: string;
    tendencia: string;
  };
  // Relational data
  conflicts: number[];           // card IDs that create symbolic tension
  reinforces: number[];          // card IDs that reinforce this card's theme
  pairMeanings: Record<number, string>; // specific combination meanings
  reflections: string[];
}

// ─── The 36 Cards ────────────────────────────────────────────────────────────

export const CARDS: LenormandCard[] = [
  {
    id: 1,
    name: "Cavaleiro",
    symbol: "♞",
    themes: ["movimento", "velocidade", "notícia", "aproximação"],
    categories: ["movimento", "comunicação"],
    keywords: ["notícias", "movimento", "mensagem", "velocidade", "aproximação"],
    meaning: "O Cavaleiro anuncia o que está chegando — notícias, pessoas, situações em trânsito.",
    constructive: "Chegada de boas notícias, impulso positivo, agilidade em situações estagnadas.",
    challenging: "Precipitação, ação impulsiva sem reflexão, notícias que chegam na hora errada.",
    isModifier: true,
    modifierType: "accelerate",
    modifierEffect: "Acelera o tema da carta adjacente — o que estiver próximo se manifesta com rapidez.",
    interpretations: {
      amor: "Uma nova presença pode surgir no horizonte afetivo, ou notícias chegam sobre alguém que importa. Algo que estava parado pode se mover.",
      trabalho: "Propostas e novidades profissionais se aproximam. Um contato novo, uma oportunidade em trânsito ou o retorno de um projeto.",
      dinheiro: "Movimento financeiro em curso. Uma entrada ou saída inesperada pode estar a caminho.",
      familia: "Notícias familiares chegam. Um familiar distante pode entrar em contato ou visitar.",
      geral: "As cartas sugerem que algo novo está chegando. O momento pede atenção ao que se aproxima.",
      pessoal: "Uma ideia ou impulso novo emerge. A energia sugere movimento e iniciativa.",
      projetos: "O projeto pode avançar rapidamente. Um novo desenvolvimento ou oportunidade está próximo."
    },
    roles: {
      pessoa: "Uma pessoa que traz novidades, um mensageiro, alguém jovem e em movimento.",
      situacao: "Uma situação em desenvolvimento rápido, algo que ainda está chegando.",
      acao: "Agir com agilidade, aproveitar o momento presente antes que passe.",
      estado: "Estado de expectativa e antecipação, aguardando o que está por vir.",
      obstaculo: "Impaciência, ação precipitada, não dar tempo ao tempo.",
      oportunidade: "O momento certo para agir está próximo. O que vem pode abrir portas.",
      conselho: "Esteja atento ao que se aproxima. Não bloqueie o que está chegando.",
      tendencia: "A situação tende a se mover rapidamente. Desenvolvimento acelerado."
    },
    conflicts: [21, 35], // Montanha (bloqueia), Âncora (estabilidade vs movimento)
    reinforces: [3, 17, 22], // Navio, Cegonha, Caminhos
    pairMeanings: {
      21: "O movimento encontra resistência. Um avanço esperado pode ser adiado por obstáculo.",
      27: "Notícia chegando por mensagem, carta ou comunicação escrita.",
      16: "Boas notícias chegam com clareza e impacto positivo.",
      6: "Notícias chegam, mas há confusão ou falta de clareza sobre seu conteúdo.",
      8: "Uma notícia que encerra um ciclo, ou novidade sobre algo que está terminando.",
      17: "Chegada de uma mudança ou nova fase — algo está se transformando.",
      14: "Mensagem ou pessoa que pode não ser o que parece.",
      24: "Uma novidade afetiva se aproxima. Sentimentos chegando.",
      3: "Notícias de longe, de um projeto ou situação que ainda está distante.",
      33: "A resposta que se esperava finalmente chega."
    },
    reflections: [
      "O que você está esperando receber que ainda não chegou?",
      "Que novidade, ao chegar, mudaria sua direção atual?"
    ]
  },
  {
    id: 2,
    name: "Trevo",
    symbol: "♣",
    themes: ["sorte", "oportunidade", "leveza", "acaso", "pequenas graças"],
    categories: ["oportunidade"],
    keywords: ["sorte", "oportunidade", "leveza", "acaso", "momento favorável"],
    meaning: "O Trevo representa pequenas sortes e oportunidades que surgem de forma casual no cotidiano.",
    constructive: "Pequenas graças, sorte nos detalhes, leveza para atravessar momentos difíceis.",
    challenging: "Oportunidades que passam rápido, sorte superficial que não sustenta grandes projetos.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um encontro leve e agradável. Alegria inesperada em conexões afetivas.",
      trabalho: "Pequenas oportunidades surgem. Vale observar o que aparece de forma casual.",
      dinheiro: "Uma entrada modesta pode ocorrer. A sorte favorece quem está atento aos detalhes.",
      familia: "Um momento de alegria e leveza no ambiente familiar.",
      geral: "As cartas sugerem uma janela de leveza. Aproveite o que se apresenta.",
      pessoal: "Um alívio inesperado. A vida oferece uma respiração neste momento.",
      projetos: "Uma oportunidade casual pode impulsionar o projeto de forma inesperada."
    },
    roles: {
      pessoa: "Uma pessoa despreocupada, afortunada, que traz leveza ao ambiente.",
      situacao: "Uma situação que se resolve de forma inesperada e favorável.",
      acao: "Aproveitar o acaso, estar aberto a oportunidades não planejadas.",
      estado: "Estado de leveza, graça e abertura ao que o momento oferece.",
      obstaculo: "Dependência excessiva do acaso, falta de esforço consistente.",
      oportunidade: "O acaso favorece agora. Uma pequena abertura pode ser o início de algo maior.",
      conselho: "Não ignore o que aparece de forma casual. Às vezes a sorte se apresenta sem aviso.",
      tendencia: "A situação tende a melhorar gradualmente com pequenos favorecimentos."
    },
    conflicts: [23, 21], // Ratos (desgaste vs sorte), Montanha (obstáculo vs leveza)
    reinforces: [31, 9, 16], // Sol, Buquê, Estrelas
    pairMeanings: {
      31: "Período especialmente favorável. A sorte é amplificada pela clareza.",
      6: "A sorte existe, mas está obscurecida por dúvidas ou confusão.",
      21: "Uma oportunidade bloqueada por um obstáculo.",
      9: "Momento de alegria e presenteação. Gratidão e beleza.",
      16: "Sorte com direcionamento claro."
    },
    reflections: [
      "Que pequena graça você tem negligenciado reconhecer?",
      "Onde a leveza pode abrir o que a seriedade fecha?"
    ]
  },
  {
    id: 3,
    name: "Navio",
    symbol: "⛵",
    themes: ["distância", "viagem", "expansão", "comércio", "horizonte"],
    categories: ["movimento"],
    keywords: ["viagem", "distância", "comércio", "expansão", "horizonte"],
    meaning: "O Navio representa deslocamentos, o que vem de longe e o desejo de expandir além do familiar.",
    constructive: "Viagens frutíferas, expansão de horizontes, trocas favoráveis e abertura ao novo.",
    challenging: "Distância emocional, saudade, projetos que demoram mais do que o esperado.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Uma relação à distância, alguém que chega de outro lugar, ou um amor que precisa de espaço para crescer.",
      trabalho: "Projetos com alcance amplo, trabalho com o exterior, expansão de negócios.",
      dinheiro: "Recursos vindos de fontes distantes, investimentos de longo prazo, negócios internacionais.",
      familia: "Um familiar distante, mudança para outra cidade ou país, laços que atravessam distâncias.",
      geral: "As cartas apontam para expansão. Algo além do familiar pede sua atenção.",
      pessoal: "Um desejo de ir além do familiar. A busca por novos horizontes é legítima.",
      projetos: "O projeto tem potencial de alcance maior do que o atual. Pense em expansão."
    },
    roles: {
      pessoa: "Uma pessoa que veio de longe ou que está de passagem. Alguém com espírito viajante.",
      situacao: "Uma situação que envolve distância, viagem ou expansão.",
      acao: "Partir, expandir, buscar o que está além do horizonte conhecido.",
      estado: "Estado de anseio, saudade ou desejo de movimento.",
      obstaculo: "A distância como barreira para o que se quer.",
      oportunidade: "O que está longe pode ser exatamente o que se precisa.",
      conselho: "Considere expandir. O que está além do familiar pode ser valioso.",
      tendencia: "A situação tende a se expandir ou a envolver distâncias maiores."
    },
    conflicts: [4, 35], // Casa (raízes vs movimento), Âncora (permanência vs viagem)
    reinforces: [1, 17, 22], // Cavaleiro, Cegonha, Caminhos
    pairMeanings: {
      4: "Conflito entre partir e permanecer. A tensão entre raízes e movimento.",
      22: "A escolha envolve partir ou ficar. Um caminho distante se apresenta.",
      35: "Uma viagem com propósito e destino certo. Expansão com base sólida.",
      21: "O caminho está bloqueado. A expansão encontra resistência.",
      33: "A jornada tem uma solução ou destino claro.",
      1: "Notícias chegam de longe. Movimento acelerado em direção a algo distante."
    },
    reflections: [
      "Para onde você quer ir que ainda não foi?",
      "O que o distante representa para você — fuga ou descoberta?"
    ]
  },
  {
    id: 4,
    name: "Casa",
    symbol: "⌂",
    themes: ["lar", "família", "segurança", "raízes", "privacidade"],
    categories: ["estabilidade", "relacionamento"],
    keywords: ["lar", "família", "segurança", "raízes", "pertencimento"],
    meaning: "A Casa representa o lar, a família, o espaço íntimo e a segurança das raízes.",
    constructive: "Estabilidade doméstica, apoio familiar, senso de pertencimento e proteção.",
    challenging: "Conflitos no lar, dificuldades em se sentir em casa, apego excessivo ao familiar.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor que busca construir algo sólido. Pode indicar convivência ou vida compartilhada.",
      trabalho: "O ambiente de trabalho que se torna como um segundo lar, ou questões envolvendo espaço físico.",
      dinheiro: "Investimentos ou gastos relacionados ao lar. Imóveis podem estar em pauta.",
      familia: "O núcleo familiar está em foco. Relações domésticas e de pertencimento.",
      geral: "As cartas sugerem atenção ao ambiente próximo. O que está em volta é parte da resposta.",
      pessoal: "A necessidade de um espaço seguro para ser quem você é.",
      projetos: "Um projeto que precisa de base sólida para funcionar. Estrutura antes de expansão."
    },
    roles: {
      pessoa: "Uma pessoa do lar, um familiar, alguém que representa segurança e acolhimento.",
      situacao: "Uma situação doméstica ou familiar que está em foco.",
      acao: "Cuidar do lar, fortalecer laços familiares, construir bases seguras.",
      estado: "Estado de pertencimento, segurança ou necessidade de acolhimento.",
      obstaculo: "Excesso de apego ao familiar que impede o crescimento.",
      oportunidade: "O lar como fonte de força. O apoio familiar como recurso.",
      conselho: "Cuide das bases. A segurança interior é o ponto de partida.",
      tendencia: "A situação tende a se estabilizar em torno do ambiente familiar."
    },
    conflicts: [3, 19], // Navio (movimento vs lar), Torre (isolamento vs família)
    reinforces: [18, 30, 5], // Cão, Lírios, Árvore
    pairMeanings: {
      18: "Lar harmonioso, lealdade e proteção no ambiente familiar.",
      8: "Mudança no lar, fim de um ciclo doméstico.",
      17: "Uma mudança importante no ambiente doméstico.",
      7: "Conflito ou situação complexa dentro do lar.",
      30: "Paz e harmonia no ambiente familiar.",
      3: "Tensão entre permanecer e partir. O lar como âncora versus a chamada do horizonte."
    },
    reflections: [
      "O que faz um lugar sentir como lar para você?",
      "Que aspecto da sua vida precisa de mais segurança e acolhimento?"
    ]
  },
  {
    id: 5,
    name: "Árvore",
    symbol: "✦",
    themes: ["saúde", "crescimento", "raízes", "tempo", "enraizamento"],
    categories: ["estabilidade", "oportunidade"],
    keywords: ["saúde", "raízes", "crescimento", "tempo", "vitalidade"],
    meaning: "A Árvore simboliza a saúde, o crescimento lento e profundo, e as raízes que sustentam.",
    constructive: "Saúde fortalecida, crescimento orgânico e sustentável, conexão com as origens.",
    challenging: "Processos lentos, questões de saúde que precisam de atenção, estagnação disfarçada de estabilidade.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um relacionamento com raízes profundas. Lento, mas sólido e com potencial real.",
      trabalho: "Projetos que exigem paciência. O crescimento vem com constância, não com pressa.",
      dinheiro: "Finanças que se desenvolvem gradualmente. Investimentos de longo prazo são favorecidos.",
      familia: "Raízes familiares sólidas. A linhagem e a tradição têm papel importante.",
      geral: "As cartas sugerem um processo em desenvolvimento. O tempo é parte essencial da resposta.",
      pessoal: "Algo cresce em você que ainda não é visível. Confie no processo.",
      projetos: "O projeto requer paciência e raízes sólidas. Crescimento sustentável."
    },
    roles: {
      pessoa: "Uma pessoa enraizada, saudável, com forte senso de identidade.",
      situacao: "Uma situação que se desenvolve devagar mas de forma sólida.",
      acao: "Crescer com paciência, cultivar o que precisa de tempo.",
      estado: "Estado de enraizamento, saúde, ou processo lento mas estável.",
      obstaculo: "Lentidão excessiva, resistência ao crescimento necessário.",
      oportunidade: "O que foi cultivado com paciência começa a dar frutos.",
      conselho: "Seja paciente com o que está crescendo. Raízes profundas sustentam mais.",
      tendencia: "A situação tende a se desenvolver lentamente mas de forma sólida."
    },
    conflicts: [8, 10], // Caixão (fim vs crescimento), Foice (corte vs enraizamento)
    reinforces: [4, 30, 35], // Casa, Lírios, Âncora
    pairMeanings: {
      31: "Saúde em alta, vitalidade e clareza sobre o caminho de crescimento.",
      8: "Fim de um ciclo de saúde ou encerramento de algo que estava enraizado.",
      6: "Incerteza sobre saúde ou crescimento que não avança com clareza.",
      23: "Algo corrói as raízes. Atenção ao que está desgastando o que foi construído.",
      33: "A saúde ou o crescimento encontra sua solução."
    },
    reflections: [
      "O que você está cultivando que pede paciência?",
      "Que raiz sua precisa de cuidado antes de continuar crescendo?"
    ]
  },
  {
    id: 6,
    name: "Nuvens",
    symbol: "☁",
    themes: ["confusão", "dúvida", "obscuridade", "incerteza"],
    categories: ["obstáculo"],
    keywords: ["confusão", "dúvida", "nebuloso", "incerteza", "falta de clareza"],
    meaning: "As Nuvens representam dúvida, confusão temporária e situações sem clareza suficiente.",
    constructive: "Passagem de um período difícil, clareza que começa a surgir após a névoa.",
    challenging: "Confusão persistente, falta de clareza, dificuldade em enxergar o próximo passo.",
    isModifier: true,
    modifierType: "confuse",
    modifierEffect: "Obscurece o tema da carta adjacente — introduz dúvida, confusão ou falta de clareza no assunto próximo.",
    interpretations: {
      amor: "Incerteza em um relacionamento. Algo está obscurecido — vale buscar clareza antes de decidir.",
      trabalho: "Falta de definição no ambiente profissional. Projetos mal comunicados ou indefinidos.",
      dinheiro: "Confusão financeira ou situação ainda não esclarecida. Evite decisões importantes.",
      familia: "Mal-entendidos familiares ou situação obscura dentro do lar.",
      geral: "As cartas sugerem cautela. Nem tudo está claro ainda.",
      pessoal: "Um período de confusão interna. Difícil saber o que se quer de verdade.",
      projetos: "O projeto carece de clareza. Há algo mal definido que precisa ser esclarecido antes de avançar."
    },
    roles: {
      pessoa: "Uma pessoa confusa, indecisa ou que age com falta de transparência.",
      situacao: "Uma situação nebulosa, mal definida, com informações incompletas.",
      acao: "Pausar antes de agir. Buscar mais clareza.",
      estado: "Estado de confusão, incerteza ou desorientação.",
      obstaculo: "A falta de clareza como barreira para o avanço.",
      oportunidade: "Após a névoa, a clareza. O que parece confuso pode revelar algo importante.",
      conselho: "Não tome decisões importantes enquanto a situação não estiver clara.",
      tendencia: "A confusão pode passar. A clareza está próxima mas ainda não disponível."
    },
    conflicts: [31, 16, 33], // Sol (clareza), Estrelas (esperança), Chave (solução)
    reinforces: [21, 23], // Montanha, Ratos
    pairMeanings: {
      31: "A clareza começa a emergir. Após a névoa, o sol.",
      16: "Esperança obscurecida. A orientação existe, mas não está clara ainda.",
      33: "A solução existe mas está velada. Algo precisa ser esclarecido para que a chave funcione.",
      24: "Incerteza sobre sentimentos. O amor existe, mas está envolto em dúvida.",
      7: "Confusão acentuada por complexidade. Situação muito enredada.",
      1: "Uma notícia chega, mas seu conteúdo ou intenção não está claro."
    },
    reflections: [
      "O que você sabe que precisa de mais clareza antes de avançar?",
      "Que confusão você está alimentando em vez de resolver?"
    ]
  },
  {
    id: 7,
    name: "Serpente",
    symbol: "∿",
    themes: ["complexidade", "astúcia", "desvio", "sabedoria", "sedução"],
    categories: ["obstáculo", "decisão"],
    keywords: ["complexidade", "astúcia", "desvio", "sabedoria", "engano"],
    meaning: "A Serpente representa a complexidade, o que não é direto e a sabedoria que vem da experiência.",
    constructive: "Perspicácia estratégica, inteligência para navegar situações complexas.",
    challenging: "Enganação, caminhos tortuosos, pessoas que não dizem o que pensam.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um relacionamento complexo, com dinâmicas não ditas. Paixão intensa ou triângulo amoroso.",
      trabalho: "Ambiente com muita política. Há mais do que aparece na superfície.",
      dinheiro: "Cuidado com negócios obscuros ou propostas que escondem custos ocultos.",
      familia: "Dinâmicas complexas no núcleo familiar. Segredos ou não ditos.",
      geral: "As cartas sugerem que nem tudo é o que parece. Análise mais profunda é necessária.",
      pessoal: "Uma complexidade interna que merece atenção. O que você evita ver sobre si?",
      projetos: "O projeto envolve complexidades não visíveis. Há aspectos que precisam ser investigados."
    },
    roles: {
      pessoa: "Uma pessoa complexa, perspicaz, possivelmente manipuladora.",
      situacao: "Uma situação com camadas ocultas, intriga ou complexidade.",
      acao: "Observar antes de agir. A situação exige perspicácia.",
      estado: "Estado de alerta, suspeita fundamentada ou navegação de complexidade.",
      obstaculo: "O engano ou a complexidade desnecessária como barreira.",
      oportunidade: "A perspicácia como recurso. Quem enxerga a complexidade tem vantagem.",
      conselho: "Observe mais. Questione o que parece óbvio.",
      tendencia: "A situação tende a revelar camadas não visíveis anteriormente."
    },
    conflicts: [18, 33], // Cão (lealdade vs traição), Chave (solução vs complexidade)
    reinforces: [14, 26], // Raposa, Livro
    pairMeanings: {
      14: "Alerta máximo sobre engano ou manipulação dupla.",
      26: "Segredo ou informação oculta de grande importância.",
      18: "Lealdade questionada. Um amigo pode não ser o que parece.",
      24: "Amor complicado por complexidade ou não ditos.",
      7: "Complexidade sobre complexidade. Situação muito enredada."
    },
    reflections: [
      "Onde você está se enganando — ou sendo enganado?",
      "Que complexidade você evita nomear?"
    ]
  },
  {
    id: 8,
    name: "Caixão",
    symbol: "⊞",
    themes: ["fim", "encerramento", "transformação", "luto", "transição"],
    categories: ["transformação"],
    keywords: ["fim", "encerramento", "transformação", "luto", "conclusão"],
    meaning: "O Caixão representa finais necessários e a transformação que vem quando algo chega ao fim.",
    constructive: "Fim de ciclos que precisavam terminar, libertação do que não serve, transformação profunda.",
    challenging: "Perdas, encerramento forçado, período de luto ou tristeza.",
    isModifier: true,
    modifierType: "cut",
    modifierEffect: "Encerra ou transforma o tema da carta adjacente — o que está próximo encontra seu fim ou transformação.",
    interpretations: {
      amor: "O fim de um ciclo afetivo, seja um relacionamento ou uma fase dentro dele.",
      trabalho: "Encerramento de emprego, projeto ou fase profissional. Uma porta fecha.",
      dinheiro: "Perda financeira ou encerramento de uma fonte de renda.",
      familia: "Um ciclo familiar que se encerra. Mudança profunda na estrutura familiar.",
      geral: "As cartas indicam que algo está chegando ao fim. Resistir pode custar mais do que aceitar.",
      pessoal: "Uma parte de você está se encerrando para que outra possa nascer.",
      projetos: "O projeto em sua forma atual pode estar chegando ao fim. Uma reformulação é possível."
    },
    roles: {
      pessoa: "Uma pessoa que está passando por uma perda ou transição profunda.",
      situacao: "Uma situação que está em processo de encerramento.",
      acao: "Deixar ir o que já terminou. Honrar o fim para que o novo possa começar.",
      estado: "Estado de luto, encerramento ou transformação profunda.",
      obstaculo: "A resistência ao fim necessário.",
      oportunidade: "Todo encerramento abre espaço para o novo.",
      conselho: "O que precisa terminar está pedindo para ser liberado.",
      tendencia: "A situação tende ao encerramento ou a uma transformação profunda."
    },
    conflicts: [5, 13, 31], // Árvore (crescimento), Criança (início), Sol (expansão)
    reinforces: [10, 17, 22], // Foice, Cegonha, Caminhos
    pairMeanings: {
      17: "Uma transformação profunda abre espaço para novo início.",
      5: "Questão de saúde que precisa de cuidado, ou raiz que está sendo encerrada.",
      13: "O fim de uma fase abre espaço para um começo.",
      31: "Após o encerramento, a clareza. O sol após a noite.",
      4: "Mudança no lar, fim de um ciclo doméstico.",
      24: "Fim de um ciclo afetivo. Transformação em um relacionamento."
    },
    reflections: [
      "O que você ainda não deixou ir, mesmo sabendo que já terminou?",
      "Que fim pode ser o começo de algo mais alinhado com quem você é?"
    ]
  },
  {
    id: 9,
    name: "Buquê",
    symbol: "✾",
    themes: ["beleza", "gratidão", "presente", "alegria", "reconhecimento"],
    categories: ["oportunidade", "emoção"],
    keywords: ["presente", "alegria", "gratidão", "beleza", "reconhecimento"],
    meaning: "O Buquê traz beleza, presenteação, alegria genuína e reconhecimento.",
    constructive: "Presente inesperado, reconhecimento, períodos de alegria e gratidão.",
    challenging: "Superficialidade, agrados sem substância, aparência sem profundidade.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um gesto de afeto, romantismo e cuidado. Presente real ou período de florescimento.",
      trabalho: "Reconhecimento pelo trabalho, elogio público ou conquista que merece celebração.",
      dinheiro: "Uma entrada agradável e inesperada, ou benefício acompanhado de boa vontade.",
      familia: "Um momento de celebração e reconhecimento no ambiente familiar.",
      geral: "As cartas sugerem um momento de leveza e beleza. Permita-se receber.",
      pessoal: "Um reconhecimento de si mesmo. Você merece o que está recebendo.",
      projetos: "O projeto recebe reconhecimento ou um impulso positivo inesperado."
    },
    roles: {
      pessoa: "Uma pessoa generosa, que presenteia e traz alegria.",
      situacao: "Uma situação agradável, um momento de celebração.",
      acao: "Presentear, reconhecer, celebrar o que foi conquistado.",
      estado: "Estado de alegria, gratidão e abertura para receber.",
      obstaculo: "Superficialidade, presentes que escondem intenções.",
      oportunidade: "O reconhecimento que chega é real. Aproveite.",
      conselho: "Permita-se receber. Reconheça o que há de belo ao seu redor.",
      tendencia: "A situação tende para momentos positivos e de reconhecimento."
    },
    conflicts: [23, 8], // Ratos (desgaste vs alegria), Caixão (fim vs celebração)
    reinforces: [24, 31, 16], // Coração, Sol, Estrelas
    pairMeanings: {
      24: "Amor florescente, gesto afetivo genuíno.",
      29: "Uma mulher generosa e amorosa como presente.",
      28: "Um homem generoso ou uma figura masculina que traz reconhecimento.",
      11: "Reconhecimento que chega após um período de conflito.",
      23: "A alegria é minada por desgaste ou perda gradual."
    },
    reflections: [
      "Quando foi a última vez que você se permitiu receber sem culpa?",
      "Que alegria pequena você tem ignorado?"
    ]
  },
  {
    id: 10,
    name: "Foice",
    symbol: "⚔",
    themes: ["corte", "decisão", "colheita", "ruptura", "separação"],
    categories: ["decisão", "transformação"],
    keywords: ["corte", "decisão", "colheita", "ruptura", "encerramento"],
    meaning: "A Foice representa cortes necessários, decisões que precisam ser tomadas e a colheita do que foi semeado.",
    constructive: "Decisões claras, fim do que não serve, colheita de resultados após esforço.",
    challenging: "Cortes abruptos, separações dolorosas, decisões tomadas por outros.",
    isModifier: true,
    modifierType: "cut",
    modifierEffect: "Corta ou encerra o tema da carta adjacente de forma abrupta. O que estava próximo encontra interrupção.",
    interpretations: {
      amor: "Uma separação ou um corte necessário na dinâmica do relacionamento.",
      trabalho: "Demissão, corte de projetos ou uma decisão drástica no ambiente profissional.",
      dinheiro: "Redução de despesas necessária, ou perda súbita que exige reorganização.",
      familia: "Um corte ou separação no ambiente familiar. Uma decisão difícil mas necessária.",
      geral: "As cartas sugerem que um corte está próximo — escolher realizá-lo conscientemente é diferente de ser surpreendido por ele.",
      pessoal: "Algo em você precisa ser cortado para que você avance.",
      projetos: "Uma parte do projeto precisa ser descartada. Cortar o que não funciona é uma forma de avançar."
    },
    roles: {
      pessoa: "Uma pessoa que toma decisões rápidas, às vezes sem considerar o impacto.",
      situacao: "Uma situação que exige decisão imediata.",
      acao: "Cortar o que não funciona. Tomar a decisão adiada.",
      estado: "Estado de decisão, urgência ou necessidade de agir.",
      obstaculo: "O corte imposto de fora como perda.",
      oportunidade: "O corte que libera. Às vezes a ruptura é o que abre o caminho.",
      conselho: "Tome a decisão que você está adiando. A demora pode ser mais custosa.",
      tendencia: "A situação tende para um corte ou decisão definitiva."
    },
    conflicts: [5, 35, 25], // Árvore (crescimento), Âncora (permanência), Anel (compromisso)
    reinforces: [8, 22, 17], // Caixão, Caminhos, Cegonha
    pairMeanings: {
      8: "Fim definitivo e abrupto de um ciclo importante.",
      22: "Uma escolha crucial que separa caminhos de forma definitiva.",
      24: "Uma ruptura emocional ou decisão afetiva dolorosa.",
      35: "A estabilidade é cortada. Uma mudança não planejada interrompe o equilíbrio.",
      18: "Separação de alguém leal. Um laço de amizade ou parceria é cortado."
    },
    reflections: [
      "O que precisa ser cortado para que você possa avançar?",
      "Que decisão você vem adiando por medo das consequências?"
    ]
  },
  {
    id: 11,
    name: "Chicote",
    symbol: "≺",
    themes: ["conflito", "repetição", "desgaste", "crítica", "padrão"],
    categories: ["obstáculo"],
    keywords: ["conflito", "repetição", "crítica", "discussão", "padrão"],
    meaning: "O Chicote representa conflitos recorrentes e padrões que se repetem.",
    constructive: "Energia para trabalho árduo, capacidade de persistir diante de dificuldades.",
    challenging: "Brigas, discussões repetitivas, ambientes tóxicos, críticas constantes.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Conflitos recorrentes no relacionamento. O padrão de discussão indica algo mais profundo.",
      trabalho: "Ambiente de trabalho tenso, cobranças excessivas ou competição desgastante.",
      dinheiro: "Gastos repetitivos que drenam recursos, ou negociações difíceis.",
      familia: "Conflitos familiares repetitivos. Um padrão que se repete.",
      geral: "As cartas sugerem atenção a um padrão que se repete. Algo precisa mudar.",
      pessoal: "Um comportamento repetitivo que gera sofrimento. Um padrão a ser reconhecido.",
      projetos: "Conflitos internos ou externos que atrasam o projeto repetidamente."
    },
    roles: {
      pessoa: "Uma pessoa crítica, exigente ou que gera conflito.",
      situacao: "Uma situação de conflito repetitivo.",
      acao: "Identificar o padrão antes de reagir.",
      estado: "Estado de desgaste, conflito ou repetição cansativa.",
      obstaculo: "O conflito recorrente que impede o avanço.",
      oportunidade: "Reconhecer o padrão é o primeiro passo para mudá-lo.",
      conselho: "Não reaja ao padrão — interrompa-o.",
      tendencia: "A situação tende a repetir o conflito enquanto o padrão não for reconhecido."
    },
    conflicts: [30, 18], // Lírios (harmonia), Cão (lealdade vs conflito)
    reinforces: [21, 6, 23], // Montanha, Nuvens, Ratos
    pairMeanings: {
      24: "Conflito intenso em um relacionamento amoroso.",
      18: "Desentendimento com alguém próximo e leal.",
      19: "Conflito com uma instituição ou estrutura de poder.",
      8: "Um ciclo de conflito que finalmente chega ao fim.",
      30: "A harmonia é desafiada por um conflito recorrente."
    },
    reflections: [
      "Que conflito você continua travando sem resultado?",
      "Que padrão repetitivo ainda não foi reconhecido como tal?"
    ]
  },
  {
    id: 12,
    name: "Pássaros",
    symbol: "⚜",
    themes: ["comunicação", "conversa", "nervosismo", "par", "troca"],
    categories: ["comunicação"],
    keywords: ["comunicação", "nervosismo", "conversa", "par", "preocupação"],
    meaning: "Os Pássaros representam comunicações, conversas e trocas entre duas pessoas.",
    constructive: "Diálogo produtivo, boas conversas, conexões que geram resultado.",
    challenging: "Fofoca, ansiedade, preocupações que se amplificam ao serem compartilhadas.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Conversas sobre o relacionamento, ou um casal que compartilha muitos assuntos.",
      trabalho: "Reuniões, negociações e comunicações profissionais que merecem atenção.",
      dinheiro: "Conversas sobre dinheiro, negociações em andamento.",
      familia: "Conversas familiares importantes. Uma troca necessária.",
      geral: "As cartas sugerem que a comunicação é central agora. O que é dito — e o que não é — importa.",
      pessoal: "Pensamentos que circulam em loop. Ansiedade ou processamento interno intenso.",
      projetos: "O projeto depende de comunicação eficaz entre as partes envolvidas."
    },
    roles: {
      pessoa: "Um par de pessoas, ou alguém que se comunica muito.",
      situacao: "Uma situação de muita conversa e troca.",
      acao: "Conversar, negociar, comunicar com clareza.",
      estado: "Estado de nervosismo, ansiedade ou muito pensamento.",
      obstaculo: "Fofoca, mal-entendido, comunicação prejudicada.",
      oportunidade: "Uma conversa importante pode mudar a direção das coisas.",
      conselho: "Abra o diálogo. O que precisa ser dito, diga.",
      tendencia: "A situação tende a depender de uma conversa ou comunicação importante."
    },
    conflicts: [26, 19], // Livro (segredo vs comunicação), Torre (isolamento vs troca)
    reinforces: [1, 27], // Cavaleiro, Carta
    pairMeanings: {
      27: "Notícias ou correspondência importante a caminho.",
      1: "Mensagem rápida traz conversa significativa.",
      24: "Conversa sobre sentimentos ou relacionamento.",
      7: "Fofoca ou comunicação complexa e não transparente.",
      6: "Comunicação confusa, mal-entendido."
    },
    reflections: [
      "O que você precisa dizer que ainda não foi dito?",
      "Que preocupação fica circulando em sua mente sem encontrar resposta?"
    ]
  },
  {
    id: 13,
    name: "Criança",
    symbol: "◌",
    themes: ["início", "inocência", "novo", "abertura", "inexperiência"],
    categories: ["oportunidade", "transformação"],
    keywords: ["início", "inocência", "novo", "abertura", "frescor"],
    meaning: "A Criança representa novos começos, abertura para o desconhecido e a inocência que permite aprender.",
    constructive: "Novos projetos, frescor, abertura genuína, curiosidade criativa.",
    challenging: "Imaturidade, falta de experiência, ingenuidade que gera vulnerabilidade.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor jovem ou em seus primeiros estágios. Início cheio de potencial.",
      trabalho: "Nova fase profissional, projeto em primeiros passos, aprendizado.",
      dinheiro: "Início de uma nova fonte de renda ou projeto financeiro.",
      familia: "A chegada de um novo membro ou uma nova fase na família.",
      geral: "As cartas indicam começo. O que está nascendo agora pede cuidado e abertura.",
      pessoal: "Uma parte nova de você está emergindo. Receba com abertura.",
      projetos: "O projeto está em seus primeiros passos. Proteja o que ainda é frágil."
    },
    roles: {
      pessoa: "Uma pessoa jovem, um iniciante, ou alguém com mentalidade aberta.",
      situacao: "Uma situação nova que está apenas começando.",
      acao: "Começar sem medo, iniciar com leveza.",
      estado: "Estado de abertura, frescor e início.",
      obstaculo: "Imaturidade ou falta de experiência como barreira.",
      oportunidade: "O início como possibilidade. O que nasce pode crescer.",
      conselho: "Comece. A perfeição não é condição para o começo.",
      tendencia: "A situação tende para um novo começo."
    },
    conflicts: [8, 36], // Caixão (fim vs início), Cruz (peso vs leveza)
    reinforces: [17, 9, 31], // Cegonha, Buquê, Sol
    pairMeanings: {
      17: "Um novo começo transformador. A mudança traz algo novo.",
      5: "Um jovem com raízes sólidas que está crescendo.",
      8: "O fim de um ciclo abre espaço para um começo.",
      15: "Um novo começo com força e recursos.",
      31: "Um novo começo brilhante e favorável."
    },
    reflections: [
      "O que você está começando que merece ser tratado com ternura?",
      "Onde a inocência pode ser uma vantagem, não uma fraqueza?"
    ]
  },
  {
    id: 14,
    name: "Raposa",
    symbol: "◈",
    themes: ["astúcia", "estratégia", "engano", "disfarce", "autopreservação"],
    categories: ["obstáculo", "decisão"],
    keywords: ["astúcia", "estratégia", "engano", "cuidado", "observação"],
    meaning: "A Raposa representa a astúcia, a estratégia e a necessidade de verificar o que está oculto.",
    constructive: "Inteligência estratégica, capacidade de perceber o que os outros não veem.",
    challenging: "Engano, traição, pessoas que agem por interesse disfarçado de cuidado.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Cuidado com ilusões afetivas. Alguém pode não ser o que aparenta.",
      trabalho: "Ambiente com política intensa. Alguém age por interesse próprio disfarçado.",
      dinheiro: "Cuidado com fraudes, armadilhas financeiras ou promessas que escondem custos.",
      familia: "Dinâmicas familiares com não ditos ou interesses ocultos.",
      geral: "As cartas sugerem que a observação é mais valiosa do que a ação agora.",
      pessoal: "Uma autoilusão que merece ser reconhecida. O que você evita ver?",
      projetos: "Há interesses ocultos no projeto. Investigue antes de avançar."
    },
    roles: {
      pessoa: "Uma pessoa astuta, estratégica, possivelmente dissimulada.",
      situacao: "Uma situação que exige observação antes de ação.",
      acao: "Observar, investigar, não revelar tudo de imediato.",
      estado: "Estado de alerta, desconfiança fundamentada.",
      obstaculo: "O engano ou a manipulação como barreira.",
      oportunidade: "A astúcia como recurso. Ver o que os outros não veem.",
      conselho: "Observe mais antes de confiar. A ingenuidade pode ser custosa aqui.",
      tendencia: "A situação tende a revelar camadas ocultas."
    },
    conflicts: [18, 33], // Cão (lealdade vs traição), Chave (solução vs engano)
    reinforces: [7, 26], // Serpente, Livro
    pairMeanings: {
      7: "Engano duplo ou manipulação sofisticada.",
      26: "Um segredo ou intenção oculta em uma situação.",
      18: "Um amigo que pode não ser tão leal quanto parece.",
      15: "Alguém poderoso que pode não estar agindo com transparência.",
      33: "A astúcia leva à solução. Ver o que outros não veem."
    },
    reflections: [
      "Onde você pode estar se enganando por querer acreditar em algo?",
      "Que situação pede mais astúcia do que ingenuidade?"
    ]
  },
  {
    id: 15,
    name: "Urso",
    symbol: "⬡",
    themes: ["poder", "proteção", "recursos", "autoridade", "intensidade"],
    categories: ["recurso", "pessoa"],
    keywords: ["poder", "proteção", "liderança", "recursos", "autoridade"],
    meaning: "O Urso representa poder, autoridade, recursos abundantes e a figura que protege e provê.",
    constructive: "Força, proteção, liderança natural, acesso a recursos e apoio.",
    challenging: "Dominação, possessividade, excesso de controle ou dependência de uma figura de poder.",
    isModifier: true,
    modifierType: "amplify",
    modifierEffect: "Intensifica o tema da carta adjacente. O que está próximo ganha maior peso, força ou importância.",
    interpretations: {
      amor: "Um parceiro forte e protetor, mas que pode ser possessivo. O poder está em pauta.",
      trabalho: "Uma figura de autoridade influente — chefe, mentor ou líder.",
      dinheiro: "Recursos abundantes, acesso a capital ou consolidação financeira.",
      familia: "Uma figura de autoridade familiar forte. Pode ser protetora ou dominante.",
      geral: "As cartas sugerem que a força está disponível. A questão é como ela será usada.",
      pessoal: "Seu próprio poder está em evidência. Como você o usa?",
      projetos: "Recursos e autoridade disponíveis para o projeto."
    },
    roles: {
      pessoa: "Uma figura de autoridade, um chefe, um protetor poderoso.",
      situacao: "Uma situação que envolve poder ou recursos significativos.",
      acao: "Assumir o poder, proteger, liderar.",
      estado: "Estado de força, autoridade ou necessidade de proteção.",
      obstaculo: "O excesso de poder como controle ou dominação.",
      oportunidade: "O acesso a recursos ou apoio de uma figura poderosa.",
      conselho: "Use seu poder com responsabilidade. A força pode proteger ou destruir.",
      tendencia: "A situação tende a ser influenciada por uma figura de autoridade."
    },
    conflicts: [13, 18], // Criança (vulnerabilidade vs poder), Cão (lealdade vs dominação)
    reinforces: [34, 31], // Peixes, Sol
    pairMeanings: {
      34: "Grande abundância financeira e poder de recursos.",
      11: "Conflito com uma figura de autoridade.",
      23: "Recursos sendo drenados por alguém com poder.",
      14: "Uma figura poderosa que não age com transparência.",
      18: "Uma amizade poderosa e protetora."
    },
    reflections: [
      "Onde você tem poder que ainda não reconheceu?",
      "Como você usa o poder que tem — para proteger ou controlar?"
    ]
  },
  {
    id: 16,
    name: "Estrelas",
    symbol: "★",
    themes: ["esperança", "clareza", "inspiração", "orientação", "sonho"],
    categories: ["oportunidade"],
    keywords: ["esperança", "clareza", "inspiração", "direcionamento", "aspiração"],
    meaning: "As Estrelas representam esperança, clareza superior e a orientação que vem de uma perspectiva ampla.",
    constructive: "Otimismo fundamentado, inspiração criativa, clareza de propósito.",
    challenging: "Idealismo excessivo, expectativas irrealistas, orientação sem base prática.",
    isModifier: true,
    modifierType: "clarify",
    modifierEffect: "Ilumina o tema da carta adjacente com esperança e clareza. O que está próximo ganha um aspecto mais positivo e direcionado.",
    interpretations: {
      amor: "Um amor que inspira e eleva. Uma conexão que parece destinada.",
      trabalho: "Visão clara de propósito profissional, projetos criativos e inspiradores.",
      dinheiro: "Perspectivas financeiras favoráveis, visão de longo prazo que ilumina o caminho.",
      familia: "Um período de esperança e clareza no ambiente familiar.",
      geral: "As cartas apontam para um período de clareza e orientação. O caminho está mais visível.",
      pessoal: "Um propósito se clarifica. Algo que você estava buscando começa a fazer sentido.",
      projetos: "O projeto tem direção clara. A inspiração está disponível."
    },
    roles: {
      pessoa: "Uma pessoa inspiradora, otimista, com visão de longo prazo.",
      situacao: "Uma situação que está se clarificando e ganhando direção.",
      acao: "Confiar na própria visão, seguir o que inspira.",
      estado: "Estado de esperança, clareza ou renovação de propósito.",
      obstaculo: "Idealismo que perde contato com a realidade.",
      oportunidade: "A clareza como recurso. Ver o caminho quando outros não veem.",
      conselho: "Confie na sua visão. O que parece claro para você tem fundamento.",
      tendencia: "A situação tende para maior clareza e direcionamento."
    },
    conflicts: [6, 23], // Nuvens (confusão vs clareza), Ratos (desgaste vs esperança)
    reinforces: [31, 32, 33], // Sol, Lua, Chave
    pairMeanings: {
      31: "Máxima clareza. Período excepcionalmente favorável.",
      32: "Intuição e clareza trabalhando juntas.",
      6: "Clareza obscurecida. A esperança existe, mas há névoa.",
      33: "A orientação leva à solução.",
      21: "Esperança diante de um obstáculo. A clareza existe, mas o caminho tem resistência."
    },
    reflections: [
      "Que estrela guia suas escolhas quando você está perdido?",
      "O que daria sentido ao que você está construindo?"
    ]
  },
  {
    id: 17,
    name: "Cegonha",
    symbol: "↑",
    themes: ["mudança", "chegada", "transformação", "renovação", "transição"],
    categories: ["transformação", "movimento"],
    keywords: ["mudança", "chegada", "transição", "renovação", "novo ciclo"],
    meaning: "A Cegonha anuncia mudanças, transformações e chegadas de novas fases.",
    constructive: "Mudanças bem-vindas, novidades positivas, transformações que abrem espaço.",
    challenging: "Mudanças que chegam sem aviso, adaptação difícil, resistência ao novo.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Uma mudança no status de um relacionamento, ou a chegada de algo novo na vida afetiva.",
      trabalho: "Transição profissional importante, mudança de cargo, empresa ou área.",
      dinheiro: "Mudança na situação financeira — pode ser positiva ou requerer adaptação.",
      familia: "Chegada de novo membro, mudança de estrutura familiar.",
      geral: "As cartas indicam transição. O que está mudando carrega possibilidades ainda não vistas.",
      pessoal: "Uma transformação interior está em curso. Quem você está se tornando?",
      projetos: "O projeto entra em uma nova fase. Uma mudança de direção pode ser necessária."
    },
    roles: {
      pessoa: "Uma pessoa que traz mudança, que está em transição.",
      situacao: "Uma situação de mudança ou transição.",
      acao: "Abraçar a mudança, permitir a transformação.",
      estado: "Estado de transição, transformação em curso.",
      obstaculo: "A resistência à mudança necessária.",
      oportunidade: "A mudança como abertura para algo melhor.",
      conselho: "Não resista ao que está se transformando. A transição é parte do caminho.",
      tendencia: "A situação tende a mudar significativamente."
    },
    conflicts: [35, 4], // Âncora (estabilidade vs mudança), Casa (raízes vs transição)
    reinforces: [8, 13, 22], // Caixão, Criança, Caminhos
    pairMeanings: {
      13: "Uma chegada traz um começo absolutamente novo.",
      8: "Uma transformação profunda encerra e inicia ao mesmo tempo.",
      4: "Mudança no ambiente doméstico ou familiar.",
      22: "Uma mudança que exige escolha de caminho.",
      35: "A estabilidade é transformada. Uma mudança bem-alicerçada."
    },
    reflections: [
      "Que mudança você está resistindo que já está em curso?",
      "O que a transformação que se aproxima pode estar trazendo de novo?"
    ]
  },
  {
    id: 18,
    name: "Cão",
    symbol: "◆",
    themes: ["lealdade", "amizade", "confiança", "fidelidade", "aliança"],
    categories: ["relacionamento", "pessoa"],
    keywords: ["lealdade", "amizade", "confiança", "fidelidade", "aliado"],
    meaning: "O Cão representa amizade fiel, lealdade verdadeira e os aliados que permanecem.",
    constructive: "Amizades sólidas, apoio incondicional, relações de confiança genuína.",
    challenging: "Excesso de lealdade que se torna limitante, dependência emocional, dificuldade em limites.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor baseado em amizade profunda e confiança. Um parceiro fiel e presente.",
      trabalho: "Um colega ou aliado de confiança. O trabalho em equipe é favorecido.",
      dinheiro: "Apoio financeiro de alguém próximo, ou um parceiro de negócios confiável.",
      familia: "Um membro familiar leal, o cão de guarda da família.",
      geral: "As cartas sugerem que o apoio está próximo. Quem é seu aliado nessa questão?",
      pessoal: "A lealdade a si mesmo. Você está sendo fiel a quem você é?",
      projetos: "Um parceiro confiável é chave para o projeto avançar."
    },
    roles: {
      pessoa: "Um amigo leal, um aliado de confiança.",
      situacao: "Uma situação de apoio mútuo e confiança.",
      acao: "Ser leal, apoiar, confiar.",
      estado: "Estado de confiança, lealdade ou necessidade de apoio.",
      obstaculo: "Dependência excessiva de outro, lealdade que aprisiona.",
      oportunidade: "Um aliado próximo pode ser a chave para avançar.",
      conselho: "Confie em quem tem mostrado lealdade. Apoie seus aliados.",
      tendencia: "A situação tende a depender de parcerias confiáveis."
    },
    conflicts: [14, 7], // Raposa (traição vs lealdade), Serpente (engano vs fidelidade)
    reinforces: [4, 30, 25], // Casa, Lírios, Anel
    pairMeanings: {
      4: "Amizade que se transforma em família.",
      14: "Um amigo que pode não ser tão leal quanto parece.",
      30: "Uma amizade madura e equilibrada.",
      24: "Um amor que tem como base uma amizade genuína.",
      11: "Desentendimento com um aliado próximo."
    },
    reflections: [
      "Quem, na sua vida, representa lealdade genuína?",
      "Você tem sido um aliado para quem confia em você?"
    ]
  },
  {
    id: 19,
    name: "Torre",
    symbol: "▲",
    themes: ["isolamento", "estrutura", "instituição", "fronteira", "independência"],
    categories: ["estabilidade", "obstáculo"],
    keywords: ["isolamento", "estrutura", "instituição", "solidão", "fronteiras"],
    meaning: "A Torre representa estruturas estabelecidas, isolamento e a necessidade de estabelecer fronteiras.",
    constructive: "Foco, estrutura sólida, independência, clareza que vem do isolamento temporário.",
    challenging: "Solidão excessiva, rigidez, distância emocional, aprisionamento em sistemas que não servem.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Distância emocional dentro de um relacionamento, ou a necessidade de espaço individual.",
      trabalho: "Uma grande instituição ou empresa, burocracia, hierarquia formal.",
      dinheiro: "Recursos presos em estruturas rígidas, investimentos institucionais.",
      familia: "Estruturas familiares rígidas, isolamento dentro do núcleo familiar.",
      geral: "As cartas sugerem que a estrutura tem um papel importante. Fronteiras podem ser necessárias.",
      pessoal: "Um período de isolamento necessário para encontrar clareza interior.",
      projetos: "O projeto precisa de estrutura formal. Mas cuidado com excesso de rigidez."
    },
    roles: {
      pessoa: "Uma pessoa distante emocionalmente, formal, com fronteiras claras.",
      situacao: "Uma situação formal, institucional ou de isolamento.",
      acao: "Estabelecer fronteiras, criar estrutura, buscar clareza através do silêncio.",
      estado: "Estado de isolamento, independência ou necessidade de estrutura.",
      obstaculo: "O isolamento ou a rigidez como barreira para a conexão.",
      oportunidade: "O isolamento como espaço de criação e autoconhecimento.",
      conselho: "Crie estrutura antes de expandir. As fronteiras protegem.",
      tendencia: "A situação tende ao isolamento ou à formalização de estruturas."
    },
    conflicts: [20, 18], // Jardim (social vs isolado), Cão (conexão vs distância)
    reinforces: [4, 35], // Casa, Âncora
    pairMeanings: {
      22: "Isolamento que leva a uma escolha de caminhos.",
      18: "Lealdade dentro de uma estrutura formal.",
      20: "Tensão entre isolamento e a necessidade de conexão social.",
      8: "Fim de uma estrutura ou instituição.",
      33: "A estrutura rígida encontra sua chave — uma abertura."
    },
    reflections: [
      "Onde você se isolou quando precisaria se conectar?",
      "Que estrutura em sua vida já não serve ao que você está construindo?"
    ]
  },
  {
    id: 20,
    name: "Jardim",
    symbol: "❧",
    themes: ["social", "público", "comunidade", "visibilidade", "rede"],
    categories: ["relacionamento", "oportunidade"],
    keywords: ["social", "público", "comunidade", "rede", "visibilidade"],
    meaning: "O Jardim representa o espaço público, encontros sociais e o que é cultivado de forma coletiva.",
    constructive: "Socialização produtiva, redes de apoio, visibilidade positiva.",
    challenging: "Exposição excessiva, influência negativa de grupos, superficialidade.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor que nasce em contexto social, ou um relacionamento que precisa de mais vida pública.",
      trabalho: "Networking, eventos, projetos que ganham visibilidade no mercado.",
      dinheiro: "Negócios que dependem de visibilidade e redes de contato.",
      familia: "A família como comunidade. O papel da família no contexto social.",
      geral: "As cartas sugerem que a resposta envolve outras pessoas. O coletivo é parte da solução.",
      pessoal: "Sua presença pública e como você se relaciona com grupos.",
      projetos: "O projeto precisa de visibilidade e conexão com o público certo."
    },
    roles: {
      pessoa: "Uma pessoa social, conectada, com boa rede de contatos.",
      situacao: "Uma situação que ocorre em ambiente público ou social.",
      acao: "Socializar, criar rede, tornar-se visível.",
      estado: "Estado de abertura social, presença pública.",
      obstaculo: "Exposição excessiva ou pressão social.",
      oportunidade: "A rede de contatos como recurso. O ambiente social como palco.",
      conselho: "Mostre-se. A visibilidade pode ser o que falta.",
      tendencia: "A situação tende a se resolver por meio de conexões sociais."
    },
    conflicts: [19, 26], // Torre (isolamento), Livro (segredo vs visibilidade)
    reinforces: [31, 1, 12], // Sol, Cavaleiro, Pássaros
    pairMeanings: {
      31: "Visibilidade positiva e sucesso público.",
      1: "Notícias que chegam pelo ambiente social.",
      29: "Uma mulher importante em seu círculo social.",
      28: "Um homem influente em seu ambiente social.",
      6: "Confusão no ambiente social. Mal-entendidos em grupo."
    },
    reflections: [
      "Que comunidade você quer construir — ou da qual quer fazer parte?",
      "Como sua presença pública reflete quem você realmente é?"
    ]
  },
  {
    id: 21,
    name: "Montanha",
    symbol: "△",
    themes: ["obstáculo", "bloqueio", "resistência", "desafio", "atraso"],
    categories: ["obstáculo"],
    keywords: ["obstáculo", "bloqueio", "resistência", "atraso", "superação"],
    meaning: "A Montanha representa os obstáculos que precisam ser superados, os desafios que testam a persistência.",
    constructive: "Capacidade de superar o que está no caminho, paciência estratégica.",
    challenging: "Bloqueios persistentes, oposição de forças externas, atrasos significativos.",
    isModifier: true,
    modifierType: "block",
    modifierEffect: "Bloqueia ou atrasa o tema da carta adjacente. O que está próximo encontra resistência ou demora.",
    interpretations: {
      amor: "Um obstáculo no caminho do relacionamento — pode ser externo ou interno ao casal.",
      trabalho: "Um bloqueio profissional importante. Algo impede o avanço.",
      dinheiro: "Dificuldades financeiras que exigem estratégia e paciência.",
      familia: "Um obstáculo ou resistência dentro da família.",
      geral: "As cartas indicam que há um obstáculo real. A questão é como ele será enfrentado.",
      pessoal: "Uma barreira interior que precisa ser reconhecida antes de ser superada.",
      projetos: "O projeto encontra um obstáculo significativo. Estratégia antes de força."
    },
    roles: {
      pessoa: "Uma pessoa que coloca obstáculos, ou que representa resistência.",
      situacao: "Uma situação de bloqueio ou resistência.",
      acao: "Identificar o obstáculo antes de tentar atravessá-lo.",
      estado: "Estado de frustração, bloqueio ou lentidão forçada.",
      obstaculo: "A Montanha é o próprio obstáculo.",
      oportunidade: "Superar a Montanha fortalece. O que parece barreira pode ser professor.",
      conselho: "Não force a passagem cega. Estude o obstáculo antes de agir.",
      tendencia: "A situação tende a encontrar resistência antes de avançar."
    },
    conflicts: [33, 1, 31], // Chave (solução), Cavaleiro (movimento), Sol (clareza)
    reinforces: [6, 23, 11], // Nuvens, Ratos, Chicote
    pairMeanings: {
      33: "A chave para superar o obstáculo já existe.",
      3: "O obstáculo pode ser contornado com movimento ou uma longa jornada.",
      1: "O movimento encontra resistência. Um avanço é bloqueado.",
      31: "Clareza sobre o obstáculo — ou o sol que ilumina o caminho ao redor.",
      22: "O obstáculo leva a uma encruzilhada. Uma escolha precisa ser feita."
    },
    reflections: [
      "Que obstáculo você está contornando quando poderia estar atravessando?",
      "O que essa dificuldade está te ensinando que não aprenderia sem ela?"
    ]
  },
  {
    id: 22,
    name: "Caminhos",
    symbol: "⋈",
    themes: ["escolha", "decisão", "bifurcação", "possibilidades", "encruzilhada"],
    categories: ["decisão"],
    keywords: ["escolha", "decisão", "bifurcação", "possibilidades", "encruzilhada"],
    meaning: "Os Caminhos representam a encruzilhada, a decisão que precisa ser tomada e as possibilidades abertas.",
    constructive: "Clareza nas opções disponíveis, liberdade de escolha, múltiplas possibilidades.",
    challenging: "Indecisão paralisante, medo de errar o caminho, pressão por escolhas precipitadas.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Uma escolha afetiva importante. Duas possibilidades claras se apresentam.",
      trabalho: "Uma bifurcação profissional que exige decisão.",
      dinheiro: "Duas opções financeiras distintas que precisam ser avaliadas.",
      familia: "Uma decisão familiar importante que cria bifurcação.",
      geral: "As cartas indicam que há uma escolha a ser feita. Adiar pode ser uma resposta — mas temporária.",
      pessoal: "Uma encruzilhada interior. Qual versão de você quer seguir em frente?",
      projetos: "O projeto exige uma decisão de direção."
    },
    roles: {
      pessoa: "Uma pessoa indecisa, ou alguém que oferece opções.",
      situacao: "Uma situação de escolha genuína entre caminhos diferentes.",
      acao: "Decidir. Comprometer-se com uma direção.",
      estado: "Estado de indecisão, abertura ou necessidade de comprometimento.",
      obstaculo: "A indecisão como barreira.",
      oportunidade: "A liberdade de escolher como recurso.",
      conselho: "Escolha. O que você decide diz quem você está sendo.",
      tendencia: "A situação tende a exigir uma escolha definitiva."
    },
    conflicts: [35, 4], // Âncora (permanência vs escolha), Casa (raízes vs bifurcação)
    reinforces: [10, 3, 17], // Foice, Navio, Cegonha
    pairMeanings: {
      33: "A resposta existe — você já tem a chave para escolher.",
      3: "Um caminho leva a uma jornada mais longa e distante.",
      21: "O obstáculo leva à encruzilhada.",
      35: "Uma escolha que afeta a estabilidade conquistada.",
      31: "Clareza sobre o melhor caminho."
    },
    reflections: [
      "Que escolha você está postergando por medo de se comprometer?",
      "O que cada caminho te pede que você deixe para trás?"
    ]
  },
  {
    id: 23,
    name: "Ratos",
    symbol: "⊗",
    themes: ["perda", "desgaste", "erosão", "ansiedade", "deterioração"],
    categories: ["obstáculo"],
    keywords: ["perda", "desgaste", "ansiedade", "corrosão", "diminuição"],
    meaning: "Os Ratos representam o desgaste gradual, as perdas pequenas que se acumulam e a ansiedade que corrói.",
    constructive: "Identificação de um problema antes que se torne irreversível.",
    challenging: "Perdas graduais, desgaste emocional ou financeiro, situações que drenam energia.",
    isModifier: true,
    modifierType: "diminish",
    modifierEffect: "Corrói e diminui o tema da carta adjacente. O que está próximo sofre desgaste, perda ou deterioração gradual.",
    interpretations: {
      amor: "Desgaste no relacionamento, pequenos conflitos acumulados, perda gradual de conexão.",
      trabalho: "Ambiente que drena energia, projetos que consomem mais do que entregam.",
      dinheiro: "Perdas financeiras graduais, gastos não observados, dinheiro que escapa sem atenção.",
      familia: "Desgaste nas relações familiares. Algo está sendo corroído silenciosamente.",
      geral: "As cartas sugerem que algo está sendo consumido. A atenção ao detalhe é urgente.",
      pessoal: "Um padrão de pensamento ou comportamento que está corroendo seu bem-estar.",
      projetos: "O projeto está perdendo recursos, energia ou direção gradualmente."
    },
    roles: {
      pessoa: "Uma pessoa que drena energia, ou que está em processo de deterioração.",
      situacao: "Uma situação que se deteriora gradualmente.",
      acao: "Identificar o que está drenando antes que seja irreversível.",
      estado: "Estado de desgaste, ansiedade ou deterioração gradual.",
      obstaculo: "A erosão silenciosa como barreira.",
      oportunidade: "Identificar o desgaste cedo é uma oportunidade de reverter.",
      conselho: "Pare de ignorar o pequeno. O que parece insignificante está se acumulando.",
      tendencia: "A situação tende a se deteriorar se não houver intervenção."
    },
    conflicts: [31, 9, 33], // Sol, Buquê, Chave
    reinforces: [21, 6, 11], // Montanha, Nuvens, Chicote
    pairMeanings: {
      15: "Recursos sendo drenados por alguém com poder.",
      8: "O desgaste chega ao fim junto com o ciclo.",
      34: "Erosão financeira. Os recursos estão sendo perdidos gradualmente.",
      5: "Algo corrói as raízes. Atenção ao que está deteriorando a base.",
      31: "A clareza revela o que estava sendo perdido."
    },
    reflections: [
      "O que está sendo consumido silenciosamente na sua vida?",
      "Que pequena perda repetida você normalizou?"
    ]
  },
  {
    id: 24,
    name: "Coração",
    symbol: "♥",
    themes: ["amor", "sentimento", "afeto", "emoção", "vínculo afetivo"],
    categories: ["emoção", "relacionamento"],
    keywords: ["amor", "sentimento", "afeto", "emoção", "paixão"],
    meaning: "O Coração representa o amor, as emoções profundas e tudo que é movido pelo sentimento genuíno.",
    constructive: "Amor correspondido, abertura emocional, conexões afetivas verdadeiras.",
    challenging: "Vulnerabilidade excessiva, emoções que nublam o julgamento, feridas afetivas.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "A carta mais direta sobre amor. Indica sentimentos genuínos, seja em um relacionamento existente ou que se inicia.",
      trabalho: "Uma paixão por aquilo que faz. O trabalho é guiado pelo coração.",
      dinheiro: "Decisões financeiras guiadas pela emoção — o que pode ser belo ou arriscado.",
      familia: "Vínculos afetivos familiares. O amor como fio condutor das relações.",
      geral: "As cartas sugerem que os sentimentos são centrais. O que o coração já sabe?",
      pessoal: "Seus sentimentos são válidos e importantes. O que você sente merece atenção.",
      projetos: "Um projeto movido por paixão genuína. A motivação emocional é o combustível."
    },
    roles: {
      pessoa: "Uma pessoa amorosa, sentimental, guiada pelos sentimentos.",
      situacao: "Uma situação afetiva ou emocional.",
      acao: "Amar, sentir, abrir-se emocionalmente.",
      estado: "Estado de amor, vulnerabilidade ou intensidade emocional.",
      obstaculo: "As emoções que nublam o julgamento.",
      oportunidade: "O amor como força criativa e motivadora.",
      conselho: "O que seu coração está dizendo merece ser ouvido.",
      tendencia: "A situação tende a ser resolvida pelo sentimento, não pela razão."
    },
    conflicts: [19, 10], // Torre (distância), Foice (ruptura)
    reinforces: [25, 18, 9], // Anel, Cão, Buquê
    pairMeanings: {
      25: "Compromisso amoroso movido por sentimento genuíno.",
      11: "Conflito emocional intenso em um relacionamento.",
      6: "Incerteza sobre sentimentos. O amor existe, mas está nebuloso.",
      10: "Uma ruptura emocional ou decisão afetiva.",
      18: "Um amor baseado em amizade genuína e lealdade."
    },
    reflections: [
      "O que seu coração está dizendo que sua mente ainda não quis ouvir?",
      "Onde você substituiu sentir por pensar?"
    ]
  },
  {
    id: 25,
    name: "Anel",
    symbol: "○",
    themes: ["compromisso", "contrato", "aliança", "continuidade", "vínculo"],
    categories: ["relacionamento", "decisão"],
    keywords: ["compromisso", "contrato", "aliança", "parceria", "continuidade"],
    meaning: "O Anel representa compromisso, acordos, parcerias formais e vínculos com intenção de permanência.",
    constructive: "Acordos sólidos, parcerias duradouras, comprometimento genuíno.",
    challenging: "Contratos desfavoráveis, compromissos que aprisionam, vínculos por obrigação.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Compromisso afetivo formal, noivado, casamento, ou uma promessa importante.",
      trabalho: "Contrato, sociedade, parceria profissional. Os termos merecem atenção.",
      dinheiro: "Contrato financeiro, acordo formal, parceria de negócios.",
      familia: "Um vínculo familiar formal ou compromisso dentro da família.",
      geral: "As cartas sugerem que um compromisso está em pauta. O que você está disposto a assumir?",
      pessoal: "Um compromisso com você mesmo. O que você está decidindo ser?",
      projetos: "Um contrato ou parceria formal que impulsiona o projeto."
    },
    roles: {
      pessoa: "Uma pessoa comprometida, ou um parceiro formal.",
      situacao: "Uma situação de compromisso ou contrato.",
      acao: "Comprometer-se, assinar, formalizar.",
      estado: "Estado de comprometimento ou de necessidade de vínculo.",
      obstaculo: "Um compromisso que aprisiona ou um contrato desfavorável.",
      oportunidade: "A formalização de um vínculo como estabilizador.",
      conselho: "Revise o que você está assumindo. O compromisso tem peso.",
      tendencia: "A situação tende a exigir um comprometimento mais formal."
    },
    conflicts: [10, 8], // Foice (corte), Caixão (fim)
    reinforces: [24, 18, 35], // Coração, Cão, Âncora
    pairMeanings: {
      24: "Um compromisso amoroso genuíno.",
      7: "Um contrato ou acordo com cláusulas ocultas.",
      8: "Um compromisso que está chegando ao fim.",
      10: "Ruptura de um contrato ou compromisso.",
      33: "A chave que abre ou formaliza um compromisso."
    },
    reflections: [
      "Que compromisso você assumiu que não reflete mais quem você é?",
      "Com o que — ou com quem — você quer se comprometer de verdade?"
    ]
  },
  {
    id: 26,
    name: "Livro",
    symbol: "▣",
    themes: ["segredo", "conhecimento", "oculto", "estudo", "mistério"],
    categories: ["obstáculo", "oportunidade"],
    keywords: ["segredo", "conhecimento", "oculto", "estudo", "informação"],
    meaning: "O Livro guarda segredos, conhecimentos não revelados e o que está escondido à vista.",
    constructive: "Acesso a informações importantes, aprendizado profundo, segredos que protegem.",
    challenging: "Informações retidas, segredos que prejudicam, ignorância de algo essencial.",
    isModifier: true,
    modifierType: "reveal",
    modifierEffect: "Revela aspectos ocultos da carta adjacente — o que está próximo tem dimensões escondidas.",
    interpretations: {
      amor: "Algo está sendo escondido em um relacionamento. Um segredo de um dos lados.",
      trabalho: "Informação privilegiada, aprendizado importante em andamento ou algo não revelado.",
      dinheiro: "Informações sobre finanças que ainda não vieram à tona.",
      familia: "Um segredo familiar. Algo que não foi dito.",
      geral: "As cartas sugerem que algo importante ainda não está revelado.",
      pessoal: "Um autoconhecimento que está emergindo. O que você está descobrindo sobre si?",
      projetos: "O projeto tem aspectos não revelados que podem mudar sua direção."
    },
    roles: {
      pessoa: "Uma pessoa reservada, que guarda segredos.",
      situacao: "Uma situação com informações ocultas.",
      acao: "Pesquisar, investigar, aprender antes de agir.",
      estado: "Estado de mistério, descoberta ou investigação.",
      obstaculo: "O segredo que não pode ser revelado como barreira.",
      oportunidade: "O conhecimento como poder. Aprender é abrir portas.",
      conselho: "Investigue antes de concluir. Há mais a saber.",
      tendencia: "A situação tende a revelar informações importantes."
    },
    conflicts: [20, 12], // Jardim (público vs segredo), Pássaros (comunicação vs silêncio)
    reinforces: [7, 14], // Serpente, Raposa
    pairMeanings: {
      7: "Um segredo de grandes proporções.",
      33: "A chave para abrir o que está fechado.",
      14: "Um segredo estratégico ou uma informação guardada com intenção.",
      27: "Documento que guarda um segredo.",
      1: "Uma informação oculta está prestes a chegar."
    },
    reflections: [
      "Que conhecimento você precisa buscar antes de agir?",
      "O que você sabe, mas ainda não admitiu — nem para si mesmo?"
    ]
  },
  {
    id: 27,
    name: "Carta",
    symbol: "✉",
    themes: ["comunicação", "documento", "mensagem", "notícia", "formalidade"],
    categories: ["comunicação"],
    keywords: ["comunicação", "documento", "mensagem", "notícia", "informação"],
    meaning: "A Carta representa comunicações escritas, documentos importantes e notícias formais.",
    constructive: "Notícias esperadas e bem-vindas, documentos em ordem, comunicação clara.",
    challenging: "Comunicações difíceis, documentos problemáticos, notícias na hora errada.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Uma mensagem importante, uma declaração ou uma conversa que precisa acontecer.",
      trabalho: "Correspondências profissionais, contratos, comunicados ou propostas formais.",
      dinheiro: "Documentos financeiros, correspondência sobre dívidas ou benefícios.",
      familia: "Uma correspondência familiar, uma notícia que chegará por escrito.",
      geral: "As cartas sugerem atenção ao que chega por comunicação formal. Leia com cuidado.",
      pessoal: "Uma comunicação com você mesmo — diário, reflexão, carta para o futuro.",
      projetos: "Uma proposta, contrato ou documento é central para o projeto agora."
    },
    roles: {
      pessoa: "Uma pessoa que se comunica por escrito, burocrática ou formal.",
      situacao: "Uma situação que depende de comunicação formal.",
      acao: "Escrever, comunicar, documentar.",
      estado: "Estado de expectativa por uma comunicação.",
      obstaculo: "Comunicação que não chega ou documentação em atraso.",
      oportunidade: "Uma comunicação ou documento pode abrir portas.",
      conselho: "Documente. O que foi dito informalmente precisa de formalização.",
      tendencia: "A situação tende a se definir por uma comunicação escrita ou formal."
    },
    conflicts: [26], // Livro (segredo vs comunicação aberta)
    reinforces: [1, 12], // Cavaleiro, Pássaros
    pairMeanings: {
      1: "Mensagem chegando rapidamente.",
      26: "Documento que guarda um segredo.",
      8: "Uma notícia que encerra algo.",
      16: "Uma boa notícia com clareza.",
      6: "Uma mensagem confusa ou mal entendida."
    },
    reflections: [
      "Que mensagem você está esperando que ainda não chegou?",
      "O que você precisa comunicar com mais clareza e intenção?"
    ]
  },
  {
    id: 28,
    name: "Homem",
    symbol: "♂",
    themes: ["masculino", "figura masculina", "ação", "autoridade", "presença"],
    categories: ["pessoa"],
    keywords: ["masculino", "homem", "figura masculina", "ação", "presença"],
    meaning: "O Homem representa o consulente masculino ou uma figura masculina central na questão.",
    constructive: "Ação, assertividade, presença masculina positiva e protetora.",
    challenging: "Rigidez, agressividade, excesso de ego ou distância emocional.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "O parceiro, um pretendente ou a própria identidade em um relacionamento.",
      trabalho: "Um colega, superior ou parceiro masculino com papel central.",
      dinheiro: "Uma figura masculina influencia diretamente as finanças.",
      familia: "O pai, um irmão, o filho — uma figura masculina familiar.",
      geral: "Uma figura masculina é significativa para a questão.",
      pessoal: "O aspecto masculino dentro de si — ação, assertividade, decisão.",
      projetos: "Um homem tem papel central no projeto."
    },
    roles: {
      pessoa: "Um homem — parceiro, pai, chefe, irmão.",
      situacao: "Uma situação centrada em uma figura masculina.",
      acao: "Agir com assertividade, liderar.",
      estado: "Estado de assertividade ou necessidade de ação.",
      obstaculo: "Rigidez ou ego excessivo como barreira.",
      oportunidade: "Uma figura masculina pode ser o aliado necessário.",
      conselho: "A ação direta é necessária. Não espere.",
      tendencia: "Uma figura masculina influencia o desenvolvimento."
    },
    conflicts: [], reinforces: [29, 25], // Mulher, Anel
    pairMeanings: {
      24: "Um homem apaixonado ou em situação de amor.",
      29: "Um casal ou parceria masculino-feminino.",
      14: "Um homem que age com astúcia ou dissimulação.",
      18: "Um homem leal e confiável.",
      15: "Um homem poderoso e com recursos."
    },
    reflections: [
      "Qual papel o masculino tem em sua vida agora?",
      "Como você se relaciona com a assertividade e a ação?"
    ]
  },
  {
    id: 29,
    name: "Mulher",
    symbol: "♀",
    themes: ["feminino", "figura feminina", "intuição", "receptividade", "presença"],
    categories: ["pessoa"],
    keywords: ["feminino", "mulher", "figura feminina", "intuição", "presença"],
    meaning: "A Mulher representa a consulente feminina ou uma figura feminina central na questão.",
    constructive: "Intuição, receptividade, presença feminina acolhedora e criativa.",
    challenging: "Passividade excessiva, manipulação sutil, dificuldade em se posicionar.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "A parceira, uma pretendente ou a própria identidade em um relacionamento.",
      trabalho: "Uma colega, superiora ou parceira feminina com papel central.",
      dinheiro: "Uma figura feminina influencia diretamente as finanças.",
      familia: "A mãe, uma irmã, a filha — uma figura feminina familiar.",
      geral: "Uma figura feminina é significativa para a questão.",
      pessoal: "O aspecto feminino dentro de si — intuição, receptividade, criatividade.",
      projetos: "Uma mulher tem papel central no projeto."
    },
    roles: {
      pessoa: "Uma mulher — parceira, mãe, chefe, irmã.",
      situacao: "Uma situação centrada em uma figura feminina.",
      acao: "Confiar na intuição, receber, criar.",
      estado: "Estado de receptividade ou necessidade de conexão.",
      obstaculo: "Passividade excessiva ou manipulação como barreira.",
      oportunidade: "Uma figura feminina pode ser o apoio necessário.",
      conselho: "Confie na sua intuição. Ela sabe antes da mente.",
      tendencia: "Uma figura feminina influencia o desenvolvimento."
    },
    conflicts: [], reinforces: [28, 25], // Homem, Anel
    pairMeanings: {
      24: "Uma mulher apaixonada ou em situação de amor.",
      28: "Um casal ou parceria feminino-masculino.",
      14: "Uma mulher que age com astúcia ou dissimulação.",
      18: "Uma mulher leal e confiável.",
      9: "Uma mulher generosa e amorosa."
    },
    reflections: [
      "Qual papel o feminino tem em sua vida agora?",
      "Como você se relaciona com a intuição e a receptividade?"
    ]
  },
  {
    id: 30,
    name: "Lírios",
    symbol: "✿",
    themes: ["paz", "maturidade", "harmonia", "pureza", "serenidade"],
    categories: ["estabilidade", "emoção"],
    keywords: ["paz", "maturidade", "harmonia", "pureza", "serenidade"],
    meaning: "Os Lírios representam paz interior, maturidade e a harmonia conquistada com o tempo.",
    constructive: "Períodos de paz, relacionamentos maduros, harmonia familiar e interior.",
    challenging: "Estagnação disfarçada de paz, recusa ao conflito necessário.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor maduro, tranquilo e harmonioso. Período de paz afetiva.",
      trabalho: "Ambiente de trabalho harmonioso, projetos conduzidos com calma.",
      dinheiro: "Estabilidade financeira consolidada, tranquilidade material.",
      familia: "Paz e harmonia no ambiente familiar.",
      geral: "As cartas sugerem um período de harmonia e paz.",
      pessoal: "Um período de serenidade interior. A maturidade como conquista.",
      projetos: "O projeto avança em ambiente harmonioso e com maturidade."
    },
    roles: {
      pessoa: "Uma pessoa madura, serena, equilibrada.",
      situacao: "Uma situação harmoniosa e tranquila.",
      acao: "Cultivar a paz, manter a serenidade.",
      estado: "Estado de paz interior, harmonia ou maturidade.",
      obstaculo: "A paz que evita o conflito necessário.",
      oportunidade: "A serenidade como recurso para navegar a situação.",
      conselho: "Busque harmonia interior antes de agir.",
      tendencia: "A situação tende para um período de paz e equilíbrio."
    },
    conflicts: [11, 10], // Chicote (conflito), Foice (ruptura)
    reinforces: [4, 18, 5], // Casa, Cão, Árvore
    pairMeanings: {
      4: "Lar harmonioso, família em paz.",
      18: "Amizade madura e fiel.",
      11: "A harmonia é desafiada por um conflito.",
      28: "Um homem maduro e equilibrado.",
      29: "Uma mulher serena e equilibrada."
    },
    reflections: [
      "Que paz você criou que precisa ser preservada?",
      "Onde a harmonia que você busca já está presente?"
    ]
  },
  {
    id: 31,
    name: "Sol",
    symbol: "☀",
    themes: ["sucesso", "clareza", "energia", "vitória", "expansão"],
    categories: ["oportunidade"],
    keywords: ["sucesso", "clareza", "vitória", "energia", "iluminação"],
    meaning: "O Sol representa sucesso, clareza plena, vitória e a energia que ilumina tudo ao redor.",
    constructive: "Sucesso, clareza de propósito, vitória merecida, energia positiva abundante.",
    challenging: "Excesso que cega, arrogância, expectativas que não cabem na realidade.",
    isModifier: true,
    modifierType: "clarify",
    modifierEffect: "Ilumina e expande o tema da carta adjacente. O que está próximo se manifesta com clareza, força e energia positiva.",
    interpretations: {
      amor: "Período de alegria afetiva, amor iluminado, clareza sobre os sentimentos.",
      trabalho: "Sucesso profissional, reconhecimento, projetos que chegam ao auge.",
      dinheiro: "Prosperidade financeira, lucros, período de abundância.",
      familia: "Alegria e luz no ambiente familiar. Um período de sucesso compartilhado.",
      geral: "As cartas indicam um período de clareza e sucesso.",
      pessoal: "Clareza sobre si mesmo. O que você é brilha com mais nitidez.",
      projetos: "O projeto encontra seu auge. Sucesso após o esforço."
    },
    roles: {
      pessoa: "Uma pessoa radiante, bem-sucedida, que traz energia positiva.",
      situacao: "Uma situação de sucesso, clareza ou vitória.",
      acao: "Celebrar, brilhar, avançar com confiança.",
      estado: "Estado de clareza, sucesso ou vitalidade.",
      obstaculo: "Excesso de ego que impede aprendizado.",
      oportunidade: "O sucesso que se aproxima. A clareza que permite avançar.",
      conselho: "Avance com confiança. O momento é favorável.",
      tendencia: "A situação tende para clareza e sucesso."
    },
    conflicts: [6, 21], // Nuvens, Montanha
    reinforces: [16, 31, 9], // Estrelas, Sol, Buquê
    pairMeanings: {
      16: "Máxima clareza e inspiração. Período excepcionalmente favorável.",
      32: "Equilíbrio entre clareza consciente e intuição.",
      6: "A clareza começa a surgir após a névoa.",
      23: "A clareza revela o que estava sendo perdido.",
      20: "Sucesso e visibilidade pública."
    },
    reflections: [
      "O que você conquistou que ainda não celebrou?",
      "Que clareza o momento atual está te dando sobre o próximo passo?"
    ]
  },
  {
    id: 32,
    name: "Lua",
    symbol: "☽",
    themes: ["intuição", "emoção", "ciclo", "sonho", "subconsciente"],
    categories: ["emoção"],
    keywords: ["intuição", "emoção", "ciclo", "sonho", "subtileza"],
    meaning: "A Lua representa a intuição profunda, os ciclos emocionais e o que se move nas camadas sutis.",
    constructive: "Intuição aguçada, criatividade, sensibilidade que capta o que a razão não vê.",
    challenging: "Emoções oscilantes, ilusões, fantasias que distorcem a percepção.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor guiado pela intuição. Preste atenção ao que você sente, não apenas ao que vê.",
      trabalho: "Projetos criativos, trabalhos que envolvem imaginação e sensibilidade.",
      dinheiro: "Intuição sobre finanças, mas cuidado com ilusões.",
      familia: "Dinâmicas emocionais familiares que precisam de sensibilidade.",
      geral: "As cartas sugerem que a intuição é aliada agora.",
      pessoal: "Algo emerge do subconsciente. Preste atenção aos seus sonhos e intuições.",
      projetos: "O projeto tem um aspecto criativo ou emocional central."
    },
    roles: {
      pessoa: "Uma pessoa intuitiva, criativa, com vida emocional rica.",
      situacao: "Uma situação que opera no nível emocional e intuitivo.",
      acao: "Confiar na intuição, prestar atenção ao que não é verbal.",
      estado: "Estado de sensibilidade, intuição ou oscilação emocional.",
      obstaculo: "As ilusões emocionais como barreira para a clareza.",
      oportunidade: "A intuição como recurso. O que você sente sem saber por quê pode ser verdade.",
      conselho: "Ouça o que seu interior está dizendo, mesmo sem provas.",
      tendencia: "A situação tende a se revelar através de sinais sutis."
    },
    conflicts: [31, 16], // Sol (clareza vs nebuloso), Estrelas (objetivo vs emocional)
    reinforces: [24, 29], // Coração, Mulher
    pairMeanings: {
      16: "Visão que une intuição e razão.",
      6: "Confusão emocional intensa.",
      31: "Equilíbrio entre emoção e clareza.",
      24: "Sentimentos profundos que guiam a situação afetiva.",
      26: "Um segredo revelado pela intuição."
    },
    reflections: [
      "Que intuição você está ignorando por não ter como comprová-la?",
      "Em que ciclo emocional você está — e para onde ele aponta?"
    ]
  },
  {
    id: 33,
    name: "Chave",
    symbol: "⚷",
    themes: ["solução", "abertura", "resposta", "acesso", "resolução"],
    categories: ["oportunidade"],
    keywords: ["solução", "abertura", "resposta", "acesso", "descoberta"],
    meaning: "A Chave representa a solução que abre o que estava fechado e a resposta que estava sendo buscada.",
    constructive: "Soluções que surgem, acesso ao que era restrito, respostas que finalmente chegam.",
    challenging: "A resposta que abre portas para as quais ainda não estava pronto.",
    isModifier: true,
    modifierType: "open",
    modifierEffect: "Abre e soluciona o tema da carta adjacente. O que estava bloqueado ou fechado encontra resolução.",
    interpretations: {
      amor: "A chave para o relacionamento está disponível. Um bloqueio afetivo pode ser resolvido.",
      trabalho: "A solução para um problema profissional aparece. Uma porta se abre.",
      dinheiro: "Acesso a recursos, solução financeira, descoberta do que bloqueava a prosperidade.",
      familia: "Uma solução para um conflito familiar. A chave que desfaz o nó.",
      geral: "As cartas indicam que a resposta existe. A questão é se você está pronto para usá-la.",
      pessoal: "Uma descoberta sobre si mesmo que muda a perspectiva.",
      projetos: "A solução para o projeto está ao alcance. Um avanço está próximo."
    },
    roles: {
      pessoa: "Uma pessoa que oferece soluções, que tem acesso ao que outros não têm.",
      situacao: "Uma situação de desbloqueio ou descoberta.",
      acao: "Encontrar a solução, abrir o que estava fechado.",
      estado: "Estado de resolução ou descoberta.",
      obstaculo: "A chave que ainda não foi encontrada.",
      oportunidade: "A solução está próxima e disponível.",
      conselho: "A resposta está mais perto do que parece.",
      tendencia: "A situação tende a se resolver."
    },
    conflicts: [21, 6], // Montanha (obstáculo), Nuvens (confusão)
    reinforces: [16, 31], // Estrelas, Sol
    pairMeanings: {
      26: "A chave para abrir um segredo importante.",
      21: "A solução para o obstáculo existe e está próxima.",
      8: "A chave que liberta de um ciclo que estava aprisionando.",
      6: "A clareza chega — a névoa vai se dissipar.",
      22: "A resposta existe e pode orientar a escolha."
    },
    reflections: [
      "O que você já sabe que pode desbloquear uma situação importante?",
      "Que porta você ainda não teve coragem de abrir?"
    ]
  },
  {
    id: 34,
    name: "Peixes",
    symbol: "♓",
    themes: ["abundância", "fluxo", "recurso financeiro", "prosperidade", "negócio"],
    categories: ["recurso"],
    keywords: ["abundância", "fluxo", "recursos", "prosperidade", "negócios"],
    meaning: "Os Peixes representam abundância, fluxo de recursos e a capacidade de navegar no mar das finanças.",
    constructive: "Abundância financeira, fluxo de caixa positivo, prosperidade em movimento.",
    challenging: "Excesso que leva ao desperdício, recursos que escorregam entre os dedos.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um amor abundante, generoso e fluido. Uma pessoa com recursos que os compartilha.",
      trabalho: "Negócios prósperos, projetos com boa margem, empreendimentos que fluem.",
      dinheiro: "Esta é a carta mais direta sobre finanças. Indica recursos e prosperidade.",
      familia: "Abundância compartilhada no núcleo familiar. Recursos disponíveis para todos.",
      geral: "As cartas sugerem que os recursos estão disponíveis. A questão é como são geridos.",
      pessoal: "Uma riqueza interior — talentos, recursos internos que aguardam reconhecimento.",
      projetos: "O projeto tem boa viabilidade financeira. Recursos disponíveis."
    },
    roles: {
      pessoa: "Uma pessoa com bons recursos, generosa, com facilidade financeira.",
      situacao: "Uma situação de abundância ou fluxo financeiro.",
      acao: "Investir, fazer fluir, compartilhar recursos.",
      estado: "Estado de abundância ou de gestão de recursos.",
      obstaculo: "O desperdício ou a má gestão dos recursos disponíveis.",
      oportunidade: "Os recursos disponíveis como alavanca.",
      conselho: "Os recursos existem. A questão é usá-los bem.",
      tendencia: "A situação tende para maior fluxo de recursos."
    },
    conflicts: [23, 8], // Ratos (erosão), Caixão (fim)
    reinforces: [15, 31], // Urso, Sol
    pairMeanings: {
      15: "Grande abundância e poder financeiro.",
      23: "Recursos sendo drenados gradualmente.",
      8: "Fim de uma fonte de renda ou recursos.",
      31: "Prosperidade iluminada. Período de abundância favorável.",
      35: "Recursos estáveis e seguros."
    },
    reflections: [
      "Como você se relaciona com a abundância — ela pode existir para você?",
      "O que bloqueia o fluxo de recursos na sua vida?"
    ]
  },
  {
    id: 35,
    name: "Âncora",
    symbol: "⚓",
    themes: ["estabilidade", "persistência", "trabalho", "segurança", "permanência"],
    categories: ["estabilidade"],
    keywords: ["estabilidade", "persistência", "trabalho", "segurança", "fixação"],
    meaning: "A Âncora representa estabilidade duradoura, persistência no trabalho e a segurança construída.",
    constructive: "Estabilidade construída com esforço, persistência recompensada, segurança real.",
    challenging: "Excesso de estabilidade que se torna prisão, resistência à mudança necessária.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Um relacionamento estável e duradouro, baseado em segurança e persistência mútua.",
      trabalho: "Uma carreira sólida, um emprego estável, ou um projeto que chegará ao fim com sucesso.",
      dinheiro: "Estabilidade financeira conquistada com trabalho. Os recursos estão seguros.",
      familia: "Uma família como ancora. Raízes que sustentam.",
      geral: "As cartas sugerem que o que foi construído com persistência está se consolidando.",
      pessoal: "O que te ancora quando tudo oscila? Esse é seu recurso mais importante.",
      projetos: "O projeto está bem alicerçado. A persistência levará ao resultado."
    },
    roles: {
      pessoa: "Uma pessoa estável, persistente, confiável.",
      situacao: "Uma situação de estabilidade ou de fixação.",
      acao: "Persistir, manter o rumo, não abandonar antes do tempo.",
      estado: "Estado de estabilidade, segurança ou fixação.",
      obstaculo: "A âncora que impede o movimento necessário.",
      oportunidade: "A estabilidade como base para crescimento.",
      conselho: "Mantenha o curso. O que você construiu tem valor.",
      tendencia: "A situação tende a se estabilizar e consolidar."
    },
    conflicts: [3, 17, 22], // Navio, Cegonha, Caminhos
    reinforces: [4, 19, 35], // Casa, Torre, Âncora
    pairMeanings: {
      31: "Sucesso estável e duradouro. Conquista real e permanente.",
      3: "Estabilidade que permite uma longa jornada.",
      22: "A estabilidade é desafiada por uma escolha.",
      17: "A estabilidade é transformada pela mudança.",
      34: "Recursos estáveis e seguros."
    },
    reflections: [
      "Onde a estabilidade que você construiu está te sustentando?",
      "O que mantém você ancorado quando tudo ao redor oscila?"
    ]
  },
  {
    id: 36,
    name: "Cruz",
    symbol: "✚",
    themes: ["destino", "karma", "peso", "responsabilidade", "fardo"],
    categories: ["obstáculo", "transformação"],
    keywords: ["destino", "karma", "peso", "responsabilidade", "missão"],
    meaning: "A Cruz representa o peso que se carrega, o karma e as responsabilidades essenciais da jornada.",
    constructive: "Aceitação profunda, responsabilidade que transforma, propósito maior.",
    challenging: "Peso excessivo, culpa desnecessária, sensação de destino imutável.",
    isModifier: false,
    modifierType: null,
    modifierEffect: "",
    interpretations: {
      amor: "Uma relação com peso kármico, ou um amor que traz ensinamentos profundos.",
      trabalho: "Uma missão ou responsabilidade que pesa, mas traz significado.",
      dinheiro: "Dívidas, obrigações financeiras ou a responsabilidade de sustentar outros.",
      familia: "Um fardo familiar, obrigações de longa data.",
      geral: "As cartas sugerem que há um peso a ser reconhecido.",
      pessoal: "Algo que você carrega como se fosse destino pode ser uma escolha.",
      projetos: "O projeto tem um peso ou responsabilidade maior do que aparece."
    },
    roles: {
      pessoa: "Uma pessoa sobrecarregada, ou que carrega uma missão.",
      situacao: "Uma situação de peso, responsabilidade ou inevitabilidade percebida.",
      acao: "Reconhecer o peso, escolher conscientemente o que se carrega.",
      estado: "Estado de sobrecarga, responsabilidade ou aceitação.",
      obstaculo: "O peso que impede o movimento.",
      oportunidade: "A responsabilidade como chamado. O peso que transforma.",
      conselho: "Avalie o que você carrega por escolha e o que carrega por medo.",
      tendencia: "A situação tende a revelar responsabilidades mais profundas."
    },
    conflicts: [31, 13], // Sol (leveza), Criança (início vs fardo)
    reinforces: [8, 5], // Caixão, Árvore
    pairMeanings: {
      8: "Um fardo que finalmente encontra seu fim.",
      33: "A chave para aliviar o peso que você carrega.",
      31: "Clareza sobre o que é realmente responsabilidade sua.",
      13: "A Cruz que precisa ser deixada para um novo começo.",
      5: "Raízes que sustentam o peso."
    },
    reflections: [
      "Que responsabilidade você carrega que não é inteiramente sua?",
      "O que você interpretou como destino que na verdade é escolha?"
    ]
  }
];

// ─── Spread Types ─────────────────────────────────────────────────────────────

export const SPREAD_TYPES = [
  {
    id: 1 as const,
    name: "Carta do Dia",
    cards: 1,
    depth: "Rápida",
    description: "Uma mensagem simbólica para refletir sobre o seu momento.",
    positions: [{ name: "Mensagem do dia", role: "mensagem", description: "A carta que fala ao momento presente." }],
    tier: "free"
  },
  {
    id: 3 as const,
    name: "Essencial",
    cards: 3,
    depth: "Objetiva",
    description: "Uma visão rápida e objetiva sobre sua pergunta.",
    positions: [
      { name: "Situação", role: "contexto", description: "O contexto atual da questão." },
      { name: "Influência", role: "influencia", description: "O que está influenciando a situação." },
      { name: "Tendência", role: "tendencia", description: "Para onde a situação aponta." }
    ],
    tier: "paid"
  },
  {
    id: 5 as const,
    name: "Profunda",
    cards: 5,
    depth: "Detalhada",
    description: "Uma leitura mais profunda para questões que pedem contexto.",
    positions: [
      { name: "Contexto", role: "contexto", description: "O panorama da situação." },
      { name: "Influência", role: "influencia", description: "Forças que atuam sobre a questão." },
      { name: "Núcleo", role: "centro", description: "O coração da questão." },
      { name: "Desafio", role: "obstaculo", description: "O que precisa ser superado." },
      { name: "Tendência", role: "tendencia", description: "A direção que a situação sugere." }
    ],
    tier: "paid"
  },
  {
    id: 9 as const,
    name: "Ampliada",
    cards: 9,
    depth: "Completa",
    description: "Uma visão ampliada da situação, observando relações entre as cartas e o centro da questão.",
    positions: [
      { name: "01", role: "contexto", description: "" },
      { name: "02", role: "influencia", description: "" },
      { name: "03", role: "recurso", description: "" },
      { name: "04", role: "obstaculo", description: "" },
      { name: "Centro", role: "centro", description: "O núcleo da questão." },
      { name: "06", role: "oportunidade", description: "" },
      { name: "07", role: "passado", description: "" },
      { name: "08", role: "acao", description: "" },
      { name: "09", role: "tendencia", description: "" }
    ],
    tier: "paid"
  },
  {
    id: 36 as const,
    name: "Grande Tableau",
    cards: 36,
    depth: "Avançada",
    description: "A experiência mais completa do Lenormand, utilizando todo o baralho.",
    positions: [],
    tier: "premium"
  }
];

// ─── Categories & Helpers ──────────────────────────────────────────────────────

export type SpreadType = 1 | 3 | 5 | 9 | 36;
export type Category = "amor" | "trabalho" | "dinheiro" | "familia" | "geral" | "pessoal" | "projetos";

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: "amor", label: "Amor", icon: "♥" },
  { id: "trabalho", label: "Trabalho", icon: "▣" },
  { id: "dinheiro", label: "Dinheiro", icon: "♓" },
  { id: "familia", label: "Família", icon: "⌂" },
  { id: "pessoal", label: "Pessoal", icon: "◌" },
  { id: "projetos", label: "Projetos", icon: "★" },
  { id: "geral", label: "Geral", icon: "⚷" },
];

export function drawCards(count: number): LenormandCard[] {
  return [...CARDS].sort(() => Math.random() - 0.5).slice(0, count);
}

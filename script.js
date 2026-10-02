"use strict";

/* ==========================================================
   CONSTANTES & CLAVES DE ALMACENAMIENTO
   ========================================================== */
const STORAGE_KEY = "bolillero-estudio-v3";
const POMODORO_STORAGE_KEY = "bolillero-pomodoro-config";
const THEME_STORAGE_KEY = "luibanez-theme";
const PIN_STORAGE_KEY = "luibanez-pomodoro-pinned";
const POS_STORAGE_KEY = "luibanez-pomodoro-pos";
const DUELO_STORAGE_KEY = "luibanez-duelo-historial";
const DUELO_PREFS_KEY = "luibanez-duelo-prefs";
const ACCOUNTS_STORAGE_KEY = "luibanez_cuentas_v2";
const ACTIVE_USER_STORAGE_KEY = "luibanez_perfil_activo_v2";
const MQTT_BROKER_URL = "wss://broker.emqx.io:8084/mqtt";
const LOBBY_DISCOVERY_TOPIC = "luibanez/lobbies/discover";

/* ==========================================================
   ESTADO GLOBAL
   ========================================================== */
const perfilUsuario = {
    esInvitado: true,
    id: "guest_" + Math.random().toString(36).slice(2, 8),
    apodo: "Invitado",
    avatar: "🦁",
    tipoAvatar: "emoji", // "emoji" | "foto"
    fotoDataUrl: "",
    victorias: 0,
    partidasJugadas: 0,
    puntosTotales: 0,
    maxRachaHistorica: 0,
    totalRobos: 0,
    pin: null,
    email: ""
};

const onlineDueloEstado = {
    fuenteMaterial: "pdf",
    conectado: false,
    clienteMqtt: null,
    esHost: false,
    modo: "online", // "online" | "local"
    formatoModo: "versus", // "versus" | "coop"
    codigoSala: "",
    nombreSala: "Sala de Repaso",
    esPublica: true,
    tienePassword: false,
    passwordSala: "",
    jugadores: [],
    chat: [],
    unreadCount: 0,
    chatAbierto: false,
    grabandoAudio: false,
    mediaRecorder: null,
    audioChunks: [],
    recIntervalId: null,
    recSegundos: 0,
    votacionActiva: false,
    votoEmitido: false,
    votosRecibidos: {},
    roboOnlineActivo: false,
    primerRoboReclamado: false
};

const lobbyBrowserState = {
    activeLobbies: new Map(), // roomId -> lobbyData
    filtroJuego: "todas",
    intervaloBeacon: null,
    intervaloLimpieza: null,
    suscrito: false
};

const estado = {
    listas: [],
    listaSeleccionadaId: null,
    ronda: {
        disponibles: [],
        ultimoTemaId: null
    },
    interfaz: {
        girando: false,
        vistaActual: "home"
    }
};

const pomodoroEstado = {
    config: {
        estudioMinutos: 25,
        descansoCortoMinutos: 5,
        descansoLargoMinutos: 15,
        sonidoHabilitado: true
    },
    modoActual: "estudio",
    segundosRestantes: 25 * 60,
    totalSegundosModo: 25 * 60,
    activo: false,
    intervalId: null,
    ciclosCompletados: 0,
    audioCtx: null
};

const estadoFlotante = {
    abierto: false,
    fijado: false,
    arrastrando: false,
    offsetX: 0,
    offsetY: 0
};

const dueloEstado = {
    config: {
        jugadores: ["Lucas", "Sofía"],
        listaId: null,
        tiempoTurnoSegundos: 90,
        formatoModo: "versus", // "versus" | "coop"
        comodines: {
            socorro: true,
            pista: true,
            pasoRebote: true
        },
        reglas: {
            rachaFuego: true,
            roboRelampago: true
        }
    },
    partida: {
        activa: false,
        rondaNumero: 1,
        turnoNumero: 0,
        esCoop: false,
        puntosEquipo: 0,
        metaPuntosEquipo: 100,
        vidasEquipo: 3,
        relevoSolicitado: false,
        relevoOradorOriginalId: null,
        jugadorActualId: null,
        temaActual: null,
        temasDisponibles: [],
        girando: false,
        tiempoRestante: 90,
        temporizadorActivo: false,
        intervalId: null,
        comodinActivo: null,
        jugadorSocorroId: null,
        robo: {
            activo: false,
            ladronId: null,
            tiempoRestante: 0,
            intervalId: null
        },
        jugadores: [],
        historialTurnos: []
    }
};

/* ==========================================================
   SELECTORES DEL DOM
   ========================================================== */
const dom = {

    // Extensiones LUIBAÑEZ v5 (Juegos Educativos & Gemini & Multiverso)
    viewJuegosEdu: document.getElementById("viewJuegosEdu"),
    juegosBackBtn: document.getElementById("juegosBackBtn"),
    juegosGameIcon: document.getElementById("juegosGameIcon"),
    juegosGameTitle: document.getElementById("juegosGameTitle"),
    juegosGameSubtitle: document.getElementById("juegosGameSubtitle"),
    juegosModeBadge: document.getElementById("juegosModeBadge"),
    juegosDifficultyBadge: document.getElementById("juegosDifficultyBadge"),
    triatlonProgressBar: document.getElementById("triatlonProgressBar"),
    triatlonStep1: document.getElementById("triatlonStep1"),
    triatlonStep2: document.getElementById("triatlonStep2"),
    triatlonStep3: document.getElementById("triatlonStep3"),
    triatlonTotalScore: document.getElementById("triatlonTotalScore"),
    arenaBomba: document.getElementById("arenaBomba"),
    bombaTimerDisplay: document.getElementById("bombaTimerDisplay"),
    bombaPulseStrip: document.getElementById("bombaPulseStrip"),
    bombaLcdScreen: document.getElementById("bombaLcdScreen"),
    bombaMinutes: document.getElementById("bombaMinutes"),
    bombaSeconds: document.getElementById("bombaSeconds"),
    bombaWireSlot1: document.getElementById("bombaWireSlot1"),
    bombaWireSlot2: document.getElementById("bombaWireSlot2"),
    bombaWireSlot3: document.getElementById("bombaWireSlot3"),
    bombaWire1Status: document.getElementById("bombaWire1Status"),
    bombaWire2Status: document.getElementById("bombaWire2Status"),
    bombaWire3Status: document.getElementById("bombaWire3Status"),
    bombaFase1View: document.getElementById("bombaFase1View"),
    bombaFase1Question: document.getElementById("bombaFase1Question"),
    bombaFase1Options: document.getElementById("bombaFase1Options"),
    bombaFase2View: document.getElementById("bombaFase2View"),
    bombaFase2Question: document.getElementById("bombaFase2Question"),
    bombaFase2ProblemBox: document.getElementById("bombaFase2ProblemBox"),
    bombaFase2Options: document.getElementById("bombaFase2Options"),
    bombaFase3View: document.getElementById("bombaFase3View"),
    bombaFase3Question: document.getElementById("bombaFase3Question"),
    bombaFase3ProblemBox: document.getElementById("bombaFase3ProblemBox"),
    bombaFase3Options: document.getElementById("bombaFase3Options"),
    bombaResultView: document.getElementById("bombaResultView"),
    bombaResultIcon: document.getElementById("bombaResultIcon"),
    bombaResultTitle: document.getElementById("bombaResultTitle"),
    bombaResultDesc: document.getElementById("bombaResultDesc"),
    bombaResultStats: document.getElementById("bombaResultStats"),
    bombaPlayAgainBtn: document.getElementById("bombaPlayAgainBtn"),
    bombaExitBtn: document.getElementById("bombaExitBtn"),
    arenaImpostor: document.getElementById("arenaImpostor"),
    impostorSetupPanel: document.getElementById("impostorSetupPanel"),
    impostorActiveBoard: document.getElementById("impostorActiveBoard"),
    impostorTimeSelector: document.getElementById("impostorTimeSelector"),
    impostorRoundsSelector: document.getElementById("impostorRoundsSelector"),
    impostorSetupStatusText: document.getElementById("impostorSetupStatusText"),
    impostorStartGameBtn: document.getElementById("impostorStartGameBtn"),
    impostorCaseNum: document.getElementById("impostorCaseNum"),
    impostorTimerBar: document.getElementById("impostorTimerBar"),
    impostorStreakBadge: document.getElementById("impostorStreakBadge"),
    impostorScoreDisplay: document.getElementById("impostorScoreDisplay"),
    impostorTopicBadge: document.getElementById("impostorTopicBadge"),
    impostorQuestionText: document.getElementById("impostorQuestionText"),
    impostorCardsGrid: document.getElementById("impostorCardsGrid"),
    impostorFeedbackBox: document.getElementById("impostorFeedbackBox"),
    impostorNextWaveBtn: document.getElementById("impostorNextWaveBtn"),
    impostorComodinesTray: document.getElementById("impostorComodinesTray"),
    impostorBtn5050: document.getElementById("impostorBtn5050"),
    impostorCount5050: document.getElementById("impostorCount5050"),
    impostorBtnTiempo: document.getElementById("impostorBtnTiempo"),
    impostorCountTiempo: document.getElementById("impostorCountTiempo"),
    impostorBtnSocorro: document.getElementById("impostorBtnSocorro"),
    impostorCountSocorro: document.getElementById("impostorCountSocorro"),
    arenaMemotest: document.getElementById("arenaMemotest"),
    memotestPairsCount: document.getElementById("memotestPairsCount"),
    memotestMovesCount: document.getElementById("memotestMovesCount"),
    memotestTimerDisplay: document.getElementById("memotestTimerDisplay"),
    memotestScoreDisplay: document.getElementById("memotestScoreDisplay"),
    memotestGrid: document.getElementById("memotestGrid"),
    copyGeminiPromptBtn: document.getElementById("copyGeminiPromptBtn"),
    drawerGeminiPromptBtn: document.getElementById("drawerGeminiPromptBtn"),
    geminiPromptModal: document.getElementById("geminiPromptModal"),
    closeGeminiPromptModalBtn: document.getElementById("closeGeminiPromptModalBtn"),
    closeGeminiPromptBottomBtn: document.getElementById("closeGeminiPromptBottomBtn"),
    copyGeminiPromptInnerBtn: document.getElementById("copyGeminiPromptInnerBtn"),
    geminiPromptTextarea: document.getElementById("geminiPromptTextarea"),
    dueloOnlineGameSelect: document.getElementById("dueloOnlineGameSelect"),
    dueloOnlineModeSelect: document.getElementById("dueloOnlineModeSelect"),
    dueloOnlineAutoTiebreaker: document.getElementById("dueloOnlineAutoTiebreaker"),
    famaGlobalWinRate: document.getElementById("famaGlobalWinRate"),

        /* Google Gemini API & Apuntes PDF */
    bolilleroUploadPdfBtn: document.getElementById("bolilleroUploadPdfBtn"),
    bolilleroPdfInput: document.getElementById("bolilleroPdfInput"),
    bolilleroIACard: document.getElementById("bolilleroIACard"),
    bolilleroIASourceBadge: document.getElementById("bolilleroIASourceBadge"),
    bolilleroIAGenerateBtn: document.getElementById("bolilleroIAGenerateBtn"),
    bolilleroIALoader: document.getElementById("bolilleroIALoader"),
    bolilleroIALoaderText: document.getElementById("bolilleroIALoaderText"),
    bolilleroIAContent: document.getElementById("bolilleroIAContent"),
    bolilleroIAPregunta: document.getElementById("bolilleroIAPregunta"),
    bolilleroIAOpciones: document.getElementById("bolilleroIAOpciones"),
    bolilleroIAFeedback: document.getElementById("bolilleroIAFeedback"),
    bolilleroIARetryBtn: document.getElementById("bolilleroIARetryBtn"),

    juegosApuntesBar: document.getElementById("juegosApuntesBar"),
    juegosApuntesStatus: document.getElementById("juegosApuntesStatus"),
    juegosPdfInput: document.getElementById("juegosPdfInput"),
    juegosUploadPdfBtn: document.getElementById("juegosUploadPdfBtn"),
    juegosGenerateIABtn: document.getElementById("juegosGenerateIABtn"),
    juegosRemovePdfBtn: document.getElementById("juegosRemovePdfBtn"),
    juegosIALoadingOverlay: document.getElementById("juegosIALoadingOverlay"),
    juegosIALoadingTitle: document.getElementById("juegosIALoadingTitle"),
    juegosIALoadingDesc: document.getElementById("juegosIALoadingDesc"),

    /* Centro Principal de Apuntes (PDF Hub Global) */
    mainGlobalPdfInput: document.getElementById("mainGlobalPdfInput"),
    mainUploadPdfBtn: document.getElementById("mainUploadPdfBtn"),
    mainPdfHubEmpty: document.getElementById("mainPdfHubEmpty"),
    mainPdfHubActive: document.getElementById("mainPdfHubActive"),
    mainPdfFileName: document.getElementById("mainPdfFileName"),
    mainPdfFileStats: document.getElementById("mainPdfFileStats"),
    mainChangePdfBtn: document.getElementById("mainChangePdfBtn"),
    mainRemovePdfBtn: document.getElementById("mainRemovePdfBtn"),
    bolilleroGlobalPdfBadge: document.getElementById("bolilleroGlobalPdfBadge"),
    bolilleroGlobalPdfName: document.getElementById("bolilleroGlobalPdfName"),
    bolilleroIaWordsBtn: document.getElementById("bolilleroIaWordsBtn"),
    bolilleroIaWordsModal: document.getElementById("bolilleroIaWordsModal"),
    closeIaWordsModalBtn: document.getElementById("closeIaWordsModalBtn"),
    cancelIaWordsModalBtn: document.getElementById("cancelIaWordsModalBtn"),
    iaWordsForm: document.getElementById("iaWordsForm"),
    iaWordsCountInput: document.getElementById("iaWordsCountInput"),
    iaWordsPdfName: document.getElementById("iaWordsPdfName"),
    iaWordsCurrentListName: document.getElementById("iaWordsCurrentListName"),
    submitIaWordsBtn: document.getElementById("submitIaWordsBtn"),
    submitIaWordsText: document.getElementById("submitIaWordsText"),

    soloUploadGlobalPdfBtn: document.getElementById("soloUploadGlobalPdfBtn"),
    soloGlobalPdfInput: document.getElementById("soloGlobalPdfInput"),
    soloPdfCardDesc: document.getElementById("soloPdfCardDesc"),

    /* Navegación y Vistas */
    navHomeBtn: document.getElementById("navHomeBtn"),
    navSoloBtn: document.getElementById("navSoloBtn"),
    navLabBtn: document.getElementById("navLabBtn"),
    navJuntosBtn: document.getElementById("navJuntosBtn"),
    navBolilleroBtn: document.getElementById("navBolilleroBtn"),
    navDueloBtn: document.getElementById("navDueloBtn"),
    navFamaBtn: document.getElementById("navFamaBtn"),
    brandLink: document.getElementById("brandLink"),
    viewHome: document.getElementById("viewHome"),
    viewSolo: document.getElementById("viewSolo"),
    viewJuntos: document.getElementById("viewJuntos"),
    viewBolillero: document.getElementById("viewBolillero"),
    viewDuelo: document.getElementById("viewDuelo"),
    viewFama: document.getElementById("viewFama"),
    interactiveBall: document.getElementById("interactiveBall"),
    heroGoSoloBtn: document.getElementById("heroGoSoloBtn"),
    heroGoJuntosBtn: document.getElementById("heroGoJuntosBtn"),
    homeGoToSoloBtn: document.getElementById("homeGoToSoloBtn"),
    homeGoToJuntosBtn: document.getElementById("homeGoToJuntosBtn"),
    homeGoToFamaBtn: document.getElementById("homeGoToFamaBtn"),
    soloOpenBolilleroBtn: document.getElementById("soloOpenBolilleroBtn"),
    soloOpenBombaBtn: document.getElementById("soloOpenBombaBtn"),
    soloOpenImpostorBtn: document.getElementById("soloOpenImpostorBtn"),
    soloOpenMemotestBtn: document.getElementById("soloOpenMemotestBtn"),
    soloNewListShortcutBtn: document.getElementById("soloNewListShortcutBtn"),
    backFromBolilleroBtn: document.getElementById("backFromBolilleroBtn"),
    backFromDueloBtn: document.getElementById("backFromDueloBtn"),
    juntosQuickCreateBtn: document.getElementById("juntosQuickCreateBtn"),
    juntosQuickJoinBtn: document.getElementById("juntosQuickJoinBtn"),
    openDueloBolilleroCardBtn: document.getElementById("openDueloBolilleroCardBtn"),
    openDueloBombaCardBtn: document.getElementById("openDueloBombaCardBtn"),
    openDueloImpostorCardBtn: document.getElementById("openDueloImpostorCardBtn"),
    openDueloMemotestCardBtn: document.getElementById("openDueloMemotestCardBtn"),
    openDueloTriatlonCardBtn: document.getElementById("openDueloTriatlonCardBtn"),
    openCoopBombaBtn: document.getElementById("openCoopBombaBtn"),
    openCoopMemotestBtn: document.getElementById("openCoopMemotestBtn"),
    openCoopBolilleroBtn: document.getElementById("openCoopBolilleroBtn"),
    heroEnterBolilleroBtn: document.getElementById("heroEnterBolilleroBtn"),
    openBolilleroBtns: document.querySelectorAll(".open-bolillero-btn"),
    openPomodoroFromCardBtn: document.getElementById("openPomodoroFromCardBtn"),
    openDueloFromCardBtn: document.getElementById("openDueloFromCardBtn"),
    openFamaFromCardBtn: document.getElementById("openFamaFromCardBtn"),

    /* Tema Sol/Luna */
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    themeToggleIcon: document.getElementById("themeToggleIcon"),

    /* Alternador Modo Rendimiento (Lite / Visual Pro) */
    perfToggleBtn: document.getElementById("perfToggleBtn"),
    perfToggleIcon: document.getElementById("perfToggleIcon"),
    drawerPerfToggleBtn: document.getElementById("drawerPerfToggleBtn"),
    drawerPerfToggleIcon: document.getElementById("drawerPerfToggleIcon"),
    drawerPerfLabel: document.getElementById("drawerPerfLabel"),

    /* Menú Plegable (☰) y Drawer Lateral */
    menuToggleBtn: document.getElementById("menuToggleBtn"),
    drawerBackdrop: document.getElementById("drawerBackdrop"),
    drawerMenu: document.getElementById("drawerMenu"),
    drawerCloseBtn: document.getElementById("drawerCloseBtn"),
    drawerNavHome: document.getElementById("drawerNavHome"),
    drawerNavSolo: document.getElementById("drawerNavSolo"),
    drawerNavJuntos: document.getElementById("drawerNavJuntos"),
    drawerNavBolillero: document.getElementById("drawerNavBolillero"),
    drawerNavDuelo: document.getElementById("drawerNavDuelo"),
    drawerNavFama: document.getElementById("drawerNavFama"),
    drawerNavSoloBomba: document.getElementById("drawerNavSoloBomba"),
    drawerNavSoloImpostor: document.getElementById("drawerNavSoloImpostor"),
    drawerNavSoloMemotest: document.getElementById("drawerNavSoloMemotest"),
    drawerNavOnlineBolillero: document.getElementById("drawerNavOnlineBolillero"),
    drawerNavOnlineBomba: document.getElementById("drawerNavOnlineBomba"),
    drawerNavOnlineImpostor: document.getElementById("drawerNavOnlineImpostor"),
    drawerNavOnlineMemotest: document.getElementById("drawerNavOnlineMemotest"),
    drawerNavOnlineTriatlon: document.getElementById("drawerNavOnlineTriatlon"),
    drawerThemeToggleBtn: document.getElementById("drawerThemeToggleBtn"),
    drawerThemeToggleIcon: document.getElementById("drawerThemeToggleIcon"),
    drawerThemeLabel: document.getElementById("drawerThemeLabel"),
    drawerPomoIndicator: document.getElementById("drawerPomoIndicator"),
    drawerPomoBadge: document.getElementById("drawerPomoBadge"),
    drawerPomoTime: document.getElementById("drawerPomoTime"),
    drawerPomoToggleBtn: document.getElementById("drawerPomoToggleBtn"),
    drawerPomoOpenCardBtn: document.getElementById("drawerPomoOpenCardBtn"),
    drawerNewListBtn: document.getElementById("drawerNewListBtn"),
    drawerListsContainer: document.getElementById("drawerListsContainer"),

    /* Dynamic Island (Píldora) */
    pomodoroPill: document.getElementById("pomodoroPill"),
    pillTimer: document.getElementById("pillTimer"),
    pillBadge: document.getElementById("pillBadge"),

    /* Tarjeta Flotante Pomodoro */
    pomodoroFloatingCard: document.getElementById("pomodoroFloatingCard"),
    floatingCardHeader: document.getElementById("floatingCardHeader"),
    floatingBadge: document.getElementById("floatingBadge"),
    pinPomodoroBtn: document.getElementById("pinPomodoroBtn"),
    minimizePomodoroBtn: document.getElementById("minimizePomodoroBtn"),

    
    /* Bolillero y Listas */
    listsContainer: document.getElementById("listsContainer"),
    newListButton: document.getElementById("newListButton"),
    currentListTitle: document.getElementById("currentListTitle"),
    currentListDescription: document.getElementById("currentListDescription"),
    topicsGrid: document.getElementById("topicsGrid"),
    addTopicButton: document.getElementById("addTopicButton"),
    spinButton: document.getElementById("spinButton"),
    rollingDisplay: document.getElementById("rollingDisplay"),
    resultSection: document.getElementById("resultSection"),
    selectedTopic: document.getElementById("selectedTopic"),
    drawAgainButton: document.getElementById("drawAgainButton"),
    restoreRoundButton: document.getElementById("restoreRoundButton"),
    importButton: document.getElementById("importButton"),
    importFileInput: document.getElementById("importFileInput"),

    /* Pomodoro Controles */
    modeStudyBtn: document.getElementById("modeStudyBtn"),
    modeShortBreakBtn: document.getElementById("modeShortBreakBtn"),
    modeLongBreakBtn: document.getElementById("modeLongBreakBtn"),
    pomodoroDisplay: document.getElementById("pomodoroDisplay"),
    pomodoroProgressBar: document.getElementById("pomodoroProgressBar"),
    pomodoroContext: document.getElementById("pomodoroContext"),
    pomodoroToggleBtn: document.getElementById("pomodoroToggleBtn"),
    pomodoroToggleIcon: document.getElementById("pomodoroToggleIcon"),
    pomodoroToggleText: document.getElementById("pomodoroToggleText"),
    pomodoroResetBtn: document.getElementById("pomodoroResetBtn"),
    pomodoroSkipBtn: document.getElementById("pomodoroSkipBtn"),
    pomodoroCyclesCount: document.getElementById("pomodoroCyclesCount"),
    pomodoroConfigButton: document.getElementById("pomodoroConfigButton"),

    /* Duelo Perfil de Usuario & Alerta */
    dueloUserCard: document.getElementById("dueloUserCard"),
    dueloUserAvatarWrap: document.getElementById("dueloUserAvatarWrap"),
    dueloUserAvatarDisplay: document.getElementById("dueloUserAvatarDisplay"),
    dueloUserNameDisplay: document.getElementById("dueloUserNameDisplay"),
    dueloUserRankBadge: document.getElementById("dueloUserRankBadge"),
    dueloUserMetaDisplay: document.getElementById("dueloUserMetaDisplay"),
    dueloChangeAvatarBtn: document.getElementById("dueloChangeAvatarBtn"),
    dueloAuthModalBtn: document.getElementById("dueloAuthModalBtn"),
    dueloGuestAlert: document.getElementById("dueloGuestAlert"),
    dueloCreateAccountPromptBtn: document.getElementById("dueloCreateAccountPromptBtn"),

    /* Duelo Selector de Modo */
    dueloModeOnlineBtn: document.getElementById("dueloModeOnlineBtn"),
    dueloModeLocalBtn: document.getElementById("dueloModeLocalBtn"),
    dueloOnlinePanel: document.getElementById("dueloOnlinePanel"),
    dueloLocalPanel: document.getElementById("dueloLocalPanel"),

    /* Duelo Setup Online & Explorador de Lobbies */
    dueloOnlineSetupView: document.getElementById("dueloLobbyBrowser") || document.getElementById("dueloOnlineSetupView"),
    dueloLobbyBrowser: document.getElementById("dueloLobbyBrowser"),
    dueloOpenCreateModalBtn: document.getElementById("dueloOpenCreateModalBtn"),
    dueloOpenPinModalBtn: document.getElementById("dueloOpenPinModalBtn"),
    dueloCreateRoomModal: document.getElementById("dueloCreateRoomModal"),
    dueloCloseCreateModalBtn: document.getElementById("dueloCloseCreateModalBtn"),
    dueloJoinByPinModal: document.getElementById("dueloJoinByPinModal"),
    dueloClosePinModalBtn: document.getElementById("dueloClosePinModalBtn"),
    dueloLobbiesCount: document.getElementById("dueloLobbiesCount"),
    dueloBrowserFilters: document.getElementById("dueloBrowserFilters"),
    dueloPublicLobbiesGrid: document.getElementById("dueloPublicLobbiesGrid"),
    dueloLobbiesEmptyState: document.getElementById("dueloLobbiesEmptyState"),
    dueloEmptyCreateBtn: document.getElementById("dueloEmptyCreateBtn"),
    dueloCreateRoomName: document.getElementById("dueloCreateRoomName"),
    dueloCreateRoomIsPublic: document.getElementById("dueloCreateRoomIsPublic"),
    dueloOnlineModoSelect: document.getElementById("dueloOnlineModoSelect"),
    dueloOnlineModoHint: document.getElementById("dueloOnlineModoHint"),
    dueloOnlineListaSelect: document.getElementById("dueloOnlineListaSelect"),
    dueloOnlineListaHint: document.getElementById("dueloOnlineListaHint"),
    dueloOnlineTimeSelect: document.getElementById("dueloOnlineTimeSelect"),
    dueloOnlineHasPassword: document.getElementById("dueloOnlineHasPassword"),
    dueloOnlinePasswordRow: document.getElementById("dueloOnlinePasswordRow"),
    dueloOnlineRoomPassword: document.getElementById("dueloOnlineRoomPassword"),
    dueloOnlineComodinSocorro: document.getElementById("dueloOnlineComodinSocorro"),
    dueloOnlineComodinPista: document.getElementById("dueloOnlineComodinPista"),
    dueloOnlineComodinPaso: document.getElementById("dueloOnlineComodinPaso"),
    dueloOnlineReglaRacha: document.getElementById("dueloOnlineReglaRacha"),
    dueloOnlineReglaRobo: document.getElementById("dueloOnlineReglaRobo"),
    dueloCreateRoomBtn: document.getElementById("dueloCreateRoomBtn"),
    dueloJoinRoomCode: document.getElementById("dueloJoinRoomCode"),
    dueloJoinRoomPass: document.getElementById("dueloJoinRoomPass"),
    dueloJoinAvatarPreview: document.getElementById("dueloJoinAvatarPreview"),
    dueloJoinNamePreview: document.getElementById("dueloJoinNamePreview"),
    dueloJoinRoomBtn: document.getElementById("dueloJoinRoomBtn"),
    dueloOnlineWaitingRoom: document.getElementById("dueloOnlineWaitingRoom"),
    dueloWaitingRoomCode: document.getElementById("dueloWaitingRoomCode"),
    dueloWaitingRoomModoBadge: document.getElementById("dueloWaitingRoomModoBadge"),
    dueloMagicLinkInput: document.getElementById("dueloMagicLinkInput"),
    dueloCopyLinkBtn: document.getElementById("dueloCopyLinkBtn"),
    dueloShareLinkBtn: document.getElementById("dueloShareLinkBtn"),
    dueloCopySuccessHint: document.getElementById("dueloCopySuccessHint"),
    dueloOnlineConnectedCount: document.getElementById("dueloOnlineConnectedCount"),
    dueloServerStatusBadge: document.getElementById("dueloServerStatusBadge"),
    dueloOnlinePlayersGrid: document.getElementById("dueloOnlinePlayersGrid"),
    dueloHostControlsArea: document.getElementById("dueloHostControlsArea"),
    dueloLaunchOnlineMatchBtn: document.getElementById("dueloLaunchOnlineMatchBtn"),
    dueloGuestWaitArea: document.getElementById("dueloGuestWaitArea"),
    dueloLeaveOnlineRoomBtn: document.getElementById("dueloLeaveOnlineRoomBtn"),

    /* Duelo Coop Banner & Relevo */
    dueloCoopBanner: document.getElementById("dueloCoopBanner"),
    dueloCoopLivesDisplay: document.getElementById("dueloCoopLivesDisplay"),
    dueloCoopPointsDisplay: document.getElementById("dueloCoopPointsDisplay"),
    dueloCoopProgressBar: document.getElementById("dueloCoopProgressBar"),
    dueloBtnRelevoCoop: document.getElementById("dueloBtnRelevoCoop"),
    dueloRelevoPromptBox: document.getElementById("dueloRelevoPromptBox"),
    dueloRelevoSenderName: document.getElementById("dueloRelevoSenderName"),
    dueloAcceptRelevoBtn: document.getElementById("dueloAcceptRelevoBtn"),

    /* Duelo Lobby Local */
    dueloLobby: document.getElementById("dueloLobby"),
    dueloPlayerCountBadge: document.getElementById("dueloPlayerCountBadge"),
    dueloPlayerInput: document.getElementById("dueloPlayerInput"),
    dueloAddPlayerBtn: document.getElementById("dueloAddPlayerBtn"),
    dueloPlayersChips: document.getElementById("dueloPlayersChips"),
    dueloListaSelect: document.getElementById("dueloListaSelect"),
    dueloListaHint: document.getElementById("dueloListaHint"),
    dueloMinutosInput: document.getElementById("dueloMinutosInput"),
    dueloSegundosInput: document.getElementById("dueloSegundosInput"),
    dueloToggleAllComodinesBtn: document.getElementById("dueloToggleAllComodinesBtn"),
    dueloComodinSocorro: document.getElementById("dueloComodinSocorro"),
    dueloComodinPista: document.getElementById("dueloComodinPista"),
    dueloComodinPaso: document.getElementById("dueloComodinPaso"),
    dueloReglaRacha: document.getElementById("dueloReglaRacha"),
    dueloReglaRobo: document.getElementById("dueloReglaRobo"),
    dueloStartBtn: document.getElementById("dueloStartBtn"),
    dueloViewFamaFromLobbyBtn: document.getElementById("dueloViewFamaFromLobbyBtn"),

    /* Duelo Arena */
    dueloArena: document.getElementById("dueloArena"),
    dueloBarListName: document.getElementById("dueloBarListName"),
    dueloBarRemainingTopics: document.getElementById("dueloBarRemainingTopics"),
    dueloEndMatchBtn: document.getElementById("dueloEndMatchBtn"),
    dueloPlayerRoulette: document.getElementById("dueloPlayerRoulette"),
    dueloTopicRoulette: document.getElementById("dueloTopicRoulette"),
    dueloSpinBtn: document.getElementById("dueloSpinBtn"),
    dueloTurnArea: document.getElementById("dueloTurnArea"),
    dueloTurnHeader: document.getElementById("dueloTurnHeader"),
    dueloTurnAvatar: document.getElementById("dueloTurnAvatar"),
    dueloTurnPlayerName: document.getElementById("dueloTurnPlayerName"),
    dueloTurnStreakBadge: document.getElementById("dueloTurnStreakBadge"),
    dueloQuickScratchpadBtn: document.getElementById("dueloQuickScratchpadBtn"),
    dueloQuickPomodoroBtn: document.getElementById("dueloQuickPomodoroBtn"),
    dueloActiveTopicTitle: document.getElementById("dueloActiveTopicTitle"),
    dueloTimerDigits: document.getElementById("dueloTimerDigits"),
    dueloTimerToggleBtn: document.getElementById("dueloTimerToggleBtn"),
    dueloTimerBar: document.getElementById("dueloTimerBar"),
    dueloComodinesTray: document.getElementById("dueloComodinesTray"),
    dueloBtnSocorro: document.getElementById("dueloBtnSocorro"),
    dueloBtnPista: document.getElementById("dueloBtnPista"),
    dueloBtnPaso: document.getElementById("dueloBtnPaso"),
    dueloLocalEvalSection: document.getElementById("dueloLocalEvalSection"),
    dueloGradeImpecableBtn: document.getElementById("dueloGradeImpecableBtn"),
    dueloImpecablePtsLabel: document.getElementById("dueloImpecablePtsLabel"),
    dueloGradeAyudaBtn: document.getElementById("dueloGradeAyudaBtn"),
    dueloGradePasoBtn: document.getElementById("dueloGradePasoBtn"),

    /* Fase, Roles y Controles del Turno */
    dueloTurnPhaseBadge: document.getElementById("dueloTurnPhaseBadge"),
    dueloActiveTopicDesc: document.getElementById("dueloActiveTopicDesc"),
    dueloTurnRoleNotice: document.getElementById("dueloTurnRoleNotice"),
    dueloRoleNoticeIcon: document.getElementById("dueloRoleNoticeIcon"),
    dueloRoleNoticeText: document.getElementById("dueloRoleNoticeText"),
    dueloOradorControlBar: document.getElementById("dueloOradorControlBar"),
    dueloOradorFinishBtn: document.getElementById("dueloOradorFinishBtn"),
    dueloOradorConcedeBtn: document.getElementById("dueloOradorConcedeBtn"),

    /* Votación Individual Online */
    dueloOnlineVoteBox: document.getElementById("dueloOnlineVoteBox"),
    dueloOnlineVoteActions: document.getElementById("dueloOnlineVoteActions"),
    dueloOradorWaitingVotesBox: document.getElementById("dueloOradorWaitingVotesBox"),
    dueloVoteTargetPlayerName: document.getElementById("dueloVoteTargetPlayerName"),
    dueloOnlineVote10Btn: document.getElementById("dueloOnlineVote10Btn"),
    dueloOnlineVote5Btn: document.getElementById("dueloOnlineVote5Btn"),
    dueloOnlineVote0Btn: document.getElementById("dueloOnlineVote0Btn"),
    dueloOnline10PtsLabel: document.getElementById("dueloOnline10PtsLabel"),
    dueloLiveVoteChips: document.getElementById("dueloLiveVoteChips"),
    dueloVoteResultSummary: document.getElementById("dueloVoteResultSummary"),
    dueloVoteResultText: document.getElementById("dueloVoteResultText"),
    dueloHostNextSpinArea: document.getElementById("dueloHostNextSpinArea"),
    dueloHostNextSpinBtn: document.getElementById("dueloHostNextSpinBtn"),

    /* Robo Relámpago Local & Online */
    dueloRoboBox: document.getElementById("dueloRoboBox"),
    dueloBuzzerContainer: document.getElementById("dueloBuzzerContainer"),
    dueloThiefActiveArea: document.getElementById("dueloThiefActiveArea"),
    dueloThiefTitle: document.getElementById("dueloThiefTitle"),
    dueloThiefTimerDigits: document.getElementById("dueloThiefTimerDigits"),
    dueloThiefSuccessBtn: document.getElementById("dueloThiefSuccessBtn"),
    dueloThiefFailBtn: document.getElementById("dueloThiefFailBtn"),
    dueloOnlineRoboOverlay: document.getElementById("dueloOnlineRoboOverlay"),
    dueloOnlineBuzzerTriggerBtn: document.getElementById("dueloOnlineBuzzerTriggerBtn"),
    dueloOnlineRoboStatus: document.getElementById("dueloOnlineRoboStatus"),

    dueloScoreboardList: document.getElementById("dueloScoreboardList"),
    dueloRoundCounterBadge: document.getElementById("dueloRoundCounterBadge"),
    dueloTurnLog: document.getElementById("dueloTurnLog"),

    /* Chat Multimedia en Vivo */
    dueloChatDock: document.getElementById("dueloChatDock"),
    dueloChatToggleBtn: document.getElementById("dueloChatToggleBtn"),
    dueloChatUnreadBadge: document.getElementById("dueloChatUnreadBadge"),
    dueloChatWindow: document.getElementById("dueloChatWindow"),
    dueloChatCloseBtn: document.getElementById("dueloChatCloseBtn"),
    dueloChatMessages: document.getElementById("dueloChatMessages"),
    dueloVoiceRecordingBar: document.getElementById("dueloVoiceRecordingBar"),
    dueloVoiceRecTimer: document.getElementById("dueloVoiceRecTimer"),
    dueloVoiceCancelBtn: document.getElementById("dueloVoiceCancelBtn"),
    dueloVoiceSendBtn: document.getElementById("dueloVoiceSendBtn"),
    dueloChatForm: document.getElementById("dueloChatForm"),
    dueloChatPhotoInput: document.getElementById("dueloChatPhotoInput"),
    dueloChatPhotoBtn: document.getElementById("dueloChatPhotoBtn"),
    dueloChatMicBtn: document.getElementById("dueloChatMicBtn"),
    dueloChatTextInput: document.getElementById("dueloChatTextInput"),
    dueloChatSendBtn: document.getElementById("dueloChatSendBtn"),
    photoZoomModal: document.getElementById("photoZoomModal"),
    photoZoomImg: document.getElementById("photoZoomImg"),
    photoZoomCloseBtn: document.getElementById("photoZoomCloseBtn"),

    /* Salón de la Fama */
    famaPlayNewDueloBtn: document.getElementById("famaPlayNewDueloBtn"),
    famaClearHistoryBtn: document.getElementById("famaClearHistoryBtn"),
    famaTotalMatchesCount: document.getElementById("famaTotalMatchesCount"),
    famaTopChampionName: document.getElementById("famaTopChampionName"),
    famaTotalPointsDistributed: document.getElementById("famaTotalPointsDistributed"),
    famaLeaderboardBody: document.getElementById("famaLeaderboardBody"),
    famaMatchesBadge: document.getElementById("famaMatchesBadge"),
    famaMatchesGrid: document.getElementById("famaMatchesGrid"),

    /* Modales */
    listModal: document.getElementById("listModal"),
    listForm: document.getElementById("listForm"),
    listNameInput: document.getElementById("listNameInput"),
    cancelListButton: document.getElementById("cancelListButton"),

    topicModal: document.getElementById("topicModal"),
    topicForm: document.getElementById("topicForm"),
    topicInput: document.getElementById("topicInput"),
    cancelTopicButton: document.getElementById("cancelTopicButton"),

    pomodoroModal: document.getElementById("pomodoroModal"),
    pomodoroForm: document.getElementById("pomodoroForm"),
    studyDurationInput: document.getElementById("studyDurationInput"),
    shortBreakDurationInput: document.getElementById("shortBreakDurationInput"),
    longBreakDurationInput: document.getElementById("longBreakDurationInput"),
    soundEnabledInput: document.getElementById("soundEnabledInput"),
    cancelPomodoroButton: document.getElementById("cancelPomodoroButton"),

    dueloVictoryModal: document.getElementById("dueloVictoryModal"),
    victoryModalTitle: document.getElementById("victoryModalTitle"),
    victoryModalSubtitle: document.getElementById("victoryModalSubtitle"),
    dueloPodioContainer: document.getElementById("dueloPodioContainer"),
    dueloSpecialMentions: document.getElementById("dueloSpecialMentions"),
    victoryRegisterGuestBtn: document.getElementById("victoryRegisterGuestBtn"),
    victoryCopySummaryBtn: document.getElementById("victoryCopySummaryBtn"),
    victoryGoToFamaBtn: document.getElementById("victoryGoToFamaBtn"),
    victoryCloseBtn: document.getElementById("victoryCloseBtn"),
    dueloSocorroModal: document.getElementById("dueloSocorroModal"),
    dueloSocorroOptions: document.getElementById("dueloSocorroOptions"),
    dueloCancelSocorroBtn: document.getElementById("dueloCancelSocorroBtn"),

    /* Modal Cuentas & PIN */
    authAccountModal: document.getElementById("authAccountModal"),
    authModalCloseBtn: document.getElementById("authModalCloseBtn"),
    authTabRegister: document.getElementById("authTabRegister"),
    authTabLogin: document.getElementById("authTabLogin"),
    authRegisterForm: document.getElementById("authRegisterForm"),
    authRegApodo: document.getElementById("authRegApodo"),
    authRegAvatarPreview: document.getElementById("authRegAvatarPreview"),
    authRegOpenAvatarPickerBtn: document.getElementById("authRegOpenAvatarPickerBtn"),
    authRegPin: document.getElementById("authRegPin"),
    authRegEmail: document.getElementById("authRegEmail"),
    authContinueGuestBtn: document.getElementById("authContinueGuestBtn"),
    authSubmitRegisterBtn: document.getElementById("authSubmitRegisterBtn"),
    authLoginForm: document.getElementById("authLoginForm"),
    authLoginSelect: document.getElementById("authLoginSelect"),
    authLoginPin: document.getElementById("authLoginPin"),
    authLoginError: document.getElementById("authLoginError"),
    authForgotPinBtn: document.getElementById("authForgotPinBtn"),
    authSubmitLoginBtn: document.getElementById("authSubmitLoginBtn"),

    /* Modal Selector de Avatares */
    avatarPickerModal: document.getElementById("avatarPickerModal"),
    avatarModalCloseBtn: document.getElementById("avatarModalCloseBtn"),
    avatarTabEmojis: document.getElementById("avatarTabEmojis"),
    avatarTabPhoto: document.getElementById("avatarTabPhoto"),
    avatarPanelEmojis: document.getElementById("avatarPanelEmojis"),
    avatarPanelPhoto: document.getElementById("avatarPanelPhoto"),
    avatarEmojiSearchInput: document.getElementById("avatarEmojiSearchInput"),
    avatarEmojiCategoryPills: document.getElementById("avatarEmojiCategoryPills"),
    avatarEmojisGrid: document.getElementById("avatarEmojisGrid"),
    avatarCustomEmojiInput: document.getElementById("avatarCustomEmojiInput"),
    avatarCustomEmojiBtn: document.getElementById("avatarCustomEmojiBtn"),
    avatarFileInput: document.getElementById("avatarFileInput"),
    avatarCaptureCameraBtn: document.getElementById("avatarCaptureCameraBtn"),
    avatarUploadGalleryBtn: document.getElementById("avatarUploadGalleryBtn"),
    avatarCropPreviewImg: document.getElementById("avatarCropPreviewImg"),
    avatarCropPlaceholder: document.getElementById("avatarCropPlaceholder"),
    avatarCanvas: document.getElementById("avatarCanvas"),
    avatarConfirmPhotoBtn: document.getElementById("avatarConfirmPhotoBtn"),

    /* Templates */
    listItemTemplate: document.getElementById("listItemTemplate"),
    topicCardTemplate: document.getElementById("topicCardTemplate"),

    /* Modal de Reglas e Instrucciones */
    rulesModal: document.getElementById("rulesModal"),
    rulesModalIcon: document.getElementById("rulesModalIcon"),
    rulesModalTitle: document.getElementById("rulesModalTitle"),
    rulesModalSubtitle: document.getElementById("rulesModalSubtitle"),
    rulesModalBody: document.getElementById("rulesModalBody"),
    rulesModalCloseBtn: document.getElementById("rulesModalCloseBtn"),
    rulesModalUnderstoodBtn: document.getElementById("rulesModalUnderstoodBtn"),
    rulesDontShowAgainCheckbox: document.getElementById("rulesDontShowAgainCheckbox"),
    bolilleroRulesBtn: document.getElementById("bolilleroRulesBtn"),
    juegosRulesBtn: document.getElementById("juegosRulesBtn"),
    soloRulesBtn: document.getElementById("soloRulesBtn"),
    pdfHubRulesBtn: document.getElementById("pdfHubRulesBtn"),

    /* MÓDULO LABORATORIO DE PRÁCTICAS */
    viewLaboratorio: document.getElementById("viewLaboratorio"),
    homeGoToLabBtn: document.getElementById("homeGoToLabBtn"),
    homeCardLaboratorio: document.getElementById("homeCardLaboratorio"),
    soloOpenLabBtn: document.getElementById("soloOpenLabBtn"),
    drawerNavLaboratorio: document.getElementById("drawerNavLaboratorio"),
    labMobileSwitcher: document.getElementById("labMobileSwitcher"),
    labMobileBtnEnunciado: document.getElementById("labMobileBtnEnunciado"),
    labMobileBtnHerramientas: document.getElementById("labMobileBtnHerramientas"),
    laboratorioSplit: document.getElementById("laboratorioSplit"),
    labMobileFloatToggleBtn: document.getElementById("labMobileFloatToggleBtn"),
    labMobileFloatIcon: document.getElementById("labMobileFloatIcon"),
    labMobileFloatText: document.getElementById("labMobileFloatText"),
    labActiveTopicBadge: document.getElementById("labActiveTopicBadge"),
    labActivePdfBadge: document.getElementById("labActivePdfBadge"),
    labBtnAbrirConfigModal: document.getElementById("labBtnAbrirConfigModal"),
    labBtnGenerarConIA: document.getElementById("labBtnGenerarConIA"),
    labBtnGenerarOtro: document.getElementById("labBtnGenerarOtro"),
    labXpDisplay: document.getElementById("labXpDisplay"),
    labTagMateria: document.getElementById("labMateriaBadge"),
    labTagDificultad: document.getElementById("labTagDificultad"),
    labTagTema: document.getElementById("labTagTema"),
    labTagOrigenPdf: document.getElementById("labTagOrigenPdf"),
    labTituloCaso: document.getElementById("labTituloCaso"),
    labNarrativaCaso: document.getElementById("labNarrativaCaso"),
    labQuestionsProgress: document.getElementById("labQuestionsProgress"),
    labQuestionsList: document.getElementById("labQuestionsList"),
    labCompletedCard: document.getElementById("labCompletedCard"),
    labCompletedDesc: document.getElementById("labCompletedDesc"),
    labCompletedXpReward: document.getElementById("labCompletedXpReward"),
    labBtnSiguienteCasoModal: document.getElementById("labBtnSiguienteCasoModal"),

    /* Modal de Configuración & PDF */
    labConfigModal: document.getElementById("labConfigModal"),
    closeLabConfigModalBtn: document.getElementById("closeLabConfigModalBtn"),
    closeLabConfigModalBottomBtn: document.getElementById("closeLabConfigModalBottomBtn"),
    labBtnCargarConfig: document.getElementById("labBtnCargarConfig"),
    labUploadDropzone: document.getElementById("labUploadDropzone"),
    labPdfFileInput: document.getElementById("labPdfFileInput"),
    labLoadedPdfInfo: document.getElementById("labLoadedPdfInfo"),
    labLoadedPdfName: document.getElementById("labLoadedPdfName"),
    labLoadedPdfMeta: document.getElementById("labLoadedPdfMeta"),
    labBtnQuitarPdf: document.getElementById("labBtnQuitarPdf"),
    labTopicsGrid: document.getElementById("labTopicsGrid"),

    /* Tabs y Paneles del Laboratorio */
    labTabBtnFreq: document.getElementById("labTabBtnFreq"),
    labTabBtnProb: document.getElementById("labTabBtnProb"),
    labTabBtnBayes: document.getElementById("labTabBtnBayes"),
    labTabBtnScratch: document.getElementById("labTabBtnScratch"),
    labWidgetFreq: document.getElementById("labWidgetFreq"),
    labWidgetProb: document.getElementById("labWidgetProb"),
    labWidgetBayes: document.getElementById("labWidgetBayes"),
    labWidgetScratch: document.getElementById("labWidgetScratch"),

    /* Grilla de Frecuencias */
    labBtnAddRow: document.getElementById("labBtnAddRow"),
    labBtnRemoveRow: document.getElementById("labBtnRemoveRow"),
    labSelectColType: document.getElementById("labSelectColType"),
    labBtnAddCol: document.getElementById("labBtnAddCol"),
    labBtnRemoveCol: document.getElementById("labBtnRemoveCol"),
    labBtnClearTable: document.getElementById("labBtnClearTable"),
    labGridTableHead: document.getElementById("labGridTableHead"),
    labGridTableBody: document.getElementById("labGridTableBody"),
    labFootFiTotal: document.getElementById("labFootFiTotal"),
    labFootXiFiTotal: document.getElementById("labFootXiFiTotal"),
    labFootXi2FiTotal: document.getElementById("labFootXi2FiTotal"),
    labStatN: document.getElementById("labStatN"),
    labStatMean: document.getElementById("labStatMean"),
    labStatVar: document.getElementById("labStatVar"),
    labStatStd: document.getElementById("labStatStd"),
    labStatCV: document.getElementById("labStatCV"),
    labStatMode: document.getElementById("labStatMode"),
    labStatMedian: document.getElementById("labStatMedian"),

    /* Calculadora de Probabilidades & SVG Gauss */
    labNormMean: document.getElementById("labNormMean"),
    labNormStd: document.getElementById("labNormStd"),
    labNormX: document.getElementById("labNormX"),
    labNormTail: document.getElementById("labNormTail"),
    labGaussSvg: document.getElementById("labGaussSvg"),
    labNormZVal: document.getElementById("labNormZVal"),
    labNormPVal: document.getElementById("labNormPVal"),
    labBtnCopyNormToInput: document.getElementById("labBtnCopyNormToInput"),
    labBinoN: document.getElementById("labBinoN"),
    labBinoP: document.getElementById("labBinoP"),
    labBinoK: document.getElementById("labBinoK"),
    labBinoExactVal: document.getElementById("labBinoExactVal"),
    labBinoLeVal: document.getElementById("labBinoLeVal"),
    labBinoGeVal: document.getElementById("labBinoGeVal"),
    labPoisLambda: document.getElementById("labPoisLambda"),
    labPoisK: document.getElementById("labPoisK"),
    labPoisExactVal: document.getElementById("labPoisExactVal"),
    labPoisLeVal: document.getElementById("labPoisLeVal"),
    labCalcScreen: document.getElementById("labCalcScreen"),

    /* Matriz de Bayes */
    labBayesEvAName: document.getElementById("labBayesEvAName"),
    labBayesEvBName: document.getElementById("labBayesEvBName"),
    labBayesThA: document.getElementById("labBayesThA"),
    labBayesThNotA: document.getElementById("labBayesThNotA"),
    labBayesThB: document.getElementById("labBayesThB"),
    labBayesThNotB: document.getElementById("labBayesThNotB"),
    labBayesCellAB: document.getElementById("labBayesCellAB"),
    labBayesCellANotB: document.getElementById("labBayesCellANotB"),
    labBayesCellNotAB: document.getElementById("labBayesCellNotAB"),
    labBayesCellNotANotB: document.getElementById("labBayesCellNotANotB"),
    labBayesTotalA: document.getElementById("labBayesTotalA"),
    labBayesTotalNotA: document.getElementById("labBayesTotalNotA"),
    labBayesTotalB: document.getElementById("labBayesTotalB"),
    labBayesTotalNotB: document.getElementById("labBayesTotalNotB"),
    labBayesGrandTotal: document.getElementById("labBayesGrandTotal"),
    labBayesFormulaText: document.getElementById("labBayesFormulaText"),
    labBayesResultVal: document.getElementById("labBayesResultVal"),

    /* Pizarrón */
    labScratchPenBtn: document.getElementById("labScratchPenBtn"),
    labScratchEraserBtn: document.getElementById("labScratchEraserBtn"),
    labScratchClearBtn: document.getElementById("labScratchClearBtn"),
    labScratchCanvas: document.getElementById("labScratchCanvas")
};

/* ==========================================================
   SISTEMA DE NOTIFICACIONES TOAST (GLOBAL)
   ========================================================== */
function mostrarToast(mensaje, duracion = 3200) {
    if (!mensaje) return;
    let container = document.getElementById("appToastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "appToastContainer";
        container.className = "app-toast-container";
        container.setAttribute("aria-live", "polite");
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "app-toast-item";
    toast.innerHTML = `<span class="app-toast-text">${mensaje}</span>`;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("is-visible");
    });

    const remover = () => {
        toast.classList.remove("is-visible");
        toast.classList.add("is-hiding");
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    };

    const timer = setTimeout(remover, duracion);
    toast.addEventListener("click", () => {
        clearTimeout(timer);
        remover();
    });
}
window.mostrarToast = mostrarToast;

function toggleTarjetaScratchpad() {
    if (typeof window.togglePizarron === "function") {
        window.togglePizarron();
    } else {
        const scratchpadCard = document.getElementById("scratchpadFloatingCard");
        if (scratchpadCard) {
            scratchpadCard.classList.toggle("is-minimized");
        }
    }
}
window.toggleTarjetaScratchpad = toggleTarjetaScratchpad;

function abrirTarjetaScratchpad() {
    if (typeof window.abrirPizarron === "function") {
        window.abrirPizarron();
    } else {
        const scratchpadCard = document.getElementById("scratchpadFloatingCard");
        if (scratchpadCard) {
            scratchpadCard.classList.remove("is-minimized");
        }
    }
}
window.abrirTarjetaScratchpad = abrirTarjetaScratchpad;

/* ==========================================================
   MODO DESARROLLADOR (ACCESO EXCLUSIVO LUCAS - ESTUDIAR JUNTOS)
   ========================================================== */
function esModoDevActivo() {
    try {
        return localStorage.getItem("modo_dev_lucas") === "true";
    } catch (e) {
        return false;
    }
}

function activarModoDev(silencioso = false) {
    try {
        localStorage.setItem("modo_dev_lucas", "true");
    } catch (e) {}
    aplicarModoDevUI();
    if (!silencioso) {
        mostrarToast("🛠️ ¡Modo Desarrollador activado! Acceso exclusivo concedido a Lucas.", "exito");
    }
}

function desactivarModoDev() {
    try {
        localStorage.removeItem("modo_dev_lucas");
    } catch (e) {}
    aplicarModoDevUI();
    mostrarToast("🔒 Modo Desarrollador desactivado. Estudiar Juntos vuelve a estar bloqueado.");
    if (estado && estado.interfaz && (estado.interfaz.vistaActual === "juntos" || estado.interfaz.vistaActual === "duelo")) {
        cambiarVista("home");
    }
}

function aplicarModoDevUI() {
    const activo = esModoDevActivo();
    document.body.classList.toggle("modo-dev-activo", activo);

    const devBadge = document.getElementById("juntosDevBadgeNotice");
    if (devBadge) devBadge.style.display = "none";

    if (dom.navJuntosBtn) {
        dom.navJuntosBtn.classList.remove("nav-link--locked");
        dom.navJuntosBtn.title = "Estudiar Juntos";
        dom.navJuntosBtn.innerHTML = `🤝 Estudiar Juntos`;
    }

    if (dom.drawerNavJuntos) {
        dom.drawerNavJuntos.classList.remove("drawer-nav-item--locked");
        const txt = dom.drawerNavJuntos.querySelector(".drawer-nav-text");
        if (txt) txt.textContent = "Estudiar Juntos";
    }

    if (dom.heroGoJuntosBtn) {
        dom.heroGoJuntosBtn.classList.remove("is-locked-btn");
        dom.heroGoJuntosBtn.innerHTML = `🤝 Entrar a Estudiar Juntos`;
        dom.heroGoJuntosBtn.title = "Ir a Estudiar Juntos";
    }

    if (dom.homeGoToJuntosBtn) {
        dom.homeGoToJuntosBtn.classList.remove("is-locked-btn");
        dom.homeGoToJuntosBtn.innerHTML = `🤝 Entrar a Estudiar Juntos`;
        dom.homeGoToJuntosBtn.title = "Ir a Estudiar Juntos";
    }
}

function inicializarModoDev() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    if (urlParams.get("dev") === "true" || hash === "#dev" || hash.includes("dev=true")) {
        activarModoDev();
        if (window.history.replaceState) {
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        }
    } else {
        aplicarModoDevUI();
    }
}

/* ==========================================================
   NAVEGACIÓN SPA (VISTAS: HOME / BOLILLERO / DUELO / FAMA)
   ========================================================== */
function cambiarVista(vista) {
    const rawTarget = (vista === "duelo" || vista === "juntos") ? "juntos" : vista;
    const vistasValidas = ["home", "solo", "juntos", "bolillero", "fama", "juegos", "laboratorio"];
    const vistaDestino = vistasValidas.includes(rawTarget) ? rawTarget : "home";

    const vistas = [
        { id: "home", domView: dom.viewHome },
        { id: "solo", domView: dom.viewSolo },
        { id: "juntos", domView: dom.viewDuelo },
        { id: "bolillero", domView: dom.viewBolillero },
        { id: "fama", domView: dom.viewFama },
        { id: "juegos", domView: dom.viewJuegosEdu },
        { id: "laboratorio", domView: dom.viewLaboratorio }
    ];

    // 1. Alternar visibilidad de las vistas
    vistas.forEach(({ id, domView }) => {
        if (!domView) return;
        const esActiva = id === vistaDestino;
        domView.classList.toggle("view--hidden", !esActiva);
        domView.classList.toggle("view--active", esActiva);
    });

    // 2. Sincronizar botones de la barra superior (Navbar)
    if (dom.navHomeBtn) dom.navHomeBtn.classList.toggle("is-active", vistaDestino === "home");
    if (dom.navSoloBtn) dom.navSoloBtn.classList.toggle("is-active", vistaDestino === "solo" || vistaDestino === "bolillero");
    if (dom.navLabBtn) dom.navLabBtn.classList.toggle("is-active", vistaDestino === "laboratorio");
    if (dom.navJuntosBtn) dom.navJuntosBtn.classList.toggle("is-active", vistaDestino === "juntos");
    if (dom.navBolilleroBtn) dom.navBolilleroBtn.classList.toggle("is-active", vistaDestino === "bolillero");
    if (dom.navDueloBtn) dom.navDueloBtn.classList.toggle("is-active", vistaDestino === "juntos");
    if (dom.navFamaBtn) dom.navFamaBtn.classList.toggle("is-active", vistaDestino === "fama");

    // 3. Sincronizar navegación en el Drawer lateral (Off-canvas)
    const drawerNavMap = {
        home: dom.drawerNavHome,
        solo: dom.drawerNavSolo,
        laboratorio: dom.drawerNavLaboratorio,
        juntos: dom.drawerNavJuntos,
        bolillero: dom.drawerNavBolillero,
        fama: dom.drawerNavFama
    };
    Object.entries(drawerNavMap).forEach(([id, btn]) => {
        if (btn) btn.classList.toggle("is-active", id === vistaDestino);
    });

    estado.interfaz.vistaActual = vistaDestino;

    const currentHash = window.location.hash.replace("#", "");
    if (currentHash !== vistaDestino) {
        window.location.hash = vistaDestino;
    }

    if (vistaDestino === "juntos") {
        if (!dueloEstado.partida.activa && !onlineDueloEstado.codigoSala) {
            actualizarDropdownListasDuelo();
            actualizarUIPerfilUsuario();
            if (dom.dueloOnlineSetupView) dom.dueloOnlineSetupView.classList.remove("hidden");
            if (dom.dueloOnlineWaitingRoom) dom.dueloOnlineWaitingRoom.classList.add("hidden");
            iniciarDiscoveryLobbiesOnline();
        }
    } else if (vistaDestino === "fama") {
        renderSalonDeLaFama();
    } else if (vistaDestino === "bolillero") {
        comprobarYMostrarReglas("bolillero");
    } else if (vistaDestino === "laboratorio") {
        iniciarOReanudarLaboratorio();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPerfilUsuarioDuelo() {
    actualizarUIPerfilUsuario();
}

function inicializarRutas() {
    const hash = window.location.hash.replace("#", "");
    const normalized = (hash === "duelo" || hash === "juntos") ? "juntos" : hash;
    if (["solo", "juntos", "bolillero", "fama", "home", "laboratorio"].includes(normalized)) {
        cambiarVista(normalized);
    } else {
        cambiarVista("home");
    }
}

/* ==========================================================
   MODO CLARO / OSCURO (TEMA)
   ========================================================== */
function inicializarTema() {
    const temaGuardado = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
    aplicarTema(temaGuardado);
}

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem(THEME_STORAGE_KEY, tema);

    if (dom.themeToggleIcon) {
        dom.themeToggleIcon.textContent = tema === "dark" ? "☀️" : "🌙";
    }
    if (dom.themeToggleBtn) {
        dom.themeToggleBtn.setAttribute(
            "aria-label",
            tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
        );
    }

    // Sincronizar en Drawer
    if (dom.drawerThemeToggleIcon) {
        dom.drawerThemeToggleIcon.textContent = tema === "dark" ? "☀️" : "🌙";
    }
    if (dom.drawerThemeLabel) {
        dom.drawerThemeLabel.textContent = tema === "dark" ? "Claro" : "Oscuro";
    }
}

function alternarTema() {
    const temaActual = document.documentElement.getAttribute("data-theme") || "dark";
    const nuevoTema = temaActual === "dark" ? "light" : "dark";
    aplicarTema(nuevoTema);
}

/* ==========================================================
   SISTEMA DE MODO RENDIMIENTO (LITE / VISUAL PRO)
   ========================================================== */
function inicializarModoRendimiento() {
    let modo = "full";
    try {
        const guardado = localStorage.getItem("bolillero_perf_mode");
        if (guardado) {
            modo = guardado;
        } else if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            modo = "lite";
        }
    } catch (e) {
        modo = "full";
    }
    aplicarModoRendimiento(modo, false);
}

function aplicarModoRendimiento(modo, notificar = false) {
    const modoNormalizado = modo === "lite" ? "lite" : "full";
    window.bolilleroPerfMode = modoNormalizado;
    try {
        localStorage.setItem("bolillero_perf_mode", modoNormalizado);
    } catch (e) {
        console.warn("No se pudo guardar bolillero_perf_mode", e);
    }

    const isLite = modoNormalizado === "lite";
    if (isLite) {
        document.body.classList.add("mode-lite");
    } else {
        document.body.classList.remove("mode-lite");
    }

    // Sincronizar botón de barra superior
    if (dom.perfToggleBtn) {
        dom.perfToggleBtn.setAttribute(
            "title",
            isLite
                ? "Modo Lite activo (Ahorro máximo & 60 FPS). Clic para activar Efectos Visuales Pro."
                : "Efectos Visuales Pro activos. Clic para activar Modo Lite (Ahorro de batería)."
        );
        dom.perfToggleBtn.setAttribute(
            "aria-label",
            isLite ? "Cambiar a modo efectos visuales" : "Cambiar a modo lite"
        );
    }
    if (dom.perfToggleIcon) {
        dom.perfToggleIcon.textContent = isLite ? "⚡" : "✨";
    }

    // Sincronizar en Drawer Menú
    if (dom.drawerPerfToggleIcon) {
        dom.drawerPerfToggleIcon.textContent = isLite ? "⚡" : "✨";
    }
    if (dom.drawerPerfLabel) {
        dom.drawerPerfLabel.textContent = isLite ? "Lite (Ahorro)" : "Visual Pro";
    }

    if (notificar) {
        if (isLite) {
            mostrarToast("⚡ Modo Lite activado: Máxima velocidad, fluidez y ahorro de batería.");
        } else {
            mostrarToast("✨ Modo Visual Pro activado: Animaciones y efectos cinemáticos completos.");
        }
    }
}

function alternarModoRendimiento() {
    const modoActual = window.bolilleroPerfMode || "full";
    const nuevoModo = modoActual === "full" ? "lite" : "full";
    aplicarModoRendimiento(nuevoModo, true);
}

/* ==========================================================
   MENÚ PLEGABLE IZQUIERDO (☰) Y DRAWER LATERAL
   ========================================================== */
function inicializarDrawerMenu() {
    if (dom.menuToggleBtn) {
        dom.menuToggleBtn.addEventListener("click", toggleDrawerMenu);
    }
    if (dom.drawerCloseBtn) {
        dom.drawerCloseBtn.addEventListener("click", cerrarDrawerMenu);
    }
    if (dom.drawerBackdrop) {
        dom.drawerBackdrop.addEventListener("click", cerrarDrawerMenu);
    }

    // Navegación desde el Drawer
    if (dom.drawerNavHome) {
        dom.drawerNavHome.addEventListener("click", () => {
            cambiarVista("home");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavSolo) {
        dom.drawerNavSolo.addEventListener("click", () => {
            cambiarVista("solo");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavLaboratorio) {
        dom.drawerNavLaboratorio.addEventListener("click", () => {
            cambiarVista("laboratorio");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavJuntos) {
        dom.drawerNavJuntos.addEventListener("click", () => {
            cambiarVista("juntos");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavBolillero) {
        dom.drawerNavBolillero.addEventListener("click", () => {
            cambiarVista("bolillero");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavDuelo) {
        dom.drawerNavDuelo.addEventListener("click", () => {
            cambiarVista("duelo");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavFama) {
        dom.drawerNavFama.addEventListener("click", () => {
            cambiarVista("fama");
            cerrarDrawerMenu();
        });
    }

    // Modo Solo - Juegos desde el Drawer lateral
    if (dom.drawerNavSoloBomba) {
        dom.drawerNavSoloBomba.addEventListener("click", () => {
            if (typeof abrirArenaJuego === "function") abrirArenaJuego("bomba", "solo");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavSoloImpostor) {
        dom.drawerNavSoloImpostor.addEventListener("click", () => {
            if (typeof abrirArenaJuego === "function") abrirArenaJuego("impostor", "solo");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavSoloMemotest) {
        dom.drawerNavSoloMemotest.addEventListener("click", () => {
            if (typeof abrirArenaJuego === "function") abrirArenaJuego("memotest", "solo");
            cerrarDrawerMenu();
        });
    }

    // Modo Duelo - Juegos y Salas desde el Drawer lateral
    if (dom.drawerNavOnlineBolillero) {
        dom.drawerNavOnlineBolillero.addEventListener("click", () => {
            cambiarVista("duelo");
            if (typeof seleccionarJuegoLobby === "function") seleccionarJuegoLobby("bolillero");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavOnlineBomba) {
        dom.drawerNavOnlineBomba.addEventListener("click", () => {
            cambiarVista("duelo");
            if (typeof seleccionarJuegoLobby === "function") seleccionarJuegoLobby("bomba");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavOnlineImpostor) {
        dom.drawerNavOnlineImpostor.addEventListener("click", () => {
            cambiarVista("duelo");
            if (typeof seleccionarJuegoLobby === "function") seleccionarJuegoLobby("impostor");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavOnlineMemotest) {
        dom.drawerNavOnlineMemotest.addEventListener("click", () => {
            cambiarVista("duelo");
            if (typeof seleccionarJuegoLobby === "function") seleccionarJuegoLobby("memotest");
            cerrarDrawerMenu();
        });
    }
    if (dom.drawerNavOnlineTriatlon) {
        dom.drawerNavOnlineTriatlon.addEventListener("click", () => {
            cambiarVista("duelo");
            if (typeof seleccionarJuegoLobby === "function") seleccionarJuegoLobby("triatlon");
            cerrarDrawerMenu();
        });
    }

    // Herramientas rápidas en Drawer
    if (dom.drawerThemeToggleBtn) {
        dom.drawerThemeToggleBtn.addEventListener("click", () => {
            alternarTema();
        });
    }
    if (dom.drawerPerfToggleBtn) {
        dom.drawerPerfToggleBtn.addEventListener("click", () => {
            alternarModoRendimiento();
        });
    }

    // Pomodoro en Drawer
    if (dom.drawerPomoToggleBtn) {
        dom.drawerPomoToggleBtn.addEventListener("click", togglePomodoro);
    }
    if (dom.drawerPomoOpenCardBtn) {
        dom.drawerPomoOpenCardBtn.addEventListener("click", () => {
            abrirTarjetaPomodoro();
            cerrarDrawerMenu();
        });
    }

    // Nueva lista desde Drawer
    if (dom.drawerNewListBtn) {
        dom.drawerNewListBtn.addEventListener("click", () => {
            cerrarDrawerMenu();
            if (dom.newListButton) dom.newListButton.click();
        });
    }

    // Cerrar con Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dom.drawerMenu && dom.drawerMenu.classList.contains("is-open")) {
            cerrarDrawerMenu();
        }
    });

    actualizarDrawerListas();

    // Easter Egg / Acceso Secreto Desarrollador (5 toques en la versión para Lucas)
    let versionClickCount = 0;
    let versionClickTimer = null;
    const versionRow = document.querySelector(".drawer-version-row");
    if (versionRow) {
        versionRow.addEventListener("click", (e) => {
            if (e.target && e.target.id === "btnForzarActualizar") return;
            versionClickCount++;
            clearTimeout(versionClickTimer);
            versionClickTimer = setTimeout(() => { versionClickCount = 0; }, 2500);
            if (versionClickCount >= 5) {
                versionClickCount = 0;
                if (esModoDevActivo()) {
                    const salir = confirm("🛠️ Modo Desarrollador está ACTIVO.\n\n¿Deseás desactivarlo y volver al modo público bloqueado?");
                    if (salir) desactivarModoDev();
                } else {
                    const pass = prompt("🔐 Acceso Desarrollador Luibañez\nIngresá la clave de acceso de Lucas:");
                    if (pass && (pass.toLowerCase().trim() === "lucas" || pass.trim() === "1234" || pass.toLowerCase().trim() === "mintx")) {
                        activarModoDev();
                        mostrarToast("🛠️ ¡Modo Desarrollador activado para Lucas!", "exito");
                    } else if (pass !== null) {
                        mostrarToast("❌ Clave incorrecta.", "error");
                    }
                }
            }
        });
    }
}

function abrirDrawerMenu() {
    if (!dom.drawerMenu) return;
    dom.drawerMenu.classList.add("is-open");
    dom.drawerMenu.setAttribute("aria-hidden", "false");
    if (dom.drawerBackdrop) {
        dom.drawerBackdrop.classList.add("is-open");
    }
    if (dom.menuToggleBtn) {
        dom.menuToggleBtn.setAttribute("aria-expanded", "true");
    }
    actualizarDrawerListas();
}

function cerrarDrawerMenu() {
    if (!dom.drawerMenu) return;
    dom.drawerMenu.classList.remove("is-open");
    dom.drawerMenu.setAttribute("aria-hidden", "true");
    if (dom.drawerBackdrop) {
        dom.drawerBackdrop.classList.remove("is-open");
    }
    if (dom.menuToggleBtn) {
        dom.menuToggleBtn.setAttribute("aria-expanded", "false");
    }
}

function cerrarMenuDrawer() {
    cerrarDrawerMenu();
}

function toggleDrawerMenu() {
    if (!dom.drawerMenu) return;
    if (dom.drawerMenu.classList.contains("is-open")) {
        cerrarDrawerMenu();
    } else {
        abrirDrawerMenu();
    }
}

function actualizarDrawerListas() {
    if (!dom.drawerListsContainer) return;
    dom.drawerListsContainer.replaceChildren();

    if (!estado.listas || estado.listas.length === 0) {
        const li = document.createElement("li");
        li.className = "drawer-list-item";
        li.style.color = "var(--color-text-muted)";
        li.style.fontStyle = "italic";
        li.textContent = "No hay listas creadas";
        dom.drawerListsContainer.appendChild(li);
        return;
    }

    const fragment = document.createDocumentFragment();
    estado.listas.forEach(lista => {
        const li = document.createElement("li");
        li.className = "drawer-list-item";
        if (lista.id === estado.listaSeleccionadaId) {
            li.classList.add("is-selected");
        }
        li.dataset.id = lista.id;

        const nameSpan = document.createElement("span");
        nameSpan.className = "drawer-list-item__name";
        nameSpan.textContent = `📚 ${lista.nombre}`;

        const countSpan = document.createElement("span");
        countSpan.className = "drawer-list-item__count";
        const cant = (lista.temas || []).length;
        countSpan.textContent = `${cant} tema${cant === 1 ? "" : "s"}`;

        li.appendChild(nameSpan);
        li.appendChild(countSpan);

        li.addEventListener("click", () => {
            seleccionarLista(lista.id);
            cambiarVista("bolillero");
            cerrarDrawerMenu();
        });

        fragment.appendChild(li);
    });

    dom.drawerListsContainer.appendChild(fragment);
}

function seleccionarLista(id) {
    if (!id) return;
    estado.listaSeleccionadaId = id;
    guardarDatos();
    reconstruirBolillero();
    render();
}

/* ==========================================================
   TARJETA FLOTANTE CON TACHUELA (📌) & DRAG & DROP
   ========================================================== */
function inicializarTarjetaFlotante() {
    // Restaurar si estaba fijada
    const estabaFijada = localStorage.getItem(PIN_STORAGE_KEY) === "true";
    if (estabaFijada) {
        estadoFlotante.fijado = true;
        dom.pinPomodoroBtn.classList.add("is-pinned");
        dom.pinPomodoroBtn.title = "Tarjeta fijada en pantalla (📌)";
        abrirTarjetaPomodoro();
    }

    // Restaurar posición si fue guardada
    try {
        const posGuardada = localStorage.getItem(POS_STORAGE_KEY);
        if (posGuardada) {
            const { left, top } = JSON.parse(posGuardada);
            if (left && top) {
                dom.pomodoroFloatingCard.style.left = left;
                dom.pomodoroFloatingCard.style.top = top;
                dom.pomodoroFloatingCard.style.right = "auto";
            }
        }
    } catch {}

    // Eventos de arrastre con Pointer Events
    dom.floatingCardHeader.addEventListener("pointerdown", iniciarArrastre);
    window.addEventListener("pointermove", moverArrastre);
    window.addEventListener("pointerup", finalizarArrastre);
    window.addEventListener("pointercancel", finalizarArrastre);
}

function abrirTarjetaPomodoro() {
    estadoFlotante.abierto = true;
    dom.pomodoroFloatingCard.classList.remove("is-minimized");
    dom.pomodoroFloatingCard.setAttribute("aria-hidden", "false");
}

function cerrarTarjetaPomodoro(forzar = false) {
    if (estadoFlotante.fijado && !forzar) {
        return; // Si está fijada con tachuela, no se cierra automáticamente
    }
    estadoFlotante.abierto = false;
    dom.pomodoroFloatingCard.classList.add("is-minimized");
    dom.pomodoroFloatingCard.setAttribute("aria-hidden", "true");
}

function toggleTarjetaPomodoro() {
    if (dom.pomodoroFloatingCard.classList.contains("is-minimized")) {
        abrirTarjetaPomodoro();
    } else {
        cerrarTarjetaPomodoro(true);
    }
}

function toggleFijarTarjeta() {
    estadoFlotante.fijado = !estadoFlotante.fijado;
    dom.pinPomodoroBtn.classList.toggle("is-pinned", estadoFlotante.fijado);
    dom.pinPomodoroBtn.title = estadoFlotante.fijado
        ? "Tarjeta fijada en pantalla (📌)"
        : "Fijar en pantalla (📌)";
    localStorage.setItem(PIN_STORAGE_KEY, String(estadoFlotante.fijado));
}

function iniciarArrastre(e) {
    if (e.target.closest("button") || e.target.closest("input")) return;
    estadoFlotante.arrastrando = true;
    const rect = dom.pomodoroFloatingCard.getBoundingClientRect();
    estadoFlotante.offsetX = e.clientX - rect.left;
    estadoFlotante.offsetY = e.clientY - rect.top;
    dom.pomodoroFloatingCard.classList.add("is-dragging");
    try {
        dom.floatingCardHeader.setPointerCapture(e.pointerId);
    } catch {}
}

function moverArrastre(e) {
    if (!estadoFlotante.arrastrando) return;
    e.preventDefault();

    const cardW = dom.pomodoroFloatingCard.offsetWidth;
    const cardH = dom.pomodoroFloatingCard.offsetHeight;

    let nuevaX = e.clientX - estadoFlotante.offsetX;
    let nuevaY = e.clientY - estadoFlotante.offsetY;

    // Viewport clamping
    const maxX = window.innerWidth - cardW - 10;
    const maxY = window.innerHeight - cardH - 10;

    nuevaX = Math.max(10, Math.min(nuevaX, maxX));
    nuevaY = Math.max(65, Math.min(nuevaY, maxY));

    dom.pomodoroFloatingCard.style.left = `${nuevaX}px`;
    dom.pomodoroFloatingCard.style.top = `${nuevaY}px`;
    dom.pomodoroFloatingCard.style.right = "auto";
}

function finalizarArrastre(e) {
    if (!estadoFlotante.arrastrando) return;
    estadoFlotante.arrastrando = false;
    dom.pomodoroFloatingCard.classList.remove("is-dragging");
    try {
        dom.floatingCardHeader.releasePointerCapture(e.pointerId);
    } catch {}

    const pos = {
        left: dom.pomodoroFloatingCard.style.left,
        top: dom.pomodoroFloatingCard.style.top
    };
    localStorage.setItem(POS_STORAGE_KEY, JSON.stringify(pos));
}

/* ==========================================================
   BOLILLERO: DATOS Y STORAGE
   ========================================================== */
function crearDatosIniciales() {
    return {
        listas: [],
        listaSeleccionadaId: null
    };
}

function guardarDatos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        listas: estado.listas,
        listaSeleccionadaId: estado.listaSeleccionadaId
    }));
}

function cargarDatos() {
    try {
        const guardados = localStorage.getItem(STORAGE_KEY);
        if (!guardados) {
            const iniciales = crearDatosIniciales();
            estado.listas = iniciales.listas;
            estado.listaSeleccionadaId = iniciales.listaSeleccionadaId;
            guardarDatos();
            return;
        }
        const parsed = JSON.parse(guardados);
        let listArr = Array.isArray(parsed.listas) ? parsed.listas : [];
        // Limpiar lista de ejemplo predeterminada si existiera
        listArr = listArr.filter(l => l.nombre !== "SFI 1ER PARCIAL");
        estado.listas = listArr;
        estado.listaSeleccionadaId = (parsed.listaSeleccionadaId && estado.listas.some(l => l.id === parsed.listaSeleccionadaId))
            ? parsed.listaSeleccionadaId
            : (estado.listas.length > 0 ? estado.listas[0].id : null);
    } catch {
        const iniciales = crearDatosIniciales();
        estado.listas = iniciales.listas;
        estado.listaSeleccionadaId = iniciales.listaSeleccionadaId;
        guardarDatos();
    }
}

function obtenerListaSeleccionada() {
    return estado.listas.find(l => l.id === estado.listaSeleccionadaId) ?? null;
}

function reconstruirBolillero() {
    const lista = obtenerListaSeleccionada();
    if (!lista) {
        estado.ronda.disponibles = [];
        estado.ronda.ultimoTemaId = null;
        return;
    }
    estado.ronda.disponibles = lista.temas.map(t => t.id);
    estado.ronda.ultimoTemaId = null;
}

function actualizarInterfaz() {
    guardarDatos();
    reconstruirBolillero();
    render();
}

function render() {
    renderCabecera();
    renderListas();
    renderTemas();
    renderResultado();
    renderEstadoBotones();
}

function renderCabecera() {
    const lista = obtenerListaSeleccionada();
    if (!lista) {
        dom.currentListTitle.textContent = "Sin lista seleccionada";
        dom.currentListDescription.textContent = "Creá una lista o importá un archivo para comenzar.";
        return;
    }
    dom.currentListTitle.textContent = lista.nombre;
    const cant = lista.temas.length;
    const disponibles = estado.ronda.disponibles.length;
    dom.currentListDescription.textContent = `${cant} tema${cant === 1 ? "" : "s"} en total (${disponibles} disponibles)`;
}

function renderListas() {
    dom.listsContainer.replaceChildren();
    const fragment = document.createDocumentFragment();

    estado.listas.forEach(lista => {
        const elemento = dom.listItemTemplate.content.firstElementChild.cloneNode(true);
        const boton = elemento.querySelector(".list-item__button");
        boton.dataset.id = lista.id;
        boton.querySelector(".list-item__name").textContent = lista.nombre;

        if (lista.id === estado.listaSeleccionadaId) {
            boton.classList.add("is-active");
            boton.setAttribute("aria-current", "page");
        }
        fragment.appendChild(elemento);
    });
    dom.listsContainer.appendChild(fragment);

    actualizarDrawerListas();
}

function renderTemas() {
    dom.topicsGrid.replaceChildren();
    const lista = obtenerListaSeleccionada();
    if (!lista) return;

    const fragment = document.createDocumentFragment();
    lista.temas.forEach(tema => {
        const tarjeta = dom.topicCardTemplate.content.firstElementChild.cloneNode(true);
        tarjeta.dataset.id = tema.id;
        
        const estaDisponible = estado.ronda.disponibles.includes(tema.id);
        if (!estaDisponible) {
            tarjeta.style.opacity = "0.35";
            tarjeta.title = "Ya salió en esta ronda";
        }

        tarjeta.querySelector(".topic-card__title").textContent = tema.titulo;
        fragment.appendChild(tarjeta);
    });
    dom.topicsGrid.appendChild(fragment);
}

function renderResultado() {
    if (!estado.ronda.ultimoTemaId) {
        dom.resultSection.classList.add("hidden");
        if (dom.bolilleroIACard) dom.bolilleroIACard.classList.add("hidden");
        return;
    }
    const lista = obtenerListaSeleccionada();
    const tema = lista?.temas.find(t => t.id === estado.ronda.ultimoTemaId);
    if (!tema) {
        dom.resultSection.classList.add("hidden");
        if (dom.bolilleroIACard) dom.bolilleroIACard.classList.add("hidden");
        return;
    }
    dom.selectedTopic.textContent = tema.titulo;
    dom.resultSection.classList.remove("hidden");

    // Preparar tarjeta de Pregunta con IA en Bolillero
    if (dom.bolilleroIACard) {
        dom.bolilleroIACard.classList.remove("hidden");
        actualizarUIIndicadoresPDF();
    }
}

function renderEstadoBotones() {
    const lista = obtenerListaSeleccionada();
    const hayLista = Boolean(lista);
    const hayTemas = hayLista && lista.temas.length > 0;
    const hayDisponibles = estado.ronda.disponibles.length > 0;

    if (dom.addTopicButton) dom.addTopicButton.disabled = !hayLista || estado.interfaz.girando;
    if (dom.spinButton) dom.spinButton.disabled = !hayTemas || !hayDisponibles || estado.interfaz.girando;
    if (dom.drawAgainButton) dom.drawAgainButton.disabled = !hayDisponibles || estado.interfaz.girando;
    if (dom.importButton) dom.importButton.disabled = estado.interfaz.girando;
}

/* ==========================================================
   ANIMACIÓN DE RULETA PLACENTERA
   ========================================================== */
async function girarBolillero() {
    if (estado.interfaz.girando) return;

    const lista = obtenerListaSeleccionada();
    const temasDisponibles = lista.temas.filter(t => estado.ronda.disponibles.includes(t.id));

    if (temasDisponibles.length === 0) {
        alert("¡Ya salieron todos los temas de esta lista! Restaurá el bolillero para volver a empezar.");
        return;
    }

    estado.interfaz.girando = true;
    renderEstadoBotones();
    dom.resultSection.classList.add("hidden");
    dom.rollingDisplay.classList.remove("is-winner");
    dom.rollingDisplay.classList.add("is-spinning");

    const esLite = window.bolilleroPerfMode === "lite";
    const duracion = esLite ? 200 : 3000;
    const inicio = performance.now();
    let intervalo = esLite ? 80 : 45;

    while (true) {
        const transcurrido = performance.now() - inicio;
        if (transcurrido >= duracion) break;

        const temaAleatorio = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
        dom.rollingDisplay.textContent = temaAleatorio.titulo;

        const progreso = transcurrido / duracion;
        intervalo = 45 + (progreso * progreso * 300);

        await new Promise(resolve => setTimeout(resolve, intervalo));
    }

    const ganador = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
    
    estado.ronda.ultimoTemaId = ganador.id;
    dom.rollingDisplay.textContent = ganador.titulo;
    
    dom.rollingDisplay.classList.remove("is-spinning");
    dom.rollingDisplay.classList.add("is-winner");

    // Eliminar automáticamente de los disponibles de la ronda
    estado.ronda.disponibles = estado.ronda.disponibles.filter(id => id !== ganador.id);

    estado.interfaz.girando = false;
    actualizarContextoPomodoro(ganador.titulo);
    render();
}

function restaurarBolillero() {
    reconstruirBolillero();
    dom.rollingDisplay.textContent = "—";
    dom.rollingDisplay.classList.remove("is-winner");
    actualizarContextoPomodoro(null);
    render();
}

/* ==========================================================
   IMPORTACIÓN DE ARCHIVOS
   ========================================================== */
function manejarImportacionArchivo(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e) {
        const contenido = e.target.result;
        procesarContenidoImportado(archivo.name, contenido);
        dom.importFileInput.value = "";
    };
    lector.readAsText(archivo);
}

function procesarContenidoImportado(nombreArchivo, texto) {
    let temasArray = [];
    const nombreLista = nombreArchivo.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    if (nombreArchivo.endsWith(".json")) {
        try {
            const data = JSON.parse(texto);
            temasArray = Array.isArray(data) ? data : (data.temas || []);
        } catch {
            mostrarToast("⚠️ El archivo JSON no tiene un formato válido.", "error");
            return;
        }
    } else {
        temasArray = texto
            .split("\n")
            .map(linea => linea.trim())
            .filter(linea => linea.length > 0 && !linea.startsWith("#"));
    }

    if (temasArray.length === 0) {
        mostrarToast("⚠️ No se encontraron palabras o temas en el archivo.", "aviso");
        return;
    }

    const nuevosTemas = temasArray.map(item => ({
        id: crypto.randomUUID(),
        titulo: typeof item === "string" ? item : (item.titulo || "Tema sin nombre")
    }));

    const listaActual = obtenerListaSeleccionada();
    if (listaActual) {
        listaActual.temas.push(...nuevosTemas);
        actualizarInterfaz();
        mostrarToast(`📂 ¡${nuevosTemas.length} palabras del bloc de notas agregadas a "${listaActual.nombre}"!`, "exito");
    } else {
        const nuevaListaId = crypto.randomUUID();
        estado.listas.push({
            id: nuevaListaId,
            nombre: nombreLista.toUpperCase(),
            temas: nuevosTemas
        });
        estado.listaSeleccionadaId = nuevaListaId;
        actualizarInterfaz();
        mostrarToast(`📂 ¡Lista "${nombreLista.toUpperCase()}" creada con ${nuevosTemas.length} palabras!`, "exito");
    }
}

/* ==========================================================
   CRUD LISTAS & TEMAS
   ========================================================== */
function crearLista(nombre) {
    if (!nombre.trim()) return;
    const nueva = { id: crypto.randomUUID(), nombre: nombre.trim().toUpperCase(), temas: [] };
    estado.listas.push(nueva);
    estado.listaSeleccionadaId = nueva.id;
    actualizarInterfaz();
}

function agregarTema(titulo) {
    const lista = obtenerListaSeleccionada();
    if (!lista || !titulo.trim()) return;
    lista.temas.push({ id: crypto.randomUUID(), titulo: titulo.trim() });
    actualizarInterfaz();
}

function eliminarLista(id) {
    if (!confirm("¿Eliminar esta lista?")) return;
    estado.listas = estado.listas.filter(l => l.id !== id);
    estado.listaSeleccionadaId = estado.listas.length ? estado.listas[0].id : null;
    actualizarInterfaz();
}

function eliminarTema(id) {
    const lista = obtenerListaSeleccionada();
    if (!lista) return;
    lista.temas = lista.temas.filter(t => t.id !== id);
    actualizarInterfaz();
}

/* ==========================================================
   POMODORO / CRONÓMETRO (DYNAMIC ISLAND & FLOTANTE)
   ========================================================== */
function cargarConfigPomodoro() {
    try {
        const guardado = localStorage.getItem(POMODORO_STORAGE_KEY);
        if (!guardado) {
            const duracion = obtenerDuracionModoSegundos(pomodoroEstado.modoActual);
            pomodoroEstado.totalSegundosModo = duracion;
            pomodoroEstado.segundosRestantes = duracion;
            return;
        }
        const datos = JSON.parse(guardado);
        if (datos && typeof datos === "object") {
            if (Number.isFinite(datos.estudioMinutos) && datos.estudioMinutos >= 1) {
                pomodoroEstado.config.estudioMinutos = Math.min(Math.max(1, Math.round(datos.estudioMinutos)), 180);
            }
            if (Number.isFinite(datos.descansoCortoMinutos) && datos.descansoCortoMinutos >= 1) {
                pomodoroEstado.config.descansoCortoMinutos = Math.min(Math.max(1, Math.round(datos.descansoCortoMinutos)), 60);
            }
            if (Number.isFinite(datos.descansoLargoMinutos) && datos.descansoLargoMinutos >= 1) {
                pomodoroEstado.config.descansoLargoMinutos = Math.min(Math.max(1, Math.round(datos.descansoLargoMinutos)), 60);
            }
            if (typeof datos.sonidoHabilitado === "boolean") {
                pomodoroEstado.config.sonidoHabilitado = datos.sonidoHabilitado;
            }
        }
    } catch (error) {
        console.warn("No se pudo cargar la configuración de Pomodoro:", error);
    }

    const duracion = obtenerDuracionModoSegundos(pomodoroEstado.modoActual);
    pomodoroEstado.totalSegundosModo = duracion;
    if (!pomodoroEstado.activo) {
        pomodoroEstado.segundosRestantes = duracion;
    }
}

function guardarConfigPomodoro() {
    try {
        localStorage.setItem(POMODORO_STORAGE_KEY, JSON.stringify(pomodoroEstado.config));
    } catch (error) {
        console.warn("No se pudo guardar la configuración de Pomodoro:", error);
    }
}

function obtenerDuracionModoSegundos(modo) {
    switch (modo) {
        case "descanso-corto":
            return pomodoroEstado.config.descansoCortoMinutos * 60;
        case "descanso-largo":
            return pomodoroEstado.config.descansoLargoMinutos * 60;
        case "estudio":
        default:
            return pomodoroEstado.config.estudioMinutos * 60;
    }
}

function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
    const minStr = String(minutos).padStart(2, "0");
    const segStr = String(segundos).padStart(2, "0");
    return `${minStr}:${segStr}`;
}

function reproducirAlarmaPomodoro() {
    if (!pomodoroEstado.config.sonidoHabilitado) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        if (!pomodoroEstado.audioCtx) {
            pomodoroEstado.audioCtx = new AudioContextClass();
        }
        if (pomodoroEstado.audioCtx.state === "suspended") {
            pomodoroEstado.audioCtx.resume();
        }

        const ctx = pomodoroEstado.audioCtx;
        const ahora = ctx.currentTime;
        const notas = [
            { freq: 659.25, inicio: ahora, fin: ahora + 0.18 },
            { freq: 880.00, inicio: ahora + 0.22, fin: ahora + 0.48 }
        ];

        notas.forEach(({ freq, inicio, fin }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, inicio);

            gain.gain.setValueAtTime(0.001, inicio);
            gain.gain.exponentialRampToValueAtTime(0.28, inicio + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, fin);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(inicio);
            osc.stop(fin);
        });
    } catch (error) {
        console.warn("No se pudo reproducir la alarma de Pomodoro:", error);
    }
}

function iniciarPomodoro() {
    if (pomodoroEstado.activo) return;

    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass && !pomodoroEstado.audioCtx) {
            pomodoroEstado.audioCtx = new AudioContextClass();
        }
    } catch {}

    pomodoroEstado.activo = true;

    if (dom.pomodoroToggleIcon) dom.pomodoroToggleIcon.textContent = "⏸";
    if (dom.pomodoroToggleText) dom.pomodoroToggleText.textContent = "Pausar";
    if (dom.pomodoroToggleBtn) {
        dom.pomodoroToggleBtn.classList.remove("button--primary");
        dom.pomodoroToggleBtn.classList.add("button--secondary");
    }
    if (dom.pomodoroDisplay) dom.pomodoroDisplay.classList.remove("is-pulsing");

    renderPomodoro();
    pomodoroEstado.intervalId = setInterval(tickPomodoro, 1000);
}

function pausarPomodoro() {
    if (!pomodoroEstado.activo && !pomodoroEstado.intervalId) return;

    clearInterval(pomodoroEstado.intervalId);
    pomodoroEstado.intervalId = null;
    pomodoroEstado.activo = false;

    if (dom.pomodoroToggleIcon) dom.pomodoroToggleIcon.textContent = "▶";
    if (dom.pomodoroToggleText) {
        dom.pomodoroToggleText.textContent =
            pomodoroEstado.segundosRestantes < pomodoroEstado.totalSegundosModo ? "Continuar" : "Iniciar";
    }
    if (dom.pomodoroToggleBtn) {
        dom.pomodoroToggleBtn.classList.remove("button--secondary");
        dom.pomodoroToggleBtn.classList.add("button--primary");
    }

    document.title = "Luibañez | Plataforma de Estudio";
    renderPomodoro();
}

function togglePomodoro() {
    if (pomodoroEstado.activo) {
        pausarPomodoro();
    } else {
        iniciarPomodoro();
    }
}

function reiniciarPomodoro() {
    const estabaActivo = pomodoroEstado.activo;
    pausarPomodoro();

    pomodoroEstado.segundosRestantes = obtenerDuracionModoSegundos(pomodoroEstado.modoActual);
    pomodoroEstado.totalSegundosModo = pomodoroEstado.segundosRestantes;

    if (dom.pomodoroToggleText) dom.pomodoroToggleText.textContent = "Iniciar";
    if (dom.pomodoroDisplay) dom.pomodoroDisplay.classList.remove("is-pulsing");

    renderPomodoro();
    if (estabaActivo) {
        iniciarPomodoro();
    }
}

function cambiarModoPomodoro(nuevoModo) {
    if (
        pomodoroEstado.modoActual === nuevoModo &&
        !pomodoroEstado.activo &&
        pomodoroEstado.segundosRestantes === pomodoroEstado.totalSegundosModo
    ) {
        return;
    }

    pausarPomodoro();
    pomodoroEstado.modoActual = nuevoModo;
    pomodoroEstado.segundosRestantes = obtenerDuracionModoSegundos(nuevoModo);
    pomodoroEstado.totalSegundosModo = pomodoroEstado.segundosRestantes;

    if (dom.pomodoroToggleText) dom.pomodoroToggleText.textContent = "Iniciar";
    if (dom.pomodoroDisplay) dom.pomodoroDisplay.classList.remove("is-pulsing");

    renderPomodoro();
}

function siguienteFasePomodoro() {
    pausarPomodoro();

    if (pomodoroEstado.modoActual === "estudio") {
        pomodoroEstado.ciclosCompletados++;
        if (pomodoroEstado.ciclosCompletados % 4 === 0) {
            cambiarModoPomodoro("descanso-largo");
        } else {
            cambiarModoPomodoro("descanso-corto");
        }
    } else {
        cambiarModoPomodoro("estudio");
    }
}

function tickPomodoro() {
    if (pomodoroEstado.segundosRestantes > 1) {
        pomodoroEstado.segundosRestantes--;
        renderPomodoro();
    } else {
        pomodoroEstado.segundosRestantes = 0;
        renderPomodoro();
        pausarPomodoro();
        reproducirAlarmaPomodoro();

        if (dom.pomodoroDisplay) {
            dom.pomodoroDisplay.classList.add("is-pulsing");
        }

        setTimeout(() => {
            if (dom.pomodoroDisplay) {
                dom.pomodoroDisplay.classList.remove("is-pulsing");
            }
            siguienteFasePomodoro();
        }, 1200);
    }
}

function renderPomodoro() {
    const tiempoStr = formatearTiempo(pomodoroEstado.segundosRestantes);

    // Display flotante
    if (dom.pomodoroDisplay) {
        dom.pomodoroDisplay.textContent = tiempoStr;
    }

    // Dynamic Island
    if (dom.pillTimer) {
        dom.pillTimer.textContent = tiempoStr;
    }

    // Progreso
    const porcentaje = pomodoroEstado.totalSegundosModo > 0
        ? Math.max(0, Math.min(100, (pomodoroEstado.segundosRestantes / pomodoroEstado.totalSegundosModo) * 100))
        : 0;

    if (dom.pomodoroProgressBar) {
        dom.pomodoroProgressBar.style.width = `${porcentaje}%`;
        const track = dom.pomodoroProgressBar.parentElement;
        if (track) {
            track.setAttribute("aria-valuenow", String(Math.round(porcentaje)));
        }
    }

    // Modos en Dynamic Island y Tarjeta Flotante
    let modoTexto = "Estudio";
    if (pomodoroEstado.modoActual === "descanso-corto") modoTexto = "Corto";
    if (pomodoroEstado.modoActual === "descanso-largo") modoTexto = "Largo";

    if (dom.pillBadge) dom.pillBadge.textContent = modoTexto;
    if (dom.floatingBadge) dom.floatingBadge.textContent = modoTexto;

    if (dom.pomodoroPill) {
        dom.pomodoroPill.dataset.mode = pomodoroEstado.modoActual;
        dom.pomodoroPill.classList.toggle("is-running", pomodoroEstado.activo);
    }

    if (dom.pomodoroFloatingCard) {
        dom.pomodoroFloatingCard.dataset.mode = pomodoroEstado.modoActual;
    }

    // Sincronizar mini-widget Pomodoro en Drawer lateral
    if (dom.drawerPomoTime) {
        dom.drawerPomoTime.textContent = tiempoStr;
    }
    if (dom.drawerPomoBadge) {
        dom.drawerPomoBadge.textContent = modoTexto;
    }
    if (dom.drawerPomoIndicator) {
        dom.drawerPomoIndicator.classList.toggle("is-running", pomodoroEstado.activo);
    }
    if (dom.drawerPomoToggleBtn) {
        dom.drawerPomoToggleBtn.textContent = pomodoroEstado.activo ? "Pausar" : "Iniciar";
    }

    // Botones de modo
    const botonesModo = [
        { btn: dom.modeStudyBtn, modo: "estudio" },
        { btn: dom.modeShortBreakBtn, modo: "descanso-corto" },
        { btn: dom.modeLongBreakBtn, modo: "descanso-largo" }
    ];

    botonesModo.forEach(({ btn, modo }) => {
        if (!btn) return;
        const esActivo = pomodoroEstado.modoActual === modo;
        btn.classList.toggle("is-active", esActivo);
        btn.setAttribute("aria-selected", String(esActivo));
    });

    if (dom.pomodoroCyclesCount) {
        dom.pomodoroCyclesCount.textContent = String(pomodoroEstado.ciclosCompletados);
    }

    if (pomodoroEstado.activo) {
        document.title = `(${tiempoStr}) Luibañez`;
    }
}

function actualizarContextoPomodoro(titulo) {
    if (!dom.pomodoroContext) return;
    if (titulo) {
        dom.pomodoroContext.innerHTML = `Tema en estudio: <strong>${titulo}</strong>`;
    } else {
        dom.pomodoroContext.textContent = "Listo para estudiar";
    }
}

function abrirModalPomodoro() {
    if (!dom.pomodoroModal) return;
    dom.studyDurationInput.value = pomodoroEstado.config.estudioMinutos;
    dom.shortBreakDurationInput.value = pomodoroEstado.config.descansoCortoMinutos;
    dom.longBreakDurationInput.value = pomodoroEstado.config.descansoLargoMinutos;
    dom.soundEnabledInput.checked = pomodoroEstado.config.sonidoHabilitado;
    dom.pomodoroModal.showModal();
    dom.studyDurationInput.focus();
}

function cerrarModalPomodoro() {
    if (!dom.pomodoroModal) return;
    dom.pomodoroModal.close();
}

function guardarFormularioPomodoro(evento) {
    evento.preventDefault();
    const estudioMin = parseInt(dom.studyDurationInput.value, 10);
    const descansoCortoMin = parseInt(dom.shortBreakDurationInput.value, 10);
    const descansoLargoMin = parseInt(dom.longBreakDurationInput.value, 10);
    const sonido = dom.soundEnabledInput.checked;

    if (Number.isFinite(estudioMin) && estudioMin >= 1 && estudioMin <= 180) {
        pomodoroEstado.config.estudioMinutos = estudioMin;
    }
    if (Number.isFinite(descansoCortoMin) && descansoCortoMin >= 1 && descansoCortoMin <= 60) {
        pomodoroEstado.config.descansoCortoMinutos = descansoCortoMin;
    }
    if (Number.isFinite(descansoLargoMin) && descansoLargoMin >= 1 && descansoLargoMin <= 60) {
        pomodoroEstado.config.descansoLargoMinutos = descansoLargoMin;
    }
    pomodoroEstado.config.sonidoHabilitado = sonido;

    guardarConfigPomodoro();

    if (!pomodoroEstado.activo) {
        pomodoroEstado.totalSegundosModo = obtenerDuracionModoSegundos(pomodoroEstado.modoActual);
        pomodoroEstado.segundosRestantes = pomodoroEstado.totalSegundosModo;
        if (dom.pomodoroToggleText) {
            dom.pomodoroToggleText.textContent = "Iniciar";
        }
    }

    renderPomodoro();
    dom.pomodoroModal.close();
}

// modules.js - Complete logic for Accounts, Avatars, Online Multiplayer Duel and Multimedia Chat


/* ==========================================================
   MÓDULO 1: CUENTAS CON PIN & MODO INVITADO
   ========================================================== */
function obtenerCuentasGuardadas() {
    try {
        const data = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function guardarCuentas(cuentas) {
    try {
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(cuentas));
    } catch {}
}

function cargarPerfilUsuario() {
    try {
        const data = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
        if (data) {
            const perfil = JSON.parse(data);
            Object.assign(perfilUsuario, perfil);
        }
    } catch {}
    actualizarUIPerfilUsuario();
}

function guardarPerfilUsuario() {
    try {
        localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(perfilUsuario));
    } catch {}
    actualizarUIPerfilUsuario();
}

function actualizarUIPerfilUsuario() {
    const { frameClasses, tierName } = obtenerMarcoEvolutivo(perfilUsuario.victorias || 0);

    if (dom.dueloUserAvatarWrap) {
        dom.dueloUserAvatarWrap.innerHTML = renderAvatarHTML(perfilUsuario, 0, false, 48);
    }
    if (dom.dueloUserNameDisplay) {
        dom.dueloUserNameDisplay.textContent = perfilUsuario.apodo || "Invitado";
    }
    if (dom.dueloUserRankBadge) {
        dom.dueloUserRankBadge.textContent = tierName;
        dom.dueloUserRankBadge.className = `badge badge--${(perfilUsuario.victorias || 0) >= 10 ? "accent" : "warning"}`;
    }
    if (dom.dueloUserMetaDisplay) {
        if (perfilUsuario.esInvitado) {
            dom.dueloUserMetaDisplay.textContent = "Modo Invitado (Sin PIN)";
        } else {
            dom.dueloUserMetaDisplay.textContent = `Cuenta Verificada • ${perfilUsuario.victorias || 0} victorias 👑`;
        }
    }
    if (dom.dueloGuestAlert) {
        dom.dueloGuestAlert.classList.toggle("hidden", !perfilUsuario.esInvitado);
    }
    if (dom.dueloAuthModalBtn) {
        dom.dueloAuthModalBtn.textContent = perfilUsuario.esInvitado ? "🔐 Crear Cuenta" : "👤 Mi Perfil";
    }

    if (dom.dueloJoinNamePreview) {
        dom.dueloJoinNamePreview.textContent = perfilUsuario.apodo || "Invitado";
    }
    if (dom.dueloJoinAvatarPreview) {
        dom.dueloJoinAvatarPreview.innerHTML = renderAvatarHTML(perfilUsuario, 0, false, 24);
    }
}

function abrirModalAuth(pestaña = "register") {
    if (!dom.authAccountModal) return;
    cambiarPestañaAuth(pestaña);
    poblarSelectCuentasAuth();
    if (dom.authRegApodo) {
        dom.authRegApodo.value = perfilUsuario.apodo !== "Invitado" ? perfilUsuario.apodo : "";
    }
    if (dom.authRegAvatarPreview) {
        dom.authRegAvatarPreview.innerHTML = renderAvatarHTML(perfilUsuario, 0, false, 40);
    }
    dom.authAccountModal.showModal();
}

function cambiarPestañaAuth(pestaña) {
    if (dom.authTabRegister) dom.authTabRegister.classList.toggle("is-active", pestaña === "register");
    if (dom.authTabLogin) dom.authTabLogin.classList.toggle("is-active", pestaña === "login");
    if (dom.authRegisterForm) dom.authRegisterForm.classList.toggle("hidden", pestaña !== "register");
    if (dom.authLoginForm) dom.authLoginForm.classList.toggle("hidden", pestaña !== "login");
    if (dom.authLoginError) dom.authLoginError.classList.add("hidden");
}

function poblarSelectCuentasAuth() {
    if (!dom.authLoginSelect) return;
    const cuentas = obtenerCuentasGuardadas();
    dom.authLoginSelect.innerHTML = "";
    if (cuentas.length === 0) {
        dom.authLoginSelect.innerHTML = "<option value=''>No hay cuentas guardadas aún</option>";
        return;
    }
    cuentas.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = `${c.avatar || "👤"} ${c.apodo} (${c.victorias || 0} 👑)`;
        dom.authLoginSelect.appendChild(opt);
    });
}

function crearOActualizarCuenta(apodo, avatar, tipoAvatar, fotoDataUrl, pin, email = "") {
    if (!apodo || apodo.trim().length === 0) {
        alert("Por favor ingresá un apodo o nombre válido.");
        return null;
    }
    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        alert("El PIN de seguridad debe contener exactamente 4 números.");
        return null;
    }

    const cuentas = obtenerCuentasGuardadas();
    let cuenta = cuentas.find(c => c.apodo.toLowerCase() === apodo.trim().toLowerCase());

    if (!cuenta) {
        cuenta = {
            id: "acc_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
            apodo: apodo.trim(),
            avatar: avatar || "🦁",
            tipoAvatar: tipoAvatar || "emoji",
            fotoDataUrl: fotoDataUrl || "",
            pin: String(pin),
            email: email ? email.trim() : "",
            victorias: perfilUsuario.victorias || 0,
            partidasJugadas: perfilUsuario.partidasJugadas || 0,
            puntosTotales: perfilUsuario.puntosTotales || 0,
            maxRachaHistorica: perfilUsuario.maxRachaHistorica || 0,
            totalRobos: perfilUsuario.totalRobos || 0,
            fechaCreacion: Date.now()
        };
        cuentas.push(cuenta);
    } else {
        cuenta.pin = String(pin);
        cuenta.avatar = avatar || cuenta.avatar;
        cuenta.tipoAvatar = tipoAvatar || cuenta.tipoAvatar;
        cuenta.fotoDataUrl = fotoDataUrl !== undefined ? fotoDataUrl : cuenta.fotoDataUrl;
        if (email) cuenta.email = email.trim();
        cuenta.victorias += (perfilUsuario.victorias || 0);
        cuenta.puntosTotales += (perfilUsuario.puntosTotales || 0);
        if ((perfilUsuario.maxRachaHistorica || 0) > cuenta.maxRachaHistorica) {
            cuenta.maxRachaHistorica = perfilUsuario.maxRachaHistorica;
        }
        cuenta.totalRobos += (perfilUsuario.totalRobos || 0);
    }

    guardarCuentas(cuentas);

    // Activar perfil
    perfilUsuario.esInvitado = false;
    perfilUsuario.id = cuenta.id;
    perfilUsuario.apodo = cuenta.apodo;
    perfilUsuario.avatar = cuenta.avatar;
    perfilUsuario.tipoAvatar = cuenta.tipoAvatar;
    perfilUsuario.fotoDataUrl = cuenta.fotoDataUrl;
    perfilUsuario.victorias = cuenta.victorias;
    perfilUsuario.puntosTotales = cuenta.puntosTotales;
    perfilUsuario.maxRachaHistorica = cuenta.maxRachaHistorica;
    perfilUsuario.totalRobos = cuenta.totalRobos;
    perfilUsuario.pin = cuenta.pin;
    perfilUsuario.email = cuenta.email;

    guardarPerfilUsuario();
    if (dom.authAccountModal) dom.authAccountModal.close();
    return cuenta;
}

function iniciarSesionConPin(cuentaId, pinIngresado) {
    const cuentas = obtenerCuentasGuardadas();
    const cuenta = cuentas.find(c => c.id === cuentaId);
    if (!cuenta || cuenta.pin !== String(pinIngresado).trim()) {
        if (dom.authLoginError) dom.authLoginError.classList.remove("hidden");
        return false;
    }

    perfilUsuario.esInvitado = false;
    perfilUsuario.id = cuenta.id;
    perfilUsuario.apodo = cuenta.apodo;
    perfilUsuario.avatar = cuenta.avatar;
    perfilUsuario.tipoAvatar = cuenta.tipoAvatar;
    perfilUsuario.fotoDataUrl = cuenta.fotoDataUrl;
    perfilUsuario.victorias = cuenta.victorias;
    perfilUsuario.puntosTotales = cuenta.puntosTotales;
    perfilUsuario.maxRachaHistorica = cuenta.maxRachaHistorica;
    perfilUsuario.totalRobos = cuenta.totalRobos;
    perfilUsuario.pin = cuenta.pin;
    perfilUsuario.email = cuenta.email;

    guardarPerfilUsuario();
    if (dom.authAccountModal) dom.authAccountModal.close();
    return true;
}

function cerrarSesionPerfil() {
    perfilUsuario.esInvitado = true;
    perfilUsuario.id = "guest_" + Math.random().toString(36).slice(2, 8);
    perfilUsuario.apodo = "Invitado";
    perfilUsuario.avatar = "🦁";
    perfilUsuario.tipoAvatar = "emoji";
    perfilUsuario.fotoDataUrl = "";
    perfilUsuario.victorias = 0;
    perfilUsuario.puntosTotales = 0;
    perfilUsuario.pin = null;
    perfilUsuario.email = "";
    guardarPerfilUsuario();
}

function recuperarPin() {
    const cuentas = obtenerCuentasGuardadas();
    if (cuentas.length === 0) {
        alert("No hay cuentas registradas en este dispositivo.");
        return;
    }
    const ident = prompt("Ingresá tu apodo o email para recuperar el PIN:");
    if (!ident) return;

    const encontrada = cuentas.find(c =>
        c.apodo.toLowerCase() === ident.trim().toLowerCase() ||
        (c.email && c.email.toLowerCase() === ident.trim().toLowerCase())
    );

    if (encontrada) {
        alert(`¡Cuenta encontrada para ${encontrada.apodo}! Tu PIN de 4 números es: ${encontrada.pin}`);
    } else {
        alert("No se encontró ninguna cuenta con ese apodo o email.");
    }
}

/* ==========================================================
   MÓDULO 2: SISTEMA DE AVATARES TOTALES & MARCOS EVOLUTIVOS
   ========================================================== */
const CATALOGO_EMOJIS = [
    { e: "😀", cat: "faces", k: "feliz sonrisa cara sonriente" },
    { e: "😎", cat: "faces", k: "lentes canchero genial gafas sol" },
    { e: "🤠", cat: "faces", k: "vaquero sombrero sheriff cowboy" },
    { e: "🥳", cat: "faces", k: "fiesta cumple festejo cotillon" },
    { e: "🤓", cat: "faces", k: "nerd estudioso anteojos libro inteligente" },
    { e: "🧐", cat: "faces", k: "monoculo detective profesor lupa" },
    { e: "🤖", cat: "faces", k: "robot tecnologia ia maquina" },
    { e: "👻", cat: "faces", k: "fantasma susto terror miedo" },
    { e: "👽", cat: "faces", k: "alien extraterrestre ovni ufo" },
    { e: "😈", cat: "faces", k: "diablo diablito pillo picaro demonio" },
    { e: "🧙‍♂️", cat: "faces", k: "mago magia hechicero" },
    { e: "🥷", cat: "faces", k: "ninja sigilo guerrero" },
    { e: "🧑‍🎓", cat: "faces", k: "estudiante graduado birrete facultad" },
    { e: "👩‍🔬", cat: "faces", k: "cientifica laboratorio fisica quimica" },
    { e: "👑", cat: "faces", k: "rey reina corona monarca ganador" },
    { e: "🦁", cat: "animals", k: "leon rey selva felino" },
    { e: "🐯", cat: "animals", k: "tigre felino selva rayas" },
    { e: "🦊", cat: "animals", k: "zorro astuto bosque naranja" },
    { e: "🐺", cat: "animals", k: "lobo manada aullido noche" },
    { e: "🦅", cat: "animals", k: "aguila ave vuelo cielo garra" },
    { e: "🐉", cat: "animals", k: "dragon fuego mitologico escama" },
    { e: "🦈", cat: "animals", k: "tiburon mar oceano cazador" },
    { e: "🦖", cat: "animals", k: "dinosaurio t-rex jurasico" },
    { e: "🦄", cat: "animals", k: "unicornio magico caballo cuerno" },
    { e: "🦉", cat: "animals", k: "buho lechuza sabio sabiduria noche" },
    { e: "🐼", cat: "animals", k: "panda oso bambu tierno" },
    { e: "🐙", cat: "animals", k: "pulpo tentaculos mar inteligencia" },
    { e: "🍀", cat: "animals", k: "trebol cuatro hojas suerte fortuna" },
    { e: "🌵", cat: "animals", k: "cactus desierto verde planta" },
    { e: "🍕", cat: "food", k: "pizza queso comida fiesta" },
    { e: "🍔", cat: "food", k: "hamburguesa carne queso burger" },
    { e: "🌮", cat: "food", k: "taco mexicano comida picante" },
    { e: "🍩", cat: "food", k: "dona rosquilla dulce cafe glaseada" },
    { e: "🥑", cat: "food", k: "palta aguacate verde sano" },
    { e: "🍣", cat: "food", k: "sushi salmon comida japonesa" },
    { e: "☕", cat: "food", k: "cafe caliente desayuno estudio energia" },
    { e: "🧉", cat: "food", k: "mate argentino uruguayo yerba termo" },
    { e: "🍦", cat: "food", k: "helado postre dulce verano cucurucho" },
    { e: "🍟", cat: "food", k: "papas fritas comida rapida crocante" },
    { e: "⚽", cat: "sports", k: "futbol pelota gol partido cancha" },
    { e: "🏀", cat: "sports", k: "basquet pelota aro basket nba" },
    { e: "🎮", cat: "sports", k: "gamer videojuego joystick play control consola" },
    { e: "🥊", cat: "sports", k: "boxeo guante pelea combate round" },
    { e: "🏆", cat: "sports", k: "trofeo copa campeon victoria oro premio" },
    { e: "🎯", cat: "sports", k: "diana tiro blanco objetivo flecha precision" },
    { e: "🚀", cat: "sports", k: "cohete despegue nave espacio velocidad" },
    { e: "🎸", cat: "sports", k: "guitarra musica rock instrumento acustica electrica" },
    { e: "♟️", cat: "sports", k: "ajedrez peon rey jaque estrategia tablero" },
    { e: "🎲", cat: "sports", k: "dado azar sorteo juego bolillero mesa" },
    { e: "💡", cat: "objects", k: "foco lamparita idea luz inspiracion" },
    { e: "⚡", cat: "objects", k: "rayo trueno relampago energia electricidad rapido" },
    { e: "🔥", cat: "objects", k: "fuego llama calor racha fuego caliente" },
    { e: "💎", cat: "objects", k: "diamante gema joya valor brillante" },
    { e: "⚔️", cat: "objects", k: "espadas duelo batalla pelea combate guerra" },
    { e: "🛡️", cat: "objects", k: "escudo defensa proteccion armadura" },
    { e: "🔮", cat: "objects", k: "bola cristal magia futuro adivina" },
    { e: "🧬", cat: "objects", k: "adn genetica ciencia biologia molecula" },
    { e: "📚", cat: "objects", k: "libros estudio materia aprender biblioteca" },
    { e: "🪐", cat: "objects", k: "planeta saturno galaxia cosmos universo" },
    { e: "⭐", cat: "symbols", k: "estrella brillante cielo calificacion" },
    { e: "✨", cat: "symbols", k: "destello brillo magia chispa nuevo" },
    { e: "❤️", cat: "symbols", k: "corazon rojo amor pasion vida" },
    { e: "💯", cat: "symbols", k: "cien perfecto diez puntos examen excelente" },
    { e: "🧿", cat: "symbols", k: "ojo turco amuleto suerte proteccion" }
];

function obtenerMarcoEvolutivo(victorias, rachaActual = 0, esLider = false) {
    let tierClass = "avatar-tier--0";
    let tierName = "Novato";
    let tierIcon = "🌱";

    if (victorias >= 20) {
        tierClass = "avatar-tier--4";
        tierName = "Legendario Cósmico";
        tierIcon = "🌌";
    } else if (victorias >= 15) {
        tierClass = "avatar-tier--3";
        tierName = "Diamante Iridiscente";
        tierIcon = "💎";
    } else if (victorias >= 10) {
        tierClass = "avatar-tier--2";
        tierName = "Oro Resplandeciente";
        tierIcon = "👑";
    } else if (victorias >= 5) {
        tierClass = "avatar-tier--1";
        tierName = "Plata Neón";
        tierIcon = "⚡";
    }

    const clases = [tierClass];
    if (rachaActual >= 2) clases.push("avatar-frame--fire");
    if (esLider) clases.push("avatar-frame--leader");

    return {
        frameClasses: clases.join(" "),
        tierName,
        tierIcon
    };
}

function renderAvatarHTML(jugador, racha = 0, esLider = false, size = 48) {
    const vics = jugador?.victorias || 0;
    const { frameClasses } = obtenerMarcoEvolutivo(vics, racha, esLider);
    const styleAttr = `style="width:${size}px; height:${size}px; font-size:${Math.round(size * 0.55)}px;"`;

    if (jugador?.tipoAvatar === "foto" && jugador.fotoDataUrl) {
        return `<div class="duelo-avatar-circle ${frameClasses}" ${styleAttr}><img src="${jugador.fotoDataUrl}" alt="${jugador.apodo || 'Avatar'}"></div>`;
    }
    return `<div class="duelo-avatar-circle ${frameClasses}" ${styleAttr}>${jugador?.avatar || '👤'}</div>`;
}

let tempAvatarSeleccionado = {
    tipo: "emoji",
    valor: "🦁",
    dataUrl: ""
};

function abrirSelectorAvatar() {
    if (!dom.avatarPickerModal) return;
    tempAvatarSeleccionado = {
        tipo: perfilUsuario.tipoAvatar || "emoji",
        valor: perfilUsuario.avatar || "🦁",
        dataUrl: perfilUsuario.fotoDataUrl || ""
    };
    renderCatalogoEmojis("all", "");
    dom.avatarPickerModal.showModal();
}

function renderCatalogoEmojis(catFiltro = "all", textoBusqueda = "") {
    if (!dom.avatarEmojisGrid) return;
    dom.avatarEmojisGrid.innerHTML = "";

    const query = textoBusqueda.toLowerCase().trim();
    const filtrados = CATALOGO_EMOJIS.filter(item => {
        const coincideCat = catFiltro === "all" || item.cat === catFiltro;
        const coincideQuery = !query || item.k.includes(query) || item.e.includes(query);
        return coincideCat && coincideQuery;
    });

    filtrados.forEach(item => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "avatar-emoji-item-btn";
        btn.textContent = item.e;
        btn.title = item.k;
        btn.addEventListener("click", () => {
            aplicarAvatarSeleccionado("emoji", item.e, "");
        });
        dom.avatarEmojisGrid.appendChild(btn);
    });
}

function aplicarAvatarSeleccionado(tipo, valor, dataUrl) {
    perfilUsuario.tipoAvatar = tipo;
    perfilUsuario.avatar = valor;
    perfilUsuario.fotoDataUrl = dataUrl;
    guardarPerfilUsuario();

    if (dom.authRegAvatarPreview) {
        dom.authRegAvatarPreview.innerHTML = renderAvatarHTML(perfilUsuario, 0, false, 40);
    }
    if (dom.avatarPickerModal) {
        dom.avatarPickerModal.close();
    }
}

function procesarFotoSubida(file) {
    if (!file || !file.type.startsWith("image/")) {
        alert("Por favor seleccioná un archivo de imagen válido.");
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        const img = new Image();
        img.onload = () => {
            const canvas = dom.avatarCanvas || document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext("2d");

            // Recorte cuadrado centrado
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            ctx.clearRect(0, 0, 128, 128);
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 128, 128);

            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.72);
            tempAvatarSeleccionado = {
                tipo: "foto",
                valor: "📷",
                dataUrl: compressedDataUrl
            };

            if (dom.avatarCropPreviewImg) {
                dom.avatarCropPreviewImg.src = compressedDataUrl;
                dom.avatarCropPreviewImg.classList.remove("hidden");
            }
            if (dom.avatarCropPlaceholder) {
                dom.avatarCropPlaceholder.classList.add("hidden");
            }
            if (dom.avatarConfirmPhotoBtn) {
                dom.avatarConfirmPhotoBtn.disabled = false;
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/* ==========================================================
   MÓDULO 3: MOTOR DUELO MULTIJUGADOR ONLINE (MQTT / WEBSOCKETS)
   ========================================================== */
function generarCodigoSala() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function obtenerTopicSala(codigo) {
    return `luibanez/duel/v1/${codigo.toUpperCase().trim()}`;
}

function conectarMqttSiEsNecesario(callback) {
    if (typeof mqtt === "undefined") {
        console.warn("Librería MQTT no disponible todavía.");
        if (dom.dueloServerStatusBadge) {
            dom.dueloServerStatusBadge.textContent = "🟡 Servidor Local";
            dom.dueloServerStatusBadge.className = "badge badge--warning";
        }
        if (callback) callback();
        return;
    }

    if (onlineDueloEstado.clienteMqtt && onlineDueloEstado.clienteMqtt.connected) {
        if (dom.dueloServerStatusBadge) {
            dom.dueloServerStatusBadge.textContent = "🟢 Servidor Conectado";
            dom.dueloServerStatusBadge.className = "badge badge--success";
        }
        if (callback) callback();
        return;
    }

    if (onlineDueloEstado.clienteMqtt && !onlineDueloEstado.clienteMqtt.connected) {
        onlineDueloEstado.clienteMqtt.once("connect", () => {
            onlineDueloEstado.conectado = true;
            if (dom.dueloServerStatusBadge) {
                dom.dueloServerStatusBadge.textContent = "🟢 Servidor Conectado";
                dom.dueloServerStatusBadge.className = "badge badge--success";
            }
            if (callback) callback();
        });
        return;
    }

    const clientId = "luib_" + Math.random().toString(16).slice(2, 10);
    try {
        onlineDueloEstado.clienteMqtt = mqtt.connect(MQTT_BROKER_URL, {
            clientId,
            keepalive: 30,
            reconnectPeriod: 2500,
            connectTimeout: 8000
        });

        onlineDueloEstado.clienteMqtt.on("connect", () => {
            onlineDueloEstado.conectado = true;
            if (dom.dueloServerStatusBadge) {
                dom.dueloServerStatusBadge.textContent = "🟢 Servidor Conectado";
                dom.dueloServerStatusBadge.className = "badge badge--success";
            }
            if (!lobbyBrowserState.suscrito) {
                onlineDueloEstado.clienteMqtt.subscribe(LOBBY_DISCOVERY_TOPIC, (err) => {
                    if (!err) {
                        lobbyBrowserState.suscrito = true;
                        publicarMensajeDiscovery({ tipo: "LOBBY_DISCOVERY_PING" });
                    }
                });
            }
            if (callback) callback();
        });

        onlineDueloEstado.clienteMqtt.on("reconnect", () => {
            if (dom.dueloServerStatusBadge) {
                dom.dueloServerStatusBadge.textContent = "🟡 Reconectando...";
                dom.dueloServerStatusBadge.className = "badge badge--warning";
            }
        });

        onlineDueloEstado.clienteMqtt.on("error", err => {
            console.warn("MQTT Error:", err);
            if (dom.dueloServerStatusBadge) {
                dom.dueloServerStatusBadge.textContent = "⚠️ Reintentando conexión";
                dom.dueloServerStatusBadge.className = "badge badge--danger";
            }
        });

        onlineDueloEstado.clienteMqtt.on("message", (topic, message) => {
            try {
                const data = JSON.parse(message.toString());
                if (topic === LOBBY_DISCOVERY_TOPIC) {
                    procesarMensajeDiscoveryLobby(data);
                } else {
                    procesarMensajeMqttSala(data);
                }
            } catch (e) {
                console.error("Error al procesar mensaje MQTT:", e);
            }
        });
    } catch (e) {
        console.error("Error al iniciar MQTT:", e);
        if (callback) callback();
    }
}

function publicarMensajeSala(data) {
    if (!onlineDueloEstado.clienteMqtt || !onlineDueloEstado.codigoSala) return;
    const topic = obtenerTopicSala(onlineDueloEstado.codigoSala);
    onlineDueloEstado.clienteMqtt.publish(topic, JSON.stringify(data), { qos: 0 });
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function iniciarDiscoveryLobbiesOnline() {
    conectarMqttSiEsNecesario(() => {
        if (onlineDueloEstado.clienteMqtt && !lobbyBrowserState.suscrito) {
            onlineDueloEstado.clienteMqtt.subscribe(LOBBY_DISCOVERY_TOPIC, (err) => {
                if (!err) {
                    lobbyBrowserState.suscrito = true;
                    publicarMensajeDiscovery({ tipo: "LOBBY_DISCOVERY_PING" });
                }
            });
        }
    });

    if (!lobbyBrowserState.intervaloLimpieza) {
        lobbyBrowserState.intervaloLimpieza = setInterval(purgarLobbiesExpirados, 2500);
    }
    renderizarLobbyBrowser();
}

function publicarMensajeDiscovery(data) {
    if (!onlineDueloEstado.clienteMqtt) return;
    try {
        onlineDueloEstado.clienteMqtt.publish(LOBBY_DISCOVERY_TOPIC, JSON.stringify(data), { qos: 0 });
    } catch (e) {
        console.warn("Error al emitir mensaje discovery MQTT:", e);
    }
}

function iniciarBroadcastingSalaPublica() {
    detenerBroadcastingSalaPublica();
    if (!onlineDueloEstado.esHost || !onlineDueloEstado.esPublica || !onlineDueloEstado.codigoSala) return;

    const emitirBeacon = () => {
        if (!onlineDueloEstado.esHost || !onlineDueloEstado.codigoSala) {
            detenerBroadcastingSalaPublica();
            return;
        }
        const apunte = apuntesEstado.global || apuntesEstado.bomba || apuntesEstado.bolillero;
        const nombreMaterial = (onlineDueloEstado.fuenteMaterial === "pdf" && apunte && apunte.nombre)
            ? apunte.nombre
            : "General Universitario";

        publicarMensajeDiscovery({
            tipo: "LOBBY_HEARTBEAT",
            id: onlineDueloEstado.codigoSala,
            nombre: onlineDueloEstado.nombreSala || "Sala de Repaso",
            juego: onlineDueloEstado.juegoSeleccionado || "bomba",
            formatoModo: onlineDueloEstado.formatoModo || "versus",
            material: nombreMaterial,
            esPublica: true,
            requierePass: !!onlineDueloEstado.tienePassword,
            host: {
                id: perfilUsuario.id,
                apodo: perfilUsuario.apodo,
                avatar: perfilUsuario.avatar
            },
            jugadoresCount: onlineDueloEstado.jugadores.length,
            maxJugadores: 8,
            jugadoresAvatares: onlineDueloEstado.jugadores.map(j => ({
                apodo: j.apodo,
                avatar: j.avatar,
                esHost: !!j.esHost
            })),
            timestamp: Date.now()
        });
    };

    emitirBeacon();
    lobbyBrowserState.intervaloBeacon = setInterval(emitirBeacon, 3500);
}

function detenerBroadcastingSalaPublica() {
    if (lobbyBrowserState.intervaloBeacon) {
        clearInterval(lobbyBrowserState.intervaloBeacon);
        lobbyBrowserState.intervaloBeacon = null;
    }
    if (onlineDueloEstado.esHost && onlineDueloEstado.codigoSala) {
        publicarMensajeDiscovery({
            tipo: "LOBBY_CLOSED",
            id: onlineDueloEstado.codigoSala
        });
    }
}

function procesarMensajeDiscoveryLobby(data) {
    if (!data || !data.tipo) return;

    if (data.tipo === "LOBBY_DISCOVERY_PING") {
        if (onlineDueloEstado.esHost && onlineDueloEstado.esPublica && onlineDueloEstado.codigoSala) {
            iniciarBroadcastingSalaPublica();
        }
        return;
    }

    if (data.tipo === "LOBBY_CLOSED") {
        if (data.id && lobbyBrowserState.activeLobbies.has(data.id)) {
            lobbyBrowserState.activeLobbies.delete(data.id);
            renderizarLobbyBrowser();
        }
        return;
    }

    if (data.tipo === "LOBBY_HEARTBEAT" && data.id) {
        lobbyBrowserState.activeLobbies.set(data.id, {
            ...data,
            lastSeen: Date.now()
        });
        renderizarLobbyBrowser();
    }
}

function purgarLobbiesExpirados() {
    const ahora = Date.now();
    let huboCambios = false;
    for (const [id, lobby] of lobbyBrowserState.activeLobbies.entries()) {
        if (ahora - lobby.lastSeen > 8500) {
            lobbyBrowserState.activeLobbies.delete(id);
            huboCambios = true;
        }
    }
    if (huboCambios) {
        renderizarLobbyBrowser();
    }
}

function renderizarLobbyBrowser() {
    if (!dom.dueloPublicLobbiesGrid) return;

    const lobbies = Array.from(lobbyBrowserState.activeLobbies.values());
    const filtro = lobbyBrowserState.filtroJuego;

    const filtradas = lobbies.filter(l => {
        if (filtro === "todas") return true;
        return l.juego === filtro;
    });

    if (dom.dueloLobbiesCount) {
        dom.dueloLobbiesCount.textContent = filtradas.length;
    }

    if (filtradas.length === 0) {
        dom.dueloPublicLobbiesGrid.innerHTML = "";
        if (dom.dueloLobbiesEmptyState) {
            dom.dueloLobbiesEmptyState.classList.remove("hidden");
        }
        return;
    }

    if (dom.dueloLobbiesEmptyState) {
        dom.dueloLobbiesEmptyState.classList.add("hidden");
    }

    const metaJuegos = {
        bomba: { icon: "💣", title: "Desactivá la Bomba", cardClass: "lobby-card--bomba" },
        bolillero: { icon: "🎲", title: "Bolillero de Estudio", cardClass: "lobby-card--bolillero" },
        impostor: { icon: "🕵️‍♂️", title: "Caza al Impostor", cardClass: "lobby-card--impostor" },
        memotest: { icon: "🧠", title: "Memotest Teórico", cardClass: "lobby-card--memotest" },
        triatlon: { icon: "🏅", title: "Triatlón Académico", cardClass: "lobby-card--triatlon" }
    };

    dom.dueloPublicLobbiesGrid.innerHTML = filtradas.map(lobby => {
        const meta = metaJuegos[lobby.juego] || metaJuegos.bomba;
        const esCoop = lobby.formatoModo === "coop";
        const modeBadge = esCoop
            ? `<span class="badge badge--success" style="font-size: 0.72rem; padding: 2px 7px;">🤝 Coop</span>`
            : `<span class="badge badge--accent" style="font-size: 0.72rem; padding: 2px 7px;">⚔️ Versus</span>`;
        const lockBadge = lobby.requierePass
            ? `<span title="Protegida con contraseña" style="font-size: 0.85rem;">🔒</span>`
            : "";

        const jugadores = lobby.jugadoresAvatares || [];
        const maxSlots = 8;
        let slotsHtml = "";
        for (let i = 0; i < maxSlots; i++) {
            if (i < jugadores.length) {
                const j = jugadores[i];
                const isHost = j.esHost || (i === 0);
                slotsHtml += `<div class="slot-avatar ${isHost ? 'is-host' : ''}" title="${escapeHtml(j.apodo || 'Jugador')}">${j.avatar || (isHost ? '👑' : '👤')}</div>`;
            } else {
                slotsHtml += `<div class="slot-empty" title="Lugar libre">+</div>`;
            }
        }

        const isFull = (lobby.jugadoresCount || jugadores.length) >= 8;
        const enterButton = isFull
            ? `<button type="button" class="lobby-card-enter-btn" disabled>🈵 Sala Llena</button>`
            : `<button type="button" class="lobby-card-enter-btn" onclick="entrarALobbyDesdeCartelera('${escapeHtml(lobby.id)}', ${lobby.requierePass ? 'true' : 'false'})">🚀 Entrar a la Sala</button>`;

        const hostName = escapeHtml(lobby.host?.apodo || "Anfitrión");
        const hostAvatar = lobby.host?.avatar || "👑";
        const roomName = escapeHtml(lobby.nombre || "Sala de Estudio");
        const materialName = escapeHtml(lobby.material || "General");

        return `
            <div class="lobby-card ${meta.cardClass}" data-room-id="${escapeHtml(lobby.id)}">
                <div class="lobby-card-header">
                    <div class="lobby-card-game-badge">
                        <span>${meta.icon}</span>
                        <span>${meta.title}</span>
                    </div>
                    <div class="lobby-card-header-tags">
                        ${modeBadge}
                        ${lockBadge}
                    </div>
                </div>

                <div class="lobby-card-body">
                    <h3 class="lobby-room-title">${roomName}</h3>
                    <div class="lobby-host-info">
                        <span>${hostAvatar}</span>
                        <span>Anfitrión: <strong>${hostName}</strong></span>
                    </div>
                    <div class="lobby-material-badge">
                        <span>📚</span>
                        <span>${materialName}</span>
                    </div>
                </div>

                <div class="lobby-slots-container">
                    <div class="lobby-slots-top">
                        <span>Jugadores</span>
                        <span class="lobby-slots-count">${lobby.jugadoresCount || jugadores.length} / 8</span>
                    </div>
                    <div class="lobby-slots-row">
                        ${slotsHtml}
                    </div>
                </div>

                <div class="lobby-card-footer">
                    ${enterButton}
                </div>
            </div>
        `;
    }).join("");
}

window.entrarALobbyDesdeCartelera = function(roomId, requierePass) {
    let pass = "";
    if (requierePass) {
        pass = prompt("Esta sala requiere contraseña. Ingresala para entrar:") || "";
        if (!pass) return;
    }
    unirseASalaOnline(roomId, pass);
};

function crearSalaOnline() {
    try {
        const tienePass = dom.dueloOnlineHasPassword ? dom.dueloOnlineHasPassword.checked : false;
        const pass = tienePass && dom.dueloOnlineRoomPassword ? dom.dueloOnlineRoomPassword.value.trim() : "";
        const formatoModo = dom.dueloOnlineModoSelect ? dom.dueloOnlineModoSelect.value : (onlineDueloEstado.formatoModo || "versus");
        const juego = dom.dueloOnlineGameSelect ? dom.dueloOnlineGameSelect.value : (onlineDueloEstado.juegoSeleccionado || "bomba");
        const nombreSala = dom.dueloCreateRoomName ? dom.dueloCreateRoomName.value.trim() : "Sala de Repaso";
        const esPublica = dom.dueloCreateRoomIsPublic ? dom.dueloCreateRoomIsPublic.checked : true;

        const codigo = generarCodigoSala();
        onlineDueloEstado.esHost = true;
        onlineDueloEstado.codigoSala = codigo;
        onlineDueloEstado.nombreSala = nombreSala || "Sala de Repaso";
        onlineDueloEstado.esPublica = esPublica;
        onlineDueloEstado.tienePassword = tienePass;
        onlineDueloEstado.passwordSala = pass;
        onlineDueloEstado.formatoModo = formatoModo;
        onlineDueloEstado.juegoSeleccionado = juego;

        // Determinar tiempo y configuración coherente según el juego activo
        let tiempo = 90;
        dueloEstado.config.juego = juego;
        dueloEstado.config.formatoModo = formatoModo;

        if (juego === "bomba") {
            const timeSelect = document.getElementById("dueloBombaTimeSelect");
            const maxFallosSelect = document.getElementById("dueloBombaMaxFallos");
            const cortacablesCheck = document.getElementById("dueloBombaComodinCortacables");
            const bonusCheck = document.getElementById("dueloBombaRoboBonus");
            const vidasEscuadronCheck = document.getElementById("dueloBombaVidasEscuadron");

            tiempo = timeSelect ? parseInt(timeSelect.value, 10) : 90;
            dueloEstado.config.bomba = {
                maxFallos: maxFallosSelect ? parseInt(maxFallosSelect.value, 10) : 2,
                cortacables: cortacablesCheck ? cortacablesCheck.checked : true,
                bonusPrimerDesactivador: bonusCheck ? bonusCheck.checked : true,
                vidasEscuadron: vidasEscuadronCheck ? vidasEscuadronCheck.checked : true
            };
        } else if (juego === "bolillero") {
            const timeSelect = document.getElementById("dueloBolilleroTimeSelect");
            tiempo = timeSelect ? parseInt(timeSelect.value, 10) : 90;
            dueloEstado.config.comodines.socorro = dom.dueloOnlineComodinSocorro ? dom.dueloOnlineComodinSocorro.checked : true;
            dueloEstado.config.comodines.pista = dom.dueloOnlineComodinPista ? dom.dueloOnlineComodinPista.checked : true;
            dueloEstado.config.comodines.pasoRebote = dom.dueloOnlineComodinPaso ? dom.dueloOnlineComodinPaso.checked : true;
            dueloEstado.config.reglas.rachaFuego = dom.dueloOnlineReglaRacha ? dom.dueloOnlineReglaRacha.checked : true;
            dueloEstado.config.reglas.roboRelampago = dom.dueloOnlineReglaRobo ? dom.dueloOnlineReglaRobo.checked : true;
        } else if (juego === "impostor") {
            const timeSelect = document.getElementById("dueloImpostorTimeSelect");
            const casosSelect = document.getElementById("dueloImpostorCasosSelect");
            const penalizacionCheck = document.getElementById("dueloImpostorPenalizacion");
            const bonusVelozCheck = document.getElementById("dueloImpostorBonusVeloz");

            tiempo = timeSelect ? parseInt(timeSelect.value, 10) : 45;
            dueloEstado.config.impostor = {
                casos: casosSelect ? parseInt(casosSelect.value, 10) : 5,
                penalizacion: penalizacionCheck ? penalizacionCheck.checked : true,
                bonusVeloz: bonusVelozCheck ? bonusVelozCheck.checked : true
            };
        } else if (juego === "memotest") {
            const timeSelect = document.getElementById("dueloMemotestTimeSelect");
            const paresSelect = document.getElementById("dueloMemotestParesSelect");
            const vistazoCheck = document.getElementById("dueloMemotestVistazo");
            const rachaTurnoCheck = document.getElementById("dueloMemotestRachaTurno");

            tiempo = timeSelect ? parseInt(timeSelect.value, 10) : 90;
            dueloEstado.config.memotest = {
                pares: paresSelect ? parseInt(paresSelect.value, 10) : 6,
                vistazo: vistazoCheck ? vistazoCheck.checked : true,
                rachaTurno: rachaTurnoCheck ? rachaTurnoCheck.checked : true
            };
        } else if (juego === "triatlon") {
            const timeSelect = document.getElementById("dueloTriatlonTimeSelect");
            const multiCheck = document.getElementById("dueloTriatlonMultiplicador");

            tiempo = timeSelect ? parseInt(timeSelect.value, 10) : 90;
            dueloEstado.config.triatlon = {
                tiempoEtapa: tiempo,
                multiplicador: multiCheck ? multiCheck.checked : true
            };
        }

        dueloEstado.config.tiempoTurnoSegundos = tiempo;
        dueloEstado.config.desempateAuto = dom.dueloOnlineAutoTiebreaker ? dom.dueloOnlineAutoTiebreaker.checked : true;

        const apunte = apuntesEstado.global || apuntesEstado.bomba;
        const listaId = (onlineDueloEstado.fuenteMaterial === "pdf" && apunte && apunte.texto)
            ? "pdf_global"
            : "default_estudio";
        dueloEstado.config.listaId = listaId;

        // Agregar anfitrión a la lista de jugadores (el host está listo por defecto)
        onlineDueloEstado.jugadores = [{
            id: perfilUsuario.id,
            apodo: perfilUsuario.apodo,
            avatar: perfilUsuario.avatar,
            tipoAvatar: perfilUsuario.tipoAvatar,
            fotoDataUrl: perfilUsuario.fotoDataUrl,
            victorias: perfilUsuario.victorias || 0,
            rachaActual: 0,
            puntos: 0,
            puntosAportados: 0,
            robosExitosos: 0,
            comodinesUsados: { socorro: false, pista: false, pasoRebote: false },
            esHost: true,
            listo: true
        }];

        // Cerrar modal flotante si estaba abierto
        if (dom.dueloCreateRoomModal && typeof dom.dueloCreateRoomModal.close === "function") {
            try { dom.dueloCreateRoomModal.close(); } catch (_) {}
        }

        // Mostrar DE INMEDIATO el Lobby Cuadrado con el fondo temático
        mostrarSalaDeEsperaOnline(codigo);

        // Si la sala es pública, arrancar emisión de beacons para matchmaking
        if (esPublica) {
            iniciarBroadcastingSalaPublica();
        }

        // Suscribirse a MQTT en paralelo
        conectarMqttSiEsNecesario(() => {
            const topic = obtenerTopicSala(codigo);
            if (onlineDueloEstado.clienteMqtt) {
                onlineDueloEstado.clienteMqtt.subscribe(topic, (err) => {
                    if (err) console.warn("Error al suscribirse al topic:", err);
                });
            }
        });
    } catch (err) {
        console.error("Error al crear sala online:", err);
        alert("Ocurrió un error al crear la sala: " + err.message);
    }
}

function unirseASalaOnline(codigoIngresado, passIngresado = "") {
    const codigo = (codigoIngresado || "").trim().toUpperCase();
    if (!codigo || codigo.length < 3) {
        alert("Ingresá un código de sala válido.");
        return;
    }

    // Cerrar modal de PIN si estaba abierto
    if (dom.dueloJoinByPinModal && typeof dom.dueloJoinByPinModal.close === "function") {
        try { dom.dueloJoinByPinModal.close(); } catch (_) {}
    }

    onlineDueloEstado.esHost = false;
    onlineDueloEstado.codigoSala = codigo;
    onlineDueloEstado.passwordSala = passIngresado.trim();

    // Mostrar de inmediato la sala de espera
    mostrarSalaDeEsperaOnline(codigo);

    conectarMqttSiEsNecesario(() => {
        const topic = obtenerTopicSala(codigo);
        if (onlineDueloEstado.clienteMqtt) {
            onlineDueloEstado.clienteMqtt.subscribe(topic, () => {
                // Enviar saludo de unión con listo: false
                publicarMensajeSala({
                    tipo: "INTENTO_UNION",
                    password: passIngresado.trim(),
                    jugador: {
                        id: perfilUsuario.id,
                        apodo: perfilUsuario.apodo,
                        avatar: perfilUsuario.avatar,
                        tipoAvatar: perfilUsuario.tipoAvatar,
                        fotoDataUrl: perfilUsuario.fotoDataUrl,
                        victorias: perfilUsuario.victorias || 0,
                        rachaActual: 0,
                        puntos: 0,
                        puntosAportados: 0,
                        robosExitosos: 0,
                        comodinesUsados: { socorro: false, pista: false, pasoRebote: false },
                        esHost: false,
                        listo: false
                    }
                });
            });
        }
    });
}

function mostrarSalaDeEsperaOnline(codigo) {
    if (dom.dueloOnlineSetupView) dom.dueloOnlineSetupView.classList.add("hidden");
    if (dom.dueloOnlineWaitingRoom) dom.dueloOnlineWaitingRoom.classList.remove("hidden");
    if (dom.dueloWaitingRoomCode) dom.dueloWaitingRoomCode.textContent = codigo;

    const juegoId = onlineDueloEstado.juegoSeleccionado || (dom.dueloOnlineGameSelect ? dom.dueloOnlineGameSelect.value : "bomba");
    onlineDueloEstado.juegoSeleccionado = juegoId;

    // Aplicar clase temática del juego elegido al cuadrado del lobby
    const box = document.getElementById("dueloLobbySquareBox");
    if (box) {
        box.className = `duelo-lobby-box lobby-theme--${juegoId}`;
    }

    const gameMeta = {
        bomba: { icon: "💣", title: "Desactivá la Bomba" },
        bolillero: { icon: "🎲", title: "Bolillero de Estudio" },
        impostor: { icon: "🕵️‍♂️", title: "Caza al Impostor" },
        memotest: { icon: "🧠", title: "Memotest Teórico" },
        triatlon: { icon: "🏅", title: "Triatlón Académico" }
    };
    const meta = gameMeta[juegoId] || gameMeta.bomba;
    const iconElem = document.getElementById("dueloLobbyGameIcon");
    const titleElem = document.getElementById("dueloLobbyGameTitle");
    if (iconElem) iconElem.textContent = meta.icon;
    if (titleElem) titleElem.textContent = meta.title;

        const matBadge = document.getElementById("dueloWaitingRoomMaterialBadge");
    if (matBadge) {
        const apunte = apuntesEstado.global || apuntesEstado.bomba || apuntesEstado.bolillero;
        const listaId = dueloEstado.config.listaId;
        if (listaId === "pdf_global" && apunte && apunte.nombre) {
            matBadge.textContent = `📄 PDF: ${apunte.nombre}`;
            matBadge.style.display = "inline-flex";
        } else {
            const lista = estado.listas.find(l => l.id === listaId);
            if (lista) {
                matBadge.textContent = `📚 ${lista.nombre}`;
                matBadge.style.display = "inline-flex";
            } else if (apunte && apunte.nombre) {
                matBadge.textContent = `📄 PDF: ${apunte.nombre}`;
                matBadge.style.display = "inline-flex";
            } else {
                matBadge.textContent = "📚 Repaso General";
                matBadge.style.display = "inline-flex";
            }
        }
    }
    
    if (dom.dueloWaitingRoomModoBadge) {
        if (onlineDueloEstado.formatoModo === "coop") {
            dom.dueloWaitingRoomModoBadge.textContent = "🤝 Modo Cooperativo (Hasta 8)";
            dom.dueloWaitingRoomModoBadge.className = "badge badge--success";
        } else {
            dom.dueloWaitingRoomModoBadge.textContent = "⚔️ Modo Versus (Hasta 8)";
            dom.dueloWaitingRoomModoBadge.className = "badge badge--accent";
        }
    }

    const magicLink = `${window.location.origin}${window.location.pathname}?room=${codigo}`;
    if (dom.dueloMagicLinkInput) dom.dueloMagicLinkInput.value = magicLink;

    if (dom.dueloHostControlsArea) dom.dueloHostControlsArea.classList.toggle("hidden", !onlineDueloEstado.esHost);
    if (dom.dueloGuestWaitArea) dom.dueloGuestWaitArea.classList.toggle("hidden", onlineDueloEstado.esHost);

    // Si es invitado, actualizar el botón de "Estoy Listo"
    if (!onlineDueloEstado.esHost) {
        const miJugador = onlineDueloEstado.jugadores.find(j => j.id === perfilUsuario.id);
        const btnReady = document.getElementById("dueloGuestReadyBtn");
        if (btnReady) {
            const estaListo = miJugador ? !!miJugador.listo : false;
            btnReady.className = estaListo
                ? "button button--warning button--lg button--ready-toggle"
                : "button button--success button--lg button--ready-toggle";
            btnReady.innerHTML = estaListo ? "⏳ Cancelar Listo" : "✅ ¡Estoy Listo!";
        }
    }

    renderJugadoresSalaEspera();
}

function renderJugadoresSalaEspera() {
    if (!dom.dueloOnlinePlayersGrid) return;
    dom.dueloOnlinePlayersGrid.innerHTML = "";

    const jugadores = onlineDueloEstado.jugadores || [];
    if (dom.dueloOnlineConnectedCount) {
        dom.dueloOnlineConnectedCount.textContent = `${jugadores.length}/8`;
    }

    // Renderizar exactamente los 8 slots
    for (let i = 0; i < 8; i++) {
        if (i < jugadores.length) {
            const j = jugadores[i];
            const isSelf = j.id === perfilUsuario.id;
            const card = document.createElement("div");
            card.className = `duelo-online-player-chip ${j.esHost ? "is-host" : ""} ${isSelf ? "is-self" : ""}`;

            let readyBadgeHTML = "";
            if (j.esHost) {
                readyBadgeHTML = '<span class="duelo-slot-host-badge">👑 HOST</span>';
            } else if (j.listo) {
                readyBadgeHTML = '<span class="duelo-slot-ready-badge is-ready">🟢 ¡LISTO!</span>';
            } else {
                readyBadgeHTML = '<span class="duelo-slot-ready-badge is-waiting">⏳ ESPERANDO...</span>';
            }

            card.innerHTML = `
                ${renderAvatarHTML(j, 0, false, 44)}
                <span class="duelo-online-player-chip__name" title="${j.apodo || j.nombre}">${j.apodo || j.nombre} ${isSelf ? "(Vos)" : ""}</span>
                ${readyBadgeHTML}
            `;
            dom.dueloOnlinePlayersGrid.appendChild(card);
        } else {
            // Slot vacío
            const emptySlot = document.createElement("div");
            emptySlot.className = "duelo-online-slot-empty";
            emptySlot.innerHTML = `
                <span class="empty-icon">➕</span>
                <span>Esperando jugador...</span>
                <span style="font-size: 0.7rem; opacity: 0.6;">Slot ${i + 1} de 8</span>
            `;
            dom.dueloOnlinePlayersGrid.appendChild(emptySlot);
        }
    }

    // Lógica del botón Iniciar Partida del Host según el Ready Check
    const invitados = jugadores.filter(j => !j.esHost);
    const totalInvitados = invitados.length;
    const listosCount = invitados.filter(j => j.listo).length;
    const badgeSummary = document.getElementById("dueloReadySummaryBadge");

    if (badgeSummary) {
        if (totalInvitados === 0) {
            badgeSummary.textContent = "👥 Esperando que entren compañeros...";
            badgeSummary.className = "duelo-ready-summary-badge";
        } else if (listosCount === totalInvitados) {
            badgeSummary.textContent = `🟢 ¡Todos listos (${listosCount}/${totalInvitados})!`;
            badgeSummary.className = "duelo-ready-summary-badge badge--success";
        } else {
            badgeSummary.textContent = `⏳ ${listosCount}/${totalInvitados} Listos`;
            badgeSummary.className = "duelo-ready-summary-badge badge--warning";
        }
    }

    if (dom.dueloLaunchOnlineMatchBtn) {
        const hintElem = document.getElementById("dueloHostStatusHint");
        if (totalInvitados === 0) {
            // Host solo: puede iniciar para probar en solitario
            dom.dueloLaunchOnlineMatchBtn.disabled = false;
            dom.dueloLaunchOnlineMatchBtn.classList.remove("button--disabled");
            dom.dueloLaunchOnlineMatchBtn.classList.remove("button--pulse-launch");
            dom.dueloLaunchOnlineMatchBtn.innerHTML = "🚀 ¡INICIAR PARTIDA! (Solo / Práctica)";
            if (hintElem) hintElem.textContent = "Podés iniciar para probar en solitario o compartir el PIN para jugar en grupo.";
        } else {
            const todosListos = listosCount === totalInvitados;
            if (todosListos) {
                // Todos los participantes pusieron "Estoy Listo"
                dom.dueloLaunchOnlineMatchBtn.disabled = false;
                dom.dueloLaunchOnlineMatchBtn.classList.remove("button--disabled");
                dom.dueloLaunchOnlineMatchBtn.classList.add("button--pulse-launch");
                dom.dueloLaunchOnlineMatchBtn.innerHTML = `🚀 ¡TODOS LISTOS! (${listosCount}/${totalInvitados}) EMPEZAR PARTIDA`;
                if (hintElem) hintElem.textContent = "¡Todos tus compañeros están listos! Presioná empezar para arrancar a la vez.";
            } else {
                // Faltan participantes por confirmar
                dom.dueloLaunchOnlineMatchBtn.disabled = true;
                dom.dueloLaunchOnlineMatchBtn.classList.add("button--disabled");
                dom.dueloLaunchOnlineMatchBtn.classList.remove("button--pulse-launch");
                dom.dueloLaunchOnlineMatchBtn.innerHTML = `⏳ Esperando que todos pongan 'Estoy Listo' (${listosCount}/${totalInvitados})`;
                if (hintElem) hintElem.textContent = `Faltan ${totalInvitados - listosCount} jugador(es) por confirmar que están listos.`;
            }
        }
    }
}

function toggleReadyInvitado() {
    const miJugador = onlineDueloEstado.jugadores.find(j => j.id === perfilUsuario.id);
    if (!miJugador) return;
    miJugador.listo = !miJugador.listo;

    const btnReady = document.getElementById("dueloGuestReadyBtn");
    if (btnReady) {
        btnReady.className = miJugador.listo
            ? "button button--warning button--lg button--ready-toggle"
            : "button button--success button--lg button--ready-toggle";
        btnReady.innerHTML = miJugador.listo ? "⏳ Cancelar Listo" : "✅ ¡Estoy Listo!";
    }

    publicarMensajeSala({
        tipo: "JUGADOR_READY_STATUS",
        jugadorId: perfilUsuario.id,
        listo: miJugador.listo
    });

    renderJugadoresSalaEspera();
}
window.toggleReadyInvitado = toggleReadyInvitado;

function procesarMensajeMqttSala(data) {
    if (!data || !data.tipo) return;

    // 1. Intento de unión de un jugador
    if (data.tipo === "INTENTO_UNION") {
        if (onlineDueloEstado.esHost) {
            if (onlineDueloEstado.tienePassword && data.password !== onlineDueloEstado.passwordSala) {
                publicarMensajeSala({
                    tipo: "RECHAZO_PASSWORD",
                    targetJugadorId: data.jugador.id
                });
                return;
            }

            // Evitar duplicados y verificar límite de 8 jugadores
            const jugadorData = { ...data.jugador, listo: false };
            const idx = onlineDueloEstado.jugadores.findIndex(j => j.id === jugadorData.id);
            if (idx === -1) {
                if (onlineDueloEstado.jugadores.length >= 8) {
                    publicarMensajeSala({
                        tipo: "SALA_LLENA",
                        targetJugadorId: jugadorData.id
                    });
                    return;
                }
                onlineDueloEstado.jugadores.push(jugadorData);
            } else {
                onlineDueloEstado.jugadores[idx] = jugadorData;
            }

            // Sincronizar estado completo a la sala
            publicarMensajeSala({
                tipo: "SINCRONIZAR_SALA",
                jugadores: onlineDueloEstado.jugadores,
                config: dueloEstado.config,
                formatoModo: onlineDueloEstado.formatoModo,
                juegoSeleccionado: onlineDueloEstado.juegoSeleccionado
            });
            renderJugadoresSalaEspera();
        }
    }

    // 2. Sincronización del Host
    if (data.tipo === "SINCRONIZAR_SALA") {
        onlineDueloEstado.jugadores = data.jugadores || [];
        if (data.config) {
            dueloEstado.config = data.config;
        }
        if (data.formatoModo) {
            onlineDueloEstado.formatoModo = data.formatoModo;
            dueloEstado.config.formatoModo = data.formatoModo;
        }
        if (data.juegoSeleccionado) {
            onlineDueloEstado.juegoSeleccionado = data.juegoSeleccionado;
        }
        mostrarSalaDeEsperaOnline(onlineDueloEstado.codigoSala);
    }

    // 3. Ready Status de un jugador
    if (data.tipo === "JUGADOR_READY_STATUS") {
        const target = onlineDueloEstado.jugadores.find(j => j.id === data.jugadorId);
        if (target) {
            target.listo = !!data.listo;
            renderJugadoresSalaEspera();
        }
        if (onlineDueloEstado.esHost) {
            publicarMensajeSala({
                tipo: "SINCRONIZAR_SALA",
                jugadores: onlineDueloEstado.jugadores,
                config: dueloEstado.config,
                formatoModo: onlineDueloEstado.formatoModo,
                juegoSeleccionado: onlineDueloEstado.juegoSeleccionado
            });
        }
        return;
    }

    // Sala llena
    if (data.tipo === "SALA_LLENA" && data.targetJugadorId === perfilUsuario.id) {
        alert("⚠️ La sala ya alcanzó el cupo máximo de 8 jugadores.");
        salirDeSalaOnline();
    }

    // 4. Rechazo de password
    if (data.tipo === "RECHAZO_PASSWORD" && data.targetJugadorId === perfilUsuario.id) {
        alert("La contraseña ingresada para esta sala es incorrecta.");
        salirDeSalaOnline();
    }

    // 4. Iniciar Partida de Bomba Online (Versus o Coop)
    if (data.tipo === "INICIO_BOMBA_ONLINE") {
        arrancarBombaOnlineCliente(data);
        return;
    }

    if (data.tipo === "BOMBA_PROGRESO") {
        if (juegosEduEstado.bombaOnline) {
            const rival = juegosEduEstado.bombaOnline.jugadores.find(j => j.id === data.jugadorId);
            if (rival) {
                const subioFase = data.fase > rival.fase;
                rival.fase = data.fase;
                rival.fallos = data.fallos;
                if (data.estado === "desactivada") rival.desactivada = true;
                renderBombaOnlineTracker();

                if (subioFase && rival.id !== perfilUsuario.id) {
                    mostrarToast(`⚡ ¡${rival.apodo} cortó el Cable ${data.fase - 1}!`);
                }
            }
        }
        return;
    }

    if (data.tipo === "BOMBA_DESACTIVADA") {
        if (juegosEduEstado.bombaOnline) {
            juegosEduEstado.bombaOnline.desactivacionesCount = (juegosEduEstado.bombaOnline.desactivacionesCount || 0) + 1;
            const puesto = juegosEduEstado.bombaOnline.desactivacionesCount;
            const rival = juegosEduEstado.bombaOnline.jugadores.find(j => j.id === data.jugadorId);
            if (rival) {
                rival.desactivada = true;
                rival.posicion = puesto;
                rival.puntos = data.puntos;
            }
            renderBombaOnlineTracker();

            if (data.jugadorId !== perfilUsuario.id) {
                mostrarToast(`🏆 ¡${data.apodo} desactivó la bomba (#${puesto} con ${data.puntos} pts)!`);
                reproducirSonido("ruletaFin");
            }
        }
        return;
    }

    if (data.tipo === "BOMBA_DETONADA") {
        if (juegosEduEstado.bombaOnline) {
            const rival = juegosEduEstado.bombaOnline.jugadores.find(j => j.id === data.jugadorId);
            if (rival) {
                rival.detonada = true;
            }
            renderBombaOnlineTracker();
            if (data.jugadorId !== perfilUsuario.id) {
                mostrarToast(`💥 ¡A ${data.apodo} le detonó la bomba!`);
            }
        }
        return;
    }

    if (data.tipo === "COOP_BOMBA_FASE") {
        if (juegosEduEstado.bomba && juegosEduEstado.bomba.fase < data.fase) {
            juegosEduEstado.bomba.fase = data.fase;
            actualizarCablesBomba();
            const tema = juegosEduEstado.temas[0];
            if (data.fase === 2) {
                if (dom.bombaFase1View) dom.bombaFase1View.classList.add("hidden");
                if (dom.bombaFase2View) dom.bombaFase2View.classList.remove("hidden");
                renderFase2Bomba(tema);
            } else if (data.fase === 3) {
                if (dom.bombaFase2View) dom.bombaFase2View.classList.add("hidden");
                if (dom.bombaFase3View) dom.bombaFase3View.classList.remove("hidden");
                renderFase3Bomba(tema);
            }
            reproducirSonido("ruletaFin");
            mostrarToast(`🤝 ¡El equipo avanzó al Cable ${data.fase}!`);
        }
        return;
    }

    if (data.tipo === "COOP_BOMBA_FALLO") {
        reproducirSonido("chispazo");
        dispararGlitchBomba();
        juegosEduEstado.bomba.fallos++;
        juegosEduEstado.bomba.tiempoRestante = Math.max(5, juegosEduEstado.bomba.tiempoRestante - 15);
        actualizarTimerBombaDisplay();
        mostrarToast(`⚠️ ¡Fallo grupal en el equipo! -15s`);
        if (juegosEduEstado.bomba.fallos >= 3) {
            detonarBomba("3 errores en equipo provocaron la detonación.");
        }
        return;
    }

    if (data.tipo === "BOMBA_VOLVER_LOBBY") {
        clearInterval(juegosEduEstado.bomba.timerId);
        juegosEduEstado.esOnline = false;
        cambiarVista("duelo");
        mostrarSalaDeEsperaOnline(onlineDueloEstado.codigoSala);
        mostrarToast("🔄 Volvieron a la sala de espera.");
        return;
    }

    // 4. Iniciar Partida Online
    if (data.tipo === "INICIO_PARTIDA_ONLINE") {
        arrancarBolilleroOnlineCliente(data);
    }

    // Eventos Cooperativos
    if (data.tipo === "COOP_PEDIR_RELEVO") {
        dueloEstado.partida.relevoSolicitado = true;
        dueloEstado.partida.relevoOradorOriginalId = data.senderId;
        if (perfilUsuario.id !== data.senderId && dom.dueloRelevoPromptBox) {
            dom.dueloRelevoPromptBox.classList.remove("hidden");
            if (dom.dueloRelevoSenderName) dom.dueloRelevoSenderName.textContent = data.senderName;
            reproducirSonidoDuelo("beep");
        }
    }

    if (data.tipo === "COOP_TOMAR_RELEVO") {
        if (dom.dueloRelevoPromptBox) dom.dueloRelevoPromptBox.classList.add("hidden");
        dueloEstado.partida.relevoSolicitado = false;
        agregarRegistroTurnoDuelo(`🤝 ¡${data.relevoNombre} tomó el relevo del tema! (+20s)`, 0);
        if (dom.dueloTurnPlayerName) {
            dom.dueloTurnPlayerName.textContent = `${dom.dueloTurnPlayerName.textContent} ➔ Relevo: ${data.relevoNombre}`;
        }
        dueloEstado.partida.tiempoRestante += 20;
        actualizarCronometroTurnoDueloUI();
        mostrarToast(`🤝 ¡${data.relevoNombre} tomó el relevo para responder!`);
    }

    if (data.tipo === "COOP_UPDATE_PUNTOS") {
        dueloEstado.partida.puntosEquipo = data.puntosEquipo;
        dueloEstado.partida.vidasEquipo = data.vidasEquipo;
        actualizarMarcadorDueloUI();
    }

    // 5. Giro de la doble ruleta sincronizado
    if (data.tipo === "RULETA_GIRAR") {
        ejecutarAnimacionRuletaSincronizada(data.jugadorGanador, data.temaGanador, data.duracion);
    }

    // 6. Sincronización de cronómetro
    if (data.tipo === "CRONO_TICK") {
        dueloEstado.partida.tiempoRestante = data.tiempo;
        actualizarCronometroTurnoDueloUI();
    }

    // 6.1 Fin de Exposición Oral (Pasa a votación)
    if (data.tipo === "FIN_EXPOSICION_ORAL") {
        transicionarAVotacionDuelo(data.jugadorId);
    }

    // 6.2 Orador cede el turno voluntariamente (0 pts y Robo Relámpago inmediato)
    if (data.tipo === "CEDER_TURNO_ORADOR") {
        ejecutarCederTurnoOrador(data.jugadorId);
    }

    // 6.3 Avance a la siguiente ronda ordenado por el host
    if (data.tipo === "AVANZAR_SIGUIENTE_RONDA") {
        if (!onlineDueloEstado.esHost) {
            avanzarSiguienteTemaDuelo();
        }
    }

    // 7. Voto emitido por un dispositivo
    if (data.tipo === "VOTO_EMITIDO") {
        if (data.votanteId !== perfilUsuario.id) {
            procesarVotoOnlineRecibido(data.votanteId, data.votanteNombre, data.voto);
        }
    }

    // 8. Resultado oficial de la votación
    if (data.tipo === "RESULTADO_VOTACION") {
        if (!onlineDueloEstado.esHost) {
            aplicarResultadoVotacionOnline(data);
        }
    }

    // 9. Robo Relámpago activado
    if (data.tipo === "ROBO_DISPONIBLE") {
        activarRoboRelampagoOnlinePantalla(data.tema);
    }

    // 10. Reclamo de robo relámpago
    if (data.tipo === "ROBO_RECLAMADO") {
        atribuirRoboRelampagoOnline(data.ladronId, data.ladronNombre);
    }

    // 10.1 Calificación sincronizada de robo relámpago
    if (data.tipo === "ROBO_CALIFICADO") {
        if (!onlineDueloEstado.esHost) {
            const partida = dueloEstado.partida;
            const ladron = partida.jugadores.find(j => j.id === data.ladronId);
            if (ladron) {
                ladron.puntos = data.puntos;
                ladron.robosExitosos = data.robosExitosos;
            }
            if (dom.dueloRoboBox) dom.dueloRoboBox.classList.add("hidden");
            if (dom.dueloOnlineRoboOverlay) dom.dueloOnlineRoboOverlay.classList.add("hidden");
            partida.robo.activo = false;
            actualizarMarcadorDueloUI();
            avanzarSiguienteTemaDuelo();
        }
    }

    // 11. Chat Mensaje Multimedia
    if (data.tipo === "CHAT_MSG") {
        recibirMensajeChatEnVivo(data.msg);
    }

    // 12. Fin de Partida
    if (data.tipo === "FIN_PARTIDA_ONLINE") {
        if (!onlineDueloEstado.esHost && data.partidaGuardada) {
            mostrarModalVictoriaDuelo(data.partidaGuardada);
        }
    }
}

function salirDeSalaOnline() {
    detenerBroadcastingSalaPublica();
    if (onlineDueloEstado.clienteMqtt && onlineDueloEstado.codigoSala) {
        publicarMensajeSala({
            tipo: "SALIDA_JUGADOR",
            jugadorId: perfilUsuario.id
        });
        onlineDueloEstado.clienteMqtt.unsubscribe(obtenerTopicSala(onlineDueloEstado.codigoSala));
    }
    onlineDueloEstado.codigoSala = "";
    onlineDueloEstado.esHost = false;
    onlineDueloEstado.jugadores = [];
    if (dom.dueloOnlineWaitingRoom) dom.dueloOnlineWaitingRoom.classList.add("hidden");
    if (dom.dueloOnlineSetupView) dom.dueloOnlineSetupView.classList.remove("hidden");
    iniciarDiscoveryLobbiesOnline();
}

function arrancarBolilleroOnlineCliente(data) {
    dueloEstado.partida.activa = true;
    dueloEstado.partida.rondaNumero = 1;
    dueloEstado.partida.turnoNumero = 0;
    dueloEstado.partida.jugadores = (data.jugadores || []).map(j => ({
        ...j,
        nombre: j.nombre || j.apodo || "Jugador",
        apodo: j.apodo || j.nombre || "Jugador",
        puntos: j.puntos || 0,
        puntosAportados: 0,
        rachaActual: 0,
        maxRacha: 0,
        robosExitosos: 0,
        comodinesUsados: j.comodinesUsados || { socorro: false, pista: false, pasoRebote: false }
    }));
    dueloEstado.partida.temasDisponibles = (data.temasDisponibles || []).map(t => {
        const nom = t.titulo || t.palabra || t.nombre || "Tema de Estudio";
        return {
            ...t,
            titulo: nom,
            palabra: nom,
            nombre: nom
        };
    });
    dueloEstado.partida.historialTurnos = [];
    dueloEstado.partida.esCoop = (data.formatoModo || onlineDueloEstado.formatoModo) === "coop";
    dueloEstado.partida.puntosEquipo = 0;
    dueloEstado.partida.metaPuntosEquipo = 100;
    dueloEstado.partida.vidasEquipo = 3;
    dueloEstado.partida.relevoSolicitado = false;

    // Cambiar vista a la arena de combate
    cambiarVista("duelo");
    if (dom.dueloOnlineWaitingRoom) dom.dueloOnlineWaitingRoom.classList.add("hidden");
    if (dom.dueloOnlineSetupView) dom.dueloOnlineSetupView.classList.add("hidden");
    if (dom.dueloLobby) dom.dueloLobby.classList.add("hidden");
    if (dom.dueloArena) dom.dueloArena.classList.remove("hidden");
    actualizarMarcadorDueloUI();

    // Configurar botón girar ruletas según rol
    if (dom.dueloSpinBtn) {
        if (onlineDueloEstado.esHost) {
            dom.dueloSpinBtn.disabled = false;
            dom.dueloSpinBtn.innerHTML = '<span>🎰</span><span>GIRAR DOBLE RULETA</span>';
        } else {
            dom.dueloSpinBtn.disabled = true;
            dom.dueloSpinBtn.innerHTML = '<span>⏳</span><span>Esperando que el anfitrión gire la ruleta...</span>';
        }
    }

    if (dom.dueloLocalEvalSection) dom.dueloLocalEvalSection.classList.add("hidden");
    if (dom.dueloOnlineVoteBox) dom.dueloOnlineVoteBox.classList.add("hidden");
}

// Extractor inteligente de temas y ejes orales de examen para Bolillero
function extraerEjesTematicosBolillero(texto, materiaNombre = "Materia de Estudio", count = 12) {
    const fallbackTemas = [
        {
            titulo: "Evaluación de Inversiones y Métodos VAN / TIR",
            guia: "Explicá cómo se evalúa la rentabilidad de un proyecto, la diferencia conceptual entre VAN y TIR, y cuándo se acepta o rechaza una inversión."
        },
        {
            titulo: "Costos Fijos, Variables y Punto de Equilibrio",
            guia: "Definí la clasificación de costos, margen de contribución unitario y cómo calcular el nivel de actividad que cubre los costos totales."
        },
        {
            titulo: "Estados Contables y Principio de Partida Doble",
            guia: "Desarrollá los componentes del Balance General y Estado de Resultados, y la ecuación patrimonial fundamental (Activo = Pasivo + PN)."
        },
        {
            titulo: "Estructura del Sistema Financiero y Tasas de Interés",
            guia: "Analizá el rol de la intermediación bancaria, política monetaria del BCRA y el impacto de la tasa activa y pasiva en la economía."
        },
        {
            titulo: "Mercados Competitivos vs. Monopolio y Oligopolio",
            guia: "Compará la fijación de precios, curvas de ingreso marginal, barreras a la entrada y eficiencia en la asignación de recursos."
        },
        {
            titulo: "Inflación, Tipo de Cambio y Poder Adquisitivo",
            guia: "Explicá las causas monetarias y estructurales del fenómeno inflacionario, su impacto en salarios reales y competitividad externa."
        },
        {
            titulo: "Planificación Estratégica y Matriz FODA",
            guia: "Detallá cómo diagnosticar fortalezas, debilidades, oportunidades y amenazas para formular ventajas competitivas sostenibles."
        },
        {
            titulo: "Gestión del Capital de Trabajo y Ciclo Operativo",
            guia: "Explicá la administración de créditos comerciales, rotación de inventarios y proveedores para garantizar solvencia y liquidez corriente."
        },
        {
            titulo: "Sistemas de Información y Bases de Datos (ACID)",
            guia: "Desarrollá el modelo relacional, normalización de tablas y los principios de atomicidad, consistencia, aislamiento y durabilidad."
        },
        {
            titulo: "Contratos Comerciales y Responsabilidad Jurídica",
            guia: "Explicá los elementos esenciales de un contrato válido, consecuencias del incumplimiento, caso fortuito y resarcimiento."
        },
        {
            titulo: "Financiamiento Empresarial: Acciones vs. Deuda",
            guia: "Analizá el costo medio ponderado de capital (WACC), el apalancamiento financiero y el equilibrio de riesgo de insolvencia."
        },
        {
            titulo: "Comercio Internacional y Ventajas Comparativas",
            guia: "Explicá el modelo de costos de oportunidad, aranceles, términos de intercambio y balanza de pagos."
        }
    ];

    if (!texto || typeof texto !== "string" || texto.trim().length < 60) {
        return fallbackTemas.slice(0, count).map((t, idx) => ({
            id: `eje_fb_${idx + 1}`,
            titulo: t.titulo,
            palabra: t.titulo,
            nombre: t.titulo,
            guia: t.guia,
            explicacion: t.guia
        }));
    }

    const lineas = texto.split("\n").map(l => l.trim()).filter(l => l.length > 3);
    const candidatos = [];
    const vistos = new Set();

    const unidadRegex = /^(?:Unidad|Bolilla|Eje|Capítulo|Módulo|Tema|Parte)\s*\d+[\s:\-–—]+(.+)$/i;
    const numTituloRegex = /^[0-9]{1,2}[\.\)]\s+([A-ZÁÉÍÓÚÑ][\w\s,–—\-]{6,65})$/;
    const defRegex = /^([A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\(\)\/]{4,50})[:–—]\s*(.{15,})$/;
    const bulletRegex = /^[\u2022\-\*\u2013\u2014]\s*([A-ZÁÉÍÓÚÑ][\w\s,–—\-]{6,55})$/;

    for (const linea of lineas) {
        if (linea.toLowerCase().startsWith("página") || linea.toLowerCase().startsWith("page")) continue;
        if (/^https?:\/\//i.test(linea)) continue;

        let titulo = null;
        let guia = null;

        const uMatch = linea.match(unidadRegex);
        if (uMatch && uMatch[1].trim().length >= 5) {
            titulo = uMatch[1].trim().replace(/[.;:]$/, "");
            guia = `Eje temático de examen extraído del programa. Desarrollá los conceptos principales de ${titulo}.`;
        } else {
            const numMatch = linea.match(numTituloRegex);
            if (numMatch && numMatch[1].trim().length >= 6) {
                titulo = numMatch[1].trim().replace(/[.;:]$/, "");
                guia = `Explicá los fundamentos teóricos, alcances y aplicaciones prácticas de: ${titulo}.`;
            } else {
                const defMatch = linea.match(defRegex);
                if (defMatch) {
                    const concepto = defMatch[1].trim();
                    const palabras = concepto.split(/\s+/);
                    if (palabras.length >= 1 && palabras.length <= 6) {
                        titulo = concepto;
                        const primeraOracion = defMatch[2].split(/[.?!]/)[0].trim();
                        guia = (primeraOracion.length > 20 && primeraOracion.length < 130)
                            ? `Definición en material: "${primeraOracion}." Desarrollá sus implicancias.`
                            : `Definí y explicá los aspectos clave de ${concepto} según el texto.`;
                    }
                } else {
                    const bMatch = linea.match(bulletRegex);
                    if (bMatch) {
                        const contenido = bMatch[1].trim().replace(/[.;:]$/, "");
                        const words = contenido.split(/\s+/);
                        if (words.length >= 2 && words.length <= 6) {
                            titulo = contenido;
                            guia = `Desarrollá este concepto del material: ${contenido}.`;
                        }
                    }
                }
            }
        }

        if (titulo && titulo.length >= 4) {
            titulo = titulo.replace(/^[\d\.\-\)\s]+/, "").trim();
            const numPalabras = titulo.split(/\s+/).length;
            if (numPalabras === 1 && titulo.length < 11) {
                titulo = `Fundamentos y Análisis de ${titulo}`;
            }

            const claveNorm = titulo.toLowerCase();
            if (!vistos.has(claveNorm) && titulo.length <= 65) {
                vistos.add(claveNorm);
                candidatos.push({
                    titulo: titulo.charAt(0).toUpperCase() + titulo.slice(1),
                    guia: guia || `Desarrollá los conceptos centrales y relaciones prácticas de: ${titulo}.`
                });
            }
        }
    }

    if (candidatos.length < count) {
        for (const fb of fallbackTemas) {
            const claveFb = fb.titulo.toLowerCase();
            if (!vistos.has(claveFb)) {
                vistos.add(claveFb);
                candidatos.push(fb);
                if (candidatos.length >= count) break;
            }
        }
    }

    return candidatos.slice(0, count).map((item, idx) => ({
        id: `eje_${idx + 1}_${Date.now()}`,
        titulo: item.titulo,
        palabra: item.titulo,
        nombre: item.titulo,
        guia: item.guia,
        explicacion: item.guia
    }));
}

async function iniciarCombateOnlineDesdeHost() {
    if (!onlineDueloEstado.esHost) return;
    detenerBroadcastingSalaPublica();
    if (onlineDueloEstado.jugadores.length < 1) {
        alert("Se necesita al menos 1 jugador para iniciar la partida.");
        return;
    }

    const juego = onlineDueloEstado.juegoSeleccionado || (dom.dueloOnlineGameSelect ? dom.dueloOnlineGameSelect.value : "bomba");

    // Si el desafío elegido es "Desactivá la Bomba":
    if (juego === "bomba") {
        await iniciarBombaOnlineHost();
        return;
    }

    // Para el Bolillero:
    const listaId = dom.dueloOnlineListaSelect ? dom.dueloOnlineListaSelect.value : dueloEstado.config.listaId;
    const apunte = apuntesEstado.global || apuntesEstado.bolillero;
    let temasDisponibles = [];

    if ((listaId === "pdf_global" || onlineDueloEstado.fuenteMaterial === "pdf") && apunte && apunte.texto) {
        temasDisponibles = extraerEjesTematicosBolillero(apunte.texto, apunte.nombre, 15);
    } else {
        const lista = estado.listas.find(l => l.id === listaId) || estado.listas[0];
        if (lista && lista.temas && lista.temas.length > 0) {
            temasDisponibles = lista.temas.map(t => {
                const nom = t.titulo || t.palabra || t.nombre || "Tema";
                return {
                    ...t,
                    id: t.id || crypto.randomUUID(),
                    titulo: nom,
                    palabra: nom,
                    nombre: nom,
                    guia: t.descripcion || t.explicacion || `Desarrollá los conceptos principales, aplicaciones y relaciones de: ${nom}.`
                };
            });
        }
    }

    if (temasDisponibles.length === 0) {
        temasDisponibles = extraerEjesTematicosBolillero("", "General", 12);
    }

    const payload = {
        tipo: "INICIO_PARTIDA_ONLINE",
        jugadores: onlineDueloEstado.jugadores,
        temasDisponibles,
        formatoModo: onlineDueloEstado.formatoModo
    };

    publicarMensajeSala(payload);
    arrancarBolilleroOnlineCliente(payload);
}

// Extractor inteligente de oraciones y conceptos reales de PDF para Bomba (Fallback Offline / Sin Gemini)
function generarDesafioBombaDesdeTextoPDF(texto, nombreArchivo) {
    const nombre = (nombreArchivo || "Material de Estudio").replace(/\.pdf$/i, '');
    if (!texto || typeof texto !== "string" || texto.length < 50) {
        return asegurarDatosJuegoTema({ id: "bomba_pdf", nombre, descripcion: `Contenido de ${nombre}` }, 0);
    }

    // Extraer oraciones sustantivas completas del PDF
    const oraciones = texto
        .split(/(?<=[.?!])\s+/)
        .map(s => s.trim().replace(/^\[PÁGINA \d+\]:\s*/, ''))
        .filter(s => s.length >= 35 && s.length <= 150 && !s.includes('http') && !/^\d+$/.test(s) && !s.toLowerCase().startsWith('página'));

    const conceptos = extraerConceptosHeuristicos(texto, 10);
    const concepto1 = conceptos[0] || nombre;
    const concepto2 = conceptos[1] || (conceptos[0] ? `análisis de ${conceptos[0]}` : "el marco teórico");
    const concepto3 = conceptos[2] || (conceptos[0] ? `síntesis de ${conceptos[0]}` : "la conclusión conceptual");

    // Seleccionar afirmaciones reales del material
    const s1 = oraciones[0] || `Los postulados de ${concepto1} definen el marco de análisis formal según el material.`;
    const s2 = oraciones[Math.floor(oraciones.length / 3)] || oraciones[1] || `Las condiciones de ${concepto2} determinan la respuesta y dinámica del modelo analizado.`;
    const s3 = oraciones[Math.floor((oraciones.length * 2) / 3)] || oraciones[2] || `La integración metodológica de ${concepto3} fundamenta las conclusiones del estudio.`;

    function generarDistractores(oracionCorrecta, idxBase) {
        const pool = oraciones.filter(o => o !== oracionCorrecta);
        const dist = [];
        for (let i = 0; i < pool.length && dist.length < 3; i++) {
            const cand = pool[(idxBase + i) % pool.length];
            if (cand && !dist.includes(cand)) dist.push(cand);
        }
        while (dist.length < 3) {
            dist.push(`Se descartan los postulados válidos sobre ${nombre} para este caso específico.`);
            dist.push(`La variación observada resulta incompatible con los principios generales expuestos.`);
            dist.push(`El comportamiento del sistema no admite correlación con los fundamentos teóricos.`);
        }
        return dist.slice(0, 3);
    }

    function armarFase(pregunta, correcta, idxBase) {
        const distractores = generarDistractores(correcta, idxBase);
        const opciones = [correcta, ...distractores];
        const shuffled = opciones.map((opt, i) => ({ opt, isCorrect: i === 0 }))
                                 .sort(() => Math.random() - 0.5);
        const respIdx = shuffled.findIndex(item => item.isCorrect);
        return {
            pregunta,
            opciones: shuffled.map(item => item.opt),
            respuestaCorrecta: respIdx >= 0 ? respIdx : 0,
            explicacion: `Afirmación extraída directamente de ${nombreArchivo}: "${correcta.slice(0, 100)}..."`
        };
    }

    return {
        id: "bomba_pdf_" + Date.now(),
        nombre,
        descripcion: `Desafío conceptual basado en ${nombreArchivo}`,
        bomba: {
            fase1: armarFase(`Cable Rojo (Fundamento): Según ${nombreArchivo}, ¿cuál es la afirmación verdadera sobre "${concepto1}"?`, s1, 3),
            fase2: armarFase(`Cable Azul (Propiedades): En relación a "${concepto2}", ¿qué deducción analítica establece el material?`, s2, 7),
            fase3: armarFase(`Cable Verde (Clave Maestra): Para desactivar el detonador, identificá la síntesis teórica clave sobre "${concepto3}":`, s3, 11)
        }
    };
}

async function iniciarBombaOnlineHost() {
    if (!onlineDueloEstado.esHost) return;
    const listaId = dom.dueloOnlineListaSelect ? dom.dueloOnlineListaSelect.value : dueloEstado.config.listaId;
    const apunte = (listaId === "pdf_global" || !listaId || listaId === "default_estudio")
        ? (apuntesEstado.global || apuntesEstado.bomba || apuntesEstado.bolillero)
        : (apuntesEstado.global || apuntesEstado.bomba);

    const lista = estado.listas.find(l => l.id === listaId);

    // Estado visual de carga en el botón del Host
    if (dom.dueloLaunchOnlineMatchBtn) {
        dom.dueloLaunchOnlineMatchBtn.disabled = true;
        dom.dueloLaunchOnlineMatchBtn.innerHTML = "⏳ Generando preguntas con IA...";
    }

    let tema = null;
    let listaNombre = "Materia de Estudio";

    // 1. Si hay un PDF activo cargado:
    if (apunte && apunte.texto) {
        listaNombre = apunte.nombre;
        const nombreLimpio = apunte.nombre.replace(/\.pdf$/i, '');
        try {
            mostrarToast(`⚡ Formulando preguntas de Bomba desde "${apunte.nombre}" con IA...`);
            const data = await generarPreguntaIA({
                materia: nombreLimpio,
                tema: nombreLimpio,
                tipoJuego: 'bomba',
                contextoPDF: apunte.texto
            });
            if (data && data.fase1 && data.fase2 && data.fase3) {
                tema = {
                    id: "bomba_pdf_" + Date.now(),
                    nombre: nombreLimpio,
                    descripcion: `Desafío basado en el material: ${apunte.nombre}`,
                    bomba: {
                        fase1: data.fase1,
                        fase2: data.fase2,
                        fase3: data.fase3
                    }
                };
            }
        } catch (err) {
            console.warn("Fallo consulta Gemini para Bomba Online, usando extractor inteligente de PDF:", err);
            mostrarToast("⚠️ Conexión con Gemini sin respuesta directa: formulando preguntas directamente desde el texto de tu PDF");
        }

        // Si Gemini no respondió o no hay API key, extraer directamente del texto del PDF
        if (!tema) {
            tema = generarDesafioBombaDesdeTextoPDF(apunte.texto, apunte.nombre);
        }
    } else if (lista && lista.temas && lista.temas.length > 0) {
        // 2. Si se eligió una lista de temas personalizada:
        listaNombre = lista.titulo || lista.nombre;
        const randIdx = Math.floor(Math.random() * lista.temas.length);
        const temaSeleccionado = lista.temas[randIdx];
        try {
            const data = await generarPreguntaIA({
                materia: listaNombre,
                tema: temaSeleccionado.palabra || temaSeleccionado.nombre,
                tipoJuego: 'bomba'
            });
            if (data && data.fase1 && data.fase2 && data.fase3) {
                tema = {
                    ...temaSeleccionado,
                    bomba: {
                        fase1: data.fase1,
                        fase2: data.fase2,
                        fase3: data.fase3
                    }
                };
            }
        } catch (err) {
            console.warn("Gemini offline para lista temática, usando datos del tema:", err);
        }
        if (!tema) {
            tema = asegurarDatosJuegoTema(temaSeleccionado, randIdx);
        }
    }

    if (!tema) {
        tema = asegurarDatosJuegoTema({ id: "t1", nombre: "Fundamentos y Principios Clave", descripcion: "Bases teóricas y postulados esenciales." }, 0);
    }

    const formatoModo = onlineDueloEstado.formatoModo || "versus";
    const tiempo = formatoModo === "coop" ? 120 : 90;

    const payload = {
        tipo: "INICIO_BOMBA_ONLINE",
        jugadores: onlineDueloEstado.jugadores,
        formatoModo,
        tema,
        tiempo,
        codigoSala: onlineDueloEstado.codigoSala,
        listaNombre: listaNombre
    };

    publicarMensajeSala(payload);
    arrancarBombaOnlineCliente(payload);
}

function arrancarBombaOnlineCliente(data) {
    juegosEduEstado.esOnline = true;
    juegosEduEstado.juegoActual = "bomba";
    juegosEduEstado.modo = data.formatoModo || "versus";

    juegosEduEstado.bombaOnline = {
        jugadores: (data.jugadores || []).map(j => ({
            id: j.id,
            apodo: j.apodo || "Jugador",
            avatar: j.avatar || "👤",
            fase: 1,
            fallos: 0,
            desactivada: false,
            detonada: false,
            posicion: 0,
            puntos: 0
        })),
        desactivacionesCount: 0,
        codigoSala: data.codigoSala || onlineDueloEstado.codigoSala,
        formatoModo: data.formatoModo || "versus"
    };

    // Sincronizar el tema exacto
    juegosEduEstado.temas = [data.tema];
    juegosEduEstado.temaIndice = 0;

    // Actualizar cabecera de arena
    if (dom.juegosGameSubtitle) dom.juegosGameSubtitle.textContent = `Materia: ${data.listaNombre || "Estudio"}`;
    if (dom.juegosModeBadge) {
        dom.juegosModeBadge.textContent = data.formatoModo === "coop" ? "🤝 Bomba Cooperativa" : "⚔️ Bomba Versus";
        dom.juegosModeBadge.className = `badge ${data.formatoModo === 'coop' ? 'badge--accent' : 'badge--warning'}`;
    }

    if (dom.dueloOnlineWaitingRoom) dom.dueloOnlineWaitingRoom.classList.add("hidden");
    if (dom.dueloLobby) dom.dueloLobby.classList.add("hidden");
    cambiarVista("juegos");

    if (dom.arenaImpostor) dom.arenaImpostor.classList.add("hidden");
    if (dom.arenaMemotest) dom.arenaMemotest.classList.add("hidden");
    if (dom.triatlonProgressBar) dom.triatlonProgressBar.classList.add("hidden");
    if (dom.arenaBomba) dom.arenaBomba.classList.remove("hidden");

    iniciarBomba(data.formatoModo);

    // Tracker UI
    const tracker = document.getElementById("bombaOnlineTracker");
    if (tracker) tracker.classList.remove("hidden");

    const modeLabel = document.getElementById("bombaTrackerModeLabel");
    if (modeLabel) {
        modeLabel.textContent = data.formatoModo === "coop"
            ? "🤝 MISIÓN COOPERATIVA EN EQUIPO (HASTA 8 JUGADORES)"
            : "⚔️ RIVALES EN VIVO (VERSUS HASTA 8 JUGADORES)";
    }

    const roomCodeTag = document.getElementById("bombaTrackerRoomCode");
    if (roomCodeTag) roomCodeTag.textContent = `SALA: ${data.codigoSala || onlineDueloEstado.codigoSala || ""}`;

    renderBombaOnlineTracker();
}

function renderBombaOnlineTracker() {
    const grid = document.getElementById("bombaRivalsGrid");
    if (!grid || !juegosEduEstado.bombaOnline) return;

    grid.innerHTML = "";
    juegosEduEstado.bombaOnline.jugadores.forEach(j => {
        const esTu = j.id === perfilUsuario.id;
        const chip = document.createElement("div");
        chip.className = `bomba-rival-chip ${esTu ? 'is-you' : ''} ${j.desactivada ? 'is-winner' : ''} ${j.detonada ? 'is-exploded' : ''}`;

        let statusText = "⚡ Cable 1";
        let statusClass = "status-c1";
        if (j.desactivada) {
            statusText = `🏆 ${j.posicion || 1}º DESACTIVADA`;
            statusClass = "status-defused";
        } else if (j.detonada) {
            statusText = "💥 DETONÓ";
            statusClass = "status-boom";
        } else if (j.fase === 2) {
            statusText = "⚡ Cable 2";
            statusClass = "status-c2";
        } else if (j.fase === 3) {
            statusText = "🔥 Maestro";
            statusClass = "status-c3";
        }

        chip.innerHTML = `
            <div class="bomba-rival-top">
                <span class="bomba-rival-avatar">${j.avatar || '👤'}</span>
                <span class="bomba-rival-name" title="${j.apodo}">${j.apodo} ${esTu ? '(Tú)' : ''}</span>
            </div>
            <div class="bomba-rival-status ${statusClass}">${statusText}</div>
            <div class="bomba-rival-progress">
                <div class="bomba-rival-seg ${j.fase > 1 || j.desactivada ? 'done' : j.fase === 1 ? 'active' : ''}"></div>
                <div class="bomba-rival-seg ${j.fase > 2 || j.desactivada ? 'done' : j.fase === 2 ? 'active' : ''}"></div>
                <div class="bomba-rival-seg ${j.desactivada ? 'done' : j.fase === 3 ? 'active' : ''}"></div>
            </div>
        `;
        grid.appendChild(chip);
    });
}

function notificarProgresoBombaOnline(fase, fallos = 0) {
    if (!juegosEduEstado.esOnline) return;

    if (juegosEduEstado.bombaOnline) {
        const miJugador = juegosEduEstado.bombaOnline.jugadores.find(j => j.id === perfilUsuario.id);
        if (miJugador) {
            miJugador.fase = fase;
            miJugador.fallos = fallos;
            if (fase > 3) miJugador.desactivada = true;
        }
        renderBombaOnlineTracker();
    }

    publicarMensajeSala({
        tipo: "BOMBA_PROGRESO",
        jugadorId: perfilUsuario.id,
        apodo: perfilUsuario.apodo,
        avatar: perfilUsuario.avatar,
        fase,
        fallos,
        tiempoRestante: juegosEduEstado.bomba ? juegosEduEstado.bomba.tiempoRestante : 0,
        estado: fase > 3 ? "desactivada" : "jugando"
    });
}

async function girarDobleRuletaOnline() {
    if (dueloEstado.partida.girando) return;
    if (!onlineDueloEstado.esHost) return; // En online, el host comanda el sorteo

    const partida = dueloEstado.partida;
    if (partida.temasDisponibles.length === 0) {
        finalizarDueloPartida(true);
        return;
    }

    // Seleccionar ganadores de antemano
    const jugadorGanador = partida.jugadores[Math.floor(Math.random() * partida.jugadores.length)];
    const temaGanador = partida.temasDisponibles[Math.floor(Math.random() * partida.temasDisponibles.length)];

    const payload = {
        tipo: "RULETA_GIRAR",
        jugadorGanador,
        temaGanador,
        duracion: 3000
    };

    publicarMensajeSala(payload);
    ejecutarAnimacionRuletaSincronizada(jugadorGanador, temaGanador, 3000);
}

async function ejecutarAnimacionRuletaSincronizada(jugadorGanador, temaGanador, duracion = 3000) {
    const partida = dueloEstado.partida;
    if (partida.girando && partida._animandoRuleta) return;
    partida.girando = true;
    partida._animandoRuleta = true;

    if (dom.dueloSpinBtn) dom.dueloSpinBtn.disabled = true;
    if (dom.dueloTurnArea) dom.dueloTurnArea.classList.add("hidden");
    if (dom.dueloRoboBox) dom.dueloRoboBox.classList.add("hidden");
    if (dom.dueloPlayerRoulette) {
        dom.dueloPlayerRoulette.className = "duelo-roulette-display is-spinning";
    }
    if (dom.dueloTopicRoulette) {
        dom.dueloTopicRoulette.className = "duelo-roulette-display is-spinning";
    }

    const inicio = performance.now();
    let intervalo = 50;

    while (true) {
        const transcurrido = performance.now() - inicio;
        if (transcurrido >= duracion) break;

        const randJ = partida.jugadores[Math.floor(Math.random() * partida.jugadores.length)];
        const randT = partida.temasDisponibles[Math.floor(Math.random() * partida.temasDisponibles.length)];

        if (dom.dueloPlayerRoulette && randJ) {
            dom.dueloPlayerRoulette.textContent = `${randJ.avatar || "👤"} ${randJ.apodo || randJ.nombre || "Jugador"}`;
        }
        if (dom.dueloTopicRoulette && randT) {
            dom.dueloTopicRoulette.textContent = randT.titulo || randT.palabra || randT.nombre || "Tema";
        }

        const progreso = transcurrido / duracion;
        intervalo = 50 + (progreso * progreso * 300);
        await new Promise(r => setTimeout(r, intervalo));
    }

    const ganadorNombre = jugadorGanador.apodo || jugadorGanador.nombre || "Jugador";
    const temaTitulo = temaGanador.titulo || temaGanador.palabra || temaGanador.nombre || "Tema Asignado";

    if (dom.dueloPlayerRoulette) {
        dom.dueloPlayerRoulette.textContent = `${jugadorGanador.avatar || "👤"} ${ganadorNombre}`;
        dom.dueloPlayerRoulette.className = "duelo-roulette-display is-winner";
    }
    if (dom.dueloTopicRoulette) {
        dom.dueloTopicRoulette.textContent = temaTitulo;
        dom.dueloTopicRoulette.className = "duelo-roulette-display is-winner";
    }

    // Fijar el turno y tema activo exactamente
    partida.jugadorActualId = jugadorGanador.id;
    partida.temaActual = {
        ...temaGanador,
        titulo: temaTitulo,
        palabra: temaTitulo,
        nombre: temaTitulo
    };
    partida.turnoNumero++;
    partida.rondaNumero = Math.floor((partida.turnoNumero - 1) / Math.max(1, partida.jugadores.length)) + 1;
    partida._animandoRuleta = false;

    reproducirSonidoDuelo("beep");

    setTimeout(() => {
        prepararTurnoActivoDuelo(jugadorGanador, partida.temaActual);
        partida.girando = false;
    }, 450);
}

/* ==========================================================
   TRANSICIÓN Y FASE DE VOTACIÓN / CALIFICACIÓN
   ========================================================== */

function transicionarAVotacionDuelo(jugadorId) {
    const partida = dueloEstado.partida;
    pausarCronometroTurnoDuelo();

    if (dom.dueloTurnPhaseBadge) {
        dom.dueloTurnPhaseBadge.textContent = "🗳️ Fase de Calificación";
        dom.dueloTurnPhaseBadge.style.background = "rgba(99, 102, 241, 0.25)";
        dom.dueloTurnPhaseBadge.style.color = "#a5b4fc";
    }

    // Ocultar controles del orador durante la calificación
    if (dom.dueloOradorControlBar) dom.dueloOradorControlBar.classList.add("hidden");

    const jugador = partida.jugadores.find(j => j.id === jugadorId);
    const nomJugador = jugador ? (jugador.apodo || jugador.nombre) : "Jugador";
    if (dom.dueloVoteTargetPlayerName) dom.dueloVoteTargetPlayerName.textContent = nomJugador;

    // Resetear estados y chips de votación
    onlineDueloEstado.votoEmitido = false;
    onlineDueloEstado.votosRecibidos = {};
    if (dom.dueloLiveVoteChips) dom.dueloLiveVoteChips.innerHTML = "";
    if (dom.dueloVoteResultSummary) dom.dueloVoteResultSummary.classList.add("hidden");
    if (dom.dueloHostNextSpinArea) dom.dueloHostNextSpinArea.classList.add("hidden");

    [dom.dueloOnlineVote10Btn, dom.dueloOnlineVote5Btn, dom.dueloOnlineVote0Btn].forEach(b => {
        if (b) {
            b.disabled = false;
            b.classList.remove("is-selected");
        }
    });

    // En Modo Online: Revelar caja de votación
    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala) {
        if (dom.dueloOnlineVoteBox) dom.dueloOnlineVoteBox.classList.remove("hidden");
        const soyOrador = (jugadorId === perfilUsuario.id);

        if (soyOrador) {
            // El orador espera las notas de sus compañeros
            if (dom.dueloOnlineVoteActions) dom.dueloOnlineVoteActions.classList.add("hidden");
            if (dom.dueloOradorWaitingVotesBox) dom.dueloOradorWaitingVotesBox.classList.remove("hidden");
        } else {
            // Los oyentes emiten su calificación
            if (dom.dueloOnlineVoteActions) dom.dueloOnlineVoteActions.classList.remove("hidden");
            if (dom.dueloOradorWaitingVotesBox) dom.dueloOradorWaitingVotesBox.classList.add("hidden");
        }
    } else {
        // En Modo Local (un solo dispositivo)
        if (dom.dueloLocalEvalSection) dom.dueloLocalEvalSection.classList.remove("hidden");
    }
}

// Orador presiona "Terminé de Exponer"
function finalizarExposicionOralDesdeOrador() {
    const partida = dueloEstado.partida;
    if (partida.jugadorActualId !== perfilUsuario.id) return;

    pausarCronometroTurnoDuelo();
    reproducirSonidoDuelo("fanfare");

    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala) {
        publicarMensajeSala({
            tipo: "FIN_EXPOSICION_ORAL",
            jugadorId: perfilUsuario.id
        });
    }
    transicionarAVotacionDuelo(perfilUsuario.id);
}

// Orador presiona "No sé qué decir / Ceder Turno"
function cederTurnoOradorDesdeOrador() {
    const partida = dueloEstado.partida;
    if (partida.jugadorActualId !== perfilUsuario.id) return;

    const seguro = confirm("¿Querés ceder tu turno? Se registrarán 0 puntos y se habilitará el Robo Relámpago inmediato para tus rivales.");
    if (!seguro) return;

    pausarCronometroTurnoDuelo();
    reproducirSonidoDuelo("buzzer");

    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala) {
        publicarMensajeSala({
            tipo: "CEDER_TURNO_ORADOR",
            jugadorId: perfilUsuario.id
        });
    }
    ejecutarCederTurnoOrador(perfilUsuario.id);
}

// Ejecuta la cesión de turno (0 pts y disparo de Robo Relámpago)
function ejecutarCederTurnoOrador(jugadorId) {
    const partida = dueloEstado.partida;
    pausarCronometroTurnoDuelo();

    const jugador = partida.jugadores.find(j => j.id === jugadorId);
    const nomJugador = jugador ? (jugador.apodo || jugador.nombre) : "El orador";

    if (dom.dueloOradorControlBar) dom.dueloOradorControlBar.classList.add("hidden");
    if (dom.dueloOnlineVoteBox) dom.dueloOnlineVoteBox.classList.add("hidden");
    if (dom.dueloLocalEvalSection) dom.dueloLocalEvalSection.classList.add("hidden");

    if (jugador) {
        jugador.rachaActual = 0;
    }
    agregarRegistroTurnoDuelo(`🏳️ ${nomJugador} no supo qué responder y cedió su turno (0 pts)`, 0);

    // Activar inmediatamente Robo Relámpago para los demás
    const otrosJugadores = partida.jugadores.filter(j => j.id !== jugadorId);
    if (dueloEstado.config.reglas.roboRelampago && otrosJugadores.length > 0) {
        iniciarRoboRelampago(otrosJugadores);
    } else {
        avanzarSiguienteTemaDuelo();
    }
}

// El Host pulsa "Siguiente Ronda / Sorteo" tras la votación
function hostAvanzarSiguienteRondaDuelo() {
    if (!onlineDueloEstado.esHost) return;
    publicarMensajeSala({
        tipo: "AVANZAR_SIGUIENTE_RONDA"
    });
    avanzarSiguienteTemaDuelo();
}

/* Votación Individual Online */
function emitirVotoOnline(votoValor) {
    if (onlineDueloEstado.votoEmitido) return;
    onlineDueloEstado.votoEmitido = true;

    // Deshabilitar botones de voto temporalmente y marcar el seleccionado
    [dom.dueloOnlineVote10Btn, dom.dueloOnlineVote5Btn, dom.dueloOnlineVote0Btn].forEach(b => {
        if (b) b.disabled = true;
    });

    const payload = {
        tipo: "VOTO_EMITIDO",
        votanteId: perfilUsuario.id,
        votanteNombre: perfilUsuario.apodo || perfilUsuario.nombre,
        voto: votoValor
    };

    publicarMensajeSala(payload);
    procesarVotoOnlineRecibido(perfilUsuario.id, perfilUsuario.apodo || perfilUsuario.nombre, votoValor);
}

function procesarVotoOnlineRecibido(votanteId, votanteNombre, voto) {
    onlineDueloEstado.votosRecibidos[votanteId] = { nombre: votanteNombre, voto };

    // Renderizar chips de votos en pantalla de todos en tiempo real
    if (dom.dueloLiveVoteChips) {
        const chipId = `vote_chip_${votanteId}`;
        let chip = document.getElementById(chipId);
        if (!chip) {
            chip = document.createElement("div");
            chip.id = chipId;
            chip.className = "duelo-vote-chip";
            dom.dueloLiveVoteChips.appendChild(chip);
        }
        const emojiVoto = voto === 10 ? "🟢 +10 pts (Impecable)" : voto === 5 ? "🟡 +5 pts (Con ayuda)" : "🔴 0 pts (A repasar)";
        chip.innerHTML = `<strong>${votanteNombre}:</strong> ${emojiVoto}`;
    }

    // Si es el host, verificar si todos los votantes esperados ya votaron
    if (onlineDueloEstado.esHost) {
        const otrosJugadores = dueloEstado.partida.jugadores.filter(j => j.id !== dueloEstado.partida.jugadorActualId);
        const totalVotantesEsperados = Math.max(1, otrosJugadores.length);
        const totalVotos = Object.keys(onlineDueloEstado.votosRecibidos).length;

        if (totalVotos >= totalVotantesEsperados) {
            computarResultadoVotacionOnline();
        }
    }
}

function computarResultadoVotacionOnline() {
    const votosObj = Object.values(onlineDueloEstado.votosRecibidos);
    if (votosObj.length === 0) return;

    let count10 = 0, count5 = 0, count0 = 0;
    votosObj.forEach(v => {
        const val = typeof v === "object" ? v.voto : v;
        if (val === 10) count10++;
        else if (val === 5) count5++;
        else count0++;
    });

    let decision = "impecable";
    if (count0 > count10 && count0 > count5) {
        decision = "paso";
    } else if (count5 >= count10) {
        decision = "ayuda";
    }

    const payload = {
        tipo: "RESULTADO_VOTACION",
        decision,
        count10,
        count5,
        count0
    };

    publicarMensajeSala(payload);
    aplicarResultadoVotacionOnline(payload);
}

function aplicarResultadoVotacionOnline(data) {
    const partida = dueloEstado.partida;
    const jugador = partida.jugadores.find(j => j.id === partida.jugadorActualId);
    const nomJugador = jugador ? (jugador.apodo || jugador.nombre) : "El orador";

    let textoResumen = "";
    if (data.decision === "impecable") {
        textoResumen = `🟢 Consenso de la sala: ¡Exposición Impecable! (+10 pts para ${nomJugador})`;
    } else if (data.decision === "ayuda") {
        textoResumen = `🟡 Consenso de la sala: Explicó con dudas/ayuda (+5 pts para ${nomJugador})`;
    } else {
        textoResumen = `🔴 Consenso de la sala: No completó el tema (0 pts para ${nomJugador}). ¡Se activa Robo Relámpago!`;
    }

    if (dom.dueloVoteResultText) dom.dueloVoteResultText.textContent = textoResumen;
    if (dom.dueloVoteResultSummary) dom.dueloVoteResultSummary.classList.remove("hidden");

    // Si es host y no es paso, habilitar botón de sorteo siguiente
    if (onlineDueloEstado.esHost && data.decision !== "paso") {
        if (dom.dueloHostNextSpinArea) dom.dueloHostNextSpinArea.classList.remove("hidden");
    }

    // Calificar turno con la decisión consensuada (diferir avance para ver resultados)
    calificarTurnoDuelo(data.decision, true);
}

/* Robo Relámpago Online */
function activarRoboRelampagoOnlinePantalla(tema) {
    // Mostrar overlay gigante de Robo Relámpago si no fui yo quien sacó 0 pts
    const soyElQueFallo = dueloEstado.partida.jugadorActualId === perfilUsuario.id;
    if (!soyElQueFallo && dom.dueloOnlineRoboOverlay) {
        dom.dueloOnlineRoboOverlay.classList.remove("hidden");
        if (dom.dueloOnlineBuzzerTriggerBtn) {
            dom.dueloOnlineBuzzerTriggerBtn.disabled = false;
        }
        if (dom.dueloOnlineRoboStatus) {
            dom.dueloOnlineRoboStatus.textContent = "¡TOCÁ PRIMERO!";
        }
        reproducirSonidoDuelo("buzzer");
    }
}

function tocarPulsadorRoboOnline() {
    if (dom.dueloOnlineBuzzerTriggerBtn) dom.dueloOnlineBuzzerTriggerBtn.disabled = true;
    publicarMensajeSala({
        tipo: "ROBO_RECLAMADO",
        ladronId: perfilUsuario.id,
        ladronNombre: perfilUsuario.apodo
    });
}

function atribuirRoboRelampagoOnline(ladronId, ladronNombre) {
    if (dom.dueloOnlineRoboOverlay) {
        dom.dueloOnlineRoboOverlay.classList.add("hidden");
    }
    // Activar al ladrón en la partida
    pulsarRoboRelampago(ladronId);
}

/* ==========================================================
   MÓDULO 4: CHAT EN VIVO MULTIMEDIA (TEXTO, EMOJIS, FOTOS, AUDIOS)
   ========================================================== */
function enviarMensajeChat(texto = "", photoDataUrl = "", audioDataUrl = "") {
    if (!onlineDueloEstado.codigoSala) return;
    if (!texto.trim() && !photoDataUrl && !audioDataUrl) return;

    const msg = {
        id: "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
        senderId: perfilUsuario.id,
        senderName: perfilUsuario.apodo,
        senderAvatar: perfilUsuario.avatar,
        tipoAvatar: perfilUsuario.tipoAvatar,
        fotoDataUrl: perfilUsuario.fotoDataUrl,
        text: texto.trim(),
        photoDataUrl,
        audioDataUrl,
        timestamp: Date.now()
    };

    publicarMensajeSala({
        tipo: "CHAT_MSG",
        msg
    });

    if (dom.dueloChatTextInput) dom.dueloChatTextInput.value = "";
}

function recibirMensajeChatEnVivo(msg) {
    if (!msg || !dom.dueloChatMessages) return;

    onlineDueloEstado.chat.push(msg);

    const esMio = msg.senderId === perfilUsuario.id;
    const msgDiv = document.createElement("div");
    msgDiv.className = `duelo-chat-msg ${esMio ? "duelo-chat-msg--mine" : "duelo-chat-msg--other"}`;

    const horaStr = new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    let contenidoHtml = "";
    if (msg.text) {
        contenidoHtml += `<div class="duelo-chat-bubble">${msg.text}</div>`;
    }
    if (msg.photoDataUrl) {
        contenidoHtml += `<img src="${msg.photoDataUrl}" class="duelo-chat-img" alt="Foto de apunte" onclick="abrirLightboxFoto('${msg.photoDataUrl}')">`;
    }
    if (msg.audioDataUrl) {
        contenidoHtml += `
            <div class="duelo-chat-bubble">
                <div class="duelo-audio-player">
                    <button type="button" class="duelo-audio-play-btn" onclick="reproducirAudioNota(this, '${msg.audioDataUrl}')">▶</button>
                    <span class="duelo-audio-time">Nota de voz 🎙️</span>
                </div>
            </div>
        `;
    }

    msgDiv.innerHTML = `
        <div class="duelo-chat-msg-header">
            <span>${msg.senderName}</span>
            <span>• ${horaStr}</span>
        </div>
        ${contenidoHtml}
    `;

    dom.dueloChatMessages.appendChild(msgDiv);
    dom.dueloChatMessages.scrollTop = dom.dueloChatMessages.scrollHeight;

    // Notificación en badge si el chat está minimizado y no es mío
    if (!onlineDueloEstado.chatAbierto && !esMio) {
        onlineDueloEstado.unreadCount++;
        if (dom.dueloChatUnreadBadge) {
            dom.dueloChatUnreadBadge.textContent = String(onlineDueloEstado.unreadCount);
            dom.dueloChatUnreadBadge.classList.remove("hidden");
        }
    }
}

function reproducirAudioNota(btn, audioSrc) {
    const audio = new Audio(audioSrc);
    btn.textContent = "⏸";
    audio.play();
    audio.onended = () => {
        btn.textContent = "▶";
    };
    audio.onerror = () => {
        btn.textContent = "▶";
    };
}

function abrirLightboxFoto(src) {
    if (!dom.photoZoomModal || !dom.photoZoomImg) return;
    dom.photoZoomImg.src = src;
    dom.photoZoomModal.showModal();
}


async function iniciarGrabacionVoz() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        onlineDueloEstado.audioChunks = [];
        onlineDueloEstado.mediaRecorder = new MediaRecorder(stream);
        onlineDueloEstado.mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) onlineDueloEstado.audioChunks.push(e.data);
        };
        onlineDueloEstado.mediaRecorder.start();
        onlineDueloEstado.grabandoAudio = true;
        onlineDueloEstado.recSegundos = 0;
        if (dom.dueloVoiceRecTimer) dom.dueloVoiceRecTimer.textContent = "00:00";
        if (dom.dueloVoiceRecordingBar) dom.dueloVoiceRecordingBar.classList.remove("hidden");
        onlineDueloEstado.recIntervalId = setInterval(() => {
            onlineDueloEstado.recSegundos++;
            const m = String(Math.floor(onlineDueloEstado.recSegundos / 60)).padStart(2, "0");
            const s = String(onlineDueloEstado.recSegundos % 60).padStart(2, "0");
            if (dom.dueloVoiceRecTimer) dom.dueloVoiceRecTimer.textContent = `${m}:${s}`;
        }, 1000);
    } catch (err) {
        alert("No se pudo acceder al micrófono para grabar la nota de voz. Por favor verificá los permisos en el navegador.");
    }
}

function detenerYEnviarGrabacionVoz() {
    if (!onlineDueloEstado.mediaRecorder || onlineDueloEstado.mediaRecorder.state === "inactive") return;
    clearInterval(onlineDueloEstado.recIntervalId);
    onlineDueloEstado.mediaRecorder.onstop = () => {
        const blob = new Blob(onlineDueloEstado.audioChunks, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
            enviarMensajeChat("", "", reader.result);
        };
        reader.readAsDataURL(blob);
        onlineDueloEstado.mediaRecorder.stream.getTracks().forEach(t => t.stop());
    };
    onlineDueloEstado.mediaRecorder.stop();
    if (dom.dueloVoiceRecordingBar) dom.dueloVoiceRecordingBar.classList.add("hidden");
    onlineDueloEstado.grabandoAudio = false;
}

function toggleVentanaChat() {
    onlineDueloEstado.chatAbierto = !onlineDueloEstado.chatAbierto;
    if (dom.dueloChatWindow) {
        dom.dueloChatWindow.classList.toggle("is-collapsed", !onlineDueloEstado.chatAbierto);
    }
    if (onlineDueloEstado.chatAbierto) {
        onlineDueloEstado.unreadCount = 0;
        if (dom.dueloChatUnreadBadge) {
            dom.dueloChatUnreadBadge.classList.add("hidden");
        }
        if (dom.dueloChatMessages) {
            dom.dueloChatMessages.scrollTop = dom.dueloChatMessages.scrollHeight;
        }
    }
}

console.log("Modules syntax OK!");


/* ==========================================================
   MODO DUELO DE BOLILLERO (MULTIJUGADOR & SALÓN DE LA FAMA)
   ========================================================== */
function cargarPreferenciasDuelo() {
    try {
        const guardado = localStorage.getItem(DUELO_PREFS_KEY);
        if (guardado) {
            const prefs = JSON.parse(guardado);
            if (Array.isArray(prefs.jugadores) && prefs.jugadores.length > 0) {
                dueloEstado.config.jugadores = prefs.jugadores;
            }
            if (Number.isFinite(prefs.tiempoTurnoSegundos) && prefs.tiempoTurnoSegundos >= 10) {
                dueloEstado.config.tiempoTurnoSegundos = prefs.tiempoTurnoSegundos;
            }
            if (prefs.comodines) {
                dueloEstado.config.comodines = { ...dueloEstado.config.comodines, ...prefs.comodines };
            }
            if (prefs.reglas) {
                dueloEstado.config.reglas = { ...dueloEstado.config.reglas, ...prefs.reglas };
            }
        }
    } catch {}
}

function guardarPreferenciasDuelo() {
    try {
        localStorage.setItem(DUELO_PREFS_KEY, JSON.stringify(dueloEstado.config));
    } catch {}
}

function inicializarDueloLobby() {
    cargarPreferenciasDuelo();
    actualizarDropdownListasDuelo();
    renderDueloPlayersChips();

    // Sincronizar inputs de tiempo
    if (dom.dueloMinutosInput && dom.dueloSegundosInput) {
        const total = dueloEstado.config.tiempoTurnoSegundos;
        dom.dueloMinutosInput.value = Math.floor(total / 60);
        dom.dueloSegundosInput.value = total % 60;
    }

    // Sincronizar checkboxes de comodines
    if (dom.dueloComodinSocorro) dom.dueloComodinSocorro.checked = !!dueloEstado.config.comodines.socorro;
    if (dom.dueloComodinPista) dom.dueloComodinPista.checked = !!dueloEstado.config.comodines.pista;
    if (dom.dueloComodinPaso) dom.dueloComodinPaso.checked = !!dueloEstado.config.comodines.pasoRebote;

    // Sincronizar reglas
    if (dom.dueloReglaRacha) dom.dueloReglaRacha.checked = !!dueloEstado.config.reglas.rachaFuego;
    if (dom.dueloReglaRobo) dom.dueloReglaRobo.checked = !!dueloEstado.config.reglas.roboRelampago;
}

function cambiarModoDueloLobby(nuevoModo) {
    onlineDueloEstado.modo = nuevoModo;
    if (dom.dueloModeOnlineBtn) dom.dueloModeOnlineBtn.classList.toggle("is-active", nuevoModo === "online");
    if (dom.dueloModeLocalBtn) dom.dueloModeLocalBtn.classList.toggle("is-active", nuevoModo === "local");
    if (dom.dueloOnlinePanel) dom.dueloOnlinePanel.classList.toggle("hidden", nuevoModo !== "online");
    if (dom.dueloLocalPanel) dom.dueloLocalPanel.classList.toggle("hidden", nuevoModo !== "local");
}

function actualizarDropdownListasDuelo() {
    const selects = [dom.dueloListaSelect, dom.dueloOnlineListaSelect];
    const apunte = apuntesEstado.global || apuntesEstado.bomba || apuntesEstado.bolillero;

    selects.forEach(selectElem => {
        if (!selectElem) return;
        selectElem.innerHTML = "";

        // Si hay un PDF activo cargado, agregarlo como primera opción destacada
        if (apunte && apunte.nombre) {
            const optPdf = document.createElement("option");
            optPdf.value = "pdf_global";
            optPdf.textContent = `📄 PDF: ${apunte.nombre} (${apunte.paginas || 1} págs)`;
            selectElem.appendChild(optPdf);
        }

        if (estado.listas.length === 0 && (!apunte || !apunte.nombre)) {
            const opt = document.createElement("option");
            opt.value = "default_estudio";
            opt.textContent = "📚 Repaso General Universitario (10 temas)";
            selectElem.appendChild(opt);
            return;
        }

        estado.listas.forEach(l => {
            const opt = document.createElement("option");
            opt.value = l.id;
            opt.textContent = `${l.nombre} (${l.temas.length} temas)`;
            selectElem.appendChild(opt);
        });

        if (dueloEstado.config.listaId === "pdf_global" && apunte) {
            selectElem.value = "pdf_global";
        } else if (dueloEstado.config.listaId && estado.listas.some(l => l.id === dueloEstado.config.listaId)) {
            selectElem.value = dueloEstado.config.listaId;
        } else if (apunte && apunte.nombre) {
            selectElem.value = "pdf_global";
        } else if (estado.listas.length > 0) {
            selectElem.value = estado.listas[0].id;
        }
    });

    const val = dom.dueloOnlineListaSelect?.value || dueloEstado.config.listaId;
    if (dom.dueloOnlineListaHint) {
        if (val === "pdf_global" && apunte && apunte.nombre) {
            dom.dueloOnlineListaHint.textContent = `📄 Preguntas formuladas con IA a partir de "${apunte.nombre}" (${apunte.paginas || 1} págs).`;
        } else {
            const listaActual = estado.listas.find(l => l.id === val);
            if (listaActual) {
                dom.dueloOnlineListaHint.textContent = `${listaActual.temas.length} temas disponibles para la sala.`;
            } else {
                dom.dueloOnlineListaHint.textContent = `Temario predeterminado listo para jugar.`;
            }
        }
    }

    actualizarCardPdfEnCrearSala();
}

function actualizarCardPdfEnCrearSala() {
    const apunte = apuntesEstado.global || apuntesEstado.bomba || apuntesEstado.bolillero;

    if (!onlineDueloEstado.fuenteMaterial) {
        onlineDueloEstado.fuenteMaterial = (apunte && apunte.nombre) ? "pdf" : "general";
    }

    const chipPdf = document.getElementById("dueloChipPdf");
    const chipGeneral = document.getElementById("dueloChipGeneral");
    const panelPdf = document.getElementById("dueloMaterialPanelPdf");
    const panelGeneral = document.getElementById("dueloMaterialPanelGeneral");
    const loadedCard = document.getElementById("dueloPdfLoadedCard");
    const emptyZone = document.getElementById("dueloPdfEmptyZone");
    const inputHidden = document.getElementById("dueloOnlineListaSelect");

    const esPdf = onlineDueloEstado.fuenteMaterial === "pdf";

    if (chipPdf) chipPdf.classList.toggle("is-active", esPdf);
    if (chipGeneral) chipGeneral.classList.toggle("is-active", !esPdf);
    if (panelPdf) panelPdf.classList.toggle("hidden", !esPdf);
    if (panelGeneral) panelGeneral.classList.toggle("hidden", esPdf);

    if (esPdf) {
        if (apunte && apunte.nombre) {
            if (loadedCard) loadedCard.classList.remove("hidden");
            if (emptyZone) emptyZone.classList.add("hidden");

            const titleEl = document.getElementById("dueloPdfCardTitle");
            const badgeEl = document.getElementById("dueloPdfCardBadge");
            const paginasPill = document.getElementById("dueloPdfPaginasPill");
            const palabrasPill = document.getElementById("dueloPdfPalabrasPill");
            const uploadBtn = document.getElementById("dueloUploadPdfBtn");
            const removeBtn = document.getElementById("dueloRemovePdfBtn");

            if (titleEl) titleEl.textContent = `📄 ${apunte.nombre}`;
            if (badgeEl) {
                badgeEl.style.display = "inline-flex";
                badgeEl.textContent = "Conectado a Todos los Juegos";
            }
            if (paginasPill) paginasPill.textContent = `📑 ${apunte.paginas || 1} págs`;
            if (palabrasPill) palabrasPill.textContent = `🔤 ${apunte.palabras || 0} palabras`;
            if (uploadBtn) uploadBtn.textContent = "📂 Cambiar PDF";
            if (removeBtn) removeBtn.classList.remove("hidden");

            if (inputHidden) inputHidden.value = "pdf_global";
        } else {
            if (loadedCard) loadedCard.classList.add("hidden");
            if (emptyZone) emptyZone.classList.remove("hidden");
            if (inputHidden) inputHidden.value = "default_estudio";
        }
    } else {
        if (inputHidden) inputHidden.value = "default_estudio";
    }
}

// Función global unificada para procesar y vincular PDF a nivel general en la app
async function procesarYVincularPdfGlobal(file) {
    if (!file) return;
    mostrarToast("📑 Procesando nuevo material de estudio con PDF.js...");
    try {
        const res = await procesarArchivoPDF(file);
        apuntesEstado.global = res;
        apuntesEstado.bomba = res;
        apuntesEstado.bolillero = res;
        apuntesEstado.impostor = res;
        apuntesEstado.memotest = res;
        onlineDueloEstado.fuenteMaterial = "pdf";
        await guardarApuntesEnStorage();
        actualizarUIIndicadoresPDF();
        actualizarCardPdfEnCrearSala();
        mostrarToast(`✅ "${res.nombre}" vinculado para la sala y todos tus juegos!`);
    } catch (err) {
        alert(err.message);
    }
}

function renderDueloPlayersChips() {
    if (!dom.dueloPlayersChips) return;
    dom.dueloPlayersChips.innerHTML = "";

    const avatars = ["🧑‍🎓", "👩‍🎓", "🧙‍♂️", "👩‍🔬", "🦁", "⚡", "🦊", "🚀", "🎯", "👑"];

    dueloEstado.config.jugadores.forEach((nombre, idx) => {
        const chip = document.createElement("div");
        chip.className = "duelo-player-chip";
        const avatar = avatars[idx % avatars.length];

        chip.innerHTML = `
            <span class="duelo-player-chip__avatar" aria-hidden="true">${avatar}</span>
            <span>${nombre}</span>
            <button class="duelo-player-chip__delete" type="button" data-idx="${idx}" title="Eliminar a ${nombre}">✕</button>
        `;
        dom.dueloPlayersChips.appendChild(chip);
    });

    if (dom.dueloPlayerCountBadge) {
        const count = dueloEstado.config.jugadores.length;
        dom.dueloPlayerCountBadge.textContent = `${count} ${count === 1 ? "jugador" : "jugadores"}`;
        dom.dueloPlayerCountBadge.className = count >= 2 ? "badge badge--primary" : "badge badge--warning";
    }
}

function agregarJugadorDuelo(nombre) {
    const limpio = nombre.trim();
    if (!limpio) return;
    if (dueloEstado.config.jugadores.some(n => n.toLowerCase() === limpio.toLowerCase())) {
        alert("Ya existe un jugador con ese nombre.");
        return;
    }
    if (dueloEstado.config.jugadores.length >= 10) {
        alert("El límite para una partida es de 10 jugadores.");
        return;
    }

    dueloEstado.config.jugadores.push(limpio);
    guardarPreferenciasDuelo();
    renderDueloPlayersChips();
    if (dom.dueloPlayerInput) {
        dom.dueloPlayerInput.value = "";
        dom.dueloPlayerInput.focus();
    }
}

function eliminarJugadorDuelo(indice) {
    if (dueloEstado.config.jugadores.length <= 1) {
        alert("Debe haber al menos 1 jugador.");
        return;
    }
    dueloEstado.config.jugadores.splice(indice, 1);
    guardarPreferenciasDuelo();
    renderDueloPlayersChips();
}

function actualizarTiempoTurnoLobby() {
    if (!dom.dueloMinutosInput || !dom.dueloSegundosInput) return;
    const min = parseInt(dom.dueloMinutosInput.value, 10) || 0;
    const seg = parseInt(dom.dueloSegundosInput.value, 10) || 0;
    const total = Math.max(10, min * 60 + seg);
    dueloEstado.config.tiempoTurnoSegundos = total;
    guardarPreferenciasDuelo();
}

function toggleTodosLosComodines() {
    const hayAlgunoActivo =
        dueloEstado.config.comodines.socorro ||
        dueloEstado.config.comodines.pista ||
        dueloEstado.config.comodines.pasoRebote;

    const nuevoValor = !hayAlgunoActivo;
    dueloEstado.config.comodines.socorro = nuevoValor;
    dueloEstado.config.comodines.pista = nuevoValor;
    dueloEstado.config.comodines.pasoRebote = nuevoValor;

    if (dom.dueloComodinSocorro) dom.dueloComodinSocorro.checked = nuevoValor;
    if (dom.dueloComodinPista) dom.dueloComodinPista.checked = nuevoValor;
    if (dom.dueloComodinPaso) dom.dueloComodinPaso.checked = nuevoValor;

    guardarPreferenciasDuelo();
}

/* Partida de Duelo */
function iniciarDueloPartida() {
    if (dueloEstado.config.jugadores.length < 2) {
        alert("¡Para jugar un duelo se necesitan al menos 2 jugadores!");
        if (dom.dueloPlayerInput) dom.dueloPlayerInput.focus();
        return;
    }

    const listaId = dom.dueloListaSelect ? dom.dueloListaSelect.value : dueloEstado.config.listaId;
    const lista = estado.listas.find(l => l.id === listaId);

    if (!lista || !Array.isArray(lista.temas) || lista.temas.length === 0) {
        alert("La materia seleccionada no tiene temas disponibles para sortear.");
        return;
    }

    dueloEstado.config.listaId = listaId;
    actualizarTiempoTurnoLobby();
    guardarPreferenciasDuelo();

    // Inicializar estado de partida
    const avatars = ["🧑‍🎓", "👩‍🎓", "🧙‍♂️", "👩‍🔬", "🦁", "⚡", "🦊", "🚀", "🎯", "👑"];

    dueloEstado.partida = {
        activa: true,
        rondaNumero: 1,
        turnoNumero: 0,
        jugadorActualId: null,
        temaActual: null,
        temasDisponibles: [...lista.temas],
        girando: false,
        tiempoRestante: dueloEstado.config.tiempoTurnoSegundos,
        temporizadorActivo: false,
        intervalId: null,
        comodinActivo: null,
        jugadorSocorroId: null,
        robo: {
            activo: false,
            ladronId: null,
            tiempoRestante: 0,
            intervalId: null
        },
        jugadores: dueloEstado.config.jugadores.map((nombre, i) => ({
            id: `player_${i}`,
            nombre,
            avatar: avatars[i % avatars.length],
            puntos: 0,
            rachaActual: 0,
            maxRacha: 0,
            robosExitosos: 0,
            comodinesUsados: {
                socorro: false,
                pista: false,
                pasoRebote: false
            }
        })),
        historialTurnos: []
    };

    // Cambiar de Lobby a Arena
    if (dom.dueloLobby) dom.dueloLobby.classList.add("hidden");
    if (dom.dueloArena) dom.dueloArena.classList.remove("hidden");
    if (dom.dueloTurnArea) dom.dueloTurnArea.classList.add("hidden");
    if (dom.dueloRoboBox) dom.dueloRoboBox.classList.add("hidden");

    if (dom.dueloBarListName) dom.dueloBarListName.textContent = lista.nombre;
    actualizarMarcadorDueloUI();

    if (dom.dueloPlayerRoulette) {
        dom.dueloPlayerRoulette.textContent = "🎲 ¿Quién pasa al frente?";
        dom.dueloPlayerRoulette.className = "duelo-roulette-display";
    }
    if (dom.dueloTopicRoulette) {
        dom.dueloTopicRoulette.textContent = "🎰 ¿Qué tema toca?";
        dom.dueloTopicRoulette.className = "duelo-roulette-display";
    }

    if (dom.dueloTurnLog) {
        dom.dueloTurnLog.innerHTML = `<li class="duelo-turn-log-item">¡Comienza el duelo de ${lista.nombre}! Buena suerte a todos.</li>`;
    }

    reproducirSonidoDuelo("fanfare");
}

async function girarDobleRuletaDuelo() {
    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala) {
        girarDobleRuletaOnline();
        return;
    }
    const partida = dueloEstado.partida;
    if (!partida.activa || partida.girando) return;
    if (partida.temasDisponibles.length === 0) {
        alert("¡Ya no quedan más temas disponibles en esta materia!");
        finalizarDueloPartida();
        return;
    }

    partida.girando = true;
    pausarCronometroTurnoDuelo();

    if (dom.dueloTurnArea) dom.dueloTurnArea.classList.add("hidden");
    if (dom.dueloRoboBox) dom.dueloRoboBox.classList.add("hidden");

    if (dom.dueloPlayerRoulette) {
        dom.dueloPlayerRoulette.className = "duelo-roulette-display is-spinning";
    }
    if (dom.dueloTopicRoulette) {
        dom.dueloTopicRoulette.className = "duelo-roulette-display is-spinning";
    }

    // Elegir próximo jugador por turno equilibrado
    const idxSiguiente = partida.turnoNumero % partida.jugadores.length;
    const jugadorGanador = partida.jugadores[idxSiguiente];

    // Elegir tema al azar de los disponibles
    const idxTema = Math.floor(Math.random() * partida.temasDisponibles.length);
    const temaGanador = partida.temasDisponibles[idxTema];

    // Animación cuadrática simultánea de ambas ruletas
    const duracion = 2600;
    const inicio = performance.now();
    let intervalo = 50;

    while (true) {
        const transcurrido = performance.now() - inicio;
        if (transcurrido >= duracion) break;

        // Ruleta de jugador
        const jRandom = partida.jugadores[Math.floor(Math.random() * partida.jugadores.length)];
        if (dom.dueloPlayerRoulette && jRandom) {
            dom.dueloPlayerRoulette.textContent = `${jRandom.avatar || "👤"} ${jRandom.apodo || jRandom.nombre || "Jugador"}`;
        }

        // Ruleta de tema
        const tRandom = partida.temasDisponibles[Math.floor(Math.random() * partida.temasDisponibles.length)];
        if (dom.dueloTopicRoulette && tRandom) {
            dom.dueloTopicRoulette.textContent = tRandom.titulo || tRandom.palabra || tRandom.nombre || "Tema";
        }

        const progreso = transcurrido / duracion;
        intervalo = 50 + (progreso * progreso * 280);
        await new Promise(r => setTimeout(r, intervalo));
    }

    const gNombre = jugadorGanador.apodo || jugadorGanador.nombre || "Jugador";
    const gTitulo = temaGanador.titulo || temaGanador.palabra || temaGanador.nombre || "Tema Asignado";

    // Fijar ganadores del sorteo
    partida.jugadorActualId = jugadorGanador.id;
    partida.temaActual = {
        ...temaGanador,
        titulo: gTitulo,
        palabra: gTitulo,
        nombre: gTitulo
    };
    partida.turnoNumero++;
    partida.rondaNumero = Math.floor((partida.turnoNumero - 1) / Math.max(1, partida.jugadores.length)) + 1;

    if (dom.dueloPlayerRoulette) {
        dom.dueloPlayerRoulette.textContent = `${jugadorGanador.avatar || "👤"} ${gNombre}`;
        dom.dueloPlayerRoulette.className = "duelo-roulette-display is-winner";
    }

    if (dom.dueloTopicRoulette) {
        dom.dueloTopicRoulette.textContent = gTitulo;
        dom.dueloTopicRoulette.className = "duelo-roulette-display is-winner";
    }

    reproducirSonidoDuelo("beep");

    // Activar Turn Area
    setTimeout(() => {
        prepararTurnoActivoDuelo(jugadorGanador, partida.temaActual);
        partida.girando = false;
    }, 450);
}

function prepararTurnoActivoDuelo(jugador, tema) {
    const partida = dueloEstado.partida;
    partida.comodinActivo = null;
    partida.jugadorSocorroId = null;

    if (dom.dueloTurnArea) dom.dueloTurnArea.classList.remove("hidden");
    if (dom.dueloTurnAvatar) dom.dueloTurnAvatar.textContent = jugador.avatar || "👤";
    if (dom.dueloTurnPlayerName) dom.dueloTurnPlayerName.textContent = jugador.apodo || jugador.nombre || "Jugador";
    if (dom.dueloActiveTopicTitle) dom.dueloActiveTopicTitle.textContent = (tema && (tema.titulo || tema.palabra || tema.nombre)) ? (tema.titulo || tema.palabra || tema.nombre) : "Tema Asignado";

    // Descripción / Guía del Eje Temático
    if (dom.dueloActiveTopicDesc) {
        dom.dueloActiveTopicDesc.textContent = (tema && (tema.guia || tema.explicacion))
            ? (tema.guia || tema.explicacion)
            : "Desarrollá los conceptos principales, aplicaciones y relaciones de este tema oralmente.";
    }

    // Badge de Fase: Exposición Oral en Vivo
    if (dom.dueloTurnPhaseBadge) {
        dom.dueloTurnPhaseBadge.textContent = "🎙️ Exposición en Vivo";
        dom.dueloTurnPhaseBadge.style.background = "rgba(16, 185, 129, 0.2)";
        dom.dueloTurnPhaseBadge.style.color = "#6ee7b7";
    }

    // Indicador Dinámico de Rol: Orador vs Oyente
    const soyOrador = (jugador.id === perfilUsuario.id);
    if (dom.dueloTurnRoleNotice) {
        dom.dueloTurnRoleNotice.classList.remove("hidden");
        if (soyOrador) {
            dom.dueloTurnRoleNotice.className = "duelo-turn-role-notice is-speaker";
            if (dom.dueloRoleNoticeIcon) dom.dueloRoleNoticeIcon.textContent = "🎙️";
            if (dom.dueloRoleNoticeText) dom.dueloRoleNoticeText.innerHTML = "<strong>¡Es tu turno de exponer!</strong> Tenés el micrófono: explicá el tema a tus compañeros hasta terminar el tiempo o pulsar terminar.";
        } else {
            dom.dueloTurnRoleNotice.className = "duelo-turn-role-notice is-listener";
            if (dom.dueloRoleNoticeIcon) dom.dueloRoleNoticeIcon.textContent = "👂";
            const nomOrador = jugador.apodo || jugador.nombre || "Jugador";
            if (dom.dueloRoleNoticeText) dom.dueloRoleNoticeText.innerHTML = `<strong>Escuchando a ${nomOrador}...</strong> Prestá atención para calificar su exposición cuando termine o intentar robar si pasa.`;
        }
    }

    // Barra de control del orador (Terminé / No sé qué decir)
    if (dom.dueloOradorControlBar) {
        if (soyOrador) {
            dom.dueloOradorControlBar.classList.remove("hidden");
        } else {
            dom.dueloOradorControlBar.classList.add("hidden");
        }
    }

    // Ocultar cajas de votación y evaluación durante la exposición (aparecen solo al final)
    if (dom.dueloOnlineVoteBox) dom.dueloOnlineVoteBox.classList.add("hidden");
    if (dom.dueloLocalEvalSection) dom.dueloLocalEvalSection.classList.add("hidden");
    if (dom.dueloVoteResultSummary) dom.dueloVoteResultSummary.classList.add("hidden");
    if (dom.dueloHostNextSpinArea) dom.dueloHostNextSpinArea.classList.add("hidden");
    if (dom.dueloLiveVoteChips) dom.dueloLiveVoteChips.innerHTML = "";

    // Racha de Fuego
    const tieneRacha = dueloEstado.config.reglas.rachaFuego && jugador.rachaActual >= 2;
    if (dom.dueloTurnStreakBadge) {
        if (tieneRacha) {
            dom.dueloTurnStreakBadge.textContent = `🔥 Racha de Fuego x2 (${jugador.rachaActual} impecables) - ¡PUNTAJE DOBLE!`;
            dom.dueloTurnStreakBadge.className = "duelo-turn-streak-badge has-fire";
        } else if (jugador.rachaActual === 1) {
            dom.dueloTurnStreakBadge.textContent = "⭐ 1 impecable seguida";
            dom.dueloTurnStreakBadge.className = "duelo-turn-streak-badge";
        } else {
            dom.dueloTurnStreakBadge.textContent = "Sin racha activa";
            dom.dueloTurnStreakBadge.className = "duelo-turn-streak-badge";
        }
    }

    if (dom.dueloImpecablePtsLabel) {
        dom.dueloImpecablePtsLabel.textContent = tieneRacha ? "+20 pts 🔥" : "+10 pts";
    }

    // Control de Relevo en Modo Cooperativo
    if (dom.dueloRelevoPromptBox) dom.dueloRelevoPromptBox.classList.add("hidden");
    if (dom.dueloBtnRelevoCoop) {
        if (partida.esCoop) {
            dom.dueloBtnRelevoCoop.classList.remove("hidden");
            // Solo lo puede pulsar el orador activo
            dom.dueloBtnRelevoCoop.disabled = !soyOrador;
        } else {
            dom.dueloBtnRelevoCoop.classList.add("hidden");
        }
    }

    // Configurar rótulos de votación si estamos en cooperativo
    if (partida.esCoop) {
        if (dom.dueloVoteTargetPlayerName) dom.dueloVoteTargetPlayerName.textContent = jugador.nombre || jugador.apodo;
        if (dom.dueloOnline10PtsLabel) dom.dueloOnline10PtsLabel.textContent = "+15 pts Equipo";
        const grade10Name = dom.dueloOnlineVote10Btn ? dom.dueloOnlineVote10Btn.querySelector(".duelo-grade-name") : null;
        if (grade10Name) grade10Name.textContent = "¡Bien Explicado!";
        const grade5Name = dom.dueloOnlineVote5Btn ? dom.dueloOnlineVote5Btn.querySelector(".duelo-grade-name") : null;
        if (grade5Name) grade5Name.textContent = "Con Dudas";
        const grade0Name = dom.dueloOnlineVote0Btn ? dom.dueloOnlineVote0Btn.querySelector(".duelo-grade-name") : null;
        if (grade0Name) grade0Name.textContent = "-1 Vida (Repasar)";
    } else {
        if (dom.dueloVoteTargetPlayerName) dom.dueloVoteTargetPlayerName.textContent = jugador.nombre || jugador.apodo;
        if (dom.dueloOnline10PtsLabel) dom.dueloOnline10PtsLabel.textContent = "+10 pts";
        const grade10Name = dom.dueloOnlineVote10Btn ? dom.dueloOnlineVote10Btn.querySelector(".duelo-grade-name") : null;
        if (grade10Name) grade10Name.textContent = "¡Impecable!";
        const grade5Name = dom.dueloOnlineVote5Btn ? dom.dueloOnlineVote5Btn.querySelector(".duelo-grade-name") : null;
        if (grade5Name) grade5Name.textContent = "Con ayuda";
        const grade0Name = dom.dueloOnlineVote0Btn ? dom.dueloOnlineVote0Btn.querySelector(".duelo-grade-name") : null;
        if (grade0Name) grade0Name.textContent = "A repasar / Paso";
    }

    // Comodines del jugador
    actualizarComodinesJugadorUI(jugador);

    // Iniciar cronómetro global del turno
    partida.tiempoRestante = dueloEstado.config.tiempoTurnoSegundos;
    actualizarCronometroTurnoDueloUI();
    iniciarCronometroTurnoDuelo();
}

function actualizarComodinesJugadorUI(jugador) {
    const comodinesConfig = dueloEstado.config.comodines || {};
    const usados = (jugador && jugador.comodinesUsados) ? jugador.comodinesUsados : {};

    if (dom.dueloBtnSocorro) {
        dom.dueloBtnSocorro.style.display = comodinesConfig.socorro ? "inline-flex" : "none";
        dom.dueloBtnSocorro.disabled = !!usados.socorro;
        dom.dueloBtnSocorro.classList.toggle("is-used", !!usados.socorro);
    }

    if (dom.dueloBtnPista) {
        dom.dueloBtnPista.style.display = comodinesConfig.pista ? "inline-flex" : "none";
        dom.dueloBtnPista.disabled = !!usados.pista;
        dom.dueloBtnPista.classList.toggle("is-used", !!usados.pista);
    }

    if (dom.dueloBtnPaso) {
        dom.dueloBtnPaso.style.display = comodinesConfig.pasoRebote ? "inline-flex" : "none";
        dom.dueloBtnPaso.disabled = !!usados.pasoRebote;
        dom.dueloBtnPaso.classList.toggle("is-used", !!usados.pasoRebote);
    }
}

/* Cronómetro de Turno */
function iniciarCronometroTurnoDuelo() {
    const partida = dueloEstado.partida;
    if (partida.intervalId) clearInterval(partida.intervalId);

    partida.temporizadorActivo = true;
    if (dom.dueloTimerToggleBtn) dom.dueloTimerToggleBtn.textContent = "⏸";

    partida.intervalId = setInterval(() => {
        if (partida.tiempoRestante > 1) {
            partida.tiempoRestante--;
            actualizarCronometroTurnoDueloUI();
            if (partida.tiempoRestante === 10) {
                reproducirSonidoDuelo("beep");
            }
        } else {
            partida.tiempoRestante = 0;
            actualizarCronometroTurnoDueloUI();
            pausarCronometroTurnoDuelo();
            reproducirSonidoDuelo("buzzer");
            
            // Tiempo agotado: pasar a fase de calificación / votación
            if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala) {
                if (onlineDueloEstado.esHost) {
                    publicarMensajeSala({
                        tipo: "FIN_EXPOSICION_ORAL",
                        jugadorId: partida.jugadorActualId
                    });
                    transicionarAVotacionDuelo(partida.jugadorActualId);
                }
            } else {
                transicionarAVotacionDuelo(partida.jugadorActualId);
            }
        }
    }, 1000);
}

function pausarCronometroTurnoDuelo() {
    const partida = dueloEstado.partida;
    if (partida.intervalId) {
        clearInterval(partida.intervalId);
        partida.intervalId = null;
    }
    partida.temporizadorActivo = false;
    if (dom.dueloTimerToggleBtn) dom.dueloTimerToggleBtn.textContent = "▶";
}

function toggleCronometroTurnoDuelo() {
    if (dueloEstado.partida.temporizadorActivo) {
        pausarCronometroTurnoDuelo();
    } else {
        iniciarCronometroTurnoDuelo();
    }
}

function actualizarCronometroTurnoDueloUI() {
    const segundos = dueloEstado.partida.tiempoRestante;
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    const str = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    if (dom.dueloTimerDigits) {
        dom.dueloTimerDigits.textContent = str;
        dom.dueloTimerDigits.className = "duelo-timer-digits";
        if (segundos <= 10) {
            dom.dueloTimerDigits.classList.add("is-danger");
        } else if (segundos <= 30) {
            dom.dueloTimerDigits.classList.add("is-warning");
        }
    }

    if (dom.dueloTimerBar) {
        const total = dueloEstado.config.tiempoTurnoSegundos;
        const pct = total > 0 ? (segundos / total) * 100 : 0;
        dom.dueloTimerBar.style.width = `${pct}%`;
        dom.dueloTimerBar.className = "duelo-timer-fill";
        if (segundos <= 10) {
            dom.dueloTimerBar.classList.add("is-danger");
        } else if (segundos <= 30) {
            dom.dueloTimerBar.classList.add("is-warning");
        }
    }
}

/* Comodines del Jugador */
function usarComodinSocorro() {
    const partida = dueloEstado.partida;
    const jugador = partida.jugadores.find(j => j.id === partida.jugadorActualId);
    if (!jugador || jugador.comodinesUsados.socorro) return;

    if (!dom.dueloSocorroOptions || !dom.dueloSocorroModal) return;
    dom.dueloSocorroOptions.innerHTML = "";

    const companeros = partida.jugadores.filter(j => j.id !== jugador.id);
    companeros.forEach(comp => {
        const btn = document.createElement("button");
        btn.className = "duelo-socorro-player-btn";
        btn.type = "button";
        btn.innerHTML = `<span>${comp.avatar}</span> <strong>${comp.nombre}</strong> <small>(${comp.puntos} pts)</small>`;
        btn.onclick = () => seleccionarCompaneroSocorro(comp.id);
        dom.dueloSocorroOptions.appendChild(btn);
    });

    dom.dueloSocorroModal.showModal();
}

function seleccionarCompaneroSocorro(companeroId) {
    const partida = dueloEstado.partida;
    const jugador = partida.jugadores.find(j => j.id === partida.jugadorActualId);
    const companero = partida.jugadores.find(j => j.id === companeroId);

    if (!jugador || !companero) return;

    jugador.comodinesUsados.socorro = true;
    partida.jugadorSocorroId = companeroId;
    partida.comodinActivo = "socorro";

    if (dom.dueloSocorroModal) dom.dueloSocorroModal.close();
    actualizarComodinesJugadorUI(jugador);
    alert(`🤝 ¡Socorro activado con ${companero.nombre}! Si responden correctamente, sumarán 5 pts cada uno.`);
}

function usarComodinPista() {
    const partida = dueloEstado.partida;
    const jugador = partida.jugadores.find(j => j.id === partida.jugadorActualId);
    if (!jugador || jugador.comodinesUsados.pista) return;

    jugador.comodinesUsados.pista = true;
    partida.tiempoRestante += 15;
    actualizarCronometroTurnoDueloUI();
    actualizarComodinesJugadorUI(jugador);
    reproducirSonidoDuelo("beep");
    alert("💡 ¡Pista clave activada! Tenés 15 segundos extra para consultar tus apuntes o fórmulas.");
}

function usarComodinPaso() {
    const partida = dueloEstado.partida;
    const jugador = partida.jugadores.find(j => j.id === partida.jugadorActualId);
    if (!jugador || jugador.comodinesUsados.pasoRebote) return;
    if (partida.temasDisponibles.length <= 1) {
        alert("No hay otros temas disponibles para cambiar.");
        return;
    }

    jugador.comodinesUsados.pasoRebote = true;
    actualizarComodinesJugadorUI(jugador);

    // Cambiar de tema
    const otrosTemas = partida.temasDisponibles.filter(t => t.id !== partida.temaActual.id);
    const nuevoTema = otrosTemas[Math.floor(Math.random() * otrosTemas.length)];
    partida.temaActual = nuevoTema;

    if (dom.dueloActiveTopicTitle) dom.dueloActiveTopicTitle.textContent = nuevoTema.titulo;
    if (dom.dueloTopicRoulette) dom.dueloTopicRoulette.textContent = nuevoTema.titulo;

    reproducirSonidoDuelo("fanfare");
    alert(`🔄 ¡Paso y Rebote! Tu nuevo tema es: "${nuevoTema.titulo}".`);
}

/* Calificación de Turno & Robo Relámpago */
function calificarTurnoDuelo(tipo, diferirAvanzar = false) {
    const partida = dueloEstado.partida;
    const jugador = partida.jugadores.find(j => j.id === partida.jugadorActualId);
    if (!jugador) return;

    pausarCronometroTurnoDuelo();

    const nomJugador = jugador.apodo || jugador.nombre || "Jugador";

    // ==========================================
    // LÓGICA COOPERATIVA EN EQUIPO
    // ==========================================
    if (partida.esCoop) {
        if (tipo === "impecable") {
            partida.puntosEquipo = (partida.puntosEquipo || 0) + 15;
            jugador.puntosAportados = (jugador.puntosAportados || 0) + 15;
            agregarRegistroTurnoDuelo(`🟢 ${nomJugador} explicó ¡Excelente! (+15 pts al Equipo)`, 15);
            reproducirSonidoDuelo("fanfare");
        } else if (tipo === "ayuda") {
            partida.puntosEquipo = (partida.puntosEquipo || 0) + 8;
            jugador.puntosAportados = (jugador.puntosAportados || 0) + 8;
            agregarRegistroTurnoDuelo(`🟡 ${nomJugador} explicó con dudas (+8 pts al Equipo)`, 8);
            reproducirSonidoDuelo("beep");
        } else if (tipo === "paso") {
            partida.vidasEquipo = Math.max(0, (partida.vidasEquipo !== undefined ? partida.vidasEquipo : 3) - 1);
            agregarRegistroTurnoDuelo(`🔴 Tema no completado (-1 Vida del Equipo: quedan ${partida.vidasEquipo})`, 0);
            reproducirSonidoDuelo("buzzer");
        }

        // Si es host en online, notificar actualización de puntos a todos
        if (onlineDueloEstado.conectado && onlineDueloEstado.esHost) {
            publicarMensajeSala({
                tipo: "COOP_UPDATE_PUNTOS",
                puntosEquipo: partida.puntosEquipo,
                vidasEquipo: partida.vidasEquipo
            });
        }

        actualizarMarcadorDueloUI();

        // Verificar condición de fin cooperativo
        if (partida.puntosEquipo >= (partida.metaPuntosEquipo || 100)) {
            finalizarPartidaCooperativa(true);
            return;
        } else if (partida.vidasEquipo <= 0) {
            finalizarPartidaCooperativa(false);
            return;
        }

        if (!diferirAvanzar) {
            avanzarSiguienteTemaDuelo();
        }
        return;
    }

    // ==========================================
    // LÓGICA VERSUS (COMPETITIVA)
    // ==========================================
    if (tipo === "impecable") {
        const rachaActiva = dueloEstado.config.reglas.rachaFuego && jugador.rachaActual >= 2;
        let pts = rachaActiva ? 20 : 10;

        if (partida.comodinActivo === "socorro" && partida.jugadorSocorroId) {
            const comp = partida.jugadores.find(j => j.id === partida.jugadorSocorroId);
            const nomComp = comp ? (comp.apodo || comp.nombre || "compañero") : "compañero";
            jugador.puntos += 5;
            if (comp) comp.puntos += 5;
            agregarRegistroTurnoDuelo(`🤝 ${nomJugador} y ${nomComp} resolvieron con Socorro (+5 pts c/u)`, 5);
        } else {
            jugador.puntos += pts;
            jugador.rachaActual++;
            if (jugador.rachaActual > jugador.maxRacha) {
                jugador.maxRacha = jugador.rachaActual;
            }
            if (rachaActiva) {
                agregarRegistroTurnoDuelo(`🔥 ¡IMPECABLE DOBLE! ${nomJugador} sumó +20 pts con Racha de Fuego`, 20);
                reproducirSonidoDuelo("fanfare");
            } else {
                agregarRegistroTurnoDuelo(`🟢 ${nomJugador} respondió ¡Impecable! (+10 pts)`, 10);
                reproducirSonidoDuelo("fanfare");
            }
        }

        actualizarMarcadorDueloUI();
        if (!diferirAvanzar) {
            avanzarSiguienteTemaDuelo();
        }
    } else if (tipo === "ayuda") {
        if (partida.comodinActivo === "socorro" && partida.jugadorSocorroId) {
            const comp = partida.jugadores.find(j => j.id === partida.jugadorSocorroId);
            const nomComp = comp ? (comp.apodo || comp.nombre || "compañero") : "compañero";
            jugador.puntos += 5;
            if (comp) comp.puntos += 5;
            agregarRegistroTurnoDuelo(`🤝 ${nomJugador} y ${nomComp} con Socorro (+5 pts c/u)`, 5);
        } else {
            jugador.puntos += 5;
            jugador.rachaActual = 0;
            agregarRegistroTurnoDuelo(`🟡 ${nomJugador} respondió con ayuda (+5 pts)`, 5);
            reproducirSonidoDuelo("beep");
        }

        actualizarMarcadorDueloUI();
        if (!diferirAvanzar) {
            avanzarSiguienteTemaDuelo();
        }
    } else if (tipo === "paso") {
        jugador.rachaActual = 0;
        agregarRegistroTurnoDuelo(`🔴 ${nomJugador} pasó / no supo el tema (0 pts)`, 0);
        actualizarMarcadorDueloUI();

        // Comprobar si se activa el Robo Relámpago
        const otrosJugadores = partida.jugadores.filter(j => j.id !== jugador.id);
        if (dueloEstado.config.reglas.roboRelampago && otrosJugadores.length > 0) {
            iniciarRoboRelampago(otrosJugadores);
        } else {
            if (!diferirAvanzar) {
                avanzarSiguienteTemaDuelo();
            }
        }
    }
}

function iniciarRoboRelampago(otrosJugadores) {
    const partida = dueloEstado.partida;
    partida.robo.activo = true;
    partida.robo.ladronId = null;

    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala) {
        if (onlineDueloEstado.esHost) {
            publicarMensajeSala({
                tipo: "ROBO_DISPONIBLE",
                tema: partida.temaActual
            });
        }
        activarRoboRelampagoOnlinePantalla(partida.temaActual);
        return;
    }

    if (!dom.dueloRoboBox || !dom.dueloBuzzerContainer) return;

    dom.dueloRoboBox.classList.remove("hidden");
    if (dom.dueloThiefActiveArea) dom.dueloThiefActiveArea.classList.add("hidden");
    dom.dueloBuzzerContainer.classList.remove("hidden");
    dom.dueloBuzzerContainer.innerHTML = "";

    otrosJugadores.forEach(j => {
        const btn = document.createElement("button");
        btn.className = "duelo-buzzer-btn";
        btn.type = "button";
        btn.textContent = `⚡ ¡Yo robo! — ${j.apodo || j.nombre || "Jugador"}`;
        btn.onclick = () => pulsarRoboRelampago(j.id);
        dom.dueloBuzzerContainer.appendChild(btn);
    });

    reproducirSonidoDuelo("buzzer");
}

function pulsarRoboRelampago(ladronId) {
    const partida = dueloEstado.partida;
    const ladron = partida.jugadores.find(j => j.id === ladronId);
    if (!ladron) return;

    partida.robo.ladronId = ladronId;
    const nomLadron = ladron.apodo || ladron.nombre || "Jugador";

    if (dom.dueloBuzzerContainer) dom.dueloBuzzerContainer.classList.add("hidden");
    if (dom.dueloThiefActiveArea) dom.dueloThiefActiveArea.classList.remove("hidden");
    if (dom.dueloThiefTitle) dom.dueloThiefTitle.textContent = `⚡ ¡${nomLadron} pulsa el Robo Relámpago!`;

    // Tiempo rápido: la mitad del turno global
    partida.robo.tiempoRestante = Math.max(10, Math.floor(dueloEstado.config.tiempoTurnoSegundos / 2));
    actualizarCronometroRoboUI();

    if (partida.robo.intervalId) clearInterval(partida.robo.intervalId);
    partida.robo.intervalId = setInterval(() => {
        if (partida.robo.tiempoRestante > 1) {
            partida.robo.tiempoRestante--;
            actualizarCronometroRoboUI();
        } else {
            partida.robo.tiempoRestante = 0;
            actualizarCronometroRoboUI();
            clearInterval(partida.robo.intervalId);
            partida.robo.intervalId = null;
            reproducirSonidoDuelo("buzzer");
        }
    }, 1000);

    reproducirSonidoDuelo("beep");
}

function actualizarCronometroRoboUI() {
    const s = dueloEstado.partida.robo.tiempoRestante;
    const str = `00:${String(s).padStart(2, "0")}`;
    if (dom.dueloThiefTimerDigits) dom.dueloThiefTimerDigits.textContent = str;
}

function calificarRoboRelampago(exito) {
    const partida = dueloEstado.partida;
    if (partida.robo.intervalId) {
        clearInterval(partida.robo.intervalId);
        partida.robo.intervalId = null;
    }

    const ladron = partida.jugadores.find(j => j.id === partida.robo.ladronId);
    const nomLadron = ladron ? (ladron.apodo || ladron.nombre || "Jugador") : "Jugador";

    if (exito && ladron) {
        ladron.puntos += 10;
        ladron.robosExitosos++;
        agregarRegistroTurnoDuelo(`⚡ ¡Robo Relámpago exitoso de ${nomLadron}! (+10 pts)`, 10);
        reproducirSonidoDuelo("fanfare");
    } else if (ladron) {
        agregarRegistroTurnoDuelo(`⚡ Robo fallido de ${nomLadron} (0 pts)`, 0);
        reproducirSonidoDuelo("buzzer");
    }

    if (dom.dueloRoboBox) dom.dueloRoboBox.classList.add("hidden");
    if (dom.dueloOnlineRoboOverlay) dom.dueloOnlineRoboOverlay.classList.add("hidden");
    partida.robo.activo = false;

    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala && onlineDueloEstado.esHost) {
        publicarMensajeSala({
            tipo: "ROBO_CALIFICADO",
            ladronId: partida.robo.ladronId,
            exito,
            puntos: ladron ? ladron.puntos : 0,
            robosExitosos: ladron ? ladron.robosExitosos : 0
        });
    }

    avanzarSiguienteTemaDuelo();
}

function avanzarSiguienteTemaDuelo() {
    const partida = dueloEstado.partida;

    // Consumir el tema sorteado
    if (partida.temaActual) {
        partida.temasDisponibles = partida.temasDisponibles.filter(t => t.id !== partida.temaActual.id);
    }

    actualizarMarcadorDueloUI();

    if (dom.dueloTurnArea) dom.dueloTurnArea.classList.add("hidden");
    if (dom.dueloRoboBox) dom.dueloRoboBox.classList.add("hidden");
    if (dom.dueloOnlineRoboOverlay) dom.dueloOnlineRoboOverlay.classList.add("hidden");

    if (partida.temasDisponibles.length === 0) {
        alert("🎉 ¡Se sortearon todos los temas de la materia! Fin del duelo.");
        finalizarDueloPartida();
        return;
    }

    if (dom.dueloPlayerRoulette) dom.dueloPlayerRoulette.textContent = "🎲 ¿Quién es el siguiente?";
    if (dom.dueloTopicRoulette) dom.dueloTopicRoulette.textContent = "🎰 ¿Qué tema tocará?";

    // Reactivar botón de giro según rol
    if (dom.dueloSpinBtn) {
        if (onlineDueloEstado.modo === "online") {
            if (onlineDueloEstado.esHost) {
                dom.dueloSpinBtn.disabled = false;
                dom.dueloSpinBtn.innerHTML = '<span>🎲</span><span>GIRAR DOBLE RULETA</span>';
            } else {
                dom.dueloSpinBtn.disabled = true;
                dom.dueloSpinBtn.innerHTML = '<span>⏳</span><span>Esperando que el anfitrión gire la ruleta...</span>';
            }
        } else {
            dom.dueloSpinBtn.disabled = false;
            dom.dueloSpinBtn.innerHTML = '<span>🎲</span><span>GIRAR DOBLE RULETA</span>';
        }
    }
}

function finalizarPartidaCooperativa(victoria) {
    const partida = dueloEstado.partida;
    pausarCronometroTurnoDuelo();
    partida.activa = false;

    if (victoria) {
        reproducirSonidoDuelo("fanfare");
        mostrarToast("🎉 ¡EQUIPO TRIUNFADOR! Alcanzaron la meta de 100 puntos y aprobaron la materia.", "exito");
        if (dom.dueloVictoryTitle) dom.dueloVictoryTitle.textContent = "🎓 ¡MATERIA APROBADA EN EQUIPO!";
        if (dom.dueloVictoryDesc) dom.dueloVictoryDesc.textContent = `¡Felicitaciones! Entre todos acumularon ${partida.puntosEquipo} puntos cooperativos y superaron el examen colaborativo.`;
    } else {
        reproducirSonidoDuelo("buzzer");
        mostrarToast("💔 Se agotaron las 3 vidas del equipo. ¡A repasar y volver a intentar!", "error");
        if (dom.dueloVictoryTitle) dom.dueloVictoryTitle.textContent = "📚 MESA DE REPASO FINALIZADA";
        if (dom.dueloVictoryDesc) dom.dueloVictoryDesc.textContent = `El equipo agotó sus 3 oportunidades de examen tras alcanzar ${partida.puntosEquipo} de 100 puntos. ¡Momento de debatir y volver a intentarlo!`;
    }

    if (dom.dueloVictoryModal) dom.dueloVictoryModal.showModal();
}

function actualizarMarcadorDueloUI() {
    const partida = dueloEstado.partida;
    if (!partida.activa || !dom.dueloScoreboardList) return;

    dom.dueloScoreboardList.innerHTML = "";

    // Sincronizar banner cooperativo si corresponde
    if (dom.dueloCoopBanner) {
        if (partida.esCoop) {
            dom.dueloCoopBanner.classList.remove("hidden");
            if (dom.dueloCoopPointsDisplay) {
                dom.dueloCoopPointsDisplay.textContent = String(partida.puntosEquipo || 0);
            }
            if (dom.dueloCoopProgressBar) {
                const meta = partida.metaPuntosEquipo || 100;
                const pct = Math.min(100, Math.round(((partida.puntosEquipo || 0) / meta) * 100));
                dom.dueloCoopProgressBar.style.width = `${pct}%`;
            }
            if (dom.dueloCoopLivesDisplay) {
                let vidasStr = "";
                const v = partida.vidasEquipo !== undefined ? partida.vidasEquipo : 3;
                for (let i = 0; i < v; i++) vidasStr += "❤️";
                for (let i = v; i < 3; i++) vidasStr += "🖤";
                dom.dueloCoopLivesDisplay.textContent = vidasStr || "💀 (Sin vidas)";
            }
        } else {
            dom.dueloCoopBanner.classList.add("hidden");
        }
    }

    if (partida.esCoop) {
        // En cooperativo: ordenar por aporte individual al equipo
        const ranking = [...partida.jugadores].sort((a, b) => (b.puntosAportados || 0) - (a.puntosAportados || 0));
        ranking.forEach((j) => {
            const item = document.createElement("div");
            item.className = "duelo-scoreboard-item";
            item.innerHTML = `
                <div class="duelo-score-info">
                    <span class="duelo-score-rank">🤝</span>
                    <span>${j.avatar || "👤"}</span>
                    <span class="duelo-score-name">${j.nombre || j.apodo}</span>
                </div>
                <span class="duelo-score-points" style="color: #6ee7b7;">+${j.puntosAportados || 0} pts</span>
            `;
            dom.dueloScoreboardList.appendChild(item);
        });
    } else {
        // En versus: ordenar de mayor a menor puntaje con medallas para hasta 8 jugadores
        const ranking = [...partida.jugadores].sort((a, b) => b.puntos - a.puntos);
        ranking.forEach((j, i) => {
            const item = document.createElement("div");
            item.className = "duelo-scoreboard-item";
            if (i === 0) item.classList.add("is-first");

            const medallas = ["🥇", "🥈", "🥉"];
            const rankStr = medallas[i] || `${i + 1}°`;

            item.innerHTML = `
                <div class="duelo-score-info">
                    <span class="duelo-score-rank">${rankStr}</span>
                    <span>${j.avatar || "👤"}</span>
                    <span class="duelo-score-name">${j.nombre || j.apodo}</span>
                    ${j.rachaActual >= 2 ? '<span title="Racha de fuego">🔥</span>' : ""}
                </div>
                <span class="duelo-score-points">${j.puntos} pts</span>
            `;
            dom.dueloScoreboardList.appendChild(item);
        });
    }

    if (dom.dueloRoundCounterBadge) {
        dom.dueloRoundCounterBadge.textContent = partida.esCoop 
            ? `Meta: 100 pts` 
            : `Ronda ${partida.rondaNumero}`;
    }

    if (dom.dueloBarRemainingTopics) {
        dom.dueloBarRemainingTopics.textContent = `Temas restantes: ${partida.temasDisponibles.length}`;
    }
}

function agregarRegistroTurnoDuelo(mensaje, pts) {
    if (!dom.dueloTurnLog) return;
    const li = document.createElement("li");
    li.className = "duelo-turn-log-item";
    li.innerHTML = `<span>${mensaje}</span> <strong style="color: ${pts > 0 ? "var(--color-success)" : "var(--color-text-muted)"}">${pts > 0 ? "+" + pts : "0"}</strong>`;

    const empty = dom.dueloTurnLog.querySelector(".duelo-log-empty");
    if (empty) empty.remove();

    dom.dueloTurnLog.insertBefore(li, dom.dueloTurnLog.firstChild);
}

function finalizarDueloPartida(forzar = false) {
    const partida = dueloEstado.partida;
    if (!partida.activa) return;

    pausarCronometroTurnoDuelo();
    if (partida.robo.intervalId) clearInterval(partida.robo.intervalId);

    partida.activa = false;

    // Calcular podio
    const ranking = [...partida.jugadores].sort((a, b) => b.puntos - a.puntos);
    const ganador = ranking[0];

    // Rey de la racha y Ladrón relámpago
    const reyRacha = [...partida.jugadores].sort((a, b) => b.maxRacha - a.maxRacha)[0];
    const ladron = [...partida.jugadores].sort((a, b) => b.robosExitosos - a.robosExitosos)[0];

    const lista = estado.listas.find(l => l.id === dueloEstado.config.listaId);
    const nombreLista = lista ? lista.nombre : "Materia";

    // Guardar partida en Salón de la Fama
    const partidaGuardada = {
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        listaNombre: nombreLista,
        totalTurnos: partida.turnoNumero,
        ganador: {
            nombre: ganador ? (ganador.apodo || ganador.nombre || "Sin campeón") : "Sin campeón",
            puntos: ganador ? ganador.puntos : 0
        },
        reyRacha: {
            nombre: reyRacha ? (reyRacha.apodo || reyRacha.nombre || "—") : "—",
            racha: reyRacha ? reyRacha.maxRacha : 0
        },
        ladronRelampago: {
            nombre: ladron ? (ladron.apodo || ladron.nombre || "—") : "—",
            robos: ladron ? ladron.robosExitosos : 0
        },
        posiciones: ranking.map((j, i) => ({
            rank: i + 1,
            nombre: j.apodo || j.nombre || "Jugador",
            puntos: j.puntos,
            maxRacha: j.maxRacha,
            robosExitosos: j.robosExitosos
        }))
    };

    const historial = cargarHistorialDuelo();
    historial.unshift(partidaGuardada);
    guardarHistorialDuelo(historial);

    if (onlineDueloEstado.modo === "online" && onlineDueloEstado.codigoSala && onlineDueloEstado.esHost) {
        publicarMensajeSala({
            tipo: "FIN_PARTIDA_ONLINE",
            partidaGuardada
        });
    }

    // Mostrar Modal de Victoria
    mostrarModalVictoriaDuelo(partidaGuardada);
}

function mostrarModalVictoriaDuelo(partida) {
    if (!dom.dueloVictoryModal) return;

    if (dom.victoryModalSubtitle) {
        dom.victoryModalSubtitle.textContent = `Duelo de "${partida.listaNombre}" finalizado`;
    }

    if (dom.dueloPodioContainer) {
        dom.dueloPodioContainer.innerHTML = "";
        const pos = partida.posiciones;

        // Estructura podio: 2° a la izquierda, 1° al medio, 3° a la derecha
        const ordenPodio = [pos[1] || null, pos[0] || null, pos[2] || null];
        const clases = ["podio-step--second", "podio-step--first", "podio-step--third"];
        const medallas = ["🥈", "👑", "🥉"];
        const alturas = ["2", "1", "3"];

        ordenPodio.forEach((j, idx) => {
            if (!j) return;
            const step = document.createElement("div");
            step.className = `podio-step ${clases[idx]}`;
            step.innerHTML = `
                <span class="podio-avatar">${medallas[idx]}</span>
                <span class="podio-name">${j.nombre}</span>
                <span class="podio-points">${j.puntos} pts</span>
                <div class="podio-box">${alturas[idx]}</div>
            `;
            dom.dueloPodioContainer.appendChild(step);
        });
    }

    if (dom.dueloSpecialMentions) {
        dom.dueloSpecialMentions.innerHTML = "";
        if (partida.reyRacha && partida.reyRacha.racha > 1) {
            const chip = document.createElement("span");
            chip.className = "duelo-mention-chip";
            chip.innerHTML = `🔥 <strong>Rey de la Racha:</strong> ${partida.reyRacha.nombre} (${partida.reyRacha.racha} seguidas)`;
            dom.dueloSpecialMentions.appendChild(chip);
        }
        if (partida.ladronRelampago && partida.ladronRelampago.robos > 0) {
            const chip = document.createElement("span");
            chip.className = "duelo-mention-chip";
            chip.innerHTML = `⚡ <strong>Ladrón Relámpago:</strong> ${partida.ladronRelampago.nombre} (${partida.ladronRelampago.robos} robos)`;
            dom.dueloSpecialMentions.appendChild(chip);
        }
    }

    if (dom.victoryCopySummaryBtn) {
        dom.victoryCopySummaryBtn.onclick = () => {
            const texto = generarResumenWhatsApp(partida);
            navigator.clipboard.writeText(texto).then(() => {
                alert("¡Resumen de la partida copiado al portapapeles listo para WhatsApp! 📲");
            });
        };
    }

    // Botón de rescate al historial para invitados
    if (dom.victoryRegisterGuestBtn) {
        if (perfilUsuario.esInvitado) {
            dom.victoryRegisterGuestBtn.classList.remove("hidden");
            dom.victoryRegisterGuestBtn.onclick = () => {
                abrirModalAuth("register");
            };
        } else {
            dom.victoryRegisterGuestBtn.classList.add("hidden");
        }
    }

    // Si el jugador local está registrado, actualizar sus estadísticas oficiales
    if (!perfilUsuario.esInvitado && partida.posiciones) {
        const miPos = partida.posiciones.find(p => p.nombre.toLowerCase() === perfilUsuario.apodo.toLowerCase());
        if (miPos) {
            if (miPos.rank === 1) perfilUsuario.victorias = (perfilUsuario.victorias || 0) + 1;
            perfilUsuario.puntosTotales = (perfilUsuario.puntosTotales || 0) + miPos.puntos;
            perfilUsuario.partidasJugadas = (perfilUsuario.partidasJugadas || 0) + 1;
            if (miPos.maxRacha > (perfilUsuario.maxRachaHistorica || 0)) {
                perfilUsuario.maxRachaHistorica = miPos.maxRacha;
            }
            perfilUsuario.totalRobos = (perfilUsuario.totalRobos || 0) + (miPos.robosExitosos || 0);
            guardarPerfilUsuario();

            const cuentas = obtenerCuentasGuardadas();
            const idx = cuentas.findIndex(c => c.id === perfilUsuario.id);
            if (idx !== -1) {
                cuentas[idx] = { ...cuentas[idx], ...perfilUsuario };
                guardarCuentas(cuentas);
            }
        }
    }

    dom.dueloVictoryModal.showModal();
    reproducirSonidoDuelo("fanfare");
}

/* ==========================================================
   SALÓN DE LA FAMA (HISTORIAL & CAMPEONES)
   ========================================================== */
function cargarHistorialDuelo() {
    try {
        const data = localStorage.getItem(DUELO_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function guardarHistorialDuelo(historial) {
    try {
        localStorage.setItem(DUELO_STORAGE_KEY, JSON.stringify(historial));
    } catch {}
}

function renderSalonDeLaFama() {
    const historial = cargarHistorialDuelo();

    if (dom.famaMatchesBadge) {
        dom.famaMatchesBadge.textContent = `${historial.length} ${historial.length === 1 ? "partida" : "partidas"}`;
    }

    if (dom.famaTotalMatchesCount) {
        dom.famaTotalMatchesCount.textContent = String(historial.length);
    }

    // Calcular Tabla Acumulada
    const statsJugadores = {};
    let totalPuntos = 0;

    historial.forEach(p => {
        p.posiciones.forEach(pos => {
            totalPuntos += pos.puntos;
            if (!statsJugadores[pos.nombre]) {
                statsJugadores[pos.nombre] = {
                    nombre: pos.nombre,
                    victorias: 0,
                    platas: 0,
                    bronces: 0,
                    puntosTotales: 0,
                    maxRachaHistorica: 0,
                    totalRobos: 0
                };
            }
            const s = statsJugadores[pos.nombre];
            if (pos.rank === 1) s.victorias++;
            else if (pos.rank === 2) s.platas++;
            else if (pos.rank === 3) s.bronces++;

            s.puntosTotales += pos.puntos;
            if (pos.maxRacha > s.maxRachaHistorica) s.maxRachaHistorica = pos.maxRacha;
            s.totalRobos += (pos.robosExitosos || 0);
        });
    });

    if (dom.famaTotalPointsDistributed) {
        dom.famaTotalPointsDistributed.textContent = String(totalPuntos);
    }

    // Ordenar campeones por victorias y puntos
    const rankingCampeones = Object.values(statsJugadores).sort((a, b) => {
        if (b.victorias !== a.victorias) return b.victorias - a.victorias;
        return b.puntosTotales - a.puntosTotales;
    });

    if (dom.famaTopChampionName) {
        dom.famaTopChampionName.textContent = rankingCampeones[0]
            ? `${rankingCampeones[0].nombre} (${rankingCampeones[0].victorias} 👑)`
            : "—";
    }

    // Renderizar cuerpo de la tabla
    if (dom.famaLeaderboardBody) {
        dom.famaLeaderboardBody.innerHTML = "";
        if (rankingCampeones.length === 0) {
            dom.famaLeaderboardBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--color-text-muted);">Aún no se han disputado duelos. ¡Iniciá uno para estrenar el medallero!</td></tr>`;
        } else {
            rankingCampeones.forEach((c, idx) => {
                const tr = document.createElement("tr");
                const medallas = ["🥇 1°", "🥈 2°", "🥉 3°"];
                const puestoStr = medallas[idx] || `${idx + 1}°`;

                tr.innerHTML = `
                    <td><strong>${puestoStr}</strong></td>
                    <td><strong>${c.nombre}</strong></td>
                    <td style="color: #fbbf24; font-weight: 800;">${c.victorias}</td>
                    <td>${c.platas}</td>
                    <td>${c.bronces}</td>
                    <td><strong>${c.puntosTotales}</strong></td>
                    <td>${c.maxRachaHistorica > 1 ? c.maxRachaHistorica + " 🔥" : c.maxRachaHistorica}</td>
                    <td>${c.totalRobos > 0 ? c.totalRobos + " ⚡" : c.totalRobos}</td>
                `;
                dom.famaLeaderboardBody.appendChild(tr);
            });
        }
    }

    // Renderizar tarjetas de partidas con efecto neón y corona
    if (dom.famaMatchesGrid) {
        dom.famaMatchesGrid.innerHTML = "";
        if (historial.length === 0) {
            dom.famaMatchesGrid.innerHTML = `<div class="panel" style="text-align: center; padding: 3rem; color: var(--color-text-muted);">No hay historial de partidas guardado.</div>`;
            return;
        }

        historial.forEach(partida => {
            const card = document.createElement("article");
            card.className = "fama-match-card is-winner";

            const fechaStr = new Date(partida.fecha).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            let tagsHtml = "";
            if (partida.reyRacha && partida.reyRacha.racha > 1) {
                tagsHtml += `<span class="fama-special-tag fama-special-tag--streak">🔥 Rey de la Racha: ${partida.reyRacha.nombre} (${partida.reyRacha.racha} seguidas)</span>`;
            }
            if (partida.ladronRelampago && partida.ladronRelampago.robos > 0) {
                tagsHtml += `<span class="fama-special-tag fama-special-tag--thief">⚡ Ladrón Relámpago: ${partida.ladronRelampago.nombre} (${partida.ladronRelampago.robos} robos)</span>`;
            }

            let filasParticipantes = "";
            partida.posiciones.forEach(pos => {
                filasParticipantes += `
                    <tr>
                        <td><strong>${pos.rank}°</strong></td>
                        <td>${pos.nombre}</td>
                        <td><strong>${pos.puntos} pts</strong></td>
                        <td>${pos.maxRacha > 0 ? pos.maxRacha + " 🔥" : "—"}</td>
                        <td>${pos.robosExitosos > 0 ? pos.robosExitosos + " ⚡" : "—"}</td>
                    </tr>
                `;
            });

            card.innerHTML = `
                <div class="fama-match-header">
                    <div class="fama-winner-spotlight">
                        <span class="fama-crown-icon" aria-hidden="true">👑</span>
                        <div>
                            <h3 class="fama-winner-title">Campeón: ${partida.ganador.nombre} (${partida.ganador.puntos} pts)</h3>
                            <span class="fama-match-meta">Materia: <strong>${partida.listaNombre}</strong> • ${fechaStr}</span>
                        </div>
                    </div>
                </div>

                ${tagsHtml ? `<div class="fama-match-tags">${tagsHtml}</div>` : ""}

                <details class="fama-details-toggle">
                    <summary>Ver posiciones y puntajes completos de todos los integrantes</summary>
                    <table class="fama-details-table">
                        <thead>
                            <tr>
                                <th>Puesto</th>
                                <th>Jugador</th>
                                <th>Puntaje</th>
                                <th>Racha</th>
                                <th>Robos</th>
                            </tr>
                        </thead>
                        <tbody>${filasParticipantes}</tbody>
                    </table>
                </details>

                <div class="fama-card-actions">
                    <button class="button button--secondary button--sm fama-copy-btn" data-id="${partida.id}" type="button">
                        📸 Copiar Resumen (WhatsApp)
                    </button>
                    <button class="button button--ghost button--danger-text button--sm fama-del-btn" data-id="${partida.id}" type="button">
                        🗑️ Eliminar
                    </button>
                </div>
            `;

            dom.famaMatchesGrid.appendChild(card);
        });
    }
}

function generarResumenWhatsApp(partida) {
    const fecha = new Date(partida.fecha).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    let texto = `🏆 ¡RESULTADOS DUELO DE BOLILLERO - LUIBAÑEZ! ⚔️\n`;
    texto += `📚 Materia: ${partida.listaNombre}\n`;
    texto += `📅 Fecha: ${fecha}\n\n`;

    partida.posiciones.forEach(p => {
        let medalla = "🏅";
        if (p.rank === 1) medalla = "👑 CAMPEÓN:";
        else if (p.rank === 2) medalla = "🥈 2° Puesto:";
        else if (p.rank === 3) medalla = "🥉 3° Puesto:";
        else medalla = `${p.rank}°:`;

        texto += `${medalla} ${p.nombre} (${p.puntos} pts)\n`;
    });

    texto += `\n`;
    if (partida.reyRacha && partida.reyRacha.racha > 1) {
        texto += `🔥 Rey de la Racha: ${partida.reyRacha.nombre} (${partida.reyRacha.racha} seguidas)\n`;
    }
    if (partida.ladronRelampago && partida.ladronRelampago.robos > 0) {
        texto += `⚡ Ladrón Relámpago: ${partida.ladronRelampago.nombre} (${partida.ladronRelampago.robos} robos)\n`;
    }

    texto += `\n🚀 ¡Jugá tu duelo en https://luibanez.vercel.app! ✨`;
    return texto;
}

function copiarResumenPartida(partidaId) {
    const historial = cargarHistorialDuelo();
    const partida = historial.find(p => p.id === partidaId);
    if (!partida) return;

    const texto = generarResumenWhatsApp(partida);
    navigator.clipboard.writeText(texto).then(() => {
        alert("¡Resumen de la partida copiado al portapapeles! Listo para pegar en WhatsApp 📲");
    });
}

function eliminarPartidaHistorial(partidaId) {
    if (!confirm("¿Deseás eliminar esta partida del historial del Salón de la Fama?")) return;
    let historial = cargarHistorialDuelo();
    historial = historial.filter(p => p.id !== partidaId);
    guardarHistorialDuelo(historial);
    renderSalonDeLaFama();
}

function borrarHistorialCompleto() {
    if (!confirm("⚠️ ¿Estás seguro de que querés borrar TODO el historial del Salón de la Fama y reiniciar el medallero? Esta acción no se puede deshacer.")) return;
    localStorage.removeItem(DUELO_STORAGE_KEY);
    renderSalonDeLaFama();
    alert("Historial del Salón de la Fama reiniciado con éxito.");
}

function reproducirSonidoDuelo(tipo) {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = pomodoroEstado.audioCtx || new AudioContextClass();
        pomodoroEstado.audioCtx = ctx;
        if (ctx.state === "suspended") ctx.resume();

        const ahora = ctx.currentTime;
        if (tipo === "fanfare") {
            const notas = [523.25, 659.25, 783.99, 1046.50];
            notas.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, ahora + i * 0.1);
                gain.gain.setValueAtTime(0.2, ahora + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.1 + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ahora + i * 0.1);
                osc.stop(ahora + i * 0.1 + 0.26);
            });
        } else if (tipo === "buzzer") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(220, ahora);
            osc.frequency.linearRampToValueAtTime(160, ahora + 0.3);
            gain.gain.setValueAtTime(0.25, ahora);
            gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ahora);
            osc.stop(ahora + 0.36);
        } else if (tipo === "chispazo") {
            // Sonido de descarga eléctrica / chispazo áspero de cortocircuito
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(180, ahora);
            osc.frequency.exponentialRampToValueAtTime(45, ahora + 0.22);
            gain.gain.setValueAtTime(0.3, ahora);
            gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ahora);
            osc.stop(ahora + 0.26);
        } else if (tipo === "explosion") {
            // Sonido profundo y retumbante de explosión
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(120, ahora);
            osc.frequency.exponentialRampToValueAtTime(25, ahora + 0.85);
            gain.gain.setValueAtTime(0.45, ahora);
            gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.9);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ahora);
            osc.stop(ahora + 0.92);
        } else if (tipo === "beep") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ahora);
            gain.gain.setValueAtTime(0.18, ahora);
            gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ahora);
            osc.stop(ahora + 0.16);
        }
    } catch {}
}

/* ==========================================================
   SISTEMA DE AUDIO & MENSAJERÍA COMPATIBLE (GLOBAL)
   ========================================================== */
function reproducirSonido(tipo) {
    try {
        if (typeof reproducirSonidoDuelo === "function") {
            if (tipo === "ruletaFin" || tipo === "victoria" || tipo === "fanfare") {
                reproducirSonidoDuelo("fanfare");
            } else if (tipo === "chispazo") {
                reproducirSonidoDuelo("chispazo");
            } else if (tipo === "explosion") {
                reproducirSonidoDuelo("explosion");
            } else if (tipo === "comodin" || tipo === "buzzer" || tipo === "error") {
                reproducirSonidoDuelo("buzzer");
            } else {
                reproducirSonidoDuelo("beep");
            }
        }
    } catch (e) {
        console.warn("Audio warning:", e);
    }
}
window.reproducirSonido = reproducirSonido;

function enviarMensajeMQTT(data) {
    try {
        if (typeof publicarMensajeSala === "function") {
            publicarMensajeSala(data);
        }
    } catch (e) {
        console.warn("MQTT send warning:", e);
    }
}
window.enviarMensajeMQTT = enviarMensajeMQTT;

/* ==========================================================
   MÓDULO GOOGLE GEMINI API & APUNTES PDF CLIENT-SIDE
   ========================================================== */

const APUNTES_STORAGE_KEY = "luibanez_apuntes_pdf_v1";

const apuntesEstado = {
    global: null,   // { nombre, paginas, palabras, texto }
    bolillero: null,
    bomba: null,
    impostor: null,
    memotest: null
};

/* ==========================================================
   PERSISTENCIA ROBUSTA DE APUNTES CON INDEXEDDB (SIN LÍMITES)
   ========================================================== */
const IDB_DB_NAME = "LuibanezStorage";
const IDB_STORE_NAME = "apuntes";

function abrirIndexedDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            return reject(new Error("IndexedDB no soportado en este navegador"));
        }
        const req = window.indexedDB.open(IDB_DB_NAME, 1);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
                db.createObjectStore(IDB_STORE_NAME);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function guardarApunteEnIDB(clave, valor) {
    try {
        const db = await abrirIndexedDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE_NAME, "readwrite");
            const store = tx.objectStore(IDB_STORE_NAME);
            store.put(valor, clave);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.warn("Error al guardar apunte en IndexedDB:", err);
        return false;
    }
}

async function obtenerApunteDeIDB(clave) {
    try {
        const db = await abrirIndexedDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(IDB_STORE_NAME, "readonly");
            const store = tx.objectStore(IDB_STORE_NAME);
            const req = store.get(clave);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.warn("Error al leer apunte de IndexedDB:", err);
        return null;
    }
}

// Cargar apuntes persistidos desde IndexedDB (o fallback localStorage)
async function cargarApuntesGuardados() {
    try {
        const idbData = await obtenerApunteDeIDB("apuntesEstado");
        if (idbData && typeof idbData === "object") {
            Object.assign(apuntesEstado, idbData);
            actualizarUIIndicadoresPDF();
            return;
        }

        const guardado = localStorage.getItem(APUNTES_STORAGE_KEY);
        if (guardado) {
            const data = JSON.parse(guardado);
            Object.assign(apuntesEstado, data);
            actualizarUIIndicadoresPDF();
        }
    } catch (e) {
        console.warn("No se pudieron cargar los apuntes guardados:", e);
    }
}

async function guardarApuntesEnStorage() {
    // 1. Guardar en IndexedDB (soporta cientos de megas sin errores de cuota)
    await guardarApunteEnIDB("apuntesEstado", apuntesEstado);

    // 2. Guardar metadata liviana en localStorage
    try {
        const metadata = {};
        for (const k in apuntesEstado) {
            if (apuntesEstado[k]) {
                metadata[k] = {
                    nombre: apuntesEstado[k].nombre,
                    paginas: apuntesEstado[k].paginas,
                    palabras: apuntesEstado[k].palabras
                };
            } else {
                metadata[k] = null;
            }
        }
        localStorage.setItem(APUNTES_STORAGE_KEY + "_meta", JSON.stringify(metadata));
    } catch (e) {
        console.warn("No se pudo guardar metadata en localStorage:", e);
    }
}

function actualizarUIIndicadoresPDF() {
    actualizarCardPdfEnCrearSala();
    const apunteActivo = apuntesEstado.global || apuntesEstado.bolillero || apuntesEstado.bomba;
    
    // 1. Centro Principal de Apuntes en Inicio (viewHome)
    if (dom.mainPdfHubEmpty && dom.mainPdfHubActive) {
        if (apunteActivo && apunteActivo.nombre) {
            dom.mainPdfHubEmpty.classList.add("hidden");
            dom.mainPdfHubActive.classList.remove("hidden");
            if (dom.mainPdfFileName) dom.mainPdfFileName.textContent = apunteActivo.nombre;
            if (dom.mainPdfFileStats) {
                dom.mainPdfFileStats.textContent = `${apunteActivo.paginas || 1} páginas • ${apunteActivo.palabras || 0} palabras • Guardado en base de datos local`;
            }
        } else {
            dom.mainPdfHubEmpty.classList.remove("hidden");
            dom.mainPdfHubActive.classList.add("hidden");
        }
    }

    // 2. Indicador Limpio en Encabezado del Bolillero
    if (dom.bolilleroGlobalPdfBadge) {
        if (apunteActivo && apunteActivo.nombre) {
            dom.bolilleroGlobalPdfBadge.style.display = "inline-flex";
            dom.bolilleroGlobalPdfBadge.classList.remove("hidden");
            if (dom.bolilleroGlobalPdfName) dom.bolilleroGlobalPdfName.textContent = apunteActivo.nombre;
        } else {
            dom.bolilleroGlobalPdfBadge.style.display = "none";
            dom.bolilleroGlobalPdfBadge.classList.add("hidden");
        }
    }

    // 3. Barra de Apuntes en Juegos Educativos (Bomba, Impostor, Memotest)
    if (dom.juegosApuntesStatus) {
        if (apunteActivo) {
            dom.juegosApuntesStatus.textContent = `📄 ${apunteActivo.nombre} (${apunteActivo.paginas} págs, ${apunteActivo.palabras} palabras)`;
            dom.juegosApuntesStatus.classList.add("has-pdf");
            if (dom.juegosRemovePdfBtn) dom.juegosRemovePdfBtn.classList.remove("hidden");
        } else {
            dom.juegosApuntesStatus.textContent = "Sin PDF cargado (usando banco temático estándar)";
            dom.juegosApuntesStatus.classList.remove("has-pdf");
            if (dom.juegosRemovePdfBtn) dom.juegosRemovePdfBtn.classList.add("hidden");
        }
    }

    // 4. Badge en Tarjeta de Examen Oral del Bolillero
    if (dom.bolilleroIASourceBadge) {
        if (apunteActivo) {
            dom.bolilleroIASourceBadge.style.display = "inline-block";
            dom.bolilleroIASourceBadge.textContent = `📄 Basado en: ${apunteActivo.nombre}`;
        } else {
            dom.bolilleroIASourceBadge.style.display = "none";
        }
    }

    // 5. Tarjeta en Estudiar Solo
    if (dom.soloPdfCardDesc) {
        if (apunteActivo) {
            dom.soloPdfCardDesc.innerHTML = `<strong style="color: #34d399;">📄 Archivo activo:</strong> ${apunteActivo.nombre} (${apunteActivo.paginas} págs). Los juegos de la plataforma ya están usando este material para formular desafíos.`;
        } else {
            dom.soloPdfCardDesc.textContent = "Cargá el resumen o programa en PDF de tu materia. La IA de Google Gemini extraerá los conceptos y adaptará las preguntas de todos tus juegos automáticamente.";
        }
    }
}

// Extracción de texto Client-Side mediante Mozilla PDF.js
async function procesarArchivoPDF(file) {
    if (!file) return null;
    const ext = file.name.split('.').pop().toLowerCase();

    // Archivo de texto plano o markdown
    if (ext === 'txt' || ext === 'md') {
        const text = await file.text();
        if (!text || !text.trim()) {
            throw new Error("El archivo de texto seleccionado está vacío.");
        }
        return {
            nombre: file.name,
            paginas: 1,
            palabras: text.trim().split(/\s+/).filter(Boolean).length,
            texto: text.trim()
        };
    }

    // Archivo PDF con PDF.js
    if (typeof window.pdfjsLib === 'undefined') {
        throw new Error("La biblioteca de lectura de PDF aún se está cargando. Por favor, aguardá un segundo y volvé a intentarlo.");
    }

    try {
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/standard_fonts/'
        });

        const pdf = await loadingTask.promise;
        let fullText = "";

        const maxPaginas = Math.min(pdf.numPages, 100);
        for (let i = 1; i <= maxPaginas; i++) {
            try {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageStr = content.items.map(item => item.str).join(" ");
                if (pageStr.trim()) {
                    fullText += `\n[PÁGINA ${i}]: ` + pageStr;
                }
            } catch (pageErr) {
                console.warn(`Error al leer página ${i} del PDF:`, pageErr);
            }
        }

        const textoLimpio = fullText.trim();
        const palabrasTotal = textoLimpio ? textoLimpio.split(/\s+/).filter(Boolean).length : 0;

        if (palabrasTotal < 10) {
            throw new Error("No se pudo detectar texto legible en este PDF. Es probable que sea un documento escaneado (fotocopias o imágenes) sin capa de texto digital. Probá con un PDF digital o cargá un archivo .txt/.md con tus notas.");
        }

        return {
            nombre: file.name,
            paginas: pdf.numPages,
            palabras: palabrasTotal,
            texto: textoLimpio
        };
    } catch (err) {
        console.error("Error al procesar PDF con PDF.js:", err);
        throw new Error(err.message || "No se pudo extraer el texto del PDF. Asegurate de que no esté dañado ni protegido con contraseña.");
    }
}

// Función Central Reutilizable para Consultar la Serverless Function de Gemini
async function generarPreguntaIA({ materia, tema, tipoJuego = 'bolillero', contextoPDF = null, dificultad = 'universitario', cantidadTemas = 10, preguntasPrevias = [] }) {
    // Si no se proveyó contexto explícito, buscar apunte cargado
    if (!contextoPDF) {
        const apunte = apuntesEstado[tipoJuego] || apuntesEstado.bolillero || apuntesEstado.global;
        if (apunte && apunte.texto) {
            contextoPDF = apunte.texto;
        }
    }

    const payload = {
        materia: materia || "General",
        tema: tema || "Conceptos Principales",
        tipoJuego,
        contextoPDF: contextoPDF || "",
        dificultad,
        cantidadTemas,
        preguntasPrevias
    };

    const resp = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(errJson.error || `Error HTTP ${resp.status} en Gemini Gateway`);
    }

    const json = await resp.json();
    return json.data;
}

// =========================================================
// EXTRACCIÓN DE PALABRAS / CONCEPTOS CON IA PARA EL BOLILLERO
// =========================================================
function extraerConceptosHeuristicos(texto, count = 10) {
    if (!texto || typeof texto !== "string") return [];
    
    const lineas = texto.split("\n").map(l => l.trim()).filter(l => l.length > 2);
    const candidatos = [];
    const vistos = new Set();

    const bulletRegex = /^[\u2022\-\*\u2013\u2014\d+\.\)]\s*(.+)$/;
    const defRegex = /^([A-ZÁÉÍÓÚÑ][^:\-—]{2,50})[:\-—]\s*(.+)$/;

    // Barrido completo de todas las líneas del documento (sin break anticipado)
    for (const linea of lineas) {
        if (linea.toLowerCase().startsWith("página") || linea.toLowerCase().startsWith("page")) continue;

        let concepto = null;
        const defMatch = linea.match(defRegex);
        if (defMatch && defMatch[1].trim().split(" ").length <= 5) {
            concepto = defMatch[1].trim();
        } else {
            const bMatch = linea.match(bulletRegex);
            if (bMatch) {
                const contenido = bMatch[1].trim();
                const palabras = contenido.split(" ");
                if (palabras.length >= 1 && palabras.length <= 5 && contenido.length <= 50) {
                    concepto = contenido.replace(/[.;:,]$/, "");
                }
            } else if (linea.length >= 4 && linea.length <= 45 && linea.split(" ").length <= 4) {
                concepto = linea.replace(/[.;:,]$/, "");
            }
        }

        if (concepto && concepto.length > 2) {
            const norm = concepto.toLowerCase();
            if (!vistos.has(norm)) {
                vistos.add(norm);
                candidatos.push(concepto);
            }
        }
    }

    // Si tenemos suficientes candidatos, muestreamos equitativamente a lo largo de TODO el documento (inicio, medio y fin)
    let resultado = [];
    if (candidatos.length <= count) {
        resultado = [...candidatos];
    } else {
        const step = candidatos.length / count;
        for (let i = 0; i < count; i++) {
            const idx = Math.min(candidatos.length - 1, Math.floor(i * step));
            resultado.push(candidatos[idx]);
        }
    }
    
    // Si aún faltan palabras para alcanzar 'count', usamos los ejes temáticos sustantivos
    if (resultado.length < count) {
        const ejes = extraerEjesTematicosBolillero(texto, "Apunte", count);
        for (const e of ejes) {
            if (!resultado.includes(e.titulo)) {
                resultado.push(e.titulo);
            }
            if (resultado.length >= count) break;
        }
    }

    return resultado.slice(0, count);
}

function abrirModalIaWordsBolillero() {
    const apunte = apuntesEstado.bolillero || apuntesEstado.global;
    if (!apunte || !apunte.texto) {
        mostrarToast("⚠️ No tenés ningún PDF cargado. Cargalo primero desde el Inicio en el Centro de Apuntes.", "aviso");
        return;
    }

    if (dom.iaWordsPdfName) {
        dom.iaWordsPdfName.textContent = apunte.nombre || "Documento PDF";
    }

    const lista = obtenerListaSeleccionada();
    if (dom.iaWordsCurrentListName) {
        dom.iaWordsCurrentListName.textContent = lista ? lista.nombre : "Sin lista seleccionada";
    }

    if (dom.bolilleroIaWordsModal) {
        if (typeof dom.bolilleroIaWordsModal.showModal === "function") {
            dom.bolilleroIaWordsModal.showModal();
        } else {
            dom.bolilleroIaWordsModal.setAttribute("open", "");
        }
    }
}

async function procesarExtraccionPalabrasIA(e) {
    if (e) e.preventDefault();

    const apunte = apuntesEstado.bolillero || apuntesEstado.global;
    if (!apunte || !apunte.texto) {
        mostrarToast("⚠️ No hay un apunte PDF cargado en el sistema.", "error");
        return;
    }

    const count = Math.min(50, Math.max(3, parseInt(dom.iaWordsCountInput?.value || 10, 10)));
    const target = document.querySelector('input[name="iaWordsTarget"]:checked')?.value || "append";

    if (dom.submitIaWordsBtn) dom.submitIaWordsBtn.disabled = true;
    if (dom.submitIaWordsText) dom.submitIaWordsText.textContent = "⏳ Extrayendo con Gemini IA...";

    try {
        let palabras = [];
        try {
            const data = await generarPreguntaIA({
                materia: apunte.nombre,
                tema: "Conceptos Clave de Estudio",
                tipoJuego: "temas_bolillero",
                contextoPDF: apunte.texto,
                cantidadTemas: count
            });

            if (data && Array.isArray(data.palabras) && data.palabras.length > 0) {
                palabras = data.palabras;
            } else if (data && Array.isArray(data) && data.length > 0) {
                palabras = data;
            }
        } catch (apiErr) {
            console.warn("Fallo al conectar con Gemini API para temas, aplicando fallback local:", apiErr);
        }

        // Si Gemini no devolvió suficientes o hubo fallo de red, usamos extractor heurístico
        if (!palabras || palabras.length === 0) {
            palabras = extraerConceptosHeuristicos(apunte.texto, count);
        }

        if (!palabras || palabras.length === 0) {
            throw new Error("No se pudieron extraer conceptos legibles de este PDF.");
        }

        // Limitar a la cantidad pedida y formatear
        palabras = palabras.slice(0, count);

        const nuevosTemas = palabras.map(p => ({
            id: crypto.randomUUID(),
            titulo: String(p).trim().slice(0, 100)
        }));

        let listaActual = obtenerListaSeleccionada();

        if (target === "new" || !listaActual) {
            const nombreBase = apunte.nombre.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            const nuevaListaId = crypto.randomUUID();
            estado.listas.push({
                id: nuevaListaId,
                nombre: `${nombreBase} (${nuevosTemas.length} TEMAS)`.toUpperCase(),
                temas: nuevosTemas
            });
            estado.listaSeleccionadaId = nuevaListaId;
        } else if (target === "replace") {
            listaActual.temas = nuevosTemas;
        } else {
            // append
            listaActual.temas.push(...nuevosTemas);
        }

        actualizarInterfaz();
        if (dom.bolilleroIaWordsModal) {
            if (typeof dom.bolilleroIaWordsModal.close === "function") dom.bolilleroIaWordsModal.close();
            else dom.bolilleroIaWordsModal.removeAttribute("open");
        }
        mostrarToast(`🎉 ¡${nuevosTemas.length} palabras extraídas de tu PDF con IA cargadas con éxito!`, "exito");
    } catch (err) {
        console.error("Error al extraer palabras con IA:", err);
        mostrarToast(`❌ Error: ${err.message}`, "error");
    } finally {
        if (dom.submitIaWordsBtn) dom.submitIaWordsBtn.disabled = false;
        if (dom.submitIaWordsText) dom.submitIaWordsText.textContent = "🚀 Extraer con IA";
    }
}

// Manejador interactivo para la tarjeta de Pregunta IA en Bolillero
let bolilleroIAPreguntaActiva = null;
const historialPreguntasBolillero = {}; // Almacena preguntas generadas por tema para evitar repeticiones

async function solicitarPreguntaIABolillero() {
    const lista = obtenerListaSeleccionada();
    const temaId = estado.ronda.ultimoTemaId;
    const tema = lista?.temas.find(t => t.id === temaId);

    const materiaNombre = lista ? lista.titulo : "Materia de Estudio";
    const temaNombre = tema ? tema.titulo : "Tema Seleccionado";
    const temaKey = (temaId || temaNombre).trim().toLowerCase();
    const preguntasPrevias = historialPreguntasBolillero[temaKey] || [];

    if (!dom.bolilleroIACard) return;

    dom.bolilleroIACard.classList.remove("hidden");
    if (dom.bolilleroIALoader) dom.bolilleroIALoader.classList.remove("hidden");
    if (dom.bolilleroIAContent) dom.bolilleroIAContent.classList.add("hidden");
    if (dom.bolilleroIAFeedback) dom.bolilleroIAFeedback.classList.add("hidden");

    actualizarUIIndicadoresPDF();

    try {
        const data = await generarPreguntaIA({
            materia: materiaNombre,
            tema: temaNombre,
            tipoJuego: 'bolillero',
            preguntasPrevias
        });

        if (data && data.pregunta) {
            if (!historialPreguntasBolillero[temaKey]) {
                historialPreguntasBolillero[temaKey] = [];
            }
            historialPreguntasBolillero[temaKey].push(data.pregunta);
            data.numeroPregunta = historialPreguntasBolillero[temaKey].length;
        }

        bolilleroIAPreguntaActiva = data;
        renderPreguntaIABolillero(data);
        if (preguntasPrevias.length > 0) {
            mostrarToast(`✨ Pregunta #${data.numeroPregunta || (preguntasPrevias.length + 1)} sobre "${temaNombre}" (nuevo enfoque generado)`);
        }
    } catch (err) {
        console.warn("Fallo al consultar Gemini para Bolillero, usando fallback procedimental:", err.message);
        mostrarToast("⚠️ Gemini sin conexión directa: usando banco procedimental variado");

        // Banco procedimental con múltiples ángulos para nunca repetir en fallback
        const fallbacks = [
            {
                pregunta: `¿Cuál es el principio metodológico y práctico fundamental asociado a "${temaNombre}" en ${materiaNombre}?`,
                opciones: [
                    `El análisis riguroso de las variables operativas y modelos formales de ${temaNombre}.`,
                    `La omisión de los supuestos teóricos iniciales sin validación metodológica.`,
                    `La sustitución puramente aleatoria de parámetros experimentales del sistema.`,
                    `La eliminación completa de las condiciones de contorno establecidas formalmente.`
                ],
                respuestaCorrecta: 0,
                explicacion: `En "${temaNombre}", el análisis riguroso de las variables garantiza la precisión teórica y práctica en el examen oral.`
            },
            {
                pregunta: `En un escenario de aplicación práctica o caso límite de "${temaNombre}", ¿qué criterio debe priorizarse?`,
                opciones: [
                    `La verificación de las restricciones de contorno y la consistencia dimensional de las variables.`,
                    `La alteración arbitraria de las constantes fundamentales para simplificar el resultado.`,
                    `El descarte de toda correlación teórica cuando se presentan discrepancias numéricas.`,
                    `La adopción de supuestos incompatibles con el marco general de la disciplina académica.`
                ],
                respuestaCorrecta: 0,
                explicacion: `En casos de aplicación práctica de "${temaNombre}", verificar las condiciones de validez y restricciones de contorno resulta imprescindible.`
            },
            {
                pregunta: `Si se modifican las variables críticas o condiciones de entorno en "${temaNombre}", ¿cuál es el comportamiento esperado?`,
                opciones: [
                    `Una respuesta proporcional que restablece el equilibrio de acuerdo con los postulados teóricos.`,
                    `Una anulación irreversible e instantánea de todas las propiedades intrínsecas del sistema.`,
                    `Un cambio totalmente caótico e imprevisible que invalida las leyes conocidas de la materia.`,
                    `La inversión espontánea de todos los signos algebraicos sin justificación física alguna.`
                ],
                respuestaCorrecta: 0,
                explicacion: `De acuerdo a los modelos formales de "${temaNombre}", el sistema responde proporcionalmente preservando la coherencia de sus postulados.`
            },
            {
                pregunta: `Al contrastar "${temaNombre}" con conceptos afines de ${materiaNombre}, ¿cuál es la distinción conceptual clave?`,
                opciones: [
                    `El dominio específico de aplicación y la hipótesis de partida sobre el estado del sistema.`,
                    `La ausencia total de rigor matemático en uno de los modelos respecto al otro.`,
                    `El uso exclusivo de términos empíricos sin ninguna base teórica demostrable.`,
                    `La incompatibilidad mutua que impide combinarlos en un mismo problema académico.`
                ],
                respuestaCorrecta: 0,
                explicacion: `La distinción esencial entre "${temaNombre}" y conceptos afines radica en su dominio de aplicación y los supuestos de partida del modelo.`
            }
        ];

        const idxFallback = preguntasPrevias.length % fallbacks.length;
        const fallback = fallbacks[idxFallback];

        if (!historialPreguntasBolillero[temaKey]) {
            historialPreguntasBolillero[temaKey] = [];
        }
        historialPreguntasBolillero[temaKey].push(fallback.pregunta);
        fallback.numeroPregunta = historialPreguntasBolillero[temaKey].length;

        bolilleroIAPreguntaActiva = fallback;
        renderPreguntaIABolillero(fallback);
    } finally {
        if (dom.bolilleroIALoader) dom.bolilleroIALoader.classList.add("hidden");
    }
}

function renderPreguntaIABolillero(data) {
    if (!dom.bolilleroIAContent || !dom.bolilleroIAPregunta || !dom.bolilleroIAOpciones) return;

    if (data.numeroPregunta && data.numeroPregunta > 1) {
        dom.bolilleroIAPregunta.innerHTML = `<span class="badge badge--accent" style="margin-bottom: 0.5rem; display: inline-block;">Pregunta #${data.numeroPregunta} • Nuevo enfoque</span><br>${data.pregunta}`;
    } else {
        dom.bolilleroIAPregunta.textContent = data.pregunta;
    }
    dom.bolilleroIAOpciones.innerHTML = "";

    const letras = ["A", "B", "C", "D"];

    data.opciones.forEach((opcTexto, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ia-option-btn";
        btn.innerHTML = `
            <span class="option-letter">${letras[idx]}</span>
            <span class="option-text">${opcTexto}</span>
        `;

        btn.addEventListener("click", () => {
            const esCorrecta = (idx === data.respuestaCorrecta);
            const todosLosBotones = dom.bolilleroIAOpciones.querySelectorAll(".ia-option-btn");
            
            todosLosBotones.forEach((b, bIdx) => {
                b.disabled = true;
                if (bIdx === data.respuestaCorrecta) {
                    b.classList.add("is-correct");
                } else if (b === btn && !esCorrecta) {
                    b.classList.add("is-wrong");
                }
            });

            if (dom.bolilleroIAFeedback) {
                dom.bolilleroIAFeedback.classList.remove("hidden");
                dom.bolilleroIAFeedback.className = `bolillero-ia-feedback ${esCorrecta ? '' : 'is-error'}`;
                dom.bolilleroIAFeedback.innerHTML = `
                    <div style="font-weight: 700; margin-bottom: 0.35rem; color: ${esCorrecta ? '#34d399' : '#f87171'};">
                        ${esCorrecta ? '🎉 ¡Respuesta Correcta!' : '❌ Respuesta Incorrecta'}
                    </div>
                    <div>${data.explicacion}</div>
                `;
            }

            if (esCorrecta) {
                mostrarToast("🌟 ¡Excelente respuesta de examen oral!");
            }
        });

        dom.bolilleroIAOpciones.appendChild(btn);
    });

    dom.bolilleroIAContent.classList.remove("hidden");
}

function mostrarOverlayCargandoJuegoIA(visible, tipoJuego = "juego") {
    if (!dom.juegosIALoadingOverlay) return;
    if (visible) {
        const nombres = {
            bomba: "Desactivá la Bomba",
            impostor: "Caza al Impostor",
            memotest: "Memotest Conectado",
            triatlon: "Triatlón Académico"
        };
        const juegoNom = nombres[tipoJuego] || "Desafío Académico";
        if (dom.juegosIALoadingTitle) {
            dom.juegosIALoadingTitle.textContent = `✨ Generando ${juegoNom} con IA...`;
        }
        if (dom.juegosIALoadingDesc) {
            dom.juegosIALoadingDesc.textContent = "Gemini está analizando los conceptos teóricos de tu PDF para armar las preguntas de la partida.";
        }
        dom.juegosIALoadingOverlay.classList.remove("hidden");
    } else {
        dom.juegosIALoadingOverlay.classList.add("hidden");
    }
}

// Generador Dinámico de Desafío para Juegos Educativos (Bomba, Impostor, Memotest)
async function enriquecerJuegoActualConIA(iniciarInmediato = true) {
    const juego = juegosEduEstado.juegoActual;
    const apunte = apuntesEstado[juego] || apuntesEstado.global;
    const lista = estado.listas.find(l => l.id === juegosEduEstado.listaId) || estado.listas[0];
    const tema = (juegosEduEstado.temas && juegosEduEstado.temas.length > 0)
        ? (juegosEduEstado.temas[juegosEduEstado.temaIndice] || juegosEduEstado.temas[0])
        : null;

    const materiaNombre = apunte ? apunte.nombre.replace(/\.pdf$/i, '') : (lista ? (lista.titulo || lista.nombre) : "Materia");
    const temaNombre = tema ? (tema.nombre || tema.titulo || "Conceptos Clave") : "Material de Estudio";

    mostrarToast(`✨ Conectando con Gemini para desafío de ${juego.toUpperCase()}...`);

    try {
        const data = await generarPreguntaIA({
            materia: materiaNombre,
            tema: temaNombre,
            tipoJuego: juego,
            contextoPDF: apunte ? apunte.texto : null
        });

        if (juego === "bomba") {
            if (tema) {
                tema.bomba = {
                    fase1: data.fase1,
                    fase2: data.fase2,
                    fase3: data.fase3
                };
            }
            if (iniciarInmediato && tema) {
                renderFase1Bomba(tema);
            }
            mostrarToast("💣 ¡Bomba actualizada con preguntas teóricas de tu PDF!");
        } else if (juego === "impostor") {
            const casos = (data.casos && Array.isArray(data.casos) && data.casos.length > 0)
                ? data.casos
                : (data.opciones ? [data] : []);

            if (casos.length > 0) {
                juegosEduEstado.impostor.casosPool = casos.map((c, i) => {
                    const opts = Array.isArray(c.opciones) ? c.opciones : [];
                    const rIdx = (c.respuestaCorrecta !== undefined && c.respuestaCorrecta >= 0 && c.respuestaCorrecta < opts.length)
                        ? Number(c.respuestaCorrecta)
                        : 0;
                    const afirmacionImpostora = opts[rIdx] || "Postulado con error conceptual sutil";
                    const verdaderas = opts.filter((_, idx) => idx !== rIdx);
                    while (verdaderas.length < 3) {
                        verdaderas.push(`Principio fundamentado #${verdaderas.length + 1} sobre ${c.subtema || temaNombre}`);
                    }
                    return {
                        subtema: c.subtema || `Caso #${i + 1}`,
                        pregunta: c.pregunta || `Identificá la afirmación FALSA sobre ${c.subtema || temaNombre}:`,
                        afirmacionesVerdaderas: verdaderas.slice(0, 3),
                        afirmacionImpostora: afirmacionImpostora,
                        explicacionError: c.explicacion || "Contradicción conceptual detectada con los principios del tema."
                    };
                });
                mostrarToast(`🕵️‍♂️ ¡Expediente de ${juegosEduEstado.impostor.casosPool.length} casos armado con tus apuntes!`);
            }
            if (iniciarInmediato) {
                lanzarOlaImpostor();
            }
        } else if (juego === "memotest" && data.pares && Array.isArray(data.pares)) {
            juegosEduEstado.temas = data.pares.map((p, idx) => ({
                id: "ia_pair_" + idx,
                nombre: p.concepto,
                descripcion: p.definicion,
                memotest: {
                    concepto: p.concepto,
                    definicionOFormula: p.definicion
                }
            }));
            if (iniciarInmediato) {
                iniciarMemotest(juegosEduEstado.modo);
            }
            mostrarToast("🧠 ¡Tablero de Memotest conectado con 6 conceptos del PDF!");
        }
    } catch (err) {
        console.warn("Fallo al generar juego con IA:", err.message);
        mostrarToast("⚠️ No se pudo generar con IA, usando datos temáticos existentes.");
    }
}


/* ==========================================================
   EVENTOS & LISTENERS
   ========================================================== */
function registrarEventos() {
    /* Eventos Google Gemini & Carga de Apuntes PDF */
    cargarApuntesGuardados();

    // 0. Centro Principal de Apuntes (PDF Hub Global) en Inicio
    const triggerMainPdfInput = () => {
        if (dom.mainGlobalPdfInput) dom.mainGlobalPdfInput.click();
    };
    if (dom.mainUploadPdfBtn) dom.mainUploadPdfBtn.addEventListener("click", triggerMainPdfInput);
    if (dom.mainChangePdfBtn) dom.mainChangePdfBtn.addEventListener("click", triggerMainPdfInput);

    if (dom.mainGlobalPdfInput) {
        dom.mainGlobalPdfInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            mostrarToast("📑 Procesando material de estudio con PDF.js...");
            try {
                const res = await procesarArchivoPDF(file);
                apuntesEstado.global = res;
                apuntesEstado.bolillero = res;
                apuntesEstado.bomba = res;
                apuntesEstado.impostor = res;
                apuntesEstado.memotest = res;
                await guardarApuntesEnStorage();
                actualizarUIIndicadoresPDF();
                mostrarToast(`✅ Material conectado: ${res.nombre}. ¡Ya alimenta a todos tus juegos!`);
            } catch (err) {
                alert(err.message);
            }
        });
    }

    // 5. Estudiar Juntos - Carga y Cambio de PDF en Crear Sala
    const dueloPdfInput = document.getElementById("dueloOnlinePdfInput");
    const dueloUploadBtn = document.getElementById("dueloUploadPdfBtn");
    const dueloRemoveBtn = document.getElementById("dueloRemovePdfBtn");

    if (dueloUploadBtn && dueloPdfInput) {
        dueloUploadBtn.addEventListener("click", () => dueloPdfInput.click());
    }

    if (dueloPdfInput) {
        dueloPdfInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (file) {
                await procesarYVincularPdfGlobal(file);
            }
        });
    }

    if (dueloRemoveBtn) {
        dueloRemoveBtn.addEventListener("click", async () => {
            apuntesEstado.global = null;
            apuntesEstado.bomba = null;
            apuntesEstado.bolillero = null;
            apuntesEstado.impostor = null;
            apuntesEstado.memotest = null;
            await guardarApuntesEnStorage();
            actualizarUIIndicadoresPDF();
            actualizarDropdownListasDuelo();
            mostrarToast("🗑️ Archivo PDF desvinculado de la sala.");
        });
    }

    if (dom.dueloOnlineListaSelect) {
        dom.dueloOnlineListaSelect.addEventListener("change", () => {
            actualizarDropdownListasDuelo();
        });
    }

    if (dom.mainRemovePdfBtn) {
        dom.mainRemovePdfBtn.addEventListener("click", async () => {
            apuntesEstado.global = null;
            apuntesEstado.bolillero = null;
            apuntesEstado.bomba = null;
            apuntesEstado.impostor = null;
            apuntesEstado.memotest = null;
            await guardarApuntesEnStorage();
            actualizarUIIndicadoresPDF();
            mostrarToast("🗑️ Material de estudio desvinculado.");
        });
    }

    // 1. Bolillero PDF Upload
    if (dom.bolilleroUploadPdfBtn && dom.bolilleroPdfInput) {
        dom.bolilleroUploadPdfBtn.addEventListener("click", () => dom.bolilleroPdfInput.click());
        dom.bolilleroPdfInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            mostrarToast("📑 Procesando apuntes PDF con PDF.js...");
            try {
                const res = await procesarArchivoPDF(file);
                apuntesEstado.bolillero = res;
                if (!apuntesEstado.global) apuntesEstado.global = res;
                guardarApuntesEnStorage();
                actualizarUIIndicadoresPDF();
                mostrarToast(`✅ Apuntes cargados: ${res.nombre} (${res.paginas} págs)`);
            } catch (err) {
                alert(err.message);
            }
        });
    }

    // 2. Bolillero IA Question Buttons
    if (dom.bolilleroIAGenerateBtn) {
        dom.bolilleroIAGenerateBtn.addEventListener("click", solicitarPreguntaIABolillero);
    }
    if (dom.bolilleroIARetryBtn) {
        dom.bolilleroIARetryBtn.addEventListener("click", solicitarPreguntaIABolillero);
    }

    // 3. Juegos Educativos PDF Bar (Bomba, Impostor, Memotest)
    if (dom.juegosUploadPdfBtn && dom.juegosPdfInput) {
        dom.juegosUploadPdfBtn.addEventListener("click", () => dom.juegosPdfInput.click());
        dom.juegosPdfInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            mostrarToast("📑 Procesando apuntes para el desafío...");
            try {
                const res = await procesarArchivoPDF(file);
                const juegoActual = juegosEduEstado.juegoActual || "global";
                apuntesEstado[juegoActual] = res;
                apuntesEstado.global = res;
                guardarApuntesEnStorage();
                actualizarUIIndicadoresPDF();
                mostrarToast(`✅ Apunte activo para ${juegoActual.toUpperCase()}: ${res.nombre}`);
                enriquecerJuegoActualConIA();
            } catch (err) {
                alert(err.message);
            }
        });
    }

    if (dom.juegosRemovePdfBtn) {
        dom.juegosRemovePdfBtn.addEventListener("click", () => {
            const juegoActual = juegosEduEstado.juegoActual || "global";
            apuntesEstado[juegoActual] = null;
            apuntesEstado.global = null;
            guardarApuntesEnStorage();
            actualizarUIIndicadoresPDF();
            mostrarToast("🗑️ Apuntes desvinculados.");
        });
    }

    if (dom.juegosGenerateIABtn) {
        dom.juegosGenerateIABtn.addEventListener("click", async () => {
            mostrarOverlayCargandoJuegoIA(true, juegosEduEstado.juegoActual);
            try {
                await enriquecerJuegoActualConIA(true);
            } finally {
                mostrarOverlayCargandoJuegoIA(false);
            }
        });
    }

    // 4. Estudiar Solo - Tarjeta Global PDF
    if (dom.soloUploadGlobalPdfBtn && dom.soloGlobalPdfInput) {
        dom.soloUploadGlobalPdfBtn.addEventListener("click", () => dom.soloGlobalPdfInput.click());
        dom.soloGlobalPdfInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            mostrarToast("📑 Procesando material de estudio global...");
            try {
                const res = await procesarArchivoPDF(file);
                apuntesEstado.global = res;
                await guardarApuntesEnStorage();
                actualizarUIIndicadoresPDF();
                mostrarToast(`✅ Material global vinculado: ${res.nombre} (${res.paginas} págs)`);
            } catch (err) {
                alert(err.message);
            }
        });
    }

    /* Navegación Principal */
    if (dom.navHomeBtn) dom.navHomeBtn.addEventListener("click", () => cambiarVista("home"));
    if (dom.navSoloBtn) dom.navSoloBtn.addEventListener("click", () => cambiarVista("solo"));
    if (dom.navLabBtn) dom.navLabBtn.addEventListener("click", () => cambiarVista("laboratorio"));
    if (dom.navJuntosBtn) dom.navJuntosBtn.addEventListener("click", () => cambiarVista("juntos"));
    if (dom.navBolilleroBtn) dom.navBolilleroBtn.addEventListener("click", () => cambiarVista("bolillero"));
    if (dom.navDueloBtn) dom.navDueloBtn.addEventListener("click", () => cambiarVista("duelo"));
    if (dom.navFamaBtn) dom.navFamaBtn.addEventListener("click", () => cambiarVista("fama"));
    if (dom.brandLink) {
        dom.brandLink.addEventListener("click", (e) => {
            e.preventDefault();
            cambiarVista("home");
        });
    }

    // Atajo de teclado: Barra espaciadora para girar el Bolillero
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space" || e.key === " ") {
            if (estado.interfaz.vistaActual === "bolillero") {
                const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
                if (activeTag === "input" || activeTag === "textarea" || (dom.listModal && dom.listModal.open) || (dom.topicModal && dom.topicModal.open)) {
                    return;
                }
                e.preventDefault();
                if (dom.spinButton && !dom.spinButton.disabled && !estado.interfaz.girando) {
                    girarBolillero();
                }
            }
        }
    });

    // Botones Hero y Portal Hub desde Inicio (viewHome)
    if (dom.heroGoSoloBtn) dom.heroGoSoloBtn.addEventListener("click", () => cambiarVista("solo"));
    if (dom.heroGoJuntosBtn) dom.heroGoJuntosBtn.addEventListener("click", () => cambiarVista("juntos"));
    if (dom.homeGoToSoloBtn) dom.homeGoToSoloBtn.addEventListener("click", () => cambiarVista("solo"));
    if (dom.homeGoToJuntosBtn) dom.homeGoToJuntosBtn.addEventListener("click", () => cambiarVista("juntos"));
    if (dom.homeGoToFamaBtn) dom.homeGoToFamaBtn.addEventListener("click", () => cambiarVista("fama"));
    if (dom.homeGoToLabBtn) dom.homeGoToLabBtn.addEventListener("click", () => cambiarVista("laboratorio"));
    if (dom.homeCardLaboratorio) {
        dom.homeCardLaboratorio.addEventListener("click", (e) => {
            // Prevenir doble disparo si se clickea el botón directamente
            if (e.target.closest("#homeGoToLabBtn")) return;
            cambiarVista("laboratorio");
        });
    }

    // Botón de salir de Modo Desarrollador dentro de viewJuntos
    const btnSalirModoDev = document.getElementById("btnSalirModoDev");
    if (btnSalirModoDev) {
        btnSalirModoDev.addEventListener("click", () => {
            desactivarModoDev();
        });
    }

    // Botones Cuadrículas de Estudiar Solo (viewSolo)
    if (dom.soloOpenBolilleroBtn) dom.soloOpenBolilleroBtn.addEventListener("click", () => cambiarVista("bolillero"));
    if (dom.soloOpenBombaBtn) dom.soloOpenBombaBtn.addEventListener("click", () => abrirArenaJuego("bomba", "solo"));
    if (dom.soloOpenImpostorBtn) dom.soloOpenImpostorBtn.addEventListener("click", () => abrirArenaJuego("impostor", "solo"));
    if (dom.soloOpenMemotestBtn) dom.soloOpenMemotestBtn.addEventListener("click", () => abrirArenaJuego("memotest", "solo"));
    if (dom.soloOpenLabBtn) dom.soloOpenLabBtn.addEventListener("click", () => cambiarVista("laboratorio"));
    const cardSoloLab = document.getElementById("cardSoloLab");
    if (cardSoloLab) {
        cardSoloLab.addEventListener("click", (e) => {
            if (e.target.closest("#soloOpenLabBtn")) return;
            cambiarVista("laboratorio");
        });
    }
    if (dom.soloNewListShortcutBtn) dom.soloNewListShortcutBtn.addEventListener("click", () => {
        cambiarVista("bolillero");
        if (dom.listModal) dom.listModal.showModal();
    });

    // Botones Volver Atrás (Back buttons)
    if (dom.backFromBolilleroBtn) dom.backFromBolilleroBtn.addEventListener("click", () => cambiarVista("solo"));
    if (dom.backFromDueloBtn) dom.backFromDueloBtn.addEventListener("click", () => cambiarVista("home"));

    // Botones Estudiar Juntos (viewJuntos) - Lobby Rápido y Modos
    if (dom.juntosQuickCreateBtn) dom.juntosQuickCreateBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.juntosQuickJoinBtn) dom.juntosQuickJoinBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        if (dom.dueloJoinByPinModal) dom.dueloJoinByPinModal.showModal();
        if (dom.dueloJoinRoomCode) dom.dueloJoinRoomCode.focus();
    });
    if (dom.openDueloBolilleroCardBtn) dom.openDueloBolilleroCardBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("bolillero");
        seleccionarFormatoLobby("versus");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openDueloBombaCardBtn) dom.openDueloBombaCardBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("bomba");
        seleccionarFormatoLobby("versus");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openDueloImpostorCardBtn) dom.openDueloImpostorCardBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("impostor");
        seleccionarFormatoLobby("versus");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openDueloMemotestCardBtn) dom.openDueloMemotestCardBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("memotest");
        seleccionarFormatoLobby("versus");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openDueloTriatlonCardBtn) dom.openDueloTriatlonCardBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("triatlon");
        seleccionarFormatoLobby("versus");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openCoopBombaBtn) dom.openCoopBombaBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("bomba");
        seleccionarFormatoLobby("coop");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openCoopMemotestBtn) dom.openCoopMemotestBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("memotest");
        seleccionarFormatoLobby("coop");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });
    if (dom.openCoopBolilleroBtn) dom.openCoopBolilleroBtn.addEventListener("click", () => {
        cambiarVista("duelo");
        seleccionarJuegoLobby("bolillero");
        seleccionarFormatoLobby("coop");
        if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
    });

    // Botones adicionales hacia el bolillero
    dom.openBolilleroBtns.forEach(btn => {
        btn.addEventListener("click", () => cambiarVista("bolillero"));
    });
    if (dom.heroEnterBolilleroBtn) {
        dom.heroEnterBolilleroBtn.addEventListener("click", () => cambiarVista("bolillero"));
    }

    // Bolita 3D interactiva
    if (dom.interactiveBall) {
        dom.interactiveBall.addEventListener("click", () => {
            dom.interactiveBall.classList.add("is-clicked");
            setTimeout(() => {
                dom.interactiveBall.classList.remove("is-clicked");
                cambiarVista("bolillero");
            }, 300);
        });
    }

    // Botón abrir pomodoro desde tarjeta del Home
    if (dom.openPomodoroFromCardBtn) {
        dom.openPomodoroFromCardBtn.addEventListener("click", abrirTarjetaPomodoro);
    }

    // Tema Sol/Luna
    if (dom.themeToggleBtn) {
        dom.themeToggleBtn.addEventListener("click", alternarTema);
    }

    // Modo Rendimiento (Lite / Visual Pro)
    if (dom.perfToggleBtn) {
        dom.perfToggleBtn.addEventListener("click", alternarModoRendimiento);
    }

    // Dynamic Island
    dom.pomodoroPill.addEventListener("click", toggleTarjetaPomodoro);

    // Tarjeta Flotante
    dom.pinPomodoroBtn.addEventListener("click", toggleFijarTarjeta);
    dom.minimizePomodoroBtn.addEventListener("click", () => cerrarTarjetaPomodoro(true));

    /* Bolillero y Listas */
    dom.newListButton.addEventListener("click", () => dom.listModal.showModal());
    dom.cancelListButton.addEventListener("click", () => dom.listModal.close());
    dom.listForm.addEventListener("submit", (e) => {
        e.preventDefault();
        crearLista(dom.listNameInput.value);
        dom.listForm.reset();
        dom.listModal.close();
    });

    dom.addTopicButton.addEventListener("click", () => dom.topicModal.showModal());
    dom.cancelTopicButton.addEventListener("click", () => dom.topicModal.close());
    dom.topicForm.addEventListener("submit", (e) => {
        e.preventDefault();
        agregarTema(dom.topicInput.value);
        dom.topicForm.reset();
        dom.topicModal.close();
    });

    dom.listsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".list-item__button");
        if (btn) {
            estado.listaSeleccionadaId = btn.dataset.id;
            reconstruirBolillero();
            render();
            return;
        }
        const del = e.target.closest(".delete-list");
        if (del) {
            const id = del.closest(".list-item").querySelector(".list-item__button").dataset.id;
            eliminarLista(id);
        }
    });

function seleccionarTemaManualBolillero(temaId, dispararIaInmediata = false) {
    const lista = obtenerListaSeleccionada();
    if (!lista) return;
    const tema = lista.temas.find(t => t.id === temaId);
    if (!tema) return;

    // Resaltar tarjeta seleccionada en el grid
    const allCards = dom.topicsGrid.querySelectorAll(".topic-card");
    allCards.forEach(c => c.classList.remove("is-selected-card"));
    const cardEl = dom.topicsGrid.querySelector(`.topic-card[data-id="${temaId}"]`);
    if (cardEl) cardEl.classList.add("is-selected-card");

    // Marcar como último tema seleccionado
    estado.ronda.ultimoTemaId = temaId;
    if (dom.rollingDisplay) dom.rollingDisplay.textContent = tema.titulo;
    renderResultado();

    // Desplazar a la sección de resultado / pregunta IA
    if (dom.resultSection) {
        dom.resultSection.classList.remove("hidden");
        dom.resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (dispararIaInmediata) {
        mostrarToast(`✨ Generando pregunta con IA sobre "${tema.titulo}"...`);
        solicitarPreguntaIABolillero();
    } else {
        mostrarToast(`🎯 Seleccionaste "${tema.titulo}". Podés generar una pregunta con IA abajo.`);
    }
}

    dom.topicsGrid.addEventListener("click", (e) => {
        const del = e.target.closest(".delete-topic");
        if (del) {
            const id = del.closest(".topic-card").dataset.id;
            eliminarTema(id);
            return;
        }

        const askIa = e.target.closest(".ask-topic-ia");
        const card = e.target.closest(".topic-card");
        if (card) {
            const temaId = card.dataset.id;
            seleccionarTemaManualBolillero(temaId, Boolean(askIa));
        }
    });

    if (dom.spinButton) dom.spinButton.addEventListener("click", girarBolillero);
    if (dom.drawAgainButton) dom.drawAgainButton.addEventListener("click", girarBolillero);
    if (dom.restoreRoundButton) dom.restoreRoundButton.addEventListener("click", restaurarBolillero);

    if (dom.importButton && dom.importFileInput) {
        dom.importButton.addEventListener("click", () => dom.importFileInput.click());
    }
    if (dom.importFileInput) {
        dom.importFileInput.addEventListener("change", manejarImportacionArchivo);
    }

    if (dom.bolilleroIaWordsBtn) {
        dom.bolilleroIaWordsBtn.addEventListener("click", abrirModalIaWordsBolillero);
    }
    if (dom.closeIaWordsModalBtn) {
        dom.closeIaWordsModalBtn.addEventListener("click", () => {
            if (dom.bolilleroIaWordsModal) {
                if (typeof dom.bolilleroIaWordsModal.close === "function") dom.bolilleroIaWordsModal.close();
                else dom.bolilleroIaWordsModal.removeAttribute("open");
            }
        });
    }
    if (dom.cancelIaWordsModalBtn) {
        dom.cancelIaWordsModalBtn.addEventListener("click", () => {
            if (dom.bolilleroIaWordsModal) {
                if (typeof dom.bolilleroIaWordsModal.close === "function") dom.bolilleroIaWordsModal.close();
                else dom.bolilleroIaWordsModal.removeAttribute("open");
            }
        });
    }
    if (dom.iaWordsForm) {
        dom.iaWordsForm.addEventListener("submit", procesarExtraccionPalabrasIA);
    }

    // Chips de selección rápida de cantidad
    document.querySelectorAll(".ia-words-quick-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".ia-words-quick-chip").forEach(c => c.classList.remove("is-active"));
            chip.classList.add("is-active");
            const cnt = chip.dataset.count;
            if (dom.iaWordsCountInput && cnt) {
                dom.iaWordsCountInput.value = cnt;
            }
        });
    });

    if (dom.iaWordsCountInput) {
        dom.iaWordsCountInput.addEventListener("input", (e) => {
            const val = e.target.value;
            document.querySelectorAll(".ia-words-quick-chip").forEach(chip => {
                chip.classList.toggle("is-active", chip.dataset.count === val);
            });
        });
    }

    /* Pomodoro */
    dom.modeStudyBtn.addEventListener("click", () => cambiarModoPomodoro("estudio"));
    dom.modeShortBreakBtn.addEventListener("click", () => cambiarModoPomodoro("descanso-corto"));
    dom.modeLongBreakBtn.addEventListener("click", () => cambiarModoPomodoro("descanso-largo"));

    dom.pomodoroToggleBtn.addEventListener("click", togglePomodoro);
    dom.pomodoroResetBtn.addEventListener("click", reiniciarPomodoro);
    dom.pomodoroSkipBtn.addEventListener("click", siguienteFasePomodoro);

    dom.pomodoroConfigButton.addEventListener("click", abrirModalPomodoro);
    dom.cancelPomodoroButton.addEventListener("click", cerrarModalPomodoro);
    dom.pomodoroForm.addEventListener("submit", guardarFormularioPomodoro);

    dom.pomodoroModal.addEventListener("close", () => {
        dom.pomodoroForm.reset();
    });

    
    /* ==========================================================
       MODO DUELO & SALÓN DE LA FAMA EVENTOS
       ========================================================== */
        // Cuenta y Autenticación con PIN
    if (dom.dueloChangeAvatarBtn) dom.dueloChangeAvatarBtn.addEventListener("click", abrirSelectorAvatar);
    if (dom.dueloAuthModalBtn) dom.dueloAuthModalBtn.addEventListener("click", () => abrirModalAuth("login"));
    if (dom.dueloCreateAccountPromptBtn) dom.dueloCreateAccountPromptBtn.addEventListener("click", () => abrirModalAuth("register"));
    if (dom.authModalCloseBtn) dom.authModalCloseBtn.addEventListener("click", () => dom.authAccountModal.close());
    if (dom.authTabRegister) dom.authTabRegister.addEventListener("click", () => cambiarPestañaAuth("register"));
    if (dom.authTabLogin) dom.authTabLogin.addEventListener("click", () => cambiarPestañaAuth("login"));
    if (dom.authRegOpenAvatarPickerBtn) dom.authRegOpenAvatarPickerBtn.addEventListener("click", abrirSelectorAvatar);
    if (dom.authContinueGuestBtn) dom.authContinueGuestBtn.addEventListener("click", () => {
        cerrarSesionPerfil();
        if (dom.authAccountModal) dom.authAccountModal.close();
    });
    if (dom.authSubmitRegisterBtn) {
        dom.authSubmitRegisterBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const apodo = dom.authRegApodo?.value;
            const pin = dom.authRegPin?.value;
            const email = dom.authRegEmail?.value;
            crearOActualizarCuenta(apodo, perfilUsuario.avatar, perfilUsuario.tipoAvatar, perfilUsuario.fotoDataUrl, pin, email);
        });
    }
    if (dom.authSubmitLoginBtn) {
        dom.authSubmitLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const cuentaId = dom.authLoginSelect?.value;
            const pin = dom.authLoginPin?.value;
            if (!cuentaId) {
                alert("Seleccioná una cuenta.");
                return;
            }
            iniciarSesionConPin(cuentaId, pin);
        });
    }
    if (dom.authForgotPinBtn) dom.authForgotPinBtn.addEventListener("click", recuperarPin);

    // Selector de Avatares (Emojis & Foto)
    if (dom.avatarModalCloseBtn) dom.avatarModalCloseBtn.addEventListener("click", () => dom.avatarPickerModal.close());
    if (dom.avatarTabEmojis) {
        dom.avatarTabEmojis.addEventListener("click", () => {
            dom.avatarTabEmojis.classList.add("is-active");
            dom.avatarTabPhoto.classList.remove("is-active");
            dom.avatarPanelEmojis.classList.remove("hidden");
            dom.avatarPanelPhoto.classList.add("hidden");
        });
    }
    if (dom.avatarTabPhoto) {
        dom.avatarTabPhoto.addEventListener("click", () => {
            dom.avatarTabPhoto.classList.add("is-active");
            dom.avatarTabEmojis.classList.remove("is-active");
            dom.avatarPanelPhoto.classList.remove("hidden");
            dom.avatarPanelEmojis.classList.add("hidden");
        });
    }
    if (dom.avatarEmojiSearchInput) {
        dom.avatarEmojiSearchInput.addEventListener("input", (e) => {
            const activeCatPill = document.querySelector(".emoji-cat-pill.is-active");
            const cat = activeCatPill ? activeCatPill.dataset.cat : "all";
            renderCatalogoEmojis(cat, e.target.value);
        });
    }
    const catPills = document.querySelectorAll(".emoji-cat-pill");
    catPills.forEach(pill => {
        pill.addEventListener("click", () => {
            catPills.forEach(p => p.classList.remove("is-active"));
            pill.classList.add("is-active");
            renderCatalogoEmojis(pill.dataset.cat, dom.avatarEmojiSearchInput?.value || "");
        });
    });
    if (dom.avatarCustomEmojiBtn) {
        dom.avatarCustomEmojiBtn.addEventListener("click", () => {
            const custom = dom.avatarCustomEmojiInput?.value?.trim();
            if (custom) {
                aplicarAvatarSeleccionado("emoji", custom, "");
            }
        });
    }
    if (dom.avatarCaptureCameraBtn) {
        dom.avatarCaptureCameraBtn.addEventListener("click", () => {
            if (dom.avatarFileInput) {
                dom.avatarFileInput.setAttribute("capture", "user");
                dom.avatarFileInput.click();
            }
        });
    }
    if (dom.avatarUploadGalleryBtn) {
        dom.avatarUploadGalleryBtn.addEventListener("click", () => {
            if (dom.avatarFileInput) {
                dom.avatarFileInput.removeAttribute("capture");
                dom.avatarFileInput.click();
            }
        });
    }
    if (dom.avatarFileInput) {
        dom.avatarFileInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                procesarFotoSubida(e.target.files[0]);
            }
        });
    }
    if (dom.avatarConfirmPhotoBtn) {
        dom.avatarConfirmPhotoBtn.addEventListener("click", () => {
            if (tempAvatarSeleccionado.dataUrl) {
                aplicarAvatarSeleccionado("foto", "📷", tempAvatarSeleccionado.dataUrl);
            }
        });
    }

    // Modalidad Online vs Local
    if (dom.dueloModeOnlineBtn) dom.dueloModeOnlineBtn.addEventListener("click", () => cambiarModoDueloLobby("online"));
    if (dom.dueloModeLocalBtn) dom.dueloModeLocalBtn.addEventListener("click", () => cambiarModoDueloLobby("local"));

    // Explorador de Lobbies y Modales Flotantes
    if (dom.dueloOpenCreateModalBtn) {
        dom.dueloOpenCreateModalBtn.addEventListener("click", () => {
            if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
        });
    }
    if (dom.dueloEmptyCreateBtn) {
        dom.dueloEmptyCreateBtn.addEventListener("click", () => {
            if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.showModal();
        });
    }
    if (dom.dueloCloseCreateModalBtn) {
        dom.dueloCloseCreateModalBtn.addEventListener("click", () => {
            if (dom.dueloCreateRoomModal) dom.dueloCreateRoomModal.close();
        });
    }
    if (dom.dueloOpenPinModalBtn) {
        dom.dueloOpenPinModalBtn.addEventListener("click", () => {
            if (dom.dueloJoinByPinModal) dom.dueloJoinByPinModal.showModal();
            if (dom.dueloJoinRoomCode) dom.dueloJoinRoomCode.focus();
        });
    }
    if (dom.dueloClosePinModalBtn) {
        dom.dueloClosePinModalBtn.addEventListener("click", () => {
            if (dom.dueloJoinByPinModal) dom.dueloJoinByPinModal.close();
        });
    }

    [dom.dueloCreateRoomModal, dom.dueloJoinByPinModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });

    if (dom.dueloBrowserFilters) {
        dom.dueloBrowserFilters.addEventListener("click", (e) => {
            const pill = e.target.closest(".filter-pill");
            if (!pill) return;
            const filter = pill.dataset.filter || "todas";
            lobbyBrowserState.filtroJuego = filter;
            dom.dueloBrowserFilters.querySelectorAll(".filter-pill").forEach(p => {
                p.classList.toggle("is-active", p === pill);
            });
            renderizarLobbyBrowser();
        });
    }

    // Online Lobby Setup
    if (dom.dueloOnlineHasPassword) {
        dom.dueloOnlineHasPassword.addEventListener("change", () => {
            if (dom.dueloOnlinePasswordRow) {
                dom.dueloOnlinePasswordRow.classList.toggle("hidden", !dom.dueloOnlineHasPassword.checked);
            }
        });
    }
    if (dom.dueloCreateRoomBtn) dom.dueloCreateRoomBtn.addEventListener("click", crearSalaOnline);
    if (dom.dueloJoinRoomBtn) {
        dom.dueloJoinRoomBtn.addEventListener("click", () => {
            unirseASalaOnline(dom.dueloJoinRoomCode?.value, dom.dueloJoinRoomPass?.value);
        });
    }
    if (dom.dueloCopyLinkBtn) {
        dom.dueloCopyLinkBtn.addEventListener("click", () => {
            if (dom.dueloMagicLinkInput) {
                navigator.clipboard.writeText(dom.dueloMagicLinkInput.value).then(() => {
                    if (dom.dueloCopySuccessHint) {
                        dom.dueloCopySuccessHint.style.display = "block";
                        setTimeout(() => dom.dueloCopySuccessHint.style.display = "none", 3000);
                    }
                });
            }
        });
    }
    if (dom.dueloShareLinkBtn) {
        dom.dueloShareLinkBtn.addEventListener("click", () => {
            const url = dom.dueloMagicLinkInput?.value || window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: "Duelo de Bolillero Luibañez",
                    text: `¡Unite a mi sala de estudio "${onlineDueloEstado.codigoSala}" en Luibañez!`,
                    url
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(url).then(() => {
                    alert("¡Enlace copiado al portapapeles listo para compartir!");
                });
            }
        });
    }
    if (dom.dueloLaunchOnlineMatchBtn) dom.dueloLaunchOnlineMatchBtn.addEventListener("click", iniciarCombateOnlineDesdeHost);
    if (dom.dueloLeaveOnlineRoomBtn) dom.dueloLeaveOnlineRoomBtn.addEventListener("click", salirDeSalaOnline);

    // Selector de Formato de Juego (Versus vs Cooperativo)
    if (dom.dueloOnlineModoSelect) {
        dom.dueloOnlineModoSelect.addEventListener("change", () => {
            const val = dom.dueloOnlineModoSelect.value;
            if (dom.dueloOnlineModoHint) {
                if (val === "coop") {
                    dom.dueloOnlineModoHint.textContent = "Colaboren en equipo para alcanzar 100 pts con 3 vidas compartidas y relevos de ayuda.";
                } else {
                    dom.dueloOnlineModoHint.textContent = "Compitan entre todos con podio en vivo y robo relámpago.";
                }
            }
        });
    }

    // Acciones de Relevo en Modo Cooperativo
    if (dom.dueloBtnRelevoCoop) {
        dom.dueloBtnRelevoCoop.addEventListener("click", () => {
            dom.dueloBtnRelevoCoop.disabled = true;
            publicarMensajeSala({
                tipo: "COOP_PEDIR_RELEVO",
                senderId: perfilUsuario.id,
                senderName: perfilUsuario.apodo
            });
            mostrarToast("🤝 ¡Pediste relevo al equipo! Esperando a que un compañero tome la posta...");
        });
    }

    if (dom.dueloAcceptRelevoBtn) {
        dom.dueloAcceptRelevoBtn.addEventListener("click", () => {
            if (dom.dueloRelevoPromptBox) dom.dueloRelevoPromptBox.classList.add("hidden");
            publicarMensajeSala({
                tipo: "COOP_TOMAR_RELEVO",
                relevoId: perfilUsuario.id,
                relevoNombre: perfilUsuario.apodo
            });
        });
    }

    // Controles del Orador (Terminar turno / Ceder turno)
    if (dom.dueloOradorFinishBtn) dom.dueloOradorFinishBtn.addEventListener("click", finalizarExposicionOralDesdeOrador);
    if (dom.dueloOradorConcedeBtn) dom.dueloOradorConcedeBtn.addEventListener("click", cederTurnoOradorDesdeOrador);

    // Votación Individual Online
    if (dom.dueloOnlineVote10Btn) dom.dueloOnlineVote10Btn.addEventListener("click", () => emitirVotoOnline(10));
    if (dom.dueloOnlineVote5Btn) dom.dueloOnlineVote5Btn.addEventListener("click", () => emitirVotoOnline(5));
    if (dom.dueloOnlineVote0Btn) dom.dueloOnlineVote0Btn.addEventListener("click", () => emitirVotoOnline(0));

    // Botón Host para Siguiente Ronda de Sorteo tras Votación
    if (dom.dueloHostNextSpinBtn) dom.dueloHostNextSpinBtn.addEventListener("click", hostAvanzarSiguienteRondaDuelo);

    // Robo Relámpago Online Pulsador
    if (dom.dueloOnlineBuzzerTriggerBtn) dom.dueloOnlineBuzzerTriggerBtn.addEventListener("click", tocarPulsadorRoboOnline);

    // Chat Multimedia
    if (dom.dueloChatToggleBtn) dom.dueloChatToggleBtn.addEventListener("click", toggleVentanaChat);
    if (dom.dueloChatCloseBtn) dom.dueloChatCloseBtn.addEventListener("click", toggleVentanaChat);
    if (dom.dueloChatForm) {
        dom.dueloChatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = dom.dueloChatTextInput?.value;
            enviarMensajeChat(val);
        });
    }
    if (dom.dueloChatPhotoBtn) {
        dom.dueloChatPhotoBtn.addEventListener("click", () => {
            if (dom.dueloChatPhotoInput) dom.dueloChatPhotoInput.click();
        });
    }
    if (dom.dueloChatPhotoInput) {
        dom.dueloChatPhotoInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const r = new FileReader();
                r.onload = ev => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        const maxW = 480;
                        const scale = Math.min(1, maxW / img.width);
                        canvas.width = img.width * scale;
                        canvas.height = img.height * scale;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const compressed = canvas.toDataURL("image/jpeg", 0.68);
                        enviarMensajeChat("", compressed, "");
                    };
                    img.src = ev.target.result;
                };
                r.readAsDataURL(file);
            }
        });
    }
    if (dom.dueloChatMicBtn) {
        dom.dueloChatMicBtn.addEventListener("click", () => {
            if (onlineDueloEstado.grabandoAudio) {
                detenerYEnviarGrabacionVoz();
            } else {
                iniciarGrabacionVoz();
            }
        });
    }
    if (dom.dueloVoiceCancelBtn) {
        dom.dueloVoiceCancelBtn.addEventListener("click", () => {
            if (onlineDueloEstado.mediaRecorder && onlineDueloEstado.mediaRecorder.state !== "inactive") {
                clearInterval(onlineDueloEstado.recIntervalId);
                onlineDueloEstado.mediaRecorder.stop();
                onlineDueloEstado.mediaRecorder.stream.getTracks().forEach(t => t.stop());
                if (dom.dueloVoiceRecordingBar) dom.dueloVoiceRecordingBar.classList.add("hidden");
                onlineDueloEstado.grabandoAudio = false;
            }
        });
    }
    if (dom.dueloVoiceSendBtn) {
        dom.dueloVoiceSendBtn.addEventListener("click", detenerYEnviarGrabacionVoz);
    }
    const quickEmojiBtns = document.querySelectorAll(".chat-quick-emoji-btn");
    quickEmojiBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            enviarMensajeChat(btn.dataset.emoji);
        });
    });
    if (dom.photoZoomCloseBtn) {
        dom.photoZoomCloseBtn.addEventListener("click", () => {
            if (dom.photoZoomModal) dom.photoZoomModal.close();
        });
    }


    if (dom.navDueloBtn) dom.navDueloBtn.addEventListener("click", () => cambiarVista("duelo"));
    if (dom.navFamaBtn) dom.navFamaBtn.addEventListener("click", () => cambiarVista("fama"));
    if (dom.openDueloFromCardBtn) dom.openDueloFromCardBtn.addEventListener("click", () => cambiarVista("duelo"));
    if (dom.openFamaFromCardBtn) dom.openFamaFromCardBtn.addEventListener("click", () => cambiarVista("fama"));

    // Lobby Duelo
    if (dom.dueloAddPlayerBtn) {
        dom.dueloAddPlayerBtn.addEventListener("click", () => {
            if (dom.dueloPlayerInput) agregarJugadorDuelo(dom.dueloPlayerInput.value);
        });
    }

    if (dom.dueloPlayerInput) {
        dom.dueloPlayerInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                agregarJugadorDuelo(dom.dueloPlayerInput.value);
            }
        });
    }

    if (dom.dueloPlayersChips) {
        dom.dueloPlayersChips.addEventListener("click", (e) => {
            const delBtn = e.target.closest(".duelo-player-chip__delete");
            if (delBtn) {
                const idx = parseInt(delBtn.dataset.idx, 10);
                eliminarJugadorDuelo(idx);
            }
        });
    }

    if (dom.dueloListaSelect) {
        dom.dueloListaSelect.addEventListener("change", () => {
            dueloEstado.config.listaId = dom.dueloListaSelect.value;
            const lista = estado.listas.find(l => l.id === dueloEstado.config.listaId);
            if (dom.dueloListaHint && lista) {
                dom.dueloListaHint.textContent = `${lista.temas.length} temas disponibles para la batalla.`;
            }
            guardarPreferenciasDuelo();
        });
    }

    if (dom.dueloMinutosInput) dom.dueloMinutosInput.addEventListener("change", actualizarTiempoTurnoLobby);
    if (dom.dueloSegundosInput) dom.dueloSegundosInput.addEventListener("change", actualizarTiempoTurnoLobby);

    const presetPills = document.querySelectorAll(".preset-pill");
    presetPills.forEach(pill => {
        pill.addEventListener("click", () => {
            presetPills.forEach(p => p.classList.remove("is-active"));
            pill.classList.add("is-active");
            const secs = parseInt(pill.dataset.seconds, 10);
            if (dom.dueloMinutosInput) dom.dueloMinutosInput.value = Math.floor(secs / 60);
            if (dom.dueloSegundosInput) dom.dueloSegundosInput.value = secs % 60;
            actualizarTiempoTurnoLobby();
        });
    });

    if (dom.dueloToggleAllComodinesBtn) {
        dom.dueloToggleAllComodinesBtn.addEventListener("click", toggleTodosLosComodines);
    }

    if (dom.dueloComodinSocorro) {
        dom.dueloComodinSocorro.addEventListener("change", () => {
            dueloEstado.config.comodines.socorro = dom.dueloComodinSocorro.checked;
            guardarPreferenciasDuelo();
        });
    }

    if (dom.dueloComodinPista) {
        dom.dueloComodinPista.addEventListener("change", () => {
            dueloEstado.config.comodines.pista = dom.dueloComodinPista.checked;
            guardarPreferenciasDuelo();
        });
    }

    if (dom.dueloComodinPaso) {
        dom.dueloComodinPaso.addEventListener("change", () => {
            dueloEstado.config.comodines.pasoRebote = dom.dueloComodinPaso.checked;
            guardarPreferenciasDuelo();
        });
    }

    if (dom.dueloReglaRacha) {
        dom.dueloReglaRacha.addEventListener("change", () => {
            dueloEstado.config.reglas.rachaFuego = dom.dueloReglaRacha.checked;
            guardarPreferenciasDuelo();
        });
    }

    if (dom.dueloReglaRobo) {
        dom.dueloReglaRobo.addEventListener("change", () => {
            dueloEstado.config.reglas.roboRelampago = dom.dueloReglaRobo.checked;
            guardarPreferenciasDuelo();
        });
    }

    if (dom.dueloStartBtn) dom.dueloStartBtn.addEventListener("click", iniciarDueloPartida);
    if (dom.dueloViewFamaFromLobbyBtn) dom.dueloViewFamaFromLobbyBtn.addEventListener("click", () => cambiarVista("fama"));

    // Arena Duelo
    if (dom.dueloSpinBtn) dom.dueloSpinBtn.addEventListener("click", girarDobleRuletaDuelo);
    if (dom.dueloEndMatchBtn) {
        dom.dueloEndMatchBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseás finalizar el duelo ahora y ver el podio de campeones?")) {
                finalizarDueloPartida(true);
            }
        });
    }

    if (dom.dueloTimerToggleBtn) dom.dueloTimerToggleBtn.addEventListener("click", toggleCronometroTurnoDuelo);
    if (dom.dueloQuickScratchpadBtn) dom.dueloQuickScratchpadBtn.addEventListener("click", toggleTarjetaScratchpad);
    if (dom.dueloQuickPomodoroBtn) dom.dueloQuickPomodoroBtn.addEventListener("click", abrirTarjetaPomodoro);

    if (dom.dueloBtnSocorro) dom.dueloBtnSocorro.addEventListener("click", usarComodinSocorro);
    if (dom.dueloBtnPista) dom.dueloBtnPista.addEventListener("click", usarComodinPista);
    if (dom.dueloBtnPaso) dom.dueloBtnPaso.addEventListener("click", usarComodinPaso);

    if (dom.dueloGradeImpecableBtn) dom.dueloGradeImpecableBtn.addEventListener("click", () => calificarTurnoDuelo("impecable"));
    if (dom.dueloGradeAyudaBtn) dom.dueloGradeAyudaBtn.addEventListener("click", () => calificarTurnoDuelo("ayuda"));
    if (dom.dueloGradePasoBtn) dom.dueloGradePasoBtn.addEventListener("click", () => calificarTurnoDuelo("paso"));

    if (dom.dueloThiefSuccessBtn) dom.dueloThiefSuccessBtn.addEventListener("click", () => calificarRoboRelampago(true));
    if (dom.dueloThiefFailBtn) dom.dueloThiefFailBtn.addEventListener("click", () => calificarRoboRelampago(false));

    // Salón de la Fama
    if (dom.famaPlayNewDueloBtn) dom.famaPlayNewDueloBtn.addEventListener("click", () => cambiarVista("duelo"));
    if (dom.famaClearHistoryBtn) dom.famaClearHistoryBtn.addEventListener("click", borrarHistorialCompleto);

    if (dom.famaMatchesGrid) {
        dom.famaMatchesGrid.addEventListener("click", (e) => {
            const copyBtn = e.target.closest(".fama-copy-btn");
            if (copyBtn) {
                copiarResumenPartida(copyBtn.dataset.id);
                return;
            }
            const delBtn = e.target.closest(".fama-del-btn");
            if (delBtn) {
                eliminarPartidaHistorial(delBtn.dataset.id);
            }
        });
    }

    // Modales de Duelo
    if (dom.victoryGoToFamaBtn) {
        dom.victoryGoToFamaBtn.addEventListener("click", () => {
            if (dom.dueloVictoryModal) dom.dueloVictoryModal.close();
            cambiarVista("fama");
        });
    }

    if (dom.victoryCloseBtn) {
        dom.victoryCloseBtn.addEventListener("click", () => {
            if (dom.dueloVictoryModal) dom.dueloVictoryModal.close();
        });
    }

    if (dom.dueloCancelSocorroBtn) {
        dom.dueloCancelSocorroBtn.addEventListener("click", () => {
            if (dom.dueloSocorroModal) dom.dueloSocorroModal.close();
        });
    }

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "");
        const normalized = (hash === "duelo" || hash === "juntos") ? "juntos" : hash;
        if (["solo", "juntos", "bolillero", "fama", "home"].includes(normalized)) {
            if (normalized !== estado.interfaz.vistaActual) {
                cambiarVista(normalized);
            }
        }
    });

    window.addEventListener("storage", () => {
        try {
            cargarDatos();
            reconstruirBolillero();
            render();
            cargarConfigPomodoro();
            renderPomodoro();
            actualizarDropdownListasDuelo();
            renderSalonDeLaFama();
        } catch (error) {
            console.error(error);
        }
    });
}

function iniciarAplicacion() {
    try { inicializarTema(); } catch (e) { console.error("Error tema:", e); }
    try { inicializarModoRendimiento(); } catch (e) { console.error("Error rendimiento:", e); }
    try { inicializarModoDev(); } catch (e) { console.error("Error modo dev:", e); }
    try { cargarDatos(); } catch (e) { console.error("Error cargar datos:", e); }
    try { cargarPerfilUsuario(); } catch (e) { console.error("Error cargar perfil:", e); }
    try { reconstruirBolillero(); } catch (e) { console.error("Error reconstruir bolillero:", e); }
    try { cargarConfigPomodoro(); } catch (e) { console.error("Error cargar pomodoro:", e); }
    try { render(); } catch (e) { console.error("Error render:", e); }
    try { renderPomodoro(); } catch (e) { console.error("Error render pomodoro:", e); }
    try { inicializarTarjetaFlotante(); } catch (e) { console.error("Error tarjeta flotante:", e); }
    try { inicializarDueloLobby(); } catch (e) { console.error("Error duelo lobby:", e); }
    try { renderSalonDeLaFama(); } catch (e) { console.error("Error salon de la fama:", e); }
    try { inicializarDrawerMenu(); } catch (e) { console.error("Error drawer menu:", e); }
    try { registrarEventos(); } catch (e) { console.error("Error registrar eventos:", e); }
    try { inicializarRutas(); } catch (e) { console.error("Error inicializar rutas:", e); }

    // Detección de link mágico de sala online (?room=XXXX o #duelo?room=XXXX)
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get("room") || (window.location.hash.includes("room=") ? window.location.hash.split("room=")[1] : null);
    if (roomFromUrl) {
        cambiarVista("duelo");
        cambiarModoDueloLobby("online");
        if (dom.dueloJoinRoomCode) {
            dom.dueloJoinRoomCode.value = roomFromUrl.toUpperCase();
        }
        if (dom.dueloJoinByPinModal) {
            dom.dueloJoinByPinModal.showModal();
        }
    }

    // =========================================================
    // REGISTRO Y GESTOR DE ACTUALIZACIÓN AUTOMÁTICA PWA
    // =========================================================
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            let refreshing = false;
            // Cuando un nuevo Service Worker toma el control, recargar automáticamente sin tocar Ctrl+F5
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (!refreshing) {
                    refreshing = true;
                    console.log("[PWA] Nuevo Service Worker activado. Recargando automáticamente...");
                    window.location.reload();
                }
            });

            navigator.serviceWorker.register(`./sw.js?v=${APP_BUILD_VERSION}`, { updateViaCache: "none" })
                .then(reg => {
                    console.log("Service Worker Luibañez activo:", reg.scope);
                    reg.update();

                    if (reg.waiting) {
                        reg.waiting.postMessage({ type: "SKIP_WAITING" });
                    }

                    reg.addEventListener("updatefound", () => {
                        const newWorker = reg.installing;
                        if (newWorker) {
                            newWorker.addEventListener("statechange", () => {
                                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                                    console.log("[PWA] Nueva versión disponible. Activando inmediatamente...");
                                    newWorker.postMessage({ type: "SKIP_WAITING" });
                                }
                            });
                        }
                    });
                })
                .catch(err => {
                    console.warn("Fallo al registrar Service Worker:", err);
                });
        });

        // Al cambiar de pestaña o volver a la app en celular/PC, verificar actualizaciones
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                verificarActualizacionesDisponibles(true);
                navigator.serviceWorker.getRegistration().then(reg => {
                    if (reg) reg.update();
                }).catch(() => {});
            }
        });

        // Chequeo periódico en segundo plano cada 5 minutos
        setInterval(() => {
            verificarActualizacionesDisponibles(true);
        }, 5 * 60 * 1000);
    }

    // Vincular botón manual de actualización rápida en el menú lateral
    const btnForzarActualizar = document.getElementById("btnForzarActualizar");
    if (btnForzarActualizar) {
        btnForzarActualizar.addEventListener("click", () => {
            forzarActualizacionCompleta(true);
        });
    }
    const drawerVersionTag = document.getElementById("drawerVersionTag");
    if (drawerVersionTag) {
        drawerVersionTag.innerHTML = `⚡ Luibañez <strong style="color: var(--color-text);">v${APP_BUILD_VERSION}</strong>`;
        drawerVersionTag.addEventListener("click", () => {
            forzarActualizacionCompleta(true);
        });
    }

    // Vincular botones de Reglas y Cómo Jugar
    if (dom.bolilleroRulesBtn) {
        dom.bolilleroRulesBtn.addEventListener("click", () => abrirModalReglas("bolillero"));
    }
    if (dom.juegosRulesBtn) {
        dom.juegosRulesBtn.addEventListener("click", () => abrirModalReglas(juegosEduEstado.juegoActual || "bomba"));
    }
    if (dom.soloRulesBtn) {
        dom.soloRulesBtn.addEventListener("click", () => abrirModalReglas("solo"));
    }
    if (dom.pdfHubRulesBtn) {
        dom.pdfHubRulesBtn.addEventListener("click", () => abrirModalReglas("apuntes"));
    }
    if (dom.rulesModalCloseBtn) {
        dom.rulesModalCloseBtn.addEventListener("click", cerrarModalReglas);
    }
    if (dom.rulesModalUnderstoodBtn) {
        dom.rulesModalUnderstoodBtn.addEventListener("click", cerrarModalReglas);
    }
    if (dom.rulesModal) {
        dom.rulesModal.addEventListener("click", (e) => {
            if (e.target === dom.rulesModal) cerrarModalReglas();
        });
        dom.rulesModal.addEventListener("cancel", (e) => {
            e.preventDefault();
            cerrarModalReglas();
        });
    }

    // Chequeo de versión inmediato
    verificarActualizacionesDisponibles(true);
}

// =========================================================
// GESTOR DE VERSIONES Y ACTUALIZACIÓN AUTOMÁTICA
// =========================================================
const APP_BUILD_VERSION = "26.0";

async function forzarActualizacionCompleta(mostrarNotificacion = true) {
    if (mostrarNotificacion && typeof mostrarToast === "function") {
        mostrarToast("🔄 Actualizando Luibañez a la última versión...", "info");
    }

    try {
        if ("serviceWorker" in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
            }
        }

        if ("caches" in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
        }

        setTimeout(() => {
            const cleanUrl = window.location.href.split("?")[0] + "?_v=" + Date.now();
            window.location.replace(cleanUrl);
        }, 300);
    } catch (err) {
        console.warn("Error al forzar actualización:", err);
        window.location.reload();
    }
}

async function verificarActualizacionesDisponibles(silencioso = true) {
    if (!navigator.onLine) return;

    try {
        const resp = await fetch(`./version.json?_t=${Date.now()}`, { cache: "no-store" });
        if (resp.ok) {
            const data = await resp.json();
            if (data.version && data.version !== APP_BUILD_VERSION) {
                console.log(`[Auto-Update] Nueva versión en servidor: ${data.version} (actual: ${APP_BUILD_VERSION}). Actualizando...`);
                await forzarActualizacionCompleta(!silencioso);
            }
        }
    } catch (err) {
        // En offline continúa sin interrumpir
    }
}

// =========================================================
// SISTEMA DE REGLAS E INSTRUCCIONES RÁPIDAS DE JUEGOS
// =========================================================
const REGLAS_DATA = {
    bolillero: {
        icono: "🎲",
        titulo: "Bolillero Individual",
        subtitulo: "Simulador interactivo de exámenes orales",
        objetivo: "Sortear o seleccionar temas de estudio para entrenar tu oratoria y responder preguntas teóricas simuladas por IA como en un examen final universitario.",
        dinamica: [
            "Podés sortear al azar o hacer clic directamente en cualquier tarjeta de la cuadrícula para seleccionarla manualmente.",
            "Al tener un tema seleccionado, la IA de Gemini puede formularte una pregunta oral de examen para evaluar tus conceptos."
        ],
        botones: [
            { badge: "GIRAR RULETA (Espacio)", desc: "Inicia el sorteo aleatorio con animación de desaceleración gradual." },
            { badge: "👆 Clic en Tarjeta", desc: "Selecciona una palabra específica de la cuadrícula para estudiarla de inmediato." },
            { badge: "✨ Preguntar con IA", desc: "Genera una pregunta oral con Google Gemini sobre el tema activo." },
            { badge: "🤖 + IA Palabras", desc: "Analiza el PDF cargado de punta a punta y extrae automáticamente los conceptos que elijas." },
            { badge: "📂 Importar / + Nueva", desc: "Permite importar archivos de texto (.txt) o crear nuevas listas temáticas." }
        ],
        tip: "Practicá explicando el tema en voz alta durante 2 minutos de corrido antes de consultar la pregunta con IA."
    },
    bomba: {
        icono: "💣",
        titulo: "Desactivá la Bomba",
        subtitulo: "Desafío de tensión y precisión conceptual",
        objetivo: "Desarmar el explosivo cortando el cable correcto en cada una de las 3 fases conceptuales antes de que el cronómetro llegue a 00:00.",
        dinamica: [
            "El artefacto tiene 3 fases: Fundamentos Teóricos, Deducción Lógica y Síntesis Maestra.",
            "Tenés 90 segundos en total para completar las 3 fases.",
            "Cada error genera un chispazo eléctrico ⚡ y te resta una vida/fase. Al tercer fallo, la bomba explota."
        ],
        botones: [
            { badge: "✂️ Cables de Colores", desc: "Cada cable representa una respuesta teórica. Tocá el que creas que contiene la afirmación correcta." },
            { badge: "💥 Detonación (2.5s)", desc: "Si explota, la pantalla tiembla 2.5s, guarda tus puntos en el Salón de la Fama y vuelve al menú." },
            { badge: "🔄 Jugar de nuevo", desc: "Genera una nueva partida con preguntas y respuestas 100% inéditas y balanceadas desde el PDF." }
        ],
        tip: "Todas las respuestas tienen una longitud similar para evitar patrones obvios; leé con atención conceptual cada opción."
    },
    impostor: {
        icono: "🕵️‍♂️",
        titulo: "Caza al Impostor",
        subtitulo: "Detección de falacias y errores teóricos",
        objetivo: "Analizar el expediente y las 4 afirmaciones teóricas en pantalla para identificar y atrapar a la única afirmación falsa o impostora.",
        dinamica: [
            "3 de las afirmaciones son postulados o definiciones verdaderas del material de estudio, y 1 sola contiene un error conceptual infiltrado.",
            "Ganás más puntos por responder con rapidez y por mantener una racha de casos resueltos sin fallar."
        ],
        botones: [
            { badge: "⏱️ Tiempo (10s a 30s)", desc: "Configurá cuánto tiempo querés por ronda según la dificultad que prefieras antes de comenzar." },
            { badge: "📋 Rondas (3 a 10)", desc: "Elegí la cantidad de casos que tendrá tu expediente de investigación." },
            { badge: "🚀 Comenzar Investigación", desc: "Inicia la partida con el cronómetro sincronizado." },
            { badge: "🃏 Tarjetas de Afirmación", desc: "Tocá la que consideres impostora para revelar insignias y la explicación pedagógica." }
        ],
        tip: "Desconfiá de términos absolutos como 'siempre', 'nunca' o de causas y efectos invertidos en las definiciones."
    },
    memotest: {
        icono: "🧠",
        titulo: "Memotest Conectado",
        subtitulo: "Conexión de términos y definiciones",
        objetivo: "Conectar pares conceptuales encontrando qué tarjeta de Término / Concepto corresponde a cada tarjeta de Definición en el menor tiempo e intentos posibles.",
        dinamica: [
            "Todas las cartas inician boca abajo en la cuadrícula.",
            "Volteá 2 cartas por turno: si unís un concepto con su definición correcta, quedan unidas en verde permanentemente.",
            "Completá todos los pares para registrar tu marca en el Salón de la Fama."
        ],
        botones: [
            { badge: "🃏 Cartas Boca Abajo", desc: "Hacé clic para revelar su contenido conceptual." },
            { badge: "⏱️ Cronómetro e Intentos", desc: "Miden tu memoria operativa para el cálculo del puntaje final." },
            { badge: "🔄 Reiniciar", desc: "Vuelve a barajar los pares en nuevas posiciones aleatorias." }
        ],
        tip: "Fijate en las palabras clave del concepto para asociarlas rápidamente en cuanto leas las primeras líneas de la definición."
    },
    solo: {
        icono: "👤",
        titulo: "Modo Estudiar Solo",
        subtitulo: "Entrenamiento individual a tu propio ritmo",
        objetivo: "Acceder a las herramientas individuales de práctica para dominar tu materia: Bolillero de oral, Bomba teórica, Impostor y Memotest.",
        dinamica: [
            "Elegí el modo que mejor se adapte a tu objetivo del día: oratoria (Bolillero), agilidad conceptual (Bomba), pensamiento crítico (Impostor) o memoria y asociación (Memotest)."
        ],
        botones: [
            { badge: "🎲 Abrir Bolillero", desc: "Simula el sorteo de temas de examen oral frente a tribunal." },
            { badge: "💣 Practicar Bomba", desc: "Responde 3 fases teóricas bajo la presión del reloj." },
            { badge: "🕵️‍♂️ Cazar Impostor", desc: "Descubrí cuál de las 4 opciones es falsa en cada caso." },
            { badge: "🧠 Memotest Conectado", desc: "Asocia conceptos y definiciones en pares." }
        ],
        tip: "Cargá primero tu PDF en el Inicio para que todos los juegos usen el contenido exacto de tu cátedra."
    },
    apuntes: {
        icono: "📚",
        titulo: "Centro de Apuntes & IA",
        subtitulo: "El corazón de contenido de Luibañez",
        objetivo: "Cargar una sola vez el PDF de tu materia (resumen, programa o libro) para que la IA de Gemini alimente automáticamente todos los juegos.",
        dinamica: [
            "El archivo se procesa de manera privada y segura en tu navegador con PDF.js.",
            "Gemini recorre el 100% de las páginas del apunte (inicio, medio y final) para extraer conceptos equitativos.",
            "Una vez cargado, queda conectado y listo para usar en el Bolillero, la Bomba, el Impostor y el Memotest."
        ],
        botones: [
            { badge: "📄 Cargar PDF", desc: "Sube tu archivo de apuntes (.pdf o .txt)." },
            { badge: "🔄 Cambiar PDF", desc: "Reemplaza el material cuando pases a otra materia o unidad." },
            { badge: "✕ Quitar Material", desc: "Vuelve al banco de preguntas base predeterminado." }
        ],
        tip: "Cuanto más estructurado esté tu apunte con subtítulos y definiciones, más ricas serán las preguntas generadas."
    }
};

let reglaActualClave = "bolillero";
let juegoPausadoPorReglas = null;

function abrirModalReglas(gameKey) {
    const data = REGLAS_DATA[gameKey] || REGLAS_DATA.bolillero;
    reglaActualClave = gameKey;

    if (dom.rulesModalIcon) dom.rulesModalIcon.textContent = data.icono;
    if (dom.rulesModalTitle) dom.rulesModalTitle.textContent = `Reglas: ${data.titulo}`;
    if (dom.rulesModalSubtitle) dom.rulesModalSubtitle.textContent = data.subtitulo;

    if (dom.rulesModalBody) {
        let dinamicaHtml = data.dinamica.map(d => `<li>${d}</li>`).join("");
        let botonesHtml = data.botones.map(b => `
            <li style="margin-bottom: 0.45rem;">
                <span class="rules-btn-badge">${b.badge}</span>
                <span style="margin-left: 0.35rem; color: #cbd5e1;">${b.desc}</span>
            </li>
        `).join("");

        dom.rulesModalBody.innerHTML = `
            <div class="rules-card rules-card--highlight">
                <div class="rules-card__title">🎯 Objetivo</div>
                <p style="margin: 0; color: #e2e8f0; line-height: 1.45;">${data.objetivo}</p>
            </div>

            <div class="rules-card">
                <div class="rules-card__title">📜 ¿Cómo se juega?</div>
                <ul class="rules-list">${dinamicaHtml}</ul>
            </div>

            <div class="rules-card">
                <div class="rules-card__title">🎮 Botones y Controles Clave</div>
                <ul class="rules-list" style="list-style: none; padding-left: 0;">${botonesHtml}</ul>
            </div>

            <div class="rules-card" style="background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.25);">
                <div class="rules-card__title" style="color: #fbbf24;">💡 Consejo Pro</div>
                <p style="margin: 0; color: #fde68a; line-height: 1.45; font-size: 0.86rem;">${data.tip}</p>
            </div>
        `;
    }

    if (dom.rulesDontShowAgainCheckbox) {
        dom.rulesDontShowAgainCheckbox.checked = localStorage.getItem("luibanez_rules_dont_show_" + gameKey) === "true";
    }

    // Pausar temporizador de la bomba si está activa en segundo plano
    if (gameKey === "bomba" && juegosEduEstado.bomba && juegosEduEstado.bomba.activo && juegosEduEstado.bomba.timerId) {
        clearInterval(juegosEduEstado.bomba.timerId);
        juegoPausadoPorReglas = "bomba";
    }

    if (dom.rulesModal) {
        if (typeof dom.rulesModal.showModal === "function") {
            dom.rulesModal.showModal();
        } else {
            dom.rulesModal.setAttribute("open", "");
        }
    }
}

function cerrarModalReglas() {
    if (dom.rulesDontShowAgainCheckbox && reglaActualClave) {
        if (dom.rulesDontShowAgainCheckbox.checked) {
            localStorage.setItem("luibanez_rules_dont_show_" + reglaActualClave, "true");
        } else {
            localStorage.removeItem("luibanez_rules_dont_show_" + reglaActualClave);
        }
    }

    if (dom.rulesModal) {
        if (typeof dom.rulesModal.close === "function") {
            dom.rulesModal.close();
        } else {
            dom.rulesModal.removeAttribute("open");
        }
    }

    // Reanudar temporizador si estaba pausado
    if (juegoPausadoPorReglas === "bomba" && juegosEduEstado.bomba && juegosEduEstado.bomba.activo && juegosEduEstado.bomba.tiempoRestante > 0) {
        juegosEduEstado.bomba.timerId = setInterval(() => {
            juegosEduEstado.bomba.tiempoRestante--;
            actualizarTimerBombaDisplay();
            if (juegosEduEstado.bomba.tiempoRestante <= 0) {
                clearInterval(juegosEduEstado.bomba.timerId);
                detonarBomba("¡Se agotó el tiempo! La bomba explotó.");
            }
        }, 1000);
    }
    juegoPausadoPorReglas = null;
}

function comprobarYMostrarReglas(gameKey) {
    if (localStorage.getItem("luibanez_rules_dont_show_" + gameKey) !== "true") {
        setTimeout(() => {
            abrirModalReglas(gameKey);
        }, 300);
    }
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);
/* =========================================================
   MÓDULO LUIBAÑEZ v5: PROMPT DE GEMINI IA & GENERADOR DE JUEGOS
   ========================================================= */

const GEMINI_MEGA_PROMPT = `Actúa como un profesor universitario experto y diseñador de contenido pedagógico para la plataforma educativa interactiva "Luibañez".
A continuación te adjunto el PDF con los apuntes / unidad / materia de estudio.

Tu tarea es analizar exhaustivamente el PDF adjunto y extraer todo el conocimiento en un bloque JSON válido, optimizado para alimentar el Bolillero y los 3 juegos educativos (Desactivá la Bomba, Caza al Impostor y Memotest Conectado).

RESPONDE ÚNICAMENTE CON EL BLOQUE JSON SIGUIENTE (sin texto previo ni posterior, en formato JSON válido):

{
  "titulo": "Nombre de la Materia o Unidad",
  "descripcion": "Resumen conciso del contenido del PDF",
  "temas": [
    {
      "nombre": "Tema 1: Nombre del Concepto o Unidad",
      "descripcion": "Explicación detallada del concepto para estudiar",
      "bomba": {
        "fase1": {
          "pregunta": "¿Cuál es el principio teórico o postulado fundamental aplicable a este tema?",
          "opciones": ["Principio rector verdadero", "Distractor conceptual 1", "Distractor conceptual 2", "Distractor conceptual 3"],
          "respuestaCorrecta": 0,
          "explicacion": "Explicación teórica del fundamento."
        },
        "fase2": {
          "contexto": "Premisa analítica de causa-efecto o relación conceptual sobre el tema.",
          "pregunta": "¿Qué deducción teórica se desprende según los fundamentos de la materia?",
          "opciones": ["Deducción conceptual correcta", "Conclusión errónea 1", "Conclusión errónea 2", "Conclusión errónea 3"],
          "respuestaCorrecta": 0,
          "explicacion": "Explicación de la deducción conceptual."
        },
        "fase3": {
          "desafioMaestro": "Clave Maestra de Síntesis: identifica la afirmación integradora definitiva sobre el tema.",
          "pregunta": "¿Cuál es la síntesis conceptual que desactiva el detonador?",
          "opciones": ["Síntesis integradora definitiva", "Aseveración falaz 1", "Aseveración falaz 2", "Aseveración falaz 3"],
          "respuestaCorrecta": 0,
          "explicacion": "Explicación de la síntesis maestra."
        }
      },
      "impostor": {
        "afirmacionesVerdaderas": [
          "Afirmación o propiedad verdadera 1",
          "Afirmación o propiedad verdadera 2",
          "Afirmación o propiedad verdadera 3"
        ],
        "afirmacionImpostora": "Afirmación falsa con error sutil infiltrado",
        "explicacionError": "Por qué es falsa"
      },
      "memotest": {
        "concepto": "Concepto o Ley clave",
        "definicionOFormula": "Definición o Fórmula exacta correspondiente"
      }
    }
  ]
}`;

function copiarPromptGemini() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(GEMINI_MEGA_PROMPT).then(() => {
            mostrarToast("✨ ¡Prompt para Gemini copiado al portapapeles! Pegalo en gemini.google.com");
        }).catch(() => {
            mostrarToast("📋 Copiá el prompt desde la ventana");
        });
    }

    if (dom.geminiPromptTextarea) {
        dom.geminiPromptTextarea.value = GEMINI_MEGA_PROMPT;
    }
    if (dom.geminiPromptModal) {
        if (typeof dom.geminiPromptModal.showModal === "function") {
            dom.geminiPromptModal.showModal();
        } else {
            dom.geminiPromptModal.setAttribute("open", "true");
        }
    }
}

// Generador procedimental de datos educativos para cualquier lista simple que no tenga preguntas
function asegurarDatosJuegoTema(tema, index) {
    if (!tema) return null;
    const nombre = tema.nombre || `Tema ${index + 1}`;
    const desc = tema.descripcion || "Concepto clave del programa de estudio.";

    // Bomba 100% Teórica
    if (!tema.bomba) {
        tema.bomba = {
            fase1: {
                pregunta: `¿Cuál es el principio teórico o postulado fundamental aplicable a "${nombre}"?`,
                opciones: [
                    `Principio rector: las propiedades esenciales de ${nombre} determinan su comportamiento sistémico.`,
                    `Postulado contradictorio: las propiedades de ${nombre} operan de forma arbitraria sin leyes.`,
                    `Hipótesis nula: los efectos de ${nombre} se anulan completamente en cualquier escenario.`,
                    `Axioma invertido: los factores externos no guardan ninguna correlación con ${nombre}.`
                ],
                respuestaCorrecta: 0,
                explicacion: `El principio rector establece las propiedades fundamentales de ${nombre}.`
            },
            fase2: {
                contexto: `Premisa de análisis conceptual: considerando un escenario donde las condiciones de "${nombre}" se intensifican progresivamente.`,
                pregunta: `¿Qué deducción teórica se desprende según los fundamentos de la materia?`,
                opciones: [
                    `Se produce una respuesta proporcional consistente con la ley de conservación del sistema.`,
                    `Se genera un colapso súbito del sistema sin admitir regulación conceptual alguna.`,
                    `La alteración observada resulta enteramente indiferente para el balance global del modelo.`,
                    `Se invierten espontáneamente los principios rectores aceptados por la comunidad científica.`
                ],
                respuestaCorrecta: 0,
                explicacion: `La respuesta proporcional mantiene la coherencia y equilibrio teórico del sistema.`
            },
            fase3: {
                desafioMaestro: `Clave Maestra de Síntesis: para cortar el detonador principal, identifica la afirmación integradora definitiva sobre "${nombre}".`,
                pregunta: `¿Cuál es la síntesis conceptual que desactiva el detonador?`,
                opciones: [
                    `La integración metodológica de ${nombre} unifica la teoría con la deducción rigurosa.`,
                    `La síntesis teórica descarta por completo los axiomas validados en fases previas.`,
                    `La conclusión analítica descarta la existencia de principios aplicables a este dominio.`,
                    `El modelo conceptual carece de consistencia cuando se evalúa en condiciones operativas.`
                ],
                respuestaCorrecta: 0,
                explicacion: `La integración metodológica valida el dominio completo del concepto y desactiva el detonador.`
            }
        };
    }

    // Impostor
    if (!tema.impostor) {
        tema.impostor = {
            afirmacionesVerdaderas: [
                `"${nombre}" es un concepto troncal que se relaciona directamente con los fundamentos de la materia.`,
                `El análisis de "${nombre}" requiere considerar sus variables operativas y propiedades clave.`,
                `La correcta aplicación de "${nombre}" optimiza la precisión en la resolución práctica.`
            ],
            afirmacionImpostora: `"${nombre}" carece de validez metodológica y nunca debe aplicarse en condiciones normales.`,
            explicacionError: `Esta afirmación es un error conceptual: "${nombre}" es precisamente una herramienta central válida y fundamental.`
        };
    }

    // Memotest
    if (!tema.memotest) {
        tema.memotest = {
            concepto: nombre,
            definicionOFormula: desc.length > 60 ? desc.slice(0, 57) + "..." : desc
        };
    }

    return tema;
}

/* =========================================================
   ESTADO GLOBAL DE LOS JUEGOS EDUCATIVOS
   ========================================================= */
const juegosEduEstado = {
    juegoActual: null, // "bomba" | "impostor" | "memotest" | "triatlon"
    modo: "solo", // "solo" | "versus" | "coop" | "desempate"
    listaId: null,
    temas: [],
    temaIndice: 0,
    triatlon: {
        rondaActual: 1,
        puntosTotal: 0,
        scores: [0, 0, 0]
    },
    bomba: {
        activo: false,
        tiempoRestante: 90,
        fase: 1,
        fallos: 0,
        timerId: null
    },
    impostor: {
        activo: false,
        ola: 1,
        maxOlas: 5,
        racha: 1,
        puntaje: 0,
        tiempoOla: 15,
        tiempoRestanteMs: 15000,
        timerId: null,
        impostorIndex: 0,
        casosPool: [],
        comodines: {
            pista5050: 1,
            tiempoExtra: 1,
            radarSocorro: 1
        }
    },
    memotest: {
        activo: false,
        cartas: [],
        primeraCarta: null,
        bloqueado: false,
        paresEncontrados: 0,
        totalPares: 6,
        movimientos: 0,
        segundos: 0,
        timerId: null
    }
};

/* =========================================================
   LANZADOR CENTRAL DE JUEGOS EDUCATIVOS
   ========================================================= */
async function abrirArenaJuego(tipoJuego, modo, listaId = null, forzarNuevas = false) {
    juegosEduEstado.juegoActual = tipoJuego;
    juegosEduEstado.modo = modo || "solo";
    
    // Lista de temas o fallback automático para usuarios nuevos y amigos
    const apunteActivo = apuntesEstado[tipoJuego] || apuntesEstado.global;
    let lista = estado.listas.find(l => l.id === listaId) || estado.listas[0];

    // Si el usuario no tiene una lista en localStorage, creamos un banco temático base para que NUNCA lo mande al bolillero
    if (!lista || !lista.temas || lista.temas.length === 0) {
        const nombreMateria = (apunteActivo && apunteActivo.nombre) 
            ? apunteActivo.nombre.replace(/\.pdf$/i, '') 
            : "Materia de Estudio";
        lista = {
            id: "lista_auto_educativa",
            titulo: nombreMateria,
            nombre: nombreMateria,
            temas: [
                { id: "t1", nombre: "Fundamentos y Principios Clave", descripcion: "Bases teóricas y postulados esenciales." },
                { id: "t2", nombre: "Modelos Analíticos y Relaciones", descripcion: "Estructuras conceptuales y propiedades generales." },
                { id: "t3", nombre: "Condiciones de Borde y Restricciones", descripcion: "Casos límite y consideraciones metodológicas." },
                { id: "t4", nombre: "Análisis Crítico y Demostraciones", descripcion: "Validación de postulados e implicaciones teóricas." },
                { id: "t5", nombre: "Síntesis Conceptual y Criterios", descripcion: "Integración de variables y reglas fundamentales." }
            ]
        };
    }

    juegosEduEstado.listaId = lista.id;
    juegosEduEstado.temas = lista.temas.map((t, idx) => asegurarDatosJuegoTema(t, idx));
    juegosEduEstado.temaIndice = Math.floor(Math.random() * juegosEduEstado.temas.length);

    // Si se fuerzan nuevas preguntas (reintento / replay), limpiar preguntas previas
    if (forzarNuevas) {
        const temaAct = juegosEduEstado.temas[juegosEduEstado.temaIndice];
        if (temaAct) temaAct.bomba = null;
        if (tipoJuego === "impostor") juegosEduEstado.impostor.casosPool = [];
    }

    // Actualizar Topbar
    if (dom.juegosGameSubtitle) {
        dom.juegosGameSubtitle.textContent = `Materia: ${lista.titulo || lista.nombre}`;
    }
    if (dom.juegosModeBadge) {
        const modoLabels = {
            solo: "👤 Práctica Solo",
            versus: "⚔️ Versus Online",
            coop: "🤝 Cooperativo Online",
            desempate: "⚡ Desempate Relámpago"
        };
        dom.juegosModeBadge.textContent = modoLabels[juegosEduEstado.modo] || "👤 Solo";
        dom.juegosModeBadge.className = `badge ${juegosEduEstado.modo === 'coop' ? 'badge--accent' : juegosEduEstado.modo === 'versus' ? 'badge--warning' : 'badge--success'}`;
    }

    // Ocultar todas las arenas
    if (dom.arenaBomba) dom.arenaBomba.classList.add("hidden");
    if (dom.arenaImpostor) dom.arenaImpostor.classList.add("hidden");
    if (dom.arenaMemotest) dom.arenaMemotest.classList.add("hidden");
    if (dom.triatlonProgressBar) dom.triatlonProgressBar.classList.add("hidden");

    cambiarVista("juegos");

    // Para Caza al Impostor: mostrar de inmediato el panel de configuración sin bloquear con overlay
    if (tipoJuego === "impostor") {
        iniciarImpostor(modo);
        if (apunteActivo && apunteActivo.texto) {
            enriquecerJuegoActualConIA(false).then(() => {
                actualizarSetupImpostorUI();
            }).catch(console.warn);
        }
        comprobarYMostrarReglas("impostor");
        return;
    }

    // Para Bomba y otros juegos con PDF: mostrar overlay mientras Gemini genera preguntas
    if (apunteActivo && apunteActivo.texto) {
        mostrarOverlayCargandoJuegoIA(true, tipoJuego);
        try {
            await enriquecerJuegoActualConIA(false);
        } catch (err) {
            console.warn("Fallo al pregenerar con IA:", err);
        } finally {
            mostrarOverlayCargandoJuegoIA(false);
        }
    }

    // Iniciar la arena del juego con el cronómetro comenzando sincronizado al 100%
    if (tipoJuego === "triatlon") {
        iniciarTriatlon(modo);
    } else if (tipoJuego === "bomba") {
        iniciarBomba(modo);
    } else if (tipoJuego === "memotest") {
        iniciarMemotest(modo);
    }

    comprobarYMostrarReglas(tipoJuego);
}

/* =========================================================
   JUEGO 1: 💣 DESACTIVÁ LA BOMBA (100% TEÓRICA & CONCEPTUAL)
   ========================================================= */
function iniciarBomba(modo) {
    if (!dom.arenaBomba) return;
    dom.arenaBomba.classList.remove("hidden");
    if (dom.juegosGameIcon) dom.juegosGameIcon.textContent = "💣";
    if (dom.juegosGameTitle) dom.juegosGameTitle.textContent = "Desactivá la Bomba";

    const b = juegosEduEstado.bomba;
    b.activo = true;
    b.tiempoRestante = modo === "coop" ? 120 : 90;
    b.fase = 1;
    b.fallos = 0;

    clearInterval(b.timerId);

    const tema = juegosEduEstado.temas[juegosEduEstado.temaIndice] || juegosEduEstado.temas[0];

    // UI Wires & Reset de animaciones
    const casing = document.querySelector(".bomba-casing");
    if (casing) casing.classList.remove("bomba-defused-success");
    if (dom.bombaLcdScreen) dom.bombaLcdScreen.classList.remove("bomba-glitching");
    if (dom.bombaWireSlot1) dom.bombaWireSlot1.classList.remove("is-cut");
    if (dom.bombaWireSlot2) dom.bombaWireSlot2.classList.remove("is-cut");
    if (dom.bombaWireSlot3) dom.bombaWireSlot3.classList.remove("is-cut");
    actualizarCablesBomba();

    // UI LCD
    if (dom.bombaFase1View) dom.bombaFase1View.classList.remove("hidden");
    if (dom.bombaFase2View) dom.bombaFase2View.classList.add("hidden");
    if (dom.bombaFase3View) dom.bombaFase3View.classList.add("hidden");
    if (dom.bombaResultView) dom.bombaResultView.classList.add("hidden");

    if (dom.arenaBomba) dom.arenaBomba.classList.remove("bomba-exploding");

    renderFase1Bomba(tema);
    actualizarTimerBombaDisplay();

    b.timerId = setInterval(() => {
        b.tiempoRestante--;
        actualizarTimerBombaDisplay();
        if (b.tiempoRestante <= 0) {
            clearInterval(b.timerId);
            detonarBomba("¡Se agotó el tiempo! La bomba explotó.");
        }
    }, 1000);
}

function actualizarTimerBombaDisplay() {
    const tiempo = Math.max(0, juegosEduEstado.bomba.tiempoRestante);
    const m = Math.floor(tiempo / 60);
    const s = tiempo % 60;
    if (dom.bombaMinutes) dom.bombaMinutes.textContent = String(m).padStart(2, "0");
    if (dom.bombaSeconds) dom.bombaSeconds.textContent = String(s).padStart(2, "0");

    // Reactividad de la mecha LED y reloj digital
    if (dom.bombaPulseStrip) {
        if (tiempo <= 10) {
            dom.bombaPulseStrip.className = "bomba-pulse-strip is-critical";
            if (dom.bombaTimerDisplay) {
                dom.bombaTimerDisplay.classList.add("is-critical");
                dom.bombaTimerDisplay.classList.remove("is-warning");
            }
        } else if (tiempo <= 30) {
            dom.bombaPulseStrip.className = "bomba-pulse-strip is-warning";
            if (dom.bombaTimerDisplay) {
                dom.bombaTimerDisplay.classList.add("is-warning");
                dom.bombaTimerDisplay.classList.remove("is-critical");
            }
        } else {
            dom.bombaPulseStrip.className = "bomba-pulse-strip";
            if (dom.bombaTimerDisplay) {
                dom.bombaTimerDisplay.classList.remove("is-warning", "is-critical");
            }
        }
    }
}

function actualizarCablesBomba() {
    const b = juegosEduEstado.bomba;

    // Corte físico interactivo en los cables
    if (dom.bombaWireSlot1) {
        if (b.fase > 1) dom.bombaWireSlot1.classList.add("is-cut");
        else dom.bombaWireSlot1.classList.remove("is-cut");
    }
    if (dom.bombaWireSlot2) {
        if (b.fase > 2) dom.bombaWireSlot2.classList.add("is-cut");
        else dom.bombaWireSlot2.classList.remove("is-cut");
    }
    if (dom.bombaWireSlot3) {
        if (b.fase > 3) dom.bombaWireSlot3.classList.add("is-cut");
        else dom.bombaWireSlot3.classList.remove("is-cut");
    }

    if (dom.bombaWire1Status) {
        dom.bombaWire1Status.textContent = b.fase > 1 ? "Cortado ✂️" : "Armado";
        dom.bombaWire1Status.className = `bomba-wire-status badge ${b.fase > 1 ? 'badge--success stamp-badge' : 'badge--danger'}`;
    }
    if (dom.bombaWire2Status) {
        dom.bombaWire2Status.textContent = b.fase > 2 ? "Cortado ✂️" : b.fase === 2 ? "Armado" : "Pendiente";
        dom.bombaWire2Status.className = `bomba-wire-status badge ${b.fase > 2 ? 'badge--success stamp-badge' : b.fase === 2 ? 'badge--danger' : 'badge--warning'}`;
    }
    if (dom.bombaWire3Status) {
        dom.bombaWire3Status.textContent = b.fase > 3 ? "Cortado ✂️" : b.fase === 3 ? "¡ACTIVO!" : "Bloqueado";
        dom.bombaWire3Status.className = `bomba-wire-status badge ${b.fase > 3 ? 'badge--success stamp-badge' : b.fase === 3 ? 'badge--accent' : 'badge--warning'}`;
    }
}

function dispararGlitchBomba() {
    if (window.bolilleroPerfMode === "lite") return;
    if (dom.bombaLcdScreen) {
        dom.bombaLcdScreen.classList.remove("bomba-glitching");
        void dom.bombaLcdScreen.offsetWidth; // Forzar reinicio de animación GPU
        dom.bombaLcdScreen.classList.add("bomba-glitching");
        setTimeout(() => {
            if (dom.bombaLcdScreen) dom.bombaLcdScreen.classList.remove("bomba-glitching");
        }, 320);
    }
}

// Función para garantizar que ninguna opción destaque por ser más larga o corta que las demás
function normalizarLongitudOpciones(opcionesArray) {
    if (!Array.isArray(opcionesArray) || opcionesArray.length <= 1) return opcionesArray;

    const dangles = ['de', 'del', 'la', 'el', 'los', 'las', 'que', 'en', 'y', 'e', 'a', 'con', 'por', 'para', 'su', 'sus', 'un', 'una', 'al', 'o', 'u', 'como', 'sobre', 'sin'];
    
    function cleanDangling(str) {
        let words = str.trim().split(/\s+/).filter(Boolean);
        while (words.length > 0 && dangles.includes(words[words.length - 1].toLowerCase())) {
            words.pop();
        }
        return words.join(' ');
    }

    // 1. Limpieza inicial de paréntesis y signos finales
    let cleaned = opcionesArray.map(txt => {
        let s = String(txt || '').trim();
        s = s.replace(/\s*\([^)]*\)/g, '');
        return s.replace(/[.;:]$/, '').trim();
    });

    // 2. Conectores subordinados que suelen inflar la respuesta correcta
    const conectores = [
        ', lo que significa que', ', lo que significa', ', lo cual implica que', ', lo cual implica',
        ', es decir que', ', debido a que', ', ya que', ', garantizando que',
        ', resultando en', '; por ende', ', permitiendo que', ', permitiendo',
        ', de modo que', ', de manera que', ', estableciendo que', ', puesto que',
        ', dando lugar a', ', de forma que', ', actuando como', ', hasta alcanzar',
        ', con el objetivo de', ', a efectos de', ', en tanto que', ', mientras que'
    ];

    cleaned = cleaned.map(s => {
        for (const c of conectores) {
            const idx = s.toLowerCase().indexOf(c);
            if (idx !== -1) {
                const parte = s.slice(0, idx).trim();
                if (parte.split(/\s+/).filter(Boolean).length >= 7) {
                    s = parte;
                    break;
                }
            }
        }
        // Si aún tiene coma y supera 11 palabras, cortar en la primera coma si quedan >= 7 palabras
        if (s.split(/\s+/).filter(Boolean).length > 11 && s.includes(',')) {
            const antesComa = s.split(',')[0].trim();
            if (antesComa.split(/\s+/).filter(Boolean).length >= 7) {
                s = antesComa;
            }
        }
        return cleanDangling(s);
    });

    // 3. Recortar cualquier opción que supere 12 palabras para que no delate la respuesta
    cleaned = cleaned.map(s => {
        const words = s.split(/\s+/).filter(Boolean);
        if (words.length > 12) {
            return cleanDangling(words.slice(0, 11).join(' '));
        }
        return s;
    });

    // 4. Si algunos distractores quedaron demasiado cortos (<= 6 palabras), expandir con marco académico
    const wordCounts = cleaned.map(s => s.split(/\s+/).filter(Boolean).length);
    const maxWords = Math.max(...wordCounts);

    cleaned = cleaned.map(s => {
        const words = s.split(/\s+/).filter(Boolean);
        if (words.length < maxWords - 3 && words.length <= 6) {
            if (/^[A-ZÁÉÍÓÚÑ]/i.test(s)) {
                if (!s.toLowerCase().startsWith('se ') && !s.toLowerCase().startsWith('el ') && !s.toLowerCase().startsWith('la ') && !s.toLowerCase().startsWith('los ') && !s.toLowerCase().startsWith('las ')) {
                    s = 'Se observa ' + s.charAt(0).toLowerCase() + s.slice(1) + ' en el sistema';
                } else {
                    s = s + ' en las condiciones del sistema';
                }
            }
        }
        return s.trim();
    });

    return cleaned;
}

function renderFase1Bomba(tema) {
    if (!dom.bombaFase1Question || !dom.bombaFase1Options) return;
    const f1 = (tema.bomba && tema.bomba.fase1) || {
        pregunta: (tema.bomba && tema.bomba.preguntaFormula) || `¿Cuál es el principio teórico fundamental de "${tema.nombre}"?`,
        opciones: [
            (tema.bomba && tema.bomba.formulaCorrecta) || `Principio rector y postulado fundacional de ${tema.nombre}`,
            `Axioma contradictorio que anula los postulados de ${tema.nombre}`,
            `Hipótesis secundaria sin validación experimental en ${tema.nombre}`,
            `Criterio operativo opuesto al modelo general de ${tema.nombre}`
        ],
        respuestaCorrecta: 0,
        explicacion: "Principio teórico verificado."
    };

    dom.bombaFase1Question.textContent = f1.pregunta;

    const idxCorrecto1 = Number(f1.respuestaCorrecta !== undefined ? f1.respuestaCorrecta : 0);
    const opcionesNorm1 = normalizarLongitudOpciones(f1.opciones);
    const opciones = opcionesNorm1.map((txt, idx) => ({
        texto: txt,
        correcta: idx === idxCorrecto1
    })).sort(() => Math.random() - 0.5);

    dom.bombaFase1Options.innerHTML = "";
    opciones.forEach((opc) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "bomba-option-btn";
        btn.textContent = opc.texto;
        btn.addEventListener("click", () => {
            const allBtns = dom.bombaFase1Options.querySelectorAll(".bomba-option-btn");
            if (opc.correcta) {
                allBtns.forEach(b => b.style.pointerEvents = "none");
                btn.classList.add("is-correct");
                reproducirSonido("ruletaFin");
                mostrarToast("✂️ ¡Cable 1 cortado con éxito! Fundamento teórico verificado.");
                juegosEduEstado.bomba.fase = 2;
                actualizarCablesBomba();
                notificarProgresoBombaOnline(2, juegosEduEstado.bomba.fallos);
                setTimeout(() => {
                    if (dom.bombaFase1View) dom.bombaFase1View.classList.add("hidden");
                    if (dom.bombaFase2View) dom.bombaFase2View.classList.remove("hidden");
                    renderFase2Bomba(tema);
                    if (juegosEduEstado.modo === "coop" && onlineDueloEstado.conectado) {
                        publicarMensajeSala({ tipo: "COOP_BOMBA_FASE", fase: 2 });
                    }
                }, 500);
            } else {
                btn.classList.add("is-wrong");
                btn.style.pointerEvents = "none";
                reproducirSonido("chispazo");
                dispararGlitchBomba();
                juegosEduEstado.bomba.fallos++;
                notificarProgresoBombaOnline(1, juegosEduEstado.bomba.fallos);
                if (juegosEduEstado.modo === "coop" && onlineDueloEstado.conectado) {
                    publicarMensajeSala({ tipo: "COOP_BOMBA_FALLO" });
                }
                juegosEduEstado.bomba.tiempoRestante = Math.max(5, juegosEduEstado.bomba.tiempoRestante - 15);
                actualizarTimerBombaDisplay();
                mostrarToast("💥 ¡Chispazo! Fundamento incorrecto (-15s)");
                if (juegosEduEstado.bomba.fallos >= 3) {
                    detonarBomba("Cometiste 3 errores fatales en los cables.");
                }
            }
        });
        dom.bombaFase1Options.appendChild(btn);
    });
}

function renderFase2Bomba(tema) {
    if (!dom.bombaFase2Question || !dom.bombaFase2Options) return;
    const f2 = (tema.bomba && tema.bomba.fase2) || {
        contexto: `Premisa analítica: intensificación de las variables conceptuales en "${tema.nombre}".`,
        pregunta: `¿Qué deducción conceptual se deduce según los postulados de la materia?`,
        opciones: [
            `Respuesta proporcional y consistente con el equilibrio general del sistema`,
            `Ruptura completa e instantánea de la coherencia en las variables del sistema`,
            `Comportamiento enteramente aleatorio e impredecible sin correlación con la teoría`,
            `Inversión total del marco metodológico adoptado originalmente por la disciplina`
        ],
        respuestaCorrecta: 0,
        explicacion: "Deducción conceptual correcta."
    };

    if (dom.bombaFase2ProblemBox) {
        dom.bombaFase2ProblemBox.innerHTML = `<strong>Premisa de Análisis:</strong> ${f2.contexto || ""}`;
    }
    dom.bombaFase2Question.textContent = f2.pregunta;

    const idxCorrecto2 = Number(f2.respuestaCorrecta !== undefined ? f2.respuestaCorrecta : 0);
    const opcionesNorm2 = normalizarLongitudOpciones(f2.opciones);
    const opciones = opcionesNorm2.map((txt, idx) => ({
        texto: txt,
        correcta: idx === idxCorrecto2
    })).sort(() => Math.random() - 0.5);

    dom.bombaFase2Options.innerHTML = "";
    opciones.forEach((opc) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "bomba-option-btn";
        btn.textContent = opc.texto;
        btn.addEventListener("click", () => {
            const allBtns = dom.bombaFase2Options.querySelectorAll(".bomba-option-btn");
            if (opc.correcta) {
                allBtns.forEach(b => b.style.pointerEvents = "none");
                btn.classList.add("is-correct");
                reproducirSonido("ruletaFin");
                mostrarToast("✂️ ¡Cable 2 cortado con éxito! Análisis conceptual validado.");
                juegosEduEstado.bomba.fase = 3;
                actualizarCablesBomba();
                notificarProgresoBombaOnline(3, juegosEduEstado.bomba.fallos);
                setTimeout(() => {
                    if (dom.bombaFase2View) dom.bombaFase2View.classList.add("hidden");
                    if (dom.bombaFase3View) dom.bombaFase3View.classList.remove("hidden");
                    renderFase3Bomba(tema);
                    if (juegosEduEstado.modo === "coop" && onlineDueloEstado.conectado) {
                        publicarMensajeSala({ tipo: "COOP_BOMBA_FASE", fase: 3 });
                    }
                }, 500);
            } else {
                btn.classList.add("is-wrong");
                btn.style.pointerEvents = "none";
                reproducirSonido("chispazo");
                dispararGlitchBomba();
                juegosEduEstado.bomba.fallos++;
                notificarProgresoBombaOnline(2, juegosEduEstado.bomba.fallos);
                if (juegosEduEstado.modo === "coop" && onlineDueloEstado.conectado) {
                    publicarMensajeSala({ tipo: "COOP_BOMBA_FALLO" });
                }
                juegosEduEstado.bomba.tiempoRestante = Math.max(5, juegosEduEstado.bomba.tiempoRestante - 15);
                actualizarTimerBombaDisplay();
                mostrarToast("💥 ¡Error de análisis! (-15s)");
                if (juegosEduEstado.bomba.fallos >= 3) {
                    detonarBomba("3 deducciones erróneas detonaron la bomba.");
                }
            }
        });
        dom.bombaFase2Options.appendChild(btn);
    });
}

function renderFase3Bomba(tema) {
    if (!dom.bombaFase3Question || !dom.bombaFase3Options) return;
    const f3 = (tema.bomba && tema.bomba.fase3) || {
        desafioMaestro: `Desafío Maestro: identificación de la afirmación integradora definitiva sobre "${tema.nombre}".`,
        pregunta: `¿Cuál es la síntesis conceptual que corta el detonador maestro?`,
        opciones: [
            `La integración metodológica unifica la teoría con la deducción rigurosa`,
            `La síntesis exige descartar los axiomas fundamentales de las fases previas`,
            `No existe correlación analítica verificable entre los componentes del sistema`,
            `El marco analítico carece de consistencia formal en condiciones operativas`
        ],
        respuestaCorrecta: 0,
        explicacion: "Síntesis integradora verificada."
    };

    if (dom.bombaFase3ProblemBox) {
        dom.bombaFase3ProblemBox.innerHTML = `<strong>Desafío Maestro:</strong> ${f3.desafioMaestro || ""}`;
    }
    dom.bombaFase3Question.textContent = f3.pregunta;

    const idxCorrecto3 = Number(f3.respuestaCorrecta !== undefined ? f3.respuestaCorrecta : 0);
    const opcionesNorm3 = normalizarLongitudOpciones(f3.opciones);
    const opciones = opcionesNorm3.map((txt, idx) => ({
        texto: txt,
        correcta: idx === idxCorrecto3
    })).sort(() => Math.random() - 0.5);

    dom.bombaFase3Options.innerHTML = "";
    opciones.forEach((opc) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "bomba-option-btn";
        btn.textContent = opc.texto;
        btn.addEventListener("click", () => {
            const allBtns = dom.bombaFase3Options.querySelectorAll(".bomba-option-btn");
            if (opc.correcta) {
                allBtns.forEach(b => b.style.pointerEvents = "none");
                btn.classList.add("is-correct");
                reproducirSonido("victoria");
                juegosEduEstado.bomba.fase = 4;
                actualizarCablesBomba();
                notificarProgresoBombaOnline(4, juegosEduEstado.bomba.fallos);
                mostrarToast("✂️ ¡CABLE MAESTRO CORTADO! Detonador desactivado.");
                setTimeout(() => {
                    desactivarBombaExito();
                }, 500);
            } else {
                btn.classList.add("is-wrong");
                btn.style.pointerEvents = "none";
                reproducirSonido("chispazo");
                dispararGlitchBomba();
                juegosEduEstado.bomba.fallos++;
                notificarProgresoBombaOnline(3, juegosEduEstado.bomba.fallos);
                if (juegosEduEstado.modo === "coop" && onlineDueloEstado.conectado) {
                    publicarMensajeSala({ tipo: "COOP_BOMBA_FALLO" });
                }
                juegosEduEstado.bomba.tiempoRestante = Math.max(5, juegosEduEstado.bomba.tiempoRestante - 20);
                actualizarTimerBombaDisplay();
                mostrarToast("❌ ¡Síntesis errónea en cable maestro! (-20s)");
                if (juegosEduEstado.bomba.fallos >= 3) {
                    detonarBomba("3 fallos en el detonador maestro causaron la explosión.");
                }
            }
        });
        dom.bombaFase3Options.appendChild(btn);
    });
}

function desactivarBombaExito() {
    const b = juegosEduEstado.bomba;
    clearInterval(b.timerId);

    // Barrido holográfico de desactivación en Modo Visual Pro
    if (window.bolilleroPerfMode !== "lite") {
        const casing = document.querySelector(".bomba-casing");
        if (casing) {
            casing.classList.remove("bomba-defused-success");
            void casing.offsetWidth;
            casing.classList.add("bomba-defused-success");
            setTimeout(() => {
                if (casing) casing.classList.remove("bomba-defused-success");
            }, 1000);
        }
    }

    const puntos = 500 + Math.max(0, b.tiempoRestante) * 10 - b.fallos * 50;

    if (dom.bombaFase1View) dom.bombaFase1View.classList.add("hidden");
    if (dom.bombaFase2View) dom.bombaFase2View.classList.add("hidden");
    if (dom.bombaFase3View) dom.bombaFase3View.classList.add("hidden");
    if (dom.bombaResultView) dom.bombaResultView.classList.remove("hidden");

    if (dom.bombaResultIcon) dom.bombaResultIcon.textContent = "🎉";
    if (dom.bombaResultTitle) dom.bombaResultTitle.textContent = "¡BOMBA DESACTIVADA!";
    if (dom.bombaResultDesc) dom.bombaResultDesc.textContent = `Excelente dominio teórico: completaste las 3 fases conceptuales.`;
    if (dom.bombaResultStats) {
        dom.bombaResultStats.innerHTML = `
            <div class="fama-stats-cards" style="margin: 1rem 0;">
                <div class="fama-stat-card"><span class="fama-stat-num">${puntos}</span><span class="fama-stat-label">Puntos Ganados</span></div>
                <div class="fama-stat-card"><span class="fama-stat-num">${b.tiempoRestante}s</span><span class="fama-stat-label">Tiempo Sobrante</span></div>
                <div class="fama-stat-card"><span class="fama-stat-num">${b.fallos}</span><span class="fama-stat-label">Errores</span></div>
            </div>
        `;
    }

    // Si es modo online, sincronizar con la sala
    if (juegosEduEstado.esOnline) {
        if (juegosEduEstado.bombaOnline) {
            juegosEduEstado.bombaOnline.desactivacionesCount = (juegosEduEstado.bombaOnline.desactivacionesCount || 0) + 1;
            const miPuesto = juegosEduEstado.bombaOnline.desactivacionesCount;
            const miJugador = juegosEduEstado.bombaOnline.jugadores.find(j => j.id === perfilUsuario.id);
            if (miJugador) {
                miJugador.desactivada = true;
                miJugador.posicion = miPuesto;
                miJugador.puntos = puntos;
            }
            renderBombaOnlineTracker();
            mostrarToast(`🏆 ¡Desactivaste la bomba en el ${miPuesto}º puesto!`);
        }

        publicarMensajeSala({
            tipo: "BOMBA_DESACTIVADA",
            jugadorId: perfilUsuario.id,
            apodo: perfilUsuario.apodo,
            puntos,
            tiempoRestante: b.tiempoRestante,
            fallos: b.fallos
        });

        const btnVolver = document.getElementById("bombaBackToLobbyBtn");
        if (btnVolver) btnVolver.classList.remove("hidden");
    }

    // Registrar en el Salón de la Fama Multiverso
    registrarResultadoJuego("bomba", puntos, true);

    if (juegosEduEstado.juegoActual === "triatlon") {
        juegosEduEstado.triatlon.scores[0] = puntos;
        juegosEduEstado.triatlon.puntosTotal += puntos;
        setTimeout(() => avanzarRondaTriatlon(2), 2500);
    }
}

function detonarBomba(motivo) {
    const b = juegosEduEstado.bomba;
    clearInterval(b.timerId);

    reproducirSonido("explosion");
    if (dom.arenaBomba) dom.arenaBomba.classList.add("bomba-exploding");

    if (dom.bombaFase1View) dom.bombaFase1View.classList.add("hidden");
    if (dom.bombaFase2View) dom.bombaFase2View.classList.add("hidden");
    if (dom.bombaFase3View) dom.bombaFase3View.classList.add("hidden");
    if (dom.bombaResultView) dom.bombaResultView.classList.remove("hidden");

    if (dom.bombaResultIcon) dom.bombaResultIcon.textContent = "💥";
    if (dom.bombaResultTitle) dom.bombaResultTitle.textContent = "¡BOOM! DETONACIÓN";
    if (dom.bombaResultDesc) dom.bombaResultDesc.textContent = motivo || "La bomba detonó antes de ser desactivada.";

    // Puntos obtenidos en base al progreso de cables alcanzado (mínimo 50, o 150 por fase)
    const puntos = Math.max(50, (b.fase - 1) * 150);
    if (dom.bombaResultStats) {
        dom.bombaResultStats.innerHTML = `<p style="color: #f87171; font-weight: bold; font-size: 1.1rem;">💥 Puntos obtenidos: ${puntos} pts</p>`;
    }

    if (juegosEduEstado.esOnline) {
        if (juegosEduEstado.bombaOnline) {
            const miJugador = juegosEduEstado.bombaOnline.jugadores.find(j => j.id === perfilUsuario.id);
            if (miJugador) {
                miJugador.detonada = true;
            }
            renderBombaOnlineTracker();
        }

        publicarMensajeSala({
            tipo: "BOMBA_DETONADA",
            jugadorId: perfilUsuario.id,
            apodo: perfilUsuario.apodo,
            motivo
        });

        const btnVolver = document.getElementById("bombaBackToLobbyBtn");
        if (btnVolver) btnVolver.classList.remove("hidden");
    }

    registrarResultadoJuego("bomba", puntos, false);

    if (juegosEduEstado.juegoActual === "triatlon") {
        juegosEduEstado.triatlon.scores[0] = puntos;
        juegosEduEstado.triatlon.puntosTotal += puntos;
        setTimeout(() => {
            if (dom.arenaBomba) dom.arenaBomba.classList.remove("bomba-exploding");
            avanzarRondaTriatlon(2);
        }, 2500);
    } else {
        setTimeout(() => {
            if (dom.arenaBomba) dom.arenaBomba.classList.remove("bomba-exploding");
            mostrarToast(`💥 ¡Bomba detonada! Podés reintentar o volver al lobby.`);
        }, 3000);
    }
}

/* =========================================================
   JUEGO 2: 🕵️‍♂️ CAZA AL IMPOSTOR
   ========================================================= */
function iniciarImpostor(modo) {
    if (!dom.arenaImpostor) return;
    dom.arenaImpostor.classList.remove("hidden");
    if (dom.juegosGameIcon) dom.juegosGameIcon.textContent = "🕵️‍♂️";
    if (dom.juegosGameTitle) dom.juegosGameTitle.textContent = "Caza al Impostor";

    const imp = juegosEduEstado.impostor;
    imp.activo = true;
    imp.ola = 1;
    imp.maxOlas = imp.maxOlas || 5;
    imp.tiempoSeleccionado = imp.tiempoSeleccionado || 15;
    imp.tiempoOla = imp.tiempoSeleccionado;
    imp.racha = 1;
    imp.puntaje = 0;

    // Mostrar panel de configuración previa para elegir tiempo y cantidad de rondas
    if (dom.impostorSetupPanel) dom.impostorSetupPanel.classList.remove("hidden");
    if (dom.impostorActiveBoard) dom.impostorActiveBoard.classList.add("hidden");

    actualizarSetupImpostorUI();
}

function actualizarSetupImpostorUI() {
    const imp = juegosEduEstado.impostor;
    if (dom.impostorTimeSelector) {
        const timeBtns = dom.impostorTimeSelector.querySelectorAll(".impostor-pill-btn");
        timeBtns.forEach(b => {
            const t = Number(b.dataset.time);
            b.classList.toggle("is-active", t === (imp.tiempoSeleccionado || 15));
        });
    }
    if (dom.impostorRoundsSelector) {
        const roundsBtns = dom.impostorRoundsSelector.querySelectorAll(".impostor-pill-btn");
        roundsBtns.forEach(b => {
            const r = Number(b.dataset.rounds);
            b.classList.toggle("is-active", r === (imp.maxOlas || 5));
        });
    }
    if (dom.impostorSetupStatusText) {
        if (imp.casosPool && imp.casosPool.length > 0) {
            dom.impostorSetupStatusText.textContent = `✅ Expediente preparado (${imp.casosPool.length} casos listos)`;
        } else {
            dom.impostorSetupStatusText.textContent = "⏳ Gemini analizando tu PDF y preparando los casos...";
        }
    }
}

function comenzarPartidaImpostor() {
    const imp = juegosEduEstado.impostor;
    if (dom.impostorSetupPanel) dom.impostorSetupPanel.classList.add("hidden");
    if (dom.impostorActiveBoard) dom.impostorActiveBoard.classList.remove("hidden");

    imp.ola = 1;
    imp.racha = 1;
    imp.puntaje = 0;
    imp.tiempoOla = imp.tiempoSeleccionado || 15;

    inicializarComodinesImpostor();
    lanzarOlaImpostor();
}

/* =========================================================
   COMODINES: 🃏 CAZA AL IMPOSTOR (MODO SOLO)
   ========================================================= */
function inicializarComodinesImpostor() {
    const imp = juegosEduEstado.impostor;
    imp.comodines = {
        pista5050: 1,
        tiempoExtra: 1,
        radarSocorro: 1
    };

    if (dom.impostorComodinesTray) {
        if (juegosEduEstado.modo === "solo") {
            dom.impostorComodinesTray.classList.remove("hidden");
        } else {
            dom.impostorComodinesTray.classList.add("hidden");
        }
    }
    actualizarComodinesImpostorUI();
}

function actualizarComodinesImpostorUI() {
    const imp = juegosEduEstado.impostor;
    if (!imp.comodines) return;

    const feedbackAbierto = dom.impostorFeedbackBox && !dom.impostorFeedbackBox.classList.contains("hidden");
    const botonesDeshabilitados = !imp.activo || feedbackAbierto;

    if (dom.impostorCount5050) dom.impostorCount5050.textContent = imp.comodines.pista5050;
    if (dom.impostorBtn5050) {
        dom.impostorBtn5050.disabled = botonesDeshabilitados || imp.comodines.pista5050 <= 0;
    }

    if (dom.impostorCountTiempo) dom.impostorCountTiempo.textContent = imp.comodines.tiempoExtra;
    if (dom.impostorBtnTiempo) {
        dom.impostorBtnTiempo.disabled = botonesDeshabilitados || imp.comodines.tiempoExtra <= 0;
    }

    if (dom.impostorCountSocorro) dom.impostorCountSocorro.textContent = imp.comodines.radarSocorro;
    if (dom.impostorBtnSocorro) {
        dom.impostorBtnSocorro.disabled = botonesDeshabilitados || imp.comodines.radarSocorro <= 0;
    }
}

function usarComodinImpostor5050() {
    const imp = juegosEduEstado.impostor;
    if (!imp.activo || !imp.comodines || imp.comodines.pista5050 <= 0) return;
    if (dom.impostorFeedbackBox && !dom.impostorFeedbackBox.classList.contains("hidden")) return;
    if (!dom.impostorCardsGrid) return;

    const cards = Array.from(dom.impostorCardsGrid.querySelectorAll(".impostor-card"));
    const inocentes = cards.filter(c => c._cardData && !c._cardData.esImpostor && !c.classList.contains("is-discarded-5050"));

    if (inocentes.length < 2) {
        mostrarToast("⚠️ No hay suficientes afirmaciones válidas para descartar.");
        return;
    }

    inocentes.sort(() => Math.random() - 0.5);
    const aDescartar = inocentes.slice(0, 2);
    aDescartar.forEach(cardEl => {
        cardEl.classList.add("is-discarded-5050");
        cardEl.style.pointerEvents = "none";
    });

    imp.comodines.pista5050--;
    actualizarComodinesImpostorUI();
    reproducirSonido("comodin");
    mostrarToast("💡 Pista 50/50: Se descartaron 2 opciones verdaderas.");
}

function usarComodinImpostorTiempo() {
    const imp = juegosEduEstado.impostor;
    if (!imp.activo || !imp.comodines || imp.comodines.tiempoExtra <= 0) return;
    if (dom.impostorFeedbackBox && !dom.impostorFeedbackBox.classList.contains("hidden")) return;

    imp.tiempoRestanteMs = (imp.tiempoRestanteMs || 0) + 15000;
    imp.tiempoOla = (imp.tiempoOla || 15) + 15;
    const ratio = Math.min(1, Math.max(0, imp.tiempoRestanteMs / (imp.tiempoOla * 1000)));
    actualizarBarraTiempoImpostor(ratio);

    imp.comodines.tiempoExtra--;
    actualizarComodinesImpostorUI();
    reproducirSonido("comodin");
    mostrarToast("⏱️ +15s agregados al cronómetro de este caso.");
}

function usarComodinImpostorSocorro() {
    const imp = juegosEduEstado.impostor;
    if (!imp.activo || !imp.comodines || imp.comodines.radarSocorro <= 0) return;
    if (dom.impostorFeedbackBox && !dom.impostorFeedbackBox.classList.contains("hidden")) return;
    if (!dom.impostorCardsGrid) return;

    const cards = Array.from(dom.impostorCardsGrid.querySelectorAll(".impostor-card"));
    const impostorCard = cards.find(c => c._cardData && c._cardData.esImpostor);

    if (impostorCard) {
        impostorCard.classList.add("is-radar-detected");
        imp.comodines.radarSocorro--;
        actualizarComodinesImpostorUI();
        reproducirSonido("victoria");
        mostrarToast("🛟 ¡Radar activado! Se detectó la tarjeta con el error conceptual.");
    }
}

function lanzarOlaImpostor() {
    const imp = juegosEduEstado.impostor;
    if (imp.ola > imp.maxOlas) {
        finalizarImpostor();
        return;
    }

    clearInterval(imp.timerId);
    if (imp.autoAdvanceTimer) clearTimeout(imp.autoAdvanceTimer);
    if (dom.impostorFeedbackBox) dom.impostorFeedbackBox.classList.add("hidden");

    if (dom.impostorCaseNum) dom.impostorCaseNum.textContent = `${imp.ola} / ${imp.maxOlas}`;
    if (dom.impostorStreakBadge) dom.impostorStreakBadge.textContent = `🔥 x${imp.racha}`;
    if (dom.impostorScoreDisplay) dom.impostorScoreDisplay.textContent = imp.puntaje;

    // Obtener datos del caso actual según casosPool de IA o fallback temático
    let datos = null;
    let subtemaNombre = "";
    let preguntaTexto = "🕵️‍♂️ Una de estas 4 afirmaciones tiene un error conceptual infiltrado. ¡Encontrá al impostor antes de que termine el tiempo!";

    if (imp.casosPool && imp.casosPool.length >= imp.ola) {
        datos = imp.casosPool[imp.ola - 1];
        subtemaNombre = datos.subtema || `Caso #${imp.ola}`;
        if (datos.pregunta) preguntaTexto = datos.pregunta;
    } else {
        const tema = (juegosEduEstado.temas && juegosEduEstado.temas.length > 0)
            ? juegosEduEstado.temas[(juegosEduEstado.temaIndice + imp.ola - 1) % juegosEduEstado.temas.length]
            : null;
        subtemaNombre = tema ? (tema.nombre || tema.titulo || `Caso #${imp.ola}`) : `Caso #${imp.ola}`;
        datos = (tema && tema.impostor) ? tema.impostor : {
            afirmacionesVerdaderas: [
                `Propiedad clave verificada sobre el comportamiento teórico de ${subtemaNombre}`,
                `Principio conceptual fundamentado que rige la estructura de ${subtemaNombre}`,
                `Regla teórica universalmente admitida en los modelos de ${subtemaNombre}`
            ],
            afirmacionImpostora: `Postulado contradictorio que vulnera los fundamentos admitidos de ${subtemaNombre}`,
            explicacionError: `Esta afirmación contradice los principios teóricos fundamentales de ${subtemaNombre}.`
        };
    }

    // Blindaje total contra arrays vacíos o propiedades no definidas
    const vArr = (datos && Array.isArray(datos.afirmacionesVerdaderas) && datos.afirmacionesVerdaderas.length >= 3)
        ? datos.afirmacionesVerdaderas
        : [
            `Principio formalmente verificado en el estudio de ${subtemaNombre}`,
            `Propiedad metodológica reconocida en las aplicaciones de ${subtemaNombre}`,
            `Axioma consistente con los marcos teóricos de ${subtemaNombre}`
        ];
    const impTxt = (datos && datos.afirmacionImpostora)
        ? datos.afirmacionImpostora
        : `Postulado contradictorio que altera el fundamento de ${subtemaNombre}`;
    const expTxt = (datos && datos.explicacionError)
        ? datos.explicacionError
        : `Esta afirmación contiene una contradicción conceptual con los fundamentos de ${subtemaNombre}.`;

    if (dom.impostorTopicBadge) dom.impostorTopicBadge.textContent = subtemaNombre;
    if (dom.impostorQuestionText) dom.impostorQuestionText.textContent = preguntaTexto;

    // Actualizar comodines en UI al inicio de cada ola
    actualizarComodinesImpostorUI();

    const afirmacionesBase = [vArr[0], vArr[1], vArr[2], impTxt];
    const afirmacionesNorm = normalizarLongitudOpciones(afirmacionesBase);

    const cardsData = [
        { texto: afirmacionesNorm[0], esImpostor: false },
        { texto: afirmacionesNorm[1], esImpostor: false },
        { texto: afirmacionesNorm[2], esImpostor: false },
        { texto: afirmacionesNorm[3], esImpostor: true, explicacion: expTxt }
    ].sort(() => Math.random() - 0.5);

    if (dom.impostorCardsGrid) {
        dom.impostorCardsGrid.innerHTML = "";
        cardsData.forEach((c, idx) => {
            const cardEl = document.createElement("div");
            cardEl.className = "impostor-card";
            cardEl.style.pointerEvents = "auto";
            cardEl._cardData = c;
            cardEl.innerHTML = `
                <div class="impostor-card__num">Afirmación #${idx + 1}</div>
                <div class="impostor-card__text">${c.texto}</div>
            `;
            cardEl.addEventListener("click", () => resolverClickImpostor(c, cardEl));
            dom.impostorCardsGrid.appendChild(cardEl);
        });
    }

    // Cronómetro de ola configurado según el tiempo elegido por el estudiante
    imp.tiempoOla = imp.tiempoSeleccionado || 15;
    imp.tiempoRestanteMs = imp.tiempoOla * 1000;
    actualizarBarraTiempoImpostor(1);

    const stepMs = 100;
    imp.timerId = setInterval(() => {
        imp.tiempoRestanteMs -= stepMs;
        const ratio = Math.max(0, imp.tiempoRestanteMs / (imp.tiempoOla * 1000));
        actualizarBarraTiempoImpostor(ratio);

        if (imp.tiempoRestanteMs <= 0) {
            clearInterval(imp.timerId);
            tiempoAgotadoOlaImpostor();
        }
    }, stepMs);
}

function actualizarBarraTiempoImpostor(ratio) {
    if (dom.impostorTimerBar) {
        dom.impostorTimerBar.style.width = `${(ratio * 100).toFixed(1)}%`;
    }
}

function resolverClickImpostor(cardData, cardEl) {
    const imp = juegosEduEstado.impostor;
    clearInterval(imp.timerId);

    // Desactivar clics en tarjetas durante la resolución
    const allCards = dom.impostorCardsGrid ? dom.impostorCardsGrid.querySelectorAll(".impostor-card") : [];
    allCards.forEach(c => c.style.pointerEvents = "none");

    // Revelar simultáneamente el estado de todas las tarjetas con badges pedagógicos
    allCards.forEach((c) => {
        const isThisImpostor = c._cardData && c._cardData.esImpostor;
        if (isThisImpostor) {
            c.classList.add("is-impostor-revealed");
            const badge = document.createElement("span");
            badge.className = "impostor-card__badge impostor-card__badge--impostor";
            badge.textContent = "🚨 IMPOSTOR";
            c.appendChild(badge);
        } else {
            c.classList.add("is-innocent-revealed");
            const badge = document.createElement("span");
            badge.className = "impostor-card__badge impostor-card__badge--valid";
            badge.textContent = "✅ VERDADERA";
            c.appendChild(badge);
        }
    });

    if (cardData.esImpostor) {
        cardEl.classList.add("is-caught");
        reproducirSonido("victoria");
        const ptsGanados = Math.round(200 * imp.racha);
        imp.puntaje += ptsGanados;
        imp.racha = Math.min(5, imp.racha + 1);
        mostrarToast(`🎯 ¡IMPOSTOR ATRAPADO! +${ptsGanados} pts`);

        if (dom.impostorFeedbackBox && dom.impostorFeedbackContent) {
            dom.impostorFeedbackContent.innerHTML = `
                <div style="font-weight: 700; font-size: 1.05rem; color: #4ade80;">🎯 ¡IMPOSTOR ATRAPADO! (+${ptsGanados} pts)</div>
                <p style="margin: 0.35rem 0 0; font-size: 0.9rem; color: #cbd5e1; line-height: 1.45;">${cardData.explicacion || "Detectaste con precisión el error conceptual infiltrado."}</p>
            `;
            dom.impostorFeedbackBox.classList.remove("hidden");
        }
    } else {
        cardEl.classList.add("is-innocent");
        reproducirSonido("chispazo");
        imp.racha = 1;
        imp.puntaje = Math.max(0, imp.puntaje - 50);
        mostrarToast("❌ ¡Inocente! Esa afirmación es verdadera (-50 pts)");

        if (dom.impostorFeedbackBox && dom.impostorFeedbackContent) {
            dom.impostorFeedbackContent.innerHTML = `
                <div style="font-weight: 700; font-size: 1.05rem; color: #f87171;">❌ Esa afirmación era un postulado verdadero (-50 pts)</div>
                <p style="margin: 0.35rem 0 0; font-size: 0.9rem; color: #cbd5e1; line-height: 1.45;">${cardData.explicacion || "El impostor estaba en la tarjeta destacada en rojo. Identificá afirmaciones que contradigan los axiomas de la materia."}</p>
            `;
            dom.impostorFeedbackBox.classList.remove("hidden");
        }
    }

    if (dom.impostorScoreDisplay) dom.impostorScoreDisplay.textContent = imp.puntaje;
    if (dom.impostorStreakBadge) dom.impostorStreakBadge.textContent = `🔥 x${imp.racha}`;

    // Deshabilitar comodines durante la pantalla de feedback
    actualizarComodinesImpostorUI();

    // Scroll suave para que el feedback y el botón de siguiente caso se vean inmediatamente
    if (dom.impostorFeedbackBox) {
        dom.impostorFeedbackBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Auto-avance fluido al siguiente caso tras 2.2s si no pulsa el botón
    if (imp.autoAdvanceTimer) clearTimeout(imp.autoAdvanceTimer);
    imp.autoAdvanceTimer = setTimeout(() => {
        siguienteOlaImpostor();
    }, 2200);
}

function tiempoAgotadoOlaImpostor() {
    const imp = juegosEduEstado.impostor;
    imp.racha = 1;
    mostrarToast("⌛ ¡Tiempo agotado en este caso!");

    if (dom.impostorFeedbackBox && dom.impostorFeedbackContent) {
        dom.impostorFeedbackContent.innerHTML = `
            <div style="font-weight: 700; font-size: 1.05rem; color: #f59e0b;">⌛ El tiempo expiró</div>
            <p style="margin: 0.35rem 0 0; font-size: 0.9rem; color: #cbd5e1; line-height: 1.45;">Avanzando al siguiente caso del expediente...</p>
        `;
        dom.impostorFeedbackBox.classList.remove("hidden");
    }

    actualizarComodinesImpostorUI();

    if (dom.impostorFeedbackBox) {
        dom.impostorFeedbackBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (imp.autoAdvanceTimer) clearTimeout(imp.autoAdvanceTimer);
    imp.autoAdvanceTimer = setTimeout(() => {
        siguienteOlaImpostor();
    }, 2000);
}

function siguienteOlaImpostor() {
    if (juegosEduEstado.impostor.autoAdvanceTimer) {
        clearTimeout(juegosEduEstado.impostor.autoAdvanceTimer);
    }
    juegosEduEstado.impostor.ola++;
    lanzarOlaImpostor();
}

function finalizarImpostor() {
    const imp = juegosEduEstado.impostor;
    imp.activo = false;
    clearInterval(imp.timerId);
    actualizarComodinesImpostorUI();

    mostrarToast(`🏆 ¡CASO CERRADO! Puntaje final: ${imp.puntaje} pts`);
    registrarResultadoJuego("impostor", imp.puntaje, imp.puntaje > 400);

    if (juegosEduEstado.juegoActual === "triatlon") {
        juegosEduEstado.triatlon.scores[1] = imp.puntaje;
        juegosEduEstado.triatlon.puntosTotal += imp.puntaje;
        setTimeout(() => avanzarRondaTriatlon(3), 2000);
    } else {
        setTimeout(() => cambiarVista("fama"), 1800);
    }
}

/* =========================================================
   JUEGO 3: 🧠 MEMOTEST CONECTADO
   ========================================================= */
function iniciarMemotest(modo) {
    if (!dom.arenaMemotest) return;
    dom.arenaMemotest.classList.remove("hidden");
    if (dom.juegosGameIcon) dom.juegosGameIcon.textContent = "🧠";
    if (dom.juegosGameTitle) dom.juegosGameTitle.textContent = "Memotest Conectado";

    const mem = juegosEduEstado.memotest;
    mem.activo = true;
    mem.cartas = [];
    mem.primeraCarta = null;
    mem.bloqueado = false;
    mem.paresEncontrados = 0;
    mem.totalPares = Math.min(6, juegosEduEstado.temas.length);
    mem.movimientos = 0;
    mem.segundos = 0;

    clearInterval(mem.timerId);

    // Generar cartas
    const temasElegidos = [...juegosEduEstado.temas].slice(0, mem.totalPares);
    const cartasGeneradas = [];

    temasElegidos.forEach((t, parId) => {
        cartasGeneradas.push({
            id: `par_${parId}_c`,
            parId,
            tipo: "concepto",
            texto: t.memotest.concepto || t.nombre
        });
        cartasGeneradas.push({
            id: `par_${parId}_f`,
            parId,
            tipo: "formula",
            texto: t.memotest.definicionOFormula || t.descripcion
        });
    });

    mem.cartas = cartasGeneradas.sort(() => Math.random() - 0.5);

    renderTableroMemotest();

    if (dom.memotestPairsCount) dom.memotestPairsCount.textContent = `0 / ${mem.totalPares}`;
    if (dom.memotestMovesCount) dom.memotestMovesCount.textContent = "0";
    if (dom.memotestTimerDisplay) dom.memotestTimerDisplay.textContent = "00:00";
    if (dom.memotestScoreDisplay) dom.memotestScoreDisplay.textContent = "0";

    mem.timerId = setInterval(() => {
        mem.segundos++;
        const m = Math.floor(mem.segundos / 60);
        const s = mem.segundos % 60;
        if (dom.memotestTimerDisplay) {
            dom.memotestTimerDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        }
    }, 1000);
}

function renderTableroMemotest() {
    if (!dom.memotestGrid) return;
    dom.memotestGrid.innerHTML = "";

    juegosEduEstado.memotest.cartas.forEach((c) => {
        const cardEl = document.createElement("div");
        cardEl.className = `memotest-card memotest-card--${c.tipo}`;
        cardEl.dataset.id = c.id;
        cardEl.dataset.parId = c.parId;
        cardEl.innerHTML = `
            <div class="memotest-card__face-back">🧠</div>
            <div class="memotest-card__face-front hidden">${c.texto}</div>
        `;
        cardEl.addEventListener("click", () => clickCartaMemotest(c, cardEl));
        dom.memotestGrid.appendChild(cardEl);
    });
}

function clickCartaMemotest(carta, cardEl) {
    const mem = juegosEduEstado.memotest;
    if (mem.bloqueado) return;
    if (cardEl.classList.contains("is-matched") || cardEl.classList.contains("is-flipped")) return;

    // Voltear carta
    cardEl.classList.add("is-flipped");
    const faceBack = cardEl.querySelector(".memotest-card__face-back");
    const faceFront = cardEl.querySelector(".memotest-card__face-front");
    if (faceBack) faceBack.classList.add("hidden");
    if (faceFront) faceFront.classList.remove("hidden");

    if (!mem.primeraCarta) {
        mem.primeraCarta = { carta, cardEl };
    } else {
        mem.movimientos++;
        if (dom.memotestMovesCount) dom.memotestMovesCount.textContent = mem.movimientos;

        const primera = mem.primeraCarta;
        if (primera.carta.parId === carta.parId && primera.carta.id !== carta.id) {
            // ¡MATCH!
            cardEl.classList.add("is-matched");
            primera.cardEl.classList.add("is-matched");
            mem.paresEncontrados++;
            if (dom.memotestPairsCount) dom.memotestPairsCount.textContent = `${mem.paresEncontrados} / ${mem.totalPares}`;
            mostrarToast("✨ ¡CONEXIÓN ESTABLECIDA! Concepto y Fórmula unidos.");

            const pts = Math.max(100, 600 - mem.segundos * 5 - mem.movimientos * 10);
            if (dom.memotestScoreDisplay) dom.memotestScoreDisplay.textContent = pts;

            mem.primeraCarta = null;

            if (mem.paresEncontrados >= mem.totalPares) {
                finalizarMemotest(pts);
            }
        } else {
            // No coinciden
            mem.bloqueado = true;
            setTimeout(() => {
                cardEl.classList.remove("is-flipped");
                primera.cardEl.classList.remove("is-flipped");
                const b1 = primera.cardEl.querySelector(".memotest-card__face-back");
                const f1 = primera.cardEl.querySelector(".memotest-card__face-front");
                if (b1) b1.classList.remove("hidden");
                if (f1) f1.classList.add("hidden");

                if (faceBack) faceBack.classList.remove("hidden");
                if (faceFront) faceFront.classList.add("hidden");

                mem.primeraCarta = null;
                mem.bloqueado = false;
            }, 900);
        }
    }
}

function finalizarMemotest(pts) {
    const mem = juegosEduEstado.memotest;
    clearInterval(mem.timerId);

    const puntosFinales = pts || 500;
    mostrarToast(`🧠 ¡MEMOTEST COMPLETADO! Tiempo: ${mem.segundos}s - Puntos: ${puntosFinales}`);
    registrarResultadoJuego("memotest", puntosFinales, true);

    if (juegosEduEstado.juegoActual === "triatlon") {
        juegosEduEstado.triatlon.scores[2] = puntosFinales;
        juegosEduEstado.triatlon.puntosTotal += puntosFinales;
        finalizarTriatlon();
    } else {
        setTimeout(() => cambiarVista("fama"), 1800);
    }
}

/* =========================================================
   🏅 MODO TRIATLÓN (3 RONDAS ENCADENADAS)
   ========================================================= */
function iniciarTriatlon(modo) {
    if (dom.triatlonProgressBar) dom.triatlonProgressBar.classList.remove("hidden");
    juegosEduEstado.triatlon.rondaActual = 1;
    juegosEduEstado.triatlon.puntosTotal = 0;
    juegosEduEstado.triatlon.scores = [0, 0, 0];

    actualizarProgresoTriatlon(1);
    iniciarBomba(modo);
}

function actualizarProgresoTriatlon(paso) {
    [dom.triatlonStep1, dom.triatlonStep2, dom.triatlonStep3].forEach((el, idx) => {
        if (el) el.classList.toggle("is-active", idx + 1 === paso);
    });
    if (dom.triatlonTotalScore) dom.triatlonTotalScore.textContent = juegosEduEstado.triatlon.puntosTotal;
}

function avanzarRondaTriatlon(paso) {
    juegosEduEstado.triatlon.rondaActual = paso;
    actualizarProgresoTriatlon(paso);

    if (dom.arenaBomba) dom.arenaBomba.classList.add("hidden");
    if (dom.arenaImpostor) dom.arenaImpostor.classList.add("hidden");
    if (dom.arenaMemotest) dom.arenaMemotest.classList.add("hidden");

    if (paso === 2) {
        mostrarToast("🏅 Triatlón - Ronda 2: ¡Caza al Impostor!");
        iniciarImpostor(juegosEduEstado.modo);
    } else if (paso === 3) {
        mostrarToast("🏅 Triatlón - Ronda 3: ¡Memotest Conectado!");
        iniciarMemotest(juegosEduEstado.modo);
    }
}

function finalizarTriatlon() {
    const total = juegosEduEstado.triatlon.puntosTotal;
    mostrarToast(`👑 ¡TRIATLÓN COMPLETADO! Puntos Totales: ${total}`);
    registrarResultadoJuego("triatlon", total, true);
    setTimeout(() => cambiarVista("fama"), 2000);
}

/* =========================================================
   SALÓN DE LA FAMA MULTIVERSO & INSIGNIAS ESPECIALES
   ========================================================= */
const MULTIVERSE_STORAGE_KEY = "luibanez-multiverse-v1";

function obtenerMultiversoHistorial() {
    try {
        return JSON.parse(localStorage.getItem(MULTIVERSE_STORAGE_KEY)) || {
            partidas: [],
            statsPorJuego: {
                bolillero: { partidas: 0, victorias: 0, puntos: 0 },
                bomba: { partidas: 0, victorias: 0, puntos: 0 },
                impostor: { partidas: 0, victorias: 0, puntos: 0 },
                memotest: { partidas: 0, victorias: 0, puntos: 0 },
                triatlon: { partidas: 0, victorias: 0, puntos: 0 }
            }
        };
    } catch {
        return { partidas: [], statsPorJuego: {} };
    }
}

function registrarResultadoJuego(tipoJuego, puntos, gano) {
    const multiverso = obtenerMultiversoHistorial();
    const usuario = perfilUsuario.activo ? perfilUsuario.perfil.apodo : "Invitado";

    const partida = {
        id: Date.now(),
        juego: tipoJuego,
        jugador: usuario,
        puntos: puntos || 0,
        gano: !!gano,
        fecha: new Date().toLocaleDateString("es-AR")
    };

    multiverso.partidas.unshift(partida);

    if (!multiverso.statsPorJuego[tipoJuego]) {
        multiverso.statsPorJuego[tipoJuego] = { partidas: 0, victorias: 0, puntos: 0 };
    }
    multiverso.statsPorJuego[tipoJuego].partidas++;
    if (gano) multiverso.statsPorJuego[tipoJuego].victorias++;
    multiverso.statsPorJuego[tipoJuego].puntos += puntos;

    localStorage.setItem(MULTIVERSE_STORAGE_KEY, JSON.stringify(multiverso));

    // Si el usuario tiene cuenta, actualizar su perfil con insignias especiales
    if (perfilUsuario.activo && perfilUsuario.perfil) {
        if (!perfilUsuario.perfil.insignias) {
            perfilUsuario.perfil.insignias = {};
        }
        if (gano) {
            perfilUsuario.perfil.insignias[tipoJuego] = true;
            perfilUsuario.perfil.victorias = (perfilUsuario.perfil.victorias || 0) + 1;
        }
        perfilUsuario.perfil.puntos = (perfilUsuario.perfil.puntos || 0) + puntos;
        guardarPerfilUsuario();
        actualizarUIPerfilUsuario();
    }

    actualizarUIMultiversoFama("general");
}

function guardarCuentasEnStorage() {
    guardarPerfilUsuario();
}

function actualizarUIUsuarioActivo() {
    actualizarUIPerfilUsuario();
}

function actualizarUIMultiversoFama(tabFiltro = "general") {
    const multiverso = obtenerMultiversoHistorial();
    const stats = multiverso.statsPorJuego;

    // Métricas Generales Acumuladas
    let totalPartidas = 0;
    let totalVictorias = 0;
    let totalPuntos = 0;

    Object.values(stats).forEach(s => {
        totalPartidas += s.partidas || 0;
        totalVictorias += s.victorias || 0;
        totalPuntos += s.puntos || 0;
    });

    if (dom.famaTotalMatchesCount) dom.famaTotalMatchesCount.textContent = totalPartidas;
    if (dom.famaTotalPointsDistributed) dom.famaTotalPointsDistributed.textContent = totalPuntos;
    if (dom.famaGlobalWinRate) {
        const rate = totalPartidas > 0 ? Math.round((totalVictorias / totalPartidas) * 100) : 0;
        dom.famaGlobalWinRate.textContent = `${rate}%`;
    }

    // Filtrar partidas según pestaña
    const partidasFiltradas = tabFiltro === "general"
        ? multiverso.partidas
        : multiverso.partidas.filter(p => p.juego === tabFiltro);

    // Actualizar badges en botones de pestañas
    const tabBtns = document.querySelectorAll(".fama-tab-btn");
    tabBtns.forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.famaTab === tabFiltro);
    });

    // Actualizar tabla
    renderTablaFamaMultiverso(partidasFiltradas, tabFiltro);
}

function renderTablaFamaMultiverso(partidas, tabFiltro) {
    if (!dom.famaLeaderboardBody) return;
    dom.famaLeaderboardBody.innerHTML = "";

    // Agrupar por jugador
    const jugadoresMap = {};
    partidas.forEach(p => {
        if (!jugadoresMap[p.jugador]) {
            jugadoresMap[p.jugador] = { victorias: 0, puntos: 0, partidas: 0 };
        }
        jugadoresMap[p.jugador].partidas++;
        if (p.gano) jugadoresMap[p.jugador].victorias++;
        jugadoresMap[p.jugador].puntos += p.puntos;
    });

    const ranking = Object.entries(jugadoresMap)
        .map(([nombre, s]) => ({ nombre, ...s }))
        .sort((a, b) => b.victorias - a.victorias || b.puntos - a.puntos);

    if (ranking.length > 0 && dom.famaTopChampionName) {
        dom.famaTopChampionName.textContent = ranking[0].nombre;
    }

    if (ranking.length === 0) {
        dom.famaLeaderboardBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem; color: #8e97a8;">No hay partidas registradas en esta modalidad. ¡Jugá tu primera partida!</td></tr>`;
        return;
    }

    ranking.forEach((j, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${i + 1}</strong></td>
            <td><strong>${j.nombre}</strong> ${i === 0 ? '👑' : ''}</td>
            <td><span class="badge badge--success">${j.victorias}</span></td>
            <td>${j.partidas - j.victorias}</td>
            <td>0</td>
            <td><strong>${j.puntos}</strong></td>
            <td>🔥 x${Math.min(5, j.victorias + 1)}</td>
            <td>${tabFiltro}</td>
        `;
        dom.famaLeaderboardBody.appendChild(tr);
    });
}

// Render de avatar con marco evolutivo Y badges especiales
function obtenerBadgesEspecialesHtml(insignias) {
    if (!insignias) return "";
    let badges = "";
    if (insignias.bomba) badges += `<span class="avatar-badge-special badge-spec--bomba" title="Artificiero: Campeón de La Bomba">💣</span>`;
    if (insignias.impostor) badges += `<span class="avatar-badge-special badge-spec--impostor" title="Detective: Campeón de Impostor">🕵️</span>`;
    if (insignias.memotest) badges += `<span class="avatar-badge-special badge-spec--memotest" title="Sinapsis: Campeón de Memotest">🧠</span>`;
    if (insignias.bolillero) badges += `<span class="avatar-badge-special badge-spec--bolillero" title="Maestro Bolillero">🎲</span>`;
    if (insignias.triatlon) badges += `<span class="avatar-badge-special badge-spec--triatlon" title="Titán Triatleta">🏅</span>`;
    return badges;
}

/* =========================================================
   SALA MULTIJUGADOR V24.6: TABS, SELECCIÓN DE JUEGO Y FORMATO
   ========================================================= */

function adaptarOpcionesSegunModo(formatoId, juegoId) {
    const esCoop = formatoId === "coop";
    const juego = juegoId || onlineDueloEstado.juegoSeleccionado || "bomba";

    // En Cooperativo no hay desempate entre participantes
    const tiebreakerRow = document.getElementById("dueloOnlineTiebreakerRow");
    if (tiebreakerRow) {
        tiebreakerRow.classList.toggle("hidden", esCoop);
    }

    // Reglas contextuales de Bomba según formato
    const bombaVersusRow = document.getElementById("dueloBombaVersusRow");
    const bombaCoopRow = document.getElementById("dueloBombaCoopRow");
    if (bombaVersusRow) bombaVersusRow.classList.toggle("hidden", esCoop);
    if (bombaCoopRow) bombaCoopRow.classList.toggle("hidden", !esCoop);
}

function seleccionarJuegoLobby(juegoId) {
    if (dom.dueloOnlineGameSelect) {
        dom.dueloOnlineGameSelect.value = juegoId;
    }
    onlineDueloEstado.juegoSeleccionado = juegoId;

    const cards = document.querySelectorAll(".duelo-game-card");
    cards.forEach(card => {
        card.classList.toggle("is-selected", card.dataset.game === juegoId);
    });

    const gameNames = {
        bomba: "Desactivá la Bomba",
        bolillero: "Bolillero de Estudio",
        impostor: "Caza al Impostor",
        memotest: "Memotest Teórico",
        triatlon: "Triatlón Académico"
    };
    const gameIcons = {
        bomba: "💣",
        bolillero: "🎲",
        impostor: "🕵️‍♂️",
        memotest: "🧠",
        triatlon: "🏅"
    };

    const titleElem = document.getElementById("dueloSummaryGameTitle");
    const iconElem = document.getElementById("dueloSummaryIcon");
    if (titleElem) titleElem.textContent = gameNames[juegoId] || juegoId;
    if (iconElem) iconElem.textContent = gameIcons[juegoId] || "🎮";

    if (dom.dueloLaunchOnlineMatchBtn) {
        const gameTitles = {
            bomba: "💣 ¡INICIAR DESACTIVÁ LA BOMBA!",
            bolillero: "🎲 ¡COMENZAR BOLILLERO ONLINE!",
            impostor: "🕵️‍♂️ ¡INICIAR CAZA AL IMPOSTOR!",
            memotest: "🧠 ¡INICIAR MEMOTEST CONECTADO!",
            triatlon: "🏅 ¡INICIAR TRIATLÓN ACADÉMICO!"
        };
        dom.dueloLaunchOnlineMatchBtn.innerHTML = gameTitles[juegoId] || "🚀 ¡COMENZAR PARTIDA AHORA!";
    }

    // Alternar visibilidad de los paneles de opciones específicos por juego
    const panelesOpciones = {
        bomba: document.getElementById("dueloOpcionesBomba"),
        bolillero: document.getElementById("dueloOpcionesBolillero"),
        impostor: document.getElementById("dueloOpcionesImpostor"),
        memotest: document.getElementById("dueloOpcionesMemotest"),
        triatlon: document.getElementById("dueloOpcionesTriatlon")
    };
    Object.entries(panelesOpciones).forEach(([id, panel]) => {
        if (panel) {
            panel.classList.toggle("hidden", id !== juegoId);
        }
    });

    adaptarOpcionesSegunModo(onlineDueloEstado.formatoModo || "versus", juegoId);

    // Scroll suave y enfoque al Paso 2 (Modalidad)
    const step2 = document.getElementById("dueloStep2Modo");
    if (step2) {
        step2.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}
window.seleccionarJuegoLobby = seleccionarJuegoLobby;

function seleccionarFormatoLobby(formatoId) {
    if (dom.dueloOnlineModoSelect) dom.dueloOnlineModoSelect.value = formatoId;
    if (dom.dueloOnlineModeSelect) dom.dueloOnlineModeSelect.value = formatoId;
    onlineDueloEstado.formatoModo = formatoId;

    const cards = document.querySelectorAll(".duelo-format-card");
    cards.forEach(card => {
        card.classList.toggle("is-selected", card.dataset.mode === formatoId);
    });

    const hint = document.getElementById("dueloOnlineModoHint");
    if (hint) {
        hint.textContent = formatoId === "coop"
            ? "Colaboren en equipo contra el cronómetro con relevos y maletín compartido."
            : "Compitan entre todos con podio en vivo y robo relámpago.";
    }

    const modeTitle = document.getElementById("dueloSummaryModeTitle");
    if (modeTitle) {
        modeTitle.textContent = formatoId === "coop" ? "🤝 Cooperativo en Equipo" : "⚔️ Versus Competitivo";
        modeTitle.className = formatoId === "coop" ? "badge badge--success" : "badge badge--accent";
    }

    adaptarOpcionesSegunModo(formatoId, onlineDueloEstado.juegoSeleccionado);

    // Scroll suave y enfoque al Paso 3 (Opciones)
    const step3 = document.getElementById("dueloStep3Opciones");
    if (step3) {
        step3.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}
window.seleccionarFormatoLobby = seleccionarFormatoLobby;

function setupDueloLobbyTabs() {
    const tabHost = document.getElementById("dueloTabHostBtn");
    const tabJoin = document.getElementById("dueloTabJoinBtn");
    const cardHost = document.getElementById("dueloLobbyCardHost");
    const cardJoin = document.getElementById("dueloLobbyCardJoin");

    if (tabHost && tabJoin) {
        tabHost.addEventListener("click", () => {
            tabHost.classList.add("is-active");
            tabJoin.classList.remove("is-active");
            if (cardHost) cardHost.classList.add("is-active");
            if (cardJoin) cardJoin.classList.remove("is-active");
        });

        tabJoin.addEventListener("click", () => {
            tabJoin.classList.add("is-active");
            tabHost.classList.remove("is-active");
            if (cardJoin) cardJoin.classList.add("is-active");
            if (cardHost) cardHost.classList.remove("is-active");
            const codeInput = document.getElementById("dueloJoinRoomCode");
            if (codeInput) codeInput.focus();
        });
    }

    const gameCards = document.querySelectorAll(".duelo-game-card");
    gameCards.forEach(card => {
        card.addEventListener("click", () => {
            seleccionarJuegoLobby(card.dataset.game);
        });
    });

    const formatCards = document.querySelectorAll(".duelo-format-card");
    formatCards.forEach(card => {
        card.addEventListener("click", () => {
            seleccionarFormatoLobby(card.dataset.mode);
        });
    });

    // Chips de Selección de Fuente de Material (PDF vs General)
    const chipPdf = document.getElementById("dueloChipPdf");
    const chipGeneral = document.getElementById("dueloChipGeneral");
    if (chipPdf) {
        chipPdf.addEventListener("click", () => {
            onlineDueloEstado.fuenteMaterial = "pdf";
            actualizarCardPdfEnCrearSala();
        });
    }
    if (chipGeneral) {
        chipGeneral.addEventListener("click", () => {
            onlineDueloEstado.fuenteMaterial = "general";
            actualizarCardPdfEnCrearSala();
        });
    }

    // Dropzone y Botones de Carga de PDF
    const emptyUploadBtn = document.getElementById("dueloEmptyUploadPdfBtn");
    const dropzone = document.getElementById("dueloPdfEmptyZone");
    const fileInput = document.getElementById("dueloOnlinePdfInput");

    if (emptyUploadBtn && fileInput) {
        emptyUploadBtn.addEventListener("click", () => fileInput.click());
    }

    if (dropzone && fileInput) {
        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropzone.classList.add("is-dragover");
        });
        dropzone.addEventListener("dragleave", () => {
            dropzone.classList.remove("is-dragover");
        });
        dropzone.addEventListener("drop", async (e) => {
            e.preventDefault();
            dropzone.classList.remove("is-dragover");
            const file = e.dataTransfer.files[0];
            if (file) {
                await procesarYVincularPdfGlobal(file);
            }
        });
    }

    // Botón para que los invitados alternen su estado "Estoy Listo"
    const guestReadyBtn = document.getElementById("dueloGuestReadyBtn");
    if (guestReadyBtn) {
        guestReadyBtn.addEventListener("click", toggleReadyInvitado);
    }

    // Default select
    seleccionarJuegoLobby("bomba");
    seleccionarFormatoLobby("versus");
}
window.setupDueloLobbyTabs = setupDueloLobbyTabs;

/* =========================================================
   VINCULACIÓN DE EVENTOS PARA LOS NUEVOS MÓDULOS (v5)
   ========================================================= */

function registrarEventosModulosV5() {
    // 1. Prompt para Gemini
    const geminiBtns = [dom.copyGeminiPromptBtn, dom.drawerGeminiPromptBtn, dom.copyGeminiPromptInnerBtn];
    geminiBtns.forEach(btn => {
        if (btn) btn.addEventListener("click", copiarPromptGemini);
    });

    if (dom.closeGeminiPromptModalBtn) {
        dom.closeGeminiPromptModalBtn.addEventListener("click", () => {
            if (dom.geminiPromptModal) {
                if (typeof dom.geminiPromptModal.close === "function") dom.geminiPromptModal.close();
                else dom.geminiPromptModal.removeAttribute("open");
            }
        });
    }
    if (dom.closeGeminiPromptBottomBtn) {
        dom.closeGeminiPromptBottomBtn.addEventListener("click", () => {
            if (dom.geminiPromptModal) {
                if (typeof dom.geminiPromptModal.close === "function") dom.geminiPromptModal.close();
                else dom.geminiPromptModal.removeAttribute("open");
            }
        });
    }

    // 2. Tarjetas de Home Solo
    const openSoloBomba = document.getElementById("openSoloBombaBtn");
    if (openSoloBomba) openSoloBomba.addEventListener("click", () => abrirArenaJuego("bomba", "solo"));

    const openSoloImpostor = document.getElementById("openSoloImpostorBtn");
    if (openSoloImpostor) openSoloImpostor.addEventListener("click", () => abrirArenaJuego("impostor", "solo"));

    const openSoloMemotest = document.getElementById("openSoloMemotestBtn");
    if (openSoloMemotest) openSoloMemotest.addEventListener("click", () => abrirArenaJuego("memotest", "solo"));

    // 3. Tarjetas de Home Duelo
    const openDueloBolillero = document.getElementById("openDueloBolilleroCardBtn");
    if (openDueloBolillero) {
        openDueloBolillero.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("bolillero");
        });
    }

    const openDueloBomba = document.getElementById("openDueloBombaCardBtn");
    if (openDueloBomba) {
        openDueloBomba.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("bomba");
        });
    }

    const openDueloImpostor = document.getElementById("openDueloImpostorCardBtn");
    if (openDueloImpostor) {
        openDueloImpostor.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("impostor");
        });
    }

    const openDueloMemotest = document.getElementById("openDueloMemotestCardBtn");
    if (openDueloMemotest) {
        openDueloMemotest.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("memotest");
        });
    }

    const openDueloTriatlon = document.getElementById("openDueloTriatlonCardBtn");
    if (openDueloTriatlon) {
        openDueloTriatlon.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("triatlon");
        });
    }

    // 4. Botones del Drawer lateral Solo y Duelo
    const drawerSoloBomba = document.getElementById("drawerNavSoloBomba");
    if (drawerSoloBomba) {
        drawerSoloBomba.addEventListener("click", () => {
            abrirArenaJuego("bomba", "solo");
            cerrarDrawerMenu();
        });
    }

    const drawerSoloImpostor = document.getElementById("drawerNavSoloImpostor");
    if (drawerSoloImpostor) {
        drawerSoloImpostor.addEventListener("click", () => {
            abrirArenaJuego("impostor", "solo");
            cerrarDrawerMenu();
        });
    }

    const drawerSoloMemotest = document.getElementById("drawerNavSoloMemotest");
    if (drawerSoloMemotest) {
        drawerSoloMemotest.addEventListener("click", () => {
            abrirArenaJuego("memotest", "solo");
            cerrarDrawerMenu();
        });
    }

    const drawerOnlineBolillero = document.getElementById("drawerNavOnlineBolillero");
    if (drawerOnlineBolillero) {
        drawerOnlineBolillero.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("bolillero");
            cerrarDrawerMenu();
        });
    }

    const drawerOnlineBomba = document.getElementById("drawerNavOnlineBomba");
    if (drawerOnlineBomba) {
        drawerOnlineBomba.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("bomba");
            cerrarDrawerMenu();
        });
    }

    const drawerOnlineImpostor = document.getElementById("drawerNavOnlineImpostor");
    if (drawerOnlineImpostor) {
        drawerOnlineImpostor.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("impostor");
            cerrarDrawerMenu();
        });
    }

    const drawerOnlineMemotest = document.getElementById("drawerNavOnlineMemotest");
    if (drawerOnlineMemotest) {
        drawerOnlineMemotest.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("memotest");
            cerrarDrawerMenu();
        });
    }

    const drawerOnlineTriatlon = document.getElementById("drawerNavOnlineTriatlon");
    if (drawerOnlineTriatlon) {
        drawerOnlineTriatlon.addEventListener("click", () => {
            cambiarVista("duelo");
            seleccionarJuegoLobby("triatlon");
            cerrarDrawerMenu();
        });
    }

    // 5. Arena Controles
    if (dom.juegosBackBtn) {
        dom.juegosBackBtn.addEventListener("click", () => {
            clearInterval(juegosEduEstado.bomba.timerId);
            clearInterval(juegosEduEstado.impostor.timerId);
            clearInterval(juegosEduEstado.memotest.timerId);
            if (juegosEduEstado.modo === "duelo") {
                cambiarVista("juntos");
            } else {
                cambiarVista("solo");
            }
        });
    }

    
    if (dom.bombaPlayAgainBtn) {
        dom.bombaPlayAgainBtn.addEventListener("click", async () => {
            mostrarToast("🔄 Generando nuevas preguntas teóricas para la bomba...");
            await abrirArenaJuego("bomba", juegosEduEstado.modo, null, true);
        });
    }
    if (dom.bombaExitBtn) dom.bombaExitBtn.addEventListener("click", () => cambiarVista("home"));

    // Controles de Configuración Previa de Caza al Impostor
    if (dom.impostorTimeSelector) {
        dom.impostorTimeSelector.addEventListener("click", (e) => {
            const btn = e.target.closest(".impostor-pill-btn");
            if (btn && btn.dataset.time) {
                juegosEduEstado.impostor.tiempoSeleccionado = Number(btn.dataset.time);
                actualizarSetupImpostorUI();
            }
        });
    }
    if (dom.impostorRoundsSelector) {
        dom.impostorRoundsSelector.addEventListener("click", (e) => {
            const btn = e.target.closest(".impostor-pill-btn");
            if (btn && btn.dataset.rounds) {
                juegosEduEstado.impostor.maxOlas = Number(btn.dataset.rounds);
                actualizarSetupImpostorUI();
            }
        });
    }
    if (dom.impostorStartGameBtn) {
        dom.impostorStartGameBtn.addEventListener("click", comenzarPartidaImpostor);
    }

    if (dom.impostorNextWaveBtn) dom.impostorNextWaveBtn.addEventListener("click", siguienteOlaImpostor);

    // Comodines para Caza al Impostor (Modo Solo)
    if (dom.impostorBtn5050) dom.impostorBtn5050.addEventListener("click", usarComodinImpostor5050);
    if (dom.impostorBtnTiempo) dom.impostorBtnTiempo.addEventListener("click", usarComodinImpostorTiempo);
    if (dom.impostorBtnSocorro) dom.impostorBtnSocorro.addEventListener("click", usarComodinImpostorSocorro);

    // 6. Pestañas de Salón de la Fama
    const famaTabBtns = document.querySelectorAll(".fama-tab-btn");
    famaTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            actualizarUIMultiversoFama(btn.dataset.famaTab);
        });
    });

    // 7. Configuración de Pestañas y Tarjetas de la Sala Multijugador
    setupDueloLobbyTabs();

    // 8. Botón volver al lobby de la sala desde la bomba
    const btnBombaLobby = document.getElementById("bombaBackToLobbyBtn");
    if (btnBombaLobby) {
        btnBombaLobby.addEventListener("click", () => {
            if (onlineDueloEstado.esHost) {
                publicarMensajeSala({ tipo: "BOMBA_VOLVER_LOBBY" });
            }
            clearInterval(juegosEduEstado.bomba.timerId);
            juegosEduEstado.esOnline = false;
            cambiarVista("duelo");
            mostrarSalaDeEsperaOnline(onlineDueloEstado.codigoSala);
        });
    }
}

// Hook al inicializar la aplicación
setTimeout(() => {
    try {
        registrarEventosModulosV5();
        actualizarUIMultiversoFama("general");
    } catch (e) {
        console.warn("Auto-registro módulos v5:", e);
    }
}, 300);

/* =========================================================
   MÓDULO: ESTUDIAR SOLO, ESTUDIAR JUNTOS Y PIZARRÓN / NOTAS
   ========================================================= */
function irASeccionEstudio(idSeccion, navId) {
    if (typeof cambiarVista === "function") {
        cambiarVista("home");
    }
    setTimeout(() => {
        const el = document.getElementById(idSeccion);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            el.classList.remove("section-highlight");
            void el.offsetWidth; // trigger reflow
            el.classList.add("section-highlight");
            setTimeout(() => el.classList.remove("section-highlight"), 1500);
        }
    }, 80);

    // Actualizar active state en navbars
    document.querySelectorAll(".top-nav__links .nav-link, .drawer-nav .drawer-nav-item").forEach(btn => {
        btn.classList.remove("is-active");
    });
    const activeNavBtn = document.getElementById(navId);
    if (activeNavBtn) activeNavBtn.classList.add("is-active");
}

(function initSoloJuntosAndScratchpad() {
    // 2. Botones Cooperativos en Estudiar Juntos
    const openCoopBombaBtn = document.getElementById("openCoopBombaBtn");
    if (openCoopBombaBtn) {
        openCoopBombaBtn.addEventListener("click", () => {
            if (typeof abrirArenaJuego === "function") {
                abrirArenaJuego("bomba");
            }
        });
    }

    const openCoopMemotestBtn = document.getElementById("openCoopMemotestBtn");
    if (openCoopMemotestBtn) {
        openCoopMemotestBtn.addEventListener("click", () => {
            if (typeof abrirArenaJuego === "function") {
                abrirArenaJuego("memotest");
            }
        });
    }

    // 3. Pizarrón y Notas Flotante
    const scratchpadCard = document.getElementById("scratchpadFloatingCard");
    const scratchpadPill = document.getElementById("scratchpadPill");
    const drawerScratchpadBtn = document.getElementById("drawerScratchpadBtn");
    const pinScratchpadBtn = document.getElementById("pinScratchpadBtn");
    const minimizeScratchpadBtn = document.getElementById("minimizeScratchpadBtn");
    const scratchpadToggleModeBtn = document.getElementById("scratchpadToggleModeBtn");
    const scratchpadModeBadge = document.getElementById("scratchpadModeBadge");
    const scratchpadDrawToolbar = document.getElementById("scratchpadDrawToolbar");
    const scratchpadCanvasWrap = document.getElementById("scratchpadCanvasWrap");
    const scratchpadTextWrap = document.getElementById("scratchpadTextWrap");
    const scratchpadCanvas = document.getElementById("scratchpadCanvas");
    const scratchpadTextarea = document.getElementById("scratchpadTextarea");
    const scratchpadPenBtn = document.getElementById("scratchpadPenBtn");
    const scratchpadEraserBtn = document.getElementById("scratchpadEraserBtn");
    const scratchpadClearBtn = document.getElementById("scratchpadClearBtn");
    const scratchpadClearNotesBtn = document.getElementById("scratchpadClearNotesBtn");

    if (!scratchpadCard) return;

    let scratchState = {
        isMinimized: true,
        isPinned: false,
        mode: "drawing",
        tool: "pen",
        color: "#ffffff",
        penSize: 2.5,
        eraserSize: 22
    };

    function abrirPizarron() {
        scratchState.isMinimized = false;
        scratchpadCard.classList.remove("is-minimized");
        scratchpadCard.setAttribute("aria-hidden", "false");
        if (scratchState.mode === "drawing") {
            ajustarResolucionCanvas();
        }
    }

    function cerrarPizarron() {
        if (scratchState.isPinned) return;
        scratchState.isMinimized = true;
        scratchpadCard.classList.add("is-minimized");
        scratchpadCard.setAttribute("aria-hidden", "true");
    }

    function togglePizarron() {
        if (scratchpadCard.classList.contains("is-minimized")) {
            abrirPizarron();
        } else {
            cerrarPizarron();
        }
    }

    // Exponer globalmente para listeners externos
    window.togglePizarron = togglePizarron;
    window.abrirPizarron = abrirPizarron;
    window.cerrarPizarron = cerrarPizarron;
    window.toggleTarjetaScratchpad = togglePizarron;
    window.abrirTarjetaScratchpad = abrirPizarron;

    if (scratchpadPill) {
        scratchpadPill.addEventListener("click", togglePizarron);
    }
    if (drawerScratchpadBtn) {
        drawerScratchpadBtn.addEventListener("click", () => {
            if (typeof cerrarMenuDrawer === "function") cerrarMenuDrawer();
            abrirPizarron();
        });
    }
    if (minimizeScratchpadBtn) {
        minimizeScratchpadBtn.addEventListener("click", () => {
            scratchState.isPinned = false;
            if (pinScratchpadBtn) pinScratchpadBtn.classList.remove("is-pinned");
            cerrarPizarron();
        });
    }
    if (pinScratchpadBtn) {
        pinScratchpadBtn.addEventListener("click", () => {
            scratchState.isPinned = !scratchState.isPinned;
            pinScratchpadBtn.classList.toggle("is-pinned", scratchState.isPinned);
            pinScratchpadBtn.title = scratchState.isPinned ? "Desfijar de pantalla (📌)" : "Fijar en pantalla (📌)";
        });
    }

    // Alternar entre Dibujo y Notas
    if (scratchpadToggleModeBtn) {
        scratchpadToggleModeBtn.addEventListener("click", () => {
            if (scratchState.mode === "drawing") {
                scratchState.mode = "notes";
                scratchpadToggleModeBtn.textContent = "✏️ Pizarrón";
                if (scratchpadModeBadge) {
                    scratchpadModeBadge.textContent = "Notas";
                    scratchpadModeBadge.className = "badge badge--accent";
                }
                if (scratchpadDrawToolbar) scratchpadDrawToolbar.style.display = "none";
                if (scratchpadCanvasWrap) scratchpadCanvasWrap.classList.add("hidden");
                if (scratchpadTextWrap) scratchpadTextWrap.classList.remove("hidden");
                if (scratchpadTextarea) scratchpadTextarea.focus();
            } else {
                scratchState.mode = "drawing";
                scratchpadToggleModeBtn.textContent = "📄 Notas";
                if (scratchpadModeBadge) {
                    scratchpadModeBadge.textContent = "Dibujo";
                    scratchpadModeBadge.className = "badge badge--success";
                }
                if (scratchpadDrawToolbar) scratchpadDrawToolbar.style.display = "flex";
                if (scratchpadCanvasWrap) scratchpadCanvasWrap.classList.remove("hidden");
                if (scratchpadTextWrap) scratchpadTextWrap.classList.add("hidden");
                ajustarResolucionCanvas();
            }
        });
    }

    // Persistencia de notas de texto
    const STORAGE_KEY_NOTES = "luibanez-scratchpad-notes";
    if (scratchpadTextarea) {
        const savedNotes = localStorage.getItem(STORAGE_KEY_NOTES);
        if (savedNotes) scratchpadTextarea.value = savedNotes;

        scratchpadTextarea.addEventListener("input", () => {
            localStorage.setItem(STORAGE_KEY_NOTES, scratchpadTextarea.value);
        });
    }
    if (scratchpadClearNotesBtn && scratchpadTextarea) {
        scratchpadClearNotesBtn.addEventListener("click", () => {
            scratchpadTextarea.value = "";
            localStorage.removeItem(STORAGE_KEY_NOTES);
        });
    }

    // Motor de Dibujo Canvas (Pointer events)
    if (scratchpadCanvas) {
        const ctx = scratchpadCanvas.getContext("2d");
        const STORAGE_KEY_DRAWING = "luibanez-scratchpad-drawing";
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function ajustarResolucionCanvas() {
            const rect = scratchpadCanvas.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = scratchpadCanvas.width;
                tempCanvas.height = scratchpadCanvas.height;
                const tempCtx = tempCanvas.getContext("2d");
                tempCtx.drawImage(scratchpadCanvas, 0, 0);

                scratchpadCanvas.width = Math.round(rect.width);
                scratchpadCanvas.height = Math.round(rect.height);
                ctx.lineCap = "round";
                ctx.lineJoin = "round";

                ctx.drawImage(tempCanvas, 0, 0, scratchpadCanvas.width, scratchpadCanvas.height);
            }
        }

        const savedDrawing = localStorage.getItem(STORAGE_KEY_DRAWING);
        if (savedDrawing) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, scratchpadCanvas.width, scratchpadCanvas.height);
            };
            img.src = savedDrawing;
        }

        function guardarDibujo() {
            try {
                localStorage.setItem(STORAGE_KEY_DRAWING, scratchpadCanvas.toDataURL("image/png"));
            } catch(e) {}
        }

        function getPos(e) {
            const rect = scratchpadCanvas.getBoundingClientRect();
            const scaleX = scratchpadCanvas.width / rect.width;
            const scaleY = scratchpadCanvas.height / rect.height;
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        }

        scratchpadCanvas.addEventListener("pointerdown", (e) => {
            scratchpadCanvas.setPointerCapture(e.pointerId);
            isDrawing = true;
            const pos = getPos(e);
            lastX = pos.x;
            lastY = pos.y;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(lastX, lastY);
            ctx.strokeStyle = scratchState.tool === "eraser" ? "#0d1117" : scratchState.color;
            ctx.lineWidth = scratchState.tool === "eraser" ? scratchState.eraserSize : scratchState.penSize;
            ctx.stroke();
        });

        scratchpadCanvas.addEventListener("pointermove", (e) => {
            if (!isDrawing) return;
            const pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = scratchState.tool === "eraser" ? "#0d1117" : scratchState.color;
            ctx.lineWidth = scratchState.tool === "eraser" ? scratchState.eraserSize : scratchState.penSize;
            ctx.stroke();
            lastX = pos.x;
            lastY = pos.y;
        });

        const stopDrawing = () => {
            if (isDrawing) {
                isDrawing = false;
                guardarDibujo();
            }
        };

        scratchpadCanvas.addEventListener("pointerup", stopDrawing);
        scratchpadCanvas.addEventListener("pointercancel", stopDrawing);

        // Colores
        document.querySelectorAll("#scratchpadDrawToolbar .color-dot").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll("#scratchpadDrawToolbar .color-dot").forEach(d => d.classList.remove("is-active"));
                btn.classList.add("is-active");
                scratchState.color = btn.getAttribute("data-color") || "#ffffff";
                scratchState.tool = "pen";
                if (scratchpadPenBtn) scratchpadPenBtn.classList.add("is-active");
                if (scratchpadEraserBtn) scratchpadEraserBtn.classList.remove("is-active");
            });
        });

        // Lápiz
        if (scratchpadPenBtn) {
            scratchpadPenBtn.addEventListener("click", () => {
                scratchState.tool = "pen";
                scratchpadPenBtn.classList.add("is-active");
                if (scratchpadEraserBtn) scratchpadEraserBtn.classList.remove("is-active");
            });
        }

        // Goma
        if (scratchpadEraserBtn) {
            scratchpadEraserBtn.addEventListener("click", () => {
                scratchState.tool = "eraser";
                scratchpadEraserBtn.classList.add("is-active");
                if (scratchpadPenBtn) scratchpadPenBtn.classList.remove("is-active");
            });
        }

        // Limpiar
        if (scratchpadClearBtn) {
            scratchpadClearBtn.addEventListener("click", () => {
                ctx.clearRect(0, 0, scratchpadCanvas.width, scratchpadCanvas.height);
                localStorage.removeItem(STORAGE_KEY_DRAWING);
            });
        }
    }

    // Drag & Drop
    const header = document.getElementById("scratchpadCardHeader");
    if (header) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.addEventListener("pointerdown", (e) => {
            if (e.target.closest("button")) return;
            isDragging = true;
            header.setPointerCapture(e.pointerId);
            scratchpadCard.classList.add("is-dragging");

            const rect = scratchpadCard.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = rect.left;
            initialTop = rect.top;

            scratchpadCard.style.right = "auto";
            scratchpadCard.style.left = initialLeft + "px";
            scratchpadCard.style.top = initialTop + "px";
        });

        header.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newLeft = initialLeft + dx;
            let newTop = initialTop + dy;

            const maxLeft = window.innerWidth - scratchpadCard.offsetWidth - 10;
            const maxTop = window.innerHeight - scratchpadCard.offsetHeight - 10;

            newLeft = Math.max(10, Math.min(newLeft, maxLeft));
            newTop = Math.max(10, Math.min(newTop, maxTop));

            scratchpadCard.style.left = newLeft + "px";
            scratchpadCard.style.top = newTop + "px";
        });

        const stopDrag = () => {
            if (isDragging) {
                isDragging = false;
                scratchpadCard.classList.remove("is-dragging");
            }
        };

        header.addEventListener("pointerup", stopDrag);
        header.addEventListener("pointercancel", stopDrag);
    }
})();

/* ==========================================================
   MÓDULO: LABORATORIO DE PRÁCTICAS & MESA DE TRABAJO NUMÉRICA
   (Estadística, Probabilidades, Tablas y Resolución por Hitos)
   ========================================================== */

const laboratorioEstado = {
    iniciado: false,
    temaSeleccionado: "descriptiva", // "descriptiva" | "bayes" | "normal" | "discretas" | "integral"
    pdfTexto: "",
    pdfNombre: "",
    pdfPaginas: 0,
    ejercicioActual: null,
    intentosPorPregunta: {},
    resueltasPorPregunta: {},
    pistasReveladas: {},
    solucionesReveladas: {},
    xpTotal: 0,
    tabActiva: "freq",
    distribucionActiva: "normal",
    scratchState: {
        drawing: false,
        lastX: 0,
        lastY: 0,
        color: "#38bdf8",
        tool: "pen",
        size: 2
    },
    // La grilla empieza vacía para que el alumno complete x e f deduciéndolas del enunciado
    tablaDatos: [
        { xi: "", fi: "" },
        { xi: "", fi: "" },
        { xi: "", fi: "" },
        { xi: "", fi: "" }
    ],
    columnasActivas: ["xifi", "var"] // xi, fi, xi·fi y xi²·fi activas por defecto
};

// ==========================================
// MOTOR MATEMÁTICO DE PROBABILIDAD (PURO JS)
// ==========================================

function labErf(x) {
    // Aproximación de Abramowitz & Stegun 7.1.26 (error < 1.5e-7)
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function labNormalCDF(x, mu = 0, sigma = 1) {
    if (sigma <= 0) sigma = 1e-6;
    const z = (x - mu) / (sigma * Math.SQRT2);
    return 0.5 * (1 + labErf(z));
}

function labFactorialLog(n) {
    let sum = 0;
    for (let i = 2; i <= n; i++) sum += Math.log(i);
    return sum;
}

function labCombinatoria(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    return Math.round(Math.exp(labFactorialLog(n) - labFactorialLog(k) - labFactorialLog(n - k)));
}

function labBinomialPMF(n, p, k) {
    if (k < 0 || k > n) return 0;
    return labCombinatoria(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function labPoissonPMF(lambda, k) {
    if (k < 0 || lambda <= 0) return 0;
    return Math.exp(-lambda + k * Math.log(lambda) - labFactorialLog(k));
}

// ==========================================
// RENDERIZADOR SVG DE LA CAMPANA DE GAUSS
// ==========================================

function renderizarCampanaGaussSVG(mu, sigma, x, cola = "left") {
    if (!dom.labGaussSvg) return;
    if (sigma <= 0) sigma = 1e-4;

    const width = 600;
    const height = 180;
    const padX = 40;
    const padYBottom = 30;
    const padYTop = 15;
    const graphW = width - (padX * 2);
    const graphH = height - padYBottom - padYTop;

    const xMin = mu - (3.5 * sigma);
    const xMax = mu + (3.5 * sigma);
    const peakPdf = 1 / (sigma * Math.sqrt(2 * Math.PI));

    function toSvgX(val) {
        return padX + ((val - xMin) / (xMax - xMin)) * graphW;
    }

    function toSvgY(pdfVal) {
        return height - padYBottom - (pdfVal / peakPdf) * graphH;
    }

    // Puntos de la curva
    const numPoints = 120;
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
        const currX = xMin + (i / numPoints) * (xMax - xMin);
        const z = (currX - mu) / sigma;
        const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
        points.push({ x: toSvgX(currX), y: toSvgY(pdf), val: currX });
    }

    // Path de la línea de la campana
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        pathD += ` L ${points[i].x} ${points[i].y}`;
    }

    // Polígono de área sombreada según cola seleccionada
    let shadePoints = [];
    const baselineY = height - padYBottom;

    if (cola === "left") {
        const sub = points.filter(p => p.val <= x);
        if (sub.length > 0) {
            shadePoints.push(`${sub[0].x},${baselineY}`);
            sub.forEach(p => shadePoints.push(`${p.x},${p.y}`));
            const lastX = toSvgX(Math.min(x, xMax));
            const zAtX = (x - mu) / sigma;
            const pdfAtX = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * zAtX * zAtX);
            shadePoints.push(`${lastX},${toSvgY(pdfAtX)}`);
            shadePoints.push(`${lastX},${baselineY}`);
        }
    } else if (cola === "right") {
        const sub = points.filter(p => p.val >= x);
        if (sub.length > 0) {
            const firstX = toSvgX(Math.max(x, xMin));
            const zAtX = (x - mu) / sigma;
            const pdfAtX = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * zAtX * zAtX);
            shadePoints.push(`${firstX},${baselineY}`);
            shadePoints.push(`${firstX},${toSvgY(pdfAtX)}`);
            sub.forEach(p => shadePoints.push(`${p.x},${p.y}`));
            shadePoints.push(`${sub[sub.length - 1].x},${baselineY}`);
        }
    } else {
        // Bilateral
        const delta = Math.abs(x - mu);
        const low = mu - delta;
        const high = mu + delta;
        const sub = points.filter(p => p.val >= low && p.val <= high);
        if (sub.length > 0) {
            shadePoints.push(`${toSvgX(low)},${baselineY}`);
            sub.forEach(p => shadePoints.push(`${p.x},${p.y}`));
            shadePoints.push(`${toSvgX(high)},${baselineY}`);
        }
    }

    const shadePolygon = shadePoints.length > 0
        ? `<polygon points="${shadePoints.join(" ")}" fill="rgba(56, 189, 248, 0.35)" />`
        : "";

    // Línea de la Media (μ)
    const muSvgX = toSvgX(mu);
    const meanLine = `
        <line x1="${muSvgX}" y1="${padYTop}" x2="${muSvgX}" y2="${baselineY}" stroke="#34d399" stroke-dasharray="4 4" stroke-width="1.5" />
        <text x="${muSvgX}" y="${baselineY + 18}" fill="#34d399" font-size="11" text-anchor="middle" font-weight="bold">μ=${mu}</text>
    `;

    // Línea de X
    const xSvgX = Math.max(padX, Math.min(width - padX, toSvgX(x)));
    const xLine = `
        <line x1="${xSvgX}" y1="${padYTop + 10}" x2="${xSvgX}" y2="${baselineY}" stroke="#38bdf8" stroke-width="2" />
        <circle cx="${xSvgX}" cy="${baselineY}" r="4" fill="#38bdf8" />
        <text x="${xSvgX}" y="${baselineY + 20}" fill="#38bdf8" font-size="11" text-anchor="middle" font-weight="bold">X=${x}</text>
    `;

    dom.labGaussSvg.innerHTML = `
        <defs>
            <linearGradient id="gaussGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.1" />
            </linearGradient>
        </defs>
        <!-- Eje Base X -->
        <line x1="${padX}" y1="${baselineY}" x2="${width - padX}" y2="${baselineY}" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        ${shadePolygon}
        <!-- Trazo de la Campana -->
        <path d="${pathD}" fill="none" stroke="#60a5fa" stroke-width="2.5" />
        ${meanLine}
        ${xLine}
    `;
}

// ==========================================
// CONTROLADOR DE LA TABLA DE FRECUENCIAS
// ==========================================

function inicializarGrillaFrecuencias() {
    renderizarGrillaFrecuencias();
}

function renderizarGrillaFrecuencias() {
    if (!dom.labGridTableBody || !dom.labGridTableHead) return;

    // Encabezados
    const cols = laboratorioEstado.columnasActivas;
    let headHtml = `
        <tr>
            <th style="width: 35px;">#</th>
            <th>xi (Variable)</th>
            <th>fi (Frecuencia)</th>
    `;
    if (cols.includes("Fi")) headHtml += `<th>Fi (Acum.)</th>`;
    if (cols.includes("hi")) headHtml += `<th>hi (Rel.)</th>`;
    if (cols.includes("Hi")) headHtml += `<th>Hi (Rel. Acum.)</th>`;
    if (cols.includes("xifi")) headHtml += `<th>xi · fi</th>`;
    if (cols.includes("var")) headHtml += `<th>xi² · fi</th>`;
    headHtml += `<th style="width: 40px;"></th></tr>`;
    dom.labGridTableHead.innerHTML = headHtml;

    // Filas del cuerpo
    dom.labGridTableBody.innerHTML = "";
    let nAcum = 0;
    const nTotal = laboratorioEstado.tablaDatos.reduce((acc, r) => {
        const f = parseFloat(r.fi);
        return acc + (!isNaN(f) && f > 0 ? f : 0);
    }, 0);

    laboratorioEstado.tablaDatos.forEach((fila, idx) => {
        const xiNum = fila.xi !== "" && !isNaN(parseFloat(fila.xi)) ? parseFloat(fila.xi) : null;
        const fiNum = fila.fi !== "" && !isNaN(parseFloat(fila.fi)) ? parseFloat(fila.fi) : null;

        if (fiNum !== null) nAcum += fiNum;
        const hi = (fiNum !== null && nTotal > 0) ? (fiNum / nTotal) : null;
        const Hi = (fiNum !== null && nTotal > 0) ? (nAcum / nTotal) : null;
        const xifi = (xiNum !== null && fiNum !== null) ? (xiNum * fiNum) : null;
        const x2fi = (xiNum !== null && fiNum !== null) ? (xiNum * xiNum * fiNum) : null;

        const tr = document.createElement("tr");
        let rowHtml = `
            <td style="color: #64748b; font-size: 0.78rem;">${idx + 1}</td>
            <td><input type="number" class="lab-cell-input" data-idx="${idx}" data-field="xi" value="${fila.xi !== '' ? fila.xi : ''}" placeholder="xi" step="any"></td>
            <td><input type="number" class="lab-cell-input" data-idx="${idx}" data-field="fi" value="${fila.fi !== '' ? fila.fi : ''}" placeholder="fi" step="any"></td>
        `;
        if (cols.includes("Fi")) rowHtml += `<td><span class="lab-calc-cell">${fiNum !== null ? nAcum : '-'}</span></td>`;
        if (cols.includes("hi")) rowHtml += `<td><span class="lab-calc-cell">${hi !== null ? hi.toFixed(3) : '-'}</span></td>`;
        if (cols.includes("Hi")) rowHtml += `<td><span class="lab-calc-cell">${Hi !== null ? Hi.toFixed(3) : '-'}</span></td>`;
        if (cols.includes("xifi")) rowHtml += `<td><span class="lab-calc-cell">${xifi !== null ? xifi.toFixed(2) : '-'}</span></td>`;
        if (cols.includes("var")) rowHtml += `<td><span class="lab-calc-cell">${x2fi !== null ? x2fi.toFixed(2) : '-'}</span></td>`;

        rowHtml += `<td><button class="button button--ghost button--xs lab-del-row-btn" data-idx="${idx}" style="color: #f87171; padding: 0.1rem 0.35rem;" type="button" title="Eliminar fila">✕</button></td>`;
        tr.innerHTML = rowHtml;
        dom.labGridTableBody.appendChild(tr);
    });

    // Delegación de inputs (actualiza automáticamente las columnas y los estadísticos al escribir)
    dom.labGridTableBody.querySelectorAll(".lab-cell-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const idx = parseInt(e.target.getAttribute("data-idx"));
            const field = e.target.getAttribute("data-field");
            if (laboratorioEstado.tablaDatos[idx]) {
                const valStr = e.target.value.trim();
                laboratorioEstado.tablaDatos[idx][field] = valStr === "" ? "" : parseFloat(valStr);
                // Actualizar celdas calculadas de esa fila en el DOM
                actualizarFilaGrillaDOM(idx);
                recalcularTotalesGrilla();
            }
        });
    });

    dom.labGridTableBody.querySelectorAll(".lab-del-row-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(e.target.getAttribute("data-idx"));
            quitarFilaGrilla(idx);
        });
    });

    recalcularTotalesGrilla();
}

function actualizarFilaGrillaDOM(idx) {
    const tr = dom.labGridTableBody?.children[idx];
    if (!tr) return;
    const fila = laboratorioEstado.tablaDatos[idx];
    if (!fila) return;

    const xiNum = fila.xi !== "" && !isNaN(parseFloat(fila.xi)) ? parseFloat(fila.xi) : null;
    const fiNum = fila.fi !== "" && !isNaN(parseFloat(fila.fi)) ? parseFloat(fila.fi) : null;
    const xifi = (xiNum !== null && fiNum !== null) ? (xiNum * fiNum) : null;
    const x2fi = (xiNum !== null && fiNum !== null) ? (xiNum * xiNum * fiNum) : null;

    const cols = laboratorioEstado.columnasActivas;
    let colIdx = 3; // 0=#, 1=xi, 2=fi
    if (cols.includes("Fi")) colIdx++;
    if (cols.includes("hi")) colIdx++;
    if (cols.includes("Hi")) colIdx++;

    // Actualizamos celdas
    const cells = tr.querySelectorAll(".lab-calc-cell");
    let cI = 0;
    if (cols.includes("Fi")) {
        let nAcum = 0;
        for (let i = 0; i <= idx; i++) {
            const f = parseFloat(laboratorioEstado.tablaDatos[i].fi);
            if (!isNaN(f) && f > 0) nAcum += f;
        }
        if (cells[cI]) cells[cI].textContent = fiNum !== null ? nAcum : "-";
        cI++;
    }
    if (cols.includes("hi")) {
        const nTotal = laboratorioEstado.tablaDatos.reduce((acc, r) => acc + (parseFloat(r.fi) || 0), 0);
        if (cells[cI]) cells[cI].textContent = (fiNum !== null && nTotal > 0) ? (fiNum / nTotal).toFixed(3) : "-";
        cI++;
    }
    if (cols.includes("Hi")) {
        const nTotal = laboratorioEstado.tablaDatos.reduce((acc, r) => acc + (parseFloat(r.fi) || 0), 0);
        let nAcum = 0;
        for (let i = 0; i <= idx; i++) {
            const f = parseFloat(laboratorioEstado.tablaDatos[i].fi);
            if (!isNaN(f) && f > 0) nAcum += f;
        }
        if (cells[cI]) cells[cI].textContent = (fiNum !== null && nTotal > 0) ? (nAcum / nTotal).toFixed(3) : "-";
        cI++;
    }
    if (cols.includes("xifi")) {
        if (cells[cI]) cells[cI].textContent = xifi !== null ? xifi.toFixed(2) : "-";
        cI++;
    }
    if (cols.includes("var")) {
        if (cells[cI]) cells[cI].textContent = x2fi !== null ? x2fi.toFixed(2) : "-";
        cI++;
    }
}

function recalcularTotalesGrilla() {
    let n = 0;
    let sumXiFi = 0;
    let sumXi2Fi = 0;
    const pares = [];

    laboratorioEstado.tablaDatos.forEach(r => {
        const xiVal = r.xi !== "" && !isNaN(parseFloat(r.xi)) ? parseFloat(r.xi) : null;
        const fiVal = r.fi !== "" && !isNaN(parseFloat(r.fi)) ? parseFloat(r.fi) : null;
        if (xiVal !== null && fiVal !== null && fiVal >= 0) {
            n += fiVal;
            sumXiFi += xiVal * fiVal;
            sumXi2Fi += xiVal * xiVal * fiVal;
            pares.push({ xi: xiVal, fi: fiVal });
        }
    });

    const mean = n > 0 ? (sumXiFi / n) : 0;
    let variance = 0;
    if (n > 1) {
        variance = (sumXi2Fi - (n * mean * mean)) / (n - 1);
        if (variance < 0) variance = 0;
    }
    const stdDev = Math.sqrt(variance);
    const cv = (mean > 0 && stdDev >= 0) ? (stdDev / mean) * 100 : 0;

    // Moda (valor o valores de xi con mayor fi)
    let modeText = "-";
    if (pares.length > 0) {
        const maxFi = Math.max(...pares.map(p => p.fi));
        if (maxFi > 0) {
            const modos = pares.filter(p => p.fi === maxFi).map(p => p.xi);
            if (modos.length < pares.length) {
                modeText = modos.join(", ");
            }
        }
    }

    // Mediana (posición acumulada n/2 sobre pares ordenados)
    let medianText = "-";
    if (n > 0 && pares.length > 0) {
        const ordenados = [...pares].sort((a, b) => a.xi - b.xi);
        let acum = 0;
        const mitad = n / 2;
        for (const p of ordenados) {
            acum += p.fi;
            if (acum >= mitad) {
                medianText = String(p.xi);
                break;
            }
        }
    }

    // Actualizar Totales del Pie de Tabla
    if (dom.labFootFiTotal) dom.labFootFiTotal.textContent = String(n);
    if (dom.labFootXiFiTotal) dom.labFootXiFiTotal.textContent = sumXiFi.toFixed(2);
    if (dom.labFootXi2FiTotal) dom.labFootXi2FiTotal.textContent = sumXi2Fi.toFixed(2);

    // Actualizar Panel de Calculadora de 7 Métricas
    if (dom.labStatN) dom.labStatN.textContent = String(n);
    if (dom.labStatMean) dom.labStatMean.textContent = n > 0 ? mean.toFixed(2) : "0.00";
    if (dom.labStatVar) dom.labStatVar.textContent = n > 1 ? variance.toFixed(2) : "0.00";
    if (dom.labStatStd) dom.labStatStd.textContent = n > 1 ? stdDev.toFixed(2) : "0.00";
    if (dom.labStatCV) dom.labStatCV.textContent = n > 0 ? `${cv.toFixed(2)}%` : "0.00%";
    if (dom.labStatMode) dom.labStatMode.textContent = modeText;
    if (dom.labStatMedian) dom.labStatMedian.textContent = medianText;

    return { n, sumXiFi, sumXi2Fi, mean, variance, stdDev, cv, modeText, medianText };
}

function agregarFilaGrilla() {
    laboratorioEstado.tablaDatos.push({ xi: "", fi: "" });
    renderizarGrillaFrecuencias();
}

function quitarFilaGrilla(idx) {
    if (laboratorioEstado.tablaDatos.length <= 1) return;
    laboratorioEstado.tablaDatos.splice(idx, 1);
    renderizarGrillaFrecuencias();
}

function agregarColumnaGrilla(tipo) {
    if (!laboratorioEstado.columnasActivas.includes(tipo)) {
        laboratorioEstado.columnasActivas.push(tipo);
        renderizarGrillaFrecuencias();
    }
}

function quitarColumnaGrilla() {
    const sel = dom.labSelectColType?.value || "var";
    const idx = laboratorioEstado.columnasActivas.indexOf(sel);
    if (idx > -1) {
        laboratorioEstado.columnasActivas.splice(idx, 1);
        renderizarGrillaFrecuencias();
        mostrarToast(`Columna ${sel} quitada de la tabla.`, "info");
    } else {
        mostrarToast("Esa columna no está activa en la tabla.", "aviso");
    }
}

function limpiarGrillaFrecuencias() {
    laboratorioEstado.tablaDatos = [
        { xi: "", fi: "" },
        { xi: "", fi: "" },
        { xi: "", fi: "" },
        { xi: "", fi: "" }
    ];
    renderizarGrillaFrecuencias();
    mostrarToast("🗑️ Grilla restablecida a estado vacío.", "info");
}

// ==========================================
// CONTROLADOR DE CALCULADORA DE PROBABILIDAD
// ==========================================

function actualizarCalculosNormalUI() {
    const mu = parseFloat(dom.labNormMean?.value) || 0;
    const std = parseFloat(dom.labNormStd?.value) || 1;
    const x = parseFloat(dom.labNormX?.value) || 0;
    const tail = dom.labNormTail?.value || "left";

    const z = (x - mu) / std;
    let prob = 0;

    if (tail === "left") {
        prob = labNormalCDF(x, mu, std);
    } else if (tail === "right") {
        prob = 1 - labNormalCDF(x, mu, std);
    } else {
        const delta = Math.abs(x - mu);
        prob = labNormalCDF(mu + delta, mu, std) - labNormalCDF(mu - delta, mu, std);
    }

    if (dom.labNormZVal) dom.labNormZVal.textContent = z.toFixed(3);
    if (dom.labNormPVal) {
        dom.labNormPVal.textContent = `${prob.toFixed(4)} (${(prob * 100).toFixed(2)}%)`;
    }

    renderizarCampanaGaussSVG(mu, std, x, tail);
}

function actualizarCalculosBinomialUI() {
    const n = parseInt(dom.labBinoN?.value) || 10;
    const p = parseFloat(dom.labBinoP?.value) || 0.5;
    const k = parseInt(dom.labBinoK?.value) || 0;

    const exact = labBinomialPMF(n, p, k);
    let le = 0;
    for (let i = 0; i <= k; i++) le += labBinomialPMF(n, p, i);
    const ge = 1 - (le - exact);

    if (dom.labBinoExactVal) dom.labBinoExactVal.textContent = exact.toFixed(4);
    if (dom.labBinoLeVal) dom.labBinoLeVal.textContent = le.toFixed(4);
    if (dom.labBinoGeVal) dom.labBinoGeVal.textContent = ge.toFixed(4);
}

function actualizarCalculosPoissonUI() {
    const lambda = parseFloat(dom.labPoisLambda?.value) || 3;
    const k = parseInt(dom.labPoisK?.value) || 0;

    const exact = labPoissonPMF(lambda, k);
    let le = 0;
    for (let i = 0; i <= k; i++) le += labPoissonPMF(lambda, i);

    if (dom.labPoisExactVal) dom.labPoisExactVal.textContent = exact.toFixed(4);
    if (dom.labPoisLeVal) dom.labPoisLeVal.textContent = le.toFixed(4);
}

function inicializarCalculadoraCientificaMini() {
    if (!dom.labWidgetProb) return;
    const keys = dom.labWidgetProb.querySelectorAll(".lab-ckey");
    let expr = "";

    keys.forEach(k => {
        k.addEventListener("click", () => {
            const key = k.getAttribute("data-key");
            if (!dom.labCalcScreen) return;

            if (key === "clear") {
                expr = "";
                dom.labCalcScreen.value = "0";
            } else if (key === "del") {
                expr = expr.slice(0, -1);
                dom.labCalcScreen.value = expr || "0";
            } else if (key === "=") {
                try {
                    const cleanExpr = expr.replace(/×/g, "*").replace(/÷/g, "/");
                    const res = Function(`'use strict'; return (${cleanExpr})`)();
                    dom.labCalcScreen.value = String(res);
                    expr = String(res);
                } catch (e) {
                    dom.labCalcScreen.value = "Error";
                    expr = "";
                }
            } else if (key === "sqrt") {
                try {
                    const val = parseFloat(expr || dom.labCalcScreen.value);
                    const res = Math.sqrt(val);
                    dom.labCalcScreen.value = String(res);
                    expr = String(res);
                } catch(e) {}
            } else if (key === "pow") {
                try {
                    const val = parseFloat(expr || dom.labCalcScreen.value);
                    const res = Math.pow(val, 2);
                    dom.labCalcScreen.value = String(res);
                    expr = String(res);
                } catch(e) {}
            } else {
                if (expr === "0" && key !== ".") expr = "";
                expr += key;
                dom.labCalcScreen.value = expr;
            }
        });
    });
}

// ==========================================
// CONTROLADOR DE MATRIZ DE BAYES
// ==========================================

function recalcularMatrizBayes() {
    const ab = parseFloat(dom.labBayesCellAB?.value) || 0;
    const aNotB = parseFloat(dom.labBayesCellANotB?.value) || 0;
    const notAB = parseFloat(dom.labBayesCellNotAB?.value) || 0;
    const notANotB = parseFloat(dom.labBayesCellNotANotB?.value) || 0;

    const totalA = ab + aNotB;
    const totalNotA = notAB + notANotB;
    const totalB = ab + notAB;
    const totalNotB = aNotB + notANotB;
    const grandTotal = totalA + totalNotA;

    if (dom.labBayesTotalA) dom.labBayesTotalA.textContent = String(totalA);
    if (dom.labBayesTotalNotA) dom.labBayesTotalNotA.textContent = String(totalNotA);
    if (dom.labBayesTotalB) dom.labBayesTotalB.textContent = String(totalB);
    if (dom.labBayesTotalNotB) dom.labBayesTotalNotB.textContent = String(totalNotB);
    if (dom.labBayesGrandTotal) dom.labBayesGrandTotal.textContent = String(grandTotal);

    const probCondicional = totalB > 0 ? (ab / totalB) : 0;
    if (dom.labBayesFormulaText) {
        dom.labBayesFormulaText.textContent = `P(A|B) = P(A ∩ B) / P(B) = ${ab} / ${totalB}`;
    }
    if (dom.labBayesResultVal) {
        dom.labBayesResultVal.textContent = `${probCondicional.toFixed(4)} (${(probCondicional * 100).toFixed(2)}%)`;
    }
}

// ==========================================
// CONTROLADOR DEL PIZARRÓN SCRATCHPAD
// ==========================================

function inicializarScratchpadLab() {
    const canvas = dom.labScratchCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const st = laboratorioEstado.scratchState;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            const temp = document.createElement("canvas");
            temp.width = canvas.width;
            temp.height = canvas.height;
            const tCtx = temp.getContext("2d");
            tCtx.drawImage(canvas, 0, 0);

            canvas.width = Math.round(rect.width);
            canvas.height = Math.round(rect.height);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
        }
    }

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    canvas.addEventListener("pointerdown", (e) => {
        canvas.setPointerCapture(e.pointerId);
        st.drawing = true;
        const p = getCoords(e);
        st.lastX = p.x;
        st.lastY = p.y;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = st.tool === "eraser" ? "#090d16" : st.color;
        ctx.lineWidth = st.tool === "eraser" ? 14 : st.size;
        ctx.stroke();
    });

    canvas.addEventListener("pointermove", (e) => {
        if (!st.drawing) return;
        const p = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(st.lastX, st.lastY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = st.tool === "eraser" ? "#090d16" : st.color;
        ctx.lineWidth = st.tool === "eraser" ? 14 : st.size;
        ctx.stroke();
        st.lastX = p.x;
        st.lastY = p.y;
    });

    const stop = () => { st.drawing = false; };
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);

    if (dom.labScratchPenBtn) {
        dom.labScratchPenBtn.addEventListener("click", () => {
            st.tool = "pen";
            dom.labScratchPenBtn.classList.add("is-active");
            if (dom.labScratchEraserBtn) dom.labScratchEraserBtn.classList.remove("is-active");
        });
    }

    if (dom.labScratchEraserBtn) {
        dom.labScratchEraserBtn.addEventListener("click", () => {
            st.tool = "eraser";
            dom.labScratchEraserBtn.classList.add("is-active");
            if (dom.labScratchPenBtn) dom.labScratchPenBtn.classList.remove("is-active");
        });
    }

    if (dom.labScratchClearBtn) {
        dom.labScratchClearBtn.addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    // Color dots
    if (dom.labWidgetScratch) {
        dom.labWidgetScratch.querySelectorAll(".color-dot").forEach(dot => {
            dot.addEventListener("click", () => {
                dom.labWidgetScratch.querySelectorAll(".color-dot").forEach(d => d.classList.remove("is-active"));
                dot.classList.add("is-active");
                st.color = dot.getAttribute("data-color") || "#38bdf8";
                st.tool = "pen";
                if (dom.labScratchPenBtn) dom.labScratchPenBtn.classList.add("is-active");
                if (dom.labScratchEraserBtn) dom.labScratchEraserBtn.classList.remove("is-active");
            });
        });
    }

    setTimeout(resize, 100);
}

// ==========================================
// CONTROLADORES DE INTERFAZ Y VISTA MÓVIL
// ==========================================

function activarTabLaboratorio(tabId) {
    const tabBtns = [
        { btn: dom.labTabBtnFreq, pane: dom.labWidgetFreq, id: "freq" },
        { btn: dom.labTabBtnProb, pane: dom.labWidgetProb, id: "prob" },
        { btn: dom.labTabBtnBayes, pane: dom.labWidgetBayes, id: "bayes" },
        { btn: dom.labTabBtnScratch, pane: dom.labWidgetScratch, id: "scratch" }
    ];

    tabBtns.forEach(t => {
        const matches = t.id === tabId;
        if (t.btn) t.btn.classList.toggle("is-active", matches);
        if (t.pane) t.pane.classList.toggle("hidden", !matches);
    });

    laboratorioEstado.tabActiva = tabId;

    if (tabId === "scratch") {
        inicializarScratchpadLab();
    }
}

function cambiarVistaMovilLab(vista, scrollTarget = false) {
    if (!dom.laboratorioSplit) return;
    dom.laboratorioSplit.setAttribute("data-mobile-view", vista);

    if (dom.labMobileBtnEnunciado) {
        dom.labMobileBtnEnunciado.classList.toggle("is-active", vista === "enunciado");
        dom.labMobileBtnEnunciado.setAttribute("aria-selected", vista === "enunciado" ? "true" : "false");
    }
    if (dom.labMobileBtnHerramientas) {
        dom.labMobileBtnHerramientas.classList.toggle("is-active", vista === "herramientas");
        dom.labMobileBtnHerramientas.setAttribute("aria-selected", vista === "herramientas" ? "true" : "false");
    }

    if (dom.labMobileFloatIcon && dom.labMobileFloatText) {
        if (vista === "enunciado") {
            dom.labMobileFloatIcon.textContent = "🛠️";
            dom.labMobileFloatText.textContent = "Mesa de Trabajo";
        } else {
            dom.labMobileFloatIcon.textContent = "📋";
            dom.labMobileFloatText.textContent = "Ver Enunciado";
        }
    }

    if (scrollTarget) {
        const target = vista === "enunciado" ? (dom.labActiveCheckpointCard || dom.labPanelEnunciado) : dom.labPanelHerramientas;
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }
}

// ==========================================
// FLUJO DEL LABORATORIO Y GENERADOR DE CASOS
// ==========================================

function iniciarOReanudarLaboratorio() {
    if (!laboratorioEstado.iniciado) {
        laboratorioEstado.iniciado = true;
        configurarEventosLaboratorio();
        inicializarGrillaFrecuencias();
        actualizarCalculosNormalUI();
        actualizarCalculosBinomialUI();
        actualizarCalculosPoissonUI();
        inicializarCalculadoraCientificaMini();
        recalcularMatrizBayes();
        inicializarScratchpadLab();
    }
    cambiarVistaMovilLab("enunciado");

    // Si aún no hay ejercicio generado, abrir el menú flotante de configuración inicial
    if (!laboratorioEstado.ejercicioActual) {
        abrirModalConfigLab();
    }
}

// ------------------------------------------
// MODAL DE CONFIGURACIÓN Y CARGA DE PDF
// ------------------------------------------

function abrirModalConfigLab() {
    if (dom.labConfigModal) {
        if (typeof dom.labConfigModal.showModal === "function") {
            try { dom.labConfigModal.showModal(); } catch { dom.labConfigModal.setAttribute("open", ""); }
        } else {
            dom.labConfigModal.setAttribute("open", "");
        }
    }
}

function cerrarModalConfigLab() {
    if (dom.labConfigModal) {
        if (typeof dom.labConfigModal.close === "function") {
            try { dom.labConfigModal.close(); } catch { dom.labConfigModal.removeAttribute("open"); }
        } else {
            dom.labConfigModal.removeAttribute("open");
        }
    }
}

async function procesarPdfLaboratorio(file) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        mostrarToast("⚠️ El archivo seleccionado debe ser un PDF.", "aviso");
        return;
    }

    mostrarToast("📄 Analizando PDF con IA...", "info");

    try {
        if (typeof pdfjsLib === "undefined") {
            throw new Error("Librería PDF no disponible");
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let textoCompleto = "";
        const maxPaginas = Math.min(pdf.numPages, 20);

        for (let i = 1; i <= maxPaginas; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const textPage = content.items.map(item => item.str).join(" ");
            textoCompleto += `\n--- PÁGINA ${i} ---\n` + textPage;
        }

        laboratorioEstado.pdfTexto = textoCompleto.trim();
        laboratorioEstado.pdfNombre = file.name;
        laboratorioEstado.pdfPaginas = pdf.numPages;

        // Actualizar UI del Modal
        if (dom.labLoadedPdfInfo) dom.labLoadedPdfInfo.classList.remove("hidden");
        if (dom.labLoadedPdfName) dom.labLoadedPdfName.textContent = file.name;
        if (dom.labLoadedPdfMeta) dom.labLoadedPdfMeta.textContent = `${pdf.numPages} páginas leídas con éxito`;
        if (dom.labUploadTitle) dom.labUploadTitle.textContent = "PDF cargado con éxito";
        if (dom.labUploadHint) dom.labUploadHint.textContent = "Hacé clic en 'Cargar y Preparar Laboratorio' para comenzar.";

        // Actualizar Badge en el header del laboratorio
        if (dom.labActivePdfBadge) {
            dom.labActivePdfBadge.textContent = `📄 ${file.name}`;
            dom.labActivePdfBadge.classList.remove("hidden");
        }
        if (dom.labTagOrigenPdf) dom.labTagOrigenPdf.classList.remove("hidden");

        mostrarToast(`✅ PDF "${file.name}" leído correctamente.`, "exito");
    } catch (err) {
        console.error("Error al procesar PDF en Laboratorio:", err);
        mostrarToast("⚠️ No se pudo extraer el texto del PDF. Se utilizará el generador estadístico estándar.", "aviso");
    }
}

function limpiarPdfLaboratorio() {
    laboratorioEstado.pdfTexto = "";
    laboratorioEstado.pdfNombre = "";
    laboratorioEstado.pdfPaginas = 0;

    if (dom.labPdfFileInput) dom.labPdfFileInput.value = "";
    if (dom.labLoadedPdfInfo) dom.labLoadedPdfInfo.classList.add("hidden");
    if (dom.labUploadTitle) dom.labUploadTitle.textContent = "Subir PDF de Estadística";
    if (dom.labUploadHint) dom.labUploadHint.textContent = "Hacé clic o arrastrá acá el PDF de tu cátedra (apuntes, fórmulas o ejercicios).";
    if (dom.labActivePdfBadge) dom.labActivePdfBadge.classList.add("hidden");
    if (dom.labTagOrigenPdf) dom.labTagOrigenPdf.classList.add("hidden");

    mostrarToast("🗑️ PDF removido del Laboratorio.", "info");
}

function obtenerEtiquetaTema(tema) {
    const mapa = {
        descriptiva: "📊 Estadística Descriptiva",
        bayes: "🎲 Probabilidades & Bayes",
        normal: "🔔 Distribución Normal",
        discretas: "🎯 Discretas (Binomial/Poisson)",
        integral: "🌐 Práctica Integral"
    };
    return mapa[tema] || "Estadística y Probabilidad";
}

// ------------------------------------------
// GENERADOR DE EJERCICIOS (IA + OFFLINE)
// ------------------------------------------

async function generarEjercicioLaboratorio(forzarNuevo = false) {
    const tema = laboratorioEstado.temaSeleccionado || "descriptiva";

    // Actualizar Badges de Cabecera
    if (dom.labActiveTopicBadge) dom.labActiveTopicBadge.textContent = obtenerEtiquetaTema(tema);
    if (dom.labTagTema) dom.labTagTema.textContent = obtenerEtiquetaTema(tema);

    // Intentar primero con la API de Gemini si hay apunte y credencial
    if (laboratorioEstado.pdfTexto && typeof llamarGeminiAPI === "function") {
        mostrarToast("🤖 Gemini está creando tu ejercicio de estudio a partir del PDF...", "info");

        const prompt = `Actúa como un profesor universitario de Estadística y Matemática Aplicada.
Crea un ejercicio práctico analítico sobre el tema "${obtenerEtiquetaTema(tema)}" basado en los siguientes apuntes:
"${laboratorioEstado.pdfTexto.slice(0, 3500)}"

Devuelve EXCLUSIVAMENTE un objeto JSON válido con este formato:
{
  "titulo": "Título realista y contextualizado",
  "dificultad": "Intermedia",
  "narrativa": "Enunciado detallado con todos los datos numéricos necesarios para deducir la tabla o aplicar las fórmulas.",
  "preguntas": [
    {
      "letra": "a",
      "texto": "Pregunta del inciso a...",
      "esperado": 25.5,
      "tolerancia": 0.1,
      "pista": "Fórmula o sugerencia clave...",
      "explicacion": "Resolución paso a paso que justifique el valor 25.5."
    },
    {
      "letra": "b",
      "texto": "Pregunta del inciso b...",
      "esperado": 3.2,
      "tolerancia": 0.1,
      "pista": "Sugerencia...",
      "explicacion": "Explicación detallada."
    },
    {
      "letra": "c",
      "texto": "Pregunta del inciso c...",
      "esperado": 0.95,
      "tolerancia": 0.02,
      "pista": "Sugerencia...",
      "explicacion": "Explicación detallada."
    },
    {
      "letra": "d",
      "texto": "Pregunta del inciso d...",
      "esperado": 12.8,
      "tolerancia": 0.2,
      "pista": "Sugerencia...",
      "explicacion": "Explicación detallada."
    }
  ]
}`;

        try {
            const resp = await llamarGeminiAPI(prompt);
            const limpio = resp.replace(/```json/gi, "").replace(/```/g, "").trim();
            const parsed = JSON.parse(limpio);
            if (parsed && Array.isArray(parsed.preguntas) && parsed.preguntas.length >= 3) {
                laboratorioEstado.ejercicioActual = {
                    id: "ia_" + Date.now(),
                    tema: tema,
                    origen: "ia",
                    titulo: parsed.titulo || "Ejercicio Práctico con IA",
                    dificultad: parsed.dificultad || "Intermedia",
                    narrativa: parsed.narrativa || "",
                    preguntas: parsed.preguntas
                };
                renderizarEjercicioActual();
                mostrarToast("✨ ¡Ejercicio generado con éxito por Gemini!", "exito");
                return;
            }
        } catch (e) {
            console.warn("Fallo generación con Gemini, pasando a generador algorítmico:", e);
        }
    }

    // Generador algorítmico procedimental offline con exactitud matemática
    generarEjercicioProcedimental(tema);
}

function generarEjercicioProcedimental(tema) {
    let ej = null;
    switch (tema) {
        case "bayes":
            ej = generarEjercicioBayesProcedural();
            break;
        case "normal":
            ej = generarEjercicioNormalProcedural();
            break;
        case "discretas":
            ej = generarEjercicioDiscretasProcedural();
            break;
        case "integral":
            ej = generarEjercicioIntegralProcedural();
            break;
        case "descriptiva":
        default:
            ej = generarEjercicioDescriptivaProcedural();
            break;
    }

    laboratorioEstado.ejercicioActual = ej;
    renderizarEjercicioActual();
    mostrarToast("🎲 Ejercicio práctico preparado en la mesa de trabajo.", "info");
}

// Generadores Procedimentales Temáticos:

function generarEjercicioDescriptivaProcedural() {
    const contextos = [
        {
            sector: "Auditoría Logística y Tiempos de Entrega",
            variable: "Tiempos de entrega (minutos)",
            x: [18, 22, 25, 30, 35],
            f: [6, 14, 18, 8, 4]
        },
        {
            sector: "Control de Calidad en Planta Metalúrgica",
            variable: "Espesor de láminas de acero (mm)",
            x: [10, 12, 15, 18, 20],
            f: [5, 15, 20, 7, 3]
        },
        {
            sector: "Rendimiento Académico Universitario",
            variable: "Calificaciones de examen parcial",
            x: [4, 6, 7, 8, 10],
            f: [8, 16, 22, 10, 4]
        },
        {
            sector: "Ventas Diarias en Locales Comerciales",
            variable: "Cantidad de operaciones registradas",
            x: [40, 50, 60, 70, 80],
            f: [7, 12, 21, 15, 5]
        }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    // Multiplicador aleatorio para variar frecuencias
    const mult = Math.floor(Math.random() * 2) + 1;
    const f = ctx.f.map(val => val * mult);
    const x = ctx.x;

    let N = 0;
    let sumXiFi = 0;
    let sumXi2Fi = 0;
    for (let i = 0; i < x.length; i++) {
        N += f[i];
        sumXiFi += x[i] * f[i];
        sumXi2Fi += x[i] * x[i] * f[i];
    }
    const media = Number((sumXiFi / N).toFixed(2));
    const varianza = Number(((sumXi2Fi - (N * media * media)) / (N - 1)).toFixed(2));
    const desvio = Number(Math.sqrt(varianza).toFixed(2));
    const cv = Number(((desvio / media) * 100).toFixed(2));

    // Mediana
    let acum = 0;
    let mediana = x[0];
    for (let i = 0; i < x.length; i++) {
        acum += f[i];
        if (acum >= N / 2) {
            mediana = x[i];
            break;
        }
    }

    const narrativa = `En el marco del estudio de "${ctx.sector}", se recolectó una muestra aleatoria sobre la variable "${ctx.variable}".\nLos datos relevados y agrupados arrojaron los siguientes registros:\n` +
        x.map((val, idx) => `• Valor xi = ${val} : Frecuencia fi = ${f[idx]}`).join("\n") +
        `\n\nTu tarea: Trasladá los valores a la Tabla de Frecuencias de la Mesa de Trabajo en el panel derecho deduciendo cada fila, comprobá los estadísticos calculados en la calculadora inferior y respondé a los incisos planteados:`;

    return {
        id: "desc_" + Date.now(),
        tema: "descriptiva",
        origen: "modelo",
        titulo: ctx.sector,
        dificultad: "Intermedia",
        narrativa: narrativa,
        preguntas: [
            {
                letra: "a",
                texto: "¿Cuál es el tamaño total de la muestra analizada (N = Σ fi)?",
                esperado: N,
                tolerancia: 0.1,
                pista: "Sumá todas las frecuencias absolutas fi: " + f.join(" + ") + " = " + N,
                explicacion: `El tamaño total de la muestra se obtiene de la suma marginal: N = Σ fi = ${N}.`
            },
            {
                letra: "b",
                texto: "Calculá la Media Aritmética o Promedio muestral (x̄):",
                esperado: media,
                tolerancia: 0.1,
                pista: `Multiplicá cada xi por su fi, sumalos y dividilos por N: x̄ = Σ(xi · fi) / N = ${sumXiFi} / ${N}`,
                explicacion: `Media x̄ = Σ(xi·fi)/N = ${sumXiFi} / ${N} = ${media}. Podés corroborarlo en la tarjeta "Media" del panel inferior.`
            },
            {
                letra: "c",
                texto: "Calculá el Desvío Estándar Muestral (s):",
                esperado: desvio,
                tolerancia: 0.15,
                pista: "El desvío es la raíz cuadrada de la varianza muestral: s = √(s²). Podés copiarlo desde la calculadora de la mesa.",
                explicacion: `Varianza s² = [Σ(xi²·fi) - N·x̄²] / (N - 1) ≈ ${varianza}. Por lo tanto, el desvío es s = √${varianza} ≈ ${desvio}.`
            },
            {
                letra: "d",
                texto: "¿Cuál es el Coeficiente de Variación porcentual (CV%)?",
                esperado: cv,
                tolerancia: 0.5,
                pista: "Fórmula del CV: (s / x̄) * 100. Ingresá el valor numérico en porcentaje (ej: 18.5).",
                explicacion: `CV = (s / x̄) * 100 = (${desvio} / ${media}) * 100 = ${cv}%. Indica la dispersión relativa de la distribución.`
            },
            {
                letra: "e",
                texto: "Determina el valor de la Mediana (Me) de esta serie:",
                esperado: mediana,
                tolerancia: 0.1,
                pista: `Buscá en la columna acumulada Fi el primer valor que supere la mitad de la muestra (N/2 = ${(N / 2).toFixed(1)}).`,
                explicacion: `La posición central N/2 = ${N / 2} queda comprendida en la clase con xi = ${mediana}. Por lo tanto, Me = ${mediana}.`
            }
        ]
    };
}

function generarEjercicioBayesProcedural() {
    const total = 10000;
    const pA = 0.02; // 2% prevalencia
    const sens = 0.95; // 95% sensibilidad
    const esp = 0.96; // 96% especificidad
    const fA = 0.04; // 4% falsa alarma

    const enf = Math.round(total * pA); // 200
    const sanos = total - enf; // 9800
    const VP = Math.round(enf * sens); // 190
    const FP = Math.round(sanos * fA); // 392
    const totalPositivos = VP + FP; // 582
    const probTotalPos = Number((totalPositivos / total).toFixed(4));
    const posterior = Number((VP / totalPositivos).toFixed(4));

    const narrativa = `Un sistema biométrico de seguridad aeroportuaria analiza a una población de n = 10.000 pasajeros.\nLa prevalencia de personas en lista de búsqueda es del 2%: P(Buscado) = 0.02 (es decir, 200 personas de 10.000).\nCuando una persona está en búsqueda, el sensor dispara una alarma con probabilidad del 95%: P(Alarma | Buscado) = 0.95.\nCuando una persona es un ciudadano común (9.800 pasajeros), el sensor genera una falsa alarma el 4% de las veces: P(Alarma | Normal) = 0.04.\n\nUtilizá la pestaña "Matriz de Bayes" en la Mesa de Trabajo para tabular la contingencia 2x2 y responder:`;

    return {
        id: "bayes_" + Date.now(),
        tema: "bayes",
        origen: "modelo",
        titulo: "Control Biométrico de Seguridad y Teorema de Bayes",
        dificultad: "Avanzada",
        narrativa: narrativa,
        preguntas: [
            {
                letra: "a",
                texto: "¿Cuántos pasajeros buscados activarán la alarma (Verdaderos Positivos VP)?",
                esperado: VP,
                tolerancia: 1,
                pista: "VP = Total buscados * Sensibilidad = 200 * 0.95",
                explicacion: `VP = 200 * 0.95 = ${VP}. Son las detecciones correctas.`
            },
            {
                letra: "b",
                texto: "¿Cuántos ciudadanos normales activarán una falsa alarma (Falsos Positivos FP)?",
                esperado: FP,
                tolerancia: 2,
                pista: "FP = Total normales * Tasa falsa alarma = 9.800 * 0.04",
                explicacion: `FP = 9.800 * 0.04 = ${FP} personas inocentes demoradas por error.`
            },
            {
                letra: "c",
                texto: "Calculá la probabilidad marginal total de que el sensor dispare alarma: P(Alarma)",
                esperado: probTotalPos,
                tolerancia: 0.005,
                pista: "P(Alarma) = (VP + FP) / Total = (" + VP + " + " + FP + ") / 10.000",
                explicacion: `P(Alarma) = ${totalPositivos} / 10.000 = ${probTotalPos}.`
            },
            {
                letra: "d",
                texto: "Aplicando el Teorema de Bayes, si el sensor suena, ¿cuál es la probabilidad real de que sea una persona buscada: P(Buscado | Alarma)?",
                esperado: posterior,
                tolerancia: 0.01,
                pista: "Teorema de Bayes: P(Buscado | Alarma) = VP / (VP + FP) = " + VP + " / " + totalPositivos,
                explicacion: `P(Buscado | Alarma) = ${VP} / ${totalPositivos} ≈ ${posterior} (${(posterior * 100).toFixed(1)}%). Esta es la conocida paradoja del falso positivo.`
            }
        ]
    };
}

function generarEjercicioNormalProcedural() {
    const mu = 500;
    const sigma = 10;
    const xCrit = 480;
    const z1 = Number(((xCrit - mu) / sigma).toFixed(2)); // -2.00
    const p1 = Number(labNormalCDF(xCrit, mu, sigma).toFixed(4)); // 0.0228
    const pIntervalo = Number((labNormalCDF(515, mu, sigma) - labNormalCDF(485, mu, sigma)).toFixed(4)); // 0.8664

    const narrativa = `Una planta embotelladora automática envasa gaseosas. El volumen por botella se distribuye normalmente con media μ = 500 ml y desvío estándar σ = 10 ml: X ~ N(500, 10²).\nPor regulaciones de lealtad comercial, toda botella que contenga menos de 480 ml es rechazada inmediatamente de la línea de comercialización.\n\nUtilizá la pestaña "Calculadora de Probabilidad" con la Campana de Gauss para verificar áreas y percentiles:`;

    return {
        id: "norm_" + Date.now(),
        tema: "normal",
        origen: "modelo",
        titulo: "Control de Tolerancias en Producción Industrial (Normal)",
        dificultad: "Intermedia",
        narrativa: narrativa,
        preguntas: [
            {
                letra: "a",
                texto: "Estandarizá el valor crítico X = 480 ml calculando su puntaje Z = (X - μ) / σ:",
                esperado: z1,
                tolerancia: 0.05,
                pista: "Z = (480 - 500) / 10 = -20 / 10",
                explicacion: `Z = (480 - 500) / 10 = ${z1}. Está a 2 desvíos estándar por debajo de la media nominal.`
            },
            {
                letra: "b",
                texto: "¿Cuál es la probabilidad de que una botella sea rechazada: P(X ≤ 480 ml)?",
                esperado: p1,
                tolerancia: 0.005,
                pista: "Ingresá Media=500, Desvío=10, X=480 con cola izquierda en la campana de Gauss.",
                explicacion: `P(X ≤ 480) = P(Z ≤ -2) ≈ ${p1} (${(p1 * 100).toFixed(2)}% de rechazo).`
            },
            {
                letra: "c",
                texto: "¿Cuál es la probabilidad de que una botella se encuentre en el rango óptimo entre 485 ml y 515 ml: P(485 ≤ X ≤ 515)?",
                esperado: pIntervalo,
                tolerancia: 0.015,
                pista: "P(485 ≤ X ≤ 515) = P(X ≤ 515) - P(X ≤ 485). Usá la opción bilateral en la calculadora de probabilidad.",
                explicacion: `Z1 = -1.5, Z2 = 1.5. Área = P(Z ≤ 1.5) - P(Z ≤ -1.5) = 0.9332 - 0.0668 = ${pIntervalo}.`
            },
            {
                letra: "d",
                texto: "¿Cuál es el valor de la Media teórica (μ) de esta distribución?",
                esperado: mu,
                tolerancia: 0.1,
                pista: "El parámetro de posición central dado en el enunciado.",
                explicacion: `La media teórica nominal es μ = ${mu} ml.`
            }
        ]
    };
}

function generarEjercicioDiscretasProcedural() {
    const n = 10;
    const p = 0.2;
    const media = Number((n * p).toFixed(2));
    const k = 2;
    const pExacta = Number(labBinomialPMF(n, p, k).toFixed(4));
    let pAcum = 0;
    for (let i = 0; i <= k; i++) pAcum += labBinomialPMF(n, p, i);
    pAcum = Number(pAcum.toFixed(4));
    const pAlMenosUno = Number((1 - labBinomialPMF(n, p, 0)).toFixed(4));

    const narrativa = `Un servidor web recibe solicitudes que pueden fallar por sobrecarga con probabilidad constante p = 0.20 (20%).\nEn una prueba de estrés se envían n = 10 solicitudes independientes.\nLa variable aleatoria X representa el número de solicitudes fallidas: X ~ Binomial(n = 10, p = 0.20).\n\nUtilizá la pestaña "Calculadora de Probabilidad" (subpestaña Binomial) en la Mesa de Trabajo para resolver:`;

    return {
        id: "disc_" + Date.now(),
        tema: "discretas",
        origen: "modelo",
        titulo: "Prueba de Estrés de Servidores (Distribución Binomial)",
        dificultad: "Intermedia",
        narrativa: narrativa,
        preguntas: [
            {
                letra: "a",
                texto: "Calculá el Valor Esperado o media de solicitudes fallidas E(X) = n · p:",
                esperado: media,
                tolerancia: 0.1,
                pista: "E(X) = n * p = 10 * 0.20",
                explicacion: `El valor esperado es E(X) = 10 * 0.20 = ${media} fallas promedio.`
            },
            {
                letra: "b",
                texto: "Calculá la probabilidad de que fallen exactamente k = 2 solicitudes: P(X = 2)",
                esperado: pExacta,
                tolerancia: 0.008,
                pista: "P(X = 2) = C(10,2) * (0.2)^2 * (0.8)^8. Consultá la calculadora binomial con n=10, p=0.2, k=2.",
                explicacion: `P(X = 2) = 45 * 0.04 * 0.16777 ≈ ${pExacta} (${(pExacta * 100).toFixed(2)}%).`
            },
            {
                letra: "c",
                texto: "¿Cuál es la probabilidad de que fallen a lo sumo 2 solicitudes: P(X ≤ 2)?",
                esperado: pAcum,
                tolerancia: 0.015,
                pista: "Sumá P(X=0) + P(X=1) + P(X=2) o leé la probabilidad acumulada en el widget.",
                explicacion: `P(X ≤ 2) = P(0) + P(1) + P(2) ≈ ${pAcum}.`
            },
            {
                letra: "d",
                texto: "Calculá la probabilidad de que falle al menos una solicitud: P(X ≥ 1) = 1 - P(X = 0):",
                esperado: pAlMenosUno,
                tolerancia: 0.01,
                pista: "Regla del complemento: 1 - (0.80)^10",
                explicacion: `P(X ≥ 1) = 1 - (0.8)^10 = 1 - 0.1074 = ${pAlMenosUno}.`
            }
        ]
    };
}

function generarEjercicioIntegralProcedural() {
    return generarEjercicioDescriptivaProcedural();
}

// ------------------------------------------
// RENDERIZADO DEL ENUNCIADO Y LAS PREGUNTAS
// ------------------------------------------

function renderizarEjercicioActual() {
    const ej = laboratorioEstado.ejercicioActual;
    if (!ej) return;

    // Encabezado del caso
    if (dom.labTituloCaso) dom.labTituloCaso.textContent = ej.titulo || "Caso Práctico de Estudio";
    if (dom.labTagDificultad) dom.labTagDificultad.textContent = `Dificultad: ${ej.dificultad || "Intermedia"}`;
    if (dom.labTagTema) dom.labTagTema.textContent = obtenerEtiquetaTema(ej.tema);
    if (dom.labNarrativaCaso) dom.labNarrativaCaso.textContent = ej.narrativa || "";

    // Resetear estados de preguntas
    laboratorioEstado.intentosPorPregunta = {};
    laboratorioEstado.resueltasPorPregunta = {};
    laboratorioEstado.pistasReveladas = {};
    laboratorioEstado.solucionesReveladas = {};

    if (dom.labCompletedCard) dom.labCompletedCard.classList.add("hidden");

    actualizarProgresoPreguntasUI();

    // Renderizar incisos a), b), c), d), e)
    if (!dom.labQuestionsList) return;
    dom.labQuestionsList.innerHTML = "";

    ej.preguntas.forEach((q, idx) => {
        const item = document.createElement("div");
        item.className = "lab-question-item";
        item.id = `labQuestionItem_${idx}`;

        item.innerHTML = `
            <div class="lab-q-prompt-row">
                <span class="lab-q-letter-badge">${q.letra.toUpperCase()})</span>
                <p class="lab-q-text">${q.texto}</p>
            </div>
            <div class="lab-q-action-row">
                <input type="number" class="input input--sm lab-q-input" id="labQInput_${idx}" data-qindex="${idx}" placeholder="Ingresá tu respuesta..." step="any">
                <button type="button" class="button button--primary button--sm lab-q-verify-btn" id="labBtnVerify_${idx}" data-qindex="${idx}">
                    Verificar
                </button>
                <span class="lab-q-status-badge" id="labQStatus_${idx}"></span>
            </div>
            <div class="lab-3rd-attempt-box hidden" id="lab3rdAttemptBox_${idx}">
                <p class="lab-3rd-attempt-prompt">🤔 ¿Querés una pista para resolver este inciso o preferís ver la respuesta explicada?</p>
                <div class="lab-3rd-attempt-actions">
                    <button type="button" class="button button--secondary button--xs" id="labBtnPista_${idx}" data-qindex="${idx}">
                        💡 Ver Pista
                    </button>
                    <button type="button" class="button button--accent button--xs" id="labBtnRespuesta_${idx}" data-qindex="${idx}">
                        📖 Ver Respuesta & Paso a Paso
                    </button>
                </div>
            </div>
            <div class="lab-q-reveal-box hidden" id="labQRevealBox_${idx}"></div>
        `;

        dom.labQuestionsList.appendChild(item);

        // Wire events de cada pregunta
        const verifyBtn = item.querySelector(`#labBtnVerify_${idx}`);
        const inputField = item.querySelector(`#labQInput_${idx}`);
        const pistaBtn = item.querySelector(`#labBtnPista_${idx}`);
        const respBtn = item.querySelector(`#labBtnRespuesta_${idx}`);

        if (verifyBtn) verifyBtn.addEventListener("click", () => verificarPreguntaInciso(idx));
        if (inputField) {
            inputField.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    verificarPreguntaInciso(idx);
                }
            });
        }
        if (pistaBtn) pistaBtn.addEventListener("click", () => mostrarPistaInciso(idx));
        if (respBtn) respBtn.addEventListener("click", () => mostrarRespuestaInciso(idx));
    });
}

function actualizarProgresoPreguntasUI() {
    const ej = laboratorioEstado.ejercicioActual;
    if (!ej || !dom.labQuestionsProgress) return;
    const total = ej.preguntas.length;
    const resueltas = Object.keys(laboratorioEstado.resueltasPorPregunta).length;
    dom.labQuestionsProgress.textContent = `${resueltas} de ${total} resueltos`;
}

// ------------------------------------------
// VERIFICACIÓN Y FLUJO DE 3 INTENTOS
// ------------------------------------------

function verificarPreguntaInciso(idx) {
    const ej = laboratorioEstado.ejercicioActual;
    if (!ej || !ej.preguntas[idx]) return;
    const q = ej.preguntas[idx];

    const input = document.getElementById(`labQInput_${idx}`);
    const verifyBtn = document.getElementById(`labBtnVerify_${idx}`);
    const statusBadge = document.getElementById(`labQStatus_${idx}`);
    const attemptBox = document.getElementById(`lab3rdAttemptBox_${idx}`);
    const itemCard = document.getElementById(`labQuestionItem_${idx}`);

    if (!input) return;
    const val = parseFloat(input.value);

    if (isNaN(val)) {
        mostrarToast("⚠️ Por favor, ingresá un número para verificar el inciso.", "aviso");
        return;
    }

    const tol = q.tolerancia || 0.05;
    const esCorrecto = Math.abs(val - q.esperado) <= tol;

    if (esCorrecto) {
        // Marcado de éxito
        laboratorioEstado.resueltasPorPregunta[idx] = true;
        if (itemCard) {
            itemCard.classList.remove("is-error");
            itemCard.classList.add("is-correct");
        }
        if (statusBadge) {
            statusBadge.className = "lab-q-status-badge is-correct";
            statusBadge.textContent = "✅ ¡Correcto! (+25 XP)";
        }
        if (input) input.disabled = true;
        if (verifyBtn) verifyBtn.disabled = true;
        if (attemptBox) attemptBox.classList.add("hidden");

        laboratorioEstado.xpTotal += 25;
        if (dom.labXpDisplay) dom.labXpDisplay.textContent = `${laboratorioEstado.xpTotal} XP`;

        reproducirSonidoDuelo("fanfare");
        actualizarProgresoPreguntasUI();

        // Chequear si se completó todo el ejercicio
        if (Object.keys(laboratorioEstado.resueltasPorPregunta).length >= ej.preguntas.length) {
            finalizarEjercicioLaboratorio();
        }
    } else {
        // Intento fallido
        const intentos = (laboratorioEstado.intentosPorPregunta[idx] || 0) + 1;
        laboratorioEstado.intentosPorPregunta[idx] = intentos;

        reproducirSonidoDuelo("buzzer");

        if (itemCard) itemCard.classList.add("is-error");

        if (intentos < 3) {
            if (statusBadge) {
                statusBadge.className = "lab-q-status-badge is-wrong";
                statusBadge.textContent = `❌ No coincide (Intento ${intentos}/3). Verificá tu cálculo.`;
            }
        } else {
            // Tercer intento o superior: desplegar caja interactiva
            if (statusBadge) {
                statusBadge.className = "lab-q-status-badge is-wrong";
                statusBadge.textContent = "❌ Intento 3/3 alcanzado.";
            }
            if (attemptBox) {
                attemptBox.classList.remove("hidden");
            }
        }
    }
}

function mostrarPistaInciso(idx) {
    const ej = laboratorioEstado.ejercicioActual;
    if (!ej || !ej.preguntas[idx]) return;
    const q = ej.preguntas[idx];

    const revealBox = document.getElementById(`labQRevealBox_${idx}`);
    if (revealBox) {
        revealBox.classList.remove("hidden");
        revealBox.innerHTML = `<strong>💡 Pista para el Inciso ${q.letra.toUpperCase()}:</strong><p style="margin: 0.35rem 0 0;">${q.pista || "Consultá las fórmulas en la Mesa de Trabajo."}</p>`;
        mostrarToast("💡 Pista desbloqueada.", "info");
    }
}

function mostrarRespuestaInciso(idx) {
    const ej = laboratorioEstado.ejercicioActual;
    if (!ej || !ej.preguntas[idx]) return;
    const q = ej.preguntas[idx];

    const revealBox = document.getElementById(`labQRevealBox_${idx}`);
    const input = document.getElementById(`labQInput_${idx}`);

    if (revealBox) {
        revealBox.classList.remove("hidden");
        revealBox.innerHTML = `<strong>📖 Respuesta Exacta (${q.esperado}) & Paso a Paso:</strong><p style="margin: 0.35rem 0 0;">${q.explicacion || `El valor teórico exacto es ${q.esperado}.`}</p>`;
    }

    if (input) {
        input.value = q.esperado;
    }
    mostrarToast(`📖 Respuesta revelada para el Inciso ${q.letra.toUpperCase()}.`, "info");
}

function finalizarEjercicioLaboratorio() {
    if (dom.labCompletedCard) dom.labCompletedCard.classList.remove("hidden");
    laboratorioEstado.xpTotal += 50;
    if (dom.labXpDisplay) dom.labXpDisplay.textContent = `${laboratorioEstado.xpTotal} XP`;

    reproducirSonidoDuelo("fanfare");
    mostrarToast("🎉 ¡Felicitaciones! Completaste todos los incisos del ejercicio de Estadística.", "exito");
}

// ------------------------------------------
// CONFIGURACIÓN DE EVENT LISTENERS DEL LAB
// ------------------------------------------

function configurarEventosLaboratorio() {
    // Modal de Configuración
    if (dom.labBtnAbrirConfigModal) {
        dom.labBtnAbrirConfigModal.addEventListener("click", abrirModalConfigLab);
    }
    if (dom.closeLabConfigModalBtn) {
        dom.closeLabConfigModalBtn.addEventListener("click", cerrarModalConfigLab);
    }
    if (dom.closeLabConfigModalBottomBtn) {
        dom.closeLabConfigModalBottomBtn.addEventListener("click", cerrarModalConfigLab);
    }

    // Carga de archivo PDF con Drag & Drop y Click
    if (dom.labUploadDropzone && dom.labPdfFileInput) {
        dom.labUploadDropzone.addEventListener("click", (e) => {
            if (e.target.closest("#labBtnQuitarPdf")) return;
            dom.labPdfFileInput.click();
        });

        dom.labPdfFileInput.addEventListener("change", (e) => {
            const file = e.target.files?.[0];
            if (file) procesarPdfLaboratorio(file);
        });

        dom.labUploadDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dom.labUploadDropzone.classList.add("is-dragover");
        });
        dom.labUploadDropzone.addEventListener("dragleave", () => {
            dom.labUploadDropzone.classList.remove("is-dragover");
        });
        dom.labUploadDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            dom.labUploadDropzone.classList.remove("is-dragover");
            const file = e.dataTransfer.files?.[0];
            if (file) procesarPdfLaboratorio(file);
        });
    }

    if (dom.labBtnQuitarPdf) {
        dom.labBtnQuitarPdf.addEventListener("click", (e) => {
            e.stopPropagation();
            limpiarPdfLaboratorio();
        });
    }

    // Selector de tema de Estadística (radio cards)
    if (dom.labTopicsGrid) {
        dom.labTopicsGrid.querySelectorAll(".lab-topic-option").forEach(opt => {
            opt.addEventListener("click", () => {
                dom.labTopicsGrid.querySelectorAll(".lab-topic-option").forEach(o => o.classList.remove("is-selected"));
                opt.classList.add("is-selected");
                const radio = opt.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    laboratorioEstado.temaSeleccionado = radio.value;
                }
            });
        });
    }

    // Botón "Cargar y Preparar Laboratorio" del modal
    if (dom.labBtnCargarConfig) {
        dom.labBtnCargarConfig.addEventListener("click", () => {
            const checkedRadio = document.querySelector('input[name="labTopicRadio"]:checked');
            if (checkedRadio) {
                laboratorioEstado.temaSeleccionado = checkedRadio.value;
            }
            cerrarModalConfigLab();
            generarEjercicioLaboratorio(true);
        });
    }

    // Botones Header
    if (dom.labBtnGenerarConIA) {
        dom.labBtnGenerarConIA.addEventListener("click", () => generarEjercicioLaboratorio(true));
    }
    if (dom.labBtnGenerarOtro) {
        dom.labBtnGenerarOtro.addEventListener("click", () => generarEjercicioLaboratorio(true));
    }
    if (dom.labBtnSiguienteCasoModal) {
        dom.labBtnSiguienteCasoModal.addEventListener("click", () => generarEjercicioLaboratorio(true));
    }

    // Copiar estadísticas a portapapeles desde el panel de 7 métricas
    if (dom.labWidgetFreq) {
        dom.labWidgetFreq.querySelectorAll(".lab-copy-stat-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-target");
                const elem = document.getElementById(targetId);
                if (elem) {
                    const val = elem.textContent.replace("%", "").trim();
                    if (val && val !== "-") {
                        navigator.clipboard.writeText(val).then(() => {
                            mostrarToast(`📋 Copiado al portapapeles: ${val}`, "info");
                        }).catch(() => {
                            mostrarToast(`Valor: ${val}`, "info");
                        });
                    }
                }
            });
        });
    }

    // Conmutador Móvil de Vistas (Enunciado / Herramientas)
    if (dom.labMobileBtnEnunciado) {
        dom.labMobileBtnEnunciado.addEventListener("click", () => cambiarVistaMovilLab("enunciado"));
    }
    if (dom.labMobileBtnHerramientas) {
        dom.labMobileBtnHerramientas.addEventListener("click", () => cambiarVistaMovilLab("herramientas"));
    }
    if (dom.labMobileFloatToggleBtn) {
        dom.labMobileFloatToggleBtn.addEventListener("click", () => {
            const actual = dom.laboratorioSplit?.getAttribute("data-mobile-view") || "enunciado";
            cambiarVistaMovilLab(actual === "enunciado" ? "herramientas" : "enunciado");
        });
    }

    // Pestañas de Herramientas
    const tabBtns = [
        { btn: dom.labTabBtnFreq, id: "freq" },
        { btn: dom.labTabBtnProb, id: "prob" },
        { btn: dom.labTabBtnBayes, id: "bayes" },
        { btn: dom.labTabBtnScratch, id: "scratch" }
    ];

    tabBtns.forEach(({ btn, id }) => {
        if (!btn) return;
        btn.addEventListener("click", () => activarTabLaboratorio(id));
    });

    // Grilla de Frecuencias
    if (dom.labBtnAddRow) dom.labBtnAddRow.addEventListener("click", agregarFilaGrilla);
    if (dom.labBtnRemoveRow) dom.labBtnRemoveRow.addEventListener("click", () => quitarFilaGrilla(laboratorioEstado.tablaDatos.length - 1));
    if (dom.labBtnAddCol) {
        dom.labBtnAddCol.addEventListener("click", () => {
            const tipo = dom.labSelectColType?.value || "xifi";
            agregarColumnaGrilla(tipo);
        });
    }
    if (dom.labBtnRemoveCol) {
        dom.labBtnRemoveCol.addEventListener("click", quitarColumnaGrilla);
    }
    if (dom.labBtnClearTable) dom.labBtnClearTable.addEventListener("click", limpiarGrillaFrecuencias);

    // Calculadora Normal inputs
    [dom.labNormMean, dom.labNormStd, dom.labNormX, dom.labNormTail].forEach(elem => {
        if (elem) elem.addEventListener("input", actualizarCalculosNormalUI);
    });

    // Subtabs Calculadora Probabilidades
    if (dom.labWidgetProb) {
        dom.labWidgetProb.querySelectorAll(".lab-subtab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-subtab");
                dom.labWidgetProb.querySelectorAll(".lab-subtab-btn").forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");

                const subpanels = {
                    normal: document.getElementById("labSubpanelNormal"),
                    binomial: document.getElementById("labSubpanelBinomial"),
                    poisson: document.getElementById("labSubpanelPoisson"),
                    calc: document.getElementById("labSubpanelCalc")
                };

                Object.entries(subpanels).forEach(([k, p]) => {
                    if (p) p.classList.toggle("hidden", k !== target);
                });

                if (target === "normal") actualizarCalculosNormalUI();
            });
        });
    }

    // Binomial inputs
    [dom.labBinoN, dom.labBinoP, dom.labBinoK].forEach(elem => {
        if (elem) elem.addEventListener("input", actualizarCalculosBinomialUI);
    });

    // Poisson inputs
    [dom.labPoisLambda, dom.labPoisK].forEach(elem => {
        if (elem) elem.addEventListener("input", actualizarCalculosPoissonUI);
    });

    // Bayes inputs
    [dom.labBayesCellAB, dom.labBayesCellANotB, dom.labBayesCellNotAB, dom.labBayesCellNotANotB].forEach(elem => {
        if (elem) elem.addEventListener("input", recalcularMatrizBayes);
    });

    if (dom.labBayesEvAName) {
        dom.labBayesEvAName.addEventListener("input", (e) => {
            const nom = e.target.value || "A";
            if (dom.labBayesThA) dom.labBayesThA.textContent = nom;
            if (dom.labBayesThNotA) dom.labBayesThNotA.textContent = `No ${nom}`;
        });
    }
    if (dom.labBayesEvBName) {
        dom.labBayesEvBName.addEventListener("input", (e) => {
            const nom = e.target.value || "B";
            if (dom.labBayesThB) dom.labBayesThB.textContent = nom;
            if (dom.labBayesThNotB) dom.labBayesThNotB.textContent = `No ${nom}`;
        });
    }
}



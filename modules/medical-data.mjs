export const MATERIAS_MEDICINA_IVAN = [
    {
        id: "lista_medicina_interna",
        nombre: "MEDICINA INTERNA (FISIOPATO - DX - TTO)",
        temas: [
            { id: "med_tema_1", titulo: "Insuficiencia Cardíaca Congestiva (ICC): Fisiopatología, estadios NYHA y manejo médico" },
            { id: "med_tema_2", titulo: "Síndrome Coronario Agudo: SCACEST vs SCASEST, biomarcadores y reperfusión" },
            { id: "med_tema_3", titulo: "Tromboembolismo Pulmonar (TEP): Fisiopatología, Score de Wells y dímero D" },
            { id: "med_tema_4", titulo: "Neumonía Adquirida en la Comunidad (NAC): Criterios CURB-65 y tratamiento antibiótico" },
            { id: "med_tema_5", titulo: "Accidente Cerebrovascular (ACV) Isquémico: Escala NIHSS y ventana de trombolisis" },
            { id: "med_tema_6", titulo: "EPOC Exacerbado: Criterios de Anthonisen, gasometría y broncodilatadores" },
            { id: "med_tema_7", titulo: "Cetoacidosis Diabética (CAD) vs Síndrome Hiperosmolar: Fisiopatología y corrección iónica" },
            { id: "med_tema_8", titulo: "Cirrosis Descompensada: Hipertensión portal, ascitis, PBE y encefalopatía" },
            { id: "med_tema_9", titulo: "Injuria Renal Aguda (IRA): Etiologías prerrenal, parenquimatosa y posrenal" },
            { id: "med_tema_10", titulo: "Shock Séptico: Criterios SOFA/qSOFA, reanimación hídrica y vasopresores" }
        ]
    },
    {
        id: "lista_farmacologia_2",
        nombre: "FARMACOLOGÍA 2 (CINÉTICA - DINAMIA - DROGAS)",
        temas: [
            { id: "farma_tema_1", titulo: "Betabloqueantes: Selectividad β1 vs β2, farmacocinética y efectos adversos" },
            { id: "farma_tema_2", titulo: "IECA y ARA II: Mecanismo de acción, nefroprotección y contraindicaciones" },
            { id: "farma_tema_3", titulo: "Antagonistas del Calcio: Dihidropiridinas vs No dihidropiridinas y usos clínicos" },
            { id: "farma_tema_4", titulo: "Betalactámicos: Cefalosporinas, Carbapenemes y mecanismos de resistencia bacteriana" },
            { id: "farma_tema_5", titulo: "Macrólidos y Quinolonas: Espectro antibacteriano, farmacocinética y riesgo de QT largo" },
            { id: "farma_tema_6", titulo: "Aminoglucósidos: Cinética de eliminación, ototoxicidad y nefrotoxicidad" },
            { id: "farma_tema_7", titulo: "Opioides Mayores y Menores: Receptores mu/kappa, efectos adversos y Naloxona" },
            { id: "farma_tema_8", titulo: "AINEs y Coxibs: Inhibición COX-1 vs COX-2, gastropatía y toxicidad renal" },
            { id: "farma_tema_9", titulo: "Anticoagulantes Orales: Antagonistas de Vit K vs DOACs (Apixabán, Rivaroxabán)" },
            { id: "farma_tema_10", titulo: "Benzodiazepinas: Modulación alostérica GABA-A, tolerancia y Flumazenil" },
            { id: "farma_tema_11", titulo: "Antidepresivos ISRS: Mecanismo serotoninérgico, interacciones y efectos secundarios" }
        ]
    },
    {
        id: "lista_salud_publica",
        nombre: "SALUD PÚBLICA (TRABAJOS PRÁCTICOS & APS)",
        temas: [
            { id: "salud_tema_1", titulo: "Indicadores de Mortalidad: Tasa de Mortalidad Infantil (Neonatal/Postneonatal) y Materna" },
            { id: "salud_tema_2", titulo: "Medidas de Frecuencia: Prevalencia de Punto vs Incidencia Acumulada y Densidad de Incidencia" },
            { id: "salud_tema_3", titulo: "Historia Natural de la Enfermedad y Niveles de Prevención (Leavell & Clark)" },
            { id: "salud_tema_4", titulo: "Atención Primaria de la Salud (APS): Declaración de Alma-Ata y APS Integral vs Selectiva" },
            { id: "salud_tema_5", titulo: "Diseños de Estudios Epidemiológicos: Transversales, Casos y Controles, Cohortes y Ensayos" },
            { id: "salud_tema_6", titulo: "Vigilancia Epidemiológica: Eventos de Notificación Obligatoria, canal endémico e investigación de brotes" },
            { id: "salud_tema_7", titulo: "Transición Epidemiológica y Demográfica: Patrón de morbimortalidad y envejecimiento poblacional" },
            { id: "salud_tema_8", titulo: "Determinantes Sociales de la Salud: Modelo de Dahlgren-Whitehead y equidad sanitaria" },
            { id: "salud_tema_9", titulo: "Sistemas de Salud: Estructura del Modelo Sanitario Argentino (Público, Obras Sociales, Privado)" }
        ]
    }
];

export const CASOS_CLINICOS_MEDICINA = [
    {
        especialidad: "Cardiología / Urgencias",
        titulo: "Paciente masculino de 58 años",
        descripcion: "Dolor precordial opresivo retroesternal de 45 min de evolución, de inicio en reposo, con irradiación a mandíbula y brazo izquierdo, acompañado de diaforesis profusa, náuseas y disnea leve.",
        vitales: "TA 155/95 mmHg · FC 104 lpm · FR 22 rpm · SatO2 94% · T 36.8°C",
        antecedentes: "Hipertensión arterial mal controlada (10 años), Tabaquismo activo (30 paquetes/año), Dislipemia mixta.",
        fisiopatologia: "Rotura o erosión de placa ateromatosa vulnerable en arteria coronaria epicárdica con exposición del factor tisular subendotelial. Agregación plaquetaria inmediata y activación de la cascada de coagulación que forman un trombo oclusivo agudo transmural, provocando isquemia miocárdica severa y necrosis miocítica progresiva.",
        diagnostico: "<strong>Diagnóstico Presuntivo:</strong> Síndrome Coronario Agudo con Elevación del Segmento ST (SCACEST) de cara anterior o inferior.<br><strong>Diagnósticos Diferenciales:</strong> Síndrome aórtico agudo (disección aórtica), Tromboembolismo pulmonar masivo (TEP), Pericarditis aguda con derrame, Neumotórax a tensión, Espasmo esofágico difuso.",
        tratamiento: "<strong>Conducta Inmediata:</strong><br>• Monitoreo electrocardiográfico continuo y vía periférica.<br>• Oxigenoterapia sólo si SatO2 &lt; 90%.<br>• Doble antiagregación plaquetaria: Aspirina (carga 300 mg masticable) + Ticagrelor (carga 180 mg) o Clopidogrel (carga 600 mg).<br>• Anticoagulación parenteral: Enoxaparina 1 mg/kg SC o Heparina No Fraccionada (bolo + infusión).<br>• Nitroglicerina sublingual si TA &gt; 100 mmHg y no tomó inhibidores PDE5.<br>• <strong>Estrategia de Reperfusión Urgente:</strong> Angioplastia Coronaria Primaria (ATC) antes de 120 min del primer contacto médico. Si no se dispone de hemodinamia en tiempo, fibrinolíticos (Tenecteplasa / Alteplasa) dentro de los primeros 30 min."
    },
    {
        especialidad: "Endocrinología / Terapia Intensiva",
        titulo: "Paciente femenina de 23 años",
        descripcion: "Ingresa por somnolencia, deshidratación severa con signo del pliegue positivo, vómitos reiterados, dolor abdominal difuso y polidipsia intensa en las últimas 48 horas tras discontinuar tratamiento.",
        vitales: "TA 90/60 mmHg · FC 122 lpm · FR 28 rpm (Kussmaul) · SatO2 98% · Aliento cetónico característico",
        antecedentes: "Diabetes Mellitus Tipo 1 desde los 12 años en tratamiento con insulina basal/bolo.",
        fisiopatologia: "Déficit absoluto de insulina asociado a un aumento marcado de hormonas contrarreguladoras (glucagón, cortisol, catecolaminas y GH). Esto desencadena una lipólisis acelerada con liberación de ácidos grasos libres que sufren beta-oxidación hepática, produciendo acetoacetato y beta-hidroxibutirato en cantidades que desbordan los tampones plasmáticos, causando acidosis metabólica con anión gap elevado y deshidratación osmótica severa.",
        diagnostico: "<strong>Diagnóstico Presuntivo:</strong> Cetoacidosis Diabética (CAD) moderada-severa.<br><strong>Diagnósticos Diferenciales:</strong> Estado Hiperglucémico Hiperosmolar, Acidosis láctica, Abdomen agudo quirúrgico, Intoxicación por salicilatos o metanol, Cetoacidosis alcohólica.",
        tratamiento: "<strong>Pilares Terapéuticos:</strong><br>1. <strong>Expansión de Volumen:</strong> Solución Fisiológica 0.9% a 1000-1500 ml en la primera hora para restaurar perfusión tisular.<br>2. <strong>Control del Potasio:</strong> Si K &lt; 3.3 mEq/L, reponer potasio antes de administrar insulina. Si K entre 3.3 y 5.3 mEq/L, agregar KCl al plan de hidratación.<br>3. <strong>Insulinoterapia:</strong> Insulina corriente / regular en infusión IV continua a 0.1 UI/kg/hora. Cuando la glucemia alcance 200 mg/dL, rotar soluciones a Dextrosa al 5% para prevenir hipoglucemia mientras se cierra el anión gap.<br>4. <strong>Monitoreo:</strong> Gasometría, ionograma cada 2-4 horas y corrección de la causa desencadenante (infección o transgresión)."
    },
    {
        especialidad: "Neumonología / Medicina General",
        titulo: "Paciente masculino de 66 años",
        descripcion: "Presenta tos productiva con esputo herrumbroso, fiebre alta con escalofríos de 3 días de evolución, dolor tipo puntada en hemitórax derecho que aumenta con la inspiración profunda y disnea progresiva.",
        vitales: "TA 110/70 mmHg · FC 106 lpm · FR 26 rpm · SatO2 91% aire ambiente · T 38.9°C",
        antecedentes: "EPOC grado moderado en uso de inhaladores, extabaquista, sin vacunación antigripal ni antineumocócica reciente.",
        fisiopatologia: "Inhalación y colonización de la vía aérea distal por Streptococcus pneumoniae que burla los macrófagos alveolares. Se desencadena una respuesta inflamatoria alveolar aguda con vasodilatación capilar, extravasación de exudado fibrinoso, leucocitos polimorfonucleares y eritrocitos, consolidando el parénquima pulmonar y generando un shunt intrapulmonar con desequilibrio V/Q.",
        diagnostico: "<strong>Diagnóstico Presuntivo:</strong> Neumonía Adquirida en la Comunidad (NAC) típica con consolidación lobar derecha.<br><strong>Estratificación de Riesgo:</strong> CURB-65 = 2 (Urea pendiente, FR &ge; 30 rpm dudosa, Edad &ge; 65), amerita internación hospitalaria.<br><strong>Diferenciales:</strong> Infarto pulmonar por TEP, Atelectasia por tapón mucoso o neoplasia, Insuficiencia cardíaca descompensada, Exacerbación de EPOC pura.",
        tratamiento: "<strong>Conducta:</strong><br>• Internación en sala general de cuidados clínicos.<br>• Oxigenoterapia con cánula nasal para mantener SatO2 entre 92-95%.<br>• <strong>Esquema Antibiótico Empírico:</strong> Ampicilina-Sulbactam 1.5g c/6h IV + Claritromicina 500mg c/12h VO, o Ceftriaxona 2g/día IV + Azitromicina 500mg/día.<br>• Hidratación parenteral, analgesia con paracetamol para el dolor torácico, kinesioterapia respiratoria y profilaxis con HBPM."
    },
    {
        especialidad: "Gastroenterología / Hepatología",
        titulo: "Paciente masculino de 53 años",
        descripcion: "Consulta por marcado aumento del perímetro abdominal con sensación de pesadez en hipocondrio derecho, ictericia escleral, febrícula (37.9°C) y dolor abdominal difuso en las últimas 24 horas.",
        vitales: "TA 105/65 mmHg · FC 98 lpm · FR 18 rpm · SatO2 97% · T 37.9°C",
        antecedentes: "Cirrosis hepática Child-Pugh B por consumo crónico de alcohol. Sin hemorragia digestiva previa.",
        fisiopatologia: "La fibrosis hepática y distorsión de la arquitectura vascular generan hipertensión portal sinusoidal sostenida. La vasodilatación esplácnica inducida por óxido nítrico disminuye el volumen arterial circulante eficaz, activando el SRAA y el sistema simpático con retención ávida de sodio y agua (ascitis). La disminución de la función de filtro reticuloendotelial y el aumento de la permeabilidad intestinal facilitan la translocación de bacterias entéricas a los ganglios linfáticos mesentéricos y al líquido ascítico (infección monobacteriana espontánea).",
        diagnostico: "<strong>Diagnóstico Presuntivo:</strong> Cirrosis hepática descompensada con Ascitis y sospecha clínica de Peritonitis Bacteriana Espontánea (PBE).<br><strong>Conducta Diagnóstica Inmediata:</strong> Paracentesis diagnóstica con recuento celular (positivo si PMN &gt; 250/mm³) y cultivo de líquido en frascos de hemocultivo.<br><strong>Diferenciales:</strong> Peritonitis secundaria (polimicrobiana por perforación), Carcinomatosis peritoneal, Ascitis quilosa o tuberculosa.",
        tratamiento: "<strong>Tratamiento Médico:</strong><br>• Cefalosporina de 3ra generación: Cefotaxima 2g c/8h IV o Ceftriaxona 2g/día IV por 5 días.<br>• <strong>Albúmina Humana IV:</strong> 1.5 g/kg dentro de las primeras 6 horas y 1 g/kg al día 3, para prevenir el síndrome hepatorrenal y reducir la mortalidad.<br>• Restricción moderada de sodio (2g sal/día). Suspender transitoriamente diuréticos si hay deterioro de función renal.<br>• Profilaxis secundaria de por vida con Norfloxacino 400 mg/día o TMS."
    },
    {
        especialidad: "Nefrología / Medicina Interna",
        titulo: "Paciente femenina de 71 años",
        descripcion: "Familiares refieren que en los últimos 4 días tuvo diarrea acuosa profusa de 6-8 deposiciones diarias. Desde hace 24 horas no orina (anuria) y se encuentra desorientada en tiempo y espacio.",
        vitales: "TA 85/55 mmHg · FC 112 lpm (filiforme) · FR 20 rpm · SatO2 96% · Mucosas secas",
        antecedentes: "Hipertensión y gonartrosis tratada con Enalapril 20 mg/día, Hidroclorotiazida y Diclofenac 75 mg c/12h.",
        fisiopatologia: "Hipovolemia severa por pérdidas gastrointestinales que causa disminución del gasto cardíaco y del flujo plasmático renal. La administración de Enalapril (bloquea la vasoconstricción de la arteriola eferente) sumada al Diclofenac (inhibe la síntesis de prostaglandinas que vasodilatan la arteriola aferente) anula por completo los mecanismos compensadores de autorregulación hemodinámica intraglomerular, provocando una caída drástica de la presión de filtración y necrosis tubular aguda isquémica inminente.",
        diagnostico: "<strong>Diagnóstico Presuntivo:</strong> Injuria Renal Aguda (IRA) prerrenal con riesgo de transformación a Parenquimatosa (NTA isquémica).<br><strong>Diferenciales:</strong> Nefritis intersticial inmunoalérgica por AINEs, Uropatía obstructiva posrenal aguda (globo vesical), Shock distributivo séptico.",
        tratamiento: "<strong>Conducta Inmediata:</strong><br>• Suspensión inmediata de todos los fármacos nefrotóxicos y moduladores hemodinámicos (Enalapril, Diuréticos, AINEs).<br>• Resucitación con cristaloides isotónicos (Solución Ringer Lactato o Solución Fisiológica) guiada por parámetros dinámicos de volemia.<br>• Colocación de sonda vesical para monitoreo horario del débito urinario.<br>• Laboratorio urgente con sedimento urinario, sodio y creatinina en orina para calcular FENa (FENa &lt; 1% orienta a prerrenal; &gt; 2% a NTA)."
    }
];

export const DATOS_FARMACOLOGIA_2 = {
    beta_bloqueantes: {
        titulo: "Betabloqueantes (Atenolol, Propranolol, Bisoprolol, Carvedilol, Metoprolol)",
        subtitulo: "Sistema Cardiovascular / SNA Simpático",
        dinamia: "Antagonismo competitivo y selectivo o no selectivo de receptores adrenérgicos β1 y β2 cardíacos y vasculares. Provocan efectos cronotrópico negativo (FC ↓), inotrópico negativo (contractilidad ↓), dromotrópico negativo (conducción AV ↓) y batmotrópico negativo. Inhiben la liberación de renina por las células yuxtaglomerulares renales.",
        cinetica: "<strong>Absorción:</strong> Alta biodisponibilidad VO pero con extenso primer paso hepático.<br><strong>Liposolubilidad:</strong> Propranolol muy liposoluble (atraviesa barrera hematoencefálica y placenta); Atenolol hidrosoluble (excreción renal casi exclusiva).<br><strong>Metabolismo:</strong> Hepático oxidativo (CYP2D6). Semivida: Propranolol 3-5h, Bisoprolol 10-12h.",
        usos: "• Insuficiencia Cardíaca con FEVI reducida (Bisoprolol, Carvedilol, Metoprolol succinato - reducen mortalidad).<br>• Cardiopatía isquémica post-IAM y angina de pecho.<br>• Control de frecuencia en Fibrilación Auricular y arritmias supraventriculares.<br>• Hipertensión arterial en pacientes con co-indicación.<br>• Profilaxis de migraña y temblor esencial (Propranolol).",
        adversos: "<strong>Efectos Adversos:</strong> Bradicardia sinusal, bloqueo auriculoventricular, broncoespasmo (especialmente los no cardioselectivos en asmáticos), frialdad distal de extremidades (fenómeno de Raynaud), astenia y disfunción eréctil. Enmascaran síntomas adrenérgicos de hipoglucemia en diabéticos.<br><strong>Contraindicaciones:</strong> Asma bronquial activa, bloqueo AV de 2° o 3° grado sin marcapasos, bradicardia severa (&lt; 50 lpm), shock cardiogénico e insuficiencia cardíaca aguda descompensada."
    },
    ieca_ara2: {
        titulo: "IECA (Enalapril, Ramipril) y ARA II (Losartán, Valsartán, Telmisartán)",
        subtitulo: "Sistema Renina-Angiotensina-Aldosterona (SRAA)",
        dinamia: "<strong>IECA:</strong> Inhiben competitivamente a la Enzima Convertidora de Angiotensina (ECA/cininasa II), impidiendo la conversión de Angiotensina I a Angiotensina II y degradación de bradicininas.<br><strong>ARA II:</strong> Bloquean de forma competitiva y altamente selectiva los receptores AT1 de Angiotensina II. Ambos disminuyen la resistencia vascular periférica, la retención de agua/sodio por aldosterona y el remodelado ventricular patológico.",
        cinetica: "<strong>Enalapril:</strong> Es un profármaco que requiere hidrólisis hepática a Enalaprilat. Excreción renal predominante (requiere ajuste en insuficiencia renal).<br><strong>Losartán:</strong> Metabolismo hepático a metabolito activo EXP3174 (10 a 40 veces más potente). Semivida de ARA II permite dosificación cada 12 o 24 horas.",
        usos: "• Hipertensión arterial esencial (fármacos de primera línea).<br>• Insuficiencia cardíaca congestiva con fracción de eyección reducida (reducen remodelado y morbimortalidad).<br>• Nefroprotección en Diabetes Mellitus y enfermedad renal crónica con proteinuria (dilatación de arteriola eferente que baja presión intraglomerular).<br>• Post-infarto agudo de miocardio.",
        adversos: "<strong>Efectos Adversos:</strong> Tos seca persistente (IECA, por acumulación de bradicininas en vía aérea; no ocurre en ARA II), hiperpotasemia, hipotensión de primera dosis, deterioro de la función renal si hay hipovolemia, y angioedema (raro pero potencialmente mortal).<br><strong>Contraindicaciones Absolutas:</strong> Embarazo (teratogénicos en 2do y 3er trimestre: disgenesia renal fetal y oligohidramnios), estenosis bilateral de arteria renal o estenosis de arteria de riñón único, antecedentes de angioedema."
    },
    antibioticos_beta: {
        titulo: "Betalactámicos (Amoxicilina, Cefalosporinas 1°-4°, Meropenem, Pip/Tazo)",
        subtitulo: "Antimicrobianos bactericidas tiempo-dependientes",
        dinamia: "Inhiben la síntesis de la pared bacteriana de peptidoglicano mediante unión covalente e inactivación irreversible de las PBPs (Penicillin-Binding Proteins / transpeptidasas). Esto desestabiliza la pared osmótica e induce lisis bacteriana autolítica. Efecto bactericida dependiente del tiempo en que la concentración libre supera la CIM (T &gt; CIM).",
        cinetica: "Distribución amplia en líquidos corporales. Cefalosporinas de 3ra generación (Ceftriaxona, Cefotaxima) y Carbapenemes cruzan adecuadamente la barrera hematoencefálica con meninges inflamadas. Eliminación renal casi universal por filtración y secreción tubular activa (excepción: Ceftriaxona que tiene excreción biliar importante). Semivida corta (1-2h), requiriendo dosis frecuentes o infusión continua.",
        usos: "• Amoxi-Clavulánico: Infecciones respiratorias altas y bajas, mordeduras.<br>• Cefalexina / Cefazolina: Infecciones de piel y partes blandas (S. aureus sensible) y profilaxis quirúrgica.<br>• Ceftriaxona: Meningitis bacteriana, neumonía grave, pielonefritis, gonorrea.<br>• Meropenem y Pip/Tazo: Infecciones nosocomiales graves, neutropenia febril, sepsis polimicrobiana abdominal (cubren Pseudomonas aeruginosa).",
        adversos: "<strong>Efectos Adversos:</strong> Reacciones de hipersensibilidad (exantemas cutáneos hasta anafilaxia grave y síndrome de Stevens-Johnson), diarrea asociada a antibióticos y colitis pseudomembranosa por Clostridioides difficile, nefritis intersticial aguda, convulsiones a altas dosis de carbapenemes en insuficiencia renal.<br><strong>Contraindicación:</strong> Alergia severa previa demostrada al grupo betalactámico."
    },
    aines: {
        titulo: "AINEs y Coxibs (Ibuprofeno, Naproxeno, Diclofenac, Ketorolac, Celecoxib)",
        subtitulo: "Analgésicos, Antiinflamatorios y Antipiréticos",
        dinamia: "Inhibición de la enzima Ciclooxigenasa (COX-1 constitutiva y/o COX-2 inducible), bloqueando la biosíntesis de prostaglandinas inflamatorias (PGE2, PGI2) y tromboxano A2 (TXA2). Suprimen la sensibilización de nociceptores periféricos y reducen la respuesta pirógena en el hipotálamo.",
        cinetica: "Rápida y completa absorción oral. Muy alta unión a proteínas plasmáticas (albúmina &gt; 98%), con potencial de desplazamiento de otros fármacos como anticoagulantes orales. Metabolismo hepático vía citocromo P450 y excreción urinaria de metabolitos conjugados.",
        usos: "• Dolor inflamatorio agudo musculoesquelético, odontalgia, dismenorrea primaria.<br>• Tratamiento sintomático de cefaleas tensionales y migraña leve.<br>• Enfermedades reumáticas inflamatorias (artritis reumatoidea, osteoartritis, espondiloartritis).<br>• Cierre farmacológico del conducto arterioso permeable en neonatos (Indometacina / Ibuprofeno IV).",
        adversos: "<strong>Gastrointestinales:</strong> Gastritis erosiva, úlceras pépticas y hemorragia digestiva alta (por pérdida de PGE2 protectora de mucosa).<br><strong>Renales:</strong> Injuria renal aguda por vasoconstricción de arteriola aferente, retención de sodio/agua, empeoramiento de HTA e hiperpotasemia.<br><strong>Cardiovasculares:</strong> Aumento de riesgo de trombosis e IAM (especialmente con Coxibs al inhibir prostaciclina endotelial sin bloquear TXA2 plaquetario).<br><strong>Contraindicaciones:</strong> Úlcera péptica activa, insuficiencia renal moderada-severa, insuficiencia cardíaca descompensada y tercer trimestre de gestación."
    },
    opioides: {
        titulo: "Opioides Mayores y Menores (Morfina, Fentanilo, Tramadol, Oxicodona, Naloxona)",
        subtitulo: "Analgésicos Centrales Narcóticos",
        dinamia: "Agonistas sobre receptores opioides acoplados a proteína Gi/o (principalmente receptor μ / Mu, además de κ y δ) en asta dorsal medular, tronco encefálico y sistema límbico. Abren canales de K+ e inhiben canales de Ca2+ voltaje-dependientes, bloqueando la liberación de sustancia P y glutamato en la sinapsis del dolor.",
        cinetica: "Morfina sufre extenso metabolismo de primer paso (biodisponibilidad VO ~25-30%); su metabolito morfina-6-glucurónido es activo y se acumula en falla renal. Fentanilo altamente liposoluble, ideal para vía transdérmica, transmucosa o IV en anestesia. Tramadol requiere metabolismo por CYP2D6 para activar su metabolito O-desmetiltramadol (agonismo opioide + inhibición de recaptación de serotonina y noradrenalina).",
        usos: "• Dolor oncológico severo y cuidados paliativos.<br>• Dolor postoperatorio moderado a severo.<br>• Dolor agudo por infarto agudo de miocardio y edema agudo de pulmón (Morfina reduce precarga por venodilatación).<br>• Sedoanalgesia en pacientes críticos ventilados (Fentanilo).<br>• Antídoto de intoxicación: <strong>Naloxona</strong> (antagonista puro de receptores μ).",
        adversos: "<strong>Efectos Adversos:</strong> Sedación, depresión respiratoria dosis-dependiente (principal causa de letalidad), constipación tenaz (no genera tolerancia), náuseas y vómitos por estimulación del área postrema, prurito por liberación de histamina, miosis pupilar en punta de alfiler, tolerancia y dependencia física.<br><strong>Precauciones:</strong> EPOC severo, hipertensión endocraneana, insuficiencia hepática o renal."
    },
    ansioliticos: {
        titulo: "Benzodiazepinas (Diazepam, Clonazepam, Alprazolam, Lorazepam, Midazolam)",
        subtitulo: "Psicofármacos Moduladores GABAérgicos",
        dinamia: "Moduladores alostéricos positivos del receptor GABA-A en el SNC. Incrementan la frecuencia de apertura de los canales de cloro activados por GABA, hiperpolarizando la membrana neuronal e induciendo una potente inhibición sináptica. Generan 5 efectos farmacológicos: ansiolítico, sedante/hipnótico, miorrelajante, anticonvulsivante y amnesia anterógrada.",
        cinetica: "Alta liposolubilidad y paso rápido al SNC. Se dividen según vida media:<br>• Larga (&gt; 24h): Diazepam, Clonazepam (metabolitos activos de larga duración).<br>• Intermedia (10-20h): Lorazepam, Alprazolam (Lorazepam se glucuroniza directamente sin depender de CYP hepático, seguro en ancianos y hepatópatas).<br>• Corta/Ultracorta (&lt; 6h): Midazolam (ideal para inducción anestésica y crisis convulsivas agudas).",
        usos: "• Crisis de angustia y trastorno de pánico (Alprazolam, Clonazepam).<br>• Trastornos de ansiedad generalizada (ciclos cortos).<br>• Estatus epiléptico y convulsiones agudas (Diazepam IV / Lorazepam IV).<br>• Insomnio transitorio.<br>• Síndrome de abstinencia alcohólica (Diazepam).<br>• Antagonista específico en sobredosis: <strong>Flumazenil</strong>.",
        adversos: "<strong>Efectos Adversos:</strong> Sedación residual diurna, ataxia, enlentecimiento psicomotor, caídas y fracturas en ancianos, amnesia anterógrada, desarrollo rápido de tolerancia a efectos hipnóticos y marcada dependencia física/psíquica con síndrome de abstinencia tras suspensión brusca.<br><strong>Contraindicaciones:</strong> Miastenia gravis, apnea obstructiva del sueño, insuficiencia respiratoria severa, glaucoma de ángulo estrecho."
    },
    antidepresivos: {
        titulo: "ISRS (Sertralina, Escitalopram, Fluoxetina, Paroxetina, Citalopram)",
        subtitulo: "Inhibidores Selectivos de la Recaptación de Serotonina",
        dinamia: "Bloquean con alta afinidad y selectividad el transportador de recaptación de serotonina (SERT / 5-HTT) en la terminal presináptica. Esto incrementa de inmediato la disponibilidad de serotonina (5-HT) en la hendidura sináptica, desencadenando con el paso de las semanas (2 a 4 semanas) una desensibilización de autorreceptores 5-HT1A somatodendríticos y remodelado neurotrófico (BDNF).",
        cinetica: "Buena biodisponibilidad por vía oral. Fluoxetina tiene la semivida más prolongada (su metabolito norfluoxetina persiste hasta 7-14 días), con menor riesgo de síndrome de discontinuación. Escitalopram es el más selectivo sobre SERT. Fluoxetina y Paroxetina son potentes inhibidores del citocromo CYP2D6 (interacción con betabloqueantes y tamoxifeno).",
        usos: "• Trastorno Depresivo Mayor (fármacos de primera elección).<br>• Trastorno de Ansiedad Generalizada (TAG) y Trastorno de Pánico.<br>• Trastorno Obsesivo Compulsivo (TOC - requieren dosis más altas).<br>• Fobia Social y Trastorno por Estrés Postraumático (TEPT).<br>• Bulimia nerviosa (Fluoxetina aprobada a dosis de 60 mg).",
        adversos: "<strong>Efectos Adversos:</strong> Disfunción sexual (disminución de la libido, anorgasmia y retraso eyaculatorio en hasta 40-50% de pacientes), náuseas, vómitos, insomnio o somnolencia inicial, ganancia de peso (más marcada con Paroxetina), hiponatremia por SIADH en adultos mayores.<br><strong>Riesgo Crítico:</strong> Síndrome Serotoninérgico si se asocian con IMAO, Tramadol o Linezolid (hipertermia, mioclonías, rigidez, hiperreflexia y confusión mental)."
    }
};

export const RESPUESTAS_TP_SALUD_PUBLICA = {
    tasa_mortalidad: {
        titulo: "Tasas de Mortalidad Infantil y Materna (Indicadores de Salud)",
        contenido: `📊 ESTRUCTURA TÉCNICA PARA TRABAJO PRÁCTICO:

1. DEFINICIÓN DEL INDICADOR:
• Tasa de Mortalidad Infantil (TMI): Relaciona el número de defunciones de menores de 1 año de edad ocurridas en una población durante un año determinado, con el total de nacidos vivos registrados en el mismo período.
• Se expresa habitualmente cada 1.000 nacidos vivos (NV).

2. COMPONENTES Y FÓRMULAS:
• TMI = (Total de defunciones de < 1 año / Total de Nacidos Vivos) × 1.000
• Componente Neonatal (0 a 27 días): Vinculado a factores biológicos, control del embarazo y atención perinatal hospitalaria.
• Componente Postneonatal (28 días a 11 meses): Fuertemente condicionado por factores socioeconómicos, nutrición, saneamiento básico y acceso a vacunación.
• Razón de Mortalidad Materna (RMM) = (Muertes maternas por causas obstétricas / Nacidos Vivos) × 100.000 NV.

3. INTERPRETACIÓN SANITARIA Y DE GESTIÓN:
• La TMI es el indicador sociosanitario más sensible del nivel de desarrollo de una comunidad.
• Si predomina la mortalidad postneonatal, la intervención prioritaria radica en agua potable, vivienda digna y controles de APS en el centro de salud. Si predomina la neonatal, se deben fortalecer las maternidades y la regionalización perinatológica.

4. ESTRATEGIA COMUNITARIA (APS):
• Captación precoz de embarazadas antes de las 13 semanas.
• Promoción y protección de la lactancia materna exclusiva hasta los 6 meses.
• Cumplimiento del Calendario Nacional de Vacunación.`
    },
    incidencia_prevalencia: {
        titulo: "Prevalencia vs. Incidencia Acumulada",
        contenido: `📊 ESTRUCTURA TÉCNICA PARA TRABAJO PRÁCTICO:

1. DEFINICIONES OPERATIVAS:
• Incidencia: Mide la aparición de CASOS NUEVOS de una enfermedad en una población susceptible en un período determinado. Cuantifica el RIESGO o VELOCIDAD de enfermar.
• Prevalencia: Mide el número TOTAL de casos (antiguos + nuevos) presentes en un momento o período específico. Mide la CARGA de la enfermedad.

2. FÓRMULAS DE CÁLCULO:
• Incidencia Acumulada (IA) = (Casos nuevos en el período t / Población susceptible al inicio de t) × 10^k
• Tasa o Densidad de Incidencia = (Casos nuevos / Suma de personas-tiempo de observación) × 10^k
• Prevalencia de Punto (P) = (Total de personas enfermas en el punto t / Población total en el punto t) × 100

3. RELACIÓN CLÍNICO-EPIDEMIOLÓGICA:
• Prevalencia ≈ Incidencia × Duración media de la enfermedad (P = I × D).
• Una nueva droga que cura la enfermedad disminuye la prevalencia.
• Un nuevo tratamiento que prolonga la sobrevida sin curar aumenta la prevalencia (ej: terapia antirretroviral en VIH).

4. APLICACIÓN PRÁCTICA EN EL TP:
• Para evaluar el impacto de un factor de riesgo: Utilizar Incidencia (Estudios de Cohorte).
• Para planificar recursos hospitalarios y fármacos crónicos: Utilizar Prevalencia.`
    },
    niveles_prevencion: {
        titulo: "Niveles de Prevención de Leavell & Clark",
        contenido: `📊 ESTRUCTURA TÉCNICA PARA TRABAJO PRÁCTICO:

1. ESQUEMA DE HISTORIA NATURAL DE LA ENFERMEDAD:
• Período Prepatogénico: Interacción entre Huésped, Agente y Medio Ambiente (Tríada Ecológica).
• Período Patogénico: Desde el estímulo inicial, pasando por el horizonte clínico (etapa subclínica), hasta los signos/síntomas y el desenlace (cura, cronicidad, secuela o muerte).

2. NIVELES DE INTERVENCIÓN SANITARIA:
• Prevención Primaria (Período Prepatogénico):
  - Promoción de la salud: Educación sanitaria, saneamiento ambiental, actividad física.
  - Protección específica: Inmunizaciones (vacunas), quimioprofilaxis, fluoración del agua.
• Prevención Secundaria (Período Patogénico inicial):
  - Diagnóstico precoz y Tratamiento oportuno: Tamizajes/Screening masivo (PAP, Mamografía, FODA, Test rápido de VIH, medición de TA).
  - Limitación del daño: Evitar que la patología progrese a secuelas irreversibles.
• Prevención Terciaria (Período Patogénico avanzado):
  - Rehabilitación física, psicológica y reinserción social laboral (ej: terapia post-ACV, kinesiología).
• Prevención Cuaternaria (Moderno):
  - Evitar el sobretratamiento médico, sobrediagnóstico y la iatrogenia farmacológica.`
    },
    aps_alma_ata: {
        titulo: "Atención Primaria de la Salud (Alma-Ata / APS)",
        contenido: `📊 ESTRUCTURA TÉCNICA PARA TRABAJO PRÁCTICO:

1. DECLARACIÓN DE ALMA-ATA (1978):
• Definición: La asistencia sanitaria esencial basada en métodos y tecnologías prácticos, científicamente fundados y socialmente aceptables, puesta al alcance de todos los individuos y familias de la comunidad mediante su plena participación.
• Lema histórico: "Salud para todos en el año 2000".

2. OCHO ELEMENTOS ESENCIALES DE LA APS:
1) Educación sobre los principales problemas de salud y métodos de prevención.
2) Promoción del suministro de alimentos y nutrición adecuada.
3) Abastecimiento de agua potable y saneamiento básico.
4) Asistencia materno-infantil y planificación familiar.
5) Inmunización contra las principales enfermedades infecciosas.
6) Prevención y control de enfermedades endémicas locales.
7) Tratamiento apropiado de las enfermedades y traumatismos comunes.
8) Suministro de medicamentos esenciales.

3. ENFOQUES: APS INTEGRAL VS. SELECTIVA:
• APS Integral: Filosofía de justicia social y derecho universal, transformación de determinantes sociales de la salud.
• APS Selectiva: Paquete focalizado de bajo costo para países en desarrollo (estrategia GOBI-FFF: Crecimiento, Rehidratación oral, Lactancia, Inmunizaciones).`
    },
    transicion_epidemiologica: {
        titulo: "Transición Epidemiológica y Demográfica",
        contenido: `📊 ESTRUCTURA TÉCNICA PARA TRABAJO PRÁCTICO:

1. TRANSICIÓN DEMOGRÁFICA:
• Paso de un régimen demográfico tradicional (alta natalidad y alta mortalidad) a uno moderno (baja natalidad y baja mortalidad).
• Genera el envejecimiento progresivo de la pirámide poblacional (estrechamiento de la base y engrosamiento de la cúspide).

2. TRANSICIÓN EPIDEMIOLÓGICA (Modelo de Omran):
• Desplazamiento del patrón predominante de morbimortalidad:
  - De las enfermedades infectocontagiosas, perinatales y por desnutrición...
  - Hacia las Enfermedades No Transmisibles (ENT) y de causa externa (Cardiovasculares, Cáncer, Diabetes, Traumatismos por tránsito).

3. DESAFÍOS SANITARIOS EN AMÉRICA LATINA:
• "Transición Incompleta o Doble Carga de Enfermedad":
  Convivencia simultánea de enfermedades de la pobreza (Chagas, Dengue, TBC) con patologías crónico-degenerativas propias de países desarrollados.`
    }
};

export const BANCO_CASOS_SHOCK_ROOM = [
    {
        id: "SR-01",
        cama: "BOX 01 · REANIMACIÓN CRÍTICA",
        titulo: "IAMCEST Anteroseptal en Shock Cardiogénico e Hipoperfusión",
        sindrome: "Emergencia Cardiovascular / Shock Cardiogénico",
        edad: "Varón, 58 años",
        ingreso: "Hace 14 minutos (SAME Cód. Rojo)",
        motivoIngreso: "Ingresa trasladado por ambulancia con dolor precordial opresivo desgarrador retroesternal de 2 horas de evolución irradiado a mandíbula y brazo izquierdo, asociado a disnea súbita en reposo, diaforesis fría profusa y palidez mucocutánea intensa.",
        antecedentes: "Hipertensión arterial mal controlada, tabaquista pesado (40 paquetes/año), dislipemia severa sin tratamiento. Niega alergias medicamentosas.",
        signosVitales: {
            fc: 124, fcRitmo: "TAQUICARDIA SINUSAL · ST ELEVADO", fcTrend: "▲ Taquicardia",
            pa: "82/50", tam: "60", paTrend: "TAM: 60 mmHg (Baja)", paStatus: "danger",
            spo2: 90, spo2Trend: "FiO2 21% (Hipoxia)", spo2Status: "warning",
            fr: 28, frTrend: "▲ Taquipnea",
            temp: "36.2", tempTrend: "Afebril",
            glasgow: "13/15", glasgowNota: "AO:3 RV:4 RM:6 (Sopor)",
            ritmoEcg: "st_elevado"
        },
        organos: {
            cerebro: {
                titulo: "Sistema Nervioso Central (SNC)",
                estado: "Deprimido",
                statusClass: "shock-status-badge--warn",
                icon: "🧠",
                hallazgos: "Glasgow 13/15. Paciente somnoliento con tendencia al estupor superficial pero responde a la voz. Pupilas isocóricas reactivas. Sin signos de foco neurológico motor o sensitivo."
            },
            pulmon: {
                titulo: "Aparato Respiratorio / Pulmones",
                estado: "Crítico",
                statusClass: "shock-status-badge--crit",
                icon: "🫁",
                hallazgos: "FR 28 rpm. Tiraje intercostal leve. A la auscultación: rales crepitantes húmedos bilaterales en tercio medio y bases (patrón Killip & Kimball II-III por congestión venocapilar pulmonar aguda)."
            },
            corazon: {
                titulo: "Aparato Cardiovascular",
                estado: "Crítico",
                statusClass: "shock-status-badge--crit",
                icon: "🫀",
                hallazgos: "R1 y R2 taquicárdicos, hipofonéticos. Presencia de R3 (galope ventricular izquierdo). Sin soplos valvulares primarios. Ingurgitación yugular 2/3 con colapso parcial. Pulsos periféricos filiformes y simétricos."
            },
            abdomen: {
                titulo: "Abdomen & Gastrointestinal",
                estado: "Compensado",
                statusClass: "shock-status-badge--norm",
                icon: "🩺",
                hallazgos: "Abdomen blando, depresible, no doloroso a la palpación superficial ni profunda. Ruidos hidroaéreos presentes, normoactivos. Hígado al ras del reborde costal, sin signos de peritonismo."
            },
            renal: {
                titulo: "Renal & Vascular Periférico",
                estado: "Hipoperfusión Grave",
                statusClass: "shock-status-badge--crit",
                icon: "🩸",
                hallazgos: "Diuresis por sonda vesical: 15 mL/h (oligoanuria aguda por bajo gasto). Extremidades frías, acrocianosis distal en lechos ungueales. Relleno capilar enlentecido: 5 segundos. Livideces en rodillas (Mottling 2)."
            }
        },
        organoFocoDefault: "corazon",
        laboratorio: [
            { parametro: "Troponina T Ultrasensible", valor: "2.450 ng/L", ref: "< 14 ng/L", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "CPK-MB masa", valor: "78 ng/mL", ref: "0 - 5 ng/mL", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Ácido Láctico sérico", valor: "4.8 mmol/L", ref: "0.5 - 1.6 mmol/L", alerta: "ALTO ⚠️", flagClass: "shock-lab-flag--crit" },
            { parametro: "Gases Arteriales (pH / PaO2)", valor: "pH 7.28 | PaO2 64 mmHg", ref: "7.35-7.45 | > 80", alerta: "ACIDOSIS ⚠️", flagClass: "shock-lab-flag--crit" },
            { parametro: "Bicarbonato (HCO3)", valor: "16 mEq/L", ref: "22 - 26 mEq/L", alerta: "BAJO ⚠️", flagClass: "shock-lab-flag--warn" },
            { parametro: "Leucocitos", valor: "14.200 /mm³ (78% Neu)", ref: "4.500 - 10.000", alerta: "LEUCOCITOSIS", flagClass: "shock-lab-flag--warn" },
            { parametro: "Hemoglobina / Hto", valor: "14.1 g/dL | 42%", ref: "13.0 - 17.0", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Plaquetas", valor: "220.000 /mm³", ref: "150.000 - 450.000", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Urea / Creatinina", valor: "58 mg/dL | 1.6 mg/dL", ref: "15-45 | 0.7-1.2", alerta: "ELEVADO ⚠️", flagClass: "shock-lab-flag--warn" },
            { parametro: "Glucemia al Azar", valor: "188 mg/dL", ref: "70 - 110 mg/dL", alerta: "HIPERGLUCEMIA", flagClass: "shock-lab-flag--warn" }
        ],
        estudios: {
            radiografia: {
                titulo: "Radiografía de Tórax de Frente (Portátil)",
                hallazgos: "Índice cardiotorácico aumentado (> 0.55, cardiomegalia). Congestión perihiliar bilateral con redistribución de flujo hacia vértices (alas de mariposa incipientes), líneas B de Kerley en bases pulmonares.",
                impresion: "Signos radiológicos de congestión venocapilar pulmonar por Edema Agudo de Pulmón cardiogénico (Killip II-III)."
            },
            tomografia: {
                titulo: "Angio-TC de Tórax & Grandes Vasos",
                hallazgos: "Estudio solicitado para descarte de disección aórtica tipo A vs TEP masivo. Aorta torácica de calibre conservado sin flap intimal de disección ni hematoma intramural. Arterias pulmonares permeables sin defectos de repleción.",
                impresion: "Se descarta disección aórtica aguda y tromboembolismo pulmonar. Compatible con causa miocárdica pura."
            },
            ecg: {
                titulo: "Electrocardiograma 12D de Superficie",
                hallazgos: "Ritmo sinusal a 124 lpm. Eje QRS a 0°. Elevación convexa marcada del segmento ST de 4 a 6 mm en derivaciones precordiales V1, V2, V3 y V4 con ondas T picudas. Infradesnivel especular recíproco en cara inferior (DII, DIII, aVF).",
                impresion: "Infarto Agudo de Miocardio con Elevación del ST (IAMCEST) anteroseptal hiperagudo en shock cardiogénico."
            }
        },
        diagnosticoOficial: "Infarto Agudo de Miocardio con Elevación del ST (IAMCEST) anteroseptal en Shock Cardiogénico (Killip & Kimball IV). Conducta inmediata: Activación inmediata de sala de hemodinamia para Angioplastia Coronaria Primaria (<90 min), doble antiagregación plaquetaria (AAS 300mg + Ticagrelor 180mg), anticoagulación con Heparina no fraccionada, soporte inotrópico y vasopresor con Noradrenalina titulada para PAM ≥ 65 mmHg y Dobutamina, oxigenoterapia por VNI / intubación según mecánica."
    },
    {
        id: "SR-02",
        cama: "BOX 02 · RESUCITACIÓN METABÓLICA",
        titulo: "Cetoacidosis Diabética Severa (CAD) con Shock Hipovolémico y Acidosis Extrema",
        sindrome: "Emergencia Endocrinológica / Acidosis Metabólica Grave",
        edad: "Mujer, 23 años",
        ingreso: "Hace 22 minutos (Guardia Médica)",
        motivoIngreso: "Paciente traída por familiares por vómitos incoercibles de 24 horas de evolución, dolor abdominal difuso severo, polidipsia intensa, respiración muy agitada y rápida, y deterioro progresivo del estado de conciencia con tendencia al coma.",
        antecedentes: "Diabetes Mellitus tipo 1 desde los 12 años tratada con Insulina Glargina y Lispro. Suspensión voluntaria de insulina en las últimas 48 horas por cuadro gastrointestinal intercurrente.",
        signosVitales: {
            fc: 136, fcRitmo: "TAQUICARDIA SINUSAL COMPENSATORIA", fcTrend: "▲ Taquicardia severa",
            pa: "75/45", tam: "55", paTrend: "TAM: 55 mmHg (Shock)", paStatus: "danger",
            spo2: 97, spo2Trend: "Aire ambiente", spo2Status: "normal",
            fr: 34, frTrend: "▲ Kussmaul profunda",
            temp: "37.1", tempTrend: "Normotérmica",
            glasgow: "11/15", glasgowNota: "AO:2 RV:4 RM:5 (Estupor)",
            ritmoEcg: "taquicardia"
        },
        organos: {
            cerebro: {
                titulo: "Sistema Nervioso Central (SNC)",
                estado: "Estupor Metabólico",
                statusClass: "shock-status-badge--crit",
                icon: "🧠",
                hallazgos: "Glasgow 11/15. Somnolienta, responde con palabras confusas al estímulo doloroso. Aliento cetónico característico ('manzanas podridas'). Pupilas intermedias reactivas."
            },
            pulmon: {
                titulo: "Aparato Respiratorio / Pulmones",
                estado: "Respiración de Kussmaul",
                statusClass: "shock-status-badge--crit",
                icon: "🫁",
                hallazgos: "FR 34 rpm. Respiración hiperpneica profunda y rápida (Kussmaul) para compensación respiratoria de acidosis metabólica extrema. Sin ruidos sobreagregados pulmonares."
            },
            corazon: {
                titulo: "Aparato Cardiovascular",
                estado: "Taquicardia por Deshidratación",
                statusClass: "shock-status-badge--warn",
                icon: "🫀",
                hallazgos: "Taquicardia regular a 136 lpm. R1 y R2 taquicárdicos sin soplos. Pulsos periféricos filiformes y débiles. Hipovolemia severa por diuresis osmótica masiva."
            },
            abdomen: {
                titulo: "Abdomen & Gastrointestinal",
                estado: "Dolor Pseudo-quirúrgico",
                statusClass: "shock-status-badge--warn",
                icon: "🩺",
                hallazgos: "Abdomen doloroso en forma difusa a la palpación profunda pero blando, sin defensa peritoneal real (dolor abdominal por cetoacidosis / gastroparesia diabética). Ruidos hidroaéreos disminuidos."
            },
            renal: {
                titulo: "Renal & Estado de Hidratación",
                estado: "Deshidratación Extrema",
                statusClass: "shock-status-badge--crit",
                icon: "🩸",
                hallazgos: "Mucosas orales secas sin saliva. Signo del pliegue positivo persistente. Oliguria severa (10 mL/h). Relleno capilar 4 segundos. Pérdida estimada de fluidos: 6 a 8 litros."
            }
        },
        organoFocoDefault: "renal",
        laboratorio: [
            { parametro: "Glucemia Plasmática", valor: "620 mg/dL", ref: "70 - 110 mg/dL", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "pH Arterial", valor: "6.98", ref: "7.35 - 7.45", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Bicarbonato (HCO3)", valor: "5.2 mEq/L", ref: "22 - 26 mEq/L", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Anion Gap", valor: "28 mEq/L", ref: "8 - 12 mEq/L", alerta: "ALTO ⚠️", flagClass: "shock-lab-flag--crit" },
            { parametro: "Cetonemia / Cetonuria", valor: "++++ (4.8 mmol/L)", ref: "Negativo", alerta: "POSITIVO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Potasio sérico (K+)", valor: "5.8 mEq/L", ref: "3.5 - 5.0 mEq/L", alerta: "ELEVADO*", flagClass: "shock-lab-flag--warn" },
            { parametro: "Sodio sérico medido", valor: "128 mEq/L (Correg: 136)", ref: "135 - 145", alerta: "PSEUDOHIPONATREMIA", flagClass: "shock-lab-flag--warn" },
            { parametro: "Urea / Creatinina", valor: "74 mg/dL | 2.4 mg/dL", ref: "15-45 | 0.7-1.2", alerta: "FALLA PRERRENAL", flagClass: "shock-lab-flag--crit" },
            { parametro: "Leucocitos", valor: "22.000 /mm³", ref: "4.500 - 10.000", alerta: "LEUCOCITOSIS", flagClass: "shock-lab-flag--warn" },
            { parametro: "Ácido Láctico", valor: "3.2 mmol/L", ref: "0.5 - 1.6", alerta: "ELEVADO", flagClass: "shock-lab-flag--warn" }
        ],
        estudios: {
            radiografia: {
                titulo: "Radiografía de Tórax de Frente",
                hallazgos: "Campos pulmonares libres de infiltrados neumónicos. Silueta cardíaca pequeña y alargada ('corazón en gota'), signo radiográfico de deshidratación intravascular severa.",
                impresion: "Sin foco infeccioso pulmonar evidente. Compatible con depleción de volumen extremo."
            },
            tomografia: {
                titulo: "TC de Abdomen y Pelvis",
                hallazgos: "Estudio realizado para descartar pancreatitis aguda o perforación visceral como desencadenante. Sin líquido libre intrabdominal, páncreas de tamaño y densidad conservada.",
                impresion: "Se descarta patología quirúrgica intraabdominal aguda."
            },
            ecg: {
                titulo: "Electrocardiograma de 12 Derivaciones",
                hallazgos: "Taquicardia sinusal a 136 lpm. Ondas T altas y simétricas en precordiales secundarias a hiperpotasemia celular inicial por acidosis severa.",
                impresion: "Taquicardia sinusal con cambios de repolarización por hipercalemia extracelular y acidosis."
            }
        },
        diagnosticoOficial: "Cetoacidosis Diabética Severa (CAD) con Shock Hipovolémico y Acidosis Metabólica Extrema (pH < 7.00, Anion Gap aumentado). Conducta inmediata: 1) Hidratación parenteral masiva agresiva con Solución Fisiológica al 0.9% (1.000-1.500 mL en la primera hora). 2) NO administrar insulina hasta asegurar potasio sérico > 3.3 mEq/L. 3) Iniciar bomba de Insulina Corriente IV continua a 0.1 UI/kg/h cuando comience la expansión. 4) Reposición precoz de Cloruro de Potasio (el potasio corporal total está severamente depletado a pesar del valor sérico). 5) Monitoreo horario de glucemia capilar y medio interno en UTI."
    },
    {
        id: "SR-03",
        cama: "BOX 03 · UNIDAD CARDIOVASCULAR",
        titulo: "Tromboembolismo Pulmonar Masivo (TEP) con Cor Pulmonale Agudo y Shock Obstructivo",
        sindrome: "Emergencia Vascular / Shock Obstructivo",
        edad: "Mujer, 61 años",
        ingreso: "Hace 10 minutos (SAME Cód. Rojo)",
        motivoIngreso: "Paciente que ingresa en colapso hemodinámico tras presentar disnea súbita extrema en reposo, dolor pleurítico retroesternal agudo, síncope presenciado en su domicilio y sensación inminente de muerte.",
        antecedentes: "Reemplazo total de cadera derecha hace 12 días con reposo prolongado en cama y profilaxis antitrombótica suspendida precozmente. Obesidad grado II.",
        signosVitales: {
            fc: 130, fcRitmo: "TAQUICARDIA SINUSAL · PATRÓN S1Q3T3", fcTrend: "▲ Taquicardia severa",
            pa: "80/52", tam: "61", paTrend: "TAM: 61 mmHg (Shock)", paStatus: "danger",
            spo2: 84, spo2Trend: "FiO2 50% (Hipoxemia severa)", spo2Status: "danger",
            fr: 32, frTrend: "▲ Taquipnea severa",
            temp: "36.8", tempTrend: "Afebril",
            glasgow: "14/15", glasgowNota: "AO:4 RV:4 RM:6 (Angustia)",
            ritmoEcg: "tep"
        },
        organos: {
            cerebro: {
                titulo: "Sistema Nervioso Central (SNC)",
                estado: "Ansiedad & Hipoxia",
                statusClass: "shock-status-badge--warn",
                icon: "🧠",
                hallazgos: "Glasgow 14/15. Paciente sumamente inquieta, taquipsíquica, con intensa sensación inminente de asfixia y muerte. Sin déficit focal."
            },
            pulmon: {
                titulo: "Aparato Respiratorio / Pulmones",
                estado: "Hipoxemia Refractaria",
                statusClass: "shock-status-badge--crit",
                icon: "🫁",
                hallazgos: "FR 32 rpm. Pulmones limpios a la auscultación sin ruidos agregados a pesar de saturación de 84% con máscara con reservorio: clásica disociación clínico-auscultatoria del TEP."
            },
            corazon: {
                titulo: "Aparato Cardiovascular",
                estado: "Falla Ventricular Derecha",
                statusClass: "shock-status-badge--crit",
                icon: "🫀",
                hallazgos: "Latido paraesternal izquierdo palpable (signo de Dressler). R2 pulmonar marcadamente hiperfonético. Soplo holosistólico tricuspídeo. Ingurgitación yugular 3/3 sin colapso inspiratorio."
            },
            abdomen: {
                titulo: "Abdomen & Reflujo",
                estado: "Congestión Hepática",
                statusClass: "shock-status-badge--warn",
                icon: "🩺",
                hallazgos: "Abdomen blando. Hepatomegalia palpable dolorosa a 3 cm del reborde costal con reflujo hepatoyugular francamente positivo."
            },
            renal: {
                titulo: "Miembros Inferiores & Vascular",
                estado: "TVP Asimétrica",
                statusClass: "shock-status-badge--crit",
                icon: "🩸",
                hallazgos: "Miembro inferior derecho con aumento de diámetro de 4 cm respecto al contralateral, calor local, edema duro con signo de Godet y dolor intenso a la dorsiflexión (Signo de Homans positivo)."
            }
        },
        organoFocoDefault: "corazon",
        laboratorio: [
            { parametro: "Dímero D Ultrasensible", valor: "8.450 ng/mL", ref: "< 500 ng/mL", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Troponina I", valor: "0.85 ng/mL", ref: "< 0.04 ng/mL", alerta: "INJURIA VD 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "BNP (Péptido Natriurético)", valor: "980 pg/mL", ref: "< 100 pg/mL", alerta: "ALTO ⚠️", flagClass: "shock-lab-flag--crit" },
            { parametro: "Gases Arteriales (PaO2)", valor: "PaO2 52 mmHg (FiO2 50%)", ref: "> 80 mmHg", alerta: "HIPOXEMIA GRAVE", flagClass: "shock-lab-flag--crit" },
            { parametro: "PaCO2 / pH", valor: "PaCO2 26 mmHg | pH 7.48", ref: "35-45 | 7.35-7.45", alerta: "ALCALOSIS RESP", flagClass: "shock-lab-flag--warn" },
            { parametro: "Ácido Láctico", valor: "3.9 mmol/L", ref: "0.5 - 1.6", alerta: "ALTO ⚠️", flagClass: "shock-lab-flag--warn" },
            { parametro: "Plaquetas", valor: "195.000 /mm³", ref: "150.000 - 450.000", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Hemoglobina / Hto", valor: "13.4 g/dL | 40%", ref: "12 - 16", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Creatinina sérica", valor: "1.4 mg/dL", ref: "0.6 - 1.1", alerta: "ELEVADO", flagClass: "shock-lab-flag--warn" },
            { parametro: "Coagulograma (TP / Quick)", valor: "TP 13.5s | Quick 82%", ref: "70 - 120%", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" }
        ],
        estudios: {
            radiografia: {
                titulo: "Radiografía de Tórax (Portátil)",
                hallazgos: "Oligohemia focal en campo medio derecho (signo de Westermark) y opacidad cuneiforme de base pleural en campo inferior derecho (Joroba de Hampton). Agrandamiento del tronco de la arteria pulmonar.",
                impresion: "Signos radiológicos altamente sugestivos de embolia e infarto pulmonar."
            },
            tomografia: {
                titulo: "Angio-TC de Tórax Protocolo TEP",
                hallazgos: "Defecto de repleción intraluminal masivo que cabalga sobre la bifurcación del tronco de la arteria pulmonar ('émbolo en silla de montar') extendiéndose a ambas arterias lobares con oclusión casi total del lecho vascular derecho.",
                impresion: "Tromboembolismo Pulmonar Masivo Bilateral con sobrecarga y dilatación aguda de cavidades derechas (relación VD/VI > 1.3)."
            },
            ecg: {
                titulo: "Electrocardiograma de 12 Derivaciones",
                hallazgos: "Taquicardia sinusal a 130 lpm. Presencia del clásico patrón de McGinn-White (S1Q3T3: onda S profunda en DI, onda Q patológica en DIII e inversión de onda T en DIII). Bloqueo incompleto de rama derecha e inversión de T en V1-V4.",
                impresion: "Sobrecarga sistólica y dilatación ventricular derecha aguda (Cor Pulmonale)."
            }
        },
        diagnosticoOficial: "Tromboembolismo Pulmonar Masivo de Alto Riesgo Hemodinámico con Shock Obstructivo y Falla Ventricular Derecha Aguda. Conducta inmediata: 1) Trombólisis sistémica de emergencia con rtPA (Alteplasa 100 mg en infusión continua de 2 horas o Tenecteplasa bolo). 2) Soporte hemodinámico con Noradrenalina titulada precozmente. 3) Oxigenoterapia con alto flujo. 4) Anticoagulación parenteral de rescate con Heparina no fraccionada en bolo e infusión continua. 5) Si hay contraindicación absoluta para fibrinolíticos: embolectomía quirúrgica o por catéter percutáneo de urgencia."
    },
    {
        id: "SR-04",
        cama: "BOX 04 · AISLAMIENTO / SEPSIS",
        titulo: "Shock Séptico Refractario de Foco Abdominal (Peritonitis Perforativa)",
        sindrome: "Emergencia Infecciosa / Shock Séptico Sepsis-3",
        edad: "Varón, 71 años",
        ingreso: "Hace 18 minutos (Shock Room)",
        motivoIngreso: "Ingresa en camilla con deterioro agudo del estado general, fiebre de 39.4°C seguida de hipotermia y escalofríos, distensión y dolor abdominal intolerable generalizado en las últimas 12 horas, náuseas y anuria.",
        antecedentes: "Enfermedad diverticular crónica del colon, hipertensión arterial y diabetes tipo 2. Uso frecuente de AINEs por lumbalgia.",
        signosVitales: {
            fc: 138, fcRitmo: "TAQUICARDIA SINUSAL HIPERDINÁMICA", fcTrend: "▲ Taquicardia extrema",
            pa: "78/40", tam: "52", paTrend: "TAM: 52 mmHg (Shock Séptico)", paStatus: "danger",
            spo2: 92, spo2Trend: "FiO2 35%", spo2Status: "warning",
            fr: 30, frTrend: "▲ Taquipnea",
            temp: "39.4", tempTrend: "Fiebre alta (SIRS)",
            glasgow: "12/15", glasgowNota: "AO:3 RV:4 RM:5 (Confuso)",
            ritmoEcg: "taquicardia"
        },
        organos: {
            cerebro: {
                titulo: "Sistema Nervioso Central (SNC)",
                estado: "Encefalopatía Séptica",
                statusClass: "shock-status-badge--crit",
                icon: "🧠",
                hallazgos: "Glasgow 12/15. Desorientado en tiempo y espacio, respuesta lenta a órdenes simples. Encefalopatía asociada a sepsis por hipoperfusión cerebral y tormenta de citoquinas."
            },
            pulmon: {
                titulo: "Aparato Respiratorio / Pulmones",
                estado: "Compensación & Distress",
                statusClass: "shock-status-badge--warn",
                icon: "🫁",
                hallazgos: "FR 30 rpm. Tiraje subcostal. Murmullo vesicular disminuido en bases por hipomovilidad diafragmática refleja al dolor peritoneal. Sin consolidación focal."
            },
            corazon: {
                titulo: "Aparato Cardiovascular",
                estado: "Shock Vasopléjico",
                statusClass: "shock-status-badge--crit",
                icon: "🫀",
                hallazgos: "Vasoplejía severa con PAM < 65 mmHg a pesar de infusión de 2.000 mL de solución fisiológica. Ruidos cardíacos taquicárdicos, galope ausente."
            },
            abdomen: {
                titulo: "Abdomen & Peritonitis",
                estado: "Abdomen en Tabla",
                statusClass: "shock-status-badge--crit",
                icon: "🩺",
                hallazgos: "Vientre en tabla con contractura muscular involuntaria generalizada. Dolor exquisito a la descompresión brusca en los 4 cuadrantes (Signo de Blumberg francamente positivo bilateral). Silencio abdominal completo (íleo paralítico)."
            },
            renal: {
                titulo: "Renal & Microcirculación",
                estado: "Falla Multiorgánica",
                statusClass: "shock-status-badge--crit",
                icon: "🩸",
                hallazgos: "Anuria completa en las últimas 2 horas (< 5 mL/h). Livideces reticulares en rodillas (Mottling score 3). Tiempo de relleno capilar 6 segundos. Falla multiorgánica aguda."
            }
        },
        organoFocoDefault: "abdomen",
        laboratorio: [
            { parametro: "Ácido Láctico sérico", valor: "6.2 mmol/L", ref: "0.5 - 1.6 mmol/L", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Procalcitonina", valor: "45 ng/mL", ref: "< 0.5 ng/mL", alerta: "SEPSIS GRAVE 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Leucocitos totales", valor: "24.500 /mm³ (22% cayados)", ref: "4.500 - 10.000", alerta: "DESVIACIÓN IZQ 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Plaquetas", valor: "72.000 /mm³", ref: "150.000 - 450.000", alerta: "TROMBOCITOPENIA", flagClass: "shock-lab-flag--crit" },
            { parametro: "Gases Arteriales (pH / HCO3)", valor: "pH 7.16 | HCO3 12 mEq/L", ref: "7.35-7.45 | 22-26", alerta: "ACIDOSIS MET 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "Creatinina sérica", valor: "3.4 mg/dL", ref: "0.7 - 1.2", alerta: "FALLA RENAL AGUDA", flagClass: "shock-lab-flag--crit" },
            { parametro: "Bilirrubina Total", valor: "3.1 mg/dL", ref: "< 1.2 mg/dL", alerta: "DISFUNCIÓN HEPÁTICA", flagClass: "shock-lab-flag--warn" },
            { parametro: "Coagulograma (Quick)", valor: "Quick 48% | KPTT 54s", ref: "70-120% | 25-38s", alerta: "COAGULOPATÍA", flagClass: "shock-lab-flag--warn" },
            { parametro: "Glucemia", valor: "165 mg/dL", ref: "70 - 110 mg/dL", alerta: "ESTRÉS SÉPTICO", flagClass: "shock-lab-flag--warn" },
            { parametro: "Score SOFA Calculado", valor: "14 Puntos", ref: "< 2 Puntos", alerta: "MORTALIDAD >50%", flagClass: "shock-lab-flag--crit" }
        ],
        estudios: {
            radiografia: {
                titulo: "Radiografía de Tórax y Abdomen de Pie",
                hallazgos: "Presencia de aire libre subdiafragmático en semiluna bajo ambos hemidiafragmas ('Signo de Popper' / neumoperitoneo evidente). Borramiento de las líneas del psoas.",
                impresion: "Neumoperitoneo masivo secundario a perforación de víscera hueca intraabdominal."
            },
            tomografia: {
                titulo: "TC de Abdomen y Pelvis con Contraste",
                hallazgos: "Neumoperitoneo masivo y abundante líquido libre denso en espacio subhepático, goteras paracólicas y pelvis menor (peritonitis fecal / purulenta). Engrosamiento y defecto focal de la pared en colon sigmoideo compatible con diverticulitis perforada Hinchey IV.",
                impresion: "Perforación diverticular sigmoidea con peritonitis fecal generalizada y shock séptico."
            },
            ecg: {
                titulo: "Electrocardiograma de 12 Derivaciones",
                hallazgos: "Taquicardia sinusal regular a 138 lpm sin signos de isquemia coronaria primaria.",
                impresion: "Taquicardia sinusal en respuesta a shock distributivo y tormenta inflamatoria sistémica."
            }
        },
        diagnosticoOficial: "Shock Séptico Refractario con Falla Multiorgánica secundario a Peritonitis Fecal por Perforación Diverticular Sigmoidea (Hinchey IV). Conducta inmediata: 1) Resucitación con cristaloides balanceados (30 mL/kg) y soporte vasopresor de 1° línea con Noradrenalina titulada precozmente para PAM ≥ 65 mmHg. 2) Segunda línea: Vasopresina 0.03 UI/min + Hidrocortisona 200 mg/día. 3) Toma de hemocultivos x 2 e inicio de antibióticos empíricos de amplio espectro dentro de la 'hora de oro' (Meropenem 1 g c/8h + Vancomicina 15-20 mg/kg). 4) Pase urgente a quirófano para laparotomía exploradora y control del foco (Operación de Hartmann)."
    },
    {
        id: "SR-05",
        cama: "BOX 05 · TRAUMA SHOCK",
        titulo: "Neumotórax Hipertensivo a Tensión con Shock Obstructivo Post-Traumático",
        sindrome: "Emergencia de Trauma / Shock Obstructivo",
        edad: "Varón, 32 años",
        ingreso: "Hace 8 minutos (Trauma Cód. Rojo)",
        motivoIngreso: "Paciente traído de urgencia tras colisión vehicular moto-auto con traumatismo torácico cerrado de alta energía. Ingresa en fallo ventilatorio extremo, con asfixia inminente, hipotensión profunda y cianosis central progresiva.",
        antecedentes: "Joven previamente sano. Sin antecedentes de relevancia ni cirugías previas.",
        signosVitales: {
            fc: 142, fcRitmo: "TAQUICARDIA SINUSAL EXTREMA", fcTrend: "▲ Taquicardia extrema",
            pa: "70/40", tam: "50", paTrend: "TAM: 50 mmHg (Colapso)", paStatus: "danger",
            spo2: 78, spo2Trend: "FiO2 100% (Asfixia)", spo2Status: "danger",
            fr: 36, frTrend: "▲ Disnea agónica",
            temp: "36.4", tempTrend: "Normotérmico",
            glasgow: "13/15", glasgowNota: "AO:3 RV:4 RM:6 (Agitado)",
            ritmoEcg: "taquicardia"
        },
        organos: {
            cerebro: {
                titulo: "Sistema Nervioso Central (SNC)",
                estado: "Agitación Hipóxica",
                statusClass: "shock-status-badge--crit",
                icon: "🧠",
                hallazgos: "Glasgow 13/15. Agitación psicomotriz extrema secundaria a hipoxemia crítica y narcosis por retención de CO2. Pupilas reactivas."
            },
            pulmon: {
                titulo: "Aparato Respiratorio / Pulmones",
                estado: "Neumotórax a Tensión",
                statusClass: "shock-status-badge--crit",
                icon: "🫁",
                hallazgos: "Hemitórax derecho inmóvil, hiperexpansivo. Abolición total del murmullo vesicular en todo el campo pulmonar derecho. Timpanismo metálico resonante a la percusión. Desviación traqueal visible hacia la izquierda."
            },
            corazon: {
                titulo: "Aparato Cardiovascular",
                estado: "Colapso de Retorno Venoso",
                statusClass: "shock-status-badge--crit",
                icon: "🫀",
                hallazgos: "Ruidos cardíacos muy apagados y alejados. Ingurgitación yugular masiva bilateral por compresión y colapso de la vena cava superior e inferior. Pulsos filiformes imperceptibles."
            },
            abdomen: {
                titulo: "Abdomen & Pelvis",
                estado: "FAST Negativo",
                statusClass: "shock-status-badge--norm",
                icon: "🩺",
                hallazgos: "Abdomen blando, sin defensa. Ecografía FAST en shock room descarta líquido libre intraabdominal y taponamiento cardíaco (espacio pericárdico libre)."
            },
            renal: {
                titulo: "Piel & Miembros",
                estado: "Cianosis Central",
                statusClass: "shock-status-badge--crit",
                icon: "🩸",
                hallazgos: "Cianosis central peribucal y acrocianosis generalizada. Piel sudorosa y fría. Enfisema subcutáneo palpable en base de cuello y hemitórax derecho."
            }
        },
        organoFocoDefault: "pulmon",
        laboratorio: [
            { parametro: "Gases Arteriales (pH)", valor: "pH 7.15", ref: "7.35 - 7.45", alerta: "CRÍTICO 🚨", flagClass: "shock-lab-flag--crit" },
            { parametro: "PaO2 (Gasometría)", valor: "48 mmHg (con O2)", ref: "> 80 mmHg", alerta: "HIPOXEMIA GRAVE", flagClass: "shock-lab-flag--crit" },
            { parametro: "PaCO2 (Gasometría)", valor: "62 mmHg", ref: "35 - 45 mmHg", alerta: "HIPERCAPNIA SEVERA", flagClass: "shock-lab-flag--crit" },
            { parametro: "Ácido Láctico", valor: "4.2 mmol/L", ref: "0.5 - 1.6", alerta: "ALTO ⚠️", flagClass: "shock-lab-flag--crit" },
            { parametro: "Hemoglobina / Hto", valor: "13.8 g/dL | 41%", ref: "13.0 - 17.0", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Plaquetas", valor: "240.000 /mm³", ref: "150.000 - 450.000", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Leucocitos", valor: "11.200 /mm³", ref: "4.500 - 10.000", alerta: "LEVE AUMENTO", flagClass: "shock-lab-flag--norm" },
            { parametro: "Coagulograma (Quick)", valor: "Quick 88%", ref: "70 - 120%", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Urea / Creatinina", valor: "38 mg/dL | 1.0 mg/dL", ref: "15-45 | 0.7-1.2", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Glucemia", valor: "142 mg/dL", ref: "70 - 110 mg/dL", alerta: "LEVE AUMENTO", flagClass: "shock-lab-flag--warn" }
        ],
        estudios: {
            radiografia: {
                titulo: "Radiografía de Tórax Portátil en Camilla",
                hallazgos: "Colapso completo del muñón pulmonar derecho hacia el hilio. Ausencia total de trama vascular en todo el hemitórax derecho con hiperclaridad. Aplanamiento e inversión del hemidiafragma derecho y desviación contralateral masiva del mediastino y corazón hacia la izquierda.",
                impresion: "Neumotórax Hipertensivo Derecho con colapso vascular y mediastínico."
            },
            tomografia: {
                titulo: "TC Multislice de Tórax",
                hallazgos: "ESTUDIO CONTRAINDICADO FORMALMENTE: el paciente se encuentra inestable en shock; el diagnóstico de neumotórax hipertensivo es estrictamente clínico y requiere descompresión inmediata sin demoras.",
                impresion: "Conducta de oro: no trasladar a tomografía con sospecha clínica de neumotórax hipertensivo."
            },
            ecg: {
                titulo: "Electrocardiograma de 12 Derivaciones",
                hallazgos: "Taquicardia sinusal a 142 lpm con bajo voltaje generalizado secundario a desplazamiento mediastínico y pérdida de retorno venoso.",
                impresion: "Taquicardia sinusal extrema con bajo gasto."
            }
        },
        diagnosticoOficial: "Neumotórax Hipertensivo / a Tensión Derecho con Shock Obstructivo y Colapso Cardiorrespiratorio Post-traumático. Conducta inmediata: 1) DESCOMPRESIÓN INMEDIATA CON AGUJA GRUESA (Cánula 14G) en el 2° espacio intercostal línea medioclavicular (o 5° espacio intercostal línea axilar anterior) del lado derecho para transformar el neumotórax a tensión en un neumotórax simple normotensivo. 2) Colocación reglada inmediata de Tubo de Drenaje Pleural (28-32 Fr) con trampa de agua bajo sello hermético. 3) Oxigenoterapia con alto flujo / intubación según estado hemodinámico post-descompresión."
    },
    {
        id: "SR-06",
        cama: "BOX 06 · UNIDAD DE STROKE",
        titulo: "ACV Isquémico Agudo en Ventana con Déficit Motor Hemisférico Severo",
        sindrome: "Emergencia Neurológica / Stroke en Ventana",
        edad: "Mujer, 68 años",
        ingreso: "Hace 16 minutos (Código Ictus)",
        motivoIngreso: "Paciente traída de urgencia tras presentar inicio brusco de hemiplejía fascio-braquio-crural izquierda, parálisis facial central, afasia de comprensión/disartria severa y desviación conjugada de la mirada. Tiempo exacto de inicio: 75 minutos antes de la admisión.",
        antecedentes: "Fibrilación auricular crónica anticoagulada de forma errática con acenocumarol. Hipertensión arterial.",
        signosVitales: {
            fc: 88, fcRitmo: "FIBRILACIÓN AURICULAR IRREGULAR", fcTrend: "Ritmo irregular",
            pa: "195/105", tam: "135", paTrend: "TAM: 135 mmHg (HTA reactiva)", paStatus: "warning",
            spo2: 96, spo2Trend: "Aire ambiente", spo2Status: "normal",
            fr: 18, frTrend: "Eupneica",
            temp: "36.7", tempTrend: "Normotérmica",
            glasgow: "12/15", glasgowNota: "AO:4 RV:3 RM:5 (Afasia/Déficit)",
            ritmoEcg: "fibrilacion"
        },
        organos: {
            cerebro: {
                titulo: "Sistema Nervioso Central (SNC)",
                estado: "Déficit Hemisférico Severo",
                statusClass: "shock-status-badge--crit",
                icon: "🧠",
                hallazgos: "Hemiplejía izquierda fláccida grado 0/5. Parálisis facial central izquierda. Desviación conjugada de ojos hacia la derecha ('mira hacia su lesión cerebral'). Heminegligencia y anosognosia. Escala NIHSS: 18 puntos (Stroke severo)."
            },
            pulmon: {
                titulo: "Aparato Respiratorio / Pulmones",
                estado: "Sin Compromiso",
                statusClass: "shock-status-badge--norm",
                icon: "🫁",
                hallazgos: "FR 18 rpm. Vía aérea permeable con reflejo deglutorio presente. Murmullo vesicular conservado bilateralmente sin ruidos adventicios."
            },
            corazon: {
                titulo: "Aparato Cardiovascular",
                estado: "Fibrilación Auricular",
                statusClass: "shock-status-badge--warn",
                icon: "🫀",
                hallazgos: "R1 variable, ruidos cardíacos arrítmicos compatibles con fibrilación auricular. Sin soplos cardíacos. Pulsos irregulares y asincrónicos."
            },
            abdomen: {
                titulo: "Abdomen & Renal",
                estado: "Normal",
                statusClass: "shock-status-badge--norm",
                icon: "🩺",
                hallazgos: "Abdomen blando e indoloro. Sin visceromegalias. Ruidos hidroaéreos normales."
            },
            renal: {
                titulo: "Vascular Periférico",
                estado: "Compensado",
                statusClass: "shock-status-badge--norm",
                icon: "🩸",
                hallazgos: "Extremidades normoperfundidas. Relleno capilar 2 segundos. Pulsos periféricos femorales y tibiales presentes pero irregulares."
            }
        },
        organoFocoDefault: "cerebro",
        laboratorio: [
            { parametro: "Glucemia Capilar", valor: "108 mg/dL", ref: "70 - 110 mg/dL", alerta: "DESCARTA HIPOGLUC", flagClass: "shock-lab-flag--norm" },
            { parametro: "RIN / INR", valor: "1.1 (Infraterapéutico)", ref: "2.0 - 3.0", alerta: "HABILITA RTPA ✅", flagClass: "shock-lab-flag--norm" },
            { parametro: "Plaquetas", valor: "235.000 /mm³", ref: "150.000 - 450.000", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "KPTT / TP", valor: "32s | Quick 85%", ref: "Normal", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Hemoglobina / Hto", valor: "13.2 g/dL | 39%", ref: "12.0 - 16.0", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Leucocitos", valor: "7.800 /mm³", ref: "4.500 - 10.000", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Creatinina / Urea", valor: "0.9 mg/dL | 32 mg/dL", ref: "Normal", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Troponina Ultrasensible", valor: "< 10 ng/L", ref: "< 14 ng/L", alerta: "NEGATIVO", flagClass: "shock-lab-flag--norm" },
            { parametro: "Ionograma (Na / K)", valor: "Na 140 | K 4.1 mEq/L", ref: "Normal", alerta: "NORMAL", flagClass: "shock-lab-flag--norm" },
            { parametro: "Escala NIHSS de Stroke", valor: "18 Puntos", ref: "0 Puntos", alerta: "STROKE SEVERO 🚨", flagClass: "shock-lab-flag--crit" }
        ],
        estudios: {
            radiografia: {
                titulo: "Radiografía de Tórax de Frente",
                hallazgos: "Silueta cardíaca moderadamente agrandada con dilatación de la aurícula izquierda compatible con su antecedente de fibrilación auricular. Parénquima pulmonar sin infiltrados.",
                impresion: "Cardiomegalia leve a expensas de cavidades izquierdas."
            },
            tomografia: {
                titulo: "TC de Encéfalo sin Contraste de Urgencia",
                hallazgos: "Ausencia de hemorragia intracerebral (se descarta ACV hemorrágico). Signo de la arteria cerebral media derecha hiperdensa ('signo de la cuerda' por trombo intraluminal agudo). Borramiento incipiente de la diferenciación sustancia gris-blanca en ínsula derecha. Escala ASPECTS: 8 puntos.",
                impresion: "ACV Isquémico Agudo extenso de arteria cerebral media derecha en ventana terapéutica."
            },
            ecg: {
                titulo: "Electrocardiograma de 12 Derivaciones",
                hallazgos: "Fibrilación auricular con respuesta ventricular controlada a 88 lpm. Ausencia completa de ondas P, línea de base con ondulaciones fibrilatorias 'f' finas, intervalos R-R absolutamente irregulares.",
                impresion: "Fibrilación Auricular (fuente cardioembólica del stroke)."
            }
        },
        diagnosticoOficial: "Accidente Cerebrovascular Isquémico Agudo (ACV) Cardioembólico de Territorio de la Arteria Cerebral Media Derecha (NIHSS 18) en Ventana Terapéutica (< 4.5 horas). Conducta inmediata: 1) Control de presión arterial para trombolisis (objetivo < 185/110 mmHg con Labetalol 10-20 mg IV en bolo). 2) Iniciar Trombolisis Intravenosa con rtPA (Alteplasa 0.9 mg/kg, 10% en bolo inicial de 1 minuto y 90% restante en infusión de 60 minutos). 3) Activación urgente del equipo de Neurointervencionismo para Trombectomía Mecánica endovascular inmediata de rescate (oclusión de gran vaso M1 en ventana extendida). 4) Ingreso a Unidad de Cuidados Críticos de Stroke."
    }
];

export const BANCO_CASOS_INTERNA_AVANZADOS = [
    // 🫀 CARDIOLOGÍA
    {
        id: "HC-49210",
        cama: "Cama 14 · UCO",
        edad: "Varón, 64 años",
        ingreso: "Guardia de Emergencias",
        sistema: "cardio",
        dificultad: 2,
        enfermedadActual: "Paciente que consulta por disnea progresiva de 72 horas de evolución que se intensificó en las últimas 6 horas hasta clase funcional IV/IV (ortopnea y disnea paroxística nocturna), acompañada de tos con expectoración asalmonada, frialdad distal y sudoración profusa.",
        antecedentes: "Hipertensión arterial de 15 años de diagnóstico (tratada irregularmente con Enalapril 10mg/día). Diabetes Mellitus tipo 2 (Metformina 850mg c/12h). Tabaquista de 30 paquetes/año. No refiere alergias conocidas.",
        examenFisico: [
            "PA: 175/105 mmHg | FC: 118 lpm regular",
            "FR: 28 rpm con tiraje intercostal | SpO2: 88% aire ambiente",
            "Aparato Respiratorio: Rales crepitantes húmedos bilaterales hasta campos medios (patrón en marea ascendente). Sibilancias espiratorias aisladas.",
            "Aparato Cardiovascular: R1 y R2 taquicárdicos, R3 galope audible en ápex. Ingurgitación yugular 2/3 con reflujo hepatoyugular positivo."
        ],
        laboratorio: [
            { c1: "Hemograma: Hb 13.8 g/dL, Leucocitos 11.200 /mm³", c2: "Glucemia: 184 mg/dL" },
            { c1: "Urea: 64 mg/dL | Creatinina: 1.6 mg/dL", c2: "Ionograma: Na 137, K 4.9 mEq/L" },
            { c1: "Biomarcadores: Troponina I: 0.08 ng/mL (ligeramente elevada)", c2: "NT-proBNP: 6.850 pg/mL" },
            { c1: "ECG: Taquicardia sinusal, HVI (Sokolow-Lyon 38mm), sobrecarga sistólica anterior sin ST elevado.", c2: "" }
        ],
        preguntas: [
            "¿Cuál es el mecanismo fisiopatológico primario desencadenante y el perfil hemodinámico de Stevenson?",
            "Planteá los 2 diagnósticos diferenciales más importantes y los criterios clínicos utilizados.",
            "¿Cuál es la conducta terapéutica inmediata en los primeros 15 minutos y qué fármacos están contraindicados de entrada?"
        ],
        discusion: `<strong>1. Diagnóstico Principal & Fisiopatología:</strong> Edema Agudo de Pulmón (EAP) cardiogénico hipertensivo. Perfil B de Stevenson (<em>Caliente y Húmedo</em>). La crisis hipertensiva eleva abruptamente la poscarga ventricular izquierda, transmitiendo presiones retrógradas a los capilares pulmonares (> 25 mmHg) que superan la presión oncótica plasmática, produciendo trasudado alveolar masivo.<br>
<strong>2. Diagnósticos Diferenciales:</strong> <em>TEP Agudo:</em> Ausencia de hipotensión o signos de fallo de VD aislado. <em>Crisis asmática / EPOC:</em> Descartados por ritmo de galope R3, NT-proBNP marcadamente elevado y esputo asalmonado.<br>
<strong>3. Conducta Terapéutica Inmediata:</strong> VMNI (CPAP 8-10 cmH2O) + Nitroglicerina IV en infusión continua (10-20 mcg/min iniciales para vasodilatación arterial) + Furosemida 40-80 mg IV. <em>Contraindicaciones inmediatas:</em> Betabloqueantes en fase congestiva descompensada y morfina de rutina.`
    },
    {
        id: "HC-48102",
        cama: "Cama 02 · Shock Room UCO",
        edad: "Varón, 59 años",
        ingreso: "Código Infarto",
        sistema: "cardio",
        dificultad: 3,
        enfermedadActual: "Ingresa con dolor precordial opresivo retroesternal de intensidad 10/10 de 3 horas de evolución irradiado a mandíbula y brazo izquierdo, acompañado de palidez terrosa, sudoración fría profusa, oliguria y somnolencia progresiva.",
        antecedentes: "Dislipemia severa sin tratamiento, tabaquista actual de 40 paq/año, sedentarismo y antecedentes familiares de muerte súbita paterna a los 52 años.",
        examenFisico: [
            "PA: 75/45 mmHg (Hipotensión severa / Shock) | FC: 122 lpm taquicárdico filiforme",
            "FR: 30 rpm | SpO2: 89% con máscara simple | Relleno capilar: 5 segundos",
            "Cardiovascular: Soplo holosistólico nuevo grado IV/VI en ápex irradiado a axila (sospecha de insuficiencia mitral aguda por rotura de músculo papilar). R3 audible.",
            "Respiratorio: Rales crepitantes bibasales difusos hasta vértices. Frialdad cadavérica en miembros inferiores."
        ],
        laboratorio: [
            { c1: "Troponina I ultrasensible: 18.400 ng/L (Positiva masiva)", c2: "Ácido Láctico: 4.8 mmol/L (Hiperlactatemia severa)" },
            { c1: "Urea: 82 mg/dL | Creatinina: 2.3 mg/dL", c2: "Gases arteriales: pH 7.24, HCO3 14 mEq/L, EB -11" },
            { c1: "ECG: Supradesnivel del segmento ST de 4 mm de V1 a V6 con ondas Q incipientes.", c2: "Ecocardiograma rápido: FEVI 25%, aquinesia anteroapical, insuficiencia mitral masiva." }
        ],
        preguntas: [
            "¿Cuál es la clasificación hemodinámica de Forrester y Stevenson para este cuadro de shock?",
            "¿Cuál es la estrategia de reperfusión de emergencia y soporte hemodinámico de elección?",
            "¿Por qué los nitratos y diuréticos en bolo están contraindicados con esta presión arterial?"
        ],
        discusion: `<strong>1. Diagnóstico & Hemodinamia:</strong> Shock Cardiogénico secundario a IAM con elevación del ST (IAMCEST) anterior extenso complicado con insuficiencia mitral aguda. Perfil C de Stevenson (<em>Frío y Húmedo</em>) / Forrester IV (Índice Cardíaco < 2.2 L/min/m² y PCP > 18 mmHg). Hipoperfusión tisular crítica con acidosis láctica.<br>
<strong>2. Conducta Inmediata:</strong> Coronariografía y angioplastia primaria urgente (< 90 min) de la arteria descendente anterior. Asistencia ventilatoria invasiva temprana (IOT) y soporte inotrópico/vasopresor con <strong>Noradrenalina</strong> (para mantener PAM ≥ 65 mmHg) + <strong>Dobutamina</strong> o asistencia circulatoria mecánica (Balón de Contrapulsación Intraaórtico - BCIA / Impella) antes de la resolución quirúrgica del músculo papilar.<br>
<strong>3. Fármacos Prohibidos:</strong> Nitroglicerina y Furosemida IV agravan el colapso hemodinámico letal al reducir la precarga en un ventrículo dependiente de volumen de llenado.`
    },
    {
        id: "HC-47319",
        cama: "Cama 18 · Sala Coronaria",
        edad: "Mujer, 67 años",
        ingreso: "Derivación por Guardia",
        sistema: "cardio",
        dificultad: 1,
        enfermedadActual: "Cuadro de 2 semanas de evolución caracterizado por episodios repetidos de opresión precordial desencadenados a esfuerzos cada vez menores (caminar una cuadra), que en las últimas 24 horas se presentó en reposo con duración de 25 minutos y alivió parcialmente con reposo.",
        antecedentes: "Diabetes Mellitus tipo 2 tratada con Linagliptina 5mg/día. Hipertensión arterial tratada con Losartán 50mg/día. Sobrepeso (IMC 29.4).",
        examenFisico: [
            "PA: 135/85 mmHg | FC: 78 lpm regular",
            "FR: 16 rpm | SpO2: 98% aire ambiente | Afebril",
            "Aparato Cardiovascular: R1 y R2 normofonéticos, sin soplos ni galope R3. Pulsos periféricos simétricos.",
            "Aparato Respiratorio: Buena entrada de aire bilateral, sin ruidos agregados."
        ],
        laboratorio: [
            { c1: "Hemograma: Hb 12.4 g/dL, Plaquetas 240.000 /mm³", c2: "Glucemia: 142 mg/dL | HbA1c: 7.6%" },
            { c1: "Troponina ultrasensible T: 38 pg/mL (Curva plana seriada a las 0h y 3h)", c2: "Lipidograma: Colesterol Total 240 mg/dL, LDL 162 mg/dL" },
            { c1: "ECG: Ritmo sinusal, infradesnivel del ST de 1.5 mm en cara lateral (V5-V6, DI y aVL) que normaliza tras dolor.", c2: "" }
        ],
        preguntas: [
            "Estratificá el riesgo isquémico según Score GRACE o TIMI.",
            "¿Cuál es la doble antiagregación y esquema antitrombótico indicado?",
            "¿En qué ventana temporal se debe indicar la cinecoronariografía invasiva?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Síndrome Coronario Agudo sin elevación del ST (SCASEST) / Angina Inestable de alto riesgo con cambios dinámicos del ECG.<br>
<strong>2. Esquema Terapéutico:</strong> Doble antiagregación plaquetaria con Aspirina 100-300 mg de carga + Clopidogrel 300-600 mg (o Ticagrelor 180 mg) + Anticoagulación parenteral con Enoxaparina 1 mg/kg SC cada 12 horas + Atorvastatina 80 mg/día + Betabloqueante (Bisoprolol 2.5-5 mg) si no hay contraindicaciones.<br>
<strong>3. Estrategia Invasiva:</strong> Cinecoronariografía invasiva precoz (< 24 horas) por presentar criterios de alto riesgo (cambios dinámicos del ST y angina de reposo prolongada).`
    },

    // 🫁 NEUMONOLOGÍA
    {
        id: "HC-60293",
        cama: "Cama 21 · Sala General",
        edad: "Varón, 68 años",
        ingreso: "Derivación Ambulatoria",
        sistema: "neumo",
        dificultad: 1,
        enfermedadActual: "Paciente con tos productiva con expectoración mucopurulenta y herrumbrosa de 5 días de evolución, dolor pleurítico en puntada de costado derecho y picos febriles de hasta 39°C acompañados de chuchos de frío intensos.",
        antecedentes: "EPOC estadio GOLD B con uso de Salmeterol/Fluticasona. Ex-fumador (40 paq/año). Vacunación antigripal al día, neumococo no refiere.",
        examenFisico: [
            "PA: 120/75 mmHg | FC: 96 lpm | Temp: 38.6 °C",
            "FR: 24 rpm | SpO2: 91% aire ambiente (previa habitual 94%)",
            "Examen Respiratorio: Matidez a la percusión en base derecha, aumento de vibraciones vocales, soplo tubario y crepitantes teleinspiratorios localizados en lóbulo inferior derecho."
        ],
        laboratorio: [
            { c1: "Leucocitos: 16.400 /mm³ (84% neutrófilos, 6% en cayado)", c2: "Eritrosedimentación: 78 mm/h | PCR: 145 mg/L" },
            { c1: "Urea: 34 mg/dL | Creatinina: 0.9 mg/dL", c2: "Rx de Tórax: Opacidad alveolar homogénea con broncograma aéreo en lóbulo inferior derecho" }
        ],
        preguntas: [
            "Definí el síndrome semiológico respiratorio presente y el score de estratificación de riesgo CURB-65 / CRB-65.",
            "¿Cuál es el agente etiológico más probable y cuál el esquema antibiótico empírico de elección ambulatorio vs internación?",
            "¿Qué criterios clínicos definen la falla de tratamiento inicial a las 48-72 horas?"
        ],
        discusion: `<strong>1. Síndrome & Estratificación:</strong> Síndrome de condensación pulmonar consolidativo con broncograma aéreo. Score CURB-65: Confusión (0), Urea > 42 mg/dL (0), FR ≥ 30 (0), PA baja (0), Edad ≥ 65 (1 punto: riesgo intermedio, internación en sala general aconsejada por comorbilidad EPOC).<br>
<strong>2. Etiología y Tratamiento:</strong> <em>Streptococcus pneumoniae</em> (Neumococo). Tratamiento de 1° línea internación en piso: Ampicilina/Sulbactam 1.5g c/6h IV + Claritromicina 500mg c/12h VO/IV, o Ceftriaxona 1-2g/día + Macrólido.<br>
<strong>3. Criterios de Falla:</strong> Persistencia de fiebre > 72h sin descenso de leucocitosis/PCR, progresión radiológica > 50% o deterioro hemodinámico (sospechar empiema pleural, resistencia bacteriana o sobreinfección hospitalaria).`
    },
    {
        id: "HC-61405",
        cama: "Cama 09 · Cuidados Intermedios",
        edad: "Mujer, 45 años",
        ingreso: "Guardia Central",
        sistema: "neumo",
        dificultad: 2,
        enfermedadActual: "Mujer que consulta por disnea súbita de 12 horas de evolución que inició tras levantarse de la cama, dolor torácico pleurítico retroesternal de tipo opresivo, palpitaciones taquicárdicas y dos episodios de hemoptisis en esputo fresco.",
        antecedentes: "Fractura de fémur izquierdo hace 3 semanas inmovilizada con yeso cruropédico. Usuaria de anticonceptivos orales combinados (etinilestradiol/levonorgestrel). Tabaquista de 15 cigarrillos/día.",
        examenFisico: [
            "PA: 105/65 mmHg (normotensa en reposo) | FC: 114 lpm taquicardia sinusal",
            "FR: 30 rpm taquipneica | SpO2: 89% aire ambiente corregida a 94% con cánula nasal",
            "Miembro inferior izquierdo: Edema asimétrico de pantorrilla con dolor a la compresión (signo de Homans positivo) y empastamiento gemelar.",
            "Cardiopulmonar: R2 reforzado en foco pulmonar, sin estertores francos. Rx de tórax: Signo de Westermark (oligohemia regional) sin condensación alveolar."
        ],
        laboratorio: [
            { c1: "Dímero D (ELISA): 4.850 ng/mL (Positivo marcadamente elevado)", c2: "Troponina I: 0.12 ng/mL (Elevación de biomarcador miocárdico)" },
            { c1: "NT-proBNP: 1.450 pg/mL (Sobrecarga de cavidades derechas)", c2: "Gases arteriales: Hipoxemia (PaO2 58 mmHg) e hipocapnia (PaCO2 29 mmHg) con alcalosis respiratoria" },
            { c1: "ECG: Patrón S1Q3T3 (McGinn-White), T invertidas de V1 a V4.", c2: "Angio-TC de Tórax: Defecto de repleción bilateral en ramas principales de arterias pulmonares." }
        ],
        preguntas: [
            "Calculá la probabilidad pre-test según el Score de Wells / Ginebra y estratificá el riesgo según PESI.",
            "¿Cuál es la diferencia de conducta entre un TEP de Riesgo Intermedio-Alto vs TEP Masivo de Alto Riesgo?",
            "¿Cuál es el esquema de anticoagulación inicial de elección y cuándo se indica trombólisis sistémica?"
        ],
        discusion: `<strong>1. Diagnóstico & Estratificación:</strong> Tromboembolismo Pulmonar (TEP) submasivo de <strong>Riesgo Intermedio-Alto</strong> (Score de Wells > 6 puntos: alta probabilidad. Paciente normotensa pero con disfunción de VD por ecografía/angio-TC y biomarcadores positivos: Troponina y NT-proBNP elevados).<br>
<strong>2. Conducta Terapéutica:</strong> Anticoagulación inmediata con Heparina de Bajo Peso Molecular (Enoxaparina 1 mg/kg SC c/12h) o Anticoagulantes Orales Directos (DOAC: Apixabán o Rivaroxabán a dosis de carga). Monitorización estricta en unidad de cuidados intensivos/intermedios.<br>
<strong>3. Rol de la Trombólisis:</strong> La trombólisis sistémica con rtPA (Alteplasa 100 mg en 2h) NO está indicada de entrada en este estadio, sino que se mantiene en reserva de rescate inmediato si la paciente evoluciona a descompensación hemodinámica con hipotensión persistente (PAS < 90 mmHg o shock obstructivo).`
    },
    {
        id: "HC-62910",
        cama: "Cama 04 · Terapia Intensiva",
        edad: "Varón, 52 años",
        ingreso: "UTI Pediátrica/Adultos",
        sistema: "neumo",
        dificultad: 3,
        enfermedadActual: "Paciente internado por neumonía bilateral viral grave que al 4° día presenta taquipnea extrema, aleteo nasal, cianosis periférica refractaria a oxigenoterapia de alto flujo (PAFI en caída abrupta) y colapso respiratorio inminente.",
        antecedentes: "Obesidad mórbida (IMC 41), hipertensión arterial y síndrome de apnea-hipopnea obstructiva del sueño (SAHOS).",
        examenFisico: [
            "PA: 130/80 mmHg | FC: 128 lpm | Temp: 38.8 °C",
            "FR: 38 rpm con uso de musculatura accesoria | SpO2: 81% con máscara de reservorio al 100%",
            "Aparato Respiratorio: Crepitantes secos y húmedos bilaterales difusos en velcro.",
            "Rx y TC de Tórax: Infiltrados alveolo-intersticiales bilaterales extensos en 'vidrio esmerilado' y consolidaciones dependientes con derrame pleural mínimo."
        ],
        laboratorio: [
            { c1: "Gases Arteriales (con FiO2 1.0): PaO2 62 mmHg", c2: "Relación PaFi (PaO2/FiO2): 62 (SDRA Severo < 100)" },
            { c1: "pH: 7.22 | PaCO2: 58 mmHg | HCO3: 23 mEq/L", c2: "Ferritina: 2.100 ng/mL | Dímero D: 6.200 ng/mL" },
            { c1: "Presión capilar pulmonar (PCP estimada por eco): 12 mmHg (No cardiogénico)", c2: "FEVI: 60% conservada sin valvulopatías significativas" }
        ],
        preguntas: [
            "¿Cuáles son los 4 criterios diagnósticos de Berlín para definir SDRA?",
            "¿Cuáles son los pilares de la ventilación mecánica protectora (volumen corriente y presión meseta)?",
            "¿Cuándo se indica la posición prona y cuál es su beneficio fisiológico sobre el reclutamiento alveolar?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Síndrome de Distrés Respiratorio Agudo (SDRA) grave (Criterios de Berlín: tiempo agudo < 7 días, opacidades radiológicas bilaterales no explicadas por falla cardíaca o sobrecarga de volumen, y PaFi < 100 con PEEP ≥ 5 cmH2O).<br>
<strong>2. Ventilación Mecánica Protectora:</strong> IOT inmediata. Volumen corriente (Vt) bajo a <strong>4-6 mL/kg de peso predicho</strong> (evita volutrauma), Presión meseta (Plateau) ≤ 30 cmH2O (evita barotrauma), y Presión de distensión (Driving Pressure) < 15 cmH2O con PEEP alta titulada.<br>
<strong>3. Posición Prona:</strong> Indicada obligatoriamente en SDRA con PaFi < 150 durante al menos 16 horas continuas por día. Mejora la relación ventilación/perfusión (V/Q), homogeneiza el gradiente de presión pleural dorsal y reduce el estrés mecánico ventilatorio.`
    },

    // 🧪 GASTROENTEROLOGÍA
    {
        id: "HC-70112",
        cama: "Cama 11 · Sala de Agudos",
        edad: "Varón, 55 años",
        ingreso: "Guardia Médica",
        sistema: "gastro",
        dificultad: 1,
        enfermedadActual: "Paciente que consulta por dos episodios de hematemesis abundante en 'borra de café' y tres deposiciones melénicas fétidas, pastosas y negras como el alquitrán en las últimas 12 horas, acompañadas de mareos ortostáticos.",
        antecedentes: "Consumo crónico de Diclofenac 75mg c/12h por lumbociatalgia en las últimas 3 semanas sin protector gástrico. No refiere consumo de alcohol ni antecedentes hepáticos conocidos.",
        examenFisico: [
            "PA acostado: 110/70 mmHg -> De pie: 90/55 mmHg (Ortostatismo positivo) | FC: 108 lpm",
            "FR: 18 rpm | SpO2: 97% | Palidez mucocutánea moderada con sudoración fría.",
            "Abdomen: Blando, depresible, dolor leve en epigastrio a la palpación profunda sin signos de peritonismo ni ascitis.",
            "Tacto Rectal: Dedal de guante con restos francos de melena fétida."
        ],
        laboratorio: [
            { c1: "Hematocrito: 26% | Hemoglobina: 8.5 g/dL (previa 14.2 g/dL)", c2: "Plaquetas: 210.000 /mm³ | TP / RIN: 1.1 normal" },
            { c1: "Urea: 78 mg/dL (Azoemia prerrenal por digestión de sangre)", c2: "Creatinina: 1.0 mg/dL" },
            { c1: "Score de Glasgow-Blatchford: 9 puntos (Alto riesgo de intervención endoscópica)", c2: "" }
        ],
        preguntas: [
            "¿Cuál es la conducta inicial de resucitación hemodinámica y qué soluciones se deben infundir?",
            "¿Cuál es el tratamiento farmacológico con IBP previo a la endoscopía digestiva alta?",
            "Clasificá los hallazgos de úlcera según la escala de Forrest y la necesidad de hemostasia endoscópica."
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Hemorragia Digestiva Alta (HDA) no variceal secundaria a úlcera gastroduodenal péptica inducida por AINEs.<br>
<strong>2. Resucitación Inmediata:</strong> Colocación de 2 accesos venosos periféricos de grueso calibre (14-16G), infusión rápida de cristaloides (Solución Fisiológica o Ringer Lactato) para restaurar volumen intravascular. Transfusión de glóbulos rojos guiada por umbral restrictivo (Hb < 7 g/dL o < 8 g/dL si comorbilidad cardiovascular).<br>
<strong>3. Farmacología & Endoscopía:</strong> Omeprazol o Pantoprazol IV en bolo de 80 mg seguido de infusión continua a 8 mg/h (o 40 mg c/12h). Endoscopía Digestiva Alta (VEDA) dentro de las 24 horas. Lesiones Forrest Ia (chorro), Ib (napa) y IIa (vaso visible) requieren tratamiento endoscópico combinado dual (inyección de adrenalina + método térmico o clips).`
    },
    {
        id: "HC-71580",
        cama: "Cama 08 · Terapia Intermedia",
        edad: "Mujer, 48 años",
        ingreso: "Guardia de Emergencias",
        sistema: "gastro",
        dificultad: 2,
        enfermedadActual: "Mujer que consulta por dolor abdominal de inicio brusco e intensidad intolerable (10/10) localizado en epigastrio con irradiación 'en cinturón' hacia ambos hipocondrios y dorso, acompañado de vómitos alimentarios y biliosos incoercibles y distensión abdominal tras ingesta copiosa de comida rica en grasas.",
        antecedentes: "Colelitiasis vesicular sintomática conocida de 2 años de diagnóstico (postergó colecistectomía programada). No consume alcohol.",
        examenFisico: [
            "PA: 100/60 mmHg | FC: 115 lpm taquicárdica | Temp: 38.1 °C",
            "FR: 26 rpm | SpO2: 93% aire ambiente | Ictericia leve escleral.",
            "Abdomen: RHA disminuidos, distensión marcada, dolor intenso en hemiabdomen superior con defensa voluntaria pero sin signo de Blumberg franco.",
            "Signos cutáneos: Ausencia de signo de Cullen o Turner en este momento."
        ],
        laboratorio: [
            { c1: "Amilasa sérica: 1.840 U/L (VN: < 100) | Lipasa sérica: 2.450 U/L (VN: < 60)", c2: "Leucocitos: 18.200 /mm³ con 80% neutrófilos" },
            { c1: "Bilirrubina Total: 3.4 mg/dL (Directa: 2.6 mg/dL)", c2: "Fosfatasa Alcalina: 420 U/L | TGO: 380, TGP: 410 U/L" },
            { c1: "Calcio sérico: 7.8 mg/dL (Hipocalcemia)", c2: "Hematocrito: 46% (Hemoconcentración por secuestro a 3° espacio)" }
        ],
        preguntas: [
            "Confirmá los criterios diagnósticos de Pancreatitis Aguda de Atlanta y etiología.",
            "¿Cuál es el esquema de hidratación parenteral guiada por metas en las primeras 24 horas?",
            "¿Está indicada la antibioticoterapia profiláctica y cuándo se solicita la TC contrastada?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Pancreatitis Aguda litiásica moderadamente grave a grave (cumple los 3 criterios de Atlanta: dolor típico en cinturón, amilasa/lipasa > 3 veces el límite superior normal y colestasis con elevación de transaminasas compatible con pasaje litiásico por colédoco).<br>
<strong>2. Hidratación Guiada por Metas:</strong> Resucitación con <strong>Ringer Lactato</strong> a 200-250 mL/h (o 5-10 mL/kg/h en las primeras 12h) evaluando respuesta: hematocrito < 40%, diuresis > 0.5 mL/kg/h y urea en descenso. Evitar sobrehidratación nociva.<br>
<strong>3. Errores Comunes de Guía:</strong> Los antibióticos profilácticos están CONTRAINDICADOS; no reducen necrosis infectada ni mortalidad. La TC abdominal contrastada NO se realiza en las primeras 48h (subestima necrosis) y debe solicitarse a las 72-96h si hay persistencia de fallo orgánico.`
    },
    {
        id: "HC-72904",
        cama: "Cama 05 · Terapia Intensiva",
        edad: "Varón, 61 años",
        ingreso: "Guardia Central",
        sistema: "gastro",
        dificultad: 3,
        enfermedadActual: "Paciente con cirrosis hepática conocida traído por familiares por desorientación temporoespacial, inversión del ritmo del sueño (somnolencia diurna y agitación nocturna), flapping tremor positivo, distensión abdominal masiva a tensión y fiebre de 38.4°C en las últimas 24 horas.",
        antecedentes: "Cirrosis de etiología enólica (Child-Pugh B previo). Episodios de ascitis tratados con Espironolactona 100mg y Furosemida 40mg. Suspendió medicación hace 1 semana.",
        examenFisico: [
            "PA: 95/55 mmHg | FC: 104 lpm | Temp: 38.4 °C | SpO2: 95%",
            "Sensorio: Estuporoso, desorientado, asterixis (flapping) franca (Encefalopatía Hepática grado III según West Haven).",
            "Inspección: Estigmas cirróticos (telangiectasias aracniformes en tórax, eritema palmar, ginecomastia, circulación colateral porto-cava).",
            "Abdomen: Muy globuloso por ascitis a tensión, onda ascítica positiva, dolor difuso con leve defensa a la descompresión."
        ],
        laboratorio: [
            { c1: "Punción del Líquido Ascítico: Aspecto turbio", c2: "Recuento celular: 850 leucocitos /mm³, 620 PMN /mm³ (73%)" },
            { c1: "Gradiente de Albúmina Suero-Ascitis (GASA): 1.8 g/dL", c2: "Urea: 74 mg/dL | Creatinina: 1.8 mg/dL (Injuria Renal Aguda asociada)" },
            { c1: "Bilirrubina: 4.8 mg/dL | Albúmina: 2.3 g/dL", c2: "RIN: 2.1 | Sodio sérico: 128 mEq/L (Hiponatremia dilucional)" }
        ],
        preguntas: [
            "Confirmá el diagnóstico del líquido ascítico y el criterio cardinal de Peritonitis Bacteriana Espontánea (PBE).",
            "¿Cuál es el esquema antibiótico de elección y la indicación estricta de albúmina humana para prevenir el síndrome hepatorrenal?",
            "¿Cómo se maneja la Encefalopatía Hepática desencadenada por la infección?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Cirrosis hepática descompensada con <strong>Peritonitis Bacteriana Espontánea (PBE)</strong> (confirmada por > 250 polimorfonucleares/mm³ en líquido ascítico) complicada con Encefalopatía Hepática grado III y Síndrome Hepatorrenal incipiente.<br>
<strong>2. Tratamiento de PBE & Albúmina:</strong> <strong>Ceftriaxona 2 g/día IV</strong> durante 5 a 7 días. Indicación obligatoria de <strong>Albúmina Humana IV</strong>: 1.5 g/kg en las primeras 6 horas y 1 g/kg al día 3 (reduce la incidencia de síndrome hepatorrenal del 30% al 10% y disminuye la mortalidad drásticamente).<br>
<strong>3. Manejo de la Encefalopatía:</strong> Tratar el factor desencadenante (PBE). Lactulosa por sonda nasogástrica (20-30 mL c/4-6h) buscando 2-3 deposiciones blandas por día para atrapar amonio entérico + Rifaximina 550 mg c/12h. Evitar sedantes y corregir hipopotasemia.`
    },

    // 💧 NEFROLOGÍA E IONES
    {
        id: "HC-51084",
        cama: "Cama 07 · Terapia Intensiva",
        edad: "Mujer, 23 años",
        ingreso: "Shock Room",
        sistema: "nefro",
        dificultad: 3,
        enfermedadActual: "Ingresa traída por familiares por deterioro progresivo del sensorio (estuporosa), respiración ruidosa profunda (patrón de Kussmaul), aliento cetónico marcado, dolor abdominal difuso tipo cólico y vómitos incoercibles de 24 horas de evolución.",
        antecedentes: "Diabetes Mellitus tipo 1 diagnosticada a los 14 años. Suspendió esquema de insulina Glargina y Lispro hace 48 horas tras cuadro febril y disuria no tratada.",
        examenFisico: [
            "PA: 85/50 mmHg (hipotensión severa) | FC: 130 lpm regular",
            "FR: 34 rpm (Kussmaul) | Temp: 38.3 °C | SpO2: 96% aire ambiente",
            "Piel y mucosas: Sequedad extrema de mucosas, signo del pliegue positivo, frialdad periférica.",
            "Abdomen: Doloroso a la palpación difusa sin defensa franca ni peritonismo (abdomen agudo metabólico)."
        ],
        laboratorio: [
            { c1: "Glucemia: 540 mg/dL | Cetonemia: 4.8 mmol/L", c2: "Estado Ácido-Base: pH 7.08, pCO2 18 mmHg" },
            { c1: "HCO3: 6 mEq/L | EB: -24 mEq/L", c2: "Anion Gap: 26 mEq/L (Severamente elevado)" },
            { c1: "Ionograma: Na 130 mEq/L, K 5.8 mEq/L", c2: "Urea: 88 mg/dL | Creatinina: 2.1 mg/dL" },
            { c1: "Orina completa: Cetonuria ++++, Glucosuria ++++", c2: "Sedimento: Leucocitos abundantes, piocitos" }
        ],
        preguntas: [
            "Calculá el Sodio Corregido por glucemia y analizá por qué el potasio sérico está falsamente elevado pese al déficit corporal total.",
            "¿Cuál es la secuencia rigurosa del tratamiento de rescate: cuándo se inicia la insulina y cuál es el criterio estricto respecto al potasio?",
            "¿Cuándo se considera resuelta la Cetoacidosis y se realiza la transición a insulina subcutánea?"
        ],
        discusion: `<strong>1. Fisiopatología & Na/K:</strong> Na corregido = 130 + 1.6 × ((540 - 100)/100) = 137 mEq/L. La hiperpotasemia aparente es un artefacto de redistribución por acidemia severa (salida de K+ celular por intercambio H+/K+) y falta de acción de insulina sobre la Na+/K+ ATPasa, aun cuando el paciente tiene un déficit masivo de K+ corporal por diuresis osmótica.<br>
<strong>2. Secuencia Terapéutica Cardinal:</strong> 1° Expansión agresiva con Cristaloides (Solución Fisiológica 0.9% 1000-1500 mL en la primera hora). 2° Si K+ > 5.3 mEq/L: iniciar Insulina corriente IV continua a 0.1 U/kg/h. Si K+ < 3.3 mEq/L: ¡PROHIBIDO iniciar insulina hasta reponer potasio (riesgo de paro cardíaco por hipopotasemia súbita)!<br>
<strong>3. Criterios de Resolución:</strong> Glucemia < 200 mg/dL, HCO3 ≥ 18 mEq/L, pH venoso > 7.30 y Anion Gap normalizado (≤ 12). La insulina basal SC se administra 2 horas ANTES de suspender la infusión continua.`
    },
    {
        id: "HC-52410",
        cama: "Cama 16 · Sala General",
        edad: "Varón, 73 años",
        ingreso: "Guardia Central",
        sistema: "nefro",
        dificultad: 1,
        enfermedadActual: "Paciente traído por astenia intensa, somnolencia y marcada oliguria (diuresis de 200 mL en las últimas 24 horas) tras cuadro de gastroenteritis aguda febril con abundantes deposiciones diarreicas acuosas y escasa ingesta de líquidos durante 4 días.",
        antecedentes: "Hipertensión arterial tratada con Enalapril 20mg e Hidroclorotiazida 25mg. Artrosis tratada con Meloxicam 15mg. Función renal basal previa normal (Creatinina 0.9 mg/dL).",
        examenFisico: [
            "PA: 90/60 mmHg (Hipotensión con ortostatismo) | FC: 102 lpm",
            "FR: 18 rpm | SpO2: 97% | Afebril",
            "Examen Clínico: Lengua tostada y seca, ojos hundidos, turgencia cutánea marcadamente disminuida, ausencia de edemas en miembros inferiores.",
            "Yugulares: Colapsadas en decúbito dorsal a 0°."
        ],
        laboratorio: [
            { c1: "Urea plasmática: 182 mg/dL | Creatinina plasmática: 3.4 mg/dL", c2: "Relación Urea/Creatinina: > 50 (Patrón prerrenal marcado)" },
            { c1: "Ionograma plasmático: Na 142 mEq/L, K 5.2 mEq/L", c2: "Sodio urinario (NaU): 12 mEq/L (< 20 mEq/L)" },
            { c1: "Fracción Excretada de Sodio (FeNa): 0.4% (< 1%)", c2: "Sedimento urinario: Cilindros hialinos transparentes sin cilindros granulosos pardos." }
        ],
        preguntas: [
            "Diferenciá los índices urinarios de Injuria Renal Aguda Prerrenal vs Necrosis Tubular Aguda (NTA).",
            "¿Cuál es el rol deletéreo de los fármacos que recibía el paciente (IECA + Diurético + AINE)?",
            "¿Cuál es la prueba terapéutica inicial para confirmar el origen prerrenal?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Injuria Renal Aguda (IRA) funcional o prerrenal por hipovolemia severa (estadio KDIGO 3). Confirmado por FeNa < 1%, Sodio urinario < 20 mEq/L, relación Urea/Creatinina > 40 y sedimento urinario acelular (cilindros hialinos).<br>
<strong>2. El Fenómeno 'Triple Whammy':</strong> El diurético produjo depleción de volumen; el AINE bloqueó las prostaglandinas impidiendo la vasodilatación de la arteriola aferente; el IECA bloqueó la angiotensina II impidiendo la vasoconstricción de la arteriola eferente. Como resultado, colapsó por completo la presión hidrostática intraglomerular.<br>
<strong>3. Conducta Terapéutica:</strong> Suspensión inmediata de IECA, diurético y AINE. Expansión rápida con Solución Fisiológica isotónica (1000-2000 mL en 2-4h). Si la causa es prerrenal pura, la diuresis debe recuperarse prontamente y la creatinina descender un 50% en 24-48 horas.`
    },
    {
        id: "HC-53891",
        cama: "Cama 23 · Nefrología",
        edad: "Varón, 34 años",
        ingreso: "Consultorios Externos",
        sistema: "nefro",
        dificultad: 2,
        enfermedadActual: "Paciente que consulta por edema progresivo de 3 semanas de evolución que comenzó en párpados al despertar y progresó a ambos miembros inferiores con fóvea ++++/4 hasta raíces de muslos, escroto y pared abdominal (anasarca), con orina espumosa y aumento de 9 kg de peso.",
        antecedentes: "Sin antecedentes patológicos previos de relevancia. No consume medicación habitual.",
        examenFisico: [
            "PA: 125/80 mmHg | FC: 72 lpm regular | Temp: 36.6 °C",
            "FR: 16 rpm | SpO2: 98% aire ambiente",
            "Edemas: Anasarca marcado con signo de la fóvea profundo hasta abdomen. Matidez en bases pulmonares compatible con derrame pleural bilateral leve.",
            "Cardiovascular: R1 y R2 normales, sin signos de falla de bomba."
        ],
        laboratorio: [
            { c1: "Proteinuria en orina de 24 horas: 8.4 g/día (VN: < 0.15 g)", c2: "Albúmina sérica: 1.8 g/dL (Hipoalbuminemia severa)" },
            { c1: "Proteínas Totales: 4.1 g/dL | Creatinina: 0.9 mg/dL", c2: "Colesterol Total: 420 mg/dL | Triglicéridos: 380 mg/dL" },
            { c1: "Sedimento Urinario: Gotas de grasa birrefringentes ('cruces de Malta'), cilindros grasos.", c2: "Serologías: VHB, VHC, VIH y ANA/anti-ADN negativos." }
        ],
        preguntas: [
            "Definí la tétrada clásica del Síndrome Nefrótico primario.",
            "¿Cuáles son las etiologías histopatológicas más frecuentes en el adulto joven y qué estudio confirma el diagnóstico?",
            "¿Por qué este paciente tiene alto riesgo protrombótico y qué complicación vascular debe sospecharse ante dolor lumbar súbito?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Síndrome Nefrótico puro en rango masivo (Tétrada: Proteinuria > 3.5 g/24h, Hipoalbuminemia < 3.0 g/dL, Edemas generalizados y Dislipemia severa con lipiduria).<br>
<strong>2. Etiología & Confirmación:</strong> En un adulto joven las causas primarias más frecuentes son Glomerulopatía Membranosa o Glomeruloesclerosis Focal y Segmentaria. La indicación indiscutible es la <strong>Punción Biopsia Renal (PBR)</strong> percutánea ecoguiada para microscopía óptica, inmunofluorescencia y electrónica.<br>
<strong>3. Estado Protrombótico:</strong> La pérdida urinaria masiva de antitrombina III, proteínas C y S sumada al aumento hepático de fibrinógeno genera riesgo extremo de tromboembolismo. Ante dolor lumbar súbito, hematuria y deterioro de función renal se debe sospechar de inmediato <strong>Trombosis de la Vena Renal</strong>.`
    },

    // 🧠 NEUROLOGÍA CLÍNICA
    {
        id: "HC-80120",
        cama: "Cama 12 · Neurología Guardia",
        edad: "Varón, 66 años",
        ingreso: "Guardia Central",
        sistema: "neuro",
        dificultad: 1,
        enfermedadActual: "Paciente que mientras desayunaba presentó episodio súbito de dificultad para emitir palabras (afasia motora de Broca) y pérdida transitoria de visión en el ojo izquierdo como una 'cortina negra que desciende' (amaurosis fugax), con debilidad en mano derecha que duró 25 minutos y recuperó ad integrum.",
        antecedentes: "Hipertensión arterial mal controlada, tabaquismo activo de 30 paquetes/año y dislipemia.",
        examenFisico: [
            "PA: 160/90 mmHg | FC: 80 lpm regular",
            "Examen Neurológico actual: Vigil, lúcido, lenguaje fluido y comprensivo, fuerza 5/5 en los 4 miembros, pares craneales normales. NIHSS actual: 0 puntos.",
            "Cuello: Soplo carotídeo sistólico audible en región submandibular izquierda."
        ],
        laboratorio: [
            { c1: "Glucemia: 110 mg/dL | Hemograma: Normal", c2: "TC de Encéfalo sin contraste: Sin signos de sangrado ni lesiones isquémicas agudas" },
            { c1: "Score ABCD2: 6 puntos (Edad 1, PA 1, Clínica 2, Duración 2) -> Alto Riesgo de ACV", c2: "Eco-Doppler de Vasos de Cuello: Placa ateromatosa ulcerada con estenosis del 75% en carótida interna izquierda." }
        ],
        preguntas: [
            "Definí el cuadro clínico y el significado de la amaurosis fugax en el territorio carotídeo.",
            "¿Cuál es el valor del Score ABCD2 y por qué el paciente debe internarse obligatoriamente?",
            "¿Cuál es el esquema de antiagregación dual de rescate precoz (CHANCE/POINT) y la conducta quirúrgica indicada?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Accidente Isquémico Transitorio (AIT) de territorio carotídeo izquierdo (sistema anterior) con amaurosis fugax ipsilateral por émbolo a la arteria oftálmica.<br>
<strong>2. Score ABCD2 & Riesgo:</strong> Con 6 puntos presenta un riesgo del 18% de sufrir un ACV isquémico discapacitante en las siguientes 48 horas. La internación en unidad de ACV / monitoreo es mandataria para estudio urgente y prevención secundaria.<br>
<strong>3. Tratamiento Inmediato:</strong> Doble antiagregación plaquetaria con Aspirina 100 mg + Clopidogrel (carga 300 mg y luego 75 mg/día) durante 21 días (ensayos CHANCE y POINT) + Atorvastatina 80 mg/día. Evaluación urgente por cirugía vascular para <strong>Endarterectomía carotídea</strong> dentro de las primeras 2 semanas por estenosis sintomática > 70%.`
    },
    {
        id: "HC-81349",
        cama: "Cama 01 · Unidad de ACV (Stroke)",
        edad: "Mujer, 72 años",
        ingreso: "Código ACV Guardia",
        sistema: "neuro",
        dificultad: 2,
        enfermedadActual: "Paciente que hace exactamente 1 hora y 45 minutos presentó de forma brusca caída de la comisura labial derecha, imposibilidad para hablar (afasia global) y parálisis completa del brazo y pierna derechos (hemiplejía fascio-braquio-crural derecha). La familia activó inmediatamente el sistema de emergencias.",
        antecedentes: "Fibrilación auricular no valvular diagnosticada hace 6 meses (había suspendido la anticoagulación por temor a hematomas hace 15 días).",
        examenFisico: [
            "PA: 165/95 mmHg | FC: 112 lpm arrítmico irregular (FA) | Temp: 36.7 °C",
            "FR: 18 rpm | SpO2: 97% aire ambiente | Glucemia capilar rápida: 128 mg/dL",
            "Neurológico: Despierta, no comprende órdenes ni emite lenguaje verbal. Desviación de la mirada conjugada hacia la izquierda. Parálisis facial central derecha, plejía 0/5 en miembro superior y 1/5 en inferior derecho. Hemihipoestesia derecha franca. NIHSS: 17 puntos."
        ],
        laboratorio: [
            { c1: "TC de Encéfalo sin contraste inmediata: Ausencia de hemorragia intracraneana.", c2: "Score ASPECTS: 9/10 (Signo de la arteria cerebral media izquierda hiperdensa precoz)" },
            { c1: "Plaquetas: 220.000 /mm³ | KPTT: 31 seg | TP / RIN: 1.15", c2: "Angio-TC de Vasos Intracraneales: Oclusión proximal del segmento M1 de arteria cerebral media izquierda." }
        ],
        preguntas: [
            "¿La paciente se encuentra dentro de la ventana terapéutica para trombólisis endovenosa con rtPA / Tenecteplasa?",
            "¿Cuáles son los límites de presión arterial para poder administrar el fibrinolítico de manera segura?",
            "¿Cuál es el siguiente paso terapéutico neurointervencionista endovascular si persiste ocluida la arteria M1?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Accidente Cerebrovascular (ACV) Isquémico agudo cardioembólico de territorio de arteria cerebral media izquierda en <strong>ventana terapéutica</strong> (1h 45m de evolución, ventana estándar ≤ 4.5 horas).<br>
<strong>2. Trombólisis Endovenosa:</strong> rtPA (Alteplasa 0.9 mg/kg IV, 10% en bolo y el resto en 60 min) o Tenecteplasa 0.25 mg/kg IV. La PA actual (165/95 mmHg) es apta (el límite estricto es < 185/110 mmHg antes del inicio y < 180/105 mmHg durante las siguientes 24 horas).<br>
<strong>3. Trombectomía Mecánica:</strong> Al confirmarse oclusión de gran vaso proximal (M1) en angio-TC y NIHSS ≥ 6, está formalmente indicada la <strong>Trombectomía Mecánica endovascular</strong> con stent retriever / aspiración directa en sala de hemodinamia antes de las 6 a 24 horas.`
    },
    {
        id: "HC-82701",
        cama: "Cama 03 · Shock Room UTI",
        edad: "Varón, 38 años",
        ingreso: "Emergencias SAMU",
        sistema: "neuro",
        dificultad: 3,
        enfermedadActual: "Paciente traído por ambulancia tras presentar crisis convulsiva tónico-clónica generalizada continua de más de 25 minutos de duración sin recuperar el sensorio entre episodios, con mordedura lateral de lengua, sialorrea espumosa, cianosis y relajación de esfínteres.",
        antecedentes: "Epilepsia focal secundaria a traumatismo craneoencefálico previo con fractura deprimida tratada con Fenitoína (incumplimiento terapéutico en las últimas 72 horas por consumo excesivo de alcohol).",
        examenFisico: [
            "PA: 155/100 mmHg | FC: 138 lpm taquicárdico | Temp: 38.6 °C (hipertermia por actividad muscular sostenida)",
            "FR: 28 rpm irregular con estridor por secreciones | SpO2: 86% con máscara de reservorio",
            "Examen Neurológico: En pleno episodio convulsivo activo con contracciones tónico-clónicas bilaterales, pupilas midriáticas poco reactivas, trismus mandibular."
        ],
        laboratorio: [
            { c1: "Glucemia: 160 mg/dL | Lactato sérico: 6.8 mmol/L (Acidosis láctica masiva)", c2: "Gases arteriales: pH 7.12, pCO2 48, HCO3 15 mEq/L" },
            { c1: "CPK Total: 2.800 U/L (Rabdomiólisis temprana en curso)", c2: "Ionograma: Na 140, K 4.6, Ca iónico 1.18 mmol/L" },
            { c1: "Nivel sérico de Fenitoína: < 2.5 mcg/mL (Infraterapéutico, rango 10-20)", c2: "" }
        ],
        preguntas: [
            "Definí el concepto de Status Epiléptico Convulsivo y los tiempos operacionales T1 (daño neuronal) y T2.",
            "¿Cuál es la primera línea farmacológica inmediata y por qué vía se administra?",
            "Si fracasa la primera y segunda línea, ¿cuál es el esquema de tercera línea en terapia intensiva?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> <strong>Status Epiléptico Convulsivo</strong> generalizado prolongado (Superó el tiempo T1 de 5 minutos donde la crisis no aborta espontáneamente y se aproxima a T2 de 30 minutos donde ocurre lesión neuronal excitotóxica irreversible por glutamato).<br>
<strong>2. Secuencia Farmacológica de Rescate:</strong>
<br>• <em>Fase 1 (0-5 min):</em> <strong>Lorazepam 4 mg IV</strong> en bolo lento (o Diazepam 10 mg IV o Midazolam 10 mg IM). Puede repetirse una dosis a los 5 minutos si persiste.
<br>• <em>Fase 2 (10-20 min):</em> Fármaco antiepiléptico IV de segunda línea: <strong>Levetiracetam 60 mg/kg IV</strong> (hasta 4500 mg) o Valproato de Sodio 40 mg/kg IV o Fenitoína 20 mg/kg IV.<br>
<strong>3. Tercera Línea (Status Refractario):</strong> Si persiste la actividad a los 30 minutos: IOT inmediata con intubación orotraqueal y anestesia general con infusión continua de <strong>Midazolam</strong> (0.2 mg/kg bolo + infusión) o <strong>Propofol</strong>, guiado por monitoreo electroencefalográfico continuo (EEG) buscando patrón de salva-supresión.`
    },

    // 🦠 INFECTOLOGÍA
    {
        id: "HC-90215",
        cama: "Cama 15 · Sala General",
        edad: "Mujer, 62 años",
        ingreso: "Guardia Médica",
        sistema: "infecto",
        dificultad: 1,
        enfermedadActual: "Paciente que consulta por fiebre alta con escalofríos y chuchos de frío intensos de 48 horas de evolución, dolor lumbar derecho punzante constante que empeora con el movimiento, náuseas, anorexia y disuria con tenesmo vesical previo.",
        antecedentes: "Diabetes Mellitus tipo 2 tratada con Metformina. Historia de infecciones urinarias bajas a repetición tratadas empíricamente con antibióticos orales múltiples.",
        examenFisico: [
            "PA: 110/65 mmHg | FC: 104 lpm | Temp: 39.2 °C",
            "FR: 22 rpm | SpO2: 97% aire ambiente",
            "Abdomen y dorso: Puñopercusión lumbar derecha marcadamente positiva (signo de Giordano francamente positivo). Dolor a la palpación del punto ureteral superior y medio derecho.",
            "Piel: Caliente, sudorosa, sin lesiones cutáneas ni petequias."
        ],
        laboratorio: [
            { c1: "Leucocitos: 17.800 /mm³ (82% neutrófilos, 8% en cayado)", c2: "PCR: 168 mg/L | Eritrosedimentación: 82 mm/h" },
            { c1: "Urea: 42 mg/dL | Creatinina: 1.1 mg/dL", c2: "Sedimento Urinario: Campo cubierto de leucocitos, piocitos abundantes, cilindros leucocitarios." },
            { c1: "Orina completa: Nitritos positivos, Estearasa leucocitaria +++", c2: "Ecografía Renal: Riñón derecho con aumento de tamaño difuso, sin ectasia pielocalicial ni litiasis obstructiva." }
        ],
        preguntas: [
            "¿Cuál es el diagnóstico sindromático y por qué se considera una infección urinaria complicada?",
            "¿Qué germen bacteriano causa el 80% de estos cuadros y cuál es la sospecha de resistencia bacteriana (BLEE)?",
            "¿Cuál es el esquema antibiótico empírico parenteral de elección mientras se espera el urocultivo?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> Pielonefritis aguda bacteriana derecha (ITU alta) <strong>complicada</strong> por presentarse en paciente diabética con síndrome de respuesta inflamatoria sistémica (SIRS).<br>
<strong>2. Microbiología:</strong> <em>Escherichia coli</em> uropatógena (seguida de <em>Klebsiella pneumoniae</em> y <em>Proteus mirabilis</em>). Al tener antecedentes de múltiples tratamientos previos, existe elevado riesgo de cepas productoras de Betalactamasas de Espectro Extendido (BLEE).<br>
<strong>3. Tratamiento Empírico:</strong> Internación en sala general. Si el riesgo de BLEE es bajo/moderado: <strong>Ceftriaxona 1-2 g/día IV</strong>. Si existen factores para BLEE o sepsis grave: <strong>Piperacilina/Tazobactam 4.5 g c/6h IV</strong> o un carbapenem (Ertapenem 1 g/día o Meropenem). Duración total: 10 a 14 días ajustados al antibiograma.`
    },
    {
        id: "HC-91430",
        cama: "Cama 06 · Terapia Intermedia / Aislamiento",
        edad: "Varón, 29 años",
        ingreso: "Shock Room",
        sistema: "infecto",
        dificultad: 2,
        enfermedadActual: "Paciente joven traído por familiares por cuadro de 24 horas de evolución de cefalea holocraneana explosiva refractaria a analgésicos, fiebre de 39.5°C, fotofobia extrema, vómitos en chorro y tendencia al sueño con confusión progresiva.",
        antecedentes: "Previamente sano. Historia de sinusitis bacteriana aguda hace 10 días tratada incompletamente.",
        examenFisico: [
            "PA: 125/80 mmHg | FC: 110 lpm | Temp: 39.4 °C | SpO2: 98%",
            "Sensorio: Somnoliento, responde al llamado con lenguaje incoherente (Glasgow 12/15).",
            "Signos Meníngeos: Rigidez de nuca franca (resistencia insuperable a la flexión del cuello), signo de Kernig positivo bilateral y signo de Brudzinski marcadamente positivo.",
            "Piel: Sin petequias ni púrpura fulminans (hace menos probable meningococo)."
        ],
        laboratorio: [
            { c1: "Punción Lumbar (LCR): Aspecto turbio y purulento a presión de apertura de 32 cmH2O", c2: "Citoquímico de LCR: 3.400 células/mm³ (92% polimorfonucleares)" },
            { c1: "Proteínas en LCR: 280 mg/dL (Hiperproteinorraquia marcada)", c2: "Glucosa en LCR: 14 mg/dL vs Glucemia plasmática 120 mg/dL (Relación < 0.2: Hipoglucorraquia severa)" },
            { c1: "Tinción de Gram en LCR: Diplococos Gram positivos lanceolados abundantes", c2: "Leucocitos en sangre: 21.000 /mm³" }
        ],
        preguntas: [
            "¿Cuál es el agente etiológico más probable según el Gram de LCR y el antecedente de sinusitis?",
            "¿Cuál es el esquema antibiótico empírico dual de elección para el adulto y por qué se indica Dexametasona?",
            "¿En qué momento exacto debe administrarse la Dexametasona respecto a los antibióticos?"
        ],
        discusion: `<strong>1. Diagnóstico & Germen:</strong> Meningitis Bacteriana Aguda comunitaria por <em>Streptococcus pneumoniae</em> (Neumococo, diplococos Gram positivos). El foco paranasal previo actuó como puerta de entrada por contigüidad.<br>
<strong>2. Dexametasona y Beneficio Clínico:</strong> <strong>Dexametasona 10 mg IV cada 6 horas</strong>. Reduce la inflamación subaracnoidea letal desencadenada por la lisis bacteriana, disminuyendo significativamente la sordera neurosensorial, las secuelas neurológicas y la mortalidad por neumococo.<br>
<strong>3. Regla de Oro del Momento:</strong> La Dexametasona debe administrarse <strong>15 a 20 minutos ANTES o junto con la primera dosis de antibiótico</strong> (Ceftriaxona 2 g c/12h IV + Vancomicina 15-20 mg/kg c/12h para cubrir cepas de neumococo con resistencia intermedia a penicilina). Si se administra después del antibiótico, pierde por completo su beneficio protector.`
    },
    {
        id: "HC-92840",
        cama: "Cama 01 · Terapia Intensiva",
        edad: "Varón, 71 años",
        ingreso: "Quirófano / Shock Room",
        sistema: "infecto",
        dificultad: 3,
        enfermedadActual: "Paciente en postoperatorio inmediato de laparotomía exploradora por diverticulitis aguda perforada con peritonitis fecal generalizada (Hinchey IV). Ingresa intubado en shock severo con necesidad de dosis crecientes de vasopresores a pesar de 3.000 mL de cristaloides infundidos.",
        antecedentes: "Enfermedad diverticular crónica, insuficiencia cardíaca con FEVI 45% y diabetes tipo 2.",
        examenFisico: [
            "PA: 78/42 mmHg bajo Noradrenalina a 0.35 mcg/kg/min | PAM: 54 mmHg | FC: 132 lpm",
            "Temp: 35.4 °C (Hipotermia por shock séptico grave) | Diuresis: 10 mL/h (Anuria)",
            "Perfusión: Extremidades moteadas con livideces en rodillas (Mottling score 3), tiempo de relleno capilar 6 segundos.",
            "Abdomen: Abdomen abierto contenido con bolsa de Bogotá / sistema de aspiración negativa."
        ],
        laboratorio: [
            { c1: "Ácido Láctico sérico: 5.6 mmol/L (Grave hiperlactatemia tisular)", c2: "Gases arteriales: pH 7.16, HCO3 12 mEq/L, PaO2 78 mmHg" },
            { c1: "Leucocitos: 3.200 /mm³ (Leucopenia grave con 22% de formas inmaduras en banda)", c2: "Plaquetas: 68.000 /mm³ (Trombocitopenia de consumo)" },
            { c1: "Creatinina: 3.1 mg/dL | Bilirrubina Total: 2.8 mg/dL", c2: "Score SOFA: 14 puntos (Mortalidad estimada > 50%)" }
        ],
        preguntas: [
            "Definí los criterios de Shock Séptico según las guías internacionales Sepsis-3.",
            "¿Cuál es el vasopresor de primera línea y cuál es la droga de segunda línea si no se alcanza la PAM ≥ 65 mmHg?",
            "¿Cuál es el esquema antibiótico empírico de amplio espectro para peritonitis fecal nosocomial / postquirúrgica?"
        ],
        discusion: `<strong>1. Diagnóstico:</strong> <strong>Shock Séptico</strong> refractario de foco intraabdominal (Sepsis-3: Sepsis con necesidad de vasopresores para mantener PAM ≥ 65 mmHg y lactato sérico > 2 mmol/L a pesar de una adecuada reanimación con volumen). Falla multiorgánica (hemodinámica, renal, metabólica y coagulopatía).<br>
<strong>2. Soporte Hemodinámico:</strong>
<br>• 1° Línea: <strong>Noradrenalina</strong> titulada hasta alcanzar PAM ≥ 65 mmHg.
<br>• 2° Línea complementaria: <strong>Vasopresina</strong> a infusión fija de 0.03 UI/min para reducir los requerimientos adrenérgicos.
<br>• Si persiste disfunción miocárdica séptica: agregar <strong>Dobutamina</strong>.
<br>• Corticoterapia: <strong>Hidrocortisona 200 mg/día IV</strong> en infusión continua ante shock séptico refractario a vasopresores.<br>
<strong>3. Antibioticoterapia Empírica:</strong> Meropenem 1 g c/8h IV (o Piperacilina/Tazobactam) + Vancomicina (o Teicoplanina) + Fluconazol o Equinocandina (por alto riesgo de peritonitis fúngica por <em>Candida</em> en perforación colónica).`
    }
];

export const BANCO_DESAFIOS_FARMACOLOGIA = [
    // --- CARDIOVASCULAR ---
    {
        id: "DF-CARDIO-1",
        subtitulo: "Selectividad Beta y Regulación de Receptores",
        dificultad: 1,
        familia: "cardio",
        texto: "Varón de 45 años hipertenso y asmático moderado bajo tratamiento con salbutamol a demanda. En un chequeo de rutina, un colega le inicia Propranolol 40 mg c/12h para control de cifras tensionales y temblor esencial leve. A las 48 horas consulta en guardia con crisis de broncoespasmo severo y sibilancias bilaterales diseminadas.",
        laboratorio: [
            "Espirometría en guardia: VEF1 48% del predicho (caída del 35% respecto a su basal)",
            "Presión Arterial: 125/80 mmHg | Frecuencia Cardíaca: 54 lpm (bradicardia sinusal)",
            "SatO2: 91% aire ambiente (corrige a 97% con cánula a 2 L/min)",
            "Gases en sangre: pH 7.37, pCO2 42, pO2 65 mmHg"
        ],
        preguntas: [
            "¿Cuál es la base molecular farmacodinámica del broncoespasmo inducido por propranolol frente a un betabloqueante cardioselectivo?",
            "¿Qué alternativa betabloqueante selectiva β1 hubiera sido segura en este paciente?",
            "¿Qué fenómeno farmacológico de 'up-regulation' ocurriría si se suspende un betabloqueante de forma abrupta tras semanas de uso?"
        ],
        discusion: `<strong>1. Mecanismo Farmacodinámico:</strong> El Propranolol es un betabloqueante no selectivo (afinidad idéntica por β1 y β2). El bloqueo de los receptores <strong>β2 del músculo liso bronquial</strong> impide la estimulación de la adenilato ciclasa y la síntesis de AMPc, provocando broncoconstricción refleja severa y anulando la respuesta al salbutamol.<br>
<strong>2. Alternativa Selectiva:</strong> Si un betabloqueante es estrictamente necesario, se deben usar agentes <strong>β1-cardioselectivos</strong> (Bisoprolol, Atenolol o Nebivolol) a dosis bajas, aunque con precaución en asma severa.<br>
<strong>3. Up-Regulation y Rebote:</strong> El bloqueo crónico induce aumento de la densidad de receptores β (up-regulation). La suspensión abrupta desencadena una crisis simpática por hipersensibilidad (taquicardia severa, rebote hipertensivo y angina).`
    },
    {
        id: "DF-804",
        subtitulo: "Dilema Cardiorrenal y Transporte P-gp",
        dificultad: 2,
        familia: "cardio",
        texto: "Paciente femenina de 71 años con fibrilación auricular no valvular (tratada crónicamente con Digoxina 0.25 mg/día y Acenocumarol) y artrosis severa. Por dolor agudo se automedica Ibuprofeno 600 mg c/8h durante 10 días y el médico de guardia agrega Claritromicina 500 mg c/12h por neumonía atípica. Ingresa obnubilada con náuseas intensas, xantopsias (visión amarillenta) y mareos.",
        laboratorio: [
            "Digoxinemia: 3.4 ng/mL (Rango terapéutico estrecho: 0.5 - 0.9 ng/mL)",
            "Creatinina: 2.2 mg/dL (Previa: 1.0 mg/dL - ClCr estimado: 24 mL/min)",
            "Potasio sérico: 3.1 mEq/L (Hipopotasemia moderada por diuréticos previos)",
            "ECG: Bradicardia extrema con extrasístoles ventriculares acopladas en bigeminismo y cubeta digitálica."
        ],
        preguntas: [
            "¿Por qué la combinación Claritromicina + Ibuprofeno triplicó la digoxinemia a nivel de transportadores (P-gp) y prostaglandinas?",
            "¿Cómo potencia la hipopotasemia la toxicidad de la digoxina en la subunidad alfa de la bomba Na+/K+ ATPasa?",
            "¿Cuál es el esquema de rescate farmacológico de elección y por qué el Calcio IV está terminantemente contraindicado?"
        ],
        discusion: `<strong>1. Doble Interacción Farmacocinética:</strong><br>
• <em>Claritromicina:</em> Inhibidor potente de la <strong>Glicoproteína P (P-gp)</strong> en el túbulo renal proximal y enterocito. Reduce la secreción activa tubular de digoxina en un 50% y duplica su biodisponibilidad.<br>
• <em>Ibuprofeno:</em> Inhibición de COX-1/2, bloqueando las prostaglandinas vasodilatadoras renales (PGE2/PGI2). Genera vasoconstricción de la arteriola aferente y caída abrupta del filtrado glomerular, provocando retención masiva del fármaco.<br>
<strong>2. Farmacodinamia & Hipopotasemia:</strong> La digoxina y el K+ compiten por el mismo dominio extracelular en la subunidad alfa de la bomba Na+/K+ ATPasa. En hipopotasemia, la digoxina se fija con afinidad máxima sin competencia, llevando a una sobrecarga patológica de Ca2+ intracelular (postdespolarizaciones tardías y arritmias mortales).<br>
<strong>3. Tratamiento:</strong> Suspensión de drogas, corrección cuidadosa del potasio con KCl IV, y administración de <strong>Anticuerpos Fab antidigoxina (DigiFab)</strong>. El Calcio IV está contraindicado porque precipita contractura sostenida irreversible ("corazón de piedra").`
    },
    {
        id: "DF-915",
        subtitulo: "Crisis por Inhibidores CYP450 y Anticoagulación",
        dificultad: 3,
        familia: "cardio",
        texto: "Varón de 58 años portador de válvula aórtica mecánica metálica anticoagulado con Warfarina (RIN habitual en rango: 2.5 - 3.5). Consulta por micosis ungular y tiña pedis; un profesional le prescribe Fluconazol 150 mg/semana e itraconazol oral. Al 6° día consulta por hematuria macroscópica franca, epistaxis bilateral y hematomas espontáneos múltiples.",
        laboratorio: [
            "RIN: 9.8 (Rango seguro de anticoagulación: 2.5 - 3.5)",
            "KPTT: 72 segundos | Tiempo de Protrombina: > 120 seg",
            "Hemoglobina: 9.8 g/dL (caída de 3.5 g/dL respecto al basal)",
            "Función Hepática: Normal (Bilirrubina 0.8, TGO/TGP normales)"
        ],
        preguntas: [
            "¿Qué isoenzima del Citocromo P450 metaboliza al enantiómero activo S-Warfarina y cómo actúa el azol?",
            "¿Cuál es la conducta farmacológica inmediata para revertir la anticoagulación crítica con sangrado activo?",
            "¿Por qué no se debe dar dosis excesivas de Vitamina K1 (Fitomenadiona) en pacientes con válvulas mecánicas?"
        ],
        discusion: `<strong>1. Mecanismo Enzimático CYP450:</strong> La Warfarina es una mezcla racémica donde el enantiómero S es 5 veces más potente que el R. La S-Warfarina se metaboliza exclusivamente por la isoenzima <strong>CYP2C9</strong>. Los azoles (Fluconazol/Itraconazol) son inhibidores directos muy potentes del CYP2C9, reduciendo drásticamente su aclaramiento hepático y cuadruplicando su semivida plasmática (t1/2).<br>
<strong>2. Reversión Inmediata con Sangrado Activo:</strong> Complejo Protrombínico Concentrado (CCP de 4 factores: factores II, VII, IX, X) a dosis de 25-50 UI/kg IV, o Plasma Fresco Congelado (PFC) si no hay CCP, más Vitamina K1 (Fitomenadiona) 5-10 mg IV lenta en infusión.<br>
<strong>3. Riesgo de Resistencia en Válvula Mecánica:</strong> Dosis excesivas de Vitamina K1 pueden generar resistencia a la anticoagulación oral por semanas una vez superada la urgencia, dejando al paciente desprotegido frente a una trombosis protésica valvular aguda.`
    },

    // --- SISTEMA NERVIOSO CENTRAL (SNC) ---
    {
        id: "DF-SNC-1",
        subtitulo: "Cinética de ISRS y Período de Latencia",
        dificultad: 1,
        familia: "snc",
        texto: "Mujer de 32 años diagnosticada con Trastorno Depresivo Mayor e inicio de Sertralina 50 mg/día hace 5 días. Consulta angustiada manifestando que no siente mejoría de su estado de ánimo y que nota náuseas matinales y leve temblor distal, solicitando cambiar inmediatamente de psicofármaco.",
        laboratorio: [
            "Ionograma sérico: Na+ 139 mEq/L, K+ 4.1 mEq/L",
            "ECG: Ritmo sinusal, QTc 410 ms (normal)",
            "Perfil tiroideo (TSH): 2.1 uUI/mL (eutiroidea)"
        ],
        preguntas: [
            "¿A qué se debe la discordancia temporal entre el bloqueo agudo del transportador SERT y el efecto clínico antidepresivo (latencia de 2 a 4 semanas)?",
            "¿Por qué se producen las náuseas al inicio del tratamiento con ISRS?",
            "¿Cuál es la conducta médica y explicación farmacológica adecuada para la paciente?"
        ],
        discusion: `<strong>1. Mecanismo de Latencia:</strong> Aunque el bloqueo del transportador <strong>SERT</strong> es inmediato (horas), el aumento inicial de serotonina estimula los autorreceptores presinápticos inhibitorios <strong>5-HT1A</strong> en el núcleo del rafe, frenando la liberación. El efecto antidepresivo clínico requiere de 2 a 4 semanas para lograr la <strong>desensibilización y down-regulation</strong> de estos autorreceptores y la estimulación de neurotrofinas (BDNF).<br>
<strong>2. Náuseas Iniciales:</strong> La estimulación de receptores <strong>5-HT3</strong> en el área postrema y tracto digestivo provoca náuseas que suelen autolimitarse tras la primera semana.<br>
<strong>3. Conducta:</strong> Contener a la paciente, explicar el período fisiológico de latencia terapéutica y mantener la dosis sin rotar el fármaco prematuramente.`
    },
    {
        id: "DF-SNC-2",
        subtitulo: "Síndrome Serotoninérgico vs Síndrome Neuroléptico",
        dificultad: 2,
        familia: "snc",
        texto: "Varón de 39 años bajo tratamiento con Escitalopram 20 mg/día por depresión mayor. Tras una extracción dental compleja recibe Tramadol 100 mg c/8h y además toma Sumatriptán 50 mg por una crisis migrañosa. Ingresa con diaforesis profusa, agitación psicomotriz, clonus inducible en miembros inferiores e hipertermia de 39.4°C.",
        laboratorio: [
            "CPK total: 850 UI/L (leve elevación)",
            "Leucocitos: 11.200 /mm³ sin desviación izquierda",
            "Gasometría: Acidosis láctica leve compensada",
            "Examen neurológico: Hiperreflexia rotuliana y aquílea masiva con clonus agotable bilateral y pupilas midriáticas reactivas."
        ],
        preguntas: [
            "¿Cómo interactúan Tramadol, Escitalopram y Sumatriptán para desencadenar toxicidad serotoninérgica sinérgica?",
            "¿Qué criterios clínicos diferencian el Síndrome Serotoninérgico del Síndrome Neuroléptico Maligno (SNM)?",
            "¿Cuál es el antagonista de receptores de serotonina de elección para rescate?"
        ],
        discusion: `<strong>1. Triple Sinergia Serotoninérgica:</strong><br>
• <em>Escitalopram:</em> Bloqueo selectivo de SERT.<br>
• <em>Tramadol:</em> Analgésico opioide atípico que además bloquea la recaptación de 5-HT y noradrenalina.<br>
• <em>Sumatriptán:</em> Agonista directo de receptores 5-HT1B/1D.<br>
La convergencia produce sobreestimulación masiva de receptores <strong>5-HT2A y 5-HT1A</strong> postsinápticos.<br>
<strong>2. Diagnóstico Diferencial con SNM:</strong> El Síndrome Serotoninérgico se caracteriza por <strong>hiperreflexia, clonus (signo cardinal) y temblor</strong> de instauración rápida (horas). El SNM (por bloqueo dopaminérgico con antipsicóticos) presenta rigidez en 'caño de plomo', hiporreflexia y elevación extrema de CPK (> 10.000) de desarrollo lento.<br>
<strong>3. Rescate Farmacológico:</strong> Suspensión inmediata de serotonérgicos, enfriamiento activo, benzodiacepinas (Diazepam) para el temblor y administración de <strong>Ciproheptadina</strong> (antagonista 5-HT2A oral/por SNG).`
    },
    {
        id: "DF-SNC-3",
        subtitulo: "Cinética No Lineal de Fenitoína en Status Convulsivo",
        dificultad: 3,
        familia: "snc",
        texto: "Mujer de 50 años con epilepsia focal estructural en tratamiento crónico con Fenitoína (Difenilhidantoína) 300 mg/día con niveles plasmáticos de 12 mcg/mL (rango terapéutico: 10 - 20 mcg/mL). Por presentar 2 crisis aisladas, su médico ambulatorio decide duplicar la dosis a 600 mg/día. Al 5° día es traída a guardia estuporosa, con ataxia cerebelosa severa, nistagmo multidireccional horizontal y vertical continuo.",
        laboratorio: [
            "Fenitoinemia actual: 44 mcg/mL (Rango terapéutico: 10 - 20 mcg/mL - Nivel tóxico crítico > 30)",
            "Albúmina sérica: 3.2 g/dL (leve hipoalbuminemia)",
            "ECG: Ensanchamiento leve del PR y bradicardia sinusal",
            "TC cerebral sin contraste: Sin nuevas lesiones isquémicas ni hemorrágicas agudas."
        ],
        preguntas: [
            "¿Por qué un incremento al doble de la dosis de fenitoína casi cuadruplicó su concentración plasmática (cinética de Michaelis-Menten / orden cero)?",
            "¿Cómo influye la hipoalbuminemia en la fracción libre farmacológicamente activa de fenitoína?",
            "¿Cuál es la conducta terapéutica y por qué la hemodiálisis no es efectiva para depurarla?"
        ],
        discusion: `<strong>1. Cinética de Saturación (Michaelis-Menten):</strong> La Fenitoína pasa de una cinética de primer orden (eliminación proporcional a la dosis) a una <strong>cinética de orden cero</strong> a concentraciones plasmáticas terapéuticas normales debido a la saturación completa de las enzimas hepáticas (CYP2C9 y CYP2C19). A partir de la saturación (Km), pequeños aumentos de dosis generan incrementos desproporcionados e impredecibles en la concentración plasmática y toxicidad severa.<br>
<strong>2. Fracción Libre y Proteínas:</strong> La fenitoína tiene <strong>unión a albúmina del 90-95%</strong>. En hipoalbuminemia, la fracción libre activa aumenta sustancialmente; la concentración total subestima la toxicidad real.<br>
<strong>3. Manejo:</strong> Suspensión inmediata de fenitoína y medidas de soporte. La hemodiálisis es ineficaz debido a su altísima unión proteica y gran volumen de distribución. Se debe rotar a fármacos de cinética lineal predecible (Levetiracetam o Valproato).`
    },

    // --- SISTEMA AUTÓNOMO ---
    {
        id: "DF-AUTO-1",
        subtitulo: "Selectividad Muscarínica y Ojo Seco vs Glaucoma",
        dificultad: 1,
        familia: "autonomo",
        texto: "Mujer de 64 años con vejiga hiperactiva a quien se le prescribe Oxibutinina 5 mg c/8h. A las 72 horas consulta por visión borrosa cercana severa, sequedad bucal extrema (xerostomía), constipación y un episodio de dolor ocular sordo unilateral con ojo rojo.",
        laboratorio: [
            "Presión intraocular (PIO): 34 mmHg en ojo derecho (normal: 10 - 21 mmHg)",
            "Agudeza visual: Deterioro significativo para lectura cercana",
            "Examen con lámpara de hendidura: Ángulo iridocorneal estrecho y midriasis media fija."
        ],
        preguntas: [
            "¿Qué subtipos de receptores muscarínicos bloquea la oxibutinina y cómo explica la parálisis de la acomodación (cicloplejía) y la xerostomía?",
            "¿Por qué los antimuscarínicos están estrictamente contraindicados en glaucoma de ángulo estrecho?",
            "¿Qué alternativas farmacológicas modernas con menor perfil anticolinérgico existen para vejiga hiperactiva?"
        ],
        discusion: `<strong>1. Perfil Anticolinérgico:</strong> La Oxibutinina es un antagonista muscarínico no selectivo con afinidad por <strong>M1, M2 y M3</strong>. El bloqueo M3 en el músculo ciliar anula la contracción requerida para abombar el cristalino (cicloplejía / imposibilidad de visión cercana). El bloqueo M3 en glándulas salivales inhibe la secreción acuosa originando xerostomía.<br>
<strong>2. Glaucoma de Ángulo Estrecho:</strong> La midriasis provocada por el bloqueo colinérgico del esfínter pupilar hace que el iris se repliegue hacia la periferia, ocluyendo la malla trabecular y bloqueando el drenaje del humor acuoso, precipitando una crisis de glaucoma agudo con riesgo de ceguera irreversible.<br>
<strong>3. Alternativas Modernas:</strong> <em>Mirabegrón</em> (agonista selectivo β3 adrenérgico, sin efecto anticolinérgico) o antimuscarínicos con selectividad M3 vesicular preferencial (Solifenacina / Darifenacina).`
    },
    {
        id: "DF-AUTO-2",
        subtitulo: "Toxicología: Síndrome Colinérgico por Organofosforados",
        dificultad: 2,
        familia: "autonomo",
        texto: "Varón de 28 años, trabajador rural que ingresa a emergencias tras fumigar en invernáculo sin equipo de protección. Presenta broncorrea masiva con estertores húmedos bilaterales, sialorrea, miosis puntiforme arreactiva, fasciculaciones musculares en deltoides y gemelos, bradicardia a 42 lpm y diarrea incontinente.",
        laboratorio: [
            "Gases en sangre: Acidosis respiratoria hipoxémica (pO2 55, pCO2 56 mmHg)",
            "Actividad de Colinesterasa plasmática/eritrocitaria: Inhibición del 85% respecto al valor basal",
            "ECG: Bradicardia sinusal con extrasístoles y prolongación de intervalo PR"
        ],
        preguntas: [
            "¿Cuál es el mecanismo bioquímico por el cual los organofosforados inhiben a la Acetilcolinesterasa y qué significa el fenómeno de 'envejecimiento' (aging) de la enzima?",
            "¿Qué manifestaciones corresponden al tono muscarínico y cuáles al nicotínico?",
            "¿Cuál es el esquema de atropinización inmediata y qué rol específico cumple la Pralidoxima?"
        ],
        discusion: `<strong>1. Mecanismo & Envejecimiento:</strong> Los organofosforados fosforilan covalentemente el residuo de serina en el sitio activo de la <strong>Acetilcolinesterasa (AChE)</strong>, impidiendo la hidrólisis de acetilcolina. El 'envejecimiento' es la escisión posterior de un grupo alquilo de la molécula fosforilada; una vez que ocurre (en horas), la unión se vuelve irreversible y los reactivadores ya no funcionan.<br>
<strong>2. Cuadro Muscarínico vs Nicotínico:</strong><br>
• <em>Muscarínico (M2/M3):</em> Miosis, broncorrea, broncoespasmo, bradicardia, sialorrea, vómitos, diarrea (regla nemotécnica DUMBELS).<br>
• <em>Nicotínico (Nm/Nn):</em> Fasciculaciones, debilidad muscular progresiva y parálisis diafragmática.<br>
<strong>3. Rescate Terapéutico:</strong> <strong>Atropina IV</strong> a dosis repetidas (1-2 mg c/5-10 min) hasta lograr signos de 'atropinización' (pulmón seco y FC > 80 lpm, ¡la miosis no es el parámetro de respuesta!). Se asocia <strong>Pralidoxima (oxima)</strong> precozmente antes del envejecimiento para reactivar la AChE sobre la placa neuromuscular.`
    },
    {
        id: "DF-AUTO-3",
        subtitulo: "Bloqueo Alfa previo a Beta en Feocromocitoma",
        dificultad: 3,
        familia: "autonomo",
        texto: "Mujer de 38 años con sospecha de feocromocitoma adrenal que consulta por palpitaciones severas, cefalea pulsátil y sudoración paroxística. Un médico no avezado decide iniciar de urgencia Atenolol 50 mg IV para controlar la taquicardia de 135 lpm. Minutos después de la infusión, la paciente desarrolla encefalopatía hipertensiva hiperaguda con PA de 260/150 mmHg y edema agudo de pulmón.",
        laboratorio: [
            "Metanefrinas libres plasmáticas: 12 veces por encima del límite superior normal",
            "Fondo de ojo de urgencia: Hemorragias en llama y exudados retinianos agudos",
            "Troponina I ultrasensible: 180 ng/L (daño miocárdico por sobrecarga aguda de postcarga)"
        ],
        preguntas: [
            "¿Cuál es el fundamento hemodinámico y de receptores por el cual el bloqueo beta aislado provocó una crisis hipertensiva catastrófica ('vasoconstricción alfa desopuesta')?",
            "¿Cuál es la secuencia farmacológica obligatoria recomendada por guías para preparar a estos pacientes?",
            "¿Qué droga alfa-bloqueante irreversible de acción prolongada o competitiva se debe emplear?"
        ],
        discusion: `<strong>1. Vasoconstricción Alfa Desopuesta:</strong> Las catecolaminas circulantes en exceso estimulan tanto receptores α1 (vasoconstricción periférica) como β2 (vasodilatación en lecho muscular). Al administrar un betabloqueante solo, se anula la vasodilatación mediada por β2 y se disminuye el inotropismo cardíaco sin oponer resistencia al tono α1 masivo, desatando una <strong>vasoconstricción arterial sistémica desenfrenada</strong> y pico tensional letal.<br>
<strong>2. Regla de Oro Farmacológica:</strong> NUNCA betabloquear sin un <strong>bloqueo alfa-adrenérgico completo y previo de al menos 7 a 14 días</strong> de duración.<br>
<strong>3. Drogas de Elección:</strong> <strong>Fenoxibenzamina</strong> (alfa-bloqueante no competitivo irreversible) o antagonistas α1 selectivos como <strong>Doxazosina / Prazosina</strong>. Solo cuando el lecho vascular está vasodilatado y la volemia repuesta, se agrega el betabloqueante para tratar la taquicardia residual.`
    },

    // --- AINES Y ANALGÉSICOS ---
    {
        id: "DF-AINES-1",
        subtitulo: "Selectividad COX-1 vs COX-2 y Riesgo Cardiovascular",
        dificultad: 1,
        familia: "aines",
        texto: "Varón de 62 años con antecedentes de infarto de miocardio previo y stent medicado hace 2 años. Por gonartrosis crónica, un familiar le aconseja tomar Celecoxib 200 mg/día 'porque no daña el estómago'. Consulta para saber si esta medicación es segura considerando sus antecedentes cardiovasculares.",
        laboratorio: [
            "Lipidograma: LDL 68 mg/dL (bajo estatina de alta potencia)",
            "Función renal: Creatinina 0.9 mg/dL, Filtrado glomerular 88 mL/min",
            "ECG: Necrosis transmural anteroseptal antigua sin cambios isquémicos dinámicos."
        ],
        preguntas: [
            "¿Por qué los inhibidores selectivos de COX-2 (coxibs) alteran el balance hemostático endotelial entre Prostaciclina (PGI2) y Tromboxano A2 (TXA2)?",
            "¿Por qué el Celecoxib está contraindicado en pacientes con enfermedad coronaria establecida?",
            "¿Qué estrategia analgésica de menor riesgo cardiovascular es de elección?"
        ],
        discusion: `<strong>1. Desbalance PGI2 / TXA2:</strong> La COX-2 endotelial sintetiza <strong>Prostaciclina (PGI2)</strong>, potente vasodilatador e inhibidor de la agregación plaquetaria. La COX-1 plaquetaria sintetiza <strong>Tromboxano A2 (TXA2)</strong>, proagregante y vasoconstrictor. Los inhibidores selectivos COX-2 suprimen la PGI2 protectora sin inhibir el TXA2 plaquetario mediado por COX-1, inclinando la balanza hacia un estado protrombótico endotelial.<br>
<strong>2. Contraindicación:</strong> Aumentan significativamente el riesgo relativo de reinfarto, trombosis de stent y ACV isquémico.<br>
<strong>3. Alternativa Preferida:</strong> Paracetamol como primer escalón; si se requiere AINE por inflamación refractaria, <strong>Naproxeno</strong> (menor perfil de riesgo trombótico coronario al tener un tiempo de bloqueo de COX-1 más continuo) asociado a protección gástrica estricta (IBP).`
    },
    {
        id: "DF-AINES-2",
        subtitulo: "La Triple Amenaza Nefrotóxica: IECA + Diurético + AINE",
        dificultad: 2,
        familia: "aines",
        texto: "Mujer de 76 años hipertensa tratada con Enalapril 20 mg/día e Hidroclorotiazida 25 mg/día. Por una lumbalgia aguda toma Diclofenac 75 mg c/12h por cuenta propia. Al 6° día acude al hospital con astenia profunda, anuria de 18 horas y ortostatismo.",
        laboratorio: [
            "Creatinina sérica: 4.8 mg/dL (Basal de 3 meses atrás: 0.9 mg/dL)",
            "Urea: 142 mg/dL",
            "Potasio sérico: 6.3 mEq/L (Hiperpotasemia severa con ondas T picudas en ECG)",
            "Ecografía renal: Riñones de tamaño normal sin ectasia de la vía urinaria."
        ],
        preguntas: [
            "¿Cómo descompensa hemodinámicamente el glomérulo la combinación simultánea de Diclofenac + Enalapril + Diurético (Triple Whammy)?",
            "¿Por qué el AINE genera además hiperpotasemia refractaria a nivel del túbulo colector?",
            "¿Cuáles son las medidas terapéuticas inmediatas?"
        ],
        discusion: `<strong>1. Fisiopatología de la Triple Amenaza ('Triple Whammy'):</strong><br>
• <em>Diurético:</em> Produce contracción de volumen intravascular y reduce el flujo plasmático renal.<br>
• <em>AINE (Diclofenac):</em> Inhibe la síntesis de PGE2/PGI2, anulando la vasodilatación compensatoria de la <strong>arteriola aferente</strong>.<br>
• <em>IECA (Enalapril):</em> Inhibe la angiotensina II, bloqueando la vasoconstricción protectora de la <strong>arteriola eferente</strong>.<br>
Resultado: Caída catastrófica e inmediata de la presión hidrostática intraglomerular y colapso del filtrado.<br>
<strong>2. Hiperpotasemia:</strong> Los AINEs inducen un estado de <strong>hipoaldosteronismo hiporreninémico</strong> por bloqueo de prostaglandinas renales, sumado a la retención de K+ generada por el IECA.<br>
<strong>3. Conducta Inmediata:</strong> Suspensión de todos los fármacos nefrotóxicos, hidratación isotónica cuidadosa con solución fisiológica y estabilización de membrana miocárdica por hiperpotasemia con Gluconato de Calcio IV e infusión de Insulina + Dextrosa.`
    },
    {
        id: "DF-AINES-3",
        subtitulo: "Toxicidad por Paracetamol y Vía del NAPQI",
        dificultad: 3,
        familia: "aines",
        texto: "Joven de 22 años que ingiere 18 gramos de Paracetamol en un intento de autolisis. Es traído a la guardia 6 horas después del evento, lúcido, con náuseas leves y vómitos aislados, refiriendo encontrarse 'mucho mejor' que al principio.",
        laboratorio: [
            "Paracetamolemia a las 6 horas: 240 mcg/mL (Línea de tratamiento de Rumack-Matthew: > 150 mcg/mL)",
            "Transaminasas (TGO / TGP): 45 UI/L y 52 UI/L (aún normales a las 6h post-ingesta)",
            "Tiempo de Protrombina: 88% | Bilirrubina total: 0.9 mg/dL"
        ],
        preguntas: [
            "¿Por qué las transaminasas normales a las 6 horas son un engaño clínico peligroso en la intoxicación por paracetamol?",
            "¿Qué vía metabólica hepática genera el metabolito reactivo tóxico NAPQI y por qué se satura el glutatión?",
            "¿Cuál es el antídoto específico, su mecanismo de acción y la ventana temporal ideal para prevenir necrosis centrolobulillar letal?"
        ],
        discusion: `<strong>1. Falsa Seguridad Inicial:</strong> La hepatotoxicidad por paracetamol evoluciona en fases: en las primeras 24 horas (Fase 1) solo hay síntomas digestivos inespecíficos con enzimas hepáticas normales. La citólisis masiva y necrosis centrolobulillar explotan entre las 48 y 72 horas (Fase 3). Guiarse por transaminasas normales tempranas es un error mortal.<br>
<strong>2. Metabolismo y NAPQI:</strong> A dosis terapéuticas el 90% se conjuga con glucurónido y sulfato. Con sobredosis, esas vías se saturan y el citocromo <strong>CYP2E1</strong> desvía el fármaco a <strong>N-acetil-p-benzoquinona imina (NAPQI)</strong>, un electrófilo citotóxico. Cuando el glutatión hepático se agota (> 70%), el NAPQI se une a proteínas mitocondriales produciendo necrosis hepática fulminante.<br>
<strong>3. Antídoto:</strong> <strong>N-Acetilcisteína (NAC)</strong>. Actúa como donante de grupos sulfhidrilo (reponiendo glutatión) y se conjuga directamente con NAPQI. Administrado dentro de las <strong>primeras 8 horas</strong>, la prevención de insuficiencia hepática aguda es cercana al 100%.`
    },

    // --- ANTIMICROBIANOS (ANTIBIÓTICOS) ---
    {
        id: "DF-ANTIBIO-1",
        subtitulo: "PK/PD de Betalactámicos vs Aminoglucósidos",
        dificultad: 1,
        familia: "antibio",
        texto: "En ateneo de infectología se debate el esquema antibiótico para una bacteriemia grave por Pseudomonas aeruginosa sensible. Se discute si infundir Meropenem en bolo cada 8h o en infusión extendida de 3 a 4 horas, y si Amikacina debe dosificarse en multidosis diaria o en monodosis única diaria consolidada.",
        laboratorio: [
            "CIM de Meropenem para el aislamiento: 2 mcg/mL",
            "CIM de Amikacina para el aislamiento: 4 mcg/mL",
            "ClCr estimado del paciente: 75 mL/min"
        ],
        preguntas: [
            "¿Qué índice farmacocinético/farmacodinámico (PK/PD) predice la eficacia bactericida de los betalactámicos frente a los aminoglucósidos?",
            "¿Por qué la infusión prolongada de Meropenem optimiza la eliminación bacteriana?",
            "¿Por qué la monodosis diaria de Amikacina maximiza la eficacia y reduce la toxicidad renal y coclear?"
        ],
        discusion: `<strong>1. Índices PK/PD Cardinales:</strong><br>
• <em>Betalactámicos (Meropenem):</em> Bactericidas <strong>tiempo-dependientes</strong>. Su parámetro de eficacia es el <strong>%T > CIM</strong> (porcentaje del intervalo en que la concentración libre supera la CIM del germen; meta: ≥ 40-70% del tiempo).<br>
• <em>Aminoglucósidos (Amikacina):</em> Bactericidas <strong>concentración-dependientes</strong> con marcado efecto post-antibiótico (PAE). Su parámetro de eficacia es el <strong>Cmax / CIM</strong> (pico plasmático sobre la CIM; meta: ≥ 8-10).<br>
<strong>2. Infusión Extendida:</strong> Al prolongar la infusión a 3-4 horas, se sostiene la meseta de concentración por encima de la CIM durante casi todo el intervalo de dosificación sin necesidad de subir la dosis total diaria.<br>
<strong>3. Monodosis de Amikacina:</strong> Genera un pico plasmático muy elevado (máxima muerte bacteriana) seguido de un valle casi nulo antes de la siguiente dosis, permitiendo la depuración tubular renal y el lavado del fármaco en el oído interno, reduciendo la oto y nefrotoxicidad.`
    },
    {
        id: "DF-ANTIBIO-2",
        subtitulo: "Nefrotoxicidad por Vancomicina y Monitoreo de Valles",
        dificultad: 2,
        familia: "antibio",
        texto: "Varón de 65 años internado por neumonía intrahospitalaria por SAMR en tratamiento con Vancomicina 1 g IV c/12h y Piperacilina-Tazobactam. Al 5° día su diuresis cae a 400 mL/día y la creatinina sube de 0.8 a 2.3 mg/dL. El dosaje de nivel valle de vancomicina regresa en 28 mcg/mL (rango meta: 15 - 20 mcg/mL).",
        laboratorio: [
            "Valle de Vancomicina: 28 mcg/mL",
            "Creatinina actual: 2.3 mg/dL | Urea: 98 mg/dL",
            "Sedimento urinario: Cilindros granulosos y células tubulares epiteliales",
            "Fracción excretada de sodio (FeNa): 2.4% (Injuria tubular aguda intrínseca)"
        ],
        preguntas: [
            "¿Por qué la combinación Vancomicina + Piperacilina/Tazobactam incrementa sinérgicamente el riesgo de injuria renal aguda?",
            "¿Cómo se define el parámetro de monitoreo moderno AUC24/CIM para Vancomicina y cuál es su rango de seguridad?",
            "¿Cuál es la conducta terapéutica inmediata y qué alternativa farmacológica oral o IV existe sin nefrotoxicidad?"
        ],
        discusion: `<strong>1. Sinergia Nefrotóxica:</strong> Múltiples ensayos clínicos han demostrado que asociar Piperacilina/Tazobactam a Vancomicina duplica o triplica la incidencia de necrosis tubular aguda por estrés oxidativo y daño mitocondrial en células tubulares renales proximales.<br>
<strong>2. Parámetro PK/PD AUC24/CIM:</strong> Las guías actuales (IDSA) recomiendan guiar la vancomicina por <strong>AUC24/CIM entre 400 y 600</strong> en lugar de valles aislados mayores a 15-20 mcg/mL, ya que niveles valles > 20 mcg/mL aumentan drásticamente la nefrotoxicidad sin mayor beneficio clínico.<br>
<strong>3. Conducta:</strong> Suspender Vancomicina de inmediato o rotar a <strong>Linezolid</strong> (oxazolidinona sin toxicidad renal con excelente penetración pulmonar) o <strong>Daptomicina</strong> (si no fuera neumonía, ya que el surfactante la inactiva).`
    },
    {
        id: "DF-ANTIBIO-3",
        subtitulo: "Manejo de Multirresistencia y Ajuste de Colistín",
        dificultad: 3,
        familia: "antibio",
        texto: "Paciente de 54 años en UTI en shock séptico refractario por bacteriemia asociada a catéter por Klebsiella pneumoniae productora de carbapenemasa (KPC). El antibiograma informa resistencia a todos los betalactámicos y quinolonas, sensible únicamente a Colistín (Colistimetato sódico) y Ceftazidima-Avibactam.",
        laboratorio: [
            "Aclaramiento de creatinina (ClCr): 22 mL/min (injuria renal estadio KDIGO 3)",
            "Lactato sérico: 4.8 mmol/L | Saturación venosa central: 58%",
            "Leucocitosis: 24.500 /mm³ con 18% en banda"
        ],
        preguntas: [
            "¿Por qué Ceftazidima-Avibactam es de elección frente a Colistín en términos de mortalidad y nefrotoxicidad?",
            "¿Cuál es el mecanismo de acción de Avibactam frente a las carbapenemasas clase A (KPC)?",
            "Si se tuviera que usar Colistimetato sódico en falla renal, ¿por qué es indispensable administrar una dosis de carga completa a pesar del filtrado disminuido?"
        ],
        discusion: `<strong>1. Superioridad Clínica de CAZ-AVI:</strong> Los estudios prospectivos demuestran una reducción de la mortalidad a 30 días del 50% frente a Colistín, con una tasa de nefrotoxicidad radicalmente inferior (Colistín genera hasta 40-50% de insuficiencia renal aguda grave por lisis de membrana tubular).<br>
<strong>2. Mecanismo de Avibactam:</strong> Es un inhibidor no betalactámico de betalactamasas (diaza-biciclooctano). A diferencia de tazobactam o clavulánico, se une de forma <strong>reversible y covalente</strong> inhibiendo serina-carbapenemasas de clase A de Ambler (KPC) y clase D (OXA-48), restaurando plenamente la potencia de la Ceftazidima.<br>
<strong>3. Dosis de Carga de Colistín:</strong> El Colistimetato sódico es un profármaco que se convierte lentamente a colistín activo. La <strong>dosis de carga depende del volumen de distribución</strong> (que no cambia con la insuficiencia renal) para alcanzar niveles terapéuticos rápidos en shock; únicamente las dosis de mantenimiento posteriores se ajustan al aclaramiento renal.`
    },

    // --- ENDOCRINOLOGÍA Y METABOLISMO ---
    {
        id: "DF-ENDO-1",
        subtitulo: "Metformina y Riesgo de Acidosis Láctica",
        dificultad: 1,
        familia: "endocrino",
        texto: "Varón de 68 años diabético tipo 2 tratado crónicamente con Metformina 1000 mg c/12h. Concurre a realizarse una tomografía de abdomen contrastada con iodo endovenoso. En el interrogatorio previo se constata una creatinina sérica de 2.1 mg/dL y un filtrado glomerular estimado de 28 mL/min.",
        laboratorio: [
            "Creatinina: 2.1 mg/dL | ClCr estimado: 28 mL/min/1.73m²",
            "Glucemia en ayunas: 138 mg/dL | HbA1c: 7.2%",
            "Ionograma: Na+ 140, K+ 4.6, Cl- 102 mEq/L"
        ],
        preguntas: [
            "¿A través de qué mecanismo celular hipoglucemia la metformina a nivel hepático (AMPK / Cadena mitocondrial)?",
            "¿Por qué la insuficiencia renal severa predispone a la acumulación de metformina y acidosis láctica?",
            "¿Cuál es la pauta estricta de suspensión respecto al uso de contrastes iodados?"
        ],
        discusion: `<strong>1. Mecanismo Celular:</strong> La Metformina inhibe levemente el <strong>Complejo I de la cadena respiratoria mitocondrial</strong>, reduciendo la producción de ATP y activando la <strong>Proteína Quinasa Activada por AMP (AMPK)</strong>. Esto reprime los genes gluconeogénicos hepáticos (PEPCK y G6Pasa) disminuyendo la producción hepática de glucosa y mejorando la sensibilidad periférica a la insulina.<br>
<strong>2. Acidosis Láctica:</strong> La metformina no se metaboliza en hígado y se elimina 100% por secreción tubular renal activa. En fallo renal (FG < 30 mL/min) el fármaco se acumula; la inhibición mitocondrial prolongada desvía el metabolismo celular hacia glucólisis anaeróbica con acumulación masiva de lactato e inhibición de la gluconeogénesis a partir de lactato.<br>
<strong>3. Pauta con Contraste Iodado:</strong> Debe suspenderse en el momento del estudio contrastado y reinstaurarse únicamente 48 horas después tras verificar estabilidad de la función renal.`
    },
    {
        id: "DF-ENDO-2",
        subtitulo: "Cetoacidosis Euglucémica por Inhibidores de SGLT2",
        dificultad: 2,
        familia: "endocrino",
        texto: "Mujer de 59 años con diabetes tipo 2 tratada con Empagliflozina 25 mg/día. Cursa un cuadro febril agudo de 3 días con vómitos e intolerancia oral. Ingresa soporosa con respiración acidótica rápida y profunda. En el triage se constata glucemia capilar de 168 mg/dL (casi normal), pero la gasometría arterial informa pH 7.12 con cetonuria masiva (++++).",
        laboratorio: [
            "Glucemia sérica: 172 mg/dL (incompatible a priori con cetoacidosis diabética típica)",
            "Gases arteriales: pH 7.14, HCO3- 9 mEq/L, pCO2 24 mmHg",
            "Anion Gap: 25 mEq/L (severamente elevado)",
            "Cetonemia sérica (Beta-hidroxibutirato): 5.8 mmol/L (marcadamente positiva)"
        ],
        preguntas: [
            "¿Qué mecanismo farmacológico explica que la cetoacidosis curse con cifras de glucemia normales o apenas elevadas ('euglucémica') con iSGLT2?",
            "¿Cómo estimula la glucosuria masiva la cetogénesis a nivel del adipocito e hígado?",
            "¿Cuál es el protocolo de rescate con infusión de glucosa e insulina?"
        ],
        discusion: `<strong>1. Euglucemia por Glucosuria Forzada:</strong> Los iSGLT2 (Empagliflozina) bloquean el cotransportador sodio-glucosa en el túbulo contorneado proximal, eliminando persistentemente entre 70 y 100 g/día de glucosa por orina. Esto mantiene la glucemia plasmática relativamente baja a pesar de una severa deficiencia de insulina.<br>
<strong>2. Cetogénesis Desencadenada:</strong> La baja disponibilidad de glucosa y el estrés infeccioso disminuyen la secreción endógena de insulina y aumentan el glucagón. La baja relación insulina/glucagón estimula la <strong>lipólisis masiva en adipocitos</strong>, liberando ácidos grasos libres que ingresan a la mitocondria hepática (vía CPT-1) transformándose en cuerpos cetónicos (beta-hidroxibutirato).<br>
<strong>3. Manejo:</strong> No suspender la insulina por tener glucemia normal. Se debe infundir <strong>Solución Dextrosada al 5% o 10% simultáneamente con goteo continuo de Insulina corriente</strong> para frenar la cetogénesis, junto con hidratación salina vigorosa.`
    },
    {
        id: "DF-ENDO-3",
        subtitulo: "Tormenta Tiroidea: Bloqueo Escalonado de la Síntesis y Liberación",
        dificultad: 3,
        familia: "endocrino",
        texto: "Mujer de 33 años con Enfermedad de Graves no tratada que ingresa a terapia intensiva en Tormenta Tiroidea (Escala de Burch-Wartofsky: 65 puntos) gatillada por neumonía. Presenta fiebre de 40.2°C, taquicardia ventricular rápida a 160 lpm, ictericia y delirio psicomotor.",
        laboratorio: [
            "T4 libre: > 6.0 ng/dL (marcadamente elevada)",
            "T3 total: 480 ng/dL | TSH: < 0.01 uUI/mL",
            "Bilirrubina total: 3.4 mg/dL a predominio directo",
            "ECG: Fibrilación auricular de alta respuesta ventricular (165 lpm)"
        ],
        preguntas: [
            "¿Cuál es la secuencia cronológica estricta obligatoria entre la administración de Tionamidas (PTU/Metimazol) y Solución de Yodo inorgánico (Lugol)?",
            "¿Por qué administrar Yodo antes de la tionamida puede ser fatal (Efecto Jod-Basedow)?",
            "¿Qué roles terapéuticos cumplen Propranolol e Hidrocortisona más allá de la hemodinámica?"
        ],
        discusion: `<strong>1. Secuencia Obligatoria de Administración:</strong> Se debe administrar primero la <strong>Tionamida (Propiltiouracilo o Metimazol)</strong> y ESPERAR AL MENOS 1 HORA antes de iniciar la solución de <strong>Yodo inorgánico (Solución de Lugol o Yoduro de Potasio)</strong>.<br>
<strong>2. El Peligro del Efecto Jod-Basedow:</strong> Si se da yodo primero, la glándula tiroidea hiperfuncionante lo utiliza inmediatamente como sustrato para sintetizar más hormona tiroidea nueva, agravando la tirotoxicosis. Al dar la tionamida 1 hora antes, se bloquea la enzima <strong>Tiroperoxidasa (TPO)</strong>; luego el yodo actúa transitoriamente inhibiendo la liberación proteolítica de hormonas almacenadas (<strong>Efecto Wolff-Chaikoff</strong>).<br>
<strong>3. Propranolol e Hidrocortisona:</strong><br>
• <em>Propranolol:</em> Controla la hiperactividad adrenérgica (FC, temblor) y a dosis altas <strong>inhibe la enzima 5'-desyodasa periférica</strong> (conversión de T4 inactiva a T3 activa).<br>
• <em>Hidrocortisona:</em> Previene la insuficiencia suprarrenal relativa y bloquea también la conversión periférica de T4 a T3.`
    }
];

export const BANCO_TPS_SALUD_PUBLICA = [
    {
        id: "TP N° 4 · Brote Epidémico",
        subtitulo: "Investigación de Brote por Transmisión Alimentaria",
        dificultad: 3,
        texto: "En una localidad de 25.000 habitantes se notificaron en una semana 140 casos de gastroenteritis aguda febril con diarrea acuosa profusa. De la investigación epidemiológica de campo surge que 120 de los casos concurrieron a un almuerzo comunitario escolar donde asistieron 300 personas. Entre los 200 asistentes que no enfermaron, 50 consumieron mayonesa casera, mientras que entre los 100 que enfermaron en ese grupo, 90 la habían consumido.",
        tabla: {
            encabezados: ["Exposición (Mayonesa)", "Enfermos (Casos)", "Sanos (No casos)", "Total Asistentes"],
            filas: [
                ["Consumió Mayonesa (+)", "90 (a)", "50 (b)", "140 (a + b)"],
                ["No consumió (-)", "10 (c)", "150 (d)", "160 (c + d)"],
                ["Total", "100", "200", "300"]
            ]
        },
        preguntas: [
            "Calculá la Tasa de Ataque en Expuestos (TAe), la Tasa de Ataque en No Expuestos (TAne) y la Tasa de Ataque General (TAG).",
            "Calculá el Riesgo Relativo (RR) y la Fracción Atribuible en Expuestos (FAE). ¿Qué conclusión sanitaria se extrae?",
            "Formulá 3 intervenciones prioritarias según los niveles de prevención de Leavell y Clark para contener el brote."
        ],
        discusion: `<strong>1. Tasas de Ataque:</strong><br>
• TA(expuestos) = 90 / 140 = <strong>64.29%</strong><br>
• TA(no expuestos) = 10 / 160 = <strong>6.25%</strong><br>
• TA(general) = 100 / 300 = <strong>33.33%</strong><br><br>
<strong>2. Medidas de Asociación:</strong><br>
• <strong>Riesgo Relativo (RR):</strong> 64.29% / 6.25% = <strong>10.28</strong>. Las personas que consumieron mayonesa casera tuvieron 10.28 veces más riesgo de enfermar que quienes no la consumieron (asociación causal concluyente).<br>
• <strong>Fracción Atribuible en Expuestos (FAE):</strong> ((10.28 - 1) / 10.28) × 100 = <strong>90.27%</strong>. El 90.27% de las gastroenteritis en los expuestos se explica por dicho alimento.<br><br>
<strong>3. Intervenciones en APS (Leavell & Clark):</strong><br>
• <em>Prevención Primaria:</em> Decomiso de remanentes, inspección bromatológica de la cocina escolar, capacitación en Buenas Prácticas de Manufactura (BPM) y prohibición de mayonesas con huevo crudo en comedores.<br>
• <em>Prevención Secundaria:</em> Búsqueda activa comunitaria, coprocultivo para aislamiento de Salmonella spp., e hidratación oral precoz (SRO) en el Centro de Salud.<br>
• <em>Prevención Terciaria:</em> Derivación y monitoreo de pacientes con signos de alarma (deshidratación grave, bacteriemia).`
    },
    {
        id: "TP N° 2 · Indicadores Demográficos",
        subtitulo: "Cálculo de Tasas de Incidencia, Prevalencia y Letalidad",
        dificultad: 1,
        texto: "En un municipio con una población media de 80.000 habitantes durante el año 2025, se registraron 640 casos nuevos de Tuberculosis pulmonar. Al inicio del año ya existían 320 pacientes bajo tratamiento. Durante el año fallecieron 48 personas por Tuberculosis y un total de 560 personas por todas las causas.",
        tabla: {
            encabezados: ["Variable Sanitaria", "Valor Observado", "Población Base"],
            filas: [
                ["Casos nuevos de TBC en el año", "640", "80.000 hab."],
                ["Casos existentes al inicio", "320", "80.000 hab."],
                ["Defunciones totales por TBC", "48", "80.000 hab."],
                ["Defunciones por todas las causas", "560", "80.000 hab."]
            ]
        },
        preguntas: [
            "Calculá la Tasa de Incidencia Acumulada de Tuberculosis por 100.000 habitantes.",
            "Calculá la Prevalencia de Período y la Tasa de Letalidad de la Tuberculosis.",
            "Calculá la Tasa Bruta de Mortalidad General (por mil habitantes) y la Tasa de Mortalidad Específica por TBC."
        ],
        discusion: `<strong>1. Tasa de Incidencia Acumulada:</strong><br>
• IA = (640 / 80.000) × 100.000 = <strong>800 por 100.000 habitantes</strong> (0.8%).<br><br>
<strong>2. Prevalencia de Período y Letalidad:</strong><br>
• Prevalencia de Período = ((320 + 640) / 80.000) × 100 = <strong>1.2%</strong> (1.200 por 100.000 hab).<br>
• <strong>Tasa de Letalidad:</strong> (48 defunciones / 960 enfermos totales) × 100 = <strong>5.0%</strong>. Expresa la gravedad de la patología entre quienes la padecen.<br><br>
<strong>3. Mortalidad:</strong><br>
• Mortalidad Bruta General = (560 / 80.000) × 1.000 = <strong>7.0 por mil habitantes</strong>.<br>
• Mortalidad Específica por TBC = (48 / 80.000) × 100.000 = <strong>60 por 100.000 habitantes</strong>.`
    }
];

export interface QuestionItem {
  id: number;
  tenseId: number;
  tenseEs: string;
  tenseHy: string;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export interface TenseGroup {
  id: number;
  nameEs: string;
  nameHy: string;
  range: string;
  questions: QuestionItem[];
}

export interface TablePhrase {
  es: string;
  hy: string;
}

export interface WhatWouldYouRespondItem {
  id: number;
  situationEs: string;
  situationHy: string;
  responseEs: string;
  responseHy: string;
}

export interface QuizQuestion {
  id: number;
  speakerEs: string;
  speakerHy: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface FastQAItem {
  id: number;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export interface TranslateItem {
  id: number;
  armenian: string;
  spanish: string;
}

export interface DialogueSituation {
  id: number;
  titleEs: string;
  titleHy: string;
  personAEs: string;
  personAHy: string;
  personBEs: string;
  personBHy: string;
}

// 50 PREGUNTAS Y RESPUESTAS
export const TENSE_GROUPS: TenseGroup[] = [
  {
    id: 1,
    nameEs: "Presente",
    nameHy: "Ներկա ժամանակ",
    range: "1–7",
    questions: [
      {
        id: 1,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Qué haces normalmente después del colegio?",
        questionHy: "Ի՞նչ ես սովորաբար անում դպրոցից հետո։",
        answerEs: "Primero descanso un poco, después hago los deberes y juego con mis amigos.",
        answerHy: "Սկզբում մի քիչ հանգստանում եմ, հետո կատարում եմ տնային աշխատանքներս և խաղում ընկերներիս հետ։"
      },
      {
        id: 2,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Qué asignatura te gusta más y por qué?",
        questionHy: "Ո՞ր առարկան ես ամենաշատը սիրում և ինչո՞ւ։",
        answerEs: "Me gustan las matemáticas porque me encanta resolver problemas.",
        answerHy: "Սիրում եմ մաթեմատիկան, որովհետև շատ եմ սիրում խնդիրներ լուծել։"
      },
      {
        id: 3,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Qué haces cuando no entiendes algo en clase?",
        questionHy: "Ի՞նչ ես անում, երբ դասի ժամանակ ինչ-որ բան չես հասկանում։",
        answerEs: "Levanto la mano y le pido al profesor que lo explique otra vez.",
        answerHy: "Ձեռքս բարձրացնում եմ և խնդրում ուսուցչին, որ նորից բացատրի։"
      },
      {
        id: 4,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Cómo te llevas con tus compañeros?",
        questionHy: "Ինչպիսի՞ հարաբերություններ ունես դասընկերներիդ հետ։",
        answerEs: "Me llevo bastante bien con ellos, aunque a veces discutimos por tonterías.",
        answerHy: "Նրանց հետ բավականին լավ հարաբերություններ ունեմ, չնայած երբեմն մանրուքների պատճառով վիճում ենք։"
      },
      {
        id: 5,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Qué haces cuando estás de mal humor?",
        questionHy: "Ի՞նչ ես անում, երբ վատ տրամադրություն ունես։",
        answerEs: "Prefiero estar solo un rato y escuchar música para tranquilizarme.",
        answerHy: "Նախընտրում եմ մի քիչ մենակ մնալ և երաժշտություն լսել՝ հանգստանալու համար։"
      },
      {
        id: 6,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Te resulta fácil hablar español?",
        questionHy: "Քեզ համար հե՞շտ է իսպաներեն խոսելը։",
        answerEs: "Entiendo muchas cosas, pero a veces necesito tiempo para responder.",
        answerHy: "Շատ բաներ հասկանում եմ, բայց երբեմն ժամանակ է պետք պատասխանելու համար։"
      },
      {
        id: 7,
        tenseId: 1,
        tenseEs: "Presente",
        tenseHy: "Ներկա ժամանակ",
        questionEs: "¿Qué haces si un amigo necesita ayuda?",
        questionHy: "Ի՞նչ ես անում, եթե ընկերդ օգնության կարիք ունի։",
        answerEs: "Intento ayudarlo y escucho lo que me quiere contar.",
        answerHy: "Փորձում եմ օգնել նրան և լսում եմ, թե ինչ է ուզում պատմել։"
      }
    ]
  },
  {
    id: 2,
    nameEs: "Pretérito Perfecto",
    nameHy: "Անցյալ՝ կապված ներկայի հետ",
    range: "8–14",
    questions: [
      {
        id: 8,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Qué has hecho hoy en el colegio?",
        questionHy: "Ի՞նչ ես արել այսօր դպրոցում։",
        answerEs: "He tenido cinco clases y he aprendido algunas palabras nuevas en español.",
        answerHy: "Հինգ դաս եմ ունեցել և իսպաներեն մի քանի նոր բառ եմ սովորել։"
      },
      {
        id: 9,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Has hablado español con alguien esta semana?",
        questionHy: "Այս շաբաթ որևէ մեկի հետ իսպաներեն խոսե՞լ ես։",
        answerEs: "Sí, he hablado con mi profesor y he intentado responder sin traducir.",
        answerHy: "Այո՛, խոսել եմ ուսուցչիս հետ և փորձել եմ պատասխանել առանց թարգմանելու։"
      },
      {
        id: 10,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Alguna vez has olvidado hacer los deberes?",
        questionHy: "Երբևէ մոռացե՞լ ես տնային աշխատանքդ կատարել։",
        answerEs: "Sí, una vez se me olvidó, pero normalmente soy responsable.",
        answerHy: "Այո՛, մի անգամ մոռացել եմ, բայց սովորաբար պատասխանատու եմ։"
      },
      {
        id: 11,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Has visto alguna película interesante últimamente?",
        questionHy: "Վերջերս հետաքրքիր ֆիլմ դիտե՞լ ես։",
        answerEs: "Sí, he visto una película de aventuras y me ha gustado mucho.",
        answerHy: "Այո՛, արկածային ֆիլմ եմ դիտել, և այն ինձ շատ է դուր եկել։"
      },
      {
        id: 12,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Has aprendido algo difícil esta semana?",
        questionHy: "Այս շաբաթ ինչ-որ դժվար բան սովորե՞լ ես։",
        answerEs: "Sí, he aprendido una regla nueva de gramática y he practicado bastante.",
        answerHy: "Այո՛, քերականական նոր կանոն եմ սովորել և բավականին պարապել եմ։"
      },
      {
        id: 13,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Has jugado al fútbol esta semana?",
        questionHy: "Այս շաբաթ ֆուտբոլ խաղացե՞լ ես։",
        answerEs: "Sí, he jugado dos veces y he marcado un gol.",
        answerHy: "Այո՛, երկու անգամ խաղացել եմ և մեկ գոլ խփել։"
      },
      {
        id: 14,
        tenseId: 2,
        tenseEs: "Pretérito Perfecto",
        tenseHy: "Անցյալ՝ կապված ներկայի հետ",
        questionEs: "¿Qué es lo más divertido que te ha pasado hoy?",
        questionHy: "Ո՞րն է այսօր քեզ հետ պատահած ամենազվարճալի բանը։",
        answerEs: "Un amigo ha contado un chiste y todos nos hemos reído mucho.",
        answerHy: "Ընկերներիցս մեկը կատակ է պատմել, և բոլորս շատ ենք ծիծաղել։"
      }
    ]
  },
  {
    id: 3,
    nameEs: "Pretérito Indefinido",
    nameHy: "Ավարտված անցյալ",
    range: "15–21",
    questions: [
      {
        id: 15,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Qué hiciste ayer después de clase?",
        questionHy: "Ի՞նչ արեցիր երեկ դասերից հետո։",
        answerEs: "Fui a casa, comí con mi familia y después salí a jugar.",
        answerHy: "Գնացի տուն, ընտանիքիս հետ ճաշեցի, հետո դուրս եկա խաղալու։"
      },
      {
        id: 16,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Adónde fuiste el fin de semana pasado?",
        questionHy: "Ո՞ւր գնացիր անցած հանգստյան օրերին։",
        answerEs: "Fui al parque con mis amigos y pasamos toda la tarde juntos.",
        answerHy: "Գնացի այգի ընկերներիս հետ, և ամբողջ կեսօրն անցկացրինք միասին։"
      },
      {
        id: 17,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Qué hiciste cuando tu equipo perdió el último partido?",
        questionHy: "Ի՞նչ արեցիր, երբ քո թիմը պարտվեց վերջին խաղում։",
        answerEs: "Me puse triste, pero felicité al otro equipo y seguí entrenando.",
        answerHy: "Տխրեցի, բայց շնորհավորեցի մյուս թիմին և շարունակեցի մարզվել։"
      },
      {
        id: 18,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Qué le dijiste a tu profesor cuando llegaste tarde?",
        questionHy: "Ի՞նչ ասացիր ուսուցչիդ, երբ ուշացար։",
        answerEs: "Le pedí disculpas y le expliqué por qué había llegado tarde.",
        answerHy: "Ներողություն խնդրեցի և բացատրեցի, թե ինչու էի ուշացել։"
      },
      {
        id: 19,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Cuál fue el mejor regalo que recibiste el año pasado?",
        questionHy: "Ո՞րն էր անցյալ տարի ստացածդ լավագույն նվերը։",
        answerEs: "Recibí un balón de fútbol que quería desde hacía mucho tiempo.",
        answerHy: "Ստացա ֆուտբոլի գնդակ, որը վաղուց էի ուզում։"
      },
      {
        id: 20,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Qué pasó la última vez que discutiste con un amigo?",
        questionHy: "Ի՞նչ պատահեց, երբ վերջին անգամ վիճեցիր ընկերոջդ հետ։",
        answerEs: "Discutimos por un juego, pero después hablamos y nos reconciliamos.",
        answerHy: "Վիճեցինք խաղի պատճառով, բայց հետո խոսեցինք և հաշտվեցինք։"
      },
      {
        id: 21,
        tenseId: 3,
        tenseEs: "Pretérito Indefinido",
        tenseHy: "Ավարտված անցյալ",
        questionEs: "¿Cuándo aprendiste a montar en bicicleta?",
        questionHy: "Ե՞րբ սովորեցիր հեծանիվ քշել։",
        answerEs: "Aprendí cuando tenía seis años. Mi padre me ayudó mucho.",
        answerHy: "Սովորեցի, երբ վեց տարեկան էի։ Հայրս ինձ շատ օգնեց։"
      }
    ]
  },
  {
    id: 4,
    nameEs: "Pretérito Imperfecto",
    nameHy: "Սովորություններ անցյալում",
    range: "22–27",
    questions: [
      {
        id: 22,
        tenseId: 4,
        tenseEs: "Pretérito Imperfecto",
        tenseHy: "Սովորություններ անցյալում",
        questionEs: "¿Cómo eras cuando tenías cinco años?",
        questionHy: "Ինչպիսի՞ն էիր, երբ հինգ տարեկան էիր։",
        answerEs: "Era muy curioso, hablaba mucho y siempre hacía preguntas.",
        answerHy: "Շատ հետաքրքրասեր էի, շատ էի խոսում և միշտ հարցեր էի տալիս։"
      },
      {
        id: 23,
        tenseId: 4,
        tenseEs: "Pretérito Imperfecto",
        tenseHy: "Սովորություններ անցյալում",
        questionEs: "¿A qué jugabas cuando eras pequeño?",
        questionHy: "Ի՞նչ էիր խաղում, երբ փոքր էիր։",
        answerEs: "Jugaba con coches, construía casas con bloques y corría por el parque.",
        answerHy: "Խաղում էի մեքենաներով, կառուցողական խաղալիքներով տներ էի կառուցում և վազվզում այգում։"
      },
      {
        id: 24,
        tenseId: 4,
        tenseEs: "Pretérito Imperfecto",
        tenseHy: "Սովորություններ անցյալում",
        questionEs: "¿Te gustaba ir al colegio cuando eras más pequeño?",
        questionHy: "Սիրո՞ւմ էիր դպրոց գնալ, երբ ավելի փոքր էիր։",
        answerEs: "Sí, me gustaba mucho porque veía a mis amigos todos los días.",
        answerHy: "Այո՛, շատ էի սիրում, որովհետև ամեն օր տեսնում էի ընկերներիս։"
      },
      {
        id: 25,
        tenseId: 4,
        tenseEs: "Pretérito Imperfecto",
        tenseHy: "Սովորություններ անցյալում",
        questionEs: "¿Qué hacías durante las vacaciones de verano?",
        questionHy: "Ի՞նչ էիր անում ամառային արձակուրդների ժամանակ։",
        answerEs: "Normalmente iba a la piscina, jugaba al fútbol y pasaba tiempo con mi familia.",
        answerHy: "Սովորաբար գնում էի լողավազան, ֆուտբոլ խաղում և ժամանակ անցկացնում ընտանիքիս հետ։"
      },
      {
        id: 26,
        tenseId: 4,
        tenseEs: "Pretérito Imperfecto",
        tenseHy: "Սովորություններ անցյալում",
        questionEs: "¿Qué asignatura te resultaba difícil antes?",
        questionHy: "Ո՞ր առարկան էր քեզ համար նախկինում դժվար։",
        answerEs: "Antes me costaba el español, pero ahora entiendo mucho más.",
        answerHy: "Նախկինում իսպաներենն ինձ համար դժվար էր, բայց հիմա շատ ավելին եմ հասկանում։"
      },
      {
        id: 27,
        tenseId: 4,
        tenseEs: "Pretérito Imperfecto",
        tenseHy: "Սովորություններ անցյալում",
        questionEs: "¿Cómo era tu mejor amigo en primaria?",
        questionHy: "Ինչպիսի՞ն էր տարրական դպրոցի քո լավագույն ընկերը։",
        answerEs: "Era muy simpático, siempre sonreía y compartía sus cosas conmigo.",
        answerHy: "Շատ բարեհամբույր էր, միշտ ժպտում էր և իր իրերով կիսվում ինձ հետ։"
      }
    ]
  },
  {
    id: 5,
    nameEs: "Futuro Simple",
    nameHy: "Ապառնի ժամանակ",
    range: "28–33",
    questions: [
      {
        id: 28,
        tenseId: 5,
        tenseEs: "Futuro Simple",
        tenseHy: "Ապառնի ժամանակ",
        questionEs: "¿Qué harás mañana después del colegio?",
        questionHy: "Ի՞նչ կանես վաղը դպրոցից հետո։",
        answerEs: "Primero terminaré los deberes y después jugaré con mis amigos.",
        answerHy: "Սկզբում կավարտեմ տնային աշխատանքներս, հետո կխաղամ ընկերներիս հետ։"
      },
      {
        id: 29,
        tenseId: 5,
        tenseEs: "Futuro Simple",
        tenseHy: "Ապառնի ժամանակ",
        questionEs: "¿Qué estudiarás cuando seas mayor?",
        questionHy: "Ի՞նչ կսովորես, երբ մեծանաս։",
        answerEs: "Todavía no lo sé, pero quizás estudiaré informática.",
        answerHy: "Դեռ չգիտեմ, բայց գուցե ծրագրավորում սովորեմ։"
      },
      {
        id: 30,
        tenseId: 5,
        tenseEs: "Futuro Simple",
        tenseHy: "Ապառնի ժամանակ",
        questionEs: "¿Qué harás si mañana llueve?",
        questionHy: "Ի՞նչ կանես, եթե վաղը անձրև գա։",
        answerEs: "Me quedaré en casa y veré una película.",
        answerHy: "Կմնամ տանը և ֆիլմ կդիտեմ։"
      },
      {
        id: 31,
        tenseId: 5,
        tenseEs: "Futuro Simple",
        tenseHy: "Ապառնի ժամանակ",
        questionEs: "¿Crees que hablarás español con fluidez algún día?",
        questionHy: "Կարծո՞ւմ ես, որ մի օր սահուն իսպաներեն կխոսես։",
        answerEs: "Sí, si practico todos los días, hablaré cada vez mejor.",
        answerHy: "Այո՛, եթե ամեն օր պարապեմ, ավելի ու ավելի լավ կխոսեմ։"
      },
      {
        id: 32,
        tenseId: 5,
        tenseEs: "Futuro Simple",
        tenseHy: "Ապառնի ժամանակ",
        questionEs: "¿Qué harás si sacas una buena nota en el examen?",
        questionHy: "Ի՞նչ կանես, եթե քննությունից լավ գնահատական ստանաս։",
        answerEs: "Me alegraré mucho y se lo contaré a mis padres.",
        answerHy: "Շատ կուրախանամ և կպատմեմ ծնողներիս։"
      },
      {
        id: 33,
        tenseId: 5,
        tenseEs: "Futuro Simple",
        tenseHy: "Ապառնի ժամանակ",
        questionEs: "¿Dónde pasarás las próximas vacaciones?",
        questionHy: "Որտե՞ղ կանցկացնես հաջորդ արձակուրդները։",
        answerEs: "Probablemente viajaré con mi familia o visitaré a mis abuelos.",
        answerHy: "Հավանաբար կճանապարհորդեմ ընտանիքիս հետ կամ կայցելեմ տատիկիս ու պապիկիս։"
      }
    ]
  },
  {
    id: 6,
    nameEs: "Condicional Simple",
    nameHy: "Պայմանական եղանակ",
    range: "34–39",
    questions: [
      {
        id: 34,
        tenseId: 6,
        tenseEs: "Condicional Simple",
        tenseHy: "Պայմանական եղանակ",
        questionEs: "¿Qué harías si encontraras cien euros en la calle?",
        questionHy: "Ի՞նչ կանեիր, եթե փողոցում 100 եվրո գտնեիր։",
        answerEs: "Intentaría encontrar al dueño y devolverle el dinero.",
        answerHy: "Կփորձեի գտնել տիրոջը և վերադարձնել գումարը։"
      },
      {
        id: 35,
        tenseId: 6,
        tenseEs: "Condicional Simple",
        tenseHy: "Պայմանական եղանակ",
        questionEs: "¿Qué cambiarías de tu colegio?",
        questionHy: "Ի՞նչ կփոխեիր քո դպրոցում։",
        answerEs: "Haría los recreos más largos y pondría más actividades deportivas.",
        answerHy: "Դասամիջոցներն ավելի երկար կդարձնեի և ավելի շատ սպորտային միջոցառումներ կավելացնեի։"
      },
      {
        id: 36,
        tenseId: 6,
        tenseEs: "Condicional Simple",
        tenseHy: "Պայմանական եղանակ",
        questionEs: "¿Qué harías si pudieras ser invisible durante un día?",
        questionHy: "Ի՞նչ կանեիր, եթե կարողանայիր մեկ օր անտեսանելի լինել։",
        answerEs: "Visitaría lugares interesantes sin que nadie me viera.",
        answerHy: "Կայցելեի հետաքրքիր վայրեր՝ առանց որևէ մեկի ինձ տեսնելու։"
      },
      {
        id: 37,
        tenseId: 6,
        tenseEs: "Condicional Simple",
        tenseHy: "Պայմանական եղանակ",
        questionEs: "¿Qué le dirías a un amigo que tiene miedo de hablar español?",
        questionHy: "Ի՞նչ կասեիր ընկերոջդ, որը վախենում է իսպաներեն խոսել։",
        answerEs: "Le diría que no tuviera miedo y que practicara poco a poco.",
        answerHy: "Կասեի նրան, որ չվախենա և քիչ-քիչ պարապի։"
      },
      {
        id: 38,
        tenseId: 6,
        tenseEs: "Condicional Simple",
        tenseHy: "Պայմանական եղանակ",
        questionEs: "¿A qué país viajarías si pudieras elegir cualquiera?",
        questionHy: "Ո՞ր երկիր կճանապարհորդեիր, եթե կարողանայիր ընտրել ցանկացած երկիր։",
        answerEs: "Viajaría a Japón porque me gustaría conocer su cultura.",
        answerHy: "Կճանապարհորդեի Ճապոնիա, որովհետև կցանկանայի ծանոթանալ նրա մշակույթին։"
      },
      {
        id: 39,
        tenseId: 6,
        tenseEs: "Condicional Simple",
        tenseHy: "Պայմանական եղանակ",
        questionEs: "¿Qué comprarías si tuvieras mucho dinero?",
        questionHy: "Ի՞նչ կգնեիր, եթե շատ փող ունենայիր։",
        answerEs: "Compraría una casa grande para mi familia y viajaríamos juntos.",
        answerHy: "Մեծ տուն կգնեի ընտանիքիս համար, և միասին կճանապարհորդեինք։"
      }
    ]
  },
  {
    id: 7,
    nameEs: "Presente de Subjuntivo",
    nameHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
    range: "40–45",
    questions: [
      {
        id: 40,
        tenseId: 7,
        tenseEs: "Presente de Subjuntivo",
        tenseHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
        questionEs: "¿Qué quieres que hagan tus amigos cuando estás triste?",
        questionHy: "Ի՞նչ ես ուզում, որ ընկերներդ անեն, երբ տխուր ես։",
        answerEs: "Quiero que me escuchen y que intenten animarme.",
        answerHy: "Ուզում եմ, որ ինձ լսեն և փորձեն բարձրացնել տրամադրությունս։"
      },
      {
        id: 41,
        tenseId: 7,
        tenseEs: "Presente de Subjuntivo",
        tenseHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
        questionEs: "¿Qué esperas que pase mañana en el colegio?",
        questionHy: "Ի՞նչ ես հույս ունենում, որ վաղը դպրոցում տեղի կունենա։",
        answerEs: "Espero que no haya ningún examen sorpresa.",
        answerHy: "Հուսով եմ, որ անակնկալ քննություն չի լինի։"
      },
      {
        id: 42,
        tenseId: 7,
        tenseEs: "Presente de Subjuntivo",
        tenseHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
        questionEs: "¿Te gusta que los profesores hagan preguntas difíciles?",
        questionHy: "Քեզ դո՞ւր է գալիս, երբ ուսուցիչները դժվար հարցեր են տալիս։",
        answerEs: "Depende. Me gusta que hagan preguntas interesantes, pero no demasiado difíciles.",
        answerHy: "Կախված է։ Ինձ դուր է գալիս, որ հետաքրքիր հարցեր տան, բայց ոչ չափազանց դժվար։"
      },
      {
        id: 43,
        tenseId: 7,
        tenseEs: "Presente de Subjuntivo",
        tenseHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
        questionEs: "¿Qué te aconsejan tus padres que hagas cada día?",
        questionHy: "Ի՞նչ են ծնողներդ խորհուրդ տալիս ամեն օր անել։",
        answerEs: "Me aconsejan que estudie, haga deporte y no pase demasiado tiempo con el móvil.",
        answerHy: "Խորհուրդ են տալիս, որ սովորեմ, սպորտով զբաղվեմ և շատ ժամանակ չանցկացնեմ հեռախոսով։"
      },
      {
        id: 44,
        tenseId: 7,
        tenseEs: "Presente de Subjuntivo",
        tenseHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
        questionEs: "¿Quieres que tus compañeros te respeten aunque piensen de otra manera?",
        questionHy: "Ուզո՞ւմ ես, որ դասընկերներդ հարգեն քեզ, նույնիսկ եթե այլ կերպ են մտածում։",
        answerEs: "Sí, quiero que respeten mis opiniones, igual que yo respeto las suyas.",
        answerHy: "Այո՛, ուզում եմ, որ հարգեն իմ կարծիքները, ինչպես ես եմ հարգում նրանց կարծիքները։"
      },
      {
        id: 45,
        tenseId: 7,
        tenseEs: "Presente de Subjuntivo",
        tenseHy: "Ցանկություններ, զգացմունքներ և խորհուրդներ",
        questionEs: "¿Qué deseas que mejore en tu español?",
        questionHy: "Ի՞նչ ես ցանկանում, որ բարելավվի քո իսպաներենում։",
        answerEs: "Deseo que mejore mi pronunciación y que pueda hablar sin miedo.",
        answerHy: "Ցանկանում եմ, որ արտասանությունս բարելավվի և կարողանամ խոսել առանց վախենալու։"
      }
    ]
  },
  {
    id: 8,
    nameEs: "Mezcla de tiempos",
    nameHy: "Իրական խոսակցություն տարբեր ժամանակներով",
    range: "46–50",
    questions: [
      {
        id: 46,
        tenseId: 8,
        tenseEs: "Mezcla de tiempos",
        tenseHy: "Իրական խոսակցություն տարբեր ժամանակներով",
        questionEs: "¿Qué estabas haciendo ayer cuando te llamó tu amigo?",
        questionHy: "Ի՞նչ էիր անում երեկ, երբ ընկերդ զանգահարեց։",
        answerEs: "Estaba haciendo los deberes, pero dejé de estudiar unos minutos para hablar con él.",
        answerHy: "Տնային աշխատանքներս էի կատարում, բայց մի քանի րոպե դադարեցի սովորել, որպեսզի խոսեմ նրա հետ։"
      },
      {
        id: 47,
        tenseId: 8,
        tenseEs: "Mezcla de tiempos",
        tenseHy: "Իրական խոսակցություն տարբեր ժամանակներով",
        questionEs: "¿Qué has aprendido este año que antes no sabías?",
        questionHy: "Ի՞նչ ես սովորել այս տարի, որը նախկինում չգիտեիր։",
        answerEs: "He aprendido a hablar mejor español. Antes me costaba formar frases, pero ahora puedo mantener una conversación.",
        answerHy: "Սովորել եմ ավելի լավ իսպաներեն խոսել։ Նախկինում դժվարանում էի նախադասություններ կազմել, բայց հիմա կարողանում եմ զրույց վարել։"
      },
      {
        id: 48,
        tenseId: 8,
        tenseEs: "Mezcla de tiempos",
        tenseHy: "Իրական խոսակցություն տարբեր ժամանակներով",
        questionEs: "Si mañana tu profesor te pidiera que hablaras delante de toda la clase, ¿qué harías?",
        questionHy: "Եթե վաղը ուսուցիչդ խնդրեր, որ ամբողջ դասարանի առաջ խոսես, ի՞նչ կանեիր։",
        answerEs: "Me pondría un poco nervioso, pero intentaría hablar con tranquilidad.",
        answerHy: "Մի քիչ կլարվեի, բայց կփորձեի հանգիստ խոսել։"
      },
      {
        id: 49,
        tenseId: 8,
        tenseEs: "Mezcla de tiempos",
        tenseHy: "Իրական խոսակցություն տարբեր ժամանակներով",
        questionEs: "¿Qué te gustaría haber aprendido antes de terminar este curso?",
        questionHy: "Ի՞նչ կցանկանայիր սովորած լինել մինչև այս ուսումնական տարվա ավարտը։",
        answerEs: "Me gustaría haber aprendido suficiente español para hablar con mis compañeros sin traducir mentalmente.",
        answerHy: "Կցանկանայի այնքան իսպաներեն սովորած լինել, որ կարողանայի խոսել դասընկերներիս հետ՝ առանց մտքում թարգմանելու։"
      },
      {
        id: 50,
        tenseId: 8,
        tenseEs: "Mezcla de tiempos",
        tenseHy: "Իրական խոսակցություն տարբեր ժամանակներով",
        questionEs: "¿Cómo crees que será tu vida dentro de diez años?",
        questionHy: "Քո կարծիքով՝ ինչպիսի՞ն կլինի քո կյանքը տասը տարի անց։",
        answerEs: "Creo que estaré estudiando o trabajando, hablaré varios idiomas y espero que siga teniendo buenos amigos.",
        answerHy: "Կարծում եմ՝ կսովորեմ կամ կաշխատեմ, մի քանի լեզվով կխոսեմ և հուսով եմ՝ կշարունակեմ լավ ընկերներ ունենալ։"
      }
    ]
  }
];

// All 50 flat questions for fast search & filtering
export const ALL_50_QUESTIONS: QuestionItem[] = TENSE_GROUPS.flatMap(g => g.questions);

// METHOD FOLLOW UP QUESTIONS
export const METHOD_FOLLOW_UP_QUESTIONS: TablePhrase[] = [
  { es: "¿Por qué?", hy: "Ինչո՞ւ։" },
  { es: "¿Y después qué pasó?", hy: "Իսկ հետո ի՞նչ եղավ։" },
  { es: "¿Cómo te sentiste?", hy: "Ի՞նչ զգացիր։" },
  { es: "¿Puedes darme un ejemplo?", hy: "Կարո՞ղ ես օրինակ բերել։" },
  { es: "¿Qué quieres decir?", hy: "Ի՞նչ ես ուզում ասել։" },
  { es: "¿Y tú qué opinas?", hy: "Իսկ դու ի՞նչ կարծիք ունես։" },
  { es: "¿Te ha pasado alguna vez?", hy: "Քեզ հետ երբևէ նման բան պատահե՞լ է։" },
  { es: "¿Qué habrías hecho tú?", hy: "Իսկ դու ի՞նչ կանեիր այդ իրավիճակում։" }
];

export const METHOD_GUIDELINES = {
  stage1: "Առաջին փուլում հարցրու իսպաներեն և թող աշակերտը պատասխանի թեկուզ մեկ կարճ նախադասությամբ։",
  stage2: "Երկրորդ փուլում նույն հարցերը տուր ավելի արագ, առանց հայերեն թարգմանության։",
  stage3: "Երրորդ փուլում ավելացրու խորացնող հարցերը, որպեսզի խոսակցությունը շարունակվի բնական ձևով։",
  goal: "Գլխավոր նպատակը՝ աշակերտը ոչ թե անգիր սովորի պատասխանները, այլ կարողանա նույն հարցին տարբեր ձևերով պատասխանել, բացատրել իր միտքը և շարունակել զրույցը իսպաներեն։"
};

// 1. TEEN PHRASES (25 phrases)
export const TEEN_PHRASES: TablePhrase[] = [
  { es: "¿Qué tal?", hy: "Ինչպե՞ս ես։" },
  { es: "¿Qué pasa?", hy: "Ի՞նչ կա։" },
  { es: "¿Qué haces?", hy: "Ի՞նչ ես անում։" },
  { es: "¿En serio?", hy: "Լո՞ւրջ։" },
  { es: "¡No me digas!", hy: "Չե՛ս ասում։" },
  { es: "¡Qué fuerte!", hy: "Վա՜յ, ինչ անհավանական է։" },
  { es: "¡Qué guay!", hy: "Ի՜նչ հավես է։" },
  { es: "¡Qué rollo!", hy: "Ի՜նչ ձանձրալի է։" },
  { es: "¡Venga, vamos!", hy: "Դե՛, գնացինք։" },
  { es: "¡Espera un momento!", hy: "Մի պահ սպասի՛ր։" },
  { es: "¡Date prisa!", hy: "Շտապի՛ր։" },
  { es: "¡Déjame en paz!", hy: "Հանգի՛ստ թող ինձ։" },
  { es: "¡No pasa nada!", hy: "Ոչինչ, խնդիր չկա։" },
  { es: "¡Me da igual!", hy: "Ինձ համար միևնույն է։" },
  { es: "¡Ni idea!", hy: "Գաղափար չունեմ։" },
  { es: "¡Qué vergüenza!", hy: "Ի՜նչ ամոթ է։" },
  { es: "¡Menos mal!", hy: "Լավ է, որ այդպես եղավ։" },
  { es: "¡Ojalá!", hy: "Երանի՜։" },
  { es: "¡Tienes razón!", hy: "Դու ճիշտ ես։" },
  { es: "¡No estoy de acuerdo!", hy: "Համաձայն չեմ։" },
  { es: "¡Me he equivocado!", hy: "Ես սխալվել եմ։" },
  { es: "¡Se me ha olvidado!", hy: "Մոռացել եմ։" },
  { es: "¡No es justo!", hy: "Դա արդար չէ։" },
  { es: "¡Estoy harto!", hy: "Արդեն զզվել եմ։" },
  { es: "¡No te preocupes!", hy: "Մի՛ անհանգստացիր։" }
];

// 2. EJERCICIO: ¿QUÉ RESPONDERÍAS? (8 situations)
export const WHAT_WOULD_YOU_RESPOND: WhatWouldYouRespondItem[] = [
  {
    id: 1,
    situationEs: "Tu amigo te pregunta: «¿Qué tal el examen?»",
    situationHy: "Ընկերդ հարցնում է՝ ինչպե՞ս անցավ քննությունը։",
    responseEs: "Bastante bien, creo que voy a aprobar.",
    responseHy: "Բավականին լավ, կարծում եմ՝ կհանձնեմ։"
  },
  {
    id: 2,
    situationEs: "Un compañero te dice: «¡He sacado un diez!»",
    situationHy: "Դասընկերդ ասում է՝ 10 եմ ստացել։",
    responseEs: "¡Enhorabuena! Te lo mereces, has estudiado un montón.",
    responseHy: "Շնորհավորո՜ւմ եմ։ Դու դրան արժանի ես, շատ էիր պարապել։"
  },
  {
    id: 3,
    situationEs: "Tu amigo te pregunta: «¿Vienes al parque?»",
    situationHy: "Ընկերդ հարցնում է՝ գալո՞ւ ես այգի։",
    responseEs: "¡Claro que sí! Termino los deberes y voy.",
    responseHy: "Իհա՛րկե։ Տնայինս ավարտեմ ու կգամ։"
  },
  {
    id: 4,
    situationEs: "Alguien te pregunta: «¿Dónde está Marcos?»",
    situationHy: "Ինչ-որ մեկը հարցնում է՝ որտե՞ղ է Մարկոսը։",
    responseEs: "No tengo ni idea, lo he visto antes en el recreo.",
    responseHy: "Գաղափար չունեմ, նրան ավելի վաղ տեսել էի դասամիջոցին։"
  },
  {
    id: 5,
    situationEs: "Un amigo te dice: «Perdona, he llegado tarde»",
    situationHy: "Ընկերդ ասում է՝ կներես, ուշացել եմ։",
    responseEs: "¡No pasa nada! Acabo de llegar yo también.",
    responseHy: "Ոչի՛նչ, խնդիր չկա։ Ես էլ նոր եկա։"
  },
  {
    id: 6,
    situationEs: "Tu amigo te dice: «Tengo miedo de hablar español»",
    situationHy: "Ընկերդ վախենում է իսպաներեն խոսելուց։",
    responseEs: "¡No te preocupes! Poco a poco irás hablando mejor.",
    responseHy: "Մի՛ անհանգստացիր։ Քիչ-քիչ ավելի լավ կխոսես։"
  },
  {
    id: 7,
    situationEs: "Alguien te pregunta: «¿Qué hiciste ayer?»",
    situationHy: "Քեզ հարցնում են՝ ի՞նչ արեցիր երեկ։",
    responseEs: "Fui a casa, descansé un poco e hice los deberes.",
    responseHy: "Գնացի տուն, մի քիչ հանգստացա և արեցի տնայիններս։"
  },
  {
    id: 8,
    situationEs: "Tu amigo pregunta: «¿Qué harías si suspendieras?»",
    situationHy: "Ընկերդ հարցնում է՝ ի՞նչ կանեիր, եթե քննությունը չհանձնեիր։",
    responseEs: "Estudiaría más para recuperar el examen.",
    responseHy: "Ավելի շատ կպարապեի, որպեսզի վերահանձնեմ քննությունը։"
  }
];

// 3. COMPLETA EL DIÁLOGO (8 quiz questions)
export const DIALOGUE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    speakerEs: "— Oye, ¿has hecho los deberes?",
    speakerHy: "Լսի՛ր, տնային աշխատանքդ արե՞լ ես։",
    options: [
      "Sí, los he terminado.",
      "Mañana fui al parque.",
      "Estoy doce años."
    ],
    correctIndex: 0
  },
  {
    id: 2,
    speakerEs: "— ¿Por qué estás tan callado?",
    speakerHy: "Ինչո՞ւ ես այդքան լուռ։",
    options: [
      "Porque ayer seré cansado.",
      "Porque estoy un poco nervioso.",
      "Porque tengo un balón ayer."
    ],
    correctIndex: 1
  },
  {
    id: 3,
    speakerEs: "— ¡He perdido mi móvil!",
    speakerHy: "Կորցրել եմ հեռախոսս։",
    options: [
      "¡Qué guay!",
      "¡Hasta mañana!",
      "¡Qué pena! ¿Dónde lo has visto por última vez?"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    speakerEs: "— ¿Te apetece jugar después de clase?",
    speakerHy: "Կուզե՞ս դասերից հետո խաղալ։",
    options: [
      "Sí, me apetece mucho.",
      "Sí, soy jugando.",
      "No, ayer jugaré."
    ],
    correctIndex: 0
  },
  {
    id: 5,
    speakerEs: "— ¿Qué harás este fin de semana?",
    speakerHy: "Ի՞նչ ես անելու այս հանգստյան օրերին։",
    options: [
      "He nacido hace una semana.",
      "Iré al cine con mis primos.",
      "Era feliz mañana."
    ],
    correctIndex: 1
  },
  {
    id: 6,
    speakerEs: "— ¿Te molesta que hable tan alto?",
    speakerHy: "Քեզ խանգարո՞ւմ է, որ այդքան բարձր եմ խոսում։",
    options: [
      "Sí, habla ayer.",
      "No, estás ayer.",
      "Un poco. Prefiero que hables más bajo."
    ],
    correctIndex: 2
  },
  {
    id: 7,
    speakerEs: "— ¿Cómo te fue el partido?",
    speakerHy: "Ինչպե՞ս անցավ խաղդ։",
    options: [
      "Ganamos dos a uno. ¡Fue emocionante!",
      "Ganaremos ayer.",
      "Nosotros somos ganar."
    ],
    correctIndex: 0
  },
  {
    id: 8,
    speakerEs: "— ¿Qué harías si pudieras viajar gratis?",
    speakerHy: "Ի՞նչ կանեիր, եթե կարողանայիր անվճար ճանապարհորդել։",
    options: [
      "Viajo ayer.",
      "Visitaría muchos países.",
      "He visitar mañana."
    ],
    correctIndex: 1
  }
];

// 4. RESPONDE RÁPIDO (20 fast Q&A)
export const FAST_QA: FastQAItem[] = [
  {
    id: 1,
    questionEs: "¿Qué tal te ha ido hoy?",
    questionHy: "Ինչպե՞ս անցավ օրդ։",
    answerEs: "Bastante bien, aunque estoy un poco cansado.",
    answerHy: "Բավականին լավ, չնայած մի քիչ հոգնած եմ։"
  },
  {
    id: 2,
    questionEs: "¿Por qué tienes tanta prisa?",
    questionHy: "Ինչո՞ւ ես այդքան շտապում։",
    answerEs: "Porque llego tarde a clase.",
    answerHy: "Որովհետև դասից ուշանում եմ։"
  },
  {
    id: 3,
    questionEs: "¿Qué haces cuando te aburres?",
    questionHy: "Ի՞նչ ես անում, երբ ձանձրանում ես։",
    answerEs: "Escucho música o salgo a dar una vuelta.",
    answerHy: "Երաժշտություն եմ լսում կամ դուրս եմ գալիս զբոսնելու։"
  },
  {
    id: 4,
    questionEs: "¿Te has enfadado con alguien últimamente?",
    questionHy: "Վերջերս որևէ մեկի վրա բարկացե՞լ ես։",
    answerEs: "Sí, pero ya hemos hablado y todo está bien.",
    answerHy: "Այո՛, բայց արդեն խոսել ենք, և ամեն ինչ կարգին է։"
  },
  {
    id: 5,
    questionEs: "¿Qué estabas haciendo ayer a las ocho?",
    questionHy: "Ի՞նչ էիր անում երեկ ժամը ութին։",
    answerEs: "Estaba cenando con mi familia.",
    answerHy: "Ընտանիքիս հետ ընթրում էի։"
  },
  {
    id: 6,
    questionEs: "¿Qué hiciste el sábado pasado?",
    questionHy: "Ի՞նչ արեցիր անցած շաբաթ օրը։",
    answerEs: "Quedé con mis amigos y fuimos al parque.",
    answerHy: "Հանդիպեցի ընկերներիս, և գնացինք այգի։"
  },
  {
    id: 7,
    questionEs: "¿Alguna vez te has perdido en una ciudad?",
    questionHy: "Երբևէ մոլորվե՞լ ես որևէ քաղաքում։",
    answerEs: "No, pero una vez casi me perdí.",
    answerHy: "Ո՛չ, բայց մի անգամ քիչ էր մնում մոլորվեի։"
  },
  {
    id: 8,
    questionEs: "¿Qué te gustaría hacer mañana?",
    questionHy: "Ի՞նչ կցանկանայիր անել վաղը։",
    answerEs: "Me gustaría ir a jugar al fútbol.",
    answerHy: "Կցանկանայի գնալ ֆուտբոլ խաղալու։"
  },
  {
    id: 9,
    questionEs: "¿Qué harías si tu amigo te mintiera?",
    questionHy: "Ի՞նչ կանեիր, եթե ընկերդ քեզ ստեր։",
    answerEs: "Hablaría con él para saber por qué me ha mentido.",
    answerHy: "Կխոսեի նրա հետ՝ հասկանալու, թե ինչու է ինձ ստել։"
  },
  {
    id: 10,
    questionEs: "¿Qué esperas que pase este fin de semana?",
    questionHy: "Ի՞նչ ես հույս ունենում, որ տեղի կունենա այս հանգստյան օրերին։",
    answerEs: "Espero que haga buen tiempo para salir.",
    answerHy: "Հուսով եմ, որ լավ եղանակ կլինի՝ դուրս գալու համար։"
  },
  {
    id: 11,
    questionEs: "¿Te da vergüenza hablar delante de la clase?",
    questionHy: "Ամաչո՞ւմ ես դասարանի առաջ խոսել։",
    answerEs: "A veces sí, pero intento superar la vergüenza.",
    answerHy: "Երբեմն՝ այո՛, բայց փորձում եմ հաղթահարել ամաչկոտությունս։"
  },
  {
    id: 12,
    questionEs: "¿Qué es lo que más te molesta del colegio?",
    questionHy: "Դպրոցում ի՞նչն է քեզ ամենաշատը նյարդայնացնում։",
    answerEs: "Que tengamos tantos deberes.",
    answerHy: "Այն, որ այդքան շատ տնային աշխատանքներ ունենք։"
  },
  {
    id: 13,
    questionEs: "¿Qué le dirías a alguien que se burla de un compañero?",
    questionHy: "Ի՞նչ կասեիր մեկին, որը ծաղրում է դասընկերոջը։",
    answerEs: "Le diría que dejara de hacerlo y que respetara a los demás.",
    answerHy: "Կասեի, որ դադարեցնի և հարգի մյուսներին։"
  },
  {
    id: 14,
    questionEs: "¿Qué hacías cuando eras más pequeño?",
    questionHy: "Ի՞նչ էիր անում, երբ ավելի փոքր էիր։",
    answerEs: "Jugaba mucho con mis juguetes y veía dibujos animados.",
    answerHy: "Շատ էի խաղում խաղալիքներով և մուլտֆիլմեր դիտում։"
  },
  {
    id: 15,
    questionEs: "¿Has tenido alguna sorpresa esta semana?",
    questionHy: "Այս շաբաթ որևէ անակնկալ ունեցե՞լ ես։",
    answerEs: "Sí, un amigo me ha regalado algo inesperado.",
    answerHy: "Այո՛, ընկերս անսպասելի նվեր է տվել ինձ։"
  },
  {
    id: 16,
    questionEs: "¿Qué harás si mañana no tienes deberes?",
    questionHy: "Ի՞նչ կանես, եթե վաղը տնային աշխատանք չունենաս։",
    answerEs: "Saldré con mis amigos y descansaré.",
    answerHy: "Դուրս կգամ ընկերներիս հետ և կհանգստանամ։"
  },
  {
    id: 17,
    questionEs: "¿Qué prefieres, trabajar solo o en equipo?",
    questionHy: "Ի՞նչ ես նախընտրում՝ մենա՞կ աշխատել, թե՞ թիմով։",
    answerEs: "Prefiero trabajar en equipo porque podemos ayudarnos.",
    answerHy: "Նախընտրում եմ թիմով աշխատել, որովհետև կարող ենք իրար օգնել։"
  },
  {
    id: 18,
    questionEs: "¿Te gusta que tus amigos te den consejos?",
    questionHy: "Սիրո՞ւմ ես, երբ ընկերներդ քեզ խորհուրդներ են տալիս։",
    answerEs: "Sí, siempre que me hablen con respeto.",
    answerHy: "Այո՛, եթե ինձ հետ հարգանքով խոսեն։"
  },
  {
    id: 19,
    questionEs: "¿Qué cambiarías si fueras director de tu colegio?",
    questionHy: "Ի՞նչ կփոխեիր, եթե դպրոցի տնօրենը լինեիր։",
    answerEs: "Organizaría más excursiones y actividades divertidas.",
    answerHy: "Ավելի շատ էքսկուրսիաներ և հետաքրքիր միջոցառումներ կկազմակերպեի։"
  },
  {
    id: 20,
    questionEs: "¿Qué has hecho hoy que te haya hecho feliz?",
    questionHy: "Ի՞նչ ես արել այսօր, որը քեզ ուրախացրել է։",
    answerEs: "He pasado tiempo con mis amigos y nos hemos reído mucho.",
    answerHy: "Ժամանակ եմ անցկացրել ընկերներիս հետ, և շատ ենք ծիծաղել։"
  }
];

// 5. TRADUCE Y HABLA (15 sentences)
export const TRANSLATE_ITEMS: TranslateItem[] = [
  {
    id: 1,
    armenian: "Ես դեռ չեմ ավարտել տնային աշխատանքս։",
    spanish: "Todavía no he terminado mis deberes."
  },
  {
    id: 2,
    armenian: "Երեկ ուշացա, որովհետև ավտոբուսը չեկավ։",
    spanish: "Ayer llegué tarde porque el autobús no vino."
  },
  {
    id: 3,
    armenian: "Կուզեի, որ ուսուցիչը նորից բացատրեր։",
    spanish: "Me gustaría que el profesor lo explicara otra vez."
  },
  {
    id: 4,
    armenian: "Հուսով եմ, որ վաղը քննություն չի լինի։",
    spanish: "Espero que mañana no haya ningún examen."
  },
  {
    id: 5,
    armenian: "Երբ փոքր էի, ամեն օր ֆուտբոլ էի խաղում։",
    spanish: "Cuando era pequeño, jugaba al fútbol todos los días."
  },
  {
    id: 6,
    armenian: "Եթե ժամանակ ունենամ, կգնամ ընկերներիս հետ։",
    spanish: "Si tengo tiempo, iré con mis amigos."
  },
  {
    id: 7,
    armenian: "Ինձ դուր չի գալիս, երբ ինձ ընդհատում են։",
    spanish: "No me gusta que me interrumpan."
  },
  {
    id: 8,
    armenian: "Ես չէի կարող պատասխանել, որովհետև հարցը չէի հասկանում։",
    spanish: "No podía responder porque no entendía la pregunta."
  },
  {
    id: 9,
    armenian: "Ես քո փոխարեն ուսուցչից օգնություն կխնդրեի։",
    spanish: "Yo en tu lugar le pediría ayuda al profesor."
  },
  {
    id: 10,
    armenian: "Ուզում եմ, որ դու ինձ ճշմարտությունն ասես։",
    spanish: "Quiero que me digas la verdad."
  },
  {
    id: 11,
    armenian: "Երանի ավելի շատ ազատ ժամանակ ունենայի։",
    spanish: "¡Ojalá tuviera más tiempo libre!"
  },
  {
    id: 12,
    armenian: "Մենք արդեն տեսել ենք այդ ֆիլմը։",
    spanish: "Ya hemos visto esa película."
  },
  {
    id: 13,
    armenian: "Երբ տուն հասա, մայրս ճաշ էր պատրաստում։",
    spanish: "Cuando llegué a casa, mi madre estaba preparando la comida."
  },
  {
    id: 14,
    armenian: "Ի՞նչ կանեիր, եթե լավագույն ընկերդ տեղափոխվեր այլ քաղաք։",
    spanish: "¿Qué harías si tu mejor amigo se mudara a otra ciudad?"
  },
  {
    id: 15,
    armenian: "Չեմ կարծում, որ դա լավ գաղափար է։",
    spanish: "No creo que sea una buena idea."
  }
];

// 6. JUEGO — CONTINÚA LA CONVERSACIÓN (5 situations)
export const DIALOGUE_SITUATIONS: DialogueSituation[] = [
  {
    id: 1,
    titleEs: "Situación 1 — En el recreo",
    titleHy: "Իրավիճակ 1 — Դասամիջոցին",
    personAEs: "— Oye, ¿por qué no has venido a jugar?",
    personAHy: "— Լսի՛ր, ինչո՞ւ չես եկել խաղալու։",
    personBEs: "— Porque tenía que terminar un ejercicio. Pero ahora ya estoy libre. ¿Jugamos?",
    personBHy: "— Որովհետև պետք է ավարտեի վարժությունս։ Բայց հիմա արդեն ազատ եմ։ Խաղա՞նք։"
  },
  {
    id: 2,
    titleEs: "Situación 2 — Un examen difícil",
    titleHy: "Իրավիճակ 2 — Դժվար քննություն",
    personAEs: "— ¿Qué tal te ha salido el examen?",
    personAHy: "— Ինչպե՞ս ես գրել քննությունը։",
    personBEs: "— Regular. Algunas preguntas eran fáciles, pero otras me parecieron muy difíciles. Espero aprobar.",
    personBHy: "— Այնքան էլ լավ չէ։ Որոշ հարցեր հեշտ էին, բայց մյուսներն ինձ շատ դժվար թվացին։ Հուսով եմ՝ կհանձնեմ։"
  },
  {
    id: 3,
    titleEs: "Situación 3 — Planes para el sábado",
    titleHy: "Իրավիճակ 3 — Շաբաթ օրվա ծրագրեր",
    personAEs: "— ¿Qué te apetece hacer el sábado?",
    personAHy: "— Ի՞նչ կուզեիր անել շաբաթ օրը։",
    personBEs: "— Podríamos ir al cine. Si hace buen tiempo, también podemos dar una vuelta por el centro.",
    personBHy: "— Կարող էինք կինոթատրոն գնալ։ Եթե լավ եղանակ լինի, կարող ենք նաև կենտրոնում զբոսնել։"
  },
  {
    id: 4,
    titleEs: "Situación 4 — Un problema entre amigos",
    titleHy: "Իրավիճակ 4 — Խնդիր ընկերների միջև",
    personAEs: "— ¿Por qué estás enfadado con Pablo?",
    personAHy: "— Ինչո՞ւ ես բարկացած Պաբլոյի վրա։",
    personBEs: "— Porque me prometió algo y no cumplió su palabra. Quiero que hablemos y solucionemos el problema.",
    personBHy: "— Որովհետև նա ինձ մի բան խոստացավ և խոսքը չպահեց։ Ուզում եմ, որ խոսենք և լուծենք խնդիրը։"
  },
  {
    id: 5,
    titleEs: "Situación 5 — Hablar español",
    titleHy: "Իրավիճակ 5 — Իսպաներեն խոսելը",
    personAEs: "— ¿Por qué te cuesta responder en español?",
    personAHy: "— Ինչո՞ւ ես դժվարանում իսպաներեն պատասխանել։",
    personBEs: "— Porque a veces pienso primero en mi idioma y después traduzco. Quiero hablar de forma más natural.",
    personBHy: "— Որովհետև երբեմն սկզբում մտածում եմ իմ լեզվով, հետո թարգմանում։ Ուզում եմ ավելի բնական խոսել։"
  }
];

// 7. FRASES PARA GANAR TIEMPO (14 phrases)
export const FILLER_PHRASES: TablePhrase[] = [
  { es: "A ver, déjame pensar.", hy: "Սպասի՛ր, մտածեմ։" },
  { es: "Pues... no lo sé exactamente.", hy: "Դե՜... հստակ չգիտեմ։" },
  { es: "Es una buena pregunta.", hy: "Լավ հարց է։" },
  { es: "La verdad es que...", hy: "Ճիշտն ասած..." },
  { es: "Bueno, depende.", hy: "Դե, կախված է։" },
  { es: "¿Cómo puedo explicarlo?", hy: "Ինչպե՞ս բացատրեմ։" },
  { es: "Lo que quiero decir es que...", hy: "Այն, ինչ ուզում եմ ասել, այն է, որ..." },
  { es: "Por ejemplo...", hy: "Օրինակ..." },
  { es: "En mi opinión...", hy: "Իմ կարծիքով..." },
  { es: "Si no me equivoco...", hy: "Եթե չեմ սխալվում..." },
  { es: "No estoy muy seguro.", hy: "Այնքան էլ վստահ չեմ։" },
  { es: "¿Puedes repetir la pregunta?", hy: "Կարո՞ղ ես կրկնել հարցը։" },
  { es: "¿Qué significa esa palabra?", hy: "Ի՞նչ է նշանակում այդ բառը։" },
  { es: "Ahora lo entiendo.", hy: "Հիմա հասկանում եմ։" }
];

export const TEACHER_TIP = "Ինչպես անցկացնել դասը. Ամեն հարցի ժամանակ թող աշակերտը նախ պատասխանի կարճ, հետո ավելացնի «porque», «pero», «aunque» կամ «por ejemplo»՝ միտքն ընդլայնելու համար։ Այսպես նա կսովորի ոչ միայն ճիշտ ժամանակ ընտրել, այլև իրական զրույց վարել իսպաներեն։";

export const calculateAuraNumbers = (name, birthdate) => {
  // birthdate is expected in dd/mm/yyyy

  // Helper to reduce a number to a single digit (except master numbers 11, 22, 33)
  const reduceNumber = (num, allowMasterNumbers = true) => {
    while (num > 9) {
      if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
        break;
      }
      num = num.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
    }
    return num;
  };

  const [dayStr, monthStr, yearStr] = birthdate.split('/');

  // 1. Esencia (Tántrica): Sum of day of birth
  const daySum = dayStr.split('').reduce((acc, val) => acc + parseInt(val), 0);
  const esencia = reduceNumber(daySum, true); // Allows 11, 22

  // 2. Karma (Tántrica): Sum of month of birth
  const monthSum = monthStr.split('').reduce((acc, val) => acc + parseInt(val), 0);
  const karma = reduceNumber(monthSum, false); // Does not strictly allow master numbers in Karma according to rules, but reducing naturally. Rule says 1-9.

  // 3. Destino/Vidas Pasadas/Talento: Sum of all digits in birth year
  const yearSum = yearStr.split('').reduce((acc, val) => acc + parseInt(val), 0);
  const talento = reduceNumber(yearSum, true); // Allows 11, 22, 33

  // 4. Año Personal: Day + Month + Current Year
  const currentYear = new Date().getFullYear();
  const getPersonalYear = (targetYear) => {
    // Regla: Suma los dígitos del día, los dígitos del mes y los dígitos del año a consultar de forma lineal.
    const daySumDigits = dayStr.split('').reduce((acc, val) => acc + parseInt(val), 0);
    const monthSumDigits = monthStr.split('').reduce((acc, val) => acc + parseInt(val), 0);
    const yearDigits = targetYear.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);

    // Luego, reduce el resultado final a un solo dígito estrictamente del 1 al 9.
    const personalSum = daySumDigits + monthSumDigits + yearDigits;
    return reduceNumber(personalSum, false); // false = NO Master Numbers allowed
  };

  const currentYearPersonalNumber = getPersonalYear(currentYear);

  // Regla de reinicio del ciclo (1-9)
  const pastPersonalNumber = currentYearPersonalNumber === 1 ? 9 : currentYearPersonalNumber - 1;
  const futurePersonalNumber = currentYearPersonalNumber === 9 ? 1 : currentYearPersonalNumber + 1;

  const personalYearConcepts = {
    1: "Nuevos comienzos, siembra, independencia y acción.",
    2: "Relaciones, paciencia, alianzas y gestación.",
    3: "Comunicación, creatividad, expansión y vida social.",
    4: "Estructura, trabajo duro, bases sólidas y orden.",
    5: "Cambios, libertad, movimiento y adaptación.",
    6: "Familia, responsabilidad, armonía y sanación.",
    7: "Introspección, espiritualidad, estudio y replanteamiento.",
    8: "Cosecha, finanzas, empoderamiento y logros materiales.",
    9: "Cierres de ciclo, soltar, limpieza y culminación."
  };

  const personalYears = {
    past: {
      number: pastPersonalNumber,
      concept: personalYearConcepts[pastPersonalNumber]
    },
    current: {
      number: currentYearPersonalNumber,
      concept: personalYearConcepts[currentYearPersonalNumber]
    },
    future: {
      number: futurePersonalNumber,
      concept: personalYearConcepts[futurePersonalNumber]
    }
  };

  // PLACEHOLDERS FOR DESCRIPTIONS - USER WILL REPLACE THESE
  const descriptions = {
    esencia: {
      1: "Tu esencia es la de un líder nato. Naciste para abrir caminos, tomar iniciativa y confiar en tu propia fuerza. Tu mensaje: Atrévete a brillar por ti misma; tu independencia es tu mayor poder. No naciste para seguir los pasos de otros, sino para crear los tuyos.",
      2: "Tu esencia es el amor, la empatía y la colaboración. Tienes el don de unir a las personas y crear armonía donde vayas. Tu mensaje: Tu sensibilidad es tu magia, no tu debilidad. Aprende a poner límites y a cuidarte a ti misma tanto como cuidas a los demás.",
      3: "Tu esencia es la alegría, la creatividad y la autoexpresión. Naciste para brillar a través de tu voz y tu magnetismo natural. Tu mensaje: El mundo necesita tu luz y tu risa. No te apagues por intentar encajar; atrévete a mostrarte tal y como eres.",
      4: "Tu esencia es la solidez, la lealtad y la disciplina. Eres el pilar donde otros se apoyan, con gran capacidad para materializar ideas. Tu mensaje: Confía en tus procesos paso a paso. Eres capaz de construir imperios, pero recuerda también permitirte fluir y disfrutar el camino.",
      5: "Tu esencia es la aventura, el cambio y la libertad. Naciste para experimentar la vida al máximo, viajar y romper estructuras. Tu mensaje: No le temas al movimiento ni a lo imprevisto, ahí está tu evolución. Tu alma no vino a quedarse quieta ni a cumplir expectativas ajenas.",
      6: "Tu esencia es la familia, el amor y el servicio. Tienes un corazón inmenso y un talento natural para crear un \"hogar\" y dar contención. Tu mensaje: Eres el refugio de muchos, pero recuerda que no tienes que salvar a todos. Tu primer hogar y tu prioridad debes ser tú misma.",
      7: "Tu esencia es la sabiduría, la espiritualidad y la mente analítica. Naciste para investigar, profundizar y enseñar tu verdad al mundo. Tu mensaje: Confía ciegamente en tu intuición y en tu rico mundo interior. Las respuestas que tanto buscas afuera, ya habitan dentro de ti.",
      8: "Tu esencia es el poder personal, la abundancia y el liderazgo ejecutivo. Tienes una capacidad inmensa para materializar el éxito y los recursos. Tu mensaje: Reclama tu poder y tu prosperidad sin culpa. Naciste para ser abundante y dirigir tu vida con fuerza y justicia.",
      9: "Tu esencia es la compasión, el cierre de ciclos y el amor universal. Eres un alma vieja y sabia que vino a entregar su luz. Tu mensaje: Suelta el pasado con amor y sin apegos. Tu propósito es más grande que tus miedos; viniste a dejar una huella hermosa en la humanidad.",
      11: "Tu esencia es la inspiración y la intuición profunda. Eres un canal espiritual puro con una sensibilidad extrema hacia la energía. Tu mensaje: Tu alta sensibilidad no es una carga, es tu mayor radar. Confía en lo que sientes; viniste a ser un faro y a guiar a otros con tu luz.",
      22: "Tu esencia es la materialización a gran escala. Tienes la visión de un soñador gigante y la fuerza de un arquitecto imparable. Tu mensaje: No te asustes del tamaño de tus sueños. Tienes la capacidad absoluta de bajar tus más grandes visiones a la realidad y dejar un legado duradero.",
      33: "Representas el amor universal y el servicio desinteresado."
    },
    karma: {
      1: "Tu gran reto en esta vida es aprender a confiar en ti misma y tomar la iniciativa. Tu tarea: Viniste a vencer la inseguridad, dejar de depender de la aprobación de otros y atreverte a liderar tu propio camino con valentía.",
      2: "Tu aprendizaje principal es equilibrar tus relaciones y no perderte en el otro. Tu tarea: Viniste a sanar la dependencia emocional, aprender a poner límites sanos y entender que no tienes que complacer a todos para ser valorada.",
      3: "Tu gran reto es perder el miedo al \"qué dirán\" y usar tu propia voz. Tu tarea: Viniste a sanar la herida de no sentirte escuchada, a soltar la timidez y permitirte brillar, comunicar y disfrutar la vida sin culpa.",
      4: "Tu tarea pendiente es vencer la inconstancia o el miedo al esfuerzo sostenido. Tu tarea: Viniste a aprender el valor de la disciplina, a echar raíces, estructurar tus proyectos y no rendirte ante la primera frustración.",
      5: "Tu gran reto es perderle el miedo a lo imprevisto y soltar el control rígido. Tu tarea: Viniste a sanar el miedo a la inestabilidad, aprender a fluir con los cambios y entender que la verdadera libertad nace desde tu interior.",
      6: "Tu aprendizaje es dejar de sacrificarte en exceso por tu familia o entorno. Tu tarea: Viniste a sanar la necesidad de ser \"la salvadora\" que todo lo resuelve. Tu mayor reto es aprender a recibir y darte prioridad a ti misma.",
      7: "Tu gran reto es vencer la mente hiperanalítica, la duda constante y el perfeccionismo. Tu tarea: Viniste a sanar la desconexión espiritual, a dejar de buscar respuestas afuera y aprender a confiar ciegamente en tu propia intuición.",
      8: "Tu tarea pendiente es reconciliarte con el dinero, el éxito y tu propio valor. Tu tarea: Viniste a sanar el miedo a asumir tu poder, a dejar de conformarte con poco y aprender a materializar la abundancia que realmente mereces.",
      9: "Tu gran reto es aprender a cerrar ciclos sin quedarte estancada en el pasado. Tu tarea: Viniste a soltar rencores, perdonar, dejar ir con amor lo que ya cumplió su ciclo y entregarte al servicio de los demás.",
      11: "Tu aprendizaje supremo es dominar tu alta sensibilidad en lugar de esconderte de ella. Tu tarea: Viniste a sanar el sentirte la \"oveja negra\" o incomprendida, proteger tu energía emocional y usar tu intuición para guiar a otros.",
      22: "Debes evitar usar tu poder para fines puramente egoístas.",
      33: "Tu karma es sacrificarte por los demás sin olvidarte de ti mismo."
    },
    talento: {
      1: "Traes de vidas pasadas una gran capacidad para dirigir y abrir nuevos caminos. Tu don natural: Tienes el talento de la independencia, la innovación y la valentía para tomar decisiones rápidas. Eres un pionero que no teme empezar de cero.",
      2: "Traes el don natural de la colaboración, el tacto y la diplomacia. Tu don natural: Tienes una sensibilidad especial para escuchar, unir a las personas y resolver conflictos creando paz y armonía a tu alrededor.",
      3: "Traes de tus experiencias pasadas el don de la palabra, la creatividad y la alegría. Tu don natural: Tienes un carisma irresistible. Tu mayor talento es comunicar, inspirar a otros con tu voz y ver el lado brillante de la vida.",
      4: "Traes la capacidad innata de dar forma física a las ideas. Tu don natural: Tienes el talento del orden, la disciplina y la perseverancia. Eres excelente estructurando proyectos y creando bases sólidas que perduran en el tiempo.",
      5: "Traes un alma viajera y versátil, lista para experimentar. Tu don natural: Tienes el talento de fluir con los cambios y encontrar soluciones rápidas e innovadoras. Tu mente abierta te permite adaptarte a cualquier situación o lugar.",
      6: "Traes el don del amor incondicional y la sanación. Tu don natural: Tienes un talento nato para aconsejar, nutrir emocionalmente a los demás y embellecer cualquier espacio. Tu energía hace que todos se sientan \"en casa\" contigo.",
      7: "Traes una conexión espiritual y mental muy elevada. Tu don natural: Tienes el talento de la observación, la investigación y una intuición aguda. Tu mente es capaz de ver más allá de lo superficial y encontrar verdades profundas.",
      8: "Traes el don de la prosperidad y el manejo de grandes energías. Tu don natural: Tienes talento para los negocios, la organización y la manifestación de recursos materiales. Sabes cómo tomar el control y multiplicar la abundancia.",
      9: "Traes un alma evolucionada con una profunda comprensión del dolor humano. Tu don natural: Tienes el talento de la compasión, la tolerancia y la generosidad desinteresada. Eres un sanador natural que inspira a través del ejemplo.",
      11: "Traes un don maestro de alta frecuencia vibratoria. Tu don natural: Tienes una intuición extrema y habilidades espirituales innatas. Eres un canal de luz; tu sola presencia o tus palabras tienen el poder de elevar la consciencia de los demás.",
      22: "Traes el don más potente de materialización a gran escala. Tu don natural: Tienes el talento de soñar en gigante y, al mismo tiempo, la capacidad práctica para bajar esos sueños a la realidad y crear estructuras que beneficien a muchas personas.",
      33: "Tienes el don supremo de dar amor incondicional y guía."
    }
  };

  const safeGet = (category, num) => {
    return category[num] || category[1]; // fallback
  };

  return {
    esencia: {
      number: esencia,
      description: safeGet(descriptions.esencia, esencia)
    },
    karma: {
      number: karma,
      description: safeGet(descriptions.karma, karma)
    },
    talento: {
      number: talento,
      description: safeGet(descriptions.talento, talento)
    },
    personalYears
  };
};

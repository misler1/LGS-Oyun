// data.js
export const GAMES = [
  // 1 — DOĞRU/YANLIŞ
  {
    category: "📅 Bir Gün Önce", catColor: "#7C3AED", catBg: "#EDE9FE",
    type: "tf",
    title: "Doğru mu, Yanlış mı?",
    instruction: "Aşağıdaki ifadeyi okuyun ve doğru olup olmadığına karar verin.",
    statement: "LGS'den bir gün önce hiç bilmediğim yeni konuları çalışmalıyım — ne kadar çok konu çalışırsam o kadar iyi!",
    answer: false,
    tip: "✨ Son günde yeni konu öğrenmek kafa karışıklığı ve strese neden olur. Bu gün tekrar günü değil, dinlenme günüdür. Zihnin ve bedenini dinlendir."
  },
  // 2 — MCQ
  {
    category: "📅 Bir Gün Önce", catColor: "#7C3AED", catBg: "#EDE9FE",
    type: "mcq",
    title: "En doğru davranış hangisi?",
    instruction: "Sınav öncesi akşam için doğru seçeneği işaretle.",
    options: [
      "Çantamı sınav sabahı hazırlarım, vakti var",
      "Kimliğimi, giriş belgemi, kalemimi, silgimi ve kalemtıraşımı akşamdan hazırlarım",
      "Sadece kalemi ve silgiyi hazırlarım, diğerleri hiç önemli değil",
      "Zaten her şey çantamda, kontrol etmeme gerek yok"
    ],
    correct: 1,
    tip: "✨ Kimlik, sınav giriş belgesi, kalem, silgi, kalemtıraş — hepsini akşamdan hazırla. Bu hazırlığı sabah yapmak gereksiz stres sebebi ve vakit kaybıdır."
  },
  // 3 — MCQ | Bir gün önce: uyku saati
  {
    category: "😴 Bir Gün Önce", catColor: "#7C3AED", catBg: "#EDE9FE",
    type: "mcq",
    title: "En geç saat kaçta yatmalısın?",
    instruction: "Sınavdan önceki akşam zihnini ve bedenini dinlendirmek için en ideal yatma saatini seç.",
    options: [
      "Gece yarısını geçe (01:00 - 02:00 gibi), ne kadar geç o kadar iyi",
      "Sınav heyecanından dolayı hiç uyumamalıyım",
      "Akşam en geç 22:30'da yatmaya çalışmalıyım",
      "Akşamüstü saat 18:00'de hemen uyumalıyım"
    ],
    correct: 2,
    tip: "✨ Sınavdan önceki akşam en geç 22:30'da yatmaya çalış. Uyku; hafıza, dikkat ve karar alma için en güçlü destekçidir. Geç uyumak ertesi gün performansını olumsuz etkiler."
  },
  // 4 — DOĞRU/YANLIŞ
  {
    category: "📅 Bir Gün Önce", catColor: "#7C3AED", catBg: "#EDE9FE",
    type: "tf",
    title: "Doğru mu, Yanlış mı?",
    instruction: "Aşağıdaki ifadeyi değerlendirin.",
    statement: "Sınav öncesi akşam sosyal medyadan sınav ile ilgili konuları takip etmem. Göreceğim, duyacağım bir şey beni olumsuz etkileyebilir",
    answer: true,
    tip: "✨ Başkalarının paylaşımları gereksiz karşılaştırma ve kaygıya neden olur. Sınavdan önceki akşam telefonla ilgilenme. Dinlen ve kendine odaklan — herkesin yolu farklıdır."
  },
  // 5 — MCQ
  {
    category: "🌅 Sınav Sabahı", catColor: "#0D9488", catBg: "#CCFBF1",
    type: "mcq",
    title: "Sınav sabahı kahvaltıda ne yapmalısın?",
    instruction: "En doğru seçeneği işaretle.",
    options: [
      "Aç karnına gideyim, midem doluyken konsantre olamam",
      "Çok enerji lazım, aşırı yağlı ve fast food tarzı yiyecekler yiyeyim",
      "Yumurta, peynir, ekmek gibi hafif ve alışık olduğum gıdalar yiyeyim",
      "Sadece bir bardak meyve suyu içip çıkayım"
    ],
    correct: 2,
    tip: "✨ Kahvaltını mutlaka yap ama mideni zorlama. Hafif, alışık olduğun ve dengeli bir kahvaltı beyin performansını destekler. Alışık olmadığın veya ağır yiyeceklerden sınav sabahı uzak dur."
  },
  // 6 — MCQ | Sınav sabahı: kaç dakika önce binada ol
  {
    category: "🌅 Sınav Sabahı", catColor: "#0D9488", catBg: "#CCFBF1",
    type: "mcq",
    title: "Sınav binasında saat kaçta olmalısın?",
    instruction: "Sabah sürprizleriyle (trafik, park yeri vb.) karşılaşmamak için en doğru zamanı işaretle.",
    options: [
      "Sınavın başlamasına tam 5 dakika kala kapıda olsam yeter",
      "En az 25-30 dakika önce sınav binasında hazır bulunmalıyım",
      "Sınavdan 3 saat önce gidip okul bahçesinde beklemeliyim",
      "Sınav başladıktan sonra gitsem de olur"
    ],
    correct: 1,
    tip: "✨ En az 25-30 dakika önce sınav binasında ol. Trafik, yanlış giriş, uzak otopark — bunlar sabah sürpriz yaratabilir. Kapıya koşarak girmek stresi artırır."
  },
  // 7 — EŞLEŞTİRME
  {
    category: "🌅 Sınav Sabahı", catColor: "#0D9488", catBg: "#CCFBF1",
    type: "match",
    title: "Eşleştir!",
    instruction: "Sınav sabahı durumlarını doğru tepkiyle eşleştir.",
    pairs: [
      ["Gerginlik hissedersen", "Nefes egzersizi yap"],
      ["Hafif ve dengeli bir", "Kahvaltı yap"],
      ["Son dakika ders çalışmak", "Stresi artırır ve zihni karıştırır"],
      ["Yola çıkmadan önce", "Kimlik ve giriş belgesini kontrol et"]
    ],
    tip: "✨ Sınav sabahı rutinine sadık kalmak; sakin, tok ve dinç olmak başarına katkı sağlar. Son dakika yeni şeyler öğrenmeye çalışmak yalnızca kafa karıştırır."
  },
  // 8 — BOŞLUK DOLDUR
  {
    category: "🌅 Sınav Sabahı", catColor: "#0D9488", catBg: "#CCFBF1",
    type: "fill",
    title: "Doğru adımı bul!",
    instruction: "Nefes egzersizinin doğru sırasını tamamla.",
    before: "4 say nefes al → 4 say ",
    blank: "tut",
    after: " → 4 say ver. Birkaç kez tekrarla.",
    options: ["tut", "ver", "unut", "bırak"],
    tip: "✨ 4-4-4 nefes tekniği kaygıyı hızla azaltmaya yardımcı olur. Beden sakinleşince zihin de toparlanır. Bu tekniği bekleme sırasında veya sınav içinde her an kullanabilirsin."
  },
  // 9 — DOĞRU/YANLIŞ
  {
    category: "✏️ Sınav Anında", catColor: "#D97706", catBg: "#FEF3C7",
    type: "tf",
    title: "Doğru mu, Yanlış mı?",
    instruction: "Aşağıdaki ifadeyi değerlendirin.",
    statement: "Zor bir soruda uzun süre uğraşmak zaman kaybına ve devamında süreyi verimsiz kullanmaya neden olur.",
    answer: true,
    tip: "✨ Bir soruda takıldığında işaret koy ve ilerle. Bildiğin soruları kaçırmak, bilmediğin bir soruda ısrar etmekten çok daha büyük kayıptır. Takıldığın soruları en sona bırak, diğer soruları çözdükten sonra dönersin."
  },
  // 10 — MCQ
  {
    category: "✏️ Sınav Anında", catColor: "#D97706", catBg: "#FEF3C7",
    type: "mcq",
    title: "Zor bir soruyla karşılaştığında ne düşünmelisin?",
    instruction: "En sağlıklı iç sesi seç.",
    options: [
      "\"Yapamıyorum, olmayacak! Her şey mahvoldu.\"",
      "\"Bu soru zor geldi ama diğer soruları yapabilirim.\"",
      "\"Herkes bu soruyu çözüyor, ben neden çözemiyorum?\"",
      "\"Bütün sorular zor, hiçbirini yapamayacağım.\""
    ],
    correct: 1,
    tip: "✨ Zihin duyduğuna inanır. \"Bu soru zor geldi, ama diğerlerini yapabilirim\" demek seni toplar ve devam ettirir. Kendine adil ve yapıcı davran."
  },
  // 11 — EŞLEŞTİRME
  {
    category: "✏️ Sınav Anında", catColor: "#D97706", catBg: "#FEF3C7",
    type: "match",
    title: "Eşleştir!",
    instruction: "Sınav anı durumlarını doğru davranışla eşleştir.",
    pairs: [
      ["Cevabı değiştirmek istediğinde", "Kesin emin değilsen değiştirme"],
      ["Bir soruda takılırsan", "İşaret koy, sonraki soruya geç"],
      ["Stres hissedersen", "Dur; 4 saniye nefes al, 4 saniye tut, 4 saniye ver"],
      ["Son 10 dakikada", "Optik formu kontrol et"]
    ],
    tip: "✨ İlk içgüdün çoğunlukla doğrudur. Cevabı kesin bir sebep olmadan değiştirme. Zamanı iyi yönet ve son dakikada optik formu mutlaka gözden geçir."
  },
  // 12 — DOĞRU/YANLIŞ
  {
    category: "✏️ Sınav Anında", catColor: "#D97706", catBg: "#FEF3C7",
    type: "tf",
    title: "Doğru mu, Yanlış mı?",
    instruction: "Aşağıdaki ifadeyi değerlendirin.",
    statement: "Sözel oturumdan çıkınca sorularla ilgili değerlendirme yapmalıyım. Emin olmadığım sorularla ilgili uzun uzun düşünmeliyim.",
    answer: false,
    tip: "✨ Sözel oturum bitti, değiştirebileceğin hiçbir şey yok. Soruları kafanda çözmeye devam etmek seni yorar ve sayısal oturuma gergin girmene neden olur. Ne olursa olsun zihnini boşalt, bir sonraki oturuma taze başla."
  }
];
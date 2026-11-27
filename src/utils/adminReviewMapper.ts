

const PATTERNS: { regex: RegExp; translation: string }[] = [
    {
      regex: /name.*national id.*(do not match|does not match).*id card/i,
      translation: "نام و کد ملی مطابقت دارد؛ نام و کد ملی را دقیق‌تر وارد کنید."
    },
    {
      regex: /id card image.*(blurry|cropped|not clear|illegible)/i,
      translation: "تصویر شناسنامه تار است و بخشی از آن بریده شده است."
    },
    {
      regex: /verification video.*(incomplete|not complete)/i,
      translation: "ویدیو تایید هویت کامل نیست."
    },
    {
      regex: /national (id|code).*(invalid|mismatch)/i,
      translation: "کد ملی وارد شده معتبر نیست."
    },
    {
      regex: /birth date.*(invalid|mismatch)/i,
      translation: "تاریخ تولد معتبر نیست یا تطابق ندارد."
    }
  ];
  
  const TRANSLATION_DICTIONARY: Record<string, string> = {
    "national id": "کد ملی",
    "national code": "کد ملی",
    "name": "نام",
    "last name": "نام خانوادگی",
    "first name": "نام",
    "mismatch": "تطابق ندارد",
    "does not match": "تطابق ندارد",
    "invalid": "معتبر نیست",
    "birth date": "تاریخ تولد",
    "id card": "تصویر شناسنامه",
    "identity document": "تصویر شناسنامه",
    "id card image": "تصویر شناسنامه",
    "blurry": "تار است",
    "not clear": "خوانا نیست",
    "illegible": "خوانا نیست",
    "cropped": "بریده شده است",
    "reflection": "انعکاس نور",
    "verification video": "ویدیو تایید هویت",
    "video": "ویدیو",
    "sentence": "جمله",
    "not complete": "کامل گفته نشده است",
    "incomplete": "کامل نیست",
    "audio": "صدا",
    "noisy": "نویز دارد",
    "please submit": "لطفاً ارسال کنید",
    "please upload": "لطفاً آپلود کنید",
    "please check": "لطفاً بررسی کنید",
    "try again": "دوباره تلاش کنید",
    "missing": "موجود نیست",
  };
  
  export function parseAdminReviewMessage(message: string): string[] {
    if (!message) return ["لطفاً اطلاعات وارد شده را بررسی و اصلاح کنید."];
  
    let parts = message.split("\n").map(p => p.trim()).filter(Boolean);
    
    if (parts.length === 1) {
      parts = message.split(/[.;?!]+/).map(p => p.trim()).filter(p => p.length > 2);
    }
  
    if (parts.length === 1 && message.toLowerCase().includes(" and ")) {
      parts = message.split(/ and /i).map(p => p.trim()).filter(Boolean);
    }
  
    return parts.map(sentence => {
      for (const pattern of PATTERNS) {
        if (pattern.regex.test(sentence)) {
          return pattern.translation;
        }
      }
  
      let translated = sentence;
      let hasMatch = false;
      Object.entries(TRANSLATION_DICTIONARY).forEach(([en, fa]) => {
        const regex = new RegExp(en, "gi");
        if (regex.test(translated)) {
          translated = translated.replace(regex, fa);
          hasMatch = true;
        }
      });
  
      if (!hasMatch) {
        return `(نیاز به بررسی): ${sentence}`;
      }
  
      translated = translated
        .replace(/\band\b/gi, "و")
        .replace(/\bis\b/gi, "است")
        .replace(/\bthe\b/gi, "")
        .replace(/\ba\b/gi, "")
        .replace(/\ban\b/gi, "")
        .replace(/\bto\b/gi, "برای")
        .replace(/\s+/g, " ")
        .trim();
  
      return translated.charAt(0).toUpperCase() + translated.slice(1);
    });
  }
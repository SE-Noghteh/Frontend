export const genderOptions = [
  { label: "زن", value: "female" },
  { label: "مرد", value: "male" },
];
  
  export const provinceOptions = [
    { label: "تهران", value: "tehran" },
    { label: "البرز", value: "alborz" },
    { label: "خراسان رضوی", value: "razavi-khorasan" },
  ];
  
  export const cityOptions: Record<string, { label: string; value: string }[]> = {
    tehran: [
      { label: "تهران", value: "tehran" },
      { label: "شهریار", value: "shahriyar" },
      { label: "اسلامشهر", value: "eslamshahr" },
    ],
    alborz: [
      { label: "کرج", value: "karaj" },
      { label: "فردیس", value: "fardis" },
    ],
    "razavi-khorasan": [
      { label: "مشهد", value: "mashhad" },
      { label: "نیشابور", value: "neyshabur" },
    ],
  };
  
  //Date of birth
  export const dayOptions = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, "0");
    return { label: day, value: day };
  });
  
  export const monthOptions = [
    { label: "فروردین", value: "01" },
    { label: "اردیبهشت", value: "02" },
    { label: "خرداد", value: "03" },
    { label: "تیر", value: "04" },
    { label: "مرداد", value: "05" },
    { label: "شهریور", value: "06" },
    { label: "مهر", value: "07" },
    { label: "آبان", value: "08" },
    { label: "آذر", value: "09" },
    { label: "دی", value: "10" },
    { label: "بهمن", value: "11" },
    { label: "اسفند", value: "12" },
  ];
  
  export const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = (1395 - i).toString(); 
    return { label: year, value: year };
  });
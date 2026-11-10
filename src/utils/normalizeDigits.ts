export function normalizeDigits(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return "";
    
    const stringValue = String(value);
    
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
    
    return stringValue.replace(/[۰-۹٠-٩]/g, (char) => {
      const persianIndex = persianDigits.indexOf(char);
      if (persianIndex !== -1) return persianIndex.toString();
      
      const arabicIndex = arabicDigits.indexOf(char);
      if (arabicIndex !== -1) return arabicIndex.toString();
      
      return char;
    });
  }
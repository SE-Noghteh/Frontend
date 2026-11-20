export function resolveErrorMessage(errorString: string | null | undefined): string {
    if (!errorString) return "";
    
    const error = errorString.toLowerCase();
    
    if (/[\u0600-\u06FF]/.test(errorString)) {
      return errorString;
    }
  
    if (error.includes("wait before requesting") || error.includes("rate limit")) {
      return "برای دریافت مجدد کد، لطفاً کمی صبر کنید.";
    }
    if (error.includes("phone") && error.includes("exists")) {
      return "این شماره همراه قبلاً ثبت شده است.";
    }
    if (error.includes("password")) {
      return "رمز عبور معتبر نیست.";
    }
    if (error.includes("network") || error.includes("connect")) {
      return "خطا در ارتباط با سرور. اینترنت خود را بررسی کنید.";
    }
  
    return "خطایی رخ داده است، لطفاً دوباره تلاش کنید.";
  }
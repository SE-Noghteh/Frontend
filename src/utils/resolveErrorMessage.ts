export function resolveErrorMessage(errorString: string | null | undefined): string {
    if (!errorString) return "";
    
    const error = errorString.toLowerCase();
    
    if (/[\u0600-\u06FF]/.test(errorString)) {
      return errorString;
    }
  
    if (error.includes("wait before requesting") || error.includes("rate limit")) {
      return "";
    }
    if(error.includes("national code") && error.includes("phone") && error.includes("registered"))
    {
      return"این شماره همراه یا کد ملی قبلا ثبت شده است."
    }
    if(error.includes("national_code") && error.includes("invalid"))
    {
      return"کد ملی معتبر نیست."
    }
    if(error.includes("province") && error.includes("invalid"))
    {
      return"کد پستی معتبر نیست."
    }
    if (error.includes("password")) {
      return "رمز عبور معتبر نیست.";
    }
    if (error.includes("network") || error.includes("connect")) {
      return "خطا در ارتباط با سرور. اینترنت خود را بررسی کنید.";
    }
  
    return "خطایی رخ داده است، لطفاً دوباره تلاش کنید.";
  }

  export function isNonBlockingOtpError(errorString: string | null | undefined): boolean {
    if (!errorString) return false;
    const error = errorString.toLowerCase();
    return (
      error.includes("wait before requesting") ||
      error.includes("rate limit") ||
      error.includes("too many requests")
    );
  }
export function AuthImagePanel({ userType }: { userType: "jobseeker" | "employer" }) {
  const images = {
    jobseeker: {
      mobile: "/images/login-images/jobseeker-mobile-background.svg",
      desktop: "/images/login-images/jobseeker-background.svg",
    },
    employer: {
      mobile: "/images/login-images/employer-mobile-bg.svg",
      desktop: "/images/login-images/employer-background.svg",
    }
  };

  const currentImages = images[userType];

  return (
    <div className="w-full h-full relative">
      {/* mobile */}
      <div className="block lg:hidden w-full h-45 relative overflow-hidden bg-gray-50"> 
        <img 
          src={currentImages.mobile} 
          alt="Mobile background" 
          className="absolute inset-0 w-full h-full object-center" 
        />
      </div>

      {/* desktop */}
      <div className="hidden lg:block w-full h-full">
        <img 
          src={currentImages.desktop} 
          alt="Desktop background" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
      </div>
    </div>
  );
}
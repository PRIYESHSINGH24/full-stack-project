const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 w-full h-full">
            {[...Array(64)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-primary/20 animate-pulse"
                style={{
                  animationDelay: `${(i % 8) * 0.1}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-md text-center relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-primary/10 transition-all duration-500 ${
                  i % 2 === 0 
                    ? "animate-[pulse_2s_ease-in-out_infinite]" 
                    : "hover:scale-110 hover:bg-primary/20"
                }`}
                style={{
                  animationDelay: `${(i % 3) * 0.2}s`
                }}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4 animate-fade-in">{title}</h2>
          <p className="text-base-content/60 animate-fade-in-delay">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
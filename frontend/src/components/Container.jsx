const sizes = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  form: "max-w-2xl",
};

export default function Container({ size = "default", className = "", children }) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}

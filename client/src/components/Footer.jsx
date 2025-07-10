const Footer = () => {
  return (
    <footer className="border-t border-border bg-[#215e60] text-secondary">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm sm:text-base">
        <p className="text-secondary">
          This platform is built to provide quality learning experiences in a clean, modern interface.
          Stay curious, keep learning.
        </p>
        <p className="mt-2 text-xs text-accent">
          &copy; {new Date().getFullYear()} Shiv. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

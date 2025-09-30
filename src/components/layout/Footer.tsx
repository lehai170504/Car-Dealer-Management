export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Bên trái */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dashboard App. All rights reserved.
        </p>

        {/* Bên phải */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

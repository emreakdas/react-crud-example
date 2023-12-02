import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 shadow">
      <div className="container mx-auto p-3 flex justify-between items-center">
        <Link to="/" className="text-2xl uppercase font-mono text-white">Crud Example</Link>
        <Link to="/users" className="text-md text-white">Users</Link>
      </div>
    </header>
  );
}

export default Header;

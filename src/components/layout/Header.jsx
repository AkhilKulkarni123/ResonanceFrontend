import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-dark-card/80 backdrop-blur-md border-b border-dark-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">R</div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">Resonance</span>
        </Link>

        {isAuthenticated ? (
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            <Link to="/record" className="text-sm text-gray-300 hover:text-white transition-colors">Record Dream</Link>
            <Link to="/journal" className="text-sm text-gray-300 hover:text-white transition-colors">Journal</Link>
            <Link to="/social" className="text-sm text-gray-300 hover:text-white transition-colors">Social</Link>
            <Link to="/chat" className="text-sm text-gray-300 hover:text-white transition-colors">Chat</Link>
            <Link to="/analytics" className="text-sm text-gray-300 hover:text-white transition-colors">Analytics</Link>
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-border">
              <Link to="/profile" className="flex items-center gap-2">
                <Avatar src={user?.avatar_url} name={user?.display_name || user?.username} size="sm" />
                <span className="text-sm text-gray-300">{user?.display_name || user?.username}</span>
              </Link>
              <Button variant="ghost" onClick={() => { logout(); navigate('/'); }} className="text-xs">
                Logout
              </Button>
            </div>
          </nav>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost">Log In</Button></Link>
            <Link to="/signup"><Button>Sign Up</Button></Link>
          </div>
        )}
      </div>
    </header>
  );
}

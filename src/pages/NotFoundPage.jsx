import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">💭</p>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-400 mb-6">This dream doesn't exist... yet.</p>
        <Link to="/"><Button>Return Home</Button></Link>
      </div>
    </div>
  );
}

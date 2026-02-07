import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';

export default function SignupForm() {
  const [form, setForm] = useState({ email: '', password: '', username: '', display_name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Username" value={form.username} onChange={update('username')} placeholder="dreamwalker42" required />
      <Input label="Display Name" value={form.display_name} onChange={update('display_name')} placeholder="Your display name" />
      <Input label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" required />
      <Input label="Password" type="password" value={form.password} onChange={update('password')} placeholder="At least 8 characters" required />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">{loading ? 'Creating account...' : 'Create Account'}</Button>
      <p className="text-center text-sm text-gray-400">
        Already have an account? <Link to="/login" className="text-primary hover:text-primary-light">Log in</Link>
      </p>
    </form>
  );
}

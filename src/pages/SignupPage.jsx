import SignupForm from '../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">R</div>
          <h1 className="text-2xl font-bold">Join Resonance</h1>
          <p className="text-gray-400 mt-1">Start unlocking the meaning of your dreams</p>
        </div>
        <div className="p-6 bg-dark-card border border-dark-border rounded-xl">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

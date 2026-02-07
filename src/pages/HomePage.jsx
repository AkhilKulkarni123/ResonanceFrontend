import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import DreamOfTheDay from '../components/creative/DreamOfTheDay';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-light via-secondary to-accent bg-clip-text text-transparent">Unlock the Meaning</span>
            <br />
            <span className="text-gray-200">of Your Dreams</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Record your dreams, get AI-powered analysis and predictions, track patterns,
            and connect with dreamers worldwide who share your dream themes.
          </p>
          {isAuthenticated ? (
            <div className="flex gap-4 justify-center">
              <Link to="/record"><Button className="text-lg px-8 py-3">Record a Dream</Button></Link>
              <Link to="/dashboard"><Button variant="secondary" className="text-lg px-8 py-3">Dashboard</Button></Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link to="/signup"><Button className="text-lg px-8 py-3">Get Started Free</Button></Link>
              <Link to="/login"><Button variant="secondary" className="text-lg px-8 py-3">Log In</Button></Link>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-dark-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Resonance Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎙', title: 'Record Your Dream', desc: 'Use your camera and microphone to describe your dream, or simply type it out. Our AI transcribes and captures every detail.' },
              { icon: '🧠', title: 'AI Dream Analysis', desc: 'GPT-4 powered analysis breaks down symbols, emotions, recurring themes, and predicts what may happen next in your life.' },
              { icon: '🌍', title: 'Dream Community', desc: 'Connect with dreamers worldwide who share similar dream themes. Chat anonymously or openly about your experiences.' },
            ].map((f) => (
              <div key={f.title} className="p-6 bg-dark-card border border-dark-border rounded-xl text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Your Dream World</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '📔', title: 'Dream Journal', desc: 'Timeline view of all your dreams with mood tracking' },
              { icon: '🎨', title: 'Dream Art', desc: 'AI-generated artwork from your dream descriptions' },
              { icon: '📊', title: 'Analytics', desc: 'Charts and insights about your dream patterns' },
              { icon: '🏆', title: 'Badges & Streaks', desc: 'Gamification to keep you logging dreams daily' },
              { icon: '😴', title: 'Sleep Tracker', desc: 'Log sleep quality and correlate with dream moods' },
              { icon: '🔮', title: 'Predictions', desc: 'AI predicts what your dreams mean for your future' },
              { icon: '💬', title: 'Dream Chat', desc: 'Real-time chat with dream friends and groups' },
              { icon: '🌟', title: 'Dream of the Day', desc: 'Community highlighted dreams for inspiration' },
            ].map((f) => (
              <div key={f.title} className="p-4 bg-dark-card border border-dark-border rounded-lg">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h4 className="font-medium text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dream */}
      <section className="py-16 px-4 bg-dark-card/50">
        <div className="max-w-2xl mx-auto">
          <DreamOfTheDay />
        </div>
      </section>
    </div>
  );
}

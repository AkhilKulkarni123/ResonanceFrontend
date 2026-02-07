import { useState } from 'react';
import Modal from '../common/Modal';

export default function DreamArtCard({ art }) {
  const [showFull, setShowFull] = useState(false);
  const imageUrl = art.image_url?.startsWith('http') ? art.image_url : `${import.meta.env.VITE_API_URL?.replace('/api', '')}${art.image_url}`;

  return (
    <>
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all" onClick={() => setShowFull(true)}>
        <div className="aspect-square bg-dark-surface">
          <img src={imageUrl} alt="Dream Art" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full capitalize">{art.style}</span>
            {art.Dream && <span className="text-xs text-gray-500">{art.Dream.title || 'Untitled'}</span>}
          </div>
        </div>
      </div>

      <Modal isOpen={showFull} onClose={() => setShowFull(false)} title="Dream Art">
        <img src={imageUrl} alt="Dream Art" className="w-full rounded-lg mb-3" />
        {art.prompt_used && <p className="text-xs text-gray-400 italic">{art.prompt_used}</p>}
      </Modal>
    </>
  );
}

import { useState } from 'react';
import DreamArtCard from './DreamArtCard';

export default function DreamArtGallery({ artworks, loading }) {
  if (loading) return <div className="text-center py-8 text-gray-400">Loading gallery...</div>;
  if (!artworks || artworks.length === 0) return <p className="text-center py-8 text-gray-400">No dream art yet. Generate art from your dreams!</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((art) => (
        <DreamArtCard key={art.id} art={art} />
      ))}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { artService } from '../services/art.service';
import DreamArtGallery from '../components/creative/DreamArtGallery';
import Button from '../components/common/Button';

export default function DreamArtPage() {
  const [tab, setTab] = useState('my');
  const [myArt, setMyArt] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = tab === 'my'
      ? artService.getGallery() // TODO: filter by user
      : artService.getGallery();

    load
      .then((res) => {
        if (tab === 'my') setMyArt(res.data.art);
        else setGallery(res.data.art);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dream Art Gallery</h1>
      <div className="flex gap-2 mb-6">
        <Button variant={tab === 'my' ? 'primary' : 'secondary'} onClick={() => setTab('my')}>My Art</Button>
        <Button variant={tab === 'community' ? 'primary' : 'secondary'} onClick={() => setTab('community')}>Community Gallery</Button>
      </div>
      <DreamArtGallery artworks={tab === 'my' ? myArt : gallery} loading={loading} />
    </div>
  );
}

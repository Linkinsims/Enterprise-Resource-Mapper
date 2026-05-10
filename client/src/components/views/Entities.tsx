import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const Entities = () => {
  const [entities, setEntities] = useState<any[]>([]);
  const [name, setName] = useState('');

  const load = async () => setEntities(await api.getEntities());
  useEffect(() => { load(); }, []);

  const addEntity = async () => {
    if (!name) return;
    await api.createEntity({ name, shortName: name, industry: 'General' });
    setName('');
    load();
  };

  const removeEntity = async (id: string) => {
    await api.deleteEntity(id);
    load();
  };

  return <div className='p-6'>
    <h1 className='text-2xl mb-4'>Entities</h1>
    <div className='flex gap-2 mb-4'>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder='Entity name' className='border px-3 py-2 rounded' />
      <button onClick={addEntity} className='bg-blue-600 text-white px-4 rounded'>Add Entity</button>
    </div>
    <div className='space-y-2'>{entities.map(e => <div key={e.id} className='flex justify-between border p-3 rounded'><span>{e.name}</span><button onClick={()=>removeEntity(e.id)}>Delete</button></div>)}</div>
  </div>;
};

export default Entities;
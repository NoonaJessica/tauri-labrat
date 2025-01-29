// contexts/DbContext.tsx

import { createContext } from 'react';
import { useDB } from '../hooks/DBHooks';
import { Vote } from '@/types/localTypes';
import Loki from 'lokijs';

type DbContextType = {
  db: Loki | null;
  addFaces: (doc: Float32Array) => Float32Array | undefined;
  getAllFaces: () => (Float32Array & LokiObj)[] | undefined;
  deleteAllFromDB: () => void;
  addVotes: (vote: Vote) => Vote | undefined;
  getAllVotes: () => (Vote & LokiObj)[] | undefined;
};

const DBContext = createContext<DbContextType | null>(null);

const DbProvider = ({ children }: { children: React.ReactNode }) => {
  const { db, addFaces, getAllFaces, deleteAllFromDB, addVotes, getAllVotes } =
    useDB();

  return (
    <DBContext.Provider
      value={{
        db,
        addFaces,
        getAllFaces,
        deleteAllFromDB,
        addVotes,
        getAllVotes,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export { DBContext, DbProvider };

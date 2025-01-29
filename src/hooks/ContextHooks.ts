// hooks/ContextHooks.ts
import { useContext } from 'react';
import { DBContext } from '../contexts/DBContext';

const useDbContext = () => {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error('useDbContext must be used within a DbProvider');
  }
  return context;
};

export { useDbContext };
import { useLocation } from "react-router-dom";

export * from './fetch';
export * from './token';
export * from './cookie';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
import { Navigate, useLocation } from 'react-router-dom';
import { resolveLphPath } from '@/lib/lphSlug';

export default function LphRedirect() {
  const { pathname, search, hash } = useLocation();
  return <Navigate replace to={`${resolveLphPath(pathname)}${search}${hash}`} />;
}
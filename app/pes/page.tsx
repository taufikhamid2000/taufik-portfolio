import { redirect } from 'next/navigation';

// The PES-style menu is now the home page; /pes stays as an alias so any
// existing links or bookmarks keep working.
export default function PesAlias() {
  redirect('/');
}

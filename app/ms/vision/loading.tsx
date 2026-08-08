import { Spinner } from '../../_components/spinner';

export default function MsVisionLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <Spinner className="h-6 w-6 text-foreground/40" />
    </div>
  );
}

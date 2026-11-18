import Link from "next/link";
import { popularSizes } from "@/lib/data/sizes";

export function SizeGuide({ compact = false }: { compact?: boolean }) {
  const items = compact ? popularSizes.slice(0, 8) : popularSizes;
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-ink/10 bg-foam px-4 py-3 hover:border-ink">
            <span className="block font-medium">{item.label}</span>
            <span className="mt-1 block text-xs text-ink-soft">{item.hint}</span>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-ink-soft">These are starting sizes, in the inches and pounds shops already use. Your box can be different. We quote it. We do not show a fixed price.</p>
    </div>
  );
}

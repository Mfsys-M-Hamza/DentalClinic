import type { Dentist } from "@/data/team";
import { Photo } from "@/components/ui/Photo";

export function DentistCard({ dentist }: { dentist: Dentist }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Photo
        src={dentist.photo}
        alt={`Portrait of ${dentist.name}, ${dentist.role}`}
        ratio="aspect-[4/5]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        zoom
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brand uppercase">{dentist.role}</p>
        <h3 className="mt-1 font-serif text-xl font-semibold">{dentist.name}</h3>
        {dentist.qualifications && <p className="mt-1 text-sm text-muted">{dentist.qualifications}</p>}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{dentist.bio}</p>
        {dentist.focus.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">
          {dentist.focus.map((f) => (
            <li key={f} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
              {f}
            </li>
          ))}
        </ul>}
      </div>
    </article>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { materials } from "@/lib/data/materials";
import { TextureSwatch } from "@/components/visual/TextureSwatch";
import { PackShot } from "@/components/visual/PackShot";
import { getCategory } from "@/lib/data/catalog";

const rows = [
  { key: "surface", label: "Surface" },
  { key: "structure", label: "Structure" },
  { key: "printCharacter", label: "Print" },
  { key: "watchouts", label: "Watch-outs" },
] as const;

export function MaterialExplorer() {
  const [active, setActive] = useState(materials[0].id);
  const [left, setLeft] = useState<string>(materials[0].id);
  const [right, setRight] = useState<string>(materials[2].id);
  const material = materials.find((item) => item.id === active) ?? materials[0];
  const a = materials.find((item) => item.id === left) ?? materials[0];
  const b = materials.find((item) => item.id === right) ?? materials[2];

  return (
    <div className="space-y-16">
      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col" role="tablist" aria-label="Materials">
          {materials.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active}
              className={`rounded-2xl px-4 py-3 text-left text-sm whitespace-nowrap lg:whitespace-normal ${item.id === active ? "bg-ink text-foam" : "bg-foam"}`}
              onClick={() => setActive(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <article id={material.id} className="panel overflow-hidden">
          <TextureSwatch materialId={material.id} className="h-52 w-full" />
          <div className="grid gap-6 p-6 md:grid-cols-[180px_minmax(0,1fr)]">
            <PackShot material={material.id} brand="#c4452d" label={`${material.name} on a carton`} className="h-44 w-full" />
            <div>
              <h2 className="display text-4xl">{material.name}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{material.description}</p>
              <p className="mt-4 text-sm leading-6">
                <span className="font-medium">Often used for </span>
                {material.applications.join(", ")}.
              </p>
            </div>
          </div>
          <div className="grid gap-6 border-t border-line p-6 sm:grid-cols-2">
            <div>
              <h3 className="font-medium">Advantages</h3>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
                {material.advantages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Recommended packaging</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {material.recommended.map((slug) => {
                  const category = getCategory(slug);
                  return (
                    <li key={slug}>
                      <Link href={`/products/${slug}`} className="underline decoration-ink/20 underline-offset-4">
                        {category?.name ?? slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </article>
      </div>

      <section>
        <h2 className="display text-4xl">Compare two materials</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
          A written comparison of typical behaviour. It is not a laboratory test and it is not a promise that one board is stronger by a measured amount.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            First material
            <select className="select mt-2" value={left} onChange={(event) => setLeft(event.target.value)}>
              {materials.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Second material
            <select className="select mt-2" value={right} onChange={(event) => setRight(event.target.value)}>
              {materials.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/15">
                <th className="py-3 pr-4 font-medium"> </th>
                <th className="py-3 pr-4 font-medium">{a.name}</th>
                <th className="py-3 font-medium">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-ink/10 align-top">
                  <th className="py-4 pr-4 font-medium">{row.label}</th>
                  <td className="py-4 pr-4 leading-6 text-ink-soft">{a[row.key]}</td>
                  <td className="py-4 leading-6 text-ink-soft">{b[row.key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

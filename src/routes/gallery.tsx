import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site";
import campus from "@/assets/campus.jpg";
import lab from "@/assets/lab.jpg";
import sports from "@/assets/sports.jpg";
import culture from "@/assets/culture.jpg";
import library from "@/assets/library.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Photo Gallery – YM Public School, Gorakhpur" },
    { name: "description", content: "Photos of campus, labs, sports day, annual function and library at YM Public School." },
    { property: "og:title", content: "Gallery – YM Public School" },
    { property: "og:description", content: "Moments from campus life at YM Public School." },
  ] }),
  component: Gallery,
});

const photos = [[campus, "Our Campus"], [lab, "Science Lab"], [sports, "Annual Sports Day"], [culture, "Annual Function"], [library, "Library"]] as const;

function Gallery() {
  return (
    <>
      <PageHero title="Photo Gallery" subtitle="Glimpses of life at YM Public School." />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map(([src, t], i) => (
            <figure key={t} className={`group relative overflow-hidden rounded-xl ${i === 0 ? "sm:col-span-2" : ""}`}>
              <img src={src} alt={t} loading="lazy" className="h-72 w-full object-cover object-bottom transition duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground">{t}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import { AvailabilityBanner } from "@/components/sections/AvailabilityBanner";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Specialties } from "@/components/sections/Specialties";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvailabilityBanner />
      <FeaturedProjects />
      <Specialties />
    </>
  );
}

import Hero from "../components/home/Hero";
import PopularDestinations from "../components/home/PopularDestinations";
import PopularActivities from "../components/home/PopularActivities";
import ExploreParadise from "../components/home/ExploreParadise";
import Stats from "../components/home/Stats";
import PlanTripCTA from "../components/home/PlanTripCTA";
import Testimonials from "../components/home/Testimonials";
import TripadvisorReviews from "../components/home/TripadvisorReviews";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Tour Nest | Sri Lanka Travel & Tour Packages</title>
        <meta
          name="description"
          content="Explore Sri Lanka with curated tours, beaches, safaris, culture, and custom travel experiences."
        />
        <link rel="canonical" href="https://tournestsrilanka.com/" />
      </Helmet>
      <Hero />
      <PopularDestinations />
      <PopularActivities />
      <ExploreParadise />
      <Stats />
      <PlanTripCTA />
      <TripadvisorReviews />
      <Testimonials />
    </div>
  );
}

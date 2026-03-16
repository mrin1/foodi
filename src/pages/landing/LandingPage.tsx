
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import FoodSection from "./FoodSection";
import WorkingHours from "./WorkingHours";
import ChefsSection from "./ChefsSection";
import AppDownload from "./AppDownload";
import Newsletter from "./Newsletter";
import TestimonialSection from "./TestimonialSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <FoodSection />
      <WorkingHours />
      <ChefsSection />
      <TestimonialSection/>
      <AppDownload />
      <Newsletter />
    </>
  );
};

export default LandingPage;

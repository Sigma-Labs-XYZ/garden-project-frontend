import CarouselForDashboard from "./Carousel.js";
import "./dashboard.css";
import Header from "./../Header.js";

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <CarouselForDashboard id="carousel-for-dashboard" />;
    </div>
  );
}

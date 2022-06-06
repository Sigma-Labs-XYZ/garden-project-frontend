import Notices from "./carousel-items/Notices.js";
import Tips from "./carousel-items/Tips.js";
import Weather from "./carousel-items/Weather.js";
import Carousel from "react-bootstrap/Carousel";
import "./dashboard.css";

export default function CarouselForDashboard() {
  return (
    <Carousel className="carousel-mother">
      <Carousel.Item className="carousel">
        <Weather />
      </Carousel.Item>

      <Carousel.Item className="carousel">
        <Tips />
      </Carousel.Item>

      <Carousel.Item className="carousel">
        <Notices />
      </Carousel.Item>
    </Carousel>
  );
}

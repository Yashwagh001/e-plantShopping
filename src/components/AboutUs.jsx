import { Leaf, Heart, Sprout } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <section className="about-section" id="about">
        <span className="eyebrow">OUR STORY</span>

        <h2>Helping you grow a greener home.</h2>

        <p>
          Paradise Nursery makes it easier to bring nature into your everyday
          life. We offer a thoughtful collection of indoor plants for homes,
          workspaces, and every plant lover.
        </p>

        <div className="about-values">
          <article>
            <Leaf size={28} />

            <h3>Nature First</h3>

            <p>
              Discover plants that make your space feel fresh and welcoming.
            </p>
          </article>

          <article>
            <Heart size={28} />

            <h3>Made for Everyone</h3>

            <p>
              Find a plant that fits your lifestyle and experience level.
            </p>
          </article>

          <article>
            <Sprout size={28} />

            <h3>Grow Together</h3>

            <p>
              Build your confidence and enjoy your plant-parent journey.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
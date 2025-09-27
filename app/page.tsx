import GuideCard from "@/components/GuideCard";

const Page = () => {
  return (
    <main>
      <h1>Dashboard</h1>
      <section className="home-section">
        <GuideCard
          id="789"
          name="Mansion Designer"
          topic="Industrial Design"
          subject="Design"
          duration={45}
          color="#7cff6e"
        />
        <GuideCard
          id="789"
          name="Eye for Eye"
          topic="Optometry"
          subject="science"
          duration={40}
          color="#caf456"
        />
        <GuideCard
          id="712"
          name="Meteoroids Bender"
          topic="Analytical Geometry"
          subject="maths"
          duration={50}
          color="#6eb2ff"
        />
        <GuideCard
          id="123"
          name="Hypnotic Finger"
          topic="Copy Writing"
          subject="english"
          duration={30}
          color="#ff6ea6"
        />
      </section>
    </main>
  );
};

export default Page;

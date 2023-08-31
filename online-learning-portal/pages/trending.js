import Header from "./template/header";
import Footer from "./template/footer";

const supporters = [
  {
    name: "Wells Fargo",
    role: "Copywriter",
    imageUrl: "/wells-fargo.png",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Sponsor 2",
    role: "Copywriter",
    imageUrl: "/sponsor-placeholder.jpg",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
];

export default function Example() {
  return (
    <div>
      <Header activePage="Sponsors" />
      <div className="bg-white" style={{background: "#0d142d"}}>
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12 mb-10">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">Trending Technologies</h2>
              <p className="text-xl text-gray-500"></p>
            </div>
            <img src="/trending-technologies.png" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

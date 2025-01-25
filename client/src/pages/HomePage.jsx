import useProfileStore from "../store/profileStore";
import News from "../components/general/News";
import Company from "../components/general/Company";
import Chart from "../components/general/Chart";
import Header from "../components/general/Header";

function HomePage() {

  const { profile } = useProfileStore();

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden dark:bg-gradient-to-b from-gray-900 to-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200`}>
      <Header/>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">
          Hello, {profile.fullName.split(" ")[0]}!
        </h1>
        <p className="mb-6 text-gray-600">Welcome to your stock market dashboard.</p>

        <div className="mb-2">
          <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
          <div>
            <Company />
          </div>
        </div>
        <div className="mb-4 mt-2 p-4 rounded-lg shadow-lg bg-gray-100 dark:bg-transparent dark:border-[#303030] border">
          <Chart />
        </div>
        <div className="mb-1">
          <News />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

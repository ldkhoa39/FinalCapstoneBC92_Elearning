import { motion } from "framer-motion";

type TabType = "profile" | "courses";

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const tabs = [
  {
    id: "profile",
    label: "Thông tin",
  },
  {
    id: "courses",
    label: "Khóa học",
  },
] as const;

const ProfileTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {
  return (
    <div className="mt-10 flex justify-center lg:justify-start">
      <div className="bg-slate-900/70 border border-slate-800 p-1 rounded-2xl flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-3 rounded-xl text-sm font-medium ${
              activeTab === tab.id
                ? "text-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-cyan-400 rounded-xl"
              />
            )}

            <span className="relative z-10">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
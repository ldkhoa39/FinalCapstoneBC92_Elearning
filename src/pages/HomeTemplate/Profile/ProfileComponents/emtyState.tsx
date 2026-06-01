import { BookOpen } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="rounded-[32px] border border-dashed border-slate-700 bg-white/[0.02] py-24 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10 text-cyan-400" />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        Không tìm thấy khóa học
      </h2>

      <p className="text-slate-400 max-w-md mx-auto">
        Không có khóa học nào phù hợp với từ khóa tìm kiếm của bạn.
      </p>
    </div>
  );
};

export default EmptyState;
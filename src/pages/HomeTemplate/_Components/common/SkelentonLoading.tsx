const SkeletonLoading = () => {
  return (
    <div className="bg-slate-800/40 rounded-2xl p-4 border border-white/5 animate-pulse">
      {/* Hình ảnh giả */}
      <div className="bg-slate-700/50 aspect-video rounded-xl mb-6"></div>
      
      {/* Tiêu đề giả */}
      <div className="space-y-3">
        <div className="h-5 bg-slate-700/50 rounded-md w-3/4"></div>
        <div className="h-5 bg-slate-700/50 rounded-md w-1/2"></div>
      </div>

      {/* Mô tả giả */}
      <div className="mt-6 space-y-2">
        <div className="h-3 bg-slate-700/30 rounded w-full"></div>
        <div className="h-3 bg-slate-700/30 rounded w-full"></div>
      </div>

      {/* Footer giả */}
      <div className="mt-8 flex justify-between items-center">
        <div className="h-6 bg-slate-700/50 rounded w-20"></div>
        <div className="h-10 bg-slate-700/50 rounded-lg w-28"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
import React from 'react';

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseName: string;
  isDeleting: boolean;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  courseName, 
  isDeleting 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Header Modal */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-exclamation-triangle text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Xác nhận xóa khóa học</h3>
          <p className="text-slate-400 text-sm">
            Bạn có chắc chắn muốn xóa khóa học <br/>
            <strong className="text-red-400">"{courseName}"</strong> không? <br/>
            Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex bg-slate-800/50 p-4 gap-3">
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          
          <button 
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center disabled:opacity-70"
          >
            {isDeleting ? (
              <i className="fa fa-circle-notch fa-spin text-lg"></i>
            ) : (
              "Đồng ý Xóa"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteCourseModal;
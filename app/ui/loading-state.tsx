export function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-8 bg-white bg-opacity-80 z-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">載入中...</span>
    </div>
  );
}
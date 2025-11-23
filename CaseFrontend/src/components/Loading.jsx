
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
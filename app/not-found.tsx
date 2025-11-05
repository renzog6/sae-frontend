export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="mb-4 text-2xl font-bold">Page not found</h1>
      <a href="/" className="text-blue-500 hover:underline">
        Return Home
      </a>
    </div>
  );
}

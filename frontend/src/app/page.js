import Feed from "@/components/Feed";
import PostInput from "@/components/PostInput";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl border-r border-l min-h-screen">
      <div className="py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <PostInput />
      <Feed />
    </div>
  );
}

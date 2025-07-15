import { useEffect, useState } from "react";

const availableTags = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western"
];

function TagEditor({
  tags,
  setTags,
  isEditingTags,
  setIsEditingTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  isEditingTags: boolean;
  setIsEditingTags: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [tempTags, setTempTags] = useState<string[]>([]);

  useEffect(() => {
    if (isEditingTags) {
      setTempTags(tags);
    }
  }, [isEditingTags]);

  const handleTagToggle = (tag: string) => {
    setTempTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleApply = () => {
    console.log("Selected Tags:", tempTags);
    setTags(tempTags);
  };

  if (!isEditingTags) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col justify-center bg-[#858585] rounded-2xl p-6 w-120 max-w-full text-black shadow-xl">
        <h2 className="text-2xl text-center font-bold mb-4">Choose Tags</h2>
        <div className="flex flex-wrap py-2 font-semibold gap-2 mb-4">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-2 py-1 rounded-lg  ${
                tempTags.includes(tag)
                  ? 'bg-white text-black '
                  : 'bg-white/40 text-black '
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
        <button
          className="bg-blue-400/100 text-white px-4 py-2 rounded font-semibold"
          onClick={() => {
            handleApply();
            setIsEditingTags(false);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default TagEditor;
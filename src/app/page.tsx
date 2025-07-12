import MultiselectAnimated, { ContentItem } from "@/components/multi-select-animated";

export default function Home() {
  const contentLorem: ContentItem[] = [
    {
      id: 1,
      content: "Lorem",
    },
    {
      id: 2,
      content: "Ipsum",
    },
    {
      id: 3,
      content: "Dolor",
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <MultiselectAnimated
        options={contentLorem}
        initialSelectedItems={[]}
        placeholder="Select options"
      />
    </div>
  );
}

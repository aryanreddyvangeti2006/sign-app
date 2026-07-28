import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Audio to Sign Language Avatar" },
      {
        name: "description",
        content:
          "Speak into your mic and watch an animated 2D human avatar sign your words in real time using the Web Speech API.",
      },
      { property: "og:title", content: "Audio to Sign Language Avatar" },
      {
        property: "og:description",
        content:
          "Real-time speech-to-sign-language with an animated SVG avatar. Vanilla JS, no backend.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/sign-avatar.html"
      title="Audio to Sign Language Avatar"
      className="fixed inset-0 h-screen w-screen border-0"
    />
  );
}

import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "James Barrel",
      profession:"Personal Lawyer",
      src: "/image/team1.png.webp",
    },
    {
      title: "Stephen Red",
      profession:"Personal Lawyer",
      src: "/image/team2.png.webp",
    },
    {
      title: "Matmex Sogan",
       profession:"Personal Lawyer",
      src: "/image/team3.png.webp",
    },
    {
      title: "Richar Male",
       profession:"Personal Lawyer",
      src: "/image/team4.png.webp",
    },
  ];

  return <FocusCards cards={cards} />;
}

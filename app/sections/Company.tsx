import { Logos3 } from "@/components/logos3"

const demoData = {
  heading: "Trusted by these companies",
  logos: [
    {
      id: "logo-1",
      description: "HP",
      image: "/hp-logo.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-2",
      description: "dell",
      image: "/dell-logo.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-3",
      description: "lenovo",
      image: "lenovo-logo.jpg",
      className: "h-24 w-auto",
    },
    {
      id: "logo-4",
      description: "microsoft",
      image: "microsoft-logo.webp",
      className: "h-24 w-auto",
    },
    {
      id: "logo-5",
      description: "asus",
      image: "asus-logo.jpg",
      className: "h-24 w-auto",
    },
    {
      id: "logo-6",
      description: "Amd",
      image: "/AMD-Logo.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-7",
      description: "mis",
      image: "mis-logo.png",
      className: "h-24 w-auto",
    },
    {
      id: "logo-8",
      description: "acer",
      image: "acer-logo.png",
      className: "h-24 w-auto",
    },
  ],
};

function Logos3Demo() {
  return <Logos3 {...demoData} className="overflow-hidden"/>;
  
}

export default Logos3Demo ;

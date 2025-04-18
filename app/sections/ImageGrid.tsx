// components/FeaturesSection.tsx

import Image from "next/image";

export default function FeaturesSection() {
    const features = [
      {
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAuOSAyMGgxLjhhMy41IDMuNSAwIDAgMSAzLjUgMy42djIxLjhhMy41IDMuNSAwIDAgMS0zLjUgMy41SDE0YTMuNSAzLjUgMCAwIDEtMy41LTMuNXYtMi43IiBzdHJva2U9IiM5OTlDQTgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQ0LjcgMTFIN0EzLjkgMy45IDAgMCAwIDMgMTQuOVYzNmMwIDIuMSAxLjcgMy45IDMuOSAzLjloMzcuOGMyLjIgMCAzLjktMS44IDMuOS0zLjlWMTQuOWMwLTIuMi0xLjctMy45LTMuOS0zLjl6IiBzdHJva2U9IiM5OTlDQTgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTQwLjUgMjYuOWEzLjggMy44IDAgMCAwLTMuOCAzLjUgMy44IDMuOCAwIDEgMCAzLjgtMy41eiIgZmlsbD0iI0ZBQkIxQSIvPjxwYXRoIGQ9Ik0zNS44IDI2LjlhMy44IDMuOCAwIDAgMC0zLjggMy41IDMuOCAzLjggMCAxIDAgMy44LTMuNXoiIGZpbGw9IiNGQUJCMUEiLz48cGF0aCBkPSJNNDguNiAxNS40SDN2NS40aDQ1LjZ2LTUuNHpNMTMuMyAzMS43SDcuOWMtLjUgMC0uOS40LS45Ljl2MWMwIC41LjQuOSAxIC45aDUuM2MuNSAwIC45LS40LjktLjl2LTFjMC0uNS0uNC0uOS0xLS45ek0yMy4zIDI2LjZIOGMtLjUgMC0uOS4zLS45Ljh2MWMwIC41LjQgMSAxIDFoMTUuM2MuNSAwIC45LS41LjktMXYtMWMwLS41LS40LS44LS45LS44ek0yMy4zIDMxLjdIMThjLS41IDAtMSAuNC0xIC45djFjMCAuNS41LjkgMSAuOWg1LjNjLjUgMCAuOS0uNC45LS45di0xYzAtLjUtLjQtLjktLjktLjl6IiBmaWxsPSIjOTk5Q0E4Ii8+PC9zdmc+', // replace with your actual icon path
        title: 'Cash on delivery',
        description:
          'With our advanced payment module you can select the payment method that fits! And always secure!',
        linkText: 'More about payments',
      },
      {
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDIuMyA0Ny45SDI1LjdNMTggNDcuOWgtMy40YTEuOCAxLjggMCAwIDEtMS40LS43bC0yLjUtM2MtLjMtLjMtLjQtLjctLjQtMS4xVjI2LjhBMS44IDEuOCAwIDAgMSAxMiAyNWgyNy43YTcuMSA3LjEgMCAwIDEgNiAzLjFsMy4xIDQuNWMuNC42LjkgMS4yIDEuNSAxLjZsNS41IDMuNWEzIDMgMCAwIDEgMS40IDIuNnYzLjRhMyAzIDAgMCAxLTIuNSAzbC01IC45IiBzdHJva2U9IiM5OTlDQTgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIyIDUyLjRhNC41IDQuNSAwIDEgMCAwLTkgNC41IDQuNSAwIDAgMCAwIDl6TTQ2LjEgNTIuNGE0LjUgNC41IDAgMSAwIDAtOSA0LjUgNC41IDAgMCAwIDAgOXoiIGZpbGw9IiNGQUJCMUEiLz48cGF0aCBkPSJNMyAzMWgxMC40TTUuNiAzNWg3LjhNNy4zIDM5LjRoNi4xTTMyLjkgMjVhMTEuNSAxMS41IDAgMSAxIDE0LjggNSIgc3Ryb2tlPSIjOTk5Q0E4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00Mi44IDEyLjF2OC4ybDQuNy0yLjhNNDAgMjguN2wuMiAzLjVBMi45IDIuOSAwIDAgMCA0MyAzNWg4LjciIHN0cm9rZT0iIzk5OUNBOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=',
        title: 'Reliable shipping',
        description:
          'Benefit from our shipping to get your products wherever you need them.',
        linkText: 'More about shipping',
      },
      {
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjkuOCA2YTI0LjYgMjQuNiAwIDAgMCAyMS43IDljMS43IDE3LTcuNCAzMy0yMS43IDM4LjEtMTQuMy01LTIzLjMtMjEtMjEuNi0zOC4xYTI0LjYgMjQuNiAwIDAgMCAyMS42LTl6IiBzdHJva2U9IiM5OTlDQTgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI3LjcgMzYuN2wtNi02YTEgMSAwIDAgMSAwLTEuNmwxLjMtMS4zYTEgMSAwIDAgMSAxLjUgMGwzLjIgMy4zYS42LjYgMCAwIDAgLjkgMGw4LjUtOC42YTEgMSAwIDAgMSAxLjYgMGwxLjMgMS4zYTEgMSAwIDAgMSAwIDEuNUwyOC42IDM2LjdhLjYuNiAwIDAgMS0xIDB6IiBmaWxsPSIjRkFCQjFBIi8+PC9zdmc+',
        title: 'Security, from start to finish',
        description:
          'We take security very seriously. This is why we don’t store your data and encrypt all transactions.',
        linkText: 'More about security',
      },
    ];
  
    return (
      <section className="w-full h-[30rem] flex justify-center items-center  py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <Image
                height={80}
                width={80}
                src={feature.icon} alt={feature.title} className="h-20 w-20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
'use client';

import { useState } from 'react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import  client  from '@/sanity/lib/client';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const builder = imageUrlBuilder(client);
interface ImageSource {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

const urlFor = (src: ImageSource): string => builder.image(src).width(1000).url();

interface ImageGalleryProps {
  images: ImageSource[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedImage: ImageSource = images[selectedIndex];

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
        <Zoom>
          <Image
            src={urlFor(selectedImage)}
            alt={title}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </Zoom>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image: ImageSource, idx: number) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`bg-gray-100 rounded-lg p-1 cursor-pointer hover:opacity-80 transition-opacity ${
                selectedIndex === idx ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={urlFor(image)}
                alt={`${title} - view ${idx + 1}`}
                width={150}
                height={150}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faRetweet, faLock } from '@fortawesome/free-solid-svg-icons';

export default function FeaturesStrip() {
  const features = [
    {
      icon: faTruck,
      title: 'Delivery All Over Pakistan',
      description: 'Within Working Days '
    },
    {
      icon: faRetweet,
      title: '3 Days Money Back Guarantee',
      description: 'Hassle-free returns'
    },
    {
      icon: faLock,
      title: '15 Days Checking  Warranty',
      description: '100% Customer Satisfaction'
    }
  ];

  return (
    <div className="bg-white py-8 border-b">
      <div className="paklap-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((index) => (
            <div
              key={index.title}
              className="flex items-center justify-center gap-4 px-6 py-3"
            >
              <div className="rounded-full bg-paklap-blue/10 p-4 w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={index.icon}
                  className="h-8 w-8 text-paklap-blue"
                />
              </div>
              <div>
                <h3 className="font-semibold text-paklap-dark">{index.title}</h3>
                <p className="text-sm text-gray-600">{index.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

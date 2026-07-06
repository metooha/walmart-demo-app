import { useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { ProductCardListNS, ProductCardListNSProps } from "@/components/walmart/ProductCardListNS";

const FILTER_CHIPS = ['Only at Walmart', 'Get it fast'] as const;

const PASTA_SAUCE_PRODUCTS: ProductCardListNSProps[] = [
  {
    sponsored: true,
    badge: 'Best Seller',
    price: '2',
    cents: '48',
    name: 'Prego Italian Tomato Pasta Sauce with Roasted Garlic & Herb',
    cue: 'Perfect for pasta night',
    rating: 4,
    ratingCount: '2,415',
    fulfillment: 'Shipping, arrives in today',
    deliveryLabel: "today's delivery",
    deliveryDay: 'Friday 4pm',
    image: PRODUCT_IMAGES.pregoRoastedGarlic,
  },
  {
    sponsored: true,
    price: '7',
    cents: '33',
    name: "Rao's Homemade Roasted Garlic Pasta Sauce, Made with Premium Quality Tomatoes",
    cue: 'Homemade feel',
    rating: 4,
    ratingCount: '2,415',
    fulfillment: 'Shipping, arrives in today',
    deliveryLabel: "today's delivery",
    deliveryDay: 'Friday 4pm',
    image: PRODUCT_IMAGES.raosRoastedGarlic,
  },
  {
    price: '2',
    cents: '97',
    name: 'Barilla Rustic Basil Pesto Pasta Sauce, 6.5 oz',
    cue: 'Battery lasts all day',
    rating: 4,
    ratingCount: '2,415',
    fulfillment: 'Shipping, arrives in today',
    deliveryLabel: "today's delivery",
    deliveryDay: 'Friday 4pm',
    image: PRODUCT_IMAGES.barillaPesto,
  },
  {
    price: '3',
    cents: '12',
    name: 'Classico Traditional Sweet Basil Pasta Sauce, 24 oz Jar',
    cue: 'Classic flavor',
    rating: 4.5,
    ratingCount: '1,200',
    fulfillment: 'Shipping, arrives in today',
    deliveryLabel: "today's delivery",
    deliveryDay: 'Friday 4pm',
    image: PRODUCT_IMAGES.pregoRoastedGarlic,
  },
  {
    price: '8',
    cents: '99',
    name: 'Carbone Marinara Sauce, 24 oz, Premium Quality',
    cue: 'Chef crafted',
    rating: 5,
    ratingCount: '840',
    fulfillment: 'Shipping, arrives in today',
    deliveryLabel: "today's delivery",
    deliveryDay: 'Friday 4pm',
    image: PRODUCT_IMAGES.raosRoastedGarlic,
  },
];

export default function PastaSauceSearchResults() {
  const navigate = useNavigate();

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="gradient" pageBackground="linear-gradient(180deg, #FFF 0%, #F2F6FF 13.83%, #F1F1F2 30.73%)">
      <div className="font-sans min-h-screen">
        <div className="sticky top-[54px] z-50 -mx-4 lg:hidden backdrop-blur-xl">
          <SearchResultsHeader query="pasta sauce" onBack={() => navigate('/walmart')} transparent sticky={false} />
          <SearchFilterBar chips={FILTER_CHIPS} query="Pasta sauce" transparent />
        </div>

        {/* Results header */}
        <div className="flex justify-between items-center px-2 pt-3">
          <h2 className="text-lg font-bold text-[#2E2F32]">Pasta sauce</h2>
          <span className="text-sm text-[#515357]">1000+ results</span>
        </div>

        {/* Product cards */}
        <div className="flex flex-col gap-2 px-2 pt-3 pb-4">
          {PASTA_SAUCE_PRODUCTS.map((product, i) => (
            <ProductCardListNS key={i} {...product} />
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

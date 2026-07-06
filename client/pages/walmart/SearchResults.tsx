import { useNavigate, useSearchParams } from "react-router-dom";
import { AIResultsBanner } from "@/components/walmart/AIResultsBanner";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { ProductCardList, ProductCardListProps } from "@/components/walmart/ProductCardList";
import { FeatureGuideSection } from "./search-results/FeatureGuideSection";
import { KnowTypesSection } from "./search-results/KnowTypesSection";
import { TrendingBrandsSection } from "./search-results/TrendingBrandsSection";
import { PopularByPriceSection } from "./search-results/PopularByPriceSection";
import { MoreProductListings } from "./search-results/MoreProductListings";

const FILTER_CHIPS = ['In-store', 'Top rated', 'Brand', 'Screen size', 'Price', 'Special offers'] as const;

const TV_PRODUCTS: ProductCardListProps[] = [
  {
    flag: 'Best seller',
    flagVariant: 'default',
    price: '228',
    cents: '00',
    name: 'VIZIO 50" Class V-Series 4K UHD LED Smart TV V4K50M-08',
    rating: 4.5,
    ratingCount: '2,204',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.tablet,
    cue: 'TV with bright screen',
  },
  {
    flag: 'Rollback',
    flagVariant: 'red',
    price: '1,396',
    cents: '99',
    wasPrice: '$2,499.00',
    name: 'LG 65" C5 Series 4K UHD OLED evo AI Smart webOS 25 TV',
    rating: 4.3,
    ratingCount: '1,121',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.laptop1,
  },
  {
    price: '328',
    cents: '00',
    name: 'Philips 55" Class 144Hz QLED+ 4K UltraHD Google Smart TV',
    rating: 4.6,
    ratingCount: '3,567',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.laptop2,
  },
];

const SHOES_PRODUCTS = [
  {
    flag: 'Best seller',
    flagVariant: 'default' as const,
    price: '89',
    cents: '99',
    wasPrice: '$129.99',
    name: 'Stride Pro X9 Lightweight Running Shoes',
    brand: 'Stride Athletics',
    rating: 4.7,
    ratingCount: '3,412',
    pickup: '2 pm',
    image: 'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&w=400',
    cue: 'Top pick for runners',
    pdp: '/walmart/shoes',
  },
  {
    price: '119',
    cents: '99',
    name: 'Nike Air Zoom Pegasus 41 Road Running Shoes',
    brand: 'Nike',
    rating: 4.6,
    ratingCount: '8,891',
    pickup: '2 pm',
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    flag: 'Rollback',
    flagVariant: 'red' as const,
    price: '99',
    cents: '95',
    wasPrice: '$139.95',
    name: 'Adidas Ultraboost 22 Running Shoes',
    brand: 'Adidas',
    rating: 4.5,
    ratingCount: '5,234',
    pickup: '2 pm',
    image: 'https://images.pexels.com/photos/30755567/pexels-photo-30755567.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'TVs';
  const isShoes = query.toLowerCase().includes('shoe') || query.toLowerCase().includes('sneaker') || query.toLowerCase().includes('running');

  const products = isShoes ? SHOES_PRODUCTS : TV_PRODUCTS;
  const aiMessage = isShoes
    ? `Showing the best shoes based on your search`
    : `Showing the best TVs based on your search`;

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="gradient">
      <div className="bg-white font-sans">
        <SearchResultsHeader query={query} onBack={() => navigate('/walmart')} />
        <SearchFilterBar chips={FILTER_CHIPS} query={query} />
        <div className="lg:-mx-16">
          <AIResultsBanner message={aiMessage} />

          {/* Top product results */}
          <div className="flex flex-col">
            {products.map((product, i) => (
              <ProductCardList
                key={i}
                {...product}
                onClick={'pdp' in product && product.pdp ? () => navigate(product.pdp!) : undefined}
              />
            ))}
          </div>
        </div>

        {/* AI-powered sections */}
        <FeatureGuideSection />
        <KnowTypesSection />
        <TrendingBrandsSection />
        <PopularByPriceSection />

        {/* More products */}
        <MoreProductListings />
      </div>
    </ResponsiveLayout>
  );
}

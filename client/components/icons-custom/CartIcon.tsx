import { Cart } from '@/components/icons/Cart';

interface CartIconProps {
  count?: number;
  price?: string;
  className?: string;
  badgeColor?: string;
  textColor?: string;
}

export function CartIcon({
  count = 0,
  price = "$0.00",
  className = "",
  badgeColor = "#FFC220",
  textColor = "white"
}: CartIconProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <Cart
          width="24"
          height="24"
          className="w-6 h-6"
          style={{ color: textColor }}
        />

        <div
          className="absolute -top-1 -right-1 border border-[#662B0D] text-[#2E2F32] text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center"
          style={{ backgroundColor: badgeColor }}
        >
          {count > 99 ? '99+' : count}
        </div>
      </div>
      <div className="text-center mt-0.5" style={{ color: textColor, fontSize: 'var(--ld-semantic-font-caption-size, 12px)', lineHeight: 'var(--ld-semantic-font-caption-lineheight, 16px)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)' as any }}>
        {price}
      </div>
    </div>
  );
}

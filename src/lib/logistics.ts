export type City = "الخرطوم" | "أمدرمان" | "بحري" | "بورتسودان" | "مدني" | "عطبرة" | "كسلا";

interface ShippingRate {
  base: number;
  perVendor: number;
}

const SHIPPING_RATES: Record<string, ShippingRate> = {
  "الخرطوم": { base: 2500, perVendor: 1000 },
  "أمدرمان": { base: 2500, perVendor: 1000 },
  "بحري": { base: 2500, perVendor: 1000 },
  "بورتسودان": { base: 8000, perVendor: 3000 },
  "مدني": { base: 5000, perVendor: 2000 },
};

/**
 * Calculates the shipping cost based on the customer city and the unique vendor locations.
 */
export function calculateShipping(customerCity: string, vendorCities: string[]): number {
  const rate = SHIPPING_RATES[customerCity] || { base: 10000, perVendor: 4000 };
  
  // Rule: If customer and vendor are in the same trio (Khartoum/Omdurman/Bahri), treat as local.
  const isKhartoumTrio = (city: string) => ["الخرطوم", "أمدرمان", "بحري"].includes(city);
  
  const uniqueVendors = Array.from(new Set(vendorCities));
  
  let total = rate.base;
  
  uniqueVendors.forEach(vendorCity => {
    // If vendor is outside the customer's region, add extra surcharge
    if (isKhartoumTrio(customerCity) && !isKhartoumTrio(vendorCity)) {
       total += rate.perVendor * 1.5;
    } else if (customerCity !== vendorCity) {
       total += rate.perVendor;
    }
  });

  return total;
}

/**
 * Check if Cash on Delivery is allowed.
 * Rule: Only for Khartoum / Omdurman / Bahri.
 */
export function isCODAllowed(customerCity: string): boolean {
  return ["الخرطوم", "أمدرمان", "بحري"].includes(customerCity);
}

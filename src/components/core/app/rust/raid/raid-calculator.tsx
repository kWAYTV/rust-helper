'use client';

import { useMemo, useState } from 'react';

import CategorySelector from '@/components/core/app/rust/raid/category-selector';
import ItemGrid from '@/components/core/app/rust/raid/item-grid';
import RaidPlanner from '@/components/core/app/rust/raid/raid-planner';
import ResourceSummary from '@/components/core/app/rust/raid/resource-summary';
import { calculateTotalResources } from '@/components/core/app/rust/raid/utils/resource-calculations';
import { raidCosts } from '@/constants/raid-costs';
import type { RaidMethod, RustItem } from '@/types/raid-costs';

interface SelectedRaidItem {
  item: RustItem;
  quantity: number;
  method: RaidMethod;
}

export default function RaidCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Walls');
  const [raidCart, setRaidCart] = useState<SelectedRaidItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RustItem | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<RaidMethod>('c4');
  const [quantity, setQuantity] = useState(1);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(raidCosts.map(item => item.category)));
  }, []);

  // Filter items by category
  const filteredItems = useMemo(() => {
    return raidCosts.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  // Handle item selection
  const handleItemSelect = (item: RustItem) => {
    setSelectedItem(item);
  };

  // Handle method selection
  const handleMethodSelect = (method: RaidMethod) => {
    setSelectedMethod(method);
  };

  // Add item to raid cart
  const addToCart = () => {
    if (!selectedItem) return;

    setRaidCart(prev => [
      ...prev,
      {
        item: selectedItem,
        quantity,
        method: selectedMethod
      }
    ]);

    // Reset quantity after adding
    setQuantity(1);
  };

  // Remove item from raid cart
  const removeFromCart = (index: number) => {
    setRaidCart(prev => prev.filter((_, i) => i !== index));
  };

  // Update quantity of an item in the cart
  const updateCartItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setRaidCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Update method of an item in the cart
  const updateCartItemMethod = (index: number, newMethod: RaidMethod) => {
    setRaidCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, method: newMethod } : item
      )
    );
  };

  // Calculate total resources
  const totalResources = useMemo(() => {
    return calculateTotalResources(raidCart);
  }, [raidCart]);

  return (
    <div className='w-full space-y-6'>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <ItemGrid
            items={filteredItems}
            selectedItem={selectedItem}
            onSelectItem={handleItemSelect}
          />
        </div>

        <div>
          <RaidPlanner
            selectedItem={selectedItem}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedMethod={selectedMethod}
            setSelectedMethod={handleMethodSelect}
            addToCart={addToCart}
            cartItems={raidCart}
            removeItem={removeFromCart}
            updateQuantity={updateCartItemQuantity}
            updateMethod={updateCartItemMethod}
          />
        </div>
      </div>

      {raidCart.length > 0 && <ResourceSummary resources={totalResources} />}
    </div>
  );
}

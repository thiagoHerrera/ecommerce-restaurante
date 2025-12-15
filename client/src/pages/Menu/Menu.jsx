import { useState } from 'react';
import MenuCard from '../../components/Product/MenuCard';
import CategoryFilter from '../../components/CategoryFilter';
import SearchBar from '../../components/SearchBar';
import ProductSort from '../../components/ProductSort';
import { menuItems } from '../../data/menu';

const Menu = () => {
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Nuestro Menú</h1>
        <p className="text-gray-600 text-center">Descubre nuestros deliciosos platos</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
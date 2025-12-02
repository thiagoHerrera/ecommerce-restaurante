import CategoryFilter from './CategoryFilter';
import ProductSort from './ProductSort';
import SearchBar from './SearchBar';

const ProductNavigation = ({ 
  selectedCategory, 
  onCategoryChange, 
  onSort, 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={onCategoryChange} 
          />
          <ProductSort onSort={onSort} />
        </div>
      </div>
    </div>
  );
};

export default ProductNavigation;
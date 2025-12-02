import CategoryFilter from './CategoryFilter';
import ProductSort from './ProductSort';
import SearchBar from './SearchBar';
import { Filter, Search, Sparkles } from 'lucide-react';

const ProductNavigation = ({ 
  selectedCategory, 
  onCategoryChange, 
  onSort, 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="bg-gradient-to-r from-orange-50 via-white to-red-50 py-8 border-b border-orange-100">
      <div className="container mx-auto px-4">
        {/* Título de sección */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Explora Nuestro Menú
          </div>
          <h2 className="text-4xl font-black text-gray-800">
            Encuentra tu <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">plato perfecto</span>
          </h2>
        </div>
        
        {/* Barra de búsqueda mejorada */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar platos deliciosos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-orange-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-lg"
            />
          </div>
        </div>
        
        {/* Filtros y ordenamiento */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Filter className="text-orange-600" size={20} />
            <span className="text-gray-700 font-medium">Filtrar por:</span>
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onCategoryChange={onCategoryChange} 
            />
          </div>
          
          <ProductSort onSort={onSort} />
        </div>
      </div>
    </div>
  );
};

export default ProductNavigation;
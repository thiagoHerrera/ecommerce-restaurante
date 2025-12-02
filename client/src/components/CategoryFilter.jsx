const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'todos', name: 'Todos', icon: '🍽️' },
    { id: 'entradas', name: 'Entradas', icon: '🥘' },
    { id: 'platos-principales', name: 'Platos Principales', icon: '🍖' },
    { id: 'postres', name: 'Postres', icon: '🍰' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full border transition-all ${
            selectedCategory === category.id 
              ? 'bg-orange-500 text-white border-orange-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
          }`}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
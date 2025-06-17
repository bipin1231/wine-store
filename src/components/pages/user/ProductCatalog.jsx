import React, { useState } from 'react';
import { useGetProductsQuery, useGetProductsBySizeAllQuery, useGetFilteredProductsQuery,useGetProductsByNameQuery } from '../../../redux/productApi';
import { useGetCategoryQuery } from '../../../redux/categoryApi';
import Products from '../../reusable/Products';
import { Button } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from 'react-router-dom';

// Reusable Select Component
const Select = ({ children, value, onValueChange }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)} className="px-3 py-2 border rounded">
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const ProductCatalog = () => {
  const { searchQuery } = useParams();

  console.log(searchQuery);
  

  const { data, error, isLoading } = useGetProductsQuery();
  const { data: categories = [], isLoading: isCategoryLoading } = useGetCategoryQuery();
  const { data: productBySize = [] } = useGetProductsBySizeAllQuery({skip:searchQuery});
  const { data: productBySizeBySearchQuery = [] } = useGetProductsByNameQuery(searchQuery,{skip:!searchQuery});
console.log("productBySizeBySearchQueryafasadad",productBySizeBySearchQuery);


  const [queryFilters, setQueryFilters] = useState(null);

  const { data: filteredProductsQuery = null } = useGetFilteredProductsQuery(queryFilters, {
    skip: !queryFilters
  });

  const sortProducts = (order) => {
    setQueryFilters((prev) => ({
      ...prev,
      sort: order
    }));
  };

  const handleCategorySelect = (categoryName) => {
    setQueryFilters((prev) => ({
      ...prev,
      categoryName
    }));
  };

  const resetFilters = () => {
    setQueryFilters(null);
  };

  const getVisibleProducts = () => {
  if (searchQuery && productBySizeBySearchQuery?.length > 0) {
    return productBySizeBySearchQuery;
  } else if (filteredProductsQuery?.content?.length > 0) {
    return filteredProductsQuery.content;
  } else {
    return productBySize;
  }
};


  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Something Went Wrong.</div>;

  return (
    <main className="flex-1 ml-6">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              cat.subcategories ? (
                <Dropdown backdrop="blur" key={cat.name}>
                  <DropdownTrigger>
                    <Button>{cat.name}</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Subcategories">
                    {cat.subcategories.map((subCat) => (
                      <DropdownItem
                        key={subCat.name}
                        onClick={() => handleCategorySelect(subCat.name)}
                      >
                        {subCat.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button key={cat.name} onClick={() => handleCategorySelect(cat.name)}>
                  {cat.name}
                </Button>
              )
            ))}
            <Button
              variant="bordered"
              color="danger"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Select onValueChange={sortProducts}>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </Select>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
           {getVisibleProducts()?.map((product) => (
  <Products key={product.id} product={product} />
))}

          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </main>
  );
};

export default ProductCatalog;

export const categories = ['All', 'Vodka', 'Whiskey', 'Rum', 'Gin', 'Tequila'];

export const products = [
  {
    id: 1,
    name: "Nude Vodka",
    categoryName: "Vodka",
    description: "Premium triple-distilled vodka",
    productVariant: [
      {
        id: 5,
        costPrice: 500,
        sellingPrice: 550,
        size: "180ml",
        stock: 10,
        imageUrl: ['vodka1.jpg'],
      },
      {
        id: 6,
        costPrice: 1000,
        sellingPrice: 1100,
        size: "750ml",
        stock: 5,
        imageUrl: ['vodka2.jpg'],
      }
    ]
  },
  // ... Other products
];

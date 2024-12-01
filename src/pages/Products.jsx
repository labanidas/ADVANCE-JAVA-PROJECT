import React from 'react'

const Products = () => {
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 20.5,
      category: "Pain Relief",
      description: "Used to reduce fever and relieve mild to moderate pain.",
      dosage: "1 tablet every 6-8 hours",
      stock: 100,
      availability: "In Stock",
      imageUrl: "/paracetamol.jpg",
    },
    {
      id: 2,
      name: "Cetirizine 10mg",
      price: 15.0,
      category: "Allergy Relief",
      description: "Provides relief from allergies like sneezing, runny nose, and itching.",
      dosage: "1 tablet daily at bedtime",
      stock: 50,
      availability: "In Stock",
      imageUrl: "/cetirizine.jpg",
    },
    {
      id: 3,
      name: "Amoxicillin 250mg",
      price: 50.0,
      category: "Antibiotics",
      description: "Effective for treating bacterial infections.",
      dosage: "1 capsule every 8 hours for 5 days",
      stock: 30,
      availability: "Low Stock",
      imageUrl: "/amoxicillin250mg.jpg",
    },
    {
      id: 4,
      name: "Ibuprofen 400mg",
      price: 18.5,
      category: "Anti-Inflammatory",
      description: "Relieves pain, inflammation, and fever.",
      dosage: "1 tablet every 6-8 hours as needed",
      stock: 0,
      availability: "Out of Stock",
      imageUrl: "/ibuprofen.jpg",
    },
    {
      id: 5,
      name: "Vitamin D3 1000IU",
      price: 25.0,
      category: "Supplements",
      description: "Supports bone health and immune function.",
      dosage: "1 tablet daily with food",
      stock: 200,
      availability: "In Stock",
      imageUrl: "/vitamind3.jpg",
    },
    {
      id: 6,
      name: "Aspirin 75mg",
      price: 15.0,
      category: "Cardiovascular",
      description: "Used as a blood thinner to prevent blood clots and reduce the risk of heart attacks.",
      dosage: "1 tablet daily after food",
      stock: 120,
      availability: "In Stock",
      imageUrl: "/aspirin.jpg",
    },
    {
      id: 7,
      name: "Metformin 500mg",
      price: 35.0,
      category: "Diabetes Care",
      description: "Helps control blood sugar levels in people with type 2 diabetes.",
      dosage: "1 tablet twice a day with meals",
      stock: 80,
      availability: "In Stock",
      imageUrl: "/metformin.jpg",
    },
    {
      id: 8,
      name: "Omeprazole 20mg",
      price: 22.0,
      category: "Acidity Relief",
      description: "Reduces stomach acid to relieve heartburn and indigestion.",
      dosage: "1 capsule daily before breakfast",
      stock: 150,
      availability: "In Stock",
      imageUrl: "/omeprazole.jpg",
    },
    {
      id: 9,
      name: "Azithromycin 250mg",
      price: 60.0,
      category: "Antibiotics",
      description: "Used to treat bacterial infections like respiratory and skin infections.",
      dosage: "1 tablet daily for 3 days",
      stock: 40,
      availability: "Low Stock",
      imageUrl: "/azithromycin.jpg",
    },
    {
      id: 10,
      name: "Cough Syrup 100ml",
      price: 75.0,
      category: "Cold and Cough",
      description: "Relieves cough and soothes throat irritation.",
      dosage: "2 teaspoons 3 times a day after meals",
      stock: 300,
      availability: "In Stock",
      imageUrl: "/coughsyrup.jpg",
    },
    {
      id: 11,
      name: "Iron Folic Acid Tablets",
      price: 40.0,
      category: "Supplements",
      description: "Helps in preventing and treating anemia.",
      dosage: "1 tablet daily after lunch",
      stock: 250,
      availability: "In Stock",
      imageUrl: "/iron-folic-acid.jpg",
    },
    {
      id: 12,
      name: "Levocetirizine 5mg",
      price: 12.0,
      category: "Allergy Relief",
      description: "Effective in treating sneezing, runny nose, and skin allergies.",
      dosage: "1 tablet at bedtime",
      stock: 180,
      availability: "In Stock",
      imageUrl: "/levocetirizine.jpg",
    },
    {
      id: 13,
      name: "Multivitamin Gummies",
      price: 150.0,
      category: "Supplements",
      description: "A tasty way to get essential vitamins and minerals.",
      dosage: "2 gummies daily",
      stock: 400,
      availability: "In Stock",
      imageUrl: "/multivitamin-gummies.jpg",
    },
    {
      id: 14,
      name: "Skin Ointment 15g",
      price: 45.0,
      category: "Topical",
      description: "Relieves itching, redness, and minor skin infections.",
      dosage: "Apply a thin layer on the affected area twice daily",
      stock: 90,
      availability: "In Stock",
      imageUrl: "/skin-ointment.jpg",
    },
    {
      id: 15,
      name: "ORS Powder Pack",
      price: 10.0,
      category: "Rehydration",
      description: "Replenishes electrolytes and prevents dehydration.",
      dosage: "Dissolve 1 sachet in 1 liter of water and drink as needed",
      stock: 500,
      availability: "In Stock",
      imageUrl: "/ors-powder.jpg",
    },
    
  ];

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4 md:px-8 lg:px-16 max-w-[1560px] mx-auto'>
  {medicines.map((item) => {
    return (
      <div key={item.id} className='rounded-lg flex flex-col gap-3 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden'>
        <img 
          className='h-48 w-full object-cover hover:scale-105 transition-transform duration-300' 
          src={item.imageUrl} 
          alt={item.name} 
        />
        <div className='p-4 flex flex-col gap-2'>
          <div className='flex justify-between items-center'>
            <h1 className='text-gray-800 font-bold text-lg truncate'>{item.name}</h1>
            <p className='font-semibold text-green-600'>₹{item.price}</p>
          </div>
          <p className='text-gray-600 text-sm line-clamp-2'>{item.description}</p>
          <button className='mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300'>
            Buy Now
          </button>
        </div>
      </div>
    )
  })}
</div>
    </>
  )
}

export default Products

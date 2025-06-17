// src/app/api/product-info/route.ts
import { NextResponse } from 'next/server';

// Define an expanded type for our rich product data
export interface ProductInfo {
  barcode: string;
  productName?: string;
  brand?: string;
  quantity?: string;
  imageUrl?: string;
  ingredientsText?: string;
  allergens?: string[];
  nutrientLevels?: { [key: string]: string };
  nutriments?: { [key: string]: number };
  ecoScoreGrade?: string;
  ecoScoreLabel: 'Sustainable' | 'Partially Sustainable' | 'Not Sustainable' | 'Not Available';
  color: 'green' | 'yellow' | 'red' | 'gray';
}

export async function POST(req: Request) {
  try {
    const { barcode } = await req.json();

    if (!barcode) {
      return NextResponse.json({ error: 'Barcode is required' }, { status: 400 });
    }

    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);

    if (!response.ok) {
        if (response.status === 404) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 0 || !data.product) {
      return NextResponse.json({ error: 'Product not found in database' }, { status: 404 });
    }

    const { product } = data;
    const ecoScoreGrade = product.ecoscore_grade || 'unknown';

    let ecoScoreLabel: ProductInfo['ecoScoreLabel'] = 'Not Available';
    let color: ProductInfo['color'] = 'gray';

    switch (ecoScoreGrade) {
      case 'a': case 'b':
        ecoScoreLabel = 'Sustainable';
        color = 'green';
        break;
      case 'c':
        ecoScoreLabel = 'Partially Sustainable';
        color = 'yellow';
        break;
      case 'd': case 'e':
        ecoScoreLabel = 'Not Sustainable';
        color = 'red';
        break;
    }

    // --- Extracting all the new data ---
    const result: ProductInfo = {
      barcode,
      productName: product.product_name || 'Unknown Product',
      brand: product.brands || 'Unknown Brand',
      quantity: product.quantity,
      imageUrl: product.image_front_url,
      ingredientsText: product.ingredients_text,
      allergens: product.allergens_hierarchy || [],
      nutrientLevels: product.nutrient_levels,
      nutriments: {
        'energy-kcal': product.nutriments?.['energy-kcal_100g'],
        'fat': product.nutriments?.fat_100g,
        'carbohydrates': product.nutriments?.carbohydrates_100g,
        'proteins': product.nutriments?.proteins_100g,
      },
      ecoScoreGrade,
      ecoScoreLabel,
      color,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * This returns the list of items per category.
 */

const itemsPerCategory = [
  {category: 'keyboards', items: [
    {manufacturer: 'Redragon', model: 'Horus 618', size: 'Full'},
    {manufacturer: 'Redragon', model: 'Horus 612', size: 'TKL'},
  ]},
  {category: 'GDPs', items: [
    {country: 'Brazil', year: '2020', total: '5 apples'},
    {country: 'Brazil', year: '2019', total: '6 apples'},
    {country: 'China', year: '2019', total: '16 apples'},
  ]},
]

export async function getItemsPerCategory(category: string) {
  const selectedCategory = await itemsPerCategory.find(cat => cat.category === category)
  return selectedCategory
}

type Data = {
  category: string,
  items: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { category } = req.query
  const selectedCategory = await getItemsPerCategory(String(category));
  
  if(selectedCategory){
    res.status(200).json(selectedCategory)
  } else {
    res.status(404)
  }
}

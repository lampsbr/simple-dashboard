import type { NextApiRequest, NextApiResponse } from 'next'
import jsonList from '../../../json/items.json'

/**
 * This returns the list of items per category.
 * Structured data: id, imgUrl, title, details
 */

export async function getItemsPerCategory(category: string) {
  const selectedCategory = await jsonList.content.find(cat => cat.category === category)
  return selectedCategory
}
export async function getAvailableCategories() {
  return (await jsonList.content.map(cat => cat.category))
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

  if (selectedCategory) {
    res.status(200).json(selectedCategory)
  } else {
    res.status(404)
  }
}

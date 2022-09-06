import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * This returns the list of items per category.
 * Structured data: id, imgUrl, title, details
 */

const itemsPerCategory = [
  {
    category: 'keyboards', items: [
      {
        id: 'sbrubles',
        imgUrl: 'https://cdn.shopify.com/s/files/1/2695/9506/products/Bluetooth2.4GhzWiredUltra-ThinLowProfileGamingKeyboard_450x450.png?v=1626334705',
        title: 'Redragon K618 Horus',
        manufacturer: 'Redragon',
        model: 'Horus 618',
        size: 'Full'
      },
      {
        id: 'sbrubles2',
        imgUrl: 'https://cdn.shopify.com/s/files/1/2695/9506/products/redragonk621tkltenkeylesswirelesslowprofilekeyboard_450x450.png?v=1631775436',
        title: 'Redragon K621 Horus',
        manufacturer: 'Redragon', model: 'Horus 621', size: 'TKL'
      },
    ]
  },
  {
    category: 'GDPs', items: [
      { id: 'sbrubles3', title: 'Brazil 2020', country: 'Brazil', year: '2020', total: '5 apples' },
      { id: 'sbrubles4', title: 'Brazil 2019', country: 'Brazil', year: '2019', total: '6 apples' },
      { id: 'sbrubles5', title: 'China 2019', country: 'China', year: '2019', total: '16 apples' },
    ]
  },
]

export async function getItemsPerCategory(category: string) {
  const selectedCategory = await itemsPerCategory.find(cat => cat.category === category)
  return selectedCategory
}
export async function getAvailableCategories() {
  return (await itemsPerCategory.map(cat => cat.category))
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

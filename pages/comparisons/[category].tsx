import { NextPage } from "next";
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { getItemsPerCategory } from '../api/comparisons/[category]'
import { Card, Container, Grid, Row, Col, Text } from '@nextui-org/react';
import ItemCard from "../../components/comparison/ItemCard";
import Filter from "../../components/comparison/Filter";
import { useEffect, useState } from "react";

/**
 * This is the home for categories comparison. 
 * It should receive a category name by parameter, grab a list 
 * in the api and render stuff.
 */

export const getServerSideProps = async (context: any) => {
  const category = context.params.category
  const jsonData = await getItemsPerCategory(category)
  //console.log('running getServerSideProps', category, jsonData)
  if (!jsonData) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: jsonData
    }
  }
}

const CompareCategory: NextPage = (cat: any) => {
  const [visibleItems, setVisibleItems] = useState<Object[]>([])
  const [filters, setFilters] = useState<Map<string, Array<string>>>(new Map<string, Array<string>>())

  useEffect(() => {
    const updateVisibleItems = async () => {
      let tempList = [...cat.items]
      for await (const filter of filters.keys()) {
        const filteredList = filters.get(filter) || []
        if (filteredList.length > 0) {
          tempList = tempList.filter(item => filteredList.includes(item.details[filter]))
        }
      }
      setVisibleItems(tempList)
    }
    updateVisibleItems()
  }, [cat.items, filters])

  return (
    <Grid.Container>
      <Grid xs={12}>
        <Text h1>{cat.category} was selected for comparison</Text>
      </Grid>
      <Grid xs={12} lg={3}>
        <Filter items={cat.items} selectedFilters={filters} setSelectedFilters={setFilters} />
      </Grid>
      <Grid xs={12} lg={9}>
        <Grid.Container gap={2} justify="center">
          {visibleItems.map((i: any) => (
            <ItemCard {...i} key={i.id} />
          ))}
        </Grid.Container>
      </Grid>
    </Grid.Container>
  )
}
export default CompareCategory;
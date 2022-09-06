import { NextPage } from "next";
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { getItemsPerCategory } from '../api/comparisons/[category]'
import { Card, Container, Grid, Row, Col, Text } from '@nextui-org/react';
import ItemCard from "../../components/comparison/ItemCard";

/**
 * This is the home for categories comparison. 
 * It should receive a category name by parameter, grab a list 
 * in the api and render stuff.
 */

export const getServerSideProps = async (context: any) => {
  const category = context.params.category
  const jsonData = await getItemsPerCategory(category)
  console.log('running getServerSideProps', category, jsonData)
  if(!jsonData){
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
  return (
    <Container md>
      <Text h1>{cat.category} was selected for comparison</Text>
      <Grid.Container gap={2} justify="center">
        {cat.items.map((i:any) => (
          <ItemCard {...i} key={i.model} />
        ))}
      </Grid.Container>
    </Container>
  )
}
export default CompareCategory;
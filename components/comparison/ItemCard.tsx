import { Card, Grid, Text } from '@nextui-org/react';
export default function ItemCard(props:any) {
  return (
    <Grid xs={4}>
      <Card css={{h: "$40", $$cardColor: '$colors$primary'}}>
        <Card.Body>
          <Text h3 color="white">{props.model}</Text>
          <Text color="white">Size: {props.size}</Text>
          <Text color="white">Maker: {props.manufacturer}</Text>
        </Card.Body>
      </Card>
    </Grid>
  )
}
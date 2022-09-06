import { Card, Col, Grid, Text } from '@nextui-org/react';
export default function ItemCard(props: any) {
  return (
    <Grid xs={4}>
      <Card css={{ h: '$96', $$cardColor: '$colors$primary' }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
              {props.title}
            </Text>
          </Col>
        </Card.Header>
        {props.imgUrl && <Card.Image
          src={props.imgUrl}
          objectFit="cover"
          width="100%"
          height={180}
          alt="Card image background"
        />}
        <Card.Body css={{ marginTop: 10 }}>
          {/*data for keyboards*/}
          {props.manufacturer && <Text color="white">Maker: {props.manufacturer}</Text>}
          {props.model && <Text color="white">Model: {props.model}</Text>}
          {props.size && <Text color="white">Size: {props.size}</Text>}

          {/*data for GDPs*/}
          {props.country && <Text color="white">Country: {props.country}</Text>}
          {props.year && <Text color="white">year: {props.year}</Text>}
          {props.total && <Text color="white">total: {props.total}</Text>}

        </Card.Body>
      </Card>
    </Grid>
  )
}
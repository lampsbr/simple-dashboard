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
        {props.mainImg && <Card.Image
          src={props.mainImg.url}
          objectFit="cover"
          width="100%"
          height={180}
          alt="Card image background"
        />}
        <Card.Body css={{ marginTop: 10 }}>
          {/*data for keyboards*/}
          {props.details.manufacturer && <Text color="white">Maker: {props.details.manufacturer}</Text>}
          {props.details.model && <Text color="white">Model: {props.details.model}</Text>}
          {props.details.size && <Text color="white">Size: {props.details.size}</Text>}

          {/*data for GDPs*/}
          {props.details.country && <Text color="white">Country: {props.details.country}</Text>}
          {props.details.year && <Text color="white">year: {props.details.year}</Text>}
          {props.details.total && <Text color="white">total: {props.details.total}</Text>}

        </Card.Body>
      </Card>
    </Grid>
  )
}
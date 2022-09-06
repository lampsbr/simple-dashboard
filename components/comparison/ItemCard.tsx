import { Card, Col, Grid, Text } from '@nextui-org/react';
export default function ItemCard(props: any) {
  return (
    <Grid xs={4}>
      <Card css={{ $$cardColor: '$colors$primary' }}>
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
          { Object.keys(props.details).map(key =>
            <Text color="white" key={key}>{`${key}: ${props.details[key]}`}</Text>
          )}
        </Card.Body>
      </Card>
    </Grid>
  )
}
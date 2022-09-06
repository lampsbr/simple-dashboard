import React from 'react';
import { Card, Col, Grid, Modal, Text } from '@nextui-org/react';

export default function ItemCard(props: any) {
  const [visible, setVisible] = React.useState(false);

  const openDetailsModal = (e: any) => {
    setVisible(true)
  }
  const closeDetailsModal = () => {
    setVisible(false)
  }

  return (<>
    <Grid xs={4}>
      <Card css={{ $$cardColor: '$colors$primary' }} isPressable onPress={openDetailsModal}>
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
          {Object.keys(props.details).map((key, index) => {
            return index < 3 ? <Text color="white" key={key}>{`${key}: ${props.details[key]}`}</Text> : ''
          })}
        </Card.Body>
      </Card>
    </Grid>
    <Modal closeButton aria-labelledby="modal-title"
      open={visible}
      onClose={closeDetailsModal}
    >
      <Modal.Body>
        {Object.keys(props.details).map((key, index) => {
          return <Text key={key}>{`${key}: ${props.details[key]}`}</Text>
        })}
      </Modal.Body>
    </Modal>
  </>
  )
}
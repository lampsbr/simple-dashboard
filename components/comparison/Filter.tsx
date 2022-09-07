import React, { useEffect, useState } from 'react';
import { Card, Col, Grid, Modal, Text } from '@nextui-org/react';

export default function DynamicFilter(props: any) {
  const [filterList, setFilterList] = useState<Map<string, Set<string>>>(new Map<string, Set<string>>())

  useEffect(() => {
    const generateFilterList = async () => {
      const newFilterList = new Map<string, Set<string>>()
      //this grabs all filter names
      for await (const item of props.items) {
        for await (const detail of Object.keys(item.details)) {
          newFilterList.set(detail, new Set<string>())
        }
      }
      //this grabs all values for each filter
      for await (const item of props.items) {
        for await (const detail of Object.keys(item.details)) {
          newFilterList.get(detail)?.add(item.details[detail])
        }
      }
      setFilterList(newFilterList)
    }
    generateFilterList()
  }, [props])

  return (<>
    <Grid xs={4}>
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Header>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Filters
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ marginTop: 10 }}>
          {
            Array.from(filterList.keys()).map(x => {
              const theSet = filterList.get(x)
              return (<>
                <span>{x}</span>
                {theSet && Array.from(theSet).map((val: string) => {
                  return <span key={val}>{val}</span>
                })}
              </>)
            })
          }
        </Card.Body>
      </Card>
    </Grid>
  </>
  )
}
import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Col, Grid, Modal, Text } from '@nextui-org/react';

export default function DynamicFilter(props: any) {
  const [filterList, setFilterList] = useState<Map<string, Set<string>>>(new Map<string, Set<string>>())
  const [selections, setSelections] = useState<Map<string, Array<string>>>(new Map<string, Array<string>>)

  /**
   * This initialized the filterList state, feeding it with the json received as prop.
   */
  useEffect(() => {
    const generateFilterList = async () => {
      const newFilterList = new Map<string, Set<string>>()
      const newSelections = new Map<string, Array<string>>()
      //this grabs all filter names
      for await (const item of props.items) {
        for await (const detail of Object.keys(item.details)) {
          newFilterList.set(detail, new Set<string>())
          newSelections.set(detail, new Array<string>())
        }
      }
      //this grabs all values for each filter
      for await (const item of props.items) {
        for await (const detail of Object.keys(item.details)) {
          newFilterList.get(detail)?.add(item.details[detail])
        }
      }
      setFilterList(newFilterList)
      props.setFilters(newSelections)
    }
    generateFilterList()
  }, [props])



  /**
   * This updates the selections object
   */
  const toggleSelection = (filter: string, value: string, newValue: boolean) => {
    const newSelections = Object.assign(selections, new Map<string,Array<string>>())
    const newFilterSelection = newSelections.get(filter) || new Array<string>

    if(newValue){
      newFilterSelection.push(value)
    } else {
      newFilterSelection.splice(newFilterSelection.indexOf(value), 1)
    }
    newSelections.set(filter, newFilterSelection)
    setSelections(newSelections)
  }

  return (<>
    <Grid xs={4}>
      <Card>
        <Card.Header>
          <Text size={12} weight="bold" transform="uppercase">
            Filter options
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ marginTop: 10 }}>
          {
            Array.from(filterList.keys()).map(x => {
              const theSet = filterList.get(x)
              return (
                <div key={x}>
                  <p>{x}</p>
                  {theSet && Array.from(theSet).map((val: string) => {
                    /*isSelected={selections.get(x)?.includes(val)} */
                    return <Checkbox key={`${x}##${val}`}  onChange={e => toggleSelection(x, val, e)}>{val}</Checkbox>
                  })}
                </div>
                )
            })
          }
        </Card.Body>
      </Card>
    </Grid>
  </>
  )
}
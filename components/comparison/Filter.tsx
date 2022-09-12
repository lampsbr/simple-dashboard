import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Col, Collapse, Grid, Modal, Text } from '@nextui-org/react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

type FilterProps = {
  items: any[],
  selectedFilters: Map<string, Array<string>>,
  setSelectedFilters: (nf: Map<string, Array<string>>) => void
}

export default function DynamicFilter({ items, selectedFilters, setSelectedFilters }: FilterProps) {
  const { width, height } = useWindowDimensions();
  const [filterList, setFilterList] = useState<Map<string, Set<string>>>(new Map<string, Set<string>>())
  //const [selections, setSelections] = useState<Map<string, Array<string>>>(new Map<string, Array<string>>)

  /**
   * This initialized the filterList state, feeding it with the json received as prop.
   */
  useEffect(() => {
    const generateFilterList = async () => {
      const newFilterList = new Map<string, Set<string>>()
      const newSelections = new Map<string, Array<string>>()
      //this grabs all filter names
      for await (const item of items) {
        for await (const detail of Object.keys(item.details)) {
          newFilterList.set(detail, new Set<string>())
          newSelections.set(detail, new Array<string>())
        }
      }
      //this grabs all values for each filter
      for await (const item of items) {
        for await (const detail of Object.keys(item.details)) {
          newFilterList.get(detail)?.add(item.details[detail])
        }
      }
      setFilterList(newFilterList)
      setSelectedFilters(newSelections)
    }
    generateFilterList()
  }, [items, setSelectedFilters])



  /**
   * This updates the selections object
   */
  const toggleSelection = (filter: string, value: string, newValue: boolean) => {
    const newSelections = new Map(selectedFilters)
    const newFilterSelection = newSelections.get(filter) || new Array<string>

    if (newValue) {
      newFilterSelection.push(value)
    } else {
      newFilterSelection.splice(newFilterSelection.indexOf(value), 1)
    }
    newSelections.set(filter, newFilterSelection)
    //console.log('newSelections in filter component', newSelections)
    setSelectedFilters(newSelections)
  }

  const shouldFiltersBeExpanded = (): boolean => {
    return width !== undefined && width > 1280
  }

  return (<>
    <Grid xs={12} >
      <Collapse title="Filter Options" shadow bordered expanded={shouldFiltersBeExpanded()} css={{w: '100%', m: '1rem'}}>
          {
            Array.from(filterList.keys()).map(x => {
              const theSet = filterList.get(x)
              return (
                <div key={x}>
                  <p>{x}</p>
                  {theSet && Array.from(theSet).map((val: string) => {
                    return <Checkbox key={`${x}##${val}`} onChange={e => toggleSelection(x, val, e)} css={{ml: '1.5rem'}}>{val}</Checkbox>
                  })}
                </div>
              )
            })
          }
      </Collapse>
    </Grid>
  </>
  )
}
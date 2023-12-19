import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import SearchComponent from '../components/SearchComponent'
import { TItem } from '../types'

const mockInitiatedData: TItem[] = [
  {
    id: '1',
    name: 'Parent',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'Child 1',
        type: 'file',
      },
      {
        id: '3',
        name: 'Child 2',
        type: 'folder',
        children: [
          {
            id: '4',
            name: 'Grandchild',
            type: 'file',
          },
        ],
      },
      {
        id: '5',
        name: 'Grandchild 2',
        type: 'folder',
        children: [],
      },
    ],
  },
]

describe('SearchComponent', () => {
  it('Should filter items based on search input', () => {
    const setFilterMock = jest.fn()
    const queryValue = 'Grandchild'
    const { getByPlaceholderText } = render(
      <SearchComponent initiatedData={mockInitiatedData} setFilter={setFilterMock} />,
    )

    const searchInput = getByPlaceholderText('Пошук...') as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: queryValue } })

    expect(searchInput.value).toBe(queryValue)

    expect(setFilterMock).toHaveBeenCalledWith(['4', '3', '5', '1'])
  })

  it('Should filter all items based search no matched input', () => {
    const setFilterMock = jest.fn()
    const queryValue = '8'

    const { getByPlaceholderText } = render(
      <SearchComponent initiatedData={mockInitiatedData} setFilter={setFilterMock} />,
    )

    const searchInput = getByPlaceholderText('Пошук...') as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: queryValue } })

    expect(searchInput.value).toBe(queryValue)

    expect(setFilterMock).toHaveBeenCalledWith([])
  })

  it('Should reset filter when search input is cleared', () => {
    const setFilterMock = jest.fn()
    const queryValue = ''
    const { getByPlaceholderText } = render(
      <SearchComponent initiatedData={mockInitiatedData} setFilter={setFilterMock} />,
    )

    const searchInput = getByPlaceholderText('Пошук...') as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: queryValue } })

    expect(searchInput.value).toBe(queryValue)

    expect(setFilterMock).toHaveBeenCalledWith(null)
  })
})

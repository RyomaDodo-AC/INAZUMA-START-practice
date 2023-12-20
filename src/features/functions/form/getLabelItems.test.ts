import { getLabelItems, Items } from './getLabelItems'

describe('getLabelItems', () => {
  it('指定したvalueが配列にあればlabelを返す', () => {
    const formFields: Items = [
      { value: 'field1', label: 'Field 1' },
      { value: 'field2', label: 'Field 2' },
      { value: 'field3', label: 'Field 3' },
    ]

    const result = getLabelItems(formFields, 'field1')
    expect(result).toEqual('Field 1')
  })

  it('指定したvalueが配列になければundefinedを返す', () => {
    const formFields: Items = [
      { value: 'field1', label: 'Field 1' },
      { value: 'field2', label: 'Field 2' },
      { value: 'field3', label: 'Field 3' },
    ]

    const result = getLabelItems(formFields, 'field4')
    expect(result).toEqual(undefined)
  })

  it('valueがundefinedなら空文字を返す', () => {
    const formFields: Items = [
      { value: 'field1', label: 'Field 1' },
      { value: 'field2', label: 'Field 2' },
      { value: 'field3', label: 'Field 3' },
    ]

    const result = getLabelItems(formFields, undefined)
    expect(result).toEqual('')
  })

  it('itemsが空配列ならundefinedを返す', () => {
    const formFields: Items = []

    const result = getLabelItems(formFields, 'field1')
    expect(result).toEqual(undefined)
  })
})

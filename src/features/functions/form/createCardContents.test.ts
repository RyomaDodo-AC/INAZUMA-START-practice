import { createCardContents, createCardContentsArgs } from './createCardContents'

describe('createCardContents関数', () => {
  it('type:radio, inputPosition:top, inputFloat:true', () => {
    const args: createCardContentsArgs = {
      type: 'radio',
      inputPosition: 'top',
      inputFloat: true,
      option: {
        label: 'ラベル',
        value: 'value',
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      radioClassName: '!left-8 !top-8',
      labelClassName: '!py-6 h-full flex flex-col justify-center !px-6',
      label: 'ラベル',
      value: 'value',
    })
  })

  it('type:radio, inputPosition:center, inputFloat:false', () => {
    const args: createCardContentsArgs = {
      type: 'radio',
      inputPosition: 'center',
      inputFloat: false,
      option: {
        label: 'ラベル',
        value: 'value',
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      radioClassName: '!left-6',
      labelClassName: '!py-6 h-full flex flex-col justify-center !pl-14',
      label: 'ラベル',
      value: 'value',
    })
  })

  it('type:checkbox, inputPosition:top, inputFloat:true', () => {
    const args: createCardContentsArgs = {
      type: 'checkbox',
      inputPosition: 'top',
      inputFloat: true,
      option: {
        label: 'ラベル',
        value: 'value',
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      checkboxClassName: '!left-8 !top-8',
      labelClassName: '!py-6 h-full flex flex-col justify-center !px-6',
      label: 'ラベル',
      value: 'value',
    })
  })

  it('type:checkbox, inputPosition:center, inputFloat:false', () => {
    const args: createCardContentsArgs = {
      type: 'checkbox',
      inputPosition: 'center',
      inputFloat: false,
      option: {
        label: 'ラベル',
        value: 'value',
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      checkboxClassName: '!left-6',
      labelClassName: '!py-6 h-full flex flex-col justify-center !pl-14',
      label: 'ラベル',
      value: 'value',
    })
  })

  it('type:radio, inputPosition:top, inputFloat:true, ribbon.label', () => {
    const args: createCardContentsArgs = {
      type: 'radio',
      inputPosition: 'top',
      inputFloat: true,
      option: {
        label: 'ラベル',
        value: 'value',
      },
      ribbon: {
        label: 'リボンラベル',
        recommend: false,
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      radioClassName: '!left-8 !top-8',
      labelClassName: '!py-6 h-full flex flex-col justify-center !px-6',
      label: 'ラベル',
      value: 'value',
      ribbon: {
        label: {
          text: 'リボンラベル',
          color: 'blue',
        },
      },
    })
  })

  it('type:radio, inputPosition:top, inputFloat:true, ribbon.recommend', () => {
    const args: createCardContentsArgs = {
      type: 'radio',
      inputPosition: 'top',
      inputFloat: true,
      option: {
        label: 'ラベル',
        value: 'value',
      },
      ribbon: {
        recommend: true,
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      radioClassName: '!left-8 !top-8',
      labelClassName: '!py-6 h-full flex flex-col justify-center !px-6',
      label: 'ラベル',
      value: 'value',
      ribbon: {
        recommend: {
          show: true,
          color: 'blue',
        },
      },
    })
  })

  it('type:radio, inputPosition:top, inputFloat:true, ribbon.label, ribbon.recommend', () => {
    const args: createCardContentsArgs = {
      type: 'radio',
      inputPosition: 'top',
      inputFloat: true,
      option: {
        label: 'ラベル',
        value: 'value',
      },
      ribbon: {
        label: 'リボンラベル',
        recommend: true,
      },
    }

    const result = createCardContents(args)
    expect(result).toEqual({
      radioClassName: '!left-8 !top-8',
      labelClassName: '!py-6 h-full flex flex-col justify-center !px-6',
      label: 'ラベル',
      value: 'value',
      ribbon: {
        label: {
          text: 'リボンラベル',
          color: 'blue',
        },
        recommend: {
          show: true,
          color: 'blue',
        },
      },
    })
  })
})

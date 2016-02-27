import assert from 'assert'
import React from 'react'
import { MemoryStorage, Store, renderToStaticMarkup } from '../../src/server'
import { RootComponent, createContainer } from '../../src/react'
import { collectionName, docId, field, value } from '../util'

let storage
let store
let model

class TestComponent extends React.Component {

  getQueries () {
    return {
      userId: ['_session', 'userId'],
      user: ['users', '1']
    }
  }

  render () {
    let { userId, user } = this.props // eslint-disable-line

    let components = [<div key='1'>{userId}</div>, <div key='2'>{user.name}</div>]

    return (
      <div className='ivan'>
        {components}
      </div>
    )
  }
}

let Container = createContainer(TestComponent)

class Root extends RootComponent {

  render () {
    let { children } = this.props // eslint-disable-line

    let components = [<div key='1'>Root</div>]
    // console.log('Root.render', children)

    return (
      <div className='root'>
        {components}
        {children}
      </div>
    )
  }
}

class Layout extends React.Component {

  render () {
    let { children } = this.props // eslint-disable-line

    return (
      <div className='layout'>
        {children}
      </div>
    )
  }
}

describe.skip('serverRendering5', () => {
  beforeEach(async () => {
    storage = new MemoryStorage()

    await storage.init()
    store = new Store(storage)
    model = store.createModel()

    let doc = {
      _id: docId,
      [field]: value
    }

    await model.add(collectionName, doc)
  })

  it('should render to string local data when children', async () => {
    model.set(['_session.userId'], '123-456')
    // let children = <Container />
    let html = await renderToStaticMarkup(Layout, {model}, <Root model={model}><Container /></Root>)

    assert(html)
    console.log(html)
    assert.equal(typeof html, 'string')
    assert(html.indexOf('Ivan') > -1)
    assert(html.indexOf('123-456') > -1)
  })
})

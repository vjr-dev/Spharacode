import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import Search from '../../src/Search.web'
const navigation = require('react-navigation')

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'

const screenProps = {
  navigation: navigation,
  id: 'Search'
}

const feature = loadFeature('./__tests__/features/searchweb-scenario.feature')

const testData = [
  {
    id: '1',
    type: 'user',
    attributes: {
      activated: true,
      country_code: '123',
      user_name: 'tester',
      email: 'irma.mctest@example.com',
      first_name: 'Irma',
      full_phone_number: '+12344567890',
      last_name: 'McTest',
      phone_number: '1234567890',
      type: 'user',
      created_at: '2021-12-03T16:55:09.405Z',
      updated_at: '2021-12-03T16:55:09.405Z',
      device_id: 'abcd-1234',
      unique_auth_id: '12345'
    }
  }
]

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')
  })

  test('User navigates to search', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search

    given('I am a User loading search', () => {
      SearchWrapper = shallow(<Search {...screenProps} />)
    })

    when('I navigate to the search', () => {
      instance = SearchWrapper.instance() as Search

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      )
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
      runEngine.sendMessage('Unit Test', tokenMsg)

      const getSearchAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )

      getSearchAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [
          {
            id: '1',
            type: 'user',
            attributes: {
              activated: true,
              country_code: '123',
              user_name: 'tester',
              email: 'irma.mctest@example.com',
              first_name: 'Irma',
              full_phone_number: '+12344567890',
              last_name: 'McTest',
              phone_number: '1234567890',
              type: 'user',
              created_at: '2021-12-03T16:55:09.405Z',
              updated_at: '2021-12-03T16:55:09.405Z',
              device_id: 'abcd-1234',
              unique_auth_id: '12345'
            }
          }
        ]
      })
      instance.searchApiCallId = getSearchAPI.messageId
      runEngine.sendMessage('Unit Test', getSearchAPI)
    })

    then('I can click Search button', () => {
      let textInputComponent = SearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'inputSearchText'
      )
      textInputComponent.simulate('change', { target: { value: 'Irma' } })

      let buttonComponent = SearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnGetSearchList'
      )
      buttonComponent.simulate('click')
    })

    then('search will load with out errors', () => {
      instance.setState({ searchList: testData })
      expect(SearchWrapper).toBeTruthy()
    })

    then('I can view Search item', () => {
      let buttonComponent = SearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnViewModal'
      )
      buttonComponent.simulate('click')

      instance.setState({
        activeId: 1,
        activeFirstName: 'Irma',
        activeLastName: 'McTest',
        activeUserName: 'tester',
        activeEmail: 'irma.mctest@example.com',
        activePhoneNumber: '1234567890',
        activeCountryCode: '123',
        activeType: 'user',
        activeDeviceId: 'abcd-1234',
        activeCreatedAt: '2021-12-03T16:55:09.405Z',
        isVisible: true
      })

      buttonComponent = SearchWrapper.findWhere(
        node => node.prop('data-test-id') === 'btnCloseModal'
      )
      buttonComponent.simulate('click')
    })

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(SearchWrapper).toBeTruthy()
    })
  })
})

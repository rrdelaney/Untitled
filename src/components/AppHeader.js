import React from 'react'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

const AppHeaderContainer = styled.div`
  border-radius: 0 !important;
  padding: 0;
  margin: 0 !important;
`

export default function AppHeader() {
  return (
    <Menu inverted as={AppHeaderContainer}>
      <Menu.Item name="editorials">Editorials</Menu.Item>
      <Menu.Item name="reviews">Reviews</Menu.Item>
      <Menu.Item name="upcomingEvents">Upcoming Events</Menu.Item>
    </Menu>
  )
}

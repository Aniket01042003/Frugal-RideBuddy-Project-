import React from 'react'
import LocationPicker from './LocationPicker'

function HomeRide({setActiveComponent}) {
  return (
    <div>
      <LocationPicker setActiveComponent={setActiveComponent} />
    </div>
  )
}

export default HomeRide

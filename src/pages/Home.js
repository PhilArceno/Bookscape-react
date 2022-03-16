import { Box } from '@chakra-ui/react'
import React from 'react'
import {Hero,Features, Testimonials} from "../components"

function Home() {
  return (
      <Box margin={20}>
          <Hero/>
          <Features margin={"10 0"}/>
          <Testimonials/>
      </Box>
  )
}

export default Home
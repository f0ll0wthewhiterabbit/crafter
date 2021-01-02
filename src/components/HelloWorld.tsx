import React from 'react'

const HelloWorld: React.FC = () => (
  <>
    <h1>Hello World</h1>
    <hr />
    <p>
      process.env.PRODUCTION: <b>{Boolean(process.env.PRODUCTION).toString()}</b>
    </p>
  </>
)

export default HelloWorld

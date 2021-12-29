import React from 'react'
import { Spinner as Sp } from 'react-bootstrap'

export default function Spinner() {
    return (
        <div
        style={{
          justifyContent: "center",
          alignContent: "center",
          height: 200,
          paddingTop: 100,
        }}
      >
    
        <div className="loading">
              <Sp animation="border" />
        </div>
        
      </div>
    )
}

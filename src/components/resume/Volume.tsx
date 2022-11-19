import * as React from "react";
import {useEffect} from "react";

import Button from "@/components/buttons/Button";

export default function Volume() {
  const pinClassName = 'pin bg-blue-300 w-4 h-2 m-1'
  const radio = Array.from(Array(10).keys()).map(n => {
    return (
      <div key={n} className=''>
        {Array.from(Array(8).keys()).map(nn => {
          return (<div key={`${n}_${nn}`} className={pinClassName} id={`volume${n}_${nn}`} />)
        })}
      </div>
    )
  })


  const randomChecking = () => {
    const pins = document.querySelectorAll('.pin')
    const idChecks = Array.from(Array(10).keys()).map(n => {
      return { idCheck: `volume${n}`, random: Math.ceil(Math.random() * 5) }
    })
    // const random = Math.ceil(Math.random() * 9)
    pins.forEach(pin => {
      const id = pin.id

      idChecks.forEach(idCheck => {
        // 'volume0_00 startWith volume0'
        if (id.startsWith(idCheck.idCheck)) {
          const nn = Number(id.split('_')[1])
          if (nn > idCheck.random) {
            pin.className = pin.className + ' bg-blue-600'
          } else {
            pin.className = pinClassName
          }
        }
      })
    })
  }
  useEffect(randomChecking, [])

  return (
    <div className='h-24'>
      <div className='flex'>
        {radio}
      </div>
      <Button variant='ghost' onClick={() => {
        const interval = 600
        setInterval(randomChecking, interval)
      }}>play disco!!</Button>
    </div>
  )

}

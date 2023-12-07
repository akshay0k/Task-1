import React, { useEffect, useState } from 'react'

export default function Home() {
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

    const fetchCountries = async() =>{
        fetch('http://localhost:4000/getAllCountries')
        .then((res)=>res.json())
        .then((data)=>{
            setCountry(data.data)
        })
    }

    useEffect(()=>{
        fetchCountries()
    },[])

    const fetchStates = (countryCode) =>{
        setCity([])
        setState([])
        fetch('http://localhost:4000/getStates/'+countryCode)
        .then((res)=>res.json())
        .then((data)=>{
            setState(data.data)
        })
    }

    const fetchCities = (stateCode) =>{
        fetch('http://localhost:4000/getCity/'+stateCode)
        .then((res)=>res.json())
        .then((data)=>{
            setCity(data.data)
        })
    }

  return (
    <div >
    <div className='flex  items-center mt-5 gap-10 justify-around'>
        <select  className='border-4 rounded-xl w-[350px] h-[45px] ' onChange={(e)=>fetchStates(e.target.value)}>

            <option value="">Select county </option>
            {
                country.map((each)=>(
                    <>
                    <option value={each.value}>{each.name}</option>
                    
                    </>
                ))            }
        </select>
        <select disabled={state.length  ? false : true} className='border-4 rounded-xl w-[350px] h-[45px] ' onChange={(e)=>fetchCities(e.target.value)}>
        <option value="">Select State </option>
            {
                state.map((each)=>(
                    <option value={each.value}>{each.name}</option>
                ))            }
        </select>
        <select disabled={ city.length ? false : true} className='border-4 rounded-xl w-[350px] h-[45px] ' >
        <option value="">Select city </option>
            {
                city.map((each)=>(
                    <option value={each.value}>{each.name}</option>
                ))            }
        </select>

    </div>
   {/* <h3 className='align-middle mt-10'>Your country is : {country}</h3> */}

    </div>
  )
}
